//以指定字符分割数组
function SplitArray(array, str) {
    let newArray = []
    let temp = []

    //遍历数组
    for (let i = 0, length = array.length; i < length; i++) {
        if (array[i] == str) {
            newArray.push(temp)
            temp = []
        } else {
            temp.push(array[i])
        }
    }
    return newArray
}

module.exports = {
    SplitArray
}
