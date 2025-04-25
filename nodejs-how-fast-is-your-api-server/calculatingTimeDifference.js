// console.log(Date.now());
let timenow = Date.now();
console.log("Time now: ", timenow);

let afterfive = null;

function afterfivesec() {
  setTimeout(() => {
    //   console.log(Date.now());
    afterfive = Date.now();
    console.log("After 5: ", afterfive);

    let diff = afterfive - timenow;

    console.log("Diff: ", diff);
  }, 5000);
}
afterfivesec();
