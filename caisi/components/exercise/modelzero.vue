<template>
    <div>
        <!-- 答题模式 -->
        <div v-if="list.questionList.length!==0" v-loading="loading" class="main0">
            <div class="tg">
                <h3>{{ showname }}</h3>
                <div class="progess">
                    <div class="jdt">
                        <el-progress
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
                <!-- 判断-->
                <div v-if="list.questionList[num].questionType.type==5">
                    <div v-if="list.questionList[num].userAnswer==''">
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
                            :key="n"
                            class="singlecontent"
                            @click="singlechose(n)"
                        >
                            <div>
                                <span class="chose">{{ item.option!==''?"":item.option }}</span>
                            </div>
                            <div class="rightchose">
                                <span v-html="item.content"></span>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="list.questionList[num].userAnswer!=''">
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
                            :key="n"
                            class="singlecontent"
                        >
                            <!-- <div
                                class="chose "
                                :class="{leftchose: item.rightFlag == 1 && list.questionList[num].userAnswer == item.option,worrychose: item.rightFlag == 0 && list.questionList[num].userAnswer == item.option}"
                            >
                                <span>{{ list.questionList[num].questionType.type==5 ? "" : item.option }}</span>
                            </div>-->
                            <div
                                class="chose"
                                :class="[item.rightFlag==1?'judge1':'',item.checked&&item.rightFlag!=1?'judge0':'']"
                            >
                                <span>{{ list.questionList[num].questionType.type==5 ? "" : item.option }}</span>
                            </div>
                            <!-- <div
                                class="rightchose"
                                :class="{leftchose2: item.rightFlag == 1 && list.questionList[num].userAnswer == item.option,worrychose1: item.rightFlag == 0 && list.questionList[num].userAnswer == item.option}"
                            >
                                <span v-html="item.content"></span>
                            </div>-->
                            <div
                                class="rightchose"
                                :class="[item.rightFlag==1?'leftchose2':'',item.checked&&item.rightFlag!=1?'worrychose1':'']"
                            >
                                <span v-html="item.content"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 单选 -->
                <div v-if="list.questionList[num].questionType.type==0">
                    <div v-if="list.questionList[num].userAnswer==''">
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
                            :key="n"
                            class="singlecontent"
                            @click="singlechose(n)"
                        >
                            <div>
                                <span class="chose">{{ item.option }}</span>
                            </div>
                            <div class="rightchose">
                                <span v-html="item.content"></span>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="list.questionList[num].userAnswer!=''">
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
                            :key="n"
                            class="singlecontent"
                        >
                            <div>
                                <span
                                    class="chose"
                                    :class="[item.rightFlag==1?'leftchose':'',item.checked&&item.rightFlag!=1?'worrychose':'']"
                                >{{ item.option }}</span>
                            </div>
                            <div
                                class="rightchose"
                                :class="[item.rightFlag==1?'leftchose2':'',item.checked&&item.rightFlag!=1?'worrychose1':'']"
                            >
                                <span v-html="item.content"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 多选和不定选 -->
                <div
                    v-if="list.questionList[num].questionType.type==1||list.questionList[num].questionType.type==2"
                >
                    <div v-if="list.questionList[num].userAnswer==''">
                        <!-- 用户未做 -->
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
                    </div>
                    <!-- 用户已做 -->
                    <div v-else>
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
                            :key="n"
                            class="singlecontent"
                        >
                            <div>
                                <span
                                    class="chose"
                                    :class="getItemType(item,list.questionList[num])"
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
                            v-if="list.questionList[num].userAnswer==''"
                            class="btn"
                            @click="doublepost(num)"
                        >
                            确认答案
                        </div>
                    </div>
                </div>

                <!-- 材料简答题 -->
                <div v-if="list.questionList[num].questionType.type==4">
                    <div v-if="!(list.questionList[num] || {}).submit">
                        <div class="myinput">
                            <el-input
                                v-model="list.questionList[num].userAnswer"
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入内容"
                                value="answer"
                            ></el-input>
                        </div>
                        <div>
                            <div class="btn" @click="jdpost(list.questionList[num],num)">确认答案</div>
                        </div>
                    </div>
                    <div v-else>您的答案:{{ list.questionList[num].userAnswer }}</div>
                </div>
                <!-- 填空题 -->
                <div v-if="list.questionList[num].questionType.type==3">
                    <div v-if="list.questionList[num].userAnswer==''">
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
                                v-if="list.questionList[num].userAnswer==''"
                                class="btn"
                                @click="jdpost(list.questionList[num],num)"
                            >
                                确认答案
                            </div>
                        </div>
                    </div>
                    <div v-else>您的答案:{{ list.questionList[num].userAnswer }}</div>
                </div>
            </div>
            <!-- 解析 -->
            <transition name="slide-fade">
                <div v-if="anajudge" class="analysis">
                    <div class="stem">
                        <span>参考答案：</span>
                        <!-- <span style="color:red">主观题系统不做评判，请根据下列参考答案自行评判！</span> -->
                        <div v-if="list.questionList[num].questionType.type!=='5'">
                            <span
                                v-for="(items,m) in list.questionList[num].answerList"
                                :key="m"
                                class="rightchose2"
                            >{{ items.rightFlag==1? items.option :'' }}</span>
                        </div>
                        <div v-if="list.questionList[num].questionType.type=='5'">
                            <span
                                v-for="(items,m) in list.questionList[num].answerList"
                                :key="m"
                                class="rightchose2"
                            >{{ items.rightFlag==='1'? items.content:'' }}</span>
                        </div>
                    </div>
                    <div class="anadetails">
                        <div>
                            <span>【解析】</span>
                        </div>
                        <div v-html="list.questionList[num].analysis"></div>
                    </div>
                </div>
            </transition>
            <div class="bot">
                <div v-if="num!=0" class="b-left" @click="tolast">
                    <i class="el-icon-back"></i>
                    <span>上一题</span>
                </div>
                <div v-else class="b-left">第一题</div>
                <div class="b-center" @click="changeana">
                    <i class="el-icon-document-checked"></i>
                    <span v-if="!anajudge">查看解析</span>
                    <span v-else>收起解析</span>
                </div>

                <div v-if="num!=totalnum-1" class="b-right" @click="toNext">
                    <span>下一题</span>
                    <i class="el-icon-right"></i>
                </div>
                <div v-else class="b-right">最后一题</div>
            </div>
        </div>
        <div v-else class="main0">
            <!-- <img src="../../resouce/details/detailadd.png"> -->
            <div class="cen">
                暂没试题更新，请耐心等待哦~
                <button @click="back">返回</button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@color: #15bd91;
