function quickSort2(arr) {
  const pivot = arr.shift();
  const left = [];
  const right = [];

  if (arr.length < 2) { return arr; }

  arr.forEach((element) => {
    element < pivot ? left.push(element) : right.push(element);
  });

  return quickSort2(left).concat([pivot], quickSort2(right));
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(quickSort2(arr));