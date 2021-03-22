//快速排序
function quickSort(arr, key) {
    if (arr.length <= 1) { return arr; }

    //基准值
    var pivot = arr[0];

    //小于基准值
    var left = [];
    //大于基准值
    var right = [];

    //遍历数组
    for (var i = 1; i < arr.length; i++) {
        //小于基准值推入left,大于基准值推入right
        if (arr[i][key] < pivot[key]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    //连接三个数组
    return quickSort(left, key).concat([pivot], quickSort(right, key))
}

module.exports = {
    quickSort
}