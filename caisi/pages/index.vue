<template>
    <div v-wechat-title="$route.meta.title"
         class="container"
    >
        <div>
            <pchead />
        </div>
        <div class="phone">
            <img
                src="../resouce/index/titbg.png"
                class="bg"
            >
            <div class="phone-center">
                <div class="phone-centr-left">
                    <img
                        src="../resouce/index/content.png"
                        class="content-img"
                    >
                    <div class="down">
                        <div class="down-left">
                            <img
                                src="../resouce/index/ewm.png"
                                class="ewm-img"
                            >
                        </div>
                        <div class="down-right">
                            <div class="down-list">
                                <img
                                    class="down-list_img"
                                    src="../resouce/index/androided.png"
                                >
                                <img
                                    class="down-list_imged"
                                    src="../resouce/index/android.png"
                                >
                                <span onclick="window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.cswx.doorknowquestionbank'">安卓下载</span>
                            </div>
                            <div class="down-list">
                                <img
                                    class="down-list_img"
                                    src="../resouce/index/iosed.png"
                                >
                                <img
                                    class="down-list_imged"
                                    src="../resouce/index/ios.png"
                                >
                                <span onclick="window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.cswx.doorknowquestionbank'">IOS下载</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="phone-centr-right">
                    <img
                        src="../resouce/index/phone.png"
                        alt
                    >
                </div>
                <div class="phone-bottom">
                    <img
                        class="top"
                        src="../resouce/index/xia.png"
                        alt
                    >
                </div>
            </div>
        </div>
        <div class="product">
            <div class="product-head">
                <div class="product-head-top fs30">
                    产品特征
                </div>
            </div>
            <div class="product-head-bottom">
                <div />
            </div>
            <div class="product-list">
                <div class="product-lists">
                    <div class="product-lists-head">
                        拍照查题
                    </div>
                    <div class="img1 pic">
                        <img
                            class="outimg"
                            src="../resouce/index/pzct.png"
                        >
                        <img
                            class="inimg"
                            src="../resouce/index/pzcted.png"
                        >
                    </div>
                    <span>拍照需要知晓答案的题目，app 智能查找该题</span>
                </div>
                <div class="product-lists">
                    <div class="product-lists-head">
                        PK排位赛
                    </div>

                    <div class="img2 pic">
                        <img
                            class="outimg"
                            src="../resouce/index/pk.png"
                        >
                        <img
                            class="inimg"
                            src="../resouce/index/pked.png"
                        >
                    </div>
                    <span>开启PK模式，与好友一决高下</span>
                </div>

                <div class="product-lists">
                    <div class="product-lists-head">
                        精准做题
                    </div>
                    <div class="img3 pic">
                        <img
                            class="outimg"
                            src="../resouce/index/jzzt.png"
                        >
                        <img
                            class="inimg"
                            src="../resouce/index/jzzted.png"
                        >
                    </div>
                    <span>拒绝盲目题海，精准高效做题</span>
                </div>
                <div class="product-lists">
                    <div class="product-lists-head">
                        智能评估
                    </div>
                    <div class="img4 pic">
                        <img
                            class="outimg"
                            src="../resouce/index/znpg.png"
                        >
                        <img
                            class="inimg"
                            src="../resouce/index/znpged.png"
                        >
                    </div>
                    <span>智能评估成绩，规划最佳学习路径</span>
                </div>
            </div>
        </div>
        <div class="tk">
            <div class="tk-head">
                <div class="tk-head-top fs30">
                    题库专区
                </div>
            </div>
            <div class="tk-head-bottom">
                <div />
            </div>
            <div class="tk-center">
                <div class="tk-centert">
                    <div class="objects" @click="toShop">
                        <img
                            src="../resouce/index/jzgc.png"
                            alt
                        >
                        <div>
                            <span>建筑工程</span>
                        </div>
                    </div>
                    <div class="objects" @click="toShop">
                        <img
                            src="../resouce/index/chjj.png"
                            alt
                        >
                        <div>
                            <span>财会经济</span>
                        </div>
                    </div>
                    <div class="objects" @click="toShop">
                        <img
                            src="../resouce/index/yywsed.png"
                            alt
                        >
                        <div>
                            <span>职业资格</span>
                        </div>
                    </div>
                </div>
                <div class="tk-centerb">
                    <div class="objects" @click="toShop">
                        <img
                            src="../resouce/index/yhzq.png"
                            alt
                        >
                        <div>
                            <span>银行证券</span>
                        </div>
                    </div>
                    <div class="objects" @click="toShop">
                        <img
                            src="../resouce/index/jsgk.png"
                            alt
                        >
                        <div>
                            <span>教师公考</span>
                        </div>
                    </div>
                    <div class="objects" @click="toShop">
                        <img
                            src="../resouce/index/yyws.png"
                            alt
                        >
                        <div>
                            <span>医药卫生</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="aboutUs">
            <div class="about">
                <div class="title fs30">关于我们</div>
                <div class="line"></div>
                <div class="text">
                    <p>才士题库自上线以来，经过多年的内容沉淀和市场洗礼，实现了从无到有，从有到精的惊人蜕变。</p>
                    <p>目前题库包含：建筑工程、财会经济、职业资格、银行证券、教师考试、公职考试、医药卫生、计算机类等8大考试类别、超一千个科目培训科目。</p>
                    <p>才士团队一直坚守以学员为中心的发展理念，这些年来一直坚持加强用户体验度、提升产品性价比、完善用户满意度三大指导方针，并且取得了卓越成绩。目前才士题库实现了数百个科目题目无缝实时更新、多名人工售后坐席、用户反馈实时处理回馈、创意学习互动引导等多方面的突破，相信每一位使用才士题库的学员都能够感受到我们的成长，也希望每一位学员都能从才士题库里面提升自己。祝愿大家逢考必过！</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div />
            <foot />
        </div>
        <login />
        <register />
        <forgetPassword />
    </div>
