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
