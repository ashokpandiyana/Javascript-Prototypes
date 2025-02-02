Array.prototype.myPush = function (...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i];
  }
  return this.length;
};

Array.prototype.myPop = function () {
  if (this.length === 0) return undefined;
  let last = this[this.length - 1];
  this.length--;
  return last;
};

Array.prototype.myShift = function () {
  if (this.length === 0) return undefined;
  let first = this[0];
  for (let i = 1; i < this.length; i++) {
    this[i - 1] = this[i];
  }
  this.length--;
  return first;
};

Array.prototype.myUnshift = function (...args) {
  this.splice(0, 0, ...args);
  return this.length;
};

Array.prototype.myMap = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      result[i] = callback(this[i], i, this);
    }
  }
  return result;
};

Array.prototype.myFilter = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i) && callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

Array.prototype.mySort = function (compareFn) {
  if (typeof compareFn !== "function") {
    compareFn = (a, b) => (String(a) > String(b) ? 1 : -1);
  }

  let len = this.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (compareFn(this[j], this[j + 1]) > 0) {
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
      }
    }
  }
  return this;
};
