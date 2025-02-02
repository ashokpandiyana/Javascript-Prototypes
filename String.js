let string = "Hello World!";

function getCharacter(string, index) {
  if (index > string.length) {
    return null;
  }
  return string[index];
}

console.log(getCharacter(string, 10));
console.log(getCharacter(string, 15));

if (!String.prototype.myCharAt) {
  String.prototype.myCharAt = function (index) {
    // If index is out of bounds, return an empty string
    if (index < 0 || index >= this.length) {
      return "";
    }
    return this[index]; // Return the character at the specified index
  };
}

if (!String.prototype.myCharCodeAt) {
  String.prototype.myCharCodeAt = function (index) {
    // Ensure index is a valid number
    if (index < 0 || index >= this.length || isNaN(index)) {
      return NaN;
    }
    return this.codePointAt(index);
  };
}

if (!String.prototype.myAt) {
  String.prototype.myAt = function (index) {
    // Convert index to an integer
    index = Math.trunc(index) || 0;

    // Handle negative indices
    if (index < 0) index += this.length;

    // Return empty string if index is out of range
    if (index < 0 || index >= this.length) return "";

    return this[index];
  };
}

if (!String.prototype.myIndexOf) {
  String.prototype.myIndexOf = function (substr, fromIndex) {
    // Ensure substr is a string
    if (typeof substr !== "string") return -1;

    // Default `fromIndex` to 0 if not provided or invalid
    fromIndex = Number(fromIndex) || 0;

    // If fromIndex is negative, treat it as 0
    if (fromIndex < 0) fromIndex = 0;

    // Iterate through the string to find the substring
    for (let i = fromIndex; i <= this.length - substr.length; i++) {
      if (this.slice(i, i + substr.length) === substr) {
        return i; // Found, return the index
      }
    }
    return -1; // Not found
  };
}

if (!String.prototype.myLastIndexOf) {
  String.prototype.myLastIndexOf = function (substr, fromIndex) {
    // Ensure substr is a string
    if (typeof substr !== "string") return -1;

    // Default `fromIndex` to the last character index if not provided
    fromIndex = fromIndex !== undefined ? Number(fromIndex) : this.length - 1;

    // If fromIndex is out of bounds, clamp it
    if (fromIndex >= this.length) fromIndex = this.length - 1;
    if (fromIndex < 0) return -1; // If negative, return -1 (not found)

    // Iterate backwards to find the last occurrence of substr
    for (let i = fromIndex; i >= 0; i--) {
      if (this.slice(i, i + substr.length) === substr) {
        return i; // Found, return the index
      }
    }
    return -1; // Not found
  };
}

if (!String.prototype.myIncludes) {
  String.prototype.myIncludes = function (substr, fromIndex) {
    // Ensure substr is a string
    if (typeof substr !== "string") {
      throw new TypeError("First argument must be a string");
    }

    // Default `fromIndex` to 0 if not provided
    fromIndex = Number(fromIndex) || 0;

    // If fromIndex is negative, normalize it
    if (fromIndex < 0) fromIndex = 0;

    // Use `indexOf()` to check if substr exists
    return this.indexOf(substr, fromIndex) !== -1;
  };
}

if (!String.prototype.myStartsWith) {
  String.prototype.myStartsWith = function (substr, position) {
    // Ensure substr is a string
    if (typeof substr !== "string") {
      throw new TypeError("First argument must be a string");
    }

    // Default `position` to 0 if not provided or invalid
    position = Number(position) || 0;

    // Ensure position is within bounds
    if (position < 0) position = 0;

    // Compare substring with slice of main string
    return this.slice(position, position + substr.length) === substr;
  };
}
