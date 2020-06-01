<template>
    <div>
        <!-- 答题模式 -->
        <div
            v-loading="loading"
            class="main0"
            style="width: 100%"
        >
            <div class="stem">
                <span class="questiontype">{{ num+1 }}.[{{ list[num].questionType.name }}]</span>
                <span v-html="list[num].stem" />
            </div>
            <div class="content">
                <!-- 单选和判断-->
                <div v-if="list[num].questionType.type==0||list[num].questionType.type==5">
                    <div v-if="list[num].userAnswer==null">
                        <!-- 用户未做 -->
                        <div
                            v-for="(item,n) in list[num].answerList"
                            :key="n"
                            class="singlecontent"
                            @click="singlechose(n)"
                        >
                            <div>
                                <span class="chose">{{ item.option }}</span>
                            </div>
                            <div class="rightchose">
                                <span v-html="item.content" />
                            </div>
                        </div>
                    </div>
                    <div v-else-if="list[num].userAnswer!=''">
                        <div
                            v-for="(item,n) in list[num].answerList"
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
                                <span v-html="item.content" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 多选和不定选 -->
                <div v-if="list[num].questionType.type==1||list[num].questionType.type==2">
                    <div v-if="list[num].userAnswer==''">
                        <!-- 用户未做 -->
                        <div
                            v-for="(item,n) in list[num].answerList"
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
                                />
                            </div>
                        </div>
                    </div>
                    <!-- 用户已做 -->
                    <div v-else>
                        <div
                            v-for="(item,n) in list[num].answerList"
                            :key="n"
                            class="singlecontent"
                        >
                            <div>
                                <span
                                    class="chose"
                                    :class="[item.rightFlag==1?'leftchose':'',item.rightFlag==0&&item.checked?'worrychose':'']"
                                >{{ item.option }}</span>
                            </div>
                            <div
                                class="rightchose"
                                :class="[item.rightFlag==1?'leftchose2':'',item.rightFlag==0&&item.checked?'worrychose1':'']"
                            >
                                <span v-html="item.content" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            v-if="list[num].userAnswer==''"
                            class="btn"
                            @click="doublepost"
                        >
                            确认答案
                        </div>
                    </div>
                </div>

                <!-- 材料简答题 -->
                <div v-if="list[num].questionType.type==4">
                    <div v-if="list[num].userAnswer==''">
                        <div class="myinput">
                            <el-input
                                v-model="textarea2"
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入内容"
                                value
                            />
                        </div>
                        <div>
                            <div
                                v-if="list[num].userAnswer==''"
                                class="btn"
                                @click="jdpost"
                            >
                                确认答案
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        您的答案:{{ textarea2 }}
                    </div>
                </div>
                <!-- 填空题 -->
                <div v-if="list[num].questionType.type==3">
                    <div v-if="list[num].userAnswer==''">
                        <div class="myinput">
                            <el-input
                                v-model="textarea2"
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入内容"
                            />
                        </div>
                        <div>
                            <div
                                v-if="list[num].userAnswer==''"
                                class="btn"
                                @click="jdpost"
                            >
                                确认答案
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        您的答案:{{ list[num].userAnswer }}
                    </div>
                </div>
            </div>
            <!-- 解析 -->
            <transition name="slide-fade">
                <div
                    v-if="anajudge"
                    class="analysis"
                >
                    <div class="stem">
                        <span>参考答案：</span>
                        <span
                            v-for="(items,m) in list[num].answerList"
                            :key="m"
                            class="rightchose2"
                        >{{ items.option }}</span>
                        <span v-if="items.rightFlag==1"></span>
                    </div>
                    <div class="anadetails">
                        <div>
                            <span>【解析】</span>
                        </div>
                        <div v-text="list[num].analysis" />
                    </div>
                </div>
            </transition>
            <!-- <div class="zw"></div> -->
            <div style="width:100%">
                <div class="bot">
                    <div
                        v-if="num!=0"
                        class="b-left"
                        @click="tolast"
                    >
                        <i class="el-icon-back" />
                        <span>上一题</span>
                    </div>
                    <div
                        v-else
                        class="b-left"
                    >
                        第一题
                    </div>
                    <div
                        class="b-center"
                        @click="changeana"
                    >
                        <i class="el-icon-document-checked" />
                        <span v-if="!anajudge">查看解析</span>
                        <span v-else>收起解析</span>
                    </div>

                    <div
                        v-if="num!=totalnum-1"
                        class="b-right"
                        @click="toNext"
                    >
                        <span>下一题</span>
                        <i class="el-icon-right" />
                    </div>
                    <div
                        v-else
                        class="b-right"
                    >
                        最后一题
                    </div>
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
.stem {
    margin-top: 30px;
    padding: 10px 20px 10px 20px;
    background: rgba(238, 242, 239, 1);
    border-radius: 5px;
}
.main0 {
    min-height: 500px;
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
    //   box-shadow:-2px -2px 1px rgb(150, 145, 145, 0.3) ;
    //   position: absolute;
    bottom: 0;
    padding: 10px;
    background: red;
    width: 500px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    height: 50px;
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
// import axios from "axios"
import { mapState } from "vuex"

export default {
    props: {
        list: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            anajudge: false, // 解析是否展示
            num: 0, // 当前题数
            chapterid: "",
            loading: true,
            singchose: false,
            num1: "",
            // list:'',
            totalnum: "",
            state: this.$store.state,
            textarea2: "",
            timer: 0 // 计时
        }
    },
    watch: {
        "state.nowindex" (nowindex) {
            console.log("success:", nowindex)
            console.log(this)
            this.num = nowindex
        }
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            lmInfor: state => state.lmInfor,
            userInfor: state => state.userInfor,
            nowindex: state => state.nowindex,
            answermiddle: state => state.answermiddle
        })
    },
    created () {
    // this.getRoutedata()
        // var list2 = this.list
        var lists = this.list
        var singledemo = ""
        var doubledemo = ""
        console.log("lists", lists)
        console.log(lists[0])
        // this.totalnum=this.lists.length
        this.totalnum = lists.length
        lists.map((item, n) => {
            if (item.questionType.type == 0 || item.questionType.type == 5) {
                singledemo = item.answerList.filter((items, m) => {
                    return items.rightFlag == 1 // 筛选单选正确答案
                })

                console.log(singledemo[0].option)
                lists[n].rightAnswer = singledemo[0].option

                item.answerList = item.answerList.map(items => {
                    return {
                        ...items,
                        checked: items.option == item.userAnswer
                    }
                })
            } else if (item.questionType.type == 1 || item.questionType.type == 2) { // 多选逻辑
                item.answerList = item.answerList.map((items, m) => {
                    return {
                        ...items,
                        checked: (items.checked = false) // 设置是否选择表示
                    }
                })

                doubledemo = item.answerList.filter(items => {
                    return items.rightFlag == 1
                })
                var code = ""
                doubledemo.map((items1, b) => {
                    code = code + items1.option + "|"
                })
                lists.rightAnswer = code.slice(0, code.length - 1);
            } else if (item.questionType.type == 4) { // 简答题
                item.answerList = item.answerList.map((items, m) => {
                    return {
                        ...items,
                        content: (this.textarea2 =
                            lists.questionList[n].userAnswer)
                    };
                })
                this.textarea2 = item.answerList[0].content
                console.log(this.textarea2, 5)
            }
        })
        this.list = [...lists]

        console.log("change后数据", this.list)
        if (this.list !== "") {
            this.loading = false
        }
    },
    methods: {
        changeana () { // 展示解析
            this.anajudge = !this.anajudge
        },
        singlechose (n) {  // 点击单选并提交记录
            // 单选
            let num = this.num
            // var lists = this.list
            this.list[num].answerList.map((item, m) => {
                item.checked = false
            })
            this.list[num].answerList[n].checked = true
            this.list[num].userAnswer = this.list[
                num
            ].answerList[n].option
            console.log("单选点击后", this.list)
            this.num1 = n // 用户点击答案索引值
            this.singchose = true
            let answer = this.list[num].answerList[n].option
            let userid = this.userInfor.id // 用户ID
            let list = this.list[num]
            let categoryId = list.categoryId // 科目ID
            let chapterId = list.chapterId // 章节ID
            let questionId = list.id // 试题ID
            var right = list.answerList.filter((item, n) => {
                // 获取正确选项
                return item.rightFlag == 1
            })
            console.log("right:", right)
            var type = ""
            if (right[0].option == answer) {
                console.log(right[0].option, answer, "单击处理")
                this.$parent.right(num)
                type = 1; // 答案类型
            } else {
                this.$parent.worry(num)
                type = 0
            }
            this.anajudge = true
            this.record(answer, categoryId, chapterId, userid, questionId, type);
        },

        doublechose (n) { // 多选点击选项
            // var list = this.list
            var num = this.num
            console.log(this)
            this.$set(
                this.list[num].answerList[n],
                "checked",
                !this.list[num].answerList[n].checked
            )
            console.log(this.list[num].answerList[n].checked)
        },
        doublepost () {  // 提交多选题
            //   this.add()
            var num = this.num
            var list = this.list[num]
            var middel = []
            var lists = list.answerList.filter((item, n) => {
                return item.checked
            })
            var code = ""
            lists.map((item, n) => {
                middel.push(item.option)
            })
            console.log(middel)
            middel.map(item => {
                code = code + item + "|"
            })
            code = code.slice(0, code.length - 1)
            console.log(code)
            this.list[num].userAnswer = middel
            if (this.list[num].userAnswer != "") {
                this.anajudge = true
            }
            console.log("提交多选题", 333)
            let answer = code;
            let userid = this.userInfor.id; // 用户ID
            let categoryId = list.categoryId; // 栏目ID
            let chapterId = list.chapterId; // 章节ID
            let questionId = list.id; // 试题ID
            let lastlist = this.list[num];
            // var type = ""
            if (lastlist.rightAnswer == lastlist.userAnswer) {
                type = 1; // 答案类型
            } else {
                type = 0;
            }
            this.record(answer, categoryId, chapterId, userid, questionId, type);
        },

        record(answer, categoryId, chapterId, userid, questionId, type) { // 增加做题记录
            axios({
                url: this.link + "/question/v1/add/question/log",
                headers: {
                    "x-authorize-token": this.token,
                    "web-authorize-flag": "hmzJ/IPcepp9QKtustWPqw=="
                },
                method: "post",
                data: {
                    answer,
                    categoryId,
                    chapterId,
                    memberId: userid,
                    questionId,
                    type
                }
            }).then(res => {
                console.log("增加做题记录接口", res);
            });
        },

        jdpost () {  // 提交简答
            const num = this.num
            // const content = this.textarea2
            this.list[num].userAnswer = this.textarea2
        },
        tolast () { // 上一题
            var num2 = this.num - 1
            this.num = num2

            if (this.list[num2].userAnswer === "") {
                this.anajudge = true
            } else {
                this.anajudge = false
            }
            this.$store.state.nowindex = num2
            this.$parent.collects(num2)
        },
        toNext () { // 下一题
            this.$parent.collect(2)

            if (this.textarea2 != "") {
                this.textarea2 = ""
            }
            this.num1 = 8
            var num = this.num
            var num2 = num + 1

            this.num = this.num + 1
            // console.log("2323232", num2)
            if (this.list[num2].userAnswer == "") {
                this.anajudge = true
            } else {
                this.anajudge = false
            }
            console.log(this.anajudge)
            this.$store.state.nowindex = num2
            this.$parent.collects(num2)
        }
    }
}
</script>
