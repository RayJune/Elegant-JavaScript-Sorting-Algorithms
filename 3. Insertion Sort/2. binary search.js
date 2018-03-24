function insertionSort2(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const temp = arr[i];
    const insertIndex = binarySearch(arr, i - 1, arr[i]);

    for (let preIndex = i - 1; preIndex >= insertIndex; preIndex--) {
      arr[preIndex + 1] = arr[preIndex];
    }
    arr[insertIndex] = temp;
  }

  return arr;
}

function binarySearch(arr, maxIndex, value) {
  let min = 0;
  let max = maxIndex;
  
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);

    if (arr[mid] <= value) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return min;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(insertionSort2(arr));
