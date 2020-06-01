<template>
    <div
        v-if="close"
        class="i-contain"
    >
        <div class="center">
            <div class="close">
                <img
                    src="../resouce/index/close.png"
                    @click="closeregister"
                >
            </div>
            <div class="logintop">
                <img
                    src="../resouce/index/return.png"
                    @click="returnlogin"
                >
                <div>注册</div>
            </div>
            <div class="inputs">
                <el-input
                    v-model="account"
                    class="myinput"
                    maxlength="11"
                    placeholder="请输入账号"
                />
                <div class="input_message">
                    <el-input
                        v-model="auth"
                        class="auth_input"
                        placeholder="请输入验证码"
                        maxlength="6"
                    />
                    <div class="auth">
                        <el-button
                            v-if="tmeValue==60"
                            type="primary"
                            @click="getauth"
                        >
                            获取验证码
                        </el-button>
                        <el-button
                            v-else
                            type="primary"
                            disabled
                        >
                            {{ tmeValue }} s后获取
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="sign">
                <el-input
                    v-model="password"
                    class="authinput"
                    maxlength="11"
                    placeholder="请输入密码"
                    show-password
                />
            </div>
            <div class="login">
                <el-button
                    class="btn"
                    type="primary"
                    @click="register"
                >
                    注册
                </el-button>
            </div>
            <!-- <div class="other_login">
                <div class="other-left" />
                <div class="other-center">
                    其他方式登录
                </div>
                <div class="other-right" />
            </div> -->
            <!-- <div class="wechat">
                <div class="chat-icon">
                    <img src="../resouce/index/wechat.png">
                </div>
                <div
                    class="sao"
                    @click="wxlogin"
                >
                    <a
                        href="https://open.weixin.qq.com/connect/qrconnect?appid=wxc0ba2cfc5883bf43&redirect_uri=http://vista.mynatapp.cc/&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
                    >微信扫一扫登录</a>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"
import Utils from "../static/untai.js"
import { fetchRegister } from "@/pages/action.js"
export default {
    data() {
        return {
            account: "",
            password: "",
            auth: "",
            tmeValue: 60,
            flag: 0
        }
    },
    computed: {
        ...mapState({
            close: state => state.registerclose,
            link: state => state.link
        })
    },
    methods: {
        // 获取验证码
        getauth() {
            let phone = this.account
            let link = this.link
            let that = this
            if (/^1[34578]\d{9}$/.test(phone)) {
                axios({
                    url: link + "/user/v1/app/send/sms/1/" + phone
                }).then(res => {
                    console.log(res)
                    if (res.data.code === 1) {
                        this.$message({
                            message: "短信发送成功",
                            type: "success",
                            center: true
                        })
                        that.time()
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: "warning",
                            center: true
                        })
                    }
                })
            } else {
                this.$message({
                    message: "手机号不正确",
                    type: "warning",
                    center: true
                })
            }
        },
        // 倒计时
        time() {
            this.tmeValue = this.tmeValue - 1;
            this.flag = 1;
            if (this.tmeValue <= 0) {
                this.tmeValue = 60;
                this.flag = 0;
                return ""
            } else {
                setTimeout(() => {
                    this.time()
                }, 1000)
            }
        },

        returnlogin() {
            this.$store.commit("changeregisterstate")
            this.$store.commit("changeloginstate")
        },
        // 注册
        register() {
            let account = this.account
            let password = Utils.encrypt(this.password, "5456546874852364")
            let auth = this.auth
            // let link = this.$store.state.link
            fetchRegister({
                password,
                phone: account,
                type: 1,
                verifyCode: auth
            })
                .then(data => {
                    this.closeregister() // 关闭注册组件
                    this.$message.success("注册成功")
                })
                .catch(error => {
                    if (error.code === 2010) {
                        this.$message({
                            message: "已经注册了",
                            type: "error",
                            center: true
                        })
                    } else {
                        this.$message.error(error.message)
                    }
                })
        },
        closeregister() {
            this.$store.commit("changeregisterstate")
        },

        wxlogin() {
            // 微信登录
            if (this.$route.query.code !== undefined) {
                let code = this.$route.query.code
                fetchlogin({
                    code,
                    credential: "",
                    type: 2,
                    userAccount: ""
                }).then(data => {
                    if (res.data.code === 1) {
                        // changeloginstate
                        this.$store.commit("doLogin", res.data.data)
                        this.$message({
                            // 登录成功消息提示
                            message: "登录成功",
                            type: "success",
                            center: true,
                            duration: 1000,
                            offset: 60
                        })
                    } else {
                        this.$message({
                            // 登录成功消息提示
                            message: "登录失败",
                            type: "warning",
                            center: true,
                            duration: 1000,
                            offset: 60
                        })
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
@color: #15bd91;
.i-contain {
    width: 100%;
    height: 100%;
    z-index: 99;
    // width: 100vw;
    // height: 100vh;
    // z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    // opacity:0.3;
    position: fixed;
    top: 0;
    left: 0;
}
.center {
    width: 420px;
    padding: 10px;
    // height:510px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
}
.close {
    img {
        width: 15px;
        height: 15px;
        cursor: pointer;
    }
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
}
.logintop {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    color: black;
    line-height: 20px;
    padding: 0 0 0 10px;
    div {
        width: 80%;
        margin-left: 10px;
    }
    img {
        width: 20px;
        cursor: pointer;
    }
}
.inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0 10px 0;
}
.myinputs {
    // width:80%;
    margin: 5px 0 5px 0;
    height: 50px;
}
.myinput {
    width: 80%;
    margin: 5px 0 5px 0;
    height: 50px;
}
.input_message {
    .auth_input {
        width: 60%;
    }
    width: 80%;
    display: flex;
    margin: 5px 0 5px 0;
    height: 50px;
    justify-content: space-between;
}
.sign {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    font-size: 14px;
    color: @color;
}
.login {
    width: 80%;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 60px;
}
.btn {
    width: 100%;
    height: 45px;
    font-size: 18px;
    letter-spacing: 5px;
}
.other_login {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .other-left {
        width: 30%;
        height: 1px;
        background: #e4e4e4;
    }
    .other-right {
        width: 30%;
        height: 1px;
        background: #e4e4e4;
    }
    .other-center {
        font-size: 14px;

        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
    }
}
// .wechat {
//     display: flex;
//     width: 80%;
//     margin: 0 auto;
//     align-items: center;
//     justify-content: center;
//     color: @color;
//     border: 1px solid rgba(20, 188, 145, 1);
//     border-radius: 4px;
//     padding: 5px;
//     margin-top: 20px;
//     margin-bottom: 20px;
//     height: 45px;

//     .chat-icon {
//         display: flex;
//         align-items: center;
//     }
//     img {
//         width: 18px;
//     }
//     .sao {
//         line-height: 35px;
//         margin: 0 0 0 20px;
//         a {
//             text-decoration: none;
//             color: #15bd91;
//         }
//     }
// }
.checked {
    color: @color;
}
</style>
