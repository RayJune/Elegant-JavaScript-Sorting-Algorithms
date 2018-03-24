function quickSort2(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const partitionIndex = partition(arr, left, right);

    quickSort2(arr, left, partitionIndex - 1);
    quickSort2(arr, partitionIndex + 1, right);
  }
  return arr;
}

function partition (arr, left ,right) {
  let partitionIndex = left;

  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < arr[left]) { // 以第一个元素为 pivot
      swap(arr, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  swap(arr, left, partitionIndex); //将 pivot 值移至中间
  
  return partitionIndex;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(quickSort(arr));


function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}