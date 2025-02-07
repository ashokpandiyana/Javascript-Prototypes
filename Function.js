if (!Function.prototype.myCall) {
  Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
  };
}

if (!Function.prototype.myApply) {
  Function.prototype.myApply = function (context, argsArray) {
    context = context || window;
    context.fn = this;
    const result = context.fn(...argsArray);
    delete context.fn;
    return result;
  };
}

if (!Function.prototype.myBind) {
  Function.prototype.myBind = function (context, ...boundArgs) {
    const fn = this;
    return function (...args) {
      return fn.apply(context, [...boundArgs, ...args]);
    };
  };
}

if (!Function.prototype.once) {
  Function.prototype.once = function () {
    let called = false;
    let result;
    const fn = this;

    return function (...args) {
      if (!called) {
        called = true;
        result = fn.apply(this, args);
      }
      return result;
    };
  };
}

function increment(x) {
  return x + 1;
}

const incrementOnce = increment.once();
console.log(incrementOnce(5)); // Output: 6
console.log(incrementOnce(10)); // Output: 6 (same result as before)

if (!Function.prototype.memoize) {
  Function.prototype.memoize = function () {
    const cache = new Map();
    const fn = this;

    return function (...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  };
}

function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}

const memoizedFactorial = factorial.memoize();
console.log(memoizedFactorial(5)); // Computes and caches the result
console.log(memoizedFactorial(5)); // Returns cached result

if (!Function.prototype.throttle) {
  Function.prototype.throttle = function (delay) {
    let lastCall = 0;
    const fn = this;

    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return fn.apply(this, args);
      }
    };
  };
}

function logMessage() {
  console.log("Message logged");
}

const throttledLog = logMessage.throttle(1000);
throttledLog(); // Logs immediately
throttledLog(); // Ignored until 1 second has passed

if (!Function.prototype.debounce) {
  Function.prototype.debounce = function (delay) {
    let timeoutId;
    const fn = this;

    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  };
}

function logMessage() {
  console.log("Message logged");
}

const debouncedLog = logMessage.debounce(1000);
debouncedLog(); // Waits 1 second before logging
debouncedLog(); // Resets the timer