</template>
<script>
import axios from "axios"
import Utils from "../static/untai.js"
import pchead from "~/components/pchead.vue"
import register from "~/components/register.vue"
import login from "~/components/login.vue"
import foot from "~/components/foot.vue"
import forgetPassword from "~/components/forgetPassword"
import { mapState } from "vuex"

export default {
    components: {
        pchead,
        login,
        register,
        foot,
        forgetPassword
    },
    computed: {
        ...mapState({
            link: state => state.link
        })
    },
    data() {
        return {
            state: this.$store.state,
            password: "",
            account: "",
            bottomdata: [],
            key: "5456546874852364",
            list: ["首页", "在线题库", "行业资讯", "行业招聘"],
            productlist: [
                {
                    title: "拍照查题",
                    detail:
                        "拍照需要知晓答案的题目，app智能查找该题，文案最好显示三排，或者4排",
                    img: ["/cstk.png/", "../resouce/index/pzcted.png"]
                },
                {
                    title: "PK排位赛",
                    detail:
                        "拍照需要知晓答案的题目，app智能查找该题，文案最好显示三排，或者4排",
                    img: [
                        "@ /resouce/index/pk.png",
                        "../resouce/index/pked.png"
                    ]
                },
                {
                    title: "精准做题",
                    detail:
                        "拍照需要知晓答案的题目，app智能查找该题，文案最好显示三排，或者4排",
                    img: [
                        "../resouce/index/jzzt.png",
                        "../resouce/index/jzzted.png"
                    ]
                },
                {
                    title: "智能评估",
                    detail:
                        "拍照需要知晓答案的题目，app智能查找该题，文案最好显示三排，或者4排",
                    img: [
                        "../resouce/index/znpg.png",
                        "../resouce/index/znpged.png"
                    ]
                }
            ],

            teachlist: [
                {
                    name: "王老师",
                    title: "高级经济师",
                    detail: "十大歌手的不是第，三方忽地吊牌飒飒都放假东方年代你的买、地福地，地福多岁的解释道"
                },
                {
                    name: "陈老师",
                    title: "高级经济师",
                    detail:
                        "十大歌手的不是第，三方忽地吊牌飒飒都放假东方年代你的买、地福地，地福多岁的解释道"
                },
                {
                    name: "李老师",
                    title: "高级经济师",
                    detail:
                        "十大歌手的不是第，三方忽地吊牌飒飒都放假东方年代你的买、地福地，地福多岁的解释道"
                }
            ]
        }
    },
    created() {

    },
    methods: {
        test() {
            var a = Utils.encrypt("123", "5456546874852364")
            console.log("结果是" + a)
            // let key = 5456546874852364
            let password = this.$refs.password.value
            let account = this.$refs.account.value
            // console.log(this.$refs.password.value)
            let passwords = Utils.encrypt(password, "5456546874852364")
            // console.log("结果是" + passwords)
            // console.log(account)
            axios({
                method: "post",
                url: "http://192.168.1.16:8766/user/v1/pc/login",
                data: {
                    code: "",
                    credential: passwords,
                    type: 1,
                    userAccount: account
                }
            }).then(res => {
                // console.log(res)
            })
        },

        test1() {
            let password = this.$refs.password.value
            let account = this.$refs.account.value
            let passwords = Utils.encrypt(password, "5456546874852364")
            axios({
                method: "post",
                url: "http://192.168.1.16:8766/user/v1/pc/register",
                data: {
                    password: passwords,
                    phone: account,
                    type: 1,
                    verifyCode: 993435
                }
            }).then(res => {
                // console.log(res)
            })
        },
        test2() {
            axios({
                url:
                    "http://192.168.1.16:8766/user/v1/app/send/sms/1/18523149913"
            }).then(res => {
                // console.log(res)
            })
        },
        toShop() {
            this.$router.push({
                path: "/shop"
            })
        }

    }
}
</script>

