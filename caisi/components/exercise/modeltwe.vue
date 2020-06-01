<template>
    <div>
        <!-- 背题模式 -->
        <div class="main0">
            <div class="stem">
                <span
                    class="questiontype"
                >{{ num+1 }}.[{{ list.questionList[num].questionType.name }}]</span>

                <span v-html="list.questionList[num].stem" />
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
                <!-- 判断 -->
                <div
                    v-if="list.questionList[num].questionType.type==5"
                >
                    <div>
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
                            :key="n"
                            class="singlecontent"
                        >
                            <div>
                                <span
                                    class="chose"
                                    :class="[item.rightFlag==1?'judge1':'',item.checked&&item.rightFlag!=1?'worrychose':'']"
                                >{{ list.questionList[num].questionType.type==5 ? "" : item.option }}</span>
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
                <div
                    v-if="list.questionList[num].questionType.type==1||list.questionList[num].questionType.type==2"
                >
                    <!-- 用户已做 -->
                    <div>
                        <div
                            v-for="(item,n) in list.questionList[num].answerList"
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

                    <div />
                </div>

                <!-- 填空材料题 -->
                <div
                    v-if="list.questionList[num].questionType.type==3||list.questionList[num].questionType.type==4"
                >
                    <div
                        v-for="(item,n) in list.questionList[num].answerList"
                        :key="n"
                        class="singlecontent"
                    >
                        <!-- <div><span class="chose">{{item.option}}</span></div> -->
                        <div class="rightchose">
                            <span v-html="item.content" />
                        </div>
                    </div>
                </div>
            </div>
            <transition name="slide-fade">
                <div v-if="anajudge" class="analysis">
                    <div class="stem">
                        <span>参考答案：</span>
                        <div v-if="list.questionList[num].questionType.type!=='5'">
                            <span v-for="(items,m) in list.questionList[num].answerList"
                                  :key="m"
                                  class="rightchose2"
                            >{{ items.rightFlag==1? items.option :'' }}</span>
                        </div>
                        <div v-if="list.questionList[num].questionType.type=='5'">
                            <span v-for="(items,m) in list.questionList[num].answerList"
                                  :key="m"
                                  class="rightchose2"
                            >{{ items.rightFlag==='1'? items.content:'' }}</span>
                        </div>
                    </div>
                    <div class="anadetails">
                        <div>
                            <span>【解析】</span>
                        </div>
                        <div v-html="list.questionList[num].analysis" />
                    </div>
                </div>
            </transition>
            <!-- <div class="zw"></div> -->
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
</template>

<style lang="less" scoped>
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
    padding: 10px 20px 10px 20px;
    background: rgba(238, 242, 239, 1);
    border-radius: 5px;
}
.main0 {
    min-height: 500px;
}
.questiontype {
    font-weight: 550;
}
.content {
    background: white;
    padding: 10px 20px 10px 20px;
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
.judge1{
     background:url(../../static/iconimg/正确@2x.png);
         background-position: -1.6px -1.6px;
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
import { mapState } from "vuex";
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
            state: this.$store.state
        };
    },
    watch: {
        "state.nowindex"(nowindex) {
            console.log("success:", nowindex);
            console.log(this);
            this.num = nowindex;
        }
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            lmInfor: state => state.lmInfor,
            userInfor: state => state.userInfor,
            nowindex: state => state.nowindex
        })
    },
    created() {
        var lists = { ...this.list };
        var singledemo = "";
        var doubledemo = "";
        lists.questionList.map((item, n) => {
            if (item.questionType.type == 0 || item.questionType.type == 5) {
                singledemo = item.answerList.filter((items, m) => {
                    return items.rightFlag == 1; // 筛选单选正确答案
                });
                item.answerList = item.answerList.map(items => {
                    // items.checked = items.option !== item.userAnswer;
                    return {
                        ...items,
                        checked: (items.checked = false)
                    };
                });
                lists.questionList[n].rightAnswer = singledemo[0];
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
            }
        });
        console.log("tyuioio", lists);
        this.list = lists;
        console.log("tyuioio", this.list);
        if (this.list.questionList.userAnswer != "") {
            // 判断用户是否已经做过该题目
            this.anajudge = true;
        } else {
            this.anajudge = false;
        }
        console.log("change后数据", this.list);
    },
    methods: {
        changeana() {
            this.anajudge = !this.anajudge;
        },
        singlechose(n) {
            let num = this.num;
            if (this.singlechose === true) {
                return;
            }
            this.list.questionList.map((item, m) => {
                item.answerList[n].checked = true;
            });
            this.list.questionList[num].userAnswer = this.list.questionList[
                num
            ].answerList[n].option;
            console.log("点击后", this.list);
            this.num1 = n; // 用户点击答案索引值
            this.singchose = true;
            console.log(this.list.questionList[num]);
            console.log(this.userInfor);
            let answer = this.list.questionList[num].answerList[n].option;
            // let userid = this.userInfor.id // 用户ID
            let list = this.list.questionList[n];
            // let categoryId = list.categoryId // 栏目ID
            // let chapterId = list.chapterId // 章节ID
            // let questionId = list.id // 试题ID
            var right = list.answerList.filter((item, n) => {
                // 获取正确选项
                return item.rightFlag === 1;
            });
            // var type = ""
            if (right[0].option === answer) {
                type = 1; // 答案类型
            } else {
                type = 0;
            }
            console.log(right);
            console.log(list);
            this.anajudge = true;
            console.log(n);
        },
        doublechose(n) {
            console.log("多选");
            // var list = this.list
            var num = this.num;
            console.log(this);
            this.$set(
                this.list.questionList[num].answerList[n],
                "checked",
                !this.list.questionList[num].answerList[n].checked
            );
            console.log(this.list.questionList[num].answerList[n].checked);
            console.log(num);
        },
        doublepost() {
            var num = this.num;
            var list = this.list.questionList[num];
            var middel = [];

            var lists = list.answerList.filter((item, n) => {
                return item.checked;
            });

            lists.map((item, n) => {
                middel.push(item.option);
            });
            this.list.questionList[num].userAnswer = middel;
            if (this.list.questionList[num].userAnswer != "") {
                this.anajudge = true;
            }
        },
        tolast() {
            this.num = this.num - 1;
        },
        toNext() {
            if (this.textarea2 !== "") {
                this.textarea2 = ""
            }
            this.num = this.num + 1;

            this.anajudge = true;
        }
    }
};
</script>
