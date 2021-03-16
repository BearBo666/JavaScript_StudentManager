import request from '@/util/request.js'

//学生登录
export function StudentLogin(data) {
    return request({
        url: '/student/login',
        method: 'post',
        data: data
    })
}

//学生申请成果
export function StudentApply(data) {
    return request({
        url: '/student/apply',
        method: 'post',
        data: data
    })
}

//学生查看自己申请的成果
export function StudentAchieve(params) {
    return request({
        url: '/student/list',
        method: 'get',
        params: params
    })
}

//学生查看可申请的成果
export function AchieveList() {
    return request({
        url: '/student/index',
        method: 'get',
    })
}