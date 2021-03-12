// const { writeFile } = require('./util/File')

// const A = require('./models/achievement')
// const B = require('./models/attribute')

// const x = new A(1, '测试')
// //const b=new B()
// x.addAttribute('k1', "value", false)
// x.addAttribute('k2', "value", false)
// x.addAttribute('k3', "value", false)

// x.save()

const qs = require('qs')


let attributes = []
let x1 = { name: 'k1', value: 'v1', required: false }
let x2 = { name: 'k2', value: 'v2', required: false }


attributes.push(x1)
attributes.push(x2)

let y = qs.stringify({ attributes })
let z = qs.parse(y)

console.log(y)

// console.log(Boolean(z.attrs[0].required) == false)