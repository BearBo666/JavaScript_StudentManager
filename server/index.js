const qs = require('qs')

// let x = [
//     { name: '举办地', value: '武科大' },
//     { name: '学分', value: '2个' }
// ]

// let y = [
//     { name: '队长', required: true },
//     { name: '队伍人数', required: true },
//     { name: '选题', required: true },
// ]

// console.log(qs.stringify(x))

// console.log(qs.stringify(y))

let obj = {
    '队长': '谢廷玉',
    '队伍人数': 5,
    '选题': 23
}

console.log(qs.stringify(obj))