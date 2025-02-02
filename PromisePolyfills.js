if (!Promise.all) {
  Promise.all = function (iterable) {
    return new Promise((resolve, reject) => {
      let results = [];
      let remaining = iterable.length;

      iterable.forEach((promise, index) => {
        // Ensure that the value is a promise
        Promise.resolve(promise)
          .then((value) => {
            results[index] = value; // Store resolved value
            remaining--; // Decrease remaining promises
            if (remaining === 0) {
              resolve(results); // All promises resolved
            }
          })
          .catch(reject); // If any promise rejects, reject the whole `all`
      });
    });
  };
}

if (!Promise.any) {
  Promise.any = function (iterable) {
    return new Promise((resolve, reject) => {
      let errors = [];
      let remaining = iterable.length;

      iterable.forEach((promise) => {
        Promise.resolve(promise)
          .then(resolve) // Resolve as soon as any promise resolves
          .catch((error) => {
            errors.push(error); // Store rejected error
            remaining--;
            if (remaining === 0) {
              reject(new AggregateError(errors, "All promises were rejected")); // Reject if all fail
            }
          });
      });
    });
  };
}

if (!Promise.race) {
  Promise.race = function (iterable) {
    return new Promise((resolve, reject) => {
      iterable.forEach((promise) => {
        // Resolve or reject as soon as the first promise settles
        Promise.resolve(promise).then(resolve).catch(reject);
      });
    });
  };
}

if (!Promise.allSettled) {
  Promise.allSettled = function (iterable) {
    return new Promise((resolve) => {
      let results = [];
      let remaining = iterable.length;
      let settledCount = 0;

      iterable.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((value) => {
            results[index] = { status: "fulfilled", value }; // Track resolved value
            settledCount++;
            if (settledCount === remaining) resolve(results); // Resolve when all settled
          })
          .catch((reason) => {
            results[index] = { status: "rejected", reason }; // Track rejected reason
            settledCount++;
            if (settledCount === remaining) resolve(results); // Resolve when all settled
          });
      });
    });
  };
}
