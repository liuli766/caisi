<template>
    <div v-if="close" class="contain">
        <div class="center">
            <div class="close">
                <img src="../resouce/index/close.png" @click="closeregister" />
            </div>
            <div class="logintop">
                <img src="../resouce/index/return.png" @click="returnlogin" />
                <div>忘记密码</div>
            </div>
            <div class="inputs">
                <el-input
                    v-model="account"
                    class="myinput"
                    maxlength="11"
                    placeholder="请输入账号"
                />
                <div class="input_message">
                    <el-input v-model="auth" class="auth_input" placeholder="请输入验证码" maxlength="6" />
                    <div class="auth">
                        <el-button v-if="tmeValue==60" type="primary" @click="getauth">获取验证码</el-button>
                        <el-button v-else type="primary" disabled> {{ tmeValue }} s后获取</el-button>
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
                <el-button class="btn" type="primary" @click="register">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
// import {forgetPassword} from "../pages/action"
import Utils from "../static/untai.js";

export default {
    data() {
        return {
            account: "",
            password: "",
            auth: "",
            tmeValue: 60,
            flag: 0
        };
    },

    computed: {
        ...mapState({
            close: state => state.forgetclose
        })
    },
    methods: {
        getauth() {
            let phone = this.account;
            let link = this.$store.state.link;
            let that = this;
            axios({
                url: link + "/user/v1/app/send/sms/1/" + phone
            }).then(res => {
                console.log(res);
                that.time();
            });
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
            this.$store.commit("changeforget");
            this.$store.commit("changeloginstate");
        },
        register() {
            let account = this.account;
            let password = Utils.encrypt(this.password, "5456546874852364");
            let auth = this.auth;
            let link = this.$store.state.link;
            axios({
                method: "put",
                url: link + "/user/v1/app/pc/forget/pass",
                data: {
                    password,
                    phone: account,
                    verifyCode: auth
                }
            }).then(res => {
                console.log(res, 111)
                if (res.data.code === 1) {
                    this.$store.commit("changeforget");
                    this.$store.commit("changeloginstate");
                    this.$message({
                        message: "修改成功",
                        type: "success",
                        center: true
                    })
                    this.time()
                } else {
                    this.$message({
                        message: res.data.message,
                        type: "warning",
                        center: true
                    })
                }
            });
        },
        closeregister() {
            this.$store.commit("changeforget");
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
    background: rgba(0, 0, 0, 0.3);
    // opacity:0.3;
    position: fixed;
    top: 0;
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
    font-size: 18px;
    // font-family: PingFang SC;
    font-weight: 550;
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

    .btn {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 5px;
    }
}
.btn {
    width: 100%;
    height: 45px;
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
.checked {
    color: @color;
}
</style>
