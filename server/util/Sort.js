//快速排序  默认升序
function Sort(array, key, type) {
    let i = 0, j = array.length - 1
    while (i < j) {
        while (i < j && array[i][key] <= array[j][key]) {
            j--
        }
        if (i < j) {
            array = exchange(array, i, j)
            i++
        }
        while (i < j && array[i][key] <= array[j][key]) {
            i++
        }
        if (i < j) {
            array = exchange(array, i, j)
            j--
        }
    }
    if (type < 0) {
        array.reverse()
    }
    return array
}

//交换数组中两元素
function exchange(array, from, to) {
    [array[from], array[to]] = [array[to], array[from]]
    return array
}

module.exports = {
    Sort
}