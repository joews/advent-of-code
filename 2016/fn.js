// Local copy of module switching to CommonJS for an easy life

//
// Functions
//
function autoPartial(fn) {
  return function (...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return fn.bind(this, ...args);
    }
  };
}

const _ = autoPartial;

function flow(...fns) {
  return (input) => reduce((lastResult, fn) => fn(lastResult), input, fns);
}

const pipe = _(function pipe(value, ...fns) {
  return flow(...fns)(value);
});

//
// Values
//
function isUndefined(a) {
  return typeof a === "undefined";
}

function isPromise(a) {
  return a instanceof Promise;
}

function isFunction(a) {
  return typeof a === "function";
}

function isIterable(a) {
  return isFunction(a[Symbol.iterator]);
}

//
// Iterables
//
const reduce = _(function reduce(reducer, start, input) {
  let result = start;
  for (const e of input) {
    result = reducer(result, e);
  }

  return result;
});

const map = _(function* map(mapper, input) {
  for (const e of input) {
    yield mapper(e);
  }
});

const filter = _(function* filter(filterer, input) {
  for (const e of input) {
    if (filterer(e)) {
      yield e;
    }
  }
});

const take = _(function* take(n, input) {
  let outputCount = 0;
  for (const e of input) {
    yield e;
    if (++outputCount >= n) {
      return;
    }
  }
});

function toArray(input) {
  return [...input];
}

function head(input) {
  return [...take(1, input)][0];
}

function* tail(input) {
  let isFirst = true;
  for (const e of input) {
    if (isFirst) {
      isFirst = false;
    } else {
      yield e;
    }
  }
}

const splitWhen = _(function* splitWhen(predicate, input) {
  let nextBatch = [];

  for (const e of input) {
    nextBatch.push(e);

    if (predicate(e, nextBatch)) {
      yield nextBatch;
      nextBatch = [];
    }
  }

  if (nextBatch.length > 0) {
    yield nextBatch;
  }
});

const split = _(function split(batchSize, input) {
  const splitter = (_, batch) => batch.length >= batchSize;
  return splitWhen(splitter, input);
});

// Returns an iterable that yields values from each input iterable
// TODO
const merge = _(function* merge(...iterables) {
  for (const iterable of iterables) {
    for (const e of iterable) {
      yield e;
    }
  }
});

// Returns an iterable that yields each grandchild of `iterable`
// [[a, b, c], [d, [e]]] -> [a, b, c, d, [e]]
function* flatten(iterable) {
  for (const child of iterable) {
    if (isIterable(child)) {
      for (const grandchild of child) {
        yield grandchild;
      }
    } else {
      yield child;
    }
  }
}

// Returns an iterable that yields each nested descendant of `iterable`
function* flattenDeep(iterable) {
  for (const child of iterable) {
    if (isIterable(child)) {
      for (const grandchild of flatten(child)) {
        yield grandchild;
      }
    } else {
      yield child;
    }
  }
}

//
// Promises
//

// Returns a lazy async thunk that resolves to `value` after at least `delayInMs`
function delay(delayInMs) {
  return (value) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(value), delayInMs);
    });
}

function flowAsync(...fns) {
  return (input) =>
    reduce(
      (lastPromise, fn) => lastPromise.then(fn),
      Promise.resolve(input),
      fns
    );
}

function pipeAsync(value, ...fns) {
  return flowAsync(...fns)(value);
}

module.exports = {
  autoPartial,
  flow,
  pipe,
  isUndefined,
  isPromise,
  isFunction,
  isIterable,
  reduce,
  map,
  filter,
  take,
  toArray,
  head,
  tail,
  splitWhen,
  split,
  merge,
  flatten,
  flattenDeep,
  delay,
  flowAsync,
  pipeAsync,
};
