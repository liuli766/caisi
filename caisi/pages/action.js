import axios from "axios"
// axios.interceptors.request.use((config) => {
//   // 在发送请求之前做某件事
//   if (config.method === 'post') {
//     config.data = JSON.stringify(config.data);
//   }
//   return config;
// }, (error) => {
//   console.log('错误的传参')
//   return Promise.reject(error);
// })

// axios.interceptors.response.use((res) => {
//   let { data } = res;
//   if (data.code === 0 || data.code === 1) {
//     return Promise.resolve(data.data);
//   }
//   return Promise.reject(data);
// }, (error) => {
//   return Promise.reject(error);
// })

let state

export const request = (config) => {
    if (!state) {
        state = $nuxt.$store.state
    }
    let headers = config.headers || {}
    let token = $nuxt.$store.getters.getToken
    let data = $nuxt.$cookies.get("loginData")
    if (data && data.token) {
        token = data.token;
        $nuxt.$store.commit("doLogin", data);
    }
    config.headers = {
        ...headers,
        "x-authorize-token": token,
        "web-authorize-flag": state.authKey
    }
    return axios.request(config).then(res => {
        let {
            data
        } = res
        if (data.code === 0 || data.code === 1) {
            return Promise.resolve(data.data)
        }
        // 需要登录
        if (data.code === 4006 || data.code === 4007) {
            $nuxt.$store.commit("cleartoken")
            $nuxt.$store.state.loginclose = true
        }
        return Promise.reject(data)
    })
}

export const get = (url, param, headers) => {
    let paramStr = url + "?"
    if (param) {
        for (let key in param) {
            paramStr += `${key}=${param[key]}&`
        }
    }
    paramStr = paramStr.substring(0, paramStr.length - 1)
    return request({
        url: paramStr,
        headers,
        method: "get"
    })
}
export const post = (url, data, headers) => {
    return request({
        url,
        headers,
        method: "post",
        data
    })
}
export const put = (url, data, headers) => {
    return request({
        url,
        headers,
        method: "put",
        data
    })
}

export const postJson = (url, data, headers = {}) => {
    return request({
        url,
        headers: {
            ...headers,
            "Content-type": "application/json"
        },
        method: "post",
        data
    })
}
export const fetchErrorMessage = (e, message, o) => {
    if (e.code === 4006 || e.code === 4007) {
        $nuxt.$message.error("请登录");
        return;
    }
    if (e.code === -1 && !o) {
        $nuxt.$message.error(message)
    } else {
        $nuxt.$message.error(e.message)
    }
}
export const flagPromise = async function (fetchPromise, flag, errorMessage) {
    if (flag) {
        this.flag[flag] = true
    }
    return fetchPromise.then(r => r).catch(e => {
        fetchErrorMessage(e, errorMessage)
        throw e
    }).finally(() => {
        if (flag) {
            this.flag[flag] = false
        }
    })
}
export const fetchIndustry = async function () {
    return get("/question/v1/pc/setmeal/trade/list")
}

export const fetchSubject = async function (tradeId) {
    return get("/question/v1/pc/setmeal/examination/list", {
        tradeId
    })
}
export const fetchPackageList = async function (data) {
    return postJson("/question/v1/pc/setmeal/setmeal/list", data)
}
export const createOrder = async function (productIds, setMealId) {
    return postJson("/order/v1/member/order/build", {
        productList: productIds,
        setMealId
    })
}
export const orderPay = async function (data) {
    return postJson("/order/v1/pc/pay/pay", data)
}
export const orderDetail = async function (orderId) {
    return postJson("/order/v1/pc/member/order/info", {
        orderId
    })
}

export const currentUserInfo = async function () {
    return get("/user/v1/pc/get/pc/user/info")
}
/**
 *
 * type 类型1注册 2登录 3忘记密码
 */
export const sendVcode = async function (type, phone) {
    return get(`/user/v1/app/send/sms/${type}/${phone}`)
}

