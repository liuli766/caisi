<template>
    <div v-if="close" class="contain">
        <div class="center">
            <div class="close">
                <img src="../../resouce/index/close.png" @click="closelogin" />
            </div>

            <div>12321312</div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    // judge=true表示账号登录=false表示手机快速登录
    data() {
        return {
            account: "",
            password: "",
            judge: true,
            i: 60,
            auth: "" // 手机验证码
        };
    },
    computed: {
        ...mapState({
            close: state => state.loginclose,
            userInfor: state => state.userInfor
        })
    },
    created() {},
    methods: {
        closelogin() {
            this.$store.commit("changeloginstate");
        },
        showlogin() {
            this.judge = true;
        },

        closes() {
            this.close = true;
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
    }
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
}
.logintop {
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
    margin: 5px 0 5px 0;
    height: 50px;
}
.input_message {
    .auth_input {
        width: 60%;
        .auth {
        }
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
    div {
        cursor: pointer;
    }
}
.login {
    width: 80%;
    margin: 0 auto;
    margin-top: 40px;
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
.logintop-left {
    cursor: pointer;
}
.logintop-bottom {
    cursor: pointer;
}
.sao {
    cursor: pointer;
}
.checked {
    color: @color;
}
</style>
