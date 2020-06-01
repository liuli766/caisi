<template>
    <!-- 刷题中心首页 -->
    <div>
        <div
            v-loading="loading"
            class="main animat"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
        >
            <div class="title">
                <h3>最近学习记录</h3>
            </div>
            <div v-if="list.length==0" class="xuexi">您最近还没有学习喔~</div>
            <div v-else class="content topcontent">
                <div v-for="(item,n) in list" :key="n" class="list" @click="tonext(n)">
                    <div class="cont-left">
                        <div class="cont-title" :title="item.chapterName">{{ item.chapterName }}</div>
                        <div class="time">{{ item.crtDate }}</div>
                    </div>
                    <div class="cont-right">前往学习</div>
                </div>
            </div>
        </div>

        <div class="main second">
            <div class="title1">
                <h3>今日任务</h3>
                <div class="task">完成下列任务，即可获取10C币</div>
            </div>
            <div class="content">
                <div class="top">
                    <div class="topL">
                        <img src="../../resouce/answer/challenge.png" alt />
                        <div class="_topL">
                            <div>
                                <h4>在APP完成20道题目20/20</h4>
                            </div>
                            <div class="lj">累计做完20道题目即可领取</div>
                        </div>
                    </div>
                    <div class="topR">
                        <!-- <div class="finish">已完成</div> -->
                        <div class="gofinish" @click="gofinish">去完成</div>
                    </div>
                </div>
            </div>

            <div class="line" />

            <div class="content">
                <div class="top">
                    <div class="topL">
                        <img src="../../resouce/answer/write.png" alt />
                        <div class="_topL">
                            <div>
                                <h4>在APP上完成一次真题挑战</h4>
                            </div>
                            <div class="lj">排位真题排位赛，赚C币、赢大奖</div>
                        </div>
                    </div>
                    <div class="topR">
                        <div class="gofinish" @click="gofinish">去完成</div>
                        <!-- <div class="gofinish">去完成</div> -->
                    </div>
                </div>
            </div>
        </div>

        <div v-if="show" class="block" @click="block">
            <div class="white" @click.stop>
                <span @click="block">
                    <img src="../../static/img/关闭@2x.png" alt />
                </span>
                <div class="bot">
                    <img src="../../static/img/app.png" alt @click.stop />
                    <p>更多体验请扫描二维码下载App</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { fetchcategory, getrecord } from "../../pages/action"
export default {
    props: {
        indexcolumn: {
            default: ""
        },
        changenum: {
            default: ""
        }
    },
    data() {
        return {
            list: "",
            loading: true,
            show: false
        };
    },
    computed: {
        ...mapState({
            token: state => state.token,
            link: state => state.link
        })
    },
    created() {
        console.log(this.indexcolumn, 989)
        if (this.token != "") {
            fetchcategory().then(data => { // 用户选中的科目
                console.log("用户选中科目:", data);

                if (data == null) {
                    console.log(1)
                    this.$store.commit("changeobjectstate")
                } else {
                    let columnId = data.id
                    console.log(columnId)
                    getrecord(columnId).then(data => {
                        this.list = data;
                        console.log(this.list, 2)
                    }).finally(() => {
                        this.loading = false;
                    })
                }
            })
        }
    },
    methods: {
        tonext(n) {
            console.log(this.list)
            let showname = this.list[n].chapterName;
            let chapterid = this.list[n].chapterId;
            let lmid = this.list[n].testPagerId;
            let total = this.list[n].totalNumber;
            let only = this.list[n].rightNumber;
            console.log(total, only, 394938)
            if (lmid == null) {
                lmid = this.indexcolumn
            }
            this.$router.push({
                path: "/question/practice",
                query: { showname, lmid, id: chapterid, total, only, changenum: this.changenum }
            });
        },
        gofinish() {
            this.show = true;
            document.body.style.overflowY = "hidden";
        },
        block() {
            console.log(1);
            document.body.style.overflow = "auto";
            this.show = false;
        }
    }
};
</script>
<style lang="less" scoped>
.xuexi{
    text-align: center;
    margin-top: 20px;
}
.main {
    background: white;
    padding: 20px;
    border-radius: 10px;
}
.animat {
    animation: fadeIn 1s;
    z-index: 0;
}
.block {
    z-index: 9999;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100px;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .white {
        width: 530px;
        height: 450px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        span {
            position: absolute;
            top: 22px;
            right: 22px;
            cursor: pointer;
            img {
                width: 16px;
                height: 16px;
            }
        }
        .bot {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            img {
                width: 235px;
                height: 235px;
            }
        }
    }
}
.topcontent {
    min-height: 100px;
}
.list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;
}
.cont-left {
    display: flex;
    align-items: center;
}
.cont-right {
    padding: 4px 9px;
    border: 1px solid #14bc91;
    border-radius: 20px;
    color: #14bc91;
}
.cont-title {
    color: #333333;
    font-weight: 600;
    // width: 280px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.time {
    color: #c8c8c8;
    margin-left: 20px;
}
.list:hover {
    .cont-title {
        color: #14bc91;
    }
    .time {
        color: #14bc91;
    }
    .cont-right {
        color: white;
        background: #14bc91;
    }
}
.second {
    margin-top: 20px;
}
.title {
    border-bottom: 1px solid rgba(229, 234, 232, 1);
    padding-bottom: 10px;
    h3 {
        font-size: 22px;
        font-weight: 600;
        line-height: 38px;
    }
}
.title1 {
    border-bottom: 1px solid rgba(229, 234, 232, 1);
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .task {
        color: #bdc6c2;
        font-size: 8px;
        padding-top: 8px;
    }
}
.top {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .topL {
        display: flex;
    }
    ._topL {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .lj {
        color: #bdc6c2;
        font-size: 8px;
    }
}
.finish {
    background: rgba(215, 211, 204, 1);
    color: white;
    border-radius: 15px;
    padding: 5px 10px 5px 10px;
    font-size: 7px;
}
.topR {
    display: flex;
    align-items: center;
}
.gofinish {
    color: white;
    border-radius: 15px;
    padding: 5px 10px 5px 10px;
    font-size: 7px;
    background: rgba(255, 170, 0, 1);
    cursor: pointer;
}
.line {
    display: flex;
    justify-content: center;
    width: 80%;
    background: rgba(229, 234, 232, 1);
    height: 1px;
    margin: 0 auto;
    margin-top: 20px;
}
</style>
