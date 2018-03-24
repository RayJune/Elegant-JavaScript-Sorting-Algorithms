function selectionSort2(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let maxIndex = i;

    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }
    if (i !== maxIndex) {
      swap(arr, i, maxIndex);
    }
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(selectionSort2(arr));


function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}