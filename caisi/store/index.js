/* eslint-disable no-undef */
import Vue from "vue"
import Vuex from "vuex"
import VueCookies from "vue-cookies"
import axios from "axios"
const isDev = process.env.NODE_ENV === "development";

axios.interceptors.request.use((config) => {
    let link = $nuxt.$store.state.link;
    if (!isDev) {
        config.url = config.url.replace(link, "");
        config.baseURL = "/api";
    } else {
        config.baseURL = link;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})
Vue.use(Vuex)

Vue.use(VueCookies)
const store = () => new Vuex.Store({
    state: {
        loginclose: false, // 登录组件是否显示
        registerclose: false, // 注册组件是否显示
        forgetclose: false, // 忘记密码是否显示
        // link: "http://192.168.1.251:8766",
        // link: "./",
        // link: "http://47.103.158.51:7002",
        link: "http://www.caishi.cn/api/",
        nowindex: 0, // 当前第几题
        imglink: "http://image-manger.oss-cn-shanghai.aliyuncs.com/",
        authKey: "hmzJ/IPcepp9QKtustWPqw==",
        token: "",
        // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiLogIPnn6XpgJoiLCJ1aWQiOiI2NjA1NzYzNDQ1Nzc2MTg3Mzk1IiwiZXhwIjoxNTc3MjQ0MDYwNzI1LCJpYXQiOjE1NzU1MTYwNjA3MjV9.g-7IptBTVW1_QEPh5D3cSzFgv5fQShd1nScrN367FRs",
        userInfor: {
            headUrl: "https://image-manger.oss-cn-shanghai.aliyuncs.com" + "/test/tk/view/upload/feedback/20190704/1562230414671-6aba169f-6090-4cef-b954-c2eb617fc557.jpg",
            id: "6570579871041323011",
            nickName: "昵称",
            sex: null,
            studentId: "56481",
            token: ""
        }, // 用户的个人信息
        userchoseInfor: {
            id: "20181203154736-a1fa9940-80c9-4a38-a005-56f0230055b7",
            kztProductExaminationId: "6553923546295304195",
            showName: "管理",
            tkProductTradeId: "6553921255546814467"
        }, // 用户选中的科目信息
        examid: "", // 切换考试时组件传递id
        objectstate: true, // 选择科目状态
        lmInfor: "", // 栏目切换时信息
        examjudge: false,
        headjudge: 0, // 头部导航栏选中判断
        examlist: "",
        answermiddle: [],
        count: 0,
        questionIndexActiveIndex: 0,
        questionIndexRouteFlag: false
    },
    getters: {
        loginData (state) {
            if (state.token) {
                return {
                    token: state.token,
                    data: state.data
                }
            }
            // console.log(token, 222222222)
            let data = localStorage.getItem("loginData")
            // let data = window.$nuxt.$cookies.get("loginData")
            if (data) {
                return JSON.parse(data)
            }
            return {}
        },
        getToken (state, getters) {
            const loginData = getters.loginData
            // return loginData.token || null
            return loginData.token
        }
    },
    mutations: {
        back (state) {
            state.count = 1
        },
        chosed (state, data) {
            if (data != [] && undefined) {
                data = data.map((item, n) => {
                    return item.checked == checked
                })
            }
        },
        doLogin (state, data) {
            state.token = data.token // vuex存放token
            state.userInfor = data // 存放用户信息
            if (data.setCookie) {
                $nuxt.$cookies.set("loginData", JSON.stringify(data), 5 * 24 * 3600 * 1000);
            }
            // localStorage.setItem("loginData", JSON.stringify(data))
        },
        cleartoken (state) { // 清除token
            state.token = ""
            $nuxt.$cookies.remove("loginData")
            state.userInfor = {}
            // localStorage.removeItem('loginData');
        },
        changeloginstate (state) { // 登录弹框是否显示
            state.loginclose = !state.loginclose
        },
        changeregisterstate (state) { // 注册弹框是否显示
            state.registerclose = !state.registerclose
        },
        changeforget (state) { // 注册界面是否显示
            state.forgetclose = !state.forgetclose
        },
        changeobjectstate (state) {
            state.objectstate = !state.objectstate
        }, // 科目选择是否显示
        changeexamjudge (state) {
            state.examjudge = !state.examjudge
        }, // 考试记录是否显示
        changeexamjudgeout (state) {
            if (state.examjudge) {
                state.examjudge = !state.examjudge
            }
        }

    }
})

export default store
