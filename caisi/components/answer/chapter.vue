<template>
    <div>
        <div v-if="next==0" class="contain">
            <div class="title">
                <div>
                    <h3>{{ lmInfor.name }}</h3>
                </div>
                <div class="records" @click="toexam">
                    <!-- <i class="el-icon-time" /> -->
                    <!-- <span class="record">考试记录</span> -->
                </div>
            </div>
            <div class="content">
                <div v-for="(item,num) in lists" :key="num">
                    <div class="contents">
                        <div class="contentL">
                            <i v-if="item.childrenFlag==0" class="el-icon-s-flag" />
                            <i v-else class="el-icon-folder-opened" />
                            <span>{{ item.chapterName }}</span>
                        </div>
                        <div class="contentR">
                            <div
                                style="display:flex;align-items:center;color:#BDC6C2;margin-right:10px"
                            >
                                <span v-if="item.questionQuantity==null">0</span>
                                <span v-else>{{ item.questionQuantity }}</span>
                                <span>/{{ item.questionCount }}</span>
                            </div>
                            <div class="contentRR">
                                <div
                                    v-if="item.childrenFlag==0 && item.freeFlag==0"
                                    class="doexis"
                                    @click="toExercise(num)"
                                >
                                    开始练习
                                </div>
                                <div
                                    v-else-if="item.childrenFlag==1 && item.freeFlag ==0"
                                    class="doexis"
                                    @click="nextchapter(num)"
                                >
                                    展开
                                    <i class="el-icon-arrow-right" />
                                </div>
                                <div v-else-if="item.freeFlag==1" @click="handOpen(item)">去开通</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="num!=lists.length-1" class="divider" />
                </div>
            </div>
        </div>
        <div v-if="next==1" class="contain">
            <div class="title">
                <div class="title-l">
                    <img src="../../resouce/index/return.png" alt @click="return1" />
                    <h3>{{ titlename }}</h3>
                </div>
                <div @click="toexam">
                    <!-- <i class="el-icon-time" /> -->
                    <!-- <span class="record">考试记录</span> -->
                </div>
            </div>
            <div class="content">
                <div v-for="(item,num) in list1" :key="num">
                    <div class="contents">
                        <div class="contentL">
                            <i v-if="item.childrenFlag==0" class="el-icon-s-flag" />
                            <i v-else class="el-icon-folder-opened" />
                            <span>{{ item.chapterName }}</span>
                        </div>
                        <div class="contentR">
                            <div
                                style="display:flex;align-items:center;color:#BDC6C2;margin-right:10px"
                            >
                                <span v-if="item.questionQuantity==null">0</span>
                                <span v-else>{{ item.questionQuantity }}</span>
                                <span>/{{ item.questionCount }}</span>
                            </div>
                            <div class="contentRR">
                                <div
                                    v-if="item.childrenFlag==0&&item.freeFlag==0"
                                    class="doexis"
                                    @click="toExercise(num)"
                                >
                                    开始练习
                                </div>
                                <div
                                    v-else-if="item.childrenFlag==1"
                                    class="doexis"
                                    @click="nextchap(num)"
                                >
                                    展开
                                    <i class="el-icon-arrow-right" />
                                </div>
                                <div v-else-if="item.freeFlag==1" @click="handOpen(item)">去开通</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="num!=lists.length-1" class="divider" />
                </div>
            </div>
        </div>
        <div v-show="show" class="block">
            <div class="lblock">
                <h2>{{ userinfo.showName }}</h2>
                <div class="lcont">
                    <h3>题库介绍：</h3>
                    <p>课程内容包括章节练习、真题练习、模拟考场、考题押题</p>
                    <p class="p">购买当前科目，解锁所有试题</p>
                    <div class="btn1" @click="handpay">去支付</div>
                    <div class="btn2" @click="handclose">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import axios from "axios"
