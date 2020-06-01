<template>
    <div>
        <!-- 检测模式 -->
        <div v-loading="loading" class="main0">
            <div class="tg">
                <h3>{{ showname }}</h3>
                <div class="progess">
                    <div class="jdt">
                        <el-progress
                            show-text="false"
                            :percentage="personnum1"
                            :stroke-width="10"
                            :text-inside="false"
                        ></el-progress>
                    </div>
                    <div class="havedown">
                        已做
                        <span class="donenum">&nbsp;{{ personnum }}&nbsp;</span>
                        题/共{{ totalnum }}题
                    </div>
                </div>
            </div>
            <div class="stem">
                <span
                    class="questiontype"
                >{{ num+1 }}.[{{ list.questionList[num].questionType.name }}]</span>

                <span v-html="list.questionList[num].stem"></span>
            </div>
            <div class="content">
                <!-- 单选-->
                <div
                    v-if="list.questionList[num].questionType.type==0"
                >
                    <div>
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
                            :key="n"
                            class="singlecontent"
                            @click="singlechose(n)"
                        >
                            <div>
                                <span
                                    class="chose"
                                    :class="[item.checked?'leftchose':'']"
                                >{{ item.option }}</span>
                            </div>
                            <div class="rightchose" :class="[item.checked?'leftchose2':'']">
                                <span v-html="item.content"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 判断 -->
                <div
                    v-if="list.questionList[num].questionType.type==5"
                >
                    <div>
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
                            :key="n"
                            class="singlecontent"
                            @click="singlechose(n)"
                        >
                            <div>
                                <span
                                    class="chose"
                                    :class="[item.checked?'judge1':'']"
                                >{{ list.questionList[num].questionType.type==5 ? "" : item.option }}</span>
                            </div>
                            <div class="rightchose" :class="[item.checked?'leftchose2':'']">
                                <span v-html="item.content"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 多选和不定选 -->
                <div
                    v-if="list.questionList[num].questionType.type==1||list.questionList[num].questionType.type==2"
                >
                    <div>
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
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
                        <div>
                            <div class="btn" @click="doublepost(num)">确认答案</div>
                        </div>
                    </div>
                </div>

                <!-- 材料简答题 -->
                <div v-if="list.questionList[num].questionType.type==4">
                    <div>
                        <div class="myinput">
                            <el-input
                                v-model="list.questionList[num].userAnswer"
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入内容"
                            >
                            </el-input>
                        </div>
                        <div>
                            <div class="btn" @click="jdpost(num)">确认答案</div>
                        </div>
                    </div>
                </div>
                <!-- 填空题 -->
                <div v-if="list.questionList[num].questionType.type==3">
                    <div v-if="list.questionList[num].userAnswer==''">
                        <div class="myinput">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                        <div>
                            <div
                                v-if="list.questionList[num].userAnswer==''"
                                class="btn"
                                @click="jdpost"
                            >
                                确认答案
                            </div>
                        </div>
                    </div>
                    <div v-else>您的答案:{{ list.questionList[num].userAnswer }}</div>
                </div>
            </div>
            <transition name="slide-fade">
                <!-- <div class="analysis" v-if="anajudge">
          <div class="stem">
            <span>参考答案：</span>
            <span
              class="rightchose2"
              v-for="(items,m) in list.questionList[num].answerList"
              v-if="items.rightFlag==1"
            >{{items.option}}</span>
          </div>
          <div class="anadetails">
            <div>
              <span>【解析】</span>
            </div>
            <div v-html="list.questionList[num].analysis"></div>
          </div>
                </div>-->
            </transition>
            <!-- <div class="zw"></div> -->
            <div class="bot">
                <div v-if="num!=0" class="b-left" @click="tolast">
                    <i class="el-icon-back"></i>
                    <span>上一题</span>
                </div>
                <div v-else class="b-left">
                    <span>第一题</span>
                </div>
                <div class="b-center" @click="changeana">
                    <i class="el-icon-document"></i>
                    <span @click="postpaper">交卷</span>
                </div>

                <div class="b-right" @click="toNext">
                    <span>下一题</span>
                    <i class="el-icon-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@color: #15bd91;
