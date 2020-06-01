<template>
    <div style="background:white" class="nav">
        <div class="head">
            <div class="head-left" @click="toIndex('/')">
                <img src="../resouce/index/logo.png" />
            </div>
            <div class="head-right">
                <div class="head_list">
                    <div
                        v-for="(item,index) in list"
                        :key="index"
                        class="lists"
                        :class="[state.headjudge==index?chosed:'']"
                        @click="chose(index)"
                    >
                        {{ item.name }}
                    </div>
                    <div v-if="!state.token" class="head_login">
                        <div class="login" @click="login">登录</div>
                        <div class="sign" @click="register">注册</div>
                    </div>
                    <el-dropdown v-if="state.token" class="userInfor">
                        <div class="userInfor pointer" @click="toPersonal('/user')">
                            <img v-if="userInfor.headUrl.indexOf(hp)==-1" :src="hp+userInfor.headUrl" alt />
                            <img v-if="userInfor.headUrl.indexOf(hp)==0" :src="userInfor.headUrl" alt="">
                            <div>
                                <span>
                                    {{ userInfor.nickName }}
                                    <i
                                        class="el-icon-arrow-down el-icon--right"
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <span style="width:100%" @click="logout('/')">退出登录</span>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <span style="width:100%" @click="toPersonal('/user')">个人中心</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <login />
    </div>
</template>
<script>
import { mapState } from "vuex";
// import personal from '~/components/answer/personal.vue';
import login from "~/components/login.vue";
export default {
    // name:'head',
    components: {
        login
    },
    data() {
        return {
            list: [
                { name: "首页", link: "/" },
                { name: "刷题中心", link: "question" },
                {
                    name: "全部题库",
                    link: "shop"
                },
                { name: "行业资讯", link: "information" }
            ],
            chosed: "chosed",
            state: this.$store.state,
            hp: "https://image-manger.oss-cn-shanghai.aliyuncs.com/"

        };
    },
    computed: {
        ...mapState({
            userInfor: state => state.userInfor,
            headjudge: state => state.headjudge,
            imglink: state => state.imglink,
            token: state => state.token
        }),
        headjudge: {
            get() {
                return this.$store.state.headjudge;
            },
            set(headjudge) {
                this.$store.state.headjudge = headjudge;
            }
        },
        token: {
            get() {
                return this.$store.state.token;
            },
            set(token) {
                this.$store.state.token = token;
            }
        }
    },
    watch: {
        "state.headjudge"(params) {
            this.headjudge = params;
        },
        "state.token"(newtoken) {
            this.token = newtoken;
        }
    },
    mounted() {
        if (location.pathname == "/") {
            this.$store.state.headjudge = 0;
            this.headjudge = this.$store.state.headjudge;
        }

        let data = this.$cookies.get("loginData");
        if (data && data.token) {
            this.$store.commit("doLogin", data);
        }
    },
    methods: {
        toIndex(url) {
            // 点击logo跳到首页
            this.$router.push({
                path: url
            });
        },
        toPersonal(url) {
            this.$router.push({
                // 点击头像下拉菜单个人中心跳到个人中心页面
                path: url
            });
        },
        logout(url) {
            // 退出登录时清除登录信息 需要在本地储存一起清除
            // localStorage.removeItem('loginData');
            this.$store.commit("cleartoken");
            this.$router.push({
                // 退出登录后跳到首页
                path: url
            });
        },
        login() {
            // 登录之后改变登录状态
            this.$store.commit("changeloginstate");
        },
        register() {
            // 注册之后改变注册状态
            this.$store.commit("changeregisterstate");
        },
        chose(e) {
            console.log(e)
            if (e == 0) {
                // 首页
                this.$store.state.headjudge = 0;
                this.headjudge = this.$store.state.headjudge;
                this.$router.push({ name: "index" });
            } else if (e == 1) {
                // 刷题中心
                if (this.token == "") {
                    this.$store.commit("changeloginstate");
                    this.$store.state.headjudge = 0;
                    this.headjudge = this.$store.state.headjudge;
                    this.$router.push({ path: "/" });
                    return false;
                } else {
                    this.$store.state.headjudge = 1;
                    this.headjudge = this.$store.state.headjudge;
                    this.$router.push({ name: "question" });
                }
            } else if (e == 2) {
                // 全部题库
                this.$store.state.headjudge = 2;
                this.headjudge = this.$store.state.headjudge;
                this.$router.push({ name: "shop" });
            } else {
                // 行业资讯
                this.$store.state.headjudge = 3;
                this.headjudge = this.$store.state.headjudge;
                this.$router.push({ name: "information" });
            }
        }
    }
};
</script>

<style lang="less" scoped>
@color: #15bd91;
img {
    display: block;
}
.nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    height: 98px;
}

.head-left {
    cursor: pointer;
}
.head-left > img {
    margin-top: 20px;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 1200px;
}

.lists {
    margin-left: 48px;
    color: rgba(51, 51, 51, 1);
    font-size: 18px;
    padding-bottom: 5px;
}

.chosed {
    border-bottom: 2px solid @color;
    color: #15bd91;
}

.lists:hover {
    color: @color;
    cursor: pointer;
    font-size: 18px;
}

img {
    height: 70px;
}

.head_list {
    display: flex;
    align-items: center;
}

.head_login {
    margin-left: 50px;
    display: flex;
    font-size: 12px;
}

.login {
    color: @color;
    border: 1px solid @color;
    border-radius: 10px;
    padding: 2px 15px 2px 15px;
}

.login:hover {
    cursor: pointer;
    color: white;
    background: @color;
    border-radius: 10px;
    padding: 2px 15px 2px 15px;
}

.sign {
    margin-left: 20px;
    color: @color;
    border: 1px solid @color;
    border-radius: 10px;
    padding: 2px 15px 2px 15px;
}

.sign:hover {
    cursor: pointer;
    color: white;
    background: @color;
    border-radius: 10px;
    padding: 2px 15px 2px 15px;
}

.userInfor {
    margin-left: 30px;
    display: flex;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    span {
        margin-left: 10px;
    }
}
</style>
