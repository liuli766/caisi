<template>
    <div>
        <div
            v-loading.fullscreen.lock="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <div class="main">
                <div class="stem">
                    <div class="mainLeft">
                        <div class="pageTitle">易错试题</div>
                        <div class="stem">
                            <span class="questiontype">{{ num+1 }}.</span>
                            <span v-html="currentQuestion.stem" />
                        </div>

                        <div v-if="Boolean(currentQuestion)" class="content">
                            <!-- 单选-->
                            <div v-if="currentQuestion.questionType.type==0">
                                <div v-if="currentQuestion.userAnswer==null">
                                    <div
                                        v-for="(item,n) in currentQuestion.answerList"
                                        :key="n"
                                        class="singlecontent"
                                        @click="singlechose(item)"
                                    >
                                        <div>
                                            <span class="chose">{{ item.option }}</span>
                                        </div>
                                        <div class="rightchose">
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="currentQuestion.userAnswer!=''">
                                    <div
                                        v-for="(item,n) in currentQuestion.answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="chose"
                                                :class="{leftchose: item.rightFlag == 1,
                                                         worrychose: item.rightFlag == 0 && currentQuestion.userAnswer == item.option
                                                }"
                                            >{{ currentQuestion.questionType.type==5 ? "" : item.option }}</span>
                                        </div>
                                        <div
                                            class="rightchose"
                                            :class="{leftchose2: item.rightFlag == 1,
                                                     worrychose1: item.rightFlag == 0 && currentQuestion.userAnswer == item.option}"
                                        >
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 判断 -->
                            <div v-if="currentQuestion.questionType.type==5">
                                <div v-if="currentQuestion.userAnswer==null">
                                    <div
                                        v-for="(item,n) in currentQuestion.answerList"
                                        :key="n"
                                        class="singlecontent"
                                        @click="singlechose(item)"
                                    >
                                        <div>
                                            <span class="nullClass">{{ }}</span>
                                        </div>
                                        <div class="rightchose">
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="currentQuestion.userAnswer!=''">
                                    <div
                                        v-for="(item,n) in currentQuestion.answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="nullClass"
                                                :class="{judge1: item.rightFlag == 1,
                                                         judge0: item.rightFlag == 0 && currentQuestion.userAnswer == item.option}"
                                            >{{ currentQuestion.questionType.type==5 ? "" : item.option }}</span>
                                        </div>
                                        <div
                                            class="rightchose"
                                            :class="{leftchose2: item.rightFlag == 1,
                                                     worrychose1: item.rightFlag == 0 && currentQuestion.userAnswer == item.option}"
                                        >
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 多选和不定选 -->
                            <div
                                v-if="currentQuestion.questionType.type==1||currentQuestion.questionType.type==2"
                            >
                                <div v-if="currentQuestion.userAnswer==null">
                                    <!-- 用户未做 -->
                                    <div
                                        v-for="(item,n) in currentQuestion.answerList"
                                        :key="n"
                                        class="singlecontent"
                                        @click="doublechose(n)"
                                    >
                                        <div>
                                            <span
                                                class="chose"
                                                :class="[item.checked==true?'leftchose':'']"
                                            >{{ item.option }}</span>
                                        </div>
                                        <div class="rightchose">
                                            <span
                                                :class="[item.checked==true?'leftchose2':'']"
                                                v-html="item.content"
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 用户已做 -->
                                <div v-else>
                                    <div
                                        v-for="(item,n) in currentQuestion.answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="chose"
                                                :class="getItemType(item,currentQuestion)"
                                            >{{ item.option }}</span>
                                        </div>
                                        <div
                                            class="rightchose"
                                            :class="[item.rightFlag==1?'leftchose2':'',item.rightFlag==0&&item.checked?'worrychose1':'']"
                                        >
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        v-if="currentQuestion.userAnswer==null"
                                        class="btn"
                                        @click="doublepost(num)"
                                    >
                                        确认答案
                                    </div>
                                </div>
                            </div>

                            <!-- 材料简答题 -->
                            <div v-if="currentQuestion.questionType.type==4">
                                <div
                                    v-if="currentQuestion.userAnswer=='' || currentQuestion.userAnswer==null"
                                >
                                    <div class="myinput">
                                        <el-input
                                            v-model="textarea2"
                                            type="textarea"
                                            :autosize="{ minRows: 4, maxRows: 6}"
                                            placeholder="请作答"
                                            value="answer"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <div
                                            v-if="currentQuestion.userAnswer =='' || currentQuestion.userAnswer ==null "
                                            class="btn"
                                            @click="jdpost(num)"
                                        >
                                            确认答案
                                        </div>
                                    </div>
                                </div>
                                <div v-else>您的答案:{{ currentQuestion.userAnswer }}</div>
                            </div>

                            <!-- 填空题 -->
                            <div v-if="currentQuestion.questionType.type==3">
                                <div v-if="currentQuestion.userAnswer==''">
                                    <div class="myinput">
                                        <el-input
                                            v-model="textarea2"
                                            type="textarea"
                                            :autosize="{ minRows: 4, maxRows: 6}"
                                            placeholder="请输入内容"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <div
                                            v-if="currentQuestion.userAnswer==''"
                                            class="btn"
                                            @click="jdpost(num)"
                                        >
                                            确认答案
                                        </div>
                                    </div>
                                </div>
                                <div v-else>您的答案:{{ currentQuestion.userAnswer }}</div>
                            </div>
                        </div>
                        <!-- 解析 -->
                        <transition name="slide-fade">
                            <div v-if="anajudge" class="analysis">
                                <div v-if="currentQuestion.questionType.type==3">
                                    <div v-if="currentQuestion.userAnswer==''">
                                        <div class="myinput">
                                            <el-input
                                                v-model="textarea2"
                                                type="textarea"
                                                :autosize="{ minRows: 4, maxRows: 6}"
                                                placeholder="请输入内容"
                                            ></el-input>
                                        </div>
                                        <div>
                                            <div
                                                v-if="currentQuestion.userAnswer==''"
                                                class="btn"
                                                @click="jdpost(num)"
                                            >
                                                确认答案
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>您的答案:{{ currentQuestion.userAnswer }}</div>
                                </div>
                                <!-- 解析 -->
                                <transition name="slide-fade">
                                    <div v-if="anajudge" class="analysis">
                                        <div class="stem">
                                            <span>参考答案：</span>
                                            <!-- <span style="color:red">主观题系统不做评判，请根据下列参考答案自行评判！</span> -->
                                            <!-- <span
                                    v-for="(items,m) in currentQuestion.answerList"
                                    :key="m"
                                    class="rightchose2"
                                            >{{ items.rightFlag==1? items.option :"" }}</span>-->
                                            <div v-if="currentQuestion.questionType.type!=='5'">
                                                <span
                                                    v-for="(items,m) in currentQuestion.answerList"
                                                    :key="m"
                                                    class="rightchose2"
                                                >{{ items.rightFlag==1? items.option :'' }}</span>
                                            </div>
                                            <div v-if="currentQuestion.questionType.type=='5'">
                                                <span
                                                    v-for="(items,m) in currentQuestion.answerList"
                                                    :key="m"
                                                    class="rightchose2"
                                                >{{ items.rightFlag==='1'? items.content:'' }}</span>
                                            </div>
                                        </div>
                                        <div class="anadetails">
                                            <div>
                                                <span>【解析】</span>
                                            </div>
                                            <div v-html="currentQuestion.analysis"></div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </transition>
                        <div class="bot">
                            <div v-if="num === 0" class="b-left">第一题</div>
                            <div v-else class="b-left" @click="changeNum(false)">
                                <i class="el-icon-back"></i>
                                <span>上一题</span>
                            </div>
                            <div class="b-center" @click="changeana">
                                <i class="el-icon-document-checked"></i>
                                <span v-if="!anajudge">查看解析</span>
                                <span v-else>收起解析</span>
                            </div>

                            <div v-if="num === testNum-1" class="b-right" @click="last">最后一题</div>
                            <div v-else class="b-right" @click="changeNum(true)">
                                <span>下一题</span>
                                <i class="el-icon-right"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mainRight">
                        <div class="r-top">
                            <div class="scicon" @click="goback(2)">
                                <div class="icon">
                                    <i class="el-icon-back" />
                                </div>
                                <div class="iconfont">返回</div>
                            </div>
                            <div
                                class="scicon"
                                :class="[currentQuestion.collectFlag==1?'collected':'']"
                                @click="collecting(num)"
                            >
                                <div class="icon">
                                    <img
                                        v-if="currentQuestion.collectFlag==0"
                                        src="../../static/img/2.png"
                                        alt
                                    />
                                    <img
                                        v-if="currentQuestion.collectFlag==1"
                                        src="../../static/img/1.png"
                                        alt
                                    />
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
                    </div>
                    <!-- 纠错弹窗部分 -->
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
                            <div class="btn"
                                 @click="postjc"
                            >
                                提交纠错
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <foot />
    </div>
