<template>
    <!-- 我的错题回顾/重做 -->
    <div>
        <div
            v-loading.fullscreen.lock="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <!-- 错题重做和错题收藏 -->
            <div v-if="flag" class="main">
                <div class="stem">
                    <!-- 错题回看部分 -->
                    <div v-if="ShowType==0" class="mainLeft">
                        <div class="pageTitle">我的错题回顾</div>
                        <div class="stem">
                            <span class="questiontype">{{ num+1 }}.</span>
                            <span v-html="myErrList[num].stem" />
                        </div>
                        <div class="content">
                            <!-- 单选和判断-->
                            <div
                                v-if="myErrList[num].questionType.type==0"
                            >
                                <div v-if="myErrList[num].userAnswer==null">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
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
                                <div v-else-if="myErrList[num].userAnswer!=''">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="chose"
                                                :class="[item.rightFlag==1?'leftchose':'',myErrList[num].userAnswer==item.option&&item.rightFlag!=1?'worrychose':'']"
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

                            <!-- 判断 -->
                            <div
                                v-if="myErrList[num].questionType.type==5"
                            >
                                <div v-if="myErrList[num].userAnswer==null || myErrList[num].userAnswer==''">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                        @click="singlechose(n)"
                                    >
                                        <div>
                                            <span class="nullClass"></span>
                                        </div>
                                        <div class="rightchose">
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="myErrList[num].userAnswer!=''">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="nullClass"
                                                :class="{judge1: item.rightFlag == 1,
                                                         judge0: item.rightFlag == 0 && myErrList[num].userAnswer == item.option}"
                                            ></span>
                                        </div>
                                        <div
                                            class="rightchose"
                                            :class="{leftchose2: item.rightFlag == 1,
                                                     worrychose1: item.rightFlag == 0 && myErrList[num].userAnswer == item.option}"
                                        >
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 多选和不定选 -->
                            <div
                                v-if="myErrList[num].questionType.type==1||myErrList[num].questionType.type==2"
                            >
                                <!-- 用户未做 -->
                                <div v-if="myErrList[num].userAnswer==null">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                        @click="doublechose(n)"
                                    >
                                        <div>
                                            <span
                                                class="chose"
                                                :class="[item.rightFlag==1?'leftchose':'',item.rightFlag==0&&!item.checked?'worrychose':'']"
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

                                <div v-else>
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="chose"
                                                :class="[item.rightFlag==1?'leftchose':'',myErrList[num].userAnswer!==myErrList[num].rightAnswer&&item.rightFlag==0?'worrychose':'']"
                                            >{{ item.option }}</span>
                                        </div>
                                        <div
                                            class="rightchose"
                                            :class="[item.rightFlag==1?'leftchose2':'',myErrList[num].userAnswer!==myErrList[num].rightAnswer&&item.rightFlag==0?'worrychose1':'']"
                                        >
                                            <span v-html="item.content" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 材料简答题 -->
                            <div v-if="myErrList[num].questionType.type==4">
                                <div>您的答案:{{ myErrList[num].userAnswer }}</div>
                            </div>
                            <!-- 填空题 -->
                            <div
                                v-if="myErrList[num].questionType.type==3"
                            >
                                <div
                                    v-for="(item,n) in myErrList[num].answerList"
                                    :key="n"
                                    class="singlecontent"
                                >
                                    <div>
                                        <span class="chose">{{ item.option }}</span>
                                    </div>
                                    <div class="rightchose">
                                        <span v-html="item.content" />
                                    </div>
                                </div>
                            </div>
                            <transition name="slide-fade">
                                <div class="analysis">
                                    <div class="stem">
                                        <span>参考答案：</span>
                                        <!-- <span
                                        v-for="(items,m) in myErrList[num].answerList"
                                        :key="m"
                                        class="rightchose2"
                                    >{{ items.rightFlag==1? items.option : "" }}</span>
                                    <span class="userAnswer">您的答案：{{ myErrList[num].questionType.type == 5?"" : myErrList[num].userAnswer }}</span> -->
                                        <div
                                            v-if="myErrList[num].questionType.type!=='5'"
                                        >
                                            <span
                                                v-for="(items,m) in myErrList[num].answerList"
                                                :key="m"
                                                class="rightchose2"
                                            >{{ items.rightFlag==1? items.option :'' }}</span>
                                        </div>
                                        <div v-if="myErrList[num].questionType.type=='5'">
                                            <span
                                                v-for="(items,m) in myErrList[num].answerList"
                                                :key="m"
                                                class="rightchose2"
                                            >{{ items.rightFlag==='1'? items.content:'' }}</span>
                                        </div>
                                    </div>
                                    <div v-if="anajudge" class="anadetails">
                                        <div>
                                            <span>【解析】</span>
                                        </div>
                                        <div v-html="myErrList[num].analysis" />
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="bot">
                            <div v-if="num!==0" class="b-left" @click="prev">
                                <i class="el-icon-back" />
                                <span>上一题</span>
                            </div>
                            <div v-else class="b-left">第一题</div>
                            <div class="b-center" @click="changeana">
                                <i class="el-icon-document-checked" />
                                <span v-if="anajudge">收起解析</span>
                                <span v-else>查看解析</span>
                            </div>
                            <div v-if="num!==testNum-1" class="b-right">
                                <span @click="next1">下一题</span>
                                <i class="el-icon-right" />
                            </div>
                            <div v-else class="b-right" @click="last">最后一题</div>
                        </div>
                    </div>
                    <!-- 错题重做部分 -->
                    <div v-else class="mainLeft">
                        <div class="pageTitle">我的错题重做</div>
                        <div class="stem">
                            <span class="questiontype">{{ num+1 }}.</span>
                            <span v-html="myErrList[num].stem" />
                        </div>
                        <div class="content">
                            <!-- 单选和判断-->
                            <div
                                v-if="myErrList[num].questionType.type==0"
                            >
                                <div v-if="myErrList[num].userAnswer==null">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
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
                                <div v-else-if="myErrList[num].userAnswer!=''">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="chose"
                                                :class="[item.rightFlag==1?'leftchose':'',item.checked?'worrychose':'']"
                                            >{{ item.option }}</span>
                                        </div>
                                        <div
                                            class="rightchose"
                                            :class="[item.rightFlag==1?'leftchose2':'',item.checked?'worrychose1':'']"
                                        >
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 判断 -->
                            <div
                                v-if="myErrList[num].questionType.type==5"
                            >
                                <div v-if="myErrList[num].userAnswer==null || myErrList[num].userAnswer=='' ">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                        @click="singlechose(n)"
                                    >
                                        <div>
                                            <span class="nullClass"></span>
                                        </div>
                                        <div class="rightchose">
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="myErrList[num].userAnswer!=''">
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="nullClass"
                                                :class="{judge1: item.rightFlag == 1,
                                                         judge0: item.rightFlag == 0 && myErrList[num].userAnswer == item.option}"
                                            ></span>
                                        </div>
                                        <div
                                            class="rightchose"
                                            :class="{leftchose2: item.rightFlag == 1,
                                                     worrychose1: item.rightFlag == 0 && myErrList[num].userAnswer == item.option}"
                                        >
                                            <span v-html="item.content"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 多选和不定选 -->
                            <div
                                v-if="myErrList[num].questionType.type==1||myErrList[num].questionType.type==2"
                            >
                                <div v-if="myErrList[num].userAnswer==null">
                                    <!-- 用户未做 -->
                                    <div
                                        v-for="(item,n) in myErrList[num].answerList"
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
                                        v-for="(item,n) in myErrList[num].answerList"
                                        :key="n"
                                        class="singlecontent"
                                    >
                                        <div>
                                            <span
                                                class="chose"
                                                :class="getItemType(item,myErrList[num])"
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
                                        v-if="myErrList[num].userAnswer==null"
                                        class="btn"
                                        @click="doublepost(num)"
                                    >
                                        确认答案
                                    </div>
                                </div>
                            </div>

                            <!-- 材料简答题 -->
                            <div v-if="myErrList[num].questionType.type==4">
                                <div v-if="!(myErrList[num] || {}).submit">
                                    <div class="myinput">
                                        <el-input
                                            v-model="myErrList[num].userAnswer"
                                            type="textarea"
                                            :autosize="{ minRows: 4, maxRows: 6}"
                                            placeholder="请作答"
                                            value="answer"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <div
                                            class="btn"
                                            @click="jdpost(myErrList[num])"
                                        >
                                            确认答案
                                        </div>
                                    </div>
                                </div>
                                <div v-else>您的答案:{{ myErrList[num].userAnswer }}</div>
                            </div>
                            <!-- 填空题 -->
                            <div v-if="myErrList[num].questionType.type==3">
                                <div v-if="myErrList[num].userAnswer==''">
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
                                            v-if="myErrList[num].userAnswer==''"
                                            class="btn"
                                            @click="jdpost(num)"
                                        >
                                            确认答案
                                        </div>
                                    </div>
                                </div>
                                <div v-else>您的答案:{{ myErrList[num].userAnswer }}</div>
                            </div>
                        </div>
                        <!-- 解析 -->
                        <transition name="slide-fade">
                            <div v-if="anajudge" class="analysis">
                                <div class="stem">
                                    <span>参考答案：</span>
                                    <!-- <span style="color:red">主观题系统不做评判，请根据下列参考答案自行评判！</span> -->
                                    <!-- <span
                                    v-for="(items,m) in myErrList[num].answerList"
                                    :key="m"
                                    class="rightchose2"
                                >{{ items.rightFlag==1? items.option :"" }}</span> -->
                                    <div
                                        v-if="myErrList[num].questionType.type!=='5'"
                                    >
                                        <span
                                            v-for="(items,m) in myErrList[num].answerList"
                                            :key="m"
                                            class="rightchose2"
                                        >{{ items.rightFlag==1? items.option :'' }}</span>
                                    </div>
                                    <div v-if="myErrList[num].questionType.type=='5'">
                                        <span
                                            v-for="(items,m) in myErrList[num].answerList"
                                            :key="m"
                                            class="rightchose2"
                                        >{{ items.rightFlag==='1'? items.content:'' }}</span>
                                    </div>
                                </div>
                                <div class="anadetails">
                                    <div>
                                        <span>【解析】</span>
                                    </div>
                                    <div v-html="myErrList[num].analysis"></div>
                                </div>
                            </div>
                        </transition>
                        <div class="bot">
                            <div v-if="num!==0" class="b-left" @click="prev">
                                <i class="el-icon-back"></i>
                                <span>上一题</span>
                            </div>
                            <div v-else class="b-left">第一题</div>
                            <div class="b-center" @click="changeana">
                                <i class="el-icon-document-checked"></i>
                                <span v-if="!anajudge">查看解析</span>
                                <span v-else>收起解析</span>
                            </div>

                            <div v-if="num!==testNum-1" class="b-right" @click="next">
                                <span>下一题</span>
                                <i class="el-icon-right"></i>
                            </div>
                            <div v-else class="b-right" @click="last">最后一题</div>
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
                                :class="[collect[num]==1?'collected':'']"
                                @click="collecting(num)"
                            >
                                <div class="icon">
                                    <img v-if="collect[num]==0" src="../../static/img/2.png" alt="">
                                    <img v-if="collect[num]==1" src="../../static/img/1.png" alt="">
                                </div>
                                <div class="iconfont">
                                    收藏
                                </div>
                            </div>
                            <div class="scicon" @click="recovery">
                                <div class="icon">
                                    <i class="el-icon-edit" />
                                </div>
                                <div class="iconfont">纠错</div>
                            </div>
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
                        <div class="btn" @click="postjc">
                            提交纠错
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
import { myErrTestList, Collection, submiterror } from "../action";
import foot from "~/components/foot.vue";
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
            myErrList: "",
            num: 0, // 当前题目序号
            flag: false, // 处理数据异步加载问题
            ShowType: 0, // 用户选择的类型 0代表错题回顾 1代表错题重做
            anajudge: false, // 解析是否展示
            collect: "",
            loading: true,
            testNum: 0, // 题目总数
            right: "",
            backnum: 0
        };
    },
    watch: {
        "state.nowindex"(nowindex) {
            this.num = nowindex;
            this.collect = [...this.collect];
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
    created() {

    },
    mounted() {
        let chapterId = this.$route.query.item.chapterId; // 章节id
        let categoryId = this.userInfor.id; // 科目id
        let errorShowType = this.$route.query.type; // 选择的类型 0代表错题回顾 1代表错题重做
        this.ShowType = errorShowType;
        // console.log(this.ShowType, "用户选择的查看或者重做类型");
        myErrTestList({
            chapterId,
            categoryId,
            errorShowType
        }).then(res => {
            console.log(res, "我的错题试题列表");
            if (res) {
                res = res.map(d => {
                    this.anajudge |= Boolean(d.userAnswer);
                    return {
                        ...d,
                        submit: Boolean(d.userAnswer)
                    }
                });
                this.flag = true;
                this.myErrList = res;
                this.testNum = this.myErrList.length; // 总题数
                // this.loading = false;
                let collect = [];

                res.forEach(questionitem => {
                    if (questionitem.collectFlag == null || "") {
                        collect.push(0);
                    } else {
                        collect.push(questionitem.collectFlag);
                    }

                    if (questionitem.questionType.type === "5") {
                        questionitem.answerList = [
                            {
                                rightFlag:
                            questionitem.answerList[0].rightFlag === "1"
                                ? "1"
                                : "0",
                                content: "正确",
                                option: "0"
                            },
                            {
                                rightFlag:
                            questionitem.answerList[0].rightFlag === "0"
                                ? "1"
                                : "0",
                                content: "错误",
                                option: "1"
                            }
                        ];
                    }
                });
                this.collect = collect;
                var singledemo = "";
                var doubledemo = "";
                this.myErrList.map((item, n) => {
                    if (item.questionType.type == 0) {
                        // 单选
                        singledemo = item.answerList.filter((items, m) => {
                            return items.rightFlag == 1; // 筛选单选正确答案
                        });
                        // console.log(singledemo);
                        this.right = singledemo[0].option;
                        // console.log(this.right);
                        item.answerList = item.answerList.map(items => {
                            return {
                                ...items,
                                checked: items.option == item.userAnswer
                            };
                        });
                    } else if (item.questionType.type == 1) {
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
                    }
                });
            }
        }).finally(() => {
            this.loading = false;
        });
    },
    methods: {
        jdpost(question) {
            if (!question.userAnswer) {
                this.$message({
                    // 消息提示
                    message: "答案不能为空",
                    type: "warning",
                    center: true,
                    duration: 1000,
                    offset: 200
                })
            } else {
                question.submit = true;
                this.anajudge = true;
            }
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
            const num = this.num;
            const categoryId = this.myErrList[num].categoryId;
            const chapterId = this.myErrList[num].chapterId;
            const questionId = this.myErrList[num].id;
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
        singlechose(n) {
            // 单选
            let num = this.num;
            this.myErrList[num].answerList.map((item, m) => {
                item.checked = false;
            });
            this.myErrList[num].answerList[n].checked = true;
            this.myErrList[num].userAnswer = this.myErrList[num].answerList[
                n
            ].option;
            var right = this.myErrList[num].answerList.filter((item, n) => {
                // 获取正确选项
                return item.rightFlag == 1;
            });
            this.right = right[0].option;
            this.anajudge = true;
        },
        doublechose(n) {
            // 多选点击选项
            // console.log(1111111111);
            var num = this.num;
            this.$set(
                this.myErrList[num].answerList[n],
                "checked",
                !this.myErrList[num].answerList[n].checked
            );
        },
        doublepost(n) {
            this.anajudge = true;
            var num = this.num;
            var middel = []; // 多选题用户选择的所有答案
            var lists = this.myErrList[num].answerList.filter((item, n) => {
                return item.checked;
            });
            // console.log(lists, 5775775777);
            var code = "";
            lists.map((item, n) => {
                middel.push(item.option);
            });
            middel.map(item => {
                code = code + item + "|"; // 将用户答案进行拼接字符串
                // console.log(code, 584584584);
            });
            code = code.slice(0, code.length - 1);
            this.myErrList[num].userAnswer = middel;
            if (this.myErrList[num].userAnswer != "") {
                this.anajudge = true;
            }
        },
        changeana() {
            this.anajudge = !this.anajudge;
        },
        prev() {
            // 上一题
            this.num--;
            if (this.num == 0) {
                return false;
            }
        },
        next1() {
            this.num++;
            // console.log(this.num, "当前题目数");
            // console.log(this.testNum, "题目总数")
            if (this.num >= this.testNum) {
                return false;
            }
        },
        next() {
            // 下一题
            this.num++;
            // console.log(this.num, "当前题目数");
            // console.log(this.testNum, "题目总数")
            if (this.num >= this.testNum) {
                return false;
            }
            let num = this.num;
            // console.log(this.myErrList[num], 644644444444)
            if (this.myErrList[num].userAnswer == null) {
                this.anajudge = false;
            } else {
                this.anajudge = true;
            }
        },
        last() {
            this.$message({
                message: "这是最后一题",
                type: "success"
            });
        },
        goback(num) {
            // 返回按钮
            this.state.questionIndexRouteFlag = true; // 标识路由返回
            this.$router.go(-1);
            // console.log(this);
        },
        collecting(n) {
            // 收藏功能
            // console.log(this.$route.query);
            var num = this.num;
            var collecttype = this.collect[num];
            let chapterId = this.$route.query.item.chapterId; // 章节id
            let categoryId = this.userInfor.id; // 科目id
            var questionId = this.myErrList[num].id;
            // console.log(collecttype, chapterId, categoryId, questionId);
            if (collecttype == 0) {
                this.collect[num] = 1;
                this.collect = [...this.collect];
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
        // bottom: 0px;
        padding: 10px;
        background: red;
        width: 860px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: white;
        height: 50px;
        // left: 478px;
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
    padding: 20px;
    background: rgba(238, 242, 239, 1);
    border-radius: 5px;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 5px;

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
    background: white;
    padding: 20px;
    border-radius: 5px;
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
    padding: 20px;
    background: white;
    border-radius: 5px;
    div{
        margin-top: 10px;
        text-align: justify;
    }
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
    img{
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
        cursor: pointer
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
