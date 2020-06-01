<template>
    <div>
        <div
            v-loading="loading"
            class="main"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
        >
            <div class="center">
                <div class="center-l">
                    <div class="l-top" />
                    <div class="answer">
                        <!-- 题目导航 -->
                        <!-- 题目答题 -->
                        <div class="content">
                            <modelzero
                                v-if="list!=''&&modellist[0].answerModel==0"
                                ref="model0"
                                :list="list"
                                :back1="this.$route.query.changenum"
                            />
                            <modelone
                                v-else-if="list!=''&& modellist[0].answerModel==1"
                                :list="list"
                            />
                            <modeltwe
                                v-else-if="list!=''&&modellist[0].answerModel==2"
                                :list="list"
                            />
                        </div>
                        <div />
                    </div>
                </div>

                <!-- 右边栏答题卡 -->
                <div
                    v-if="list.questionList!==undefined &&list.questionList.length!==0"
                    class="center-r"
                >
                    <div class="r-top">
                        <div class="scicon" @click="goback">
                            <div class="icon">
                                <i class="el-icon-back" />
                            </div>
                            <div class="iconfont">返回</div>
                        </div>
                        <div
                            class="scicon"
                            :class="[collect[num]==1?'collected':'']"
                            @click="collecting(num)"
                        >
                            <div class="icon">
                                <img v-if="collect[num]==0" src="../../static/img/2.png" alt />
                                <img v-if="collect[num]==1" src="../../static/img/1.png" alt />
                            </div>
                            <div class="iconfont">收藏</div>
                        </div>
                        <div class="scicon" @click="recovery">
                            <div class="icon">
                                <i class="el-icon-edit" />
                            </div>
                            <div class="iconfont">纠错</div>
                        </div>
                    </div>
                    <div class="r-bot">
                        <div v-if="list!=''&&modellist[0].answerModel==1" class="time">
                            <div class="time-top">
                                <i class="el-icon-timer" />
                            </div>
                            <div class="time-mid">考试用时</div>
                            <div class="time-bot">{{ hour }}:{{ minute }}:{{ second }}</div>
                        </div>
                        <div class="model">
                            <div>做题模式：</div>
                            <div class="donwlist">
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <span
                                            v-for="(item,index) in answermiddles"
                                            :key="index"
                                            class="modelcheck"
                                        >
                                            <span v-if="item.isDefault==0">
                                                <span v-if="item.answerModel==0">练习模式</span>
                                                <span v-else-if="item.answerModel==1">检测模式</span>
                                                <span v-else-if="item.answerModel==2">背题模式</span>
                                            </span>
                                        </span>
                                        <i class="el-icon-arrow-down el-icon--right" />
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item
                                            v-for="(item,index) in answermiddles"
                                            :key="index"
                                        >
                                            <span v-if="item.isDefault!=0">
                                                <span
                                                    v-if="item.answerModel==0"
                                                    @click="modelchangelx(0)"
                                                >练习模式</span>
                                                <span
                                                    v-else-if="item.answerModel==1"
                                                    @click="modelchangejz(1)"
                                                >检测模式</span>
                                                <span
                                                    v-else-if="item.answerModel==2"
                                                    @click="modelchangebt(2)"
                                                >背题模式</span>
                                            </span>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="answercard">
                            <h4>题卡</h4>
                            <div class="r-botlist">
                                <div v-if="modellist[0].answerModel==0" class="r-botlists">
                                    <div class="hzg" />
                                    <div class="describe">正确</div>
                                </div>
                                <div v-if="modellist[0].answerModel==0" class="r-botlists">
                                    <div class="hzw" />
                                    <div class="describe">错误</div>
                                </div>
                                <div v-if="modellist[0].answerModel==1" class="r-botlists">
                                    <div style="background:rgba(168,174,171,1);" class="hzw" />
                                    <div class="done" style="color:#666">已做</div>
                                </div>
                                <div class="r-botlists">
                                    <div class="hzn" />
                                    <div class="describe">未做</div>
                                </div>

                                <div
                                    v-for="(item,index) in answermiddles"
                                    :key="index"
                                    class="r-boticon"
                                    @click="clearRecord"
                                >
                                    <div v-if="item.answerModel==0&&item.isDefault==0">
                                        <i class="el-icon-delete" style="cursor:pointer" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div v-for="(item,n) in answerlist" :key="n" class="answerlist">
                                    <div v-if="item!=[]" class="aTop">
                                        <h4 v-if="n==0&&item!=''">单选</h4>
                                        <h4 v-else-if="n==1&&item!=''">多选</h4>
                                        <h4 v-else-if="n==2&&item!=''">不定项选</h4>
                                        <h4 v-else-if="n==3&&item!=''">填空</h4>
                                        <h4 v-else-if="n==4&&item!=''">简答</h4>
                                        <h4 v-else-if="n==5&&item!=''">判断</h4>
                                    </div>
                                    <!-- 答题卡 -->
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="this.modellist[0].answerModel==='0'"
                        class="btnan"
                        @click="keep"
                    >
                        保存进度，下次继续
                    </div>
                    <div v-if="this.modellist[0].answerModel==='1'" class="btnan" @click="btnan">交卷</div>
                </div>
                <div v-else class="center-r"></div>
            </div>
            <div v-if="jcjudge" class="jc">
                <div class="centers">
                    <div class="close">
                        <div>纠错</div>
                        <img src="../../resouce/index/close.png" @click="closejc" />
                    </div>
                    <div class="choses chose1">
                        <el-radio v-model="radio" label="1">含有错别字</el-radio>
                        <el-radio v-model="radio" label="2">答案不正确</el-radio>
                    </div>
                    <div class="choses chose2">
                        <el-radio v-model="radio" label="3">题目不完整</el-radio>
                        <el-radio v-model="radio" label="4">图片不完整</el-radio>
                    </div>
                    <div class="choses chose3">
                        <el-radio v-model="radio" label="5">解析不完整</el-radio>
                        <el-radio v-model="radio" label="6">其他错误</el-radio>
                    </div>
                    <div class="chose4">
                        <el-input
                            v-model="textarea2"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                        />
                    </div>
                    <div class="btn" @click="postjc">提交纠错</div>
                </div>
            </div>
        </div>
        <foot />
    </div>