</template>
<script>
import { mapState } from "vuex";
import { eastErr, Collection, submiterror, getEasyErrTest } from "../action";
import foot from "~/components/foot.vue";
const questionCache = {};
export default {
    components: {
        foot
    },
    data() {
        return {
            jcjudge: false, // 控制纠错弹窗是否显示
            radio: "1",
            textarea2: "",
            state: this.$store.state,
            ErrList: "",
            eastErrList: [],
            num: -1, // 当前题目序号
            flag: false, // 处理数据异步加载问题
            ShowType: 0, // 用户选择的类型 0代表错题回顾 1代表错题重做
            anajudge: false, // 解析是否展示
            collect: "",
            loading: false,
            testNum: 0, // 题目总数
            right: "",
            backnum: 0,
            currentQuestionFlag: false,
            currentQuestion: {
                answerList: [],
                questionType: {}
            }
        };
    },
    watch: {
        "state.nowindex"(nowindex) {
            this.num = nowindex;
            this.collect = [...this.collect];
        },
        "state.userchoseInfor.id"(kmid) {},
        async num(num) {
            let question = await this.getQuestionDetail(
                this.ErrList[num].questionId
            );
            if (question.questionType.type === "5") {
                question.answerList = [
                    {
                        rightFlag:
                            question.answerList[0].rightFlag === "1"
                                ? "1"
                                : "0",
                        content: "正确",
                        option: "0"
                    },
                    {
                        rightFlag:
                            question.answerList[0].rightFlag === "0"
                                ? "1"
                                : "0",
                        content: "错误",
                        option: "1"
                    }
                ];
            }
            this.currentQuestion = question;
            if (
                this.currentQuestion.userAnswer !== null &&
                this.currentQuestion.userAnswer !== undefined
            ) {
                this.anajudge = true;
            } else {
                this.anajudge = false;
            }
        }
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            lmInfor: state => state.lmInfor,
            userInfor: state => state.userchoseInfor,
            nowindex: state => state.nowindex
        })
    },
    created() {},
    mounted() {
        let kmid = this.userInfor.id;
        this.loading = true;
        getEasyErrTest(kmid)
            .then(res => {
                console.log(res, "易错题列表306306");
                this.ErrList = res;
                this.testNum = this.ErrList.length
                for (let i = 0; i < res.length; i++) {
                    if (this.$route.query.questionId === res[i].questionId) {
                        this.num = i;
                        console.log(this.num);
                        break;
                    }
                }
            })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        async getQuestionDetail(questionId) {
            if (questionCache[questionId]) {
                return questionCache[questionId];
            }
            this.currentQuestionFlag = true;
            let questionDetail = await eastErr(questionId);
            questionCache[questionId] = questionDetail;
            this.currentQuestionFlag = false;
            return questionDetail;
        },
        getItemType(item, question) {
            let { userAnswer } = question;
            if (item.rightFlag == 1 && !userAnswer.includes(item.option)) {
                return "leftchoseOne"; // 漏选
            } else if (
                item.rightFlag == 1 &&
                userAnswer.includes(item.option)
            ) {
                return "leftchose"; // 正确
            } else if (
                item.rightFlag == 0 &&
                userAnswer.includes(item.option)
            ) {
                return "worrychose"; // 错误
            }
            return "chose";
        },
        recovery() {
            this.jcjudge = true;
            document.body.style.overflowY = "hidden";
        },
        closejc() {
            // 纠错
            document.body.style.overflow = "auto";
            this.jcjudge = false;
        },
        postjc() {
            // 提交糾錯
            // console.log(this.radio);
            // console.log(this.textarea2);
            // const num = this.num;
            const categoryId = this.currentQuestion.categoryId;
            const chapterId = this.currentQuestion.chapterId;
            const questionId = this.currentQuestion.id;
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
        singlechose(item) {
            console.log(888888888);
            this.currentQuestion.userAnswer = item.option;

            this.anajudge = true;
        },
        doublechose(n) {
            // 多选点击选项
            console.log(1111111111);
            // var num = this.num;
            this.$set(
                this.currentQuestion.answerList[n],
                "checked",
                !this.currentQuestion.answerList[n].checked
            );
        },
        doublepost(n) {
            // var num = this.num;
            var middel = []; // 多选题用户选择的所有答案
            var lists = this.currentQuestion.answerList.filter((item, n) => {
                return item.checked;
            });
            console.log(lists, 5775775777);
            var code = "";
            lists.map((item, n) => {
                middel.push(item.option);
            });
            middel.map(item => {
                code = code + item + "|"; // 将用户答案进行拼接字符串
                console.log(code, 584584584);
            });
            code = code.slice(0, code.length - 1);
            this.currentQuestion.userAnswer = middel;
            if (this.currentQuestion.userAnswer != "") {
                this.anajudge = true;
            }
        },
        jdpost(n) {
            if (!this.textarea2) {
                this.$message({
                    // 消息提示
                    message: "答案不能为空",
                    type: "warning",
                    center: true,
                    duration: 1000,
                    offset: 200
                })
            } else {
                this.currentQuestion.userAnswer = this.textarea2;
                this.anajudge = true;
            }
        },
        last() {
            this.$message({
                message: "这是最后一题",
                type: "success"
            });
        },
        changeana() {
            this.anajudge = !this.anajudge;
        },
        goback() {
            // 返回按钮
            this.state.questionIndexRouteFlag = true; // 标识路由返回
            this.$router.go(-1);
            console.log(this);
        },
        changeNum(type) {
            // if (this.currentQuestionFlag) {
            //     return;
            // }
            // this.num += type ? 1 : -1;
            // if (this.textarea2 !== "" || this.textarea2 !== null) {
            //     this.textarea2 = "";
            // }
            // 下一题
            this.num++;
            // console.log(this.num, "当前题目数");
            // console.log(this.testNum, "题目总数")
            if (this.num >= this.testNum) {
                return false;
            }
            let num = this.num;
            // console.log(this.myErrList[num], 644644444444)
            if (this.ErrList[num].userAnswer == null) {
                this.anajudge = false;
            } else {
                this.anajudge = true;
            }
        },
        collecting(n) {
            // 收藏功能
            // let num = this.num;
            let collecttype = this.currentQuestion.collectFlag;
            let chapterId = this.currentQuestion.chapterId; // 章节id
            let categoryId = this.userInfor.id; // 科目id
            var questionId = this.currentQuestion.id;
            console.log(collecttype, chapterId, categoryId, questionId);
            if (collecttype == 0) {
                this.currentQuestion.collectFlag = 1;
                // this.collect = [...this.collect];
                Collection({
                    categoryId, // 科目id
                    chapterId, // 章节id
                    collectType: 1, // 收藏类型
                    questionId // 题目的id
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
                this.currentQuestion.collectFlag = 0;
                // this.collect = [...this.collect];
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
        }
    }
};
</script>
<style lang="less" scoped>
.main {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    .tcard {
        width: 270px;
        background: #fff;
        box-sizing: border-box;
        padding: 20px;
    }
    .bot {
        box-shadow: 0px -4px 3px #eee;
        // position: fixed;
        bottom: 0px;
        padding: 10px;
        background: red;
        width: 897px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: white;
        height: 50px;
        margin: 60px 0;
        i {
            font-size: 22px;
        }
        div {
            cursor: pointer;
        }
        span {
            margin-left: 10px;
        }
        .b-left {
            display: flex;
            align-items: center;
        }
    }
}
.aBot {
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
        border: 1px solid rgb(21, 189, 145);
        background: white;
    }
    .aBotnot {
        background: white;
        color: #000;
        border: 0;
    }
}
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
}
.stem {
    display: flex;
    padding: 10px 20px 10px 20px;
    background: rgba(238, 242, 239, 1);
    border-radius: 5px;
    margin-top: 20px;
    font-size: 18px;
}
.mainLeft {
    width: 897px;
    margin: 0 auto;
    min-height: 500px;
    position: relative;
}
.questiontype {
    font-weight: 550;
}
.content {
    margin-bottom: 50px;
    background: white;
    padding: 20px;
    border-radius: 5px;
    margin-top: 10px;
}
.chose {
    padding: 1px 6px;
    border: 1px solid #c4c4c4;
    border-radius: 50%;
}
.singlecontent:hover {
    background: #eef2ef;
}
.singlecontent {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 17px;
    padding: 5px 3px;
    span:nth-of-type(2) {
        margin-left: 10px;
    }
}
.anadetails {
    padding: 10px 10px;
    background: white;
    margin-bottom: 50px;
    border-radius: 5px;
    span {
        font-size: 17px;
        color: #45bb81;
    }
}
.rightchose {
    margin-left: 20px;
}
.rightclickchose {
    color: #45bb81;
}
.rightchose2 {
    color: #45bb81;
    font-weight: 600;
    font-size: 20px;
}
.singlecontent:nth-child(n + 2) {
    margin-top: 20px;
}

.zw {
    height: 150px;
}

.worrychose {
    background: #fd4852;
    color: white;
    border: 0;
}
.worrychose1 {
    color: #fd4852;
}
.rightclickchose {
    color: white;
    background: #45bb81;
}
.rightclickchose1 {
    color: #45bb81;
}
.leftchose {
    background: #45bb81;
    color: white;
    border: 0;
}

.leftchoseOne {
    color: #45bb81;
    border: 1px #45bb81 solid;
}

.leftchose2 {
    color: #45bb81;
}
.el-button {
    padding: 15px 10px;
    width: 150px;
}
.btns {
    display: flex;
    justify-content: center;
}
.btn {
    padding: 12px 0;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    width: 150px;
    background: #45bb81;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    width: 100px;
}
.mainRight {
    width: 270px;
}
.mainRight .r-top {
    height: 100px;
    background: #fff;
    font-size: 16px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    display: flex;
    margin-left: 20px;
}
.main_right {
    width: 270px;
    height: 100px;
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
    padding-top: 15px;
}
.scicon i {
    font-size: 25px;
    cursor: pointer;
}

.scicon:hover {
    color: #15bd91;
}
.pageTitle {
    width: 897px;
    height: 50px;
    padding: 12px;
    font-size: 18px;
    background: #fff;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    border-radius: 5px;

}
.userAnswer {
    margin-left: 40px;
}
.collected {
    color: #15bd91;
}
.nullClass {
    width: 24px;
    height: 24px;
    border: 1px solid #c4c4c4;
    border-radius: 50%;
    display: block;
}
.judge0 {
    background: url(../../static/iconimg/错误@2x.png);
    background-position: -3.6px -3.6px;
    width: 24px;
    height: 24px;
    display: block;
}
.judge1 {
    background: url(../../static/iconimg/正确@2x.png);
    background-position: -3.6px -3.6px;
    width: 24px;
    height: 24px;
    display: block;
}
.jc {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    top: 100px;
    left: 0;
    .close {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    img {
        width: 15px;
        height: 15px;
        border-radius: 8px;
        cursor: pointer;
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
    }
    .centers {
        padding: 20px;
        background: white;
        width: 300px;
        border-radius: 10px;
        margin-bottom: 300px;
    }
}
</style>
