<template>
    <div>
        <!-- 查看解析 -->
        <div class="main">
            <div class="main0">
                <div class="stem">
                    <div class="main0">
                        <div class="stem stemone">
                            <span class="questiontype">{{ num+1 }}</span>

                            <span class="hh" v-html="relists[num].stem" />
                        </div>
                        <div class="content">
                            <div class="pp">
                                <!-- 判断-->
                                <div
                                    v-if="relists[num].questionType.type==5"
                                    style="padding:20px;10px;"
                                >
                                    <div v-if="relists[num].userAnswer==''">
                                        <div
                                            v-for="(item,n) in relists[num].answerList"
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
                                    <div v-else-if="relists[num].userAnswer!=''">
                                        <div
                                            v-for="(item,n) in relists[num].answerList"
                                            :key="n"
                                            class="singlecontent"
                                        >
                                            <div
                                                class="chose "
                                                :class="{judge1: item.rightFlag == 1 ,judge0: item.rightFlag == 0 && relists[num].userAnswer == item.option}"
                                            >
                                                <span>{{ relists[num].questionType.type==5 ? "" : item.option }}</span>
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

                                <!-- 单选-->
                                <div v-if="relists[num].questionType.type==0" style="padding:20px;10px;">
                                    <div v-if="relists[num].userAnswer==null">
                                        <div
                                            v-for="(item,n) in relists[num].answerList"
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
                                    <div v-else-if="relists[num].userAnswer!=''">
                                        <div
                                            v-for="(item,n) in relists[num].answerList"
                                            :key="n"
                                            class="singlecontent"
                                        >
                                            <div>
                                                <span
                                                    class="chose"
                                                    :class="[item.rightFlag==1?'leftchose':'',relists[num].userAnswer==item.option&&item.rightFlag!=1?'worrychose':'']"
                                                >{{ item.option }}</span>
                                            </div>
                                            <div
                                                class="rightchose"
                                                :class="[item.rightFlag==1?'leftchose2':'',item.option == item.userAnswer&&item.rightFlag!=1?'worrychose1':'']"
                                            >
                                                <span v-html="item.content"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 多选和不定选 -->
                                <div v-if="relists[num].questionType.type==1||relists[num].questionType.type==2" style="padding:20px;10px;">
                                    <!-- 用户未做 -->
                                    <div v-if="relists[num].userAnswer==null">
                                        <div
                                            v-for="(item,n) in relists[num].answerList"
                                            :key="n"
                                            class="singlecontent"
                                            @click="doublechose(n)"
                                        >
                                            <div>
                                                <span
                                                    class="chose"
                                                    :class="[item.rightFlag==1?'leftchose':'']"
                                                >{{ item.option }}</span>
                                            </div>
                                            <div
                                                class="rightchose"
                                                :class="[item.rightFlag==1?'leftchose2':'']"
                                            >
                                                <span v-html="item.content" />
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div
                                            v-for="(item,n) in relists[num].answerList"
                                            :key="n"
                                            class="singlecontent"
                                        >
                                            <div>
                                                <span
                                                    class="chose"
                                                    :class="getItemType(item,relists[num].userAnswer)"
                                                >{{ item.option }}</span>
                                            </div>
                                            <div
                                                class="rightchose"
                                                :class="getItemTypeText(item,relists[num].userAnswer)"
                                            >
                                                <span v-html="item.content" />
                                            </div>
                                        </div>
                                    </div>

                                    <div />
                                </div>
                                <!-- 填空材料题 -->
                                <div v-if="looklist.questionList[num].questionType.type==3||looklist.questionList[num].questionType.type==4" style="padding:20px;10px;">
                                    <div v-for="(item,n) in relists[num].answerList" :key="n" class="singlecontent">
                                        <div class="rightchose">
                                            <span v-html="item.content" />
                                        </div>
                                    </div>
                                </div>
                                <transition name="slide-fade">
                                    <div v-if="anajudge" class="analysis">
                                        <div class="cank">
                                            <div class="stem">
                                                <span>参考答案：</span>
                                                <div v-if="looklist.questionList[num].questionType.type!=='5'">
                                                    <span v-for="(items,m) in looklist.questionList[num].answerList"
                                                          :key="m"
                                                          class="rightchose2"
                                                    >{{ items.rightFlag==1? items.option :'' }}</span>
                                                </div>
                                                <div v-if="looklist.questionList[num].questionType.type=='5'">
                                                    <span v-for="(items,m) in looklist.questionList[num].answerList"
                                                          :key="m"
                                                          class="rightchose2"
                                                    >{{ items.rightFlag==='1'? items.content:'' }}</span>
                                                </div>
                                            </div>
                                            <div> <span> 您的答案：{{ looklist.questionList[num].userAnswer }}</span></div>
                                        </div>

                                        <div class="anadetails">
                                            <div>
                                                <span>【解析】</span>
                                            </div>
                                            <div v-html="relists[num].analysis" />
                                        </div>
                                    </div>
                                </transition>
                                <div class="bot">
                                    <div v-if="num!=0" class="b-left" @click="tolast">
                                        <i class="el-icon-back" />
                                        <span>上一题</span>
                                    </div>
                                    <div v-else class="b-left">第一题</div>
                                    <div class="b-center" @click="changeana">
                                        <i class="el-icon-document-checked" />
                                        <span v-if="!anajudge">查看解析</span>
                                        <span v-else>收起解析</span>
                                    </div>
                                    <div class="b-right" @click="toNext">
                                        <span>下一题</span>
                                        <i class="el-icon-right" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="top">
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
                            <img v-if="collect[num]==0" src="../../static/img/2.png" alt="">
                            <img v-if="collect[num]==1" src="../../static/img/1.png" alt="">
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
                <!-- 題卡 -->
                <div class="tcard">
                    <div v-for="(item,n) in answerlist" :key="n" class="answerlist ">
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

                                @click="answerChose(items)"
                            >
                                {{ items+1 }}
                            </div>
                        </div>
                    </div>
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
                        <div class="btn" @click="postjc">
                            提交纠错
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { Collection, submiterror } from "../../pages/action";
export default {
    props: {
        looklist: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            anajudge: true, // 解析是否展示
            num: 0, // 当前题数
            chapterid: "",
            loading: true,
            singchose: false,
            state: this.$store.state,
            answerlist: [], // 題卡
            relists: [],
            chexbox: "",
            collect: "",
            jcjudge: false,
            radio: "1",
            textarea2: ""
        }
    },
    watch: {
        "state.nowindex"(nowindex) {
            this.num = nowindex;
            this.collect[nowindex] = 0
            this.collect = [...this.collect];
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
        this.relists = this.looklist.questionList
        let lists = { ...this.looklist };
        var singledemo = "";
        var doubledemo = "";
        lists.questionList.map((item, n) => {
            if (item.questionType.type == 0 || item.questionType.type == 5) { // 單選
                singledemo = item.answerList.filter((items, m) => {
                    return items.rightFlag == 1; // 筛选单选正确答案
                });
                lists.questionList[n].rightAnswer = singledemo[0];
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
                        checked: (items.checked = false)
                    };
                });
                doubledemo = item.answerList.filter(items => {
                    return items.rightFlag == 1
                });
                let code = [];
                doubledemo.map((items1, b) => {
                    code = code + items1.option + "|";
                });
                lists.questionList[n].rightAnswer = code.slice(
                    0,
                    code.length
                );
                this.chexbox = code
                this.$store.commit("chosed", doubledemo)
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
        })

        this.relists.forEach(questionItem => {
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
            console.log(questionItem.answerList, 111)
        });
        var collect = [];
        this.looklist.questionList.map(item => {
            if (item.collectFlag == null || "") {
                item.collectFlag = 0
            }
            collect.push(item.collectFlag);
        });
        this.collect = collect;

        this.card()
    },
    methods: {
        goback() {
            this.$emit("back");
        },
        getItemType(item, userAnswer) {
            let userAnswerCode = userAnswer.slice(0, userAnswer.length - 1);
            let userAnswerList = userAnswerCode.split("|");
            if (item.rightFlag == 1 && !userAnswerList.includes(item.option)) {
                return "leftchoseOne"; // 漏选
            } else if (
                item.rightFlag == 1 &&
                userAnswerList.includes(item.option)
            ) {
                return "leftchose"; // 正确
            } else if (
                item.rightFlag == 0 &&
                userAnswerList.includes(item.option)
            ) {
                return "worrychose"; // 错误
            }
            return "chose";
        },
        getItemTypeText(item, userAnswer) {
            let userAnswerCode = userAnswer.slice(0, userAnswer.length - 1);
            let userAnswerList = userAnswerCode.split("|");
            if (item.rightFlag == 1 && !userAnswerList.includes(item.option)) {
                return "leftchoseTow"; // 漏选
            } else if (
                item.rightFlag == 1 &&
                userAnswerList.includes(item.option)
            ) {
                return "leftchose2"; // 正确
            } else if (
                item.rightFlag == 0 &&
                userAnswerList.includes(item.option)
            ) {
                return "worrychose1"; // 错误
            }
            return "chose12";
        },
        changeana() {
            this.anajudge = !this.anajudge;
        },
        tolast() {
            this.num = this.num - 1;
            this.anajudge = true;
        },
        toNext() {
            this.num = this.num + 1;
            this.anajudge = true;
            console.log(this.looklist.questionList[this.num].userAnswer)
        },
        card() {
            let middle = []
            // var answermiddle = []; // 答题判断表
            var list = this.looklist;
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
            console.log(this.answerlist, 1122)
        },
        answerChose(items) {
            this.$store.state.nowindex = items;
        },
        collects(num) {
            // 判断收藏
            this.num = num;
        },
        collecting(n) {
        // 收藏功能
            var num = this.num;
            console.log()
            var categoryId = this.looklist.questionList[num].categoryId;
            var chapterId = this.looklist.questionList[num].chapterId;
            var questionId = this.looklist.questionList[num].id;
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
                })
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
                })
            }
        },
        postjc() { // 提交糾錯
            console.log(this.radio);
            console.log(this.textarea2);
            const num = this.num;
            const categoryId = this.looklist.questionList[num].categoryId;
            const chapterId = this.looklist.questionList[num].chapterId;
            const questionId = this.looklist.questionList[num].id;
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
            })
        },
        recovery() {
            this.jcjudge = true;
            document.body.style.overflowY = "hidden";
        },
        closejc() { // 关闭纠错
            document.body.style.overflow = "auto";
            this.jcjudge = false;
        }
    }

};
</script>
<style lang="less" scoped>
.stemone{
    padding: 10px;
}
.hh{
        line-height: 40px;
}
.cank{
    display: flex;
    align-items: baseline;
    background: #eee;
    line-height: 64px;
    padding-left: 30px;
    flex-direction: column;
}
.main{
    display: flex;
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
    .tcard{
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
        border: 1px solid rgb(21, 189, 145);
        background: white;
    }
    .aBotnot {
        background: white;
        color: #000;
        border: 0;
    }
}
.r-top {
    margin-bottom: 18px;
    width: 270px;
    height: 100px;
    padding: 10px;
    background: white;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    border-radius:10px;
}
.icon {
    display: flex;
    justify-content: center;
    img{
        width: 30px;
        height:30px;
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
    // padding: 10px ;
    background: rgba(238, 242, 239, 1);
    border-radius: 5px;
    display: flex;
}
.main0 {
    width: 897px;
    margin: 0 auto;
    min-height: 500px;
    // margin-right: 30px;
}
.questiontype {
    margin-left: 20px;
    font-weight: 550;
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.content {
    background: white;
    // padding: 10px 20px 10px 20px;
    min-height: 500px;
}
.chose {
    padding: 1px 6px;
    border: 1px solid #c4c4c4;
    border-radius: 50%;
    width: 28px;
    height: 28px;
}
.chose12{
    display: block;
    line-height: 28px;
    text-align: center;
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
.leftchoseTow {
    color: #45bb81;
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
.judge0{
    background:url(../../static/iconimg/错误@2x.png);
        background-position: -1.6px -1.6px;
}
.judge1{
     background:url(../../static/iconimg/正确@2x.png);
         background-position: -1.6px -1.6px;
}
.judge{
    width: 30px;
    height: 30px;
    display: block;
    line-height: 30px;
}
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
    left:0;
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
</style>
