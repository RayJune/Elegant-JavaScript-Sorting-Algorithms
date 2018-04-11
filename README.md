## 优雅的 JavaScript 排序算法（ES6）

>面试官：小伙子排序算法了解吗？

>回答：我能写出来*四种冒泡排序*，*两种选择排序*，*两种插入排序*，*两种哈希排序*，*两种归并排序*，*两种堆排序*，*四种快速排序*。

>用我自己的方式。

## 前言

文中所有代码位于位于[此代码仓库](https://github.com/RayJune/Elegant-JavaScript-Sorting-Algorithms)中，推荐下载代码进行练习、推敲。

***

号外：博主为 18 届应届生，目前状态是*前端开发*补招进行时。如有内推机会，欢迎一波流带走 ：》
check 在线简历：[resume.pdf](https://www.rayjune.me/resume.pdf)

另，如果觉得这些用心敲出的代码对你有帮助的话，欢迎 star 一下[代码仓库](https://github.com/RayJune/Elegant-JavaScript-Sorting-Algorithms)，**众筹博主找到一份体面的工作，在这里给大家递茶了**：）

***

P.S. 原文显示效果更好喔：） check：[rayjune.me/优雅的 JavaScript 排序算法（ES6）](https://www.rayjune.me/2018/03/22/elegant-javascript-sorting-algorithm-es6/)

作者：[RayJune](https://github.com/rayjune)（**转载请署名，请尊重博主含辛茹苦、遍查资料、一行一行含泪码出来的成果**。参考&感谢 部分里代码参考地址都已列出）

另，本文中常使用 `swap` 函数，在这里提前列出来，以下就省略了。

```js
function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}
```

## 冒泡排序 Bubble Sort

### 简明解释

通过**依次比较、交换相邻的元素大小**（按照由小到大的顺序，如果符合这个顺序就不用交换）。

*1 次这样的循环可以得到一个最大值，`n - 1` 次这样的循环可以排序完毕*。

### 属性

* 稳定
* 时间复杂度 `O(n²)`
* 交换 `O(n²)`
* 对即将排序完成的数组进行排序 `O(n)`（但是这种情况下不如插入排序块，请继续看下文）

### 核心概念

* 利用*交换，将最大的数冒泡到最后*
* 使用*缓存 `postion`* 来优化
* 使用*双向遍历*来优化

### 第一版：基本实现

```JavaScript
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(bubbleSort(arr));
```

### 第二版：缓存 pos

设置一标志性变量 `pos`,用于*记录每趟排序中最后一次进行交换的位置*。
由于 `pos` 位置之后的记录均已交换到位,故*在进行下一趟排序时只要扫描到 `pos` 位置即可*。

```JavaScript
function bubbleSort2(arr) {
  let i = arr.length - 1;

  while (i > 0) {
    let pos = 0;

    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        swap(arr, j, j + 1);
      }
    }
    i = pos;
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(bubbleSort2(arr));
```

### 第三版：双向遍历

传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,
我们可以 **在每趟排序中进行正向和反向两遍冒泡** ，
一次可以得到两个最终值（最大和最小） , 从而*使外排序趟数几乎减少了一半*。

```JavaScript
function bubbleSort3(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
      }
    }
    end -= 1;
    for (let i = end; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i);
      }
    }
    start += 1;
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(bubbleSort3(arr));
```

### 第四版：结合 2&3

前两种优化方式（缓存 `pos`、双向遍历）的结合：

```JavaScript
function bubbleSort4(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let endPos = 0;
    let startPos = 0;

    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        endPos = i;
        swap(arr, i, i + 1);
      }
    }
    end = endPos;
    for (let i = end; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        startPos = i;
        swap(arr, i - 1, i);
      }
    }
    start = startPos;
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(bubbleSort4(arr));
```

### 蚂蚁金服面试

来自于蚂蚁金服的一道面试题：

>对于冒泡排序来说，能不能传入第二个参数（参数为函数），来控制升序和降序？（联想一下 `array.sort()`）

```JavaScript
function bubbleSort(arr, compareFunc) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (compareFunc(arr[j], arr[j + 1]) > 0) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(bubbleSort(arr, (a, b) => a - b));
console.log(bubbleSort(arr, (a, b) => b - a));
```

## 选择排序 Selection Sort

### 简明解释

**每一次内循环遍历寻找最小的数**，记录下 `minIndex`，并*在这次内循环结束后交换 `minIndex` 和 `i` 的位置*。

重复这样的循环 `n - 1` 次即得到结果。

### 属性

* 不稳定
* `Θ(n²)` 无论什么输入，均为 `Θ(n²)`
* `Θ(n) 交换`: **注意，这里只有 `n` 次的交换，选择排序的唯一优点***

关于 Θ(n) swaps:

>Selection sort has the property of minimizing the number of swaps. In applications where the cost of swapping items is high, selection sort very well may be the algorithm of choice.

可见**即使是我们觉得最慢的选择排序，也有它的用武之地**。

### 核心概念

* “可预测”的时间复杂度，什么进来都是 `O(n²)`，但不稳定，*唯一的优点是减少了 `swap` 次数*。

### 第一版：基本实现

```JavaScript
function selectionSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(selectionSort(arr));
```

### 第二版：找到最大值

如果你想在每次内循环中*找到最大值并把其交换到数组的末尾*（相比较 `minIndex` 有点麻烦），以下是实现的代码：

```JavaScript
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
```

## 插入排序 Insertion Sort

### 简明解释

默认 *`a[0]` 为已排序数组中的元素*，*从 `arr[1]` 开始逐渐往已排序数组中插入元素*，**从后往前一个个比较，如果待插入元素小于已排序元素，则已排序元素往后移动一位**，直到待插入元素找到合适的位置并插入已排序数组。

经过 `n - 1` 次这样的循环插入后排序完毕。

### 属性

* 稳定
* 适合场景：*对快要排序完成的数组时间复杂度为 `O(n)`*
* *非常低的开销*
* 时间复杂度 `O(n²)`

>由于它的优点（自适应，低开销，稳定，几乎排序时的`O（n）`时间），插入排序通常用作递归基本情况（当问题规模较小时）针对较高开销分而治之排序算法， 如*希尔排序*或*快速排序*。

### 核心概念

* *高性能（特别是接近排序完毕时的数组），低开销，且稳定*
* 利用*二分查找*来优化

### 第一版：基本实现

```JavaScript
function insertionSort(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const temp = arr[i];
    let preIndex = i - 1;

    while (arr[preIndex] > temp) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex -= 1;
    }
    arr[preIndex + 1] = temp;
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(insertionSort(arr));
```

### 二分查找算法

因为对于插入排序的优化方法是二分查找优化，这里补充一下二分查找的算法的实现。

核心概念是：*折半*。

```JavaScript
function binarySearch(arr, value) {
  let min = 0;
  let max = arr.length - 1;
  
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);

    if (arr[mid] === value) {
      return mid;
    } else if (arr[mid] > value) {
      max = mid - 1;
    } else {
      min = mid + 1;
    }
  }

  return 'Not Found';
}

// test
const arr = [1, 2, 3];
console.log(binarySearch(arr, 2));  // 1
console.log(binarySearch(arr, 4));  // Not Found
```

### 第二版：使用二分查找

首先把二分查找算法做一点小修改，以适应我们的插入排序：

```JavaScript
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
```

然后在查找插入位置时*使用二分查找*的方式来优化性能：

```JavaScript
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

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(insertionSort2(arr));
```

## 希尔排序 Shell Sort

### 简明解释

希尔排序是*插入排序的改进版*，它**克服了插入排序只能移动一个相邻位置的缺陷**（希尔排序可以一次移动 `gap` 个距离），*利用了插入排序在排序几乎已经排序好的数组的非常快的优点*。

使用可以动态定义的 `gap` 来渐进式排序，*先排序距离较远的元素，再逐渐递进*，而*实际上排序中元素最终位置距离初始位置远的概率是很大的*，所以希尔排序大大提升了性能（**尤其是 reverse 的时候非常快**，想象一下这时候冒泡排序和插入排序的速度）。

而且希尔排序不仅效率较高（比冒泡和插入高），它的代码相对要简短，低开销（*继承插入排序的优点*），*追求这些特点（效率要求过得去就好，代码简短，开销低，且数据量较小）的时候希尔排序是好的 `O(n·log(n))` 算法的替代品*。

总而言之：希尔排序的性能优化来自*增量队列的输入*和 *`gap` 的设定*。

### 属性

* 不稳定
* 在快要排序完成的数组有 `O(n·log(n))` 的时间复杂度（并且它对于反转数组的速度非常快）
* `O(n^3/2)` time as shown (想要了解更多细节，请查阅 [wikipedia Shellsort](https://en.wikipedia.org/wiki/Shellsort#Applications)）

关于不稳定:

>我们知道, 单次直接插入排序是稳定的，它不会改变相同元素之间的相对顺序，*但在多次不同的插入排序过程中, 相同的元素可能在各自的插入排序中移动*，可能导致相同元素相对顺序发生变化。因此, *希尔排序并不稳定*。

关于 worse-case time 有一点复杂:

>The worse-case time complexity of shell sort depends on the increment sequence. For the increments 1 4 13 40 121…, which is what is used here, the time complexity is O(n3/2). For other increments, time complexity is known to be O(n4/3) and even O(n·log2(n)).

### 核心概念

希尔排序是*基于插入排序*的以下两点性质而提出改进方法的：
  
1. **插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到 `O(n)` 的效率**；
2. *但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位* ；

其中 *`gap`（增量）的选择是希尔排序的重要部分*。只要最终 `gap` 为 1 任何 `gap` 序列都可以工作。算法最开始以一定的 `gap` 进行排序。然后会继续以一定 `gap` 进行排序，*直到 `gap = 1` 时，算法变为插入排序*。

Donald Shell 最初建议 `gap` 选择为 `n / 2` 并且对 `gap` 取半直到 `gap` 达到 1 。虽然这样取可以比 O(n²) 类的算法（插入排序、冒泡排序）更好，但这样仍然有减少平均时间和最差时间的余地。
（关于优化 `gap` 的细节涉及到复杂的数学知识，我们这里不做深究，详细可以参考 [wikipedia 上的页面](https://en.wikipedia.org/wiki/Shellsort)）

### 第一版：基本实现
  
Donald Shell 的最初建议（`gap = n / 2`）版代码（方便理解）：
  
```JavaScript
function shellSort(arr) {
  const len = arr.length;
  let gap = Math.floor(len / 2);

  while (gap > 0) {
    // 注意下面这段 for 循环和插入排序极为相似
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let preIndex = i - gap;

      while (arr[preIndex] > temp) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }
      arr[preIndex + gap] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(shellSort(arr));
```
  
### 第二版：Knuth's increment sequence

常见的、易生成的、优化 `gap` 的序列方法（来自 Algorithms (4th Edition) ，有些更快的方法但序列不容易生成，因为用到了比较深奥的数学公式）：

```JavaScript
function shellSort(arr) {
  const len = arr.length;
  let gap = 1;

  while (gap < len / 3) {
    gap = gap * 3 + 1;
  }
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let preIndex = i - gap;

      while (arr[preIndex] > temp) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }
      arr[preIndex + gap] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(shellSort(arr));
```

## 归并排序 Merge Sort

### 简明解释

归并排序使用*分而治之*的思想，以*折半*的方式来*递归/迭代*排序元素，利用空间来换时间，做到了时间复杂度 `O(n·log(n))` 的同时保持了稳定。

这让它在一些更考虑排序效率和稳定性，*次考虑存储空间的场合非常适用*（如数据库内排序，和堆排序相比，归并排序的稳定是优点）。并且**归并排序非常适合于链表排序**。

### 属性

* 稳定 (**在 `O(n·log(n))` 时间复杂度的排序算法中，归并排序是唯一稳定的**)
* 时间复杂度 `O(n·log(n))`
* *对于数组需要 Θ(n) 的额外空间* 注意：*归并排序需要额外的空间，这是它的不完美之处*
* *对于链表需要 O(log(n)) 的额外空间*，所以*归并排序非常适合列表的排序*
* **Does not require random access to data** 因为这个特点，归并排序很适合用来排序列表

### 核心概念

* **分而治之**的思想
* *空间换时间，并且稳定*，*保持稳定性这一点是它的亮点*
* *二分思想*

### 第一版：基本实现

以迭代的方式来实现（但要注意防止函数调用过深导致 JavaScript 的运行栈溢出）：

```JavaScript
function mergeSort(arr) {
  const len = arr.length;

  if (len < 2) { return arr; }

  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];

  while (left.length > 0 && right.length > 0) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift());
  }

  return result.concat(left, right);
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(mergeSort(arr));
```

### 第二版：空间优化

用 `array.splice` 取代 `array.slice`，减少一半的空间消耗。

```JavaScript
function mergeSort2(arr) {
  const len = arr.length;

  if (len < 2) { return arr; }

  const mid = Math.floor(len / 2);
  const left = arr.splice(0, mid);
  const right = arr;

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];

  while (left.length > 0 && right.length > 0) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift());
  }

  return result.concat(left, right);
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(mergeSort2(arr));
```

## 堆排序 Heap Sort

### 简明解释

堆排序可以认为是*选择排序的改进版*，像选择排序一样*将输入划分为已排序和待排序*。

不一样的是堆排序*利用堆这种近似完全二叉树的良好的数据结构来实现排序*，本质上使用了*二分的思想*。

1. *先将所有的数据堆化*
2. *然后移动 `arr[0]` 到数组末尾（已排序区域）*
3. *再重新堆化*，依次这样循环来排序。

利用堆这种良好的数据结构，它在拥有*良好的可预测性*的同时（不管输入什么都是 `O(n·log(n))` 时间复杂度），*但它的缺点也有：即不稳定*，而且 `O(n·log(n))` 的平均效率决定了它的效率不如快速排序。适用于数据库内引擎排序（需要这样的可预测性性能）。

### 属性

* 不稳定
* O(n·log(n)) time

### 核心概念

* 利用良好的数据结构——堆，来排序
* 二分的思想
* 选择排序的改进版，继承了"可预测性"（什么数据输入都为 `O(n·log(n)` time）

### 第一版：基本实现

```JavaScript
function heapSort(arr) {
  let size = arr.length;

  // 初始化堆，i 从最后一个父节点开始调整，直到节点均调整完毕 
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(arr, i, size);
  }
  // 堆排序：先将第一个元素和已拍好元素前一位作交换，再重新调整，直到排序完毕
  for (let i = size - 1; i > 0; i--) {
    swap(arr, 0, i);
    size -= 1;
    heapify(arr, 0, size);
  }

  return arr;
}

function heapify(arr, index, size) {
  let largest = index;
  let left = 2 * index + 1;
  let right = 2 * index + 2;

  if (left < size && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < size && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== index) {
    swap(arr, index, largest);
    heapify(arr, largest, size);
  }
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(heapSort(arr));
```

### 维基上给出的另一个方法

wikipedia 上给出的方法于第一版的区别在于*维护堆性质时采用的方式不同*，本质是一样的：

```JavaScript
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
```

## 快速排序 Quick Sort

### 简明解释

1. 从数列中挑出一个元素，称为"基准"（pivot），
2. 重新排序数列，*所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面*（相同的数可以到任何一边）。在这个分区结束之后，该基准就处于数列的中间位置。这个称为*分区（partition）操作*。
3. 递归地（recursively）把小于基准值元素的子数列和大于基准值元素的子数列排序。

### 属性

* 不稳定
* O(n²) time, 但是通常都是 O(n·log(n)) time (或者更快)
* O(log(n)) extra space

>*When implemented well, it can be about two or three times faster than its main competitors, merge sort and heap sort*

### 核心概念

* 使用了**分而治之**的思想

### 第一版：基本实现

```JavaScript
function quickSort(arr) {
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  if (arr.length < 2) { return arr; }

  for (let i = 1, len = arr.length; i < len; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }

  return quickSort(left).concat([pivot], quickSort(right));
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(quickSort(arr));
```

### 第二版：函数式编程

函数式编程：结构清晰，一目了然。

```js
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
```

### 第三版：in-place

等等，有没有觉得第一、二版中的代码虽然看起来简洁，但是却对空间消耗很大呢？

由此有了 in-place 版本：

```js
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
console.log(quickSort3(arr));
```

### 第四版：关于 pivot 的选取

这一版的亮点是 pivot 的选取，不再是简单的取 `arr[0]`，而是：

```js
const pivot = left + Math.ceil((right - left) * 0.5)
```

非常感谢评论区的大神 @Chris_dong 的解释：

>`const pivot = left + Math.ceil((right - left) * 0.5)` => (去掉MAth.ceil是不是很好理解) `left + (right - left) * 0.5` => `(right + left) * 0.5`。

看到真相的我眼泪掉下来，原来是取中间值。。。

由此有了以下版本：

```js
function quickSort4(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    // const pivot = left + Math.ceil((right - left) * 0.5);
    const pivot = Math.floor((right + left) / 2);
    const newPivot = partition(arr, pivot, left, right);

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

const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(quickSort4(arr));
```

## 总结 & 答疑

提出几个问题，可以当做自我检测：

* 数据几乎快排序完成时？

插入排序不解释

* 数据量小，对效率要求不高，代码简单时？

性能大小：希尔排序 > 插入排序 > 冒泡排序 > 选择排序
 
* 数据量大，要求稳定的效率（不会像快速排序一样有 `O(n²)` 的情况）（如数据库中）？

堆排序

* 数据量大，要求效率高，而且要稳定？

归并排序

* 数据量大，要求最好的平均效率？

性能大小：快速排序 > 堆排序 > 归并排序

因为虽然堆排序做到了 `O(n·log(n)`，而快速排序的最差情况是 `O(n²)`，但是快速排序的绝大部分时间的效率比 `O(n·log(n)` 还要快，所以快速排序真的无愧于它的名字。（十分快速）

* 选择排序绝对没用吗？

选择排序只需要 `O(n)` 次交换，这一点它完爆冒泡排序。

***

答疑：

* 博主你的代码从哪里抄的？

都是博主含辛茹苦、遍查资料、一行一行含泪认真码出来的。参考&感谢 部分里列出了所有来源地址：）

* 为什么不用 ES5 写呢？

实际上这篇文章继承于[优雅的 JavaScript 排序算法](https://www.rayjune.me/2017/10/19/elegant-javascript-sorting-algorithm/) 。这一版是上一般的姐妹版（解释精简，使用 ES6 使代码更精简），若想参考英文引用、ES5 代码、过程详细解释可以参考[第一版](https://www.rayjune.me/2017/10/19/elegant-javascript-sorting-algorithm/)。

用 `ES6` 是为了更强大的表现力，从而让我们更加关注于算法的内在，不被一些边边角角所束缚。

## 附录：代码风格

博主一向认为是有【*代码品味*】这种东西存在的，可以从之前的这篇文章[从 shuffle 看代码品味](http://localhost:4000/2018/03/13/see-code-taste-from-shuffle/)一窥端倪。

再次表达一下自己的观点：

* 软件开发不是教条
* 代码品味没有高低

但是追求的最终目的是一致的：**好读又简洁，稳定易维护**。

为了这个目标我做了这些努力：

* *注重*可读性变量名*：如 `preIndex`, `temp`, `size`；
* *一目了然的函数结构*： <br>function () { <br>&nbsp;&nbsp;const/let ...; <br> <br>  &nbsp;&nbsp;function body <br> <br> &nbsp;&nbsp;return...; <br>}；
* 在计算 `len / 2` 的取整时*为了可读性*选择了 `Math.floor(len / 2)`，没有选择 `len >> 1` 和 `parseInt(len / 2, 10)`；
* 注意*区分 `for` 和 `while` 的使用场景*，具体可以看这个问题的答案：<br>https://stackoverflow.com/questions/39969145/while-loops-vs-for-loops-in-JavaScript；
* *为了简单直观*，未使用 `Array.isArray()`，`Object.prototype.toString.call()`，`typeOf`, `instanceOf` 来检查 `arr` 是不是数组类型，默认 `arr` 就是数组类型；
* *使用三元运算符 `( ? : )` 来减少 `if` 的嵌套，提高代码可读性*；
* 自增（`++`）和自减（`--`）运算符使用 `+=` 和 `-=` 代替 (`for` 中的最后一个条件除外)；
* 使用 `ES6` 中的默认参数方式（快速排序中）简化代码，将关键逻辑突出；
* `Eslint` + Airbnb 全局控制代码风格;
* 在风格之外加上自己的喜好，比如用 `function` 声明函数，具体原因见：[从 shuffle 看代码品味](https://www.rayjune.me/2018/03/13/see-code-taste-from-shuffle/#%E6%9C%80%E7%BB%88%E8%A7%A3%E7%AD%94)。

这是我的品味，你的呢：）

## 引用 & 感谢

* Wikipedia about Sorting Algorithms (English & Chinese)，参考了其中的概念解释和代码实现（进行修改），：<br>https://en.wikipedia.org/wiki/Sorting_algorithm 
* Sorting Algorithms visualization (English)，**强烈推荐看**，*对理解排序算法运行的过程很有帮助*: <br>https://www.toptal.com/developers/sorting-algorithms 
* stackOverFlow Sorting Algorithms 参考其中排序算法相关的答案来辅助理解：<br>https://www.quora.com/Why-do-we-need-so-many-sorting-algorithms<br>https://www.quora.com/Why-is-shell-sort-faster-than-insertion-sort-and-bubble-sort<br>https://www.quora.com/Why-is-heap-sort-used<br>还有一些就不一一列举了...
* damonare's demonstrate (Chinese)，参考了其中冒泡排序 1,2,3；*参考其中的动图来辅助理解*； 选择排序；归并排序的实现；并进行修改:<br>https://github.com/damonare/Sorts
* 参考其中的<br> quick sort in-place edition https://gist.github.com/paullewis/1981455，并进行修改
* hustcc's gitbook (Chinese)，参考了其中的快速排序，希尔排序的实现，并进行修改<br>https://sort.hust.cc/6.quickSort.html 