export const updatePass = async function (oldPass, newPass) {
    return put("/user/v1/app/pc/update/pass", {
        oldPass,
        password: newPass
    })
}

export const updatePhone = async function (phone, code) {
    return put(`/user/v1/app/update/phone/${phone}/${code}`)
}

export const uploadFile = async function (files, flag) {
    return post("/user/v1/app/upload/pictures", {
        files,
        flag
    })
}

/**
 *
 * @param {
 * cityId:0,
 * "date": "string",
 * "headImg": "string",,
 * "major": "string",
 * "nickName": "string",
 *  "sex": 0
 * } data
 */
export const updateUserInfo = async function (data) {
    return put("/user/v1/app/update/nick/name", {
        ...data,
        date: data.birthDay
    })
}
/**
 *
 * @param {
 * "pageNo": 0,
 * "pageSize": 0
 * } page
 */
export const fetchCompletedOrder = async function (page) {
    return post("/order/v1/pc/member/order/list/completed", page)
}
export const fetchUnpairOrder = async function (page) {
    return post("/order/v1/pc/member/order/list/unpair", page)
}
export const fetchAllOrder = async function (page) {
    return post("/order/v1/pc/member/order/list/unpair/and/completed", page)
}
export const cancelOrder = async function (orderId) {
    return post("/order/v1/pc/member/order/cancel", {
        orderId
    })
}
export const fetchMessage = async function (page) {
    return post("/user/v1/pc/get/member/message/list", page)
}

export const fetchUserSetmeal = async function (page) {
    return get("/question/v1/pc/select/question/manager")
}
export const fetchRegister = async function (data) { // 注册
    return post("/user/v1/pc/register", data)
}
export const fetchlogin = async function (data) { // 登录
    return post("/user/v1/pc/login", data)
}
export const fetchPhoneVCode = async function (phone) {
    return get(`/user/v1/app/send/sms/1/${phone}`)
}
export const fetchcategory = async function () { // 查询刷题页面选中科目信息
    return get("/question/v1/make/question/index/select/category")
}
export const fetchlist = async function () {
    return post("/question/v1/query/chapter/list")
}
export const fechsub = async function (idx) { // 获取科目切换列表
    return get(`/order/v1/pc/category/change/list/${idx}`)
}
export const fechtest = async function (data) { // 请求试题
    return post("/question/v1/query/question/list", data)
}
export const fechorder = async function (data) {
    return post("/order/v1/select/category", data)
}
export const fechapter = async function (data) {
    return post("/question/v1/query/children/chapter/list", data)
}
export const fetchSetmealInfo = async function (data) {
    return post("/question/v1/pc/setmeal/setmeal/info", data)
}
export const fetchand = async function (data) { // 交卷
    return post("/question/v2/pc/exam/over", data)
}
export const fetcview = async function (data) { // 查看解析接口
    return post("question/v1/select/analysis", data)
}
export const joinData = async function (data) { // 合作加盟部分数据接口
    return get("/user/v1/pc/get/pc/bottom", data)
}
export const profession = async function (data) { // 资讯页面获取行业列表
    return get("/user/v1/pc/get/trade", data)
}
export const getDetails = async function (articleId) {
    // 文章详情页接口（需咨询页面的文章id）
    return get(`/user/v1/app/get/newest/article/${articleId}`)
}
export const cleartopic = async function (data) {
    // 清除做題記錄
    return post("/question/v2/cancel/rollback/log-v2", data)
}
export const submiterror = async function (data) {
    // 提交糾錯
    return put("/question/v1/app/add/error/correction", data)
}
export const Collection = async function (data) {
    // 收藏功能
    return post("/question/v2/add/collect/log-v2", data)
}
export const model = async function (data) {
    // 模式切换
    return post("/question/v1/change/mode", data)
}
export const Historical = async function (data) {
    // 增加历史记录
    return post("/question/v1/add/rollback/log", data)
}
export const Dorecord = async function (data) {
    // 增加做题记录
    return post("/question/v2/add/question/log-v2", data)
}
export const Tstlog = async function (data) {
    // 添加检测日志
    return post("/question/v2/add/member/testing/log-v2", data)
}

