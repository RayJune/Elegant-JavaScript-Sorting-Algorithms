function quickSort3(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivot = left + Math.ceil((right - left) * 0.5);
    const partitionIndex = partition(arr, partitionIndex, left, right);

    quickSort3(arr, left, partitionIndex - 1);
    quickSort3(arr, partitionIndex + 1, right);
  }

  return arr;
}

function partition(arr, pivot, left, right) {
  const pivotValue = arr[pivot];
  let partitionIndex = left;

  swap(arr, pivot, right);
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  swap(arr, right, partitionIndex);

  return partitionIndex;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(quickSort3(arr));


function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}