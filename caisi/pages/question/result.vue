<template>
    <div>
        <div v-if="show" class="main">
            <div class="body">
                <div class="top">{{ showname }}</div>
                <div class="middle">
                    <div class="mtop">
                        <div>检测结果</div>
                    </div>

                    <div class="m-bot">
                        <div class="mleft">
                            <div>
                                <el-progress
                                    type="dashboard"
                                    :percentage="accuracy"
                                    color="#15BD91"
                                    stroke-width="8"
                                    width="160"
                                />
                            </div>
                            <div class="rightcount">正确率</div>
                        </div>
                        <div v-if="list!==''" class="mright">
                            <div v-for="(item,n) in list" :key="n" class="mm">
                                <div class="mmleft">
                                    <div>{{ item.questionTypeName }}</div>
                                    <div>({{ item.totalScore }}题)</div>
                                </div>
                                <div class="mmright">
                                    正确
                                    <span>{{ item.score }}</span>题
                                </div>
                            </div>
                        </div>
                        <div v-else class="mright">还没有参加考试的</div>
                    </div>
                </div>
                <div class="aBot">
                    <div
                        v-for="(items,index) in item"
                        :key="index"
                        class="aBots"
                        :class="[answermiddle[items]==1?'aBotsright':'',answermiddle[items]==2?'aBotsworry':'',answermiddle[items]==0?'aBots':'',answermiddle[items]==3?'aBotsdown':'',]"
                        @click="answerChose(items)"
                    >
                        {{ items+1 }}
                    </div>
                </div>
                <div class="bottom">
                    <div class="b-left" @click="toquestion">
                        <i class="el-icon-house" />
                        <span>回到首页</span>
                    </div>
                    <div class="b-mid">
                        <i class="el-icon-tickets" />
                        <span @click="handView">查看答案解析</span>
                    </div>
                    <div class="b-right" @click="oncemore">
                        <i class="el-icon-refresh-right" />
                        <span>重考一次</span>
                    </div>
                </div>
            </div>
        </div>
        <lookback v-if="flag" :looklist="looklist" @back="[show = true, flag=false]">
        </lookback>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { fetchand } from "../action";
import lookback from "~/components/exercise/lookback";

export default {
    components: {
        lookback
    },
    data() {
        return {
            percentage: 0,
            flag: false,
            showname: "",
            list: [],
            accuracy: 0,
            chapterid: "",
            lmid: "",
            show: true,
            looklist: [],
            next: 0
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token
        })
    },
    created() {
        var memberExamLogId = this.$route.query.memberExamLogId;
        var resouceId = this.$route.query.resouceId;
        fetchand({
            memberExamLogId,
            resouceId,
            timer: ""
        }).then(data => {
            this.accuracy = data.accuracy.split("%")[0];
            this.list = data.testPageQuestionCountList;
        });
        this.showname = this.$route.query.showname;
    },
    mounted() {

    },
    methods: {
        toquestion() {
            this.$router.push({ path: "../question" });
        },
        oncemore() {
            this.$router.go(-1);
        },
        handView() {
            var memberExamLogId = this.$route.query.memberExamLogId;
            var resouceId = this.$route.query.resouceId;
            fetchand({
                memberExamLogId,
                resouceId,
                timer: ""
            }).then(data => {
                this.show = false
                this.flag = true
                if (data !== "") {
                    this.looklist = data
                }
            });
        }
    }
};
</script>

<style>
.el-progress__text {
    font-size: 30px !important;
    color: #15bd91;
}
</style>
<style lang="less" scoped>
@color: #15bd91;
.main {
    padding: 50px 0;
    display: flex;
    align-items: center;
    background: #f5f8f6;
}
.body {
    width: 1200px;
    margin: 0 auto;
    min-height: 300px;
    background: white;
    padding: 20px;
    border-radius: 20px;
}
.top {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-size: 17px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 20px;
}
.middle {
    padding: 5px;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 18px;
    margin-bottom: 18px;
    width: 80%;
    box-shadow: 0px 0px 6px #eee;
}
.rightcount {
    text-align: center;
    color: #22b98c;
    font-weight: 600;
    font-size: 20px;
}
.m-bot {
    border-top: 1px solid #f5f5f5;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mright {
    width: 40%;
    margin-left: 80px;
    .mm:not(:last-of-type) {
        border-bottom: 1px solid #999999;
    }
}
.mmleft {
    div:nth-of-type(1) {
        font-size: 14px;
    }
    div:nth-of-type(2) {
        font-size: 15px;
        color: #999999;
        margin-left: 5px;
    }
}
.mm {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .mmleft {
        display: flex;
        align-items: center;
    }
}
.mmright {
    color: #999999;
    font-size: 12px;
    span {
        color: #15bd91;
        font-size: 15px;
        padding: 0 5px;
    }
}
.mtop {
    margin: 9px 0;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    div {
        border-bottom: 2px solid @color;
        width: 100px;
        margin: 0 auto;
        font-size: 16px;
    }
}
.bottom {
    width: 80%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 60px;
    margin-bottom: 50px;
    div {
        cursor: pointer;
    }
    .b-left {
        background: @color;
        color: white;
        padding: 6px 20px;
        border-radius: 5px;
    }
    .b-mid {
        background: @color;
        color: white;
        padding: 6px 20px;
        border-radius: 5px;
    }
    .b-right {
        background: #fd4852;
        color: white;
        padding: 6px 20px;
        border-radius: 5px;
    }
    div {
        font-size: 17px;
        display: flex;
        align-items: center;
        span {
            margin-left: 5px;
            font-size: 16px;
        }
    }
}
</style>
