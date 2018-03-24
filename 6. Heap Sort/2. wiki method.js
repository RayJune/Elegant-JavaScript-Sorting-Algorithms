function heapSort(arr) {
  const size = arr.length;

  // 初始化 heap，i 从最后一个父节点开始调整，直到节点均调整完毕 
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(i, size);
  }
  // 堆排序：先将第一个元素和已拍好元素前一位作交换，再重新调整，直到排序完毕
  for (let i = size - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapify(0, i);
  }

  return arr;
}

function heapify(start, end) {
  // 建立父节点下标和子节点下标
  const dad = start;
  let son = dad * 2 + 1;

  if (son >= end) { return 0; }

  if (son + 1 < end && arr[son] < arr[son + 1]){
    son += 1;
  }
  if (arr[dad] <= arr[son]) {
    swap(arr, dad, son);
    heapify(son, end);
  }

  return 0;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(heapSort(arr));


function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}