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

Array.prototype.myIncludes = function (searchElement, fromIndex = 0) {
  const length = this.length;
  for (let i = fromIndex; i < length; i++) {
    if (this[i] === searchElement) {
      return true;
    }
  }
  return false;
};

Array.prototype.myIndexOf = function (searchElement, fromIndex = 0) {
  const length = this.length;
  for (let i = fromIndex; i < length; i++) {
    if (this[i] === searchElement) {
      return i;
    }
  }
  return -1;
};

Array.prototype.myLastIndexOf = function (
  searchElement,
  fromIndex = this.length - 1
) {
  for (let i = fromIndex; i >= 0; i--) {
    if (this[i] === searchElement) {
      return i;
    }
  }
  return -1;
};

Array.prototype.mySlice = function (start = 0, end = this.length) {
  const result = [];
  let startIndex = start < 0 ? Math.max(this.length + start, 0) : start;
  let endIndex = end < 0 ? Math.max(this.length + end, 0) : end;

  for (let i = startIndex; i < endIndex && i < this.length; i++) {
    result.push(this[i]);
  }

  return result;
};

Array.prototype.mySplice = function (start, deleteCount, ...items) {
  const length = this.length;
  let startIndex = start < 0 ? Math.max(length + start, 0) : start;
  let delCount = deleteCount === undefined ? length - startIndex : deleteCount;

  const removed = [];
  for (let i = startIndex; i < startIndex + delCount && i < length; i++) {
    removed.push(this[i]);
  }

  if (items.length < delCount) {
    for (let i = startIndex; i < length - delCount; i++) {
      this[i] = this[i + delCount - items.length];
    }
    this.length -= delCount - items.length;
  } else if (items.length > delCount) {
    for (let i = length - 1; i >= startIndex; i--) {
      this[i + items.length - delCount] = this[i];
    }
    this.length += items.length - delCount;
  }

  for (let i = 0; i < items.length; i++) {
    this[startIndex + i] = items[i];
  }

  return removed;
};

Array.prototype.myConcat = function (...args) {
  const result = [...this];
  for (let arg of args) {
    if (Array.isArray(arg)) {
      result.push(...arg);
    } else {
      result.push(arg);
    }
  }
  return result;
};

Array.prototype.myFlat = function (depth = 1) {
  const result = [];

  function flatten(arr, currentDepth) {
    for (let item of arr) {
      if (Array.isArray(item) && currentDepth > 0) {
        flatten(item, currentDepth - 1);
      } else {
        result.push(item);
      }
    }
  }

  flatten(this, depth);
  return result;
};

Array.prototype.myFlatMap = function (callback) {
  return this.map(callback).myFlat(1);
};

Array.prototype.myFill = function (value, start = 0, end = this.length) {
  const length = this.length;
  let startIndex = start < 0 ? Math.max(length + start, 0) : start;
  let endIndex = end < 0 ? Math.max(length + end, 0) : end;

  for (let i = startIndex; i < endIndex; i++) {
    this[i] = value;
  }

  return this;
};

Array.prototype.myReverse = function () {
  const length = this.length;
  for (let i = 0; i < Math.floor(length / 2); i++) {
    [this[i], this[length - i - 1]] = [this[length - i - 1], this[i]];
  }
  return this;
};

Array.prototype.myJoin = function (separator = ",") {
  let result = "";
  for (let i = 0; i < this.length; i++) {
    result += this[i];
    if (i < this.length - 1) {
      result += separator;
    }
  }
  return result;
};

Array.prototype.myFindLast = function (callback) {
  for (let i = this.length - 1; i >= 0; i--) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

Array.prototype.myFindLastIndex = function (callback) {
  for (let i = this.length - 1; i >= 0; i--) {
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  return -1;
};