.cen{
    text-align: center;
    button{
        width: 100px;
        line-height: 30px;
        background: #15bd91;
        color: #fff;
        outline: none;
        border-radius: 5px;
        border: 1px solid #fff;
        cursor: pointer;
    }
}
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
.stem {
    margin-top: 30px;
    padding: 10px 20px 10px 20px;
    background: rgba(238, 242, 239, 1);
    border-radius: 5px;
}
.main0 {
    min-height: 500px;
    width: 897px;
    // text-align: center;
}
.tg {
    padding: 15px;
    background: white;
    border-radius: 5px;
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
.judge0 {
    background: url(../../static/iconimg/错误@2x.png);
    background-position: -1.6px -1.6px;
}
.judge1 {
    background: url(../../static/iconimg/正确@2x.png);
    background-position: -1.6px -1.6px;
}
.judge {
    width: 30px;
    height: 30px;
    display: block;
    line-height: 30px;
}
.donenum {
    color: @color;
    font-size: 25px;
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
    line-height: 28px;
}
.choser {
    color: #fd4852;
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
.leftchoseOne {
    color: #45bb81;
    border: 1px #45bb81 solid;
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
    box-shadow: 0px -4px 3px #eee;
    // position: fixed;
    bottom: 0;
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
    border: 0;
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
}
</style>

<script>
import { mapState } from "vuex";
import { setInterval } from "timers";
import { Dorecord } from "../../pages/action";
export default {
    // 获得list
    props: {
        list: {
            type: Object
            // required: true
        },
        back1: {
            type: String
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
            timer: 0, // 计时
            showname: "",
            totalnum: 0,
            personnum: 0,
            personnum1: 0
        };
    },
    watch: {
        "state.nowindex"(nowindex) {
            if (this.list.questionList[nowindex].userAnswer === "") {
                this.anajudge = false;
            } else {
                this.anajudge = true;
            }
            // this.anajudge = true;
            this.num = nowindex;
        }
    },
    computed: {
        ...mapState({
            link: state => state.link,
            lmInfor: state => state.lmInfor,
            userInfor: state => state.userInfor,
            nowindex: state => state.nowindex,
            answermiddle: state => state.answermiddle
        })
    },
    mounted() {
        this.getRoutedata();
        var singledemo = "";
        var doubledemo = "";
        this.list.questionList = this.list.questionList.map((item, n) => {
            if (item.questionType.type == 0 || item.questionType.type == 5) {
                singledemo = item.answerList.filter((items, m) => {
                    return items.rightFlag == 1; // 筛选单选正确答案
                });
                this.list.questionList[n].rightAnswer = singledemo[0];
                item.answerList = item.answerList.map(items => {
                    return {
                        ...items,
                        checked: items.option == item.userAnswer
                    };
                });
            } else if (
                item.questionType.type == 1 ||
                item.questionType.type == 2
            ) {
                // 多选逻辑
                item.answerList = item.answerList.map((items, m) => {
                    return {
                        ...items,
                        checked: (items.checked = false) // 设置是否选择表示
                    };
                });

                doubledemo = item.answerList.filter(items => {
                    return items.rightFlag == 1;
                });
                var code = "";
                doubledemo.map((items1, b) => {
                    code = code + items1.option + "|";
                });
                this.list.questionList[n].rightAnswer = code.slice(
                    0,
                    code.length - 1
                );
            } else if (item.questionType.type == 4) {
                // 简答题
                item.answerList = item.answerList.map((items, m) => {
                    return {
                        ...items
                    };
                });
                item.submit = Boolean(item.userAnswer);
                this.anajudge |= Boolean(item.userAnswer);
            }
            return { ...item };
        });
        let num = this.num;
        if (
            this.list.questionList[num] !== undefined &&
            this.list.questionList[num].userAnswer != ""
        ) {
            console.log(this.anajudge);
            // 判断用户是否已经做过该题目
            this.anajudge = true;
        } else {
            this.anajudge = false;
        }
        this.time();
        console.log("change后数据", this.list);
        this.num = this.list.index;
        if (this.list != "") {
            this.loading = false;
        }
    },
    methods: {
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
        getRoutedata() {
            // 获取头部做题数
            console.log(this.$route.query);
            this.showname = this.$route.query.showname;
            this.chapterid = this.$route.query.id;
            this.totalnum = this.$route.query.total;
            this.personnum = this.$route.query.only;
            var percent = (this.personnum / this.totalnum) * 100;
            if (isNaN(percent)) {
                percent = 0;
                this.personnum1 = percent;
            } else {
                this.personnum1 = percent;
            }
        },
        time() {
            // 计时
            var a = 0;
            setInterval(() => {
                a = a + 1;
                this.timer = a;
            }, 1000);
        },
        changeana() {
            // 展示解析
            this.anajudge = !this.anajudge;
            console.log(this.anajudge, 789)
        },
        add() {
            // 已做题目数量
            this.personnum = parseInt(this.personnum) + 1;
            var percent = (this.personnum / this.totalnum) * 100;
            this.personnum1 = percent;
        },
        singlechose(n) {
            // 点击单选并提交记录
            this.add();
            // 单选
            let num = this.num;
            this.list.questionList[num].answerList.map((item, m) => {
                item.checked = false;
            });
            this.list.questionList[num].answerList[n].checked = true;
            this.list.questionList[num].userAnswer = this.list.questionList[
                num
            ].answerList[n].option;
            this.num1 = n; // 用户点击答案索引值
            this.singchose = true;
            let answer = this.list.questionList[num].answerList[n].option;
            let userid = this.userInfor.id; // 用户ID
            let list = this.list.questionList[num];
            let categoryId = list.categoryId; // 科目ID
            let chapterId = list.chapterId; // 章节ID
            let questionId = list.id; // 试题ID
            var right = list.answerList.filter((item, n) => {
                // 获取正确选项
                return item.rightFlag == 1;
            });
            var type = "";
            if (right[0].option == answer) {
                this.$parent.right(num);
                type = 1; // 答案类型
            } else {
                this.$parent.worry(num);
                type = 0;
            }
            this.record(
                answer,
                categoryId,
                chapterId,
                userid,
                questionId,
                type
            );
            if (this.list.questionList[num].userAnswer !== "") {
                this.anajudge = true;
            } else {
                this.anajudge = false;
            }
        },
        doublechose(n) {
            // 多选点击选项
            // var list = this.list;
            var num = this.num;
            this.$set(
                this.list.questionList[num].answerList[n],
                "checked",
                !this.list.questionList[num].answerList[n].checked
            );
        },
        doublepost(n) {
            // 提交多选题
            var num = this.num;
            console.log(this.list.questionList[n].userAnswer)
            var list = this.list.questionList[num];
            var middel = [];
            var lists = list.answerList.filter((item, n) => {
                return item.checked;
            });
            var code = "";
            lists.map((item, n) => {
                middel.push(item.option);
            });
            middel.map(item => {
                code = code + item + "|";
            });
            code = code.slice(0, code.length - 1);
            this.list.questionList[num].userAnswer = middel;
            if (this.list.questionList[num].userAnswer != "") {
                this.anajudge = true;
            } else {
                this.anajudge = false;
            }

            let answer = code;
            let userid = this.userInfor.id; // 用户ID
            let categoryId = list.categoryId; // 栏目ID
            let chapterId = list.chapterId; // 章节ID
            let questionId = list.id; // 试题ID
            let lastlist = this.list.questionList[num];
            let type = "";
            if (this.list.questionList[n].userAnswer !== "" && this.list.questionList[n].userAnswer.length !== 0) {
                this.add();
                if (lastlist.rightAnswer == answer) {
                    this.$parent.right(num);
                    type = 1; // 答案类型
                } else {
                    this.$parent.worry(num);
                    type = 0;
                }
            } else {
                this.$message({
                    // 消息提示
                    message: "请作答",
                    type: "warning",
                    center: true,
                    duration: 1000,
                    offset: 60
                });
            }

            this.record(
                answer,
                categoryId,
                chapterId,
                userid,
                questionId,
                type
            );
        },

        record(answer, categoryId, chapterId, userid, questionId, type) {
            // 增加做题记录
            Dorecord({
                answer,
                categoryId,
                chapterId,
                memberId: userid,
                questionId,
                type
            }).then(data => {
                console.log("增加做题记录接口", data);
            });
        },

        jdpost(question, num) {
            console.log("question::", question);
            // 提交简答
            if (question.userAnswer) {
                question.submit = true;
                this.anajudge = true;
            } else {
                this.$message({
                    // 消息提示
                    message: "答案不能为空",
                    type: "warning",
                    center: true,
                    duration: 1000,
                    offset: 200
                });
                return;
            }
            let answer = question.userAnswer;
            let userid = this.userInfor.id; // 用户ID
            let categoryId = question.categoryId; // 栏目ID
            let chapterId = question.chapterId; // 章节ID
            let questionId = question.id; // 试题ID
            let type = "";
            this.$parent.worry(num)
            type = 0
            this.add();
            this.record(
                answer,
                categoryId,
                chapterId,
                userid,
                questionId,
                type
            );
        },
        tolast() {
            // 上一题
            if (this.textarea2 !== "") {
                this.textarea2 = "";
            }
            var num2 = this.num - 1;
            // var num2=this.num-1
            if (this.list.questionList[num2].userAnswer === "") {
                this.anajudge = false;
            } else {
                this.anajudge = true;
            }
            this.$store.state.nowindex = num2;
            this.$parent.collects(num2);
        },
        toNext() {
            // 下一题
            if (this.textarea2 !== "") {
                this.textarea2 = "";
            }
            this.num1 = 8;
            var num = this.num;
            var num2 = num + 1;
            this.num = this.num + 1;
            if (this.list.questionList[num2].userAnswer == "") {
                this.anajudge = false;
            } else {
                this.anajudge = true;
            }
            this.$store.state.nowindex = num2;
        },
        back() {
            console.log(this.back1, 190)
            this.state.questionIndexRouteFlag = true; // 标识路由返回
            this.state.questionIndexActiveIndex = this.back1;
            this.$router.go(-1);
        }
    }
};
</script>
