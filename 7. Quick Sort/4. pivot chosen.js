function quickSort4(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivot = left + Math.ceil((right - left) * 0.5);
    const newPivot = partition(arr, newPivot, left, right);

    quickSort4(arr, left, newPivot - 1);
    quickSort4(arr, newPivot + 1, right);
  }

  return arr;
}

function partition(arr, pivot, left, right) {
  const pivotValue = arr[pivot];
  let newPivot = left;

  swap(arr, pivot, right);
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, newPivot);
      newPivot += 1;
    }
  }
  swap(arr, right, newPivot);

  return newPivot;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(quickSort4(arr));


function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}