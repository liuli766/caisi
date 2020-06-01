<template>
    <div v-show="close" class="contain" style="z-index:2002">
        <div class="center">
            <div class="close">
                <img src="../resouce/index/close.png" @click="state.loginclose = false" />
            </div>
            <div class="logintop">
                <div class="logintop-left" :class="{checked:judge}" @click="judge = true">账号登录</div>
                <div class="logintop-middle" />
                <div class="logintop-bottom" :class="{checked:!judge}" @click="judge = false">快捷登录</div>
            </div>
            <div class="inputs">
                <el-input
                    v-if="judge"
                    v-model="account"
                    class="myinput"
                    placeholder="请输入账号"
                    @keyup.enter.native="passLogin"
                />
                <el-input
                    v-if="!judge"
                    v-model="account2"
                    class="myinput"
                    maxlength="11"
                    placeholder="请输入手机号"
                />
                <el-input
                    v-if="judge"
                    v-model="password"
                    class="myinput"
                    maxlength="11"
                    placeholder="请输入密码"
                    show-password
                    @keyup.enter.native="passLogin"
                />
                <div v-else class="input_message">
                    <el-input v-model="auth" class="auth_input" maxlength="6" placeholder="请输入验证码" />
                    <div class="auth">
                        <el-button
                            v-if="timeCount === 60"
                            type="primary"
                            :disabled="mobileIsOk"
                            @click="getauth"
                        >
                            获取验证码
                        </el-button>
                        <el-button v-else type="primary" disabled>{{ timeCount }} S后获取</el-button>
                    </div>
                </div>
            </div>

            <div class="sign">
                <div @click="fastregister">立即注册</div>
                <div @click="fogetpassword">忘记密码?</div>
            </div>

            <div class="login">
                <el-button class="btn" type="primary" :disabled="!dislogin" @click="passLogin">登录</el-button>
            </div>
            <!-- <div class="other_login">
                <div class="other-left" />
                <div class="other-center">其他方式登录</div>
                <div class="other-right" />
            </div> -->
            <!-- <div class="wechat">
                <div class="chat-icon">
                    <img src="../resouce/index/wechat.png" />
                </div>
                <div class="sao" @click="wxlogin">
                    <a
                        href="https://open.weixin.qq.com/connect/qrconnect?appid=wxc0ba2cfc5883bf43&redirect_uri=http://www.cswx.com/&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
                    >微信扫一扫登录</a>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Utils from "../static/untai.js";
import { fetchcategory, fetchlogin, fetchPhoneVCode, fetchErrorMessage } from "@/pages/action.js";

export default {
    data() {
        return {
            state: this.$store.state,
            account: "",
            account2: "",
            password: "",
            judge: true,
            timeCount: 60,
            disabled: false,
            auth: "" // 手机验证码
        };
    },
    // judge=true表示账号登录=false表示手机快速登录
    head: {
        script: [
            {
                src:
                    "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
            }
        ]
    },

    computed: {
        ...mapState({
            close: state => state.loginclose,
            userInfor: state => state.userInfor,
            link: state => state.link
        }),
        mobileIsOk() {
            return !/^1[34578]\d{9}$/.test(this.account2);
        },
        dislogin() {
            return (this.account !== "" && this.password !== "") || (this.account2 !== "" && this.auth !== "")
        }
    },
    mounted() {
        this.wxlogin();
    },

    methods: {
        wxlogin() {
            // 微信登录
            if (this.$route.query.code) {
                let code = this.$route.query.code;
                console.log(code)
                this.load({
                    code,
                    credential: "",
                    type: 2,
                    userAccount: ""
                });
            }
        },
        fastregister() {
            // 快速登录
            this.$store.commit("changeloginstate");
            this.$store.commit("changeregisterstate");
        },
        fogetpassword() {
            // 忘记密码
            this.$store.commit("changeloginstate");
            this.$store.commit("changeforget");
        },
        getauth() {
            // 获取验证码
            fetchPhoneVCode(this.account2)
                .then(res => {
                    this.time();
                })
                .catch(e => {
                    console.error(e);
                    this.$message.error("验证码获取失败");
                });
        },
        time() {
            // 验证码倒计时
            let countDown = () => {
                this.timeCount--;
                if (this.timeCount === 0) {
                    this.timeCount = 60;
                } else {
                    setTimeout(() => {
                        countDown();
                    }, 1000);
                }
            };
            countDown();
        },
        login(data) {
            fetchlogin(data)
                .then(data => {
                    this.$store.commit("doLogin", {
                        ...data,
                        setCookie: true
                    });
                    this.$message({
                        // 登录成功消息提示
                        message: "登录成功",
                        type: "success",
                        center: true,
                        duration: 1000,
                        offset: 60
                    });
                    this.state.loginclose = false;
                    window.location.reload()
                    fetchcategory()
                        .then(data => {
                            if (data) {
                                this.state.userchoseInfor = {
                                    ...data,
                                    cb: 0
                                };
                            }
                        })
                        .catch(e => {
                            console.error(e);
                            this.$message.error("获取选着科目失败");
                        });
                })
                .catch(e => {
                    fetchErrorMessage(e, "登录失败");
                    // console.error(e);
                    // this.$message({
                    //     message: "登录失败",
                    //     type: "warning",
                    //     center: true,
                    //     duration: 1000,
                    //     offset: 60
                    // });
                });
        },
        passLogin() {
            // 账号和快捷登录
            const auth = this.auth;
            const judge = this.judge; // 判断哪种类型登录
            if (judge) {
                this.login({
                    code: "",
                    credential: Utils.encrypt(
                        this.password,
                        "5456546874852364"
                    ),
                    type: 1,
                    userAccount: this.account
                });
            } else {
                console.log("快捷登录", auth)
                // 快捷登录
                this.login({
                    code: auth,
                    credential: "",
                    type: 5,
                    userAccount: this.account2
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
@color: #15bd91;
.contain {
    width: 100%;
    height: 100%;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    // opacity:0.3;
    position: fixed;
    top: 0;
}

a {
    text-decoration: none;
    color: @color;
}

.center {
    width: 420px;
    padding: 10px;
    // height:510px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    outline: none;
}

.close {
    img {
        width: 15px;
        height: 15px;
    }

    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    cursor: pointer;
}

.logintop {
    margin-top: 20px;
    .logintop-middle {
        width: 2px;
        background: rgba(235, 235, 235, 1);
        margin: 0 40px 0 40px;
    }

    display: flex;
    justify-content: center;
    font-size: 18px;
    // font-family: PingFang SC;
    font-weight: 550;
    color: #999999;
    line-height: 20px;
}

.inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0 10px 0;
}

.myinput {
    width: 80%;
    margin: 10px 0;
    height: 50px;
}

.input_message {
    .auth_input {
        width: 60%;
    }

    width: 80%;
    display: flex;
    margin: 10px 0;
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
    font-size: 16px;

    div {
        cursor: pointer;
    }
}

.login {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 80px;
}

.btn {
    width: 100%;
    height: 45px;
    letter-spacing: 5px;
    font-size: 18px;
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

.wechat {
    display: flex;
    width: 80%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    color: @color;
    border: 1px solid rgba(20, 188, 145, 1);
    border-radius: 4px;
    padding: 5px;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 45px;

    .chat-icon {
        display: flex;
        align-items: center;
    }

    img {
        width: 18px;
    }

    .sao {
        line-height: 35px;
        margin: 0 0 0 20px;
    }
}

.logintop-left {
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
}

.logintop-bottom {
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
}

.sao {
    cursor: pointer;
}

.checked {
    color: @color;
}
</style>