.myinput {
    margin-top: 15px;
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
.tg {
    padding: 15px;
    background: white;
    border-radius: 5px;
    margin-bottom: 17px;
    h3 {
        font-size: 17px;
        font-weight: 600;
    }
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
.donenum {
    color: @color;
    font-size: 25px;
}
.stem {
    padding: 10px 20px 10px 20px;
    background: rgba(238, 242, 239, 1);
    border-radius: 5px;
}
.main0 {
    width: 897px;
    min-height: 500px;
    margin-right: 30px;
}
.questiontype {
    font-weight: 550;
}
.content {
    background: white;
    padding: 10px 20px 10px 20px;
    height: auto;
}
.chose {
    text-align: center;
    border: 1px solid #c4c4c4;
    border-radius: 50%;
     width: 28px;
    height: 28px;
    display: block;
    line-height: 30px;
}
.choser{
    color: #fd4852;
}
.choseg{
    color: #45bb81;
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
.bot {
    // position: fixed;
    bottom: 0px;
    padding: 10px;
    background: red;
    width: 897px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    height: 50px;
    box-shadow: 0px -4px 3px #eee;
    margin:60px 0;
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
.judge1{
     background:url(../../static/iconimg/67.png);
         background-position: -1.6px -1.6px;
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
    transform: all 0.6s;
}
</style>

<script>
import { mapState } from "vuex";
import { fetchand, Tstlog } from "../../pages/action";
// import axios from "axios"
export default {
    props: {
        list: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            anajudge: false, // 解析是否展示
            num: 0, // 当前题数
            chapterid: "",
            loading: true,
            singchose: false,
            num1: "",
            state: this.$store.state,
            textarea2: "",
            m: 0,
            totalnum: 0,
            personnum: 0,
            personnum1: 0,
            submitQuestionList: []
        };
    },
    watch: {
        "state.nowindex"(nowindex) {
            this.m = 0;
            this.num = nowindex;
        }
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            lmInfor: state => state.lmInfor,
            userInfor: state => state.userInfor,
            nowindex: state => state.nowindex,
            checked: state => state.checked
        })
    },
    created() {
        this.getRoutedata();
        this.$parent.mathtime();
        var lists = { ...this.list };
        var singledemo = "";
        var doubledemo = "";
        lists.questionList.map((item, n) => {
            if (item.questionType.type == 0 || item.questionType.type == 5) {
                singledemo = item.answerList.filter((items, m) => {
                    return items.rightFlag == 1; // 筛选单选正确答案
                });
                lists.questionList[n].rightAnswer = singledemo[0];
                item.answerList = item.answerList.map(items => {
                    // items.checked = items.option !== item.userAnswer;
                    return {
                        ...items,
                        checked: false
                    };
                });
            } else if (
                item.questionType.type == 1 ||
                item.questionType.type == 2
            ) {
                // 多选逻辑
                doubledemo = item.answerList.filter(items => {
                    return items.rightFlag == 1;
                });
                item.answerList = item.answerList.map((items, m) => {
                    return {
                        ...items,
                        checked: (items.checked = false) // 设置是否选择表示
                    };
                });
                var code = "";
                doubledemo.map((items1, b) => {
                    code = code + items1.option + "|";
                });
                lists.questionList[n].rightAnswer = code.slice(
                    0,
                    code.length - 1
                );
            } else if (item.questionType.type == 4) {
                // 简答题
                item.answerList = item.answerList.map((items, m) => {
                    return {
                        ...items,
                        content: (this.textarea2 =
                            lists.questionList[n].userAnswer)
                    };
                });
                this.textarea2 = item.answerList[0].content;
                console.log(this.textarea2, 5);
            }
        });
        if (this.list.questionList.userAnswer != "" || undefined) {
            // 判断用户是否已经做过该题目
            this.anajudge = true;
        } else {
            this.anajudge = false;
        }
        console.log("change后数据", this.list);
        if (this.list !== "") {
            this.loading = false;
        }
    },
    methods: {
        add() {
            // 已做题目数量
            this.personnum = parseInt(this.personnum) + 1;
            this.personnum1 = (this.personnum / this.totalnum) * 100;
            var percent = this.personnum1;
            this.personnum1 = percent;
        },
        getRoutedata() {
            // 头部做题数
            this.showname = this.$route.query.showname;
            this.chapterid = this.$route.query.id;
            this.totalnum = this.$route.query.total;
            this.personnum = this.$route.query.only;
            var percent = (this.personnum / this.totalnum) * 100;
            this.personnum1 = percent;
            this.personnum1 = 0;
            this.personnum = 0;
            console.log(this.personnum, 1111);
        },
        changeana() {
            this.anajudge = !this.anajudge;
        },
        checkpost(
            answer,
            categoryId,
            chapterId,
            memberExamLogId,
            questionId,
            rightFlag,
            score,
            testPageRuleId
        ) {
            Tstlog({
                answer,
                categoryId,
                chapterId,
                memberExamLogId,
                questionId,
                rightFlag,
                score,
                testPageRuleId
            }).then(data => {
                console.log("检测日志", data);
            })
        },

        postpaper() {
            // 交卷、

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
        singlechose(n) {
            // 单选
            this.m++
            let num = this.num;
            var lists = this.list;
            lists.questionList[num].answerList.map(item => {
                if (
                    item.option ==
                    this.list.questionList[num].answerList[n].option
                ) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            this.list = lists;
            this.num1 = n; // 用户点击答案索引值
            let answer = this.list.questionList[num].answerList[n].option;
            let list = this.list.questionList[n];
            let categoryId = list.categoryId; // 科目ID
            let chapterId = list.chapterId; // 章节ID
            let questionId = this.list.questionList[num].id; // 试题ID
            let memberExamLogId = this.list.memberExamLogId;
            let testPageRuleId = this.$store.state.lmInfor; // 栏目ID
            console.log("父组件", this.list);
            var right = list.answerList.filter((item, n) => {
                // 获取正确选项
                return item.rightFlag == 1;
            });
            var rightFlag = "";
            var score = 0;
            if (right[0].option === answer) {
                rightFlag = 1; // 答案类型
                score = 1;
            } else {
                rightFlag = 0;
                score = 1;
            }

            this.anajudge = true;
            this.checkpost(
                answer,
                categoryId,
                chapterId,
                memberExamLogId,
                questionId,
                rightFlag,
                score,
                testPageRuleId
            );
            console.log(this.m, answer, 1111222);
            if (answer !== "" && this.m == 1) {
                this.add()
                this.$parent.down(num);
            }
        },
        doublechose(n) {
            // 点击多选选项
            var num = this.num;
            this.$set(
                this.list.questionList[num].answerList[n],
                "checked",
                !this.list.questionList[num].answerList[n].checked
            );
            console.log(this.list.questionList[num].answerList[n].checked);
        },
        doublepost(n) {
            console.log(this.list, 8)
            this.list.questionList.map((item, n) => {
                if (
                    item.questionType.type == 1 ||
                item.questionType.type == 2
                ) {
                    let data = item.answerList.filter(items => {
                        return items.checked == true;
                    });
                    this.$store.commit("chosed", data)
                }
            })
            // 多选提交
            var num = this.num; // 当前题目数
            var list = this.list.questionList[num];
            var middel = [];
            var lists = list.answerList.filter((item, n) => {
                return item.checked;
            });
            lists.map((item, n) => {
                middel.push(item.option);
            });
            console.log(middel);
            var code = "";
            middel.map(item => {
                code = code + item + "|";
            });
            var answer = code.slice(0, code.length - 1);
            let answer1 = code;
            let categoryId = list.categoryId; // 科目ID
            let chapterId = list.chapterId; // 章节ID
            let questionId = list.id; // 试题ID
            let testPageRuleId = this.$store.state.lmInfor; // 栏目ID
            let memberExamLogId = this.list.memberExamLogId;
            list.answerList.filter((item, n) => {
                // 获取正确选项
                return item.rightFlag == 1;
            });
            var rightFlag = "";
            var score = 0;
            let lastlist = list;

            console.log(this.list.questionList[num].userAnswer)
            if (this.list.questionList[num].userAnswer !== null) {
                if (lastlist.rightAnswer == answer1) {
                    rightFlag = 1; // 答案类型
                    score = 1;
                } else {
                    rightFlag = 0;
                    score = 1;
                }
            } else {
                this.list.questionList[num].userAnswer = code
                this.add();
                // this.$message({
                //     // 消息提示
                //     message: "请作答",
                //     type: "warning",
                //     center: true,
                //     duration: 1000,
                //     offset: 60
                // });
            }

            this.checkpost(
                answer1,
                categoryId,
                chapterId,
                memberExamLogId,
                questionId,
                rightFlag,
                score,
                testPageRuleId
            );

            if (answer !== "") {
                this.$parent.down(num);
            }
        },
        jdpost(n) {
            // 简答提交
            let num = this.num;
            // this.list.questionList[num].userAnswer = this.textarea2;
            var list = this.list.questionList[num];
            this.textarea2 = this.list.questionList[num].userAnswer;
            let answer = this.list.questionList[num].userAnswer;
            let categoryId = list.categoryId; // 科目ID
            let chapterId = list.chapterId; // 章节ID
            let questionId = list.id; // 试题ID
            let testPageRuleId = this.$store.state.lmInfor; // 栏目ID
            let memberExamLogId = this.list.memberExamLogId;
            console.log(list);

            var rightFlag = "";
            var score = 0;
            console.log(this.list.questionList[num].userAnswer)
            if (this.list.questionList[num].userAnswer !== null) {
                let booleSubmit = false
                this.submitQuestionList.forEach(element => {
                    if (element === questionId) {
                        booleSubmit = true
                    }
                });

                if (!booleSubmit) {
                    this.add();
                    this.$parent.down(num);
                    this.submitQuestionList.push(questionId);
                }

                if (answer !== "") {
                    rightFlag = 0 // 答案类型
                    score = 0;
                } else {
                    rightFlag = 0;
                    score = 0;
                }
            } else {
                this.$message({
                    // 消息提示
                    message: "答案不能为空",
                    type: "warning",
                    center: true,
                    duration: 1000,
                    offset: 200
                });
            }

            this.checkpost(
                // 检测
                answer,
                categoryId,
                chapterId,
                memberExamLogId,
                questionId,
                rightFlag,
                score,
                testPageRuleId
            );
        },

        tolast() {
            // 点击上一题
            this.m = 0
            this.num = this.num - 1;
            var num2 = this.num;
            this.$store.state.nowindex = num2;
            this.$parent.collects(num2);
        },

        toNext() {
            // 点击下一题
            if (this.textarea2 !== "") {
                this.textarea2 = ""
            }
            this.m = 0
            this.num1 = 8;
            var num = this.num;
            this.num = this.num + 1;
            var num2 = num + 1;
            this.$store.state.nowindex = num2;
            this.$parent.collects(num2);
            if (this.list.questionList[num2].userAnswer !== "") {
                this.anajudge = true;
            } else if (this.list.questionList[num2].userAnswer === "") {
                this.anajudge = false;
            }
        }
    }
};
</script>
