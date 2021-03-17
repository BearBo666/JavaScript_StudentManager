import request from '@/util/request.js'

//辅导员登录
export function TeacherLogin(params) {
    return request({
        url: '/teacher/login',
        method: 'post',
        data: params
    })
}

//辅导员设计成果
export function TeacherDesgin(data) {
    return request({
        url: '/teacher/desgin',
        method: 'post',
        data: data
    })
}

//辅导员查看所有未审核成果
export function GetUnexamined() {
    return request({
        url: '/teacher/list',
        method: 'get'
    })
}

//辅导员审核学生申请
export function TeacherExamine(data) {
    return request({
        url: '/teacher/examine',
        method: 'post',
        data: data
    })
}

//辅导员查看学生申请排名
export function StudentRank() {
    return request({
        url: '/teacher/stuRank',
        method: 'get',
    })
}

//辅导员查看成果申请排名
export function AchieveRank() {
    return request({
        url: '/teacher/achRank',
        method: 'get'
    })
}