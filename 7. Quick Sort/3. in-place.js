function quickSort3(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivot = partition(arr, left, right);

    quickSort3(arr, left, pivot - 1);
    quickSort3(arr, pivot + 1, right);
  }
  return arr;
}

function partition (arr, left ,right) {
  let pivot = left; // 以第一个元素为 pivot

  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < arr[left]) { 
      swap(arr, i, pivot);
      pivot += 1;
    }
  }
  swap(arr, left, pivot); //将 pivot 值移至中间
  
  return pivot;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(quickSort(arr));


function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}