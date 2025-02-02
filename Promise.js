const myPromise = new Promise((resolve, reject) => {
  const success = true; // Simulate a condition
  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject("Operation failed!");
  }
});

myPromise
  .then((result) => {
    console.log(result); // "Operation succeeded!"
  })
  .catch((error) => {
    console.error(error); // "Operation failed!"
  })
  .finally(() => {
    console.log("Promise settled."); // Runs regardless of success/failure
  });

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched"), 1000);
  });
};

const processData = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${data} and processed`), 1000);
  });
};

fetchData()
  .then(processData)
  .then((result) => {
    console.log(result); // "Data fetched and processed"
  })
  .catch((error) => {
    console.error(error);
  });