</template>
<style lang="less" scoped>
.jc {
    width: 100%;
    height: 100%;
    // background:
    position: absolute;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    top: 100px;
    .close {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    img {
        width: 15px;
        height: 15px;
        border-radius: 8px;
    }
    .choses {
        margin-top: 20px;
    }
    .chose4 {
        margin-top: 20px;
    }
    .btn {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        background: #38c5a1;
        padding: 10px;
        // margin-top: 11px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
    }
    .centers {
        padding: 20px;
        background: white;
        width: 300px;
        border-radius: 10px;
        margin-bottom: 300px;
    }
}
.btnan {
    width: 270px;
    height: 50px;
    background: linear-gradient(
        -90deg,
        rgba(21, 189, 145, 1),
        rgba(34, 209, 174, 1)
    );
    border-radius: 10px;
    margin-top: 13px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}
.collected {
    color: #15bd91;
}

.zw {
    height: 155px;
}
.main {
    display: flex;
    justify-content: center;
    padding-bottom: 80px;
}
.center {
    width: 1200px;
    // margin-top: -80px;
    display: flex;
    justify-content: space-between;
    min-height: 500px;
}
.center-l {
    width: 897px;
}
.center-r {
    width: 280px;
    margin-left: 20px;
    margin-top: 20px;
}
.tg {
    padding: 15px;
    background: white;
    border-radius: 5px;
}
.donenum {
    color: #15bd91;
    font-size: 25px;
}
.progess {
    display: flex;
    align-items: center;
}
.havedown {
    margin-left: 30px;
    font-size: 14px;
}
.jdt {
    width: 60%;
}
.content {
    margin-top: 20px;
}
.cTitle {
    padding: 10px 20px 10px 20px;
    background: rgba(238, 242, 239, 1);
    border-radius: 5px;
}
.r-top {
    padding: 10px;
    background: white;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
}
.icon {
    display: flex;
    justify-content: center;
    img {
        width: 30px;
        height: 30px;
    }
}
.scicon {
    cursor: pointer;
}
.scicon i {
    font-size: 25px;
    cursor: pointer;
}

.scicon:hover {
    color: #15bd91;
}
.r-content {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
}
.r-bot {
    padding: 10px;
    background: white;
    border-radius: 10px;
    margin-top: 20px;
}
.model {
    display: flex;
    align-items: center;
    justify-content: center;
}
.iconfont {
    font-size: 15px;
}
.time {
    text-align: center;
    margin-bottom: 20px;
    .time-bot {
        font-size: 20px;
        color: #15bd91;
    }
    i {
        font-size: 40px;
    }
    div {
        margin-top: 10px;
    }
}
.describe {
    margin-left: 2px;
}
.donwlist {
    border: 1px solid rgba(200, 200, 200, 1);
    border-radius: 15px;
    padding: 7px 15px;
    width: 144px;
    display: flex;
    justify-content: center;
    line-height: 1;
}
.donwlist:hover {
    color: #15bd91;
}
.r-botlist {
    display: flex;
    border-bottom: 1px solid #e5ebe8;
    padding-bottom: 10px;
}
.hzg {
    background-color: #15bd91;
    width: 20px;
    height: 20px;
    border-radius: 4px;
}
.hzw {
    background-color: #fd4852;
    width: 20px;
    height: 20px;
    border-radius: 4px;
}
.hzn {
    background-color: white;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid rgba(180, 180, 180, 1);
}
.answercard {
    margin-top: 20px;
}
.r-botlists {
    display: flex;
    align-items: center;
    line-height: 30px;
    margin-right: 20px;
    width: 57px;
    justify-content: space-between;
}
.r-boticon {
    color: #c2c2c2;
    font-size: 20px;
}
.modelcheck {
    cursor: pointer;
    font-size: 16px;
}
.aBot {
    // overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-height: 300px;
    overflow: auto;
    div {
        cursor: pointer;
        font-size: 12px;
        padding: 4px 2px;
        border: 1px solid rgba(180, 180, 180, 1);
        // background: #15BD91;
        color: #333333;
        margin: 5px;
        width: 28px;
        text-align: center;
        border-radius: 4px;
    }
    .aBotsworry {
        background: #fd4852;
        color: white;
        border: 0;
    }
    .aBotsright {
        background: #15bd91;
        color: white;
        border: 0;
    }
    .aBotsdown {
        background: rgba(168, 174, 171, 1);
        color: #fff;
    }
    .aBotnot {
        background: white;
        color: #000;
        border: 0;
    }
}

.aBot::-webkit-scrollbar {
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.aBot::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
}
.aBot::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}
.right {
    background: red;
}
</style>
<script>
import { mapState } from "vuex";
import modelzero from "~/components/exercise/modelzero";
import modelone from "~/components/exercise/modelone";
import modeltwe from "~/components/exercise/modeltwe";
import {
    fechtest,
    cleartopic,
    submiterror,
    Collection,
    model,
    Historical,
    fetchand
} from "../action";
import foot from "~/components/foot.vue";
export default {
    components: {
        modelzero,
        modelone,
        modeltwe,
        foot
    },
    data() {
        return {
            jcjudge: false,
            radio: "1",
            textarea2: "",
            state: this.$store.state,
            showname: "",
            modellist: [{ answermiddle: 0 }], // 模式选择
            count: 5,
            personnum1: 0,
            chapterid: "",
            list: "",
            totalnum: 0,
            personnum: 0,
            num: 0,
            answerlist: "", // 答题卡
            loading: true,
            answermiddle: "", // 答题卡正确判断
            answermiddles: "", // 模式选项卡
            hour: 0,
            second: 0,
            minute: 0,
            memberExamLogId: "", // 考试设置ID
            collect: "",
            timer: "",
            change: ""
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            lmInfor: state => state.lmInfor,
            userchoseInfor: state => state.userchoseInfor
        })
    },
    watch: {
        "state.nowindex"(nowindex) {
            // 收藏监听
            this.m = 1;
            this.num = nowindex;
            this.collect = [...this.collect];
        }
    },
    created() {},
    mounted() {
        var collect = [];
        // this.mathtime()
        this.getRoutedata();
        // let chapterid = this.chapterid;
        let lmid = this.$route.query.lmid;
        this.$store.state.lmInfor = lmid;
        // var that = this;
        fechtest({
            // 获取试题
            chapterId: this.$route.query.id,
            columnId: lmid
        })
            .then(data => {
                data.questionList.map(item => {
                    collect.push(item.collectFlag);
                });
                this.collect = collect;
                let modellist = data.list;
                this.modellist = modellist.filter(item => {
                    return item.isDefault == 0; // 默认选中的模式
                });
                this.answermiddles = data.list;
                // this.loading = false;
                this.list = data;
                if (this.totalnum == 0) {
                    this.$route.query.total = this.list.questionList.length;
                    let indexSelect = 0;
                    data.questionList.map(item => {
                        if (item.userAnswer != "" && item.userAnswer != null) {
                            indexSelect++;
                        }
                    });
                    this.$route.query.only = indexSelect;
                    console.log(indexSelect, 111111);
                }
                this.list.questionList.forEach(questionItem => {
                    // var aaaa = questionItem.answerList[0].rightFlag;

                    if (questionItem.questionType.type === "5") {
                        questionItem.answerList = [
                            {
                                rightFlag:
                                    questionItem.answerList[0].rightFlag === "1"
                                        ? "1"
                                        : "0",
                                content: "正确",
                                option: "0"
                            },
                            {
                                rightFlag:
                                    questionItem.answerList[0].rightFlag === "0"
                                        ? "1"
                                        : "0",
                                content: "错误",
                                option: "1"
                            }
                        ];
                    }
                });
                this.createCard();
            })
            .catch(error => {
                console.log(error);
            }).finally(() => {
                this.loading = false;
            })
    },
    methods: {
        btnan() {
            this.$confirm("确定要交卷？", "提示信息", {
                distinguishCancelAndClose: true,
                cancelButtonText: "取消",
                confirmButtonText: "确认"
            })
                .then(() => {
                    var memberExamLogId = this.list.memberExamLogId;
                    var resouceId = this.list.questionList[0].chapterId;
                    var timer = 123;
                    var showname = this.$route.query.showname;
                    fetchand({
                        memberExamLogId,
                        resouceId,
                        timer: "123",
                        showname
                    }).then(data => {
                        this.$router.push({
                            path: "/question/result",
                            query: {
                                memberExamLogId,
                                resouceId,
                                timer,
                                showname
                            }
                        });
                    });
                })
                .catch(action => {
                    this.change = 0;
                    this.$message({
                        type: "success",
                        message: "已取消交卷"
                    });
                });
        },
        goback() {
            // 返回按钮
            console.log(this.$route.query.changenum, 123456789, this.state.questionIndexRouteFlag, this.state.questionIndexActiveIndex);
            if (this.modellist[0].answerModel == 0) {
                this.historyrecord();
            }
            this.state.questionIndexRouteFlag = true; // 标识路由返回
            this.state.questionIndexActiveIndex = this.$route.query.changenum;
            this.$router.go(-1);
        },
        closejc() {
            document.body.style.overflow = "auto";
            this.jcjudge = false;
        },
        clearRecord() {
            // 清除做题记录
            let num = this.num;
            let kmid = this.userchoseInfor.id;
            let questionId = this.list.questionList[num].id;
            let sourceId = this.list.questionList[num].chapterId;
            let minute = this.minute;
            let hour = this.hour;
            let second = this.second;
            var total = second + 60 * minute + 3600 * hour;
            this.$confirm("是否清除做题记录？", "确认信息", {
                distinguishCancelAndClose: true,
                cancelButtonText: "取消",
                confirmButtonText: "确认"
            })
                .then(() => {
                    cleartopic({
                        categoryId: kmid,
                        questionId,
                        sourceId,
                        timer: total
                    }).then(data => {
                        window.location.reload();
                        this.change = 1;
                        this.totalnum = this.$route.query.total;
                        this.personnum = 0;
                    });
                })
                .catch(action => {
                    this.change = 0;
                    this.$message({
                        type: "success",
                        message: "已取消删除"
                    });
                });
        },
        // 保存做题记录
        keep() {
            this.historyrecord();
            this.$message({
                type: "success",
                message: "成功保存"
            });
        },
        getRoutedata() {
            // 头部做题数
            console.log(this.$route.query);
            this.showname = this.$route.query.showname;
            this.chapterid = this.$route.query.id;

            if (this.totalnum == 0) {
                this.personnum1 = 0;
            } else {
                this.totalnum = this.$route.query.total;
                this.personnum = this.$route.query.only;
                var percent = (this.personnum / this.totalnum) * 100;
                this.personnum1 = percent;
            }
        },
        postjc() {
            // 提交糾錯
            console.log(this.radio);
            console.log(this.textarea2);
            const num = this.num;
            const categoryId = this.list.questionList[num].categoryId;
            const chapterId = this.list.questionList[num].chapterId;
            const questionId = this.list.questionList[num].id;
            submiterror({
                categoryId,
                chapterId,
                questionId,
                errorType: this.radio,
                errorMark: this.textarea2
            }).then(data => {
                this.$message({
                    message: "提交成功",
                    type: "success"
                });
                this.jcjudge = false;
                document.body.style.overflowY = "auto";
            });
        },
        collects(num) {
            // 判断收藏
            this.num = num;
        },
        recovery() {
            this.jcjudge = true;
            document.body.style.overflowY = "hidden";
        },
        collecting(n) {
            // 收藏功能
            var num = this.num;
            var categoryId = this.list.questionList[num].categoryId;
            var chapterId = this.list.questionList[num].chapterId;
            var questionId = this.list.questionList[num].id;
            var collecttype = this.collect[num];
            console.log(collecttype);
            if (collecttype == 0) {
                this.collect[num] = 1;
                this.collect = [...this.collect];
                Collection({
                    categoryId,
                    chapterId,
                    collectType: 1,
                    questionId
                }).then(data => {
                    this.$message({
                        message: "收藏成功",
                        type: "success",
                        center: true,
                        duration: 1000,
                        offset: 60
                    });
                });
            } else {
                this.collect[num] = 0;
                this.collect = [...this.collect];
                Collection({
                    categoryId,
                    chapterId,
                    collectType: 0,
                    questionId
                }).then(data => {
                    this.$message({
                        message: "取消收藏",
                        type: "success",
                        center: true,
                        duration: 1000,
                        offset: 60
                    });
                });
            }
        },
        right(num) {
            // 做题正确
            this.answermiddle[num] = 1;
            this.answermiddle = [...this.answermiddle];
            console.log("判断表正确" + this.answermiddle);
        },
        worry(num) {
            // 做题错误
            console.log("判断表错误" + this.answermiddle);
            this.answermiddle[num] = 2;
            this.answermiddle = [...this.answermiddle];
        },
        down(num) {
            console.log("qweqw11222");
            console.log("down", this.answermiddle);
            this.answermiddle[num] = 3;
            this.answermiddle = [...this.answermiddle];
        },
        notdown(num) {
            console.log("down", this.answermiddle);
            this.answermiddle[num] = 0;
            this.answermiddle = [...this.answermiddle];
        },

        mathtime() {
            // 计时器
            var hour = 0;
            var second = 0;
            var minute = 0;
            this.timer = setInterval(() => {
                second = second + 1;
                this.second = second;
                if (this.second == 60) {
                    minute = minute + 1;
                    this.minute = minute;
                    second = 0;
                    second = second + 1;
                    this.second = second;
                    if (this.minute === 60) {
                        hour = hour + 1;
                        this.hour = hour;
                        this.minute = 0;
                        minute = 0;
                    }
                }
            }, 1000);
        },
        cleartime() {
            clearInterval(this.timer);
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
        },
        createCard(num) {
            // 生成答题卡
            var middle = [];
            var answermiddle = []; // 答题判断表
            var list = this.list;
            var single = []; // 单选
            var double = []; // 多选
            var unsingle = []; // 不定项选
            var materials = []; // 填空
            var question = []; // 问答
            var judge = []; // 判读
            list.questionList.map((item, index) => {
                if (item.questionType.type == 0) {
                    single.push(index);
                } else if (item.questionType.type == 1) {
                    double.push(index);
                } else if (item.questionType.type == 2) {
                    unsingle.push(index);
                } else if (item.questionType.type == 3) {
                    materials.push(index);
                } else if (item.questionType.type == 4) {
                    question.push(index);
                } else {
                    judge.push(index);
                }
            });
            middle.push(single, double, unsingle, materials, question, judge);
            this.answerlist = middle;
            console.log(this.modellist, "当前模式");
            console.log(this.modellist[0].answerModel);
            if (this.modellist[0].answerModel === "1") {
                list.questionList.map((item, n) => {
                    // var singleright = item.answerList.filter((items, n) => {
                    //     return items.rightFlag == 1
                    // })
                    if (item.userAnswer !== null && item.userAnswer !== "") {
                        answermiddle.push(3);
                    } else {
                        answermiddle.push(0);
                    }
                });
            } else {
                list.questionList.map((item, n) => {
                    if (
                        item.questionType.type == 0 ||
                        item.questionType.type == 5
                    ) {
                        var singleright = item.answerList.filter((items, n) => {
                            return items.rightFlag == 1;
                        });
                        // 0未做 1正确 2错误 3已做

                        if (item.userAnswer == null || item.userAnswer == "") {
                            answermiddle.push(0);
                        } else if (singleright[0].option == item.userAnswer) {
                            answermiddle.push(1);
                        } else if (item.userAnswer != item.rightAnswer) {
                            answermiddle.push(2);
                        }
                    } else if (
                        item.questionType.type == 1 ||
                        item.questionType.type == 2
                    ) {
                        var mid = [];
                        var right = item.answerList.filter((items, n) => {
                            return items.rightFlag == 1;
                        });
                        right.map(items => {
                            mid.push(items.option);
                        });
                        var mids = mid.join("|");

                        if (item.userAnswer == null || item.userAnswer == "") {
                            answermiddle.push(0);
                        } else if (mids == item.userAnswer) {
                            answermiddle.push(1);
                        } else {
                            answermiddle.push(2);
                        }
                    } else if (item.questionType.type == 4) {
                        console.log(item.userAnswer, item.userAnswer.length);
                        if (item.userAnswer == null || item.userAnswer == "") {
                            answermiddle.push(0);
                        } else if (
                            item.userAnswer.length > 0
                        ) {
                            answermiddle.push(2);
                        }
                    }
                });
                console.log("答题卡", ...answermiddle);
            }
            this.answermiddle = answermiddle;
            this.$store.state.answermiddle = answermiddle;
        },
        modelchange(e) {
            // 模式切换
            this.loading = true;
            const categoryId = this.userchoseInfor.id; // 科目ID
            const num = this.$store.state.nowindex; // 当前题目数
            const questionId = this.list.questionList[num].id; // 试题ID
            const preMode = parseInt(this.modellist[0].answerModel); // 上一个模式
            const chapterId = this.chapterid; // 章节ID
            const lmid = this.$route.query.lmid; // 栏目ID
            const mode = e;
            // const chapterid=this.$store.state.userchoseInfor.id
            model({
                categoryId, // 科目ID
                columnId: lmid, // 栏目ID
                memberExamLogId: "", // 考试设置ID
                mode, // 切换的模式
                preMode, // 上一个模式
                questionId, // 试题ID
                resourceId: chapterId, // 章节ID
                timer: ""
            }).then(res1 => {
                window.location.reload();
                console.log(res1);
                fechtest({
                    chapterId,
                    columnId: lmid
                }).then(data => {
                    console.log("模式切换后请求数据", data);
                    this.cleartime();
                    // this.list = res.data.data;
                    this.answermiddles = res1.list;
                    this.memberExamLogId = data.memberExamLogId;
                    this.modellist = res1.list.filter(item => {
                        return item.isDefault == 0;
                    });
                    // this.loading = false;
                    this.createCard();
                }).finally(() => {
                    this.loading = false;
                })
            });
        },

        historyrecord() {
            // 增加历史记录
            var time = this.$refs.model0.timer;
            console.log("时间" + time);
            var num = this.num;
            var categoryId = this.list.questionList[num].categoryId;
            var sourceId = this.chapterid;
            var questionId = this.list.questionList[num].id;
            var timer = 1000;
            Historical({
                categoryId,
                questionId,
                sourceId,
                timer
            }).then(data => {
                console.log("增加历史记录成功", data);
            });
        },

        modelchangelx(e) {
            // 切换到练习模式
            this.$confirm("此操作将切换到练习模式并记录, 是否继续?", "提示", {
                distinguishCancelAndClose: true,
                cancelButtonText: "取消",
                confirmButtonText: "确认"
            })
                .then(() => {
                    this.loading = true;
                    this.$message({
                        type: "success",
                        message: "切换成功!"
                    });
                    this.modelchange(e);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消切换"
                    });
                });
        },

        modelchangejz(e) {
            // 切换到检测模式
            this.$confirm("此操作将切换到检测模式并记录?", "提示", {
                distinguishCancelAndClose: true,
                cancelButtonText: "取消",
                confirmButtonText: "确认"
            })
                .then(() => {
                    this.loading = true;
                    this.$message({
                        type: "success",
                        message: "切换成功!"
                    });

                    if (this.modellist[0].answerModel == 1) {
                        this.historyrecord();
                    }
                    this.modelchange(e);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消切换"
                    });
                });
        },
        modelchangebt(e) {
            // 切换到背题模式
            this.$confirm("此操作将切换到背题模式并记录?", "提示", {
                distinguishCancelAndClose: true,
                cancelButtonText: "取消",
                confirmButtonText: "确认"
            })
                .then(() => {
                    this.loading = true;
                    this.$message({
                        type: "success",
                        message: "切换成功!"
                    });
                    if (this.modellist[0].answerModel == 2) {
                        this.historyrecord();
                    }
                    this.modelchange(e);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消切换"
                    });
                });
        },
        answerChose(items) {
            // let model = this.modellist[0].answerModel;
            console.log(items);
            this.$store.state.nowindex = items;
        },
        format(percentage) {
            console.log(1234567890)
            // 进度条百分比
            return percentage === 100 ? "已做完" : "";
        }
    }
};
</script>
