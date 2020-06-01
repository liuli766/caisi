
<template>
    <!-- 学习统计页面 -->
    <div>
        <div>
            <div
                v-loading="loading"
                class="main"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="#fff"
            >
                <div class="title">
                    <h3>做题统计</h3>
                </div>
                <div class="content">
                    <div class="totalCount">
                        <span>总题：{{ list.totalQuestionCount }}</span>
                    </div>
                    <div class="progress">
                        <div class="de">
                            <el-progress :text-inside="true" :stroke-width="15" :percentage="num" />
                        </div>
                        <div class="finish">
                            <span>已做{{ list.questionCount }}</span>
                        </div>
                    </div>
                    <div class="lists">
                        <div class="list">
                            <img src="../../resouce/answer/bg.png" alt />
                            <div>
                                <div class="rightcolor">
                                    <span>{{ list.rightCount }}</span>道
                                </div>
                                <div class="rightnum">做对数</div>
                            </div>
                        </div>
                        <div class="list">
                            <img src="../../resouce/answer/bg.png" alt />
                            <div>
                                <div class="rightcolor" style="color:#FD4852">
                                    <span>{{ list.errorCount }}</span>道
                                </div>
                                <div class="rightnum">做错数</div>
                            </div>
                        </div>
                        <div class="list">
                            <img src="../../resouce/answer/bg.png" alt />
                            <div>
                                <div class="rightcolor" style="color:#666666">
                                    <span>{{ parseInt(list.accuracy) }}</span>%
                                </div>
                                <div class="rightnum">正确率</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-loading="loading"
            class="main"
            style="margin-top:20px"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
        >
            <div class="title">
                <h3>题型统计</h3>
            </div>
            <div class="contents">
                <div class="contentsL">
                    正确
                    <div v-for="(item,index) in analyze" :key="index">
                        <div>
                            <div v-if="item.type==0">
                                单选题：
                                <span>{{ parseInt(item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==1">
                                多选题：
                                <span>{{ parseInt(item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==2">
                                不定项选题：
                                <span>{{ parseInt(item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==3">
                                填空题：
                                <span>{{ parseInt(item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==4">
                                材料题：
                                <span>{{ parseInt(item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==5">
                                判断题：
                                <span>{{ parseInt(item.questionRightCount) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contentsR">
                    错误
                    <div v-for="(item,index) in analyze" :key="index">
                        <div>
                            <div v-if="item.type==0">
                                单选题：
                                <span>{{ parseInt(item.questionCount-item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==1">
                                多选题：
                                <span>{{ parseInt(item.questionCount-item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==2">
                                不定项选题：
                                <span>{{ parseInt(item.questionCount-item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==3">
                                填空题：
                                <span>{{ parseInt(item.questionCount-item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==4">
                                材料题：
                                <span>{{ parseInt(item.questionCount-item.questionRightCount) }}</span>
                            </div>
                            <div v-else-if="item.type==5">
                                判断题：
                                <span>{{ parseInt(item.questionCount-item.questionRightCount) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@color: #15bd91;
.main {
    background: white;
    padding: 20px;
    border-radius: 10px;
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
.totalCount {
    margin-top: 10px;
    span{
        font-size: 18px;
    }
}
.progress {
    display: flex;
    margin-top: 10px;
    .de {
        width: 80%;
    }
    .finish {
        color: #a2a2a2;
        font-size: 14px;
        margin-left: 10px;
    }
}

.lists {
    display: flex;
    margin-top: 20px;
    .list {
        position: relative;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-image: url("../../resouce/answer/bg.png");
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background: white;
        margin-top: 10px;
        img {
            position: absolute;
        }
        div {
            z-index: 0;
        }
        span {
            font-size: 25px;
        }
        .rightnum {
            font-size: 10px;
            color: #bdc6c2;
        }
    }
}
.rightcolor {
    color: #15bd91;
}
.contents {
    display: flex;
    color: #666666;
    font-size: 15px;
    justify-content:space-around;
    .contentsR {
        margin-left: 70px;
    }
    div {
        margin-top: 10px;
    }
    span {
        color: #333333;
        font-weight: 500;
    }
}
</style>
<script>
import { mapState } from "vuex";
import { start, startType } from "../../pages/action";

export default {
    data() {
        return {
            list: "",
            analyze: "",
            colnum: 0,
            loading: true,
            errornum: 0,
            rightnum: 0,
            num: 0
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            userinfo: state => state.userchoseInfor
        })
    },
    created() {
        start(this.userinfo.id).then(data => {
            console.log(data, 94790)
            this.list = data;
            let num = this.list.questionCount / this.list.totalQuestionCount;
            this.num = num * 100;
        }).finally(() => {
            this.loading = false;
        })
        startType(this.userinfo.id).then(data => {
            console.log(data)
            var b = 0;
            this.analyze = data;
            this.analyze.map((item, n) => {
                b += item.questionRightCount;
            });
            this.rightnum = b;
        })
    }
};
</script>