export const getMySublist = async function (kmid) {
    // 错题收藏下边的我的错题和我的收藏下边的子栏目获取接口
    return get(`/question/v1/make/question/index/select/column/${kmid}`)
}
export const getMyErrTest = async function (kmid) {
    // 错题收藏 下边获取我的错题列表项数据接口
    return get(`/question/v1/pc/get/pc/my/error/question/chapter/${kmid}`)
}
export const getMyErrTestNextFloor = async function (kmid) {
    // 错题收藏 下边获取我的错题的下一级列表
    return get(`/question/v1/app/get/app/my/error/question/down/chapter/${kmid}`)
}
// question/v1/app/get/app/my/error/question/down/chapter/
export const getMyCollTest = async function (kmid) {
    // 错题收藏下边我的收藏下边的数据列表接口
    return get(`/question/v1/pc/get/pc/my/collect/question/chapter/${kmid}`)
}
export const getEasyErrTest = async function (kmid) {
    // 错题收藏下边易错题接口
    return get(`/question/v1/pc/get/pc/error/question/ranking/${kmid}`)
}
export const getcolumn = async function (kmid) {
    // 获取栏目信息
    return get(`/question/v1/make/question/index/select/column/${kmid}`)
}
export const getrecord = async function (kmid) {
    // 获取栏目信息
    return get(`/question/v1/pc/get/pc/learning/record/${kmid}`)
}
export const getlist = async function (data) {
    // 获取栏目下的章节或试卷信息
    return post("/question/v1/query/chapter/list/", data)
}
export const getHotErrTest = async function (kmid) {
    // 错题收藏下边我的收藏下边的热门试题数据列表接口
    return get(`/question/v1/pc/get/pc/collect/question/ranking/${kmid}`)
}
export const myErrTestList = async function (data) {
    // 错题回顾和错题重做接口（传参0代表回顾，1代表重做）
    return post("/question/v1/app/get/app/my/error/question", data)
}
export const myColTestList = async function (data) {
    // 收藏回顾和收藏重做接口（传参0代表回顾，1代表重做）
    return post("/question/v1/app/get/app/my/collect/question", data)
}
export const artilce = async function (idx) {
    //  文章列表
    return get(`/user/v1/pc/get/trade/artilce/${idx}`)
}
export const clearRecord = async function (data) {
    //  清除记录
    return post("/question/v1/clear/member/exam/array", data)
}
export const testRecord = async function (idx, n) {
    //  清除记录
    return get(`/question/v1/test/exam/log/${idx}/${n}`)
}
export const Hot = async function (questionId) {
    // 错题收藏下边热门试题获取试题接口
    return get(`question/v1/app/get/member/collect/question/particulars/${questionId}`)
}
export const eastErr = async function (questionId) {
    // 错题收藏下边易错试题获取试题接口
    return get(`question/v1/app/get/member/error/question/particulars/${questionId}`)
}
export const Statistics = async function (idx) {
    // count 统计
    return get(`/question/v1/pc/select/question/statistics/${idx}`)
}
export const start = async function (idx) {
    // start 统计
    return get(`/question/v1/pc/make/question/index/question/count/${idx}`)
}
export const startType = async function (idx) {
    // start 题型分析
    return get(`/question/v1/question/type/count/${idx}`)
}
export const queryTop = async function () {
    /// / 查询顶级考试科目
    return get("/order/v1/top/category")
}
export const querySubordinate = async function (idx) {
    // 查询下级考试科目
    return get(`/order/v1/children/category/${idx}`)
}
export const forgetPassword = async function (data) {
    // 忘记密码
    return put("/user/v1/app/pc/update/pass", data)
}