<style lang="less" scoped>
@color: #15bd91;
.aboutUs{
    height: 556px;
    width: 100%;
    background-image: url("../resouce/about/about.png");
    background-size: cover;
}
.aboutUs .about{
    width: 1200px;
    position: relative;
    margin:0 auto;
}
.aboutUs .about .title{
    color: #15BD91;
    text-align: center;
    width: 100%;
    padding: 70px 0 10px;
}
.aboutUs .about .line{
    height: 6px;
    background: #15BD91;
    width: 60px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -30px;
}
.aboutUs .about .text{
    margin-top: 98px;
    color: #fff;
    font-size: 16px;
    margin-bottom: 20px;
}
.aboutUs .about .text p{
    margin-bottom: 30px;
    line-height: 30px;
}
.fs30 {
    font-size: 26px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 80%;
    padding: 20px 0 20px 0;
}
.teach-lists {
    .teaimg {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        img {
            width: 80px;
            height: 80px;
        }
    }
}
.lists {
    margin-left: 20px;
    font-weight: 500;
    font-size: 16px;
}
.sign:hover {
    color: white;
    background: @color;
    border-radius: 10px;
    padding: 2px 15px 2px 15px;
}
.phone {
    width: 100%;
    position: relative;
    height: 100%;
}
.bg {
    width: 100%;
    height: auto;
    z-index: -1;
}
.top {
    animation: dong 1s infinite;
}
@keyframes dong {
    0% {
        transform: translate(0px, 0px);
    }
    50% {
        transform: translate(0px, -100px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}

.phone-center {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.down {
    margin-top: 50px;
    display: flex;
    animation: down 4s ease-in-out 0s 1 alternate forwards;
}
@keyframes down {
    0% {
        transform: translate(100%, 0px);
    }
    50% {
        transform: translate(0px, 0px);
    }
    100% {
        transform: translate(0px, 0px);
    }
    0% {
        transform: translate(100%, 0px);
    }
}
.down-right {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-bottom: 10px;
}
.down-right span {
    margin-left: 10px;
    line-height: 30px;

}

.content-img {
    width: 600px;
    animation: content-img 4s ease-in-out 0s 1 alternate forwards;
}
@keyframes content-img {
    0% {
        transform: translate(-100%, 0px);
    }
    50% {
        transform: translate(0px, 0px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}
.ewm-img {
    width: 180px;
}
.down-left {
    display: flex;
    justify-content: center;
    align-items: center;
}
.down-list {
    display: flex;
    color: @color;
    padding: 5px 20px 5px 20px;
    border: 1px solid @color;
    justify-content: center;
    border-radius: 25px;
}
.down-list:hover {
    background: @color;
    cursor: pointer;
    color: white;
}
.down-list_imged {
    display: none;
}
.down-list:hover .down-list_img {
    display: none;
}
.down-list:hover .down-list_imged {
    display: block;
}
.phone-centr-right {
    margin-left: 50px;
    animation: myfirst 4s ease-in-out 0s 1 alternate forwards;
}
.phone-centr-right img {
    width: 80%;
}
@keyframes myfirst {
    0% {
        transform: translate(0px, -100%);
    }
    50% {
        transform: translate(0px, 0px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}
.phone-bottom {
    position: absolute;
    bottom: 15px;
}
.phone-bottom img {
    width: 25px;
}
.product {
    width: 1200px;
    margin: 0 auto;
    height: 500px;
}
.product-head {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 22px;
    margin-top: 30px;
}

.product-head-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.product-head-bottom div {
    width: 60px;
    height: 5px;
    background: #15bd91;
    border-radius: 10px;
    margin-top: 10px;
}
.product-list {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
}
.product-lists {
    width: 260px;
    height: 290px;
    padding: 43px 30px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 8px 26px 0px rgba(70, 70, 70, 0.1);
    transition: all 0.8s;
    border-radius: 8px;
    div {
        display: flex;
        justify-content: center;
    }
}
.product-lists > .pic {
    margin-top: 20px;
}
.product-lists:hover {
    cursor: pointer;
    box-shadow: 0px 6px 15px rgba(40, 40, 40, 0.1);
    .outimg {
        opacity: 0;
    }
    .inimg {
        opacity: 1;
    }
    .product-lists-head {
        color: #15bd91;
    }
}
.inimg {
    opacity: 0;
    position: absolute;
    transition: all 0.8s;
}
.outimg {
    position: relative;
    transition: all 0.8s;
}
.product-lists-head {
    font-weight: 600;
    font-size: 20px;
}
.product-lists img {
    width: 80px;
}
.product-lists span {
    color: rgba(155, 155, 155, 1);
    font-size: 14px;
    line-height: 21px;
    width: 196px;
    text-align: center;
    margin-top: 23px;
}
.tk {
    width: 100%;
    background-image: url("../resouce/index/centerbg.png");
    background-size: 100% 100%;
    padding: 60px 0 100px;
}
.tk-head {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 22px;
}

.tk-head-top {
    margin-top: 60px;
}
.tk-head-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
}
.tk-head-bottom div {
    width: 60px;
    height: 5px;
    background: #15bd91;
    border-radius: 10px;
    margin-top: 10px;
}
.tk-center {
    position: relative;
    width: 1200px;
    margin: 80px auto;
    top: 8%;
    // height: 80%;
}
.tk-centert {
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.objects {
    cursor: pointer;
    margin: 20px 35px 20px 35px;

    div {
        margin-top: 10px;
    }
}
.objects span {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.tk-centerb {
    display: flex;
    justify-content: space-around;
}

// .teachBox {
//     background: #fff;
// }
// .teach {
//     width: 100%;
//     padding-top: 60px;
// }
// .teach-head {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-weight: 500;
//     font-size: 22px;
//     margin-top: 20px;
// }
// .teach-head-bottom {
//     width: 100%;
//     display: flex;
//     justify-content: center;
// }
// .teach-head-bottom div {
//     width: 60px;
//     height: 5px;
//     background: #15bd91;
//     border-radius: 10px;
//     margin-top: 10px;
// }
// .teach-list {
//     width: 1200px;
//     display: flex;
//     justify-content: space-between;
//     margin: 0 auto;
//     padding: 60px 0 180px;
// }
// .teach-lists div {
//     text-align: center;
// }
// .teach-lists {
//     width: 300px;
//     height: 360px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-evenly;
//     padding: 40px 30px;
//     background: rgba(245, 248, 247, 1);
//     border-radius: 3px;
// }
// .teach-lists img {
//     widows: 90px;
//     height: 90px;
// }
// .teach-lists-head {
//     font-weight: 600;
//     color: rgba(51, 51, 51, 1);
//     font-size: 20px;
//     line-height: 19px;
//     margin-top: 16px;
// }
// .teach-lists-title {
//     font-weight: 300;
//     color: rgba(51, 51, 51, 1);
//     line-height: 19px;
//     margin: 15px 0 20px;
//     font-size: 16px;
// }
// .teach-lists-detail {
//     font-weight: 300;
//     color: rgba(155, 155, 155, 1);
//     width: 260px;
//     display: -webkit-box;
//     -webkit-box-orient: vertical;
//     -webkit-line-clamp: 5;
//     overflow: hidden;
//     justify-content: space-between;
//     font-size: 14px;
//     line-height: 21px;
//     text-align: justify;
// }
</style>
