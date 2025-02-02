// Creation methods
const person = {
  name: "Alice",
  age: 30,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const obj = new Object();
obj.name = "Bob";

const parent = {
  greet() {
    console.log("Hello!");
  },
};

const child = Object.create(parent);
child.name = "Charlie";

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
const alice = new Person("Alice", 30);
alice.greet();
// Modifying
const obj = {};
obj.name = "John"; // Add
obj.age = 25; // Add
obj.name = "Doe"; // Modify

delete obj.age;

console.log("name" in obj); // true
console.log(obj.hasOwnProperty("name")); // true

// Object Methods
const target = { a: 1 };
const source = { b: 2 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2 }

const user = { name: "Eve", age: 28 };
console.log(Object.keys(user)); // ["name", "age"]
console.log(Object.values(user)); // ["Eve", 28]
console.log(Object.entries(user)); // [["name", "Eve"], ["age", 28]]

const obj = { name: "John" };
Object.freeze(obj); // Prevents any modification
obj.name = "Mike"; // No effect
delete obj.name; // No effect

const obj2 = { age: 30 };
Object.seal(obj2); // Allows modification but prevents addition/removal
obj2.age = 31; // Allowed
delete obj2.age; // Not allowed

const entries = [
  ["name", "Alice"],
  ["age", 30],
];
const user = Object.fromEntries(entries);
console.log(user); // { name: "Alice", age: 30 }

// Object Prototypes
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};
const bob = new Person("Bob");
bob.greet();

// Cloning
const original = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, original);
shallowCopy.b.c = 42;
console.log(original.b.c); // 42 (Reference issue!)

const deepCopy = JSON.parse(JSON.stringify(original));
const deepClone = structuredClone(original);