import {
    fechapter,
    //  createOrder,
    //   fetchErrorMessage,
    fetchSetmealInfo
} from "../../pages/action.js";
export default {
    props: {
        lists: {
            type: [Array, String],
            required: true
        },
        changenum: {
            default: ""
        }
    },
    data() {
        return {
            next: 0,
            chapterid: "",
            list1: "",
            titlename: "",
            show: false,
            chapterName: "",
            productId: "",
            setMealId: "",
            order: {}
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            examjudge: state => state.examjudge,
            lmInfor: state => state.lmInfor,
            userinfo: state => state.userchoseInfor
        })

    },
    created() {
    },
    methods: {
        goback() {
            this.$store.commit("back")
        },
        handOpen(str) { // 開通課程
            this.show = true
            this.chapterName = str.chapterName
            this.productId = str.productId
            this.setMealId = str.tkProductSetmealId
            console.log(str)
        },
        handpay() {
            fetchSetmealInfo({
                setmealId: this.setMealId,
                setmealTypeId: this.productId
            }).then(data => {
                console.log(data)
                this.$router.push({
                    path: "/shopDetails",
                    query: { id: data.id }
                })
            });
        },
        handclose() {
            this.show = false
            this.$message({
                type: "info",
                message: "已取消支付"
            })
        },
        toexam() {
            // this.$store.commit("changeexamjudge");
            this.$emit("recordClick");
        },

        toExercise(num) {
            if (this.list1.length > 0) {
                console.log(this.list1, num, 2222222222);
                let lmid = this.lmInfor.id;
                let showname = this.list1[num].chapterName;
                this.chapterid = this.list1[num].id;// ;
                let total = this.list1[num].questionCount;
                let only = this.list1[num].questionQuantity;
                console.log(this.chapterid, "cha");
                this.$router.push({
                    path: "/question/practice",
                    query: { showname, lmid, id: this.chapterid, total, only, changenum: this.changenum }
                });
            } else {
                console.log(this.lists, num, 111111);
                let lmid = this.lmInfor.id;
                let showname = this.lists[num].chapterName;
                this.chapterid = this.lists[num].id;
                let total = this.lists[num].questionCount;
                let only = this.lists[num].questionQuantity;
                console.log(this.chapterid, "cha");
                this.$router.push({
                    path: "/question/practice",
                    query: { showname, lmid, id: this.chapterid, total, only, changenum: this.changenum }
                });
            }
        },

        // toExercise(num) {
        //     let lmid = this.lmInfor.id;
        //     let showname = this.lists[num].chapterName;
        //     this.chapterid = this.lists[num].id;
        //     let total = this.lists[num].questionCount;
        //     let only = this.lists[num].questionQuantity;
        //     this.$router.push({
        //         path: "/question/practice",
        //         query: { showname, lmid, id: this.chapterid, total, only, changenum: this.changenum }
        //     });
        // },
        nextchapter(num) {
            let chapterid = this.lists[num].id;
            this.titlename = this.lists[num].chapterName;
            // this.titlename=titlename
            // let token = this.token
            fechapter({
                chapterId: chapterid
            }).then(data => {
                console.log(data);
                this.list1 = data;
                this.chapterid = data.id;
            });
            this.next = 1;
        },
        nextchap(num) {
            let chapterid = this.list1[num].id;
            // let token = this.token
            this.titlename = this.list1[num].chapterName;
            fechapter({
                chapterId: chapterid
            }).then(data => {
                console.log(data);
                this.list1 = data;
                this.chapterid = data.id;
            });
        },
        return1() {
            this.next = 0;
        }
    }
};
</script>

<style lang="less" scoped>
.p{
        margin-top: 20px;
    text-align: center;
    font-size: 20px;
}
.block{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    .lblock{
        width:338px;
        height:355px;
        position: absolute;
        background: #fff;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        h2{
            padding: 0px;
            text-align: center;
            background: url(../../static/img/bg.png) no-repeat;
            width: 100%;
            height: 60px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            line-height: 60px;
        }
        .lcont{
                padding: 20px;
                line-height: 24px;
                word-break: break-all;
                overflow: hidden;
                font-size: 14px;
                overflow-x: hidden;
                overflow-y: auto;
                margin-top: 20px;
                font{
                    display: block;
                    width: 275px;
                    height: 30px;
                    float: left;
                    font-size: 24px;
                    font-weight: bold;
                    color: #ff0000;
                    margin-top: 30px;
                    text-align: center;
                }
            }
        .btn1,.btn2{
            position: absolute;
            bottom: 20px;
            cursor: pointer;
        }
        .btn1{
            background: url(../../static/img/zfanniu.png) no-repeat;
            border: 0;
            left: 40px;
            width: 119px;
            height: 34px;
            line-height: 32px;
            text-align: center;
            cursor: pointer;
        }
        .btn2{
            border: 0;
            right: 40px;
            width: 119px;
            height: 34px;
            line-height: 32px;
            text-align: center;
            border: #d2d2d2 1px solid;
            border-radius: 5px;
        }
    }
}
.contain {
    background: white;
    padding: 20px;
    border-radius: 10px;
    animation: fadeIn 1s;
}
.title {
    border-bottom: 1px solid rgba(229, 234, 232, 1);
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    h3 {
        font-size: 22px;
        font-weight: 600;
        line-height: 38px;
    }
}
.title-l {
    display: flex;
    align-items: center;
    img {
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }
}
.record {
    color: #14bc91;
    font-size: 15px;
    margin-left: 10px;
}
.contents {
    transition: all 1s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
}
.contents:hover {
    cursor: pointer;
    color: #14bc91;
    .doexis {
        color: white;
        background: #14bc91;
    }
}
.contentL i {
    color: #14bc91;
    font-size: 20px;
}
.contentR {
    display: flex;
    width: 217px;
    justify-content: space-between;
    span{
        font-size:14px;
    }
}
.contentRR {
    width: 86px;
    text-align: center;
    div{
        font-size: 14px;
    }
}
.contentRR .doexis {
    background: rgba(239, 243, 247, 0.88);
    border: 1px solid rgba(214, 214, 214, 1);
    border-radius: 5px;
    padding: 3px 10px 3px 10px;
    transition: all 0s;
}
.divider {
    background: rgba(245, 245, 245, 1);
    height: 1px;
    margin-top: 15px;
}
.records {
    cursor: pointer;
}
</style>
