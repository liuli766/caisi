<template>
    <div class="main">
        <div v-if="practice" v-loading="loading" class="center">
            <div class="center-l">
                <div
                    v-for="(item,index) in list"
                    :key="index"
                    class="lists"
                    :class="num == index?'checked':''"
                    @click="[chose(index)]"
                >
                    <img v-if="num === index" :src="item.activeSrc" alt />
                    <img v-else :src="item.disabledSrc" alt />
                    <img :src="imglist[index].activeSrc" alt />
                    {{ item.name }}
                </div>
            </div>
            <div class="center-m">
                <!-- 首页 -->
                <record v-if="num === 0" :indexcolumn="indexcolumnId" :changenum="changenum" />
                <!-- 错题收藏 -->
                <worrylist v-else-if="num== 1 + leftNavLen && bition && bition.length > 0" :lm="bition" :swich="swich" />
                <!-- 学习统计 -->
                <stat v-else-if="num==2 + leftNavLen" />
                <!-- 个人中心 -->
                <personal v-else-if="num==3 + leftNavLen" />
                <!-- 章节练习列表 -->
                <chapter
                    v-else
                    v-show="examjudge && !testRecordShow"
                    :lists="section"
                    :changenum="changenum"
                    @recordClick="testRecordShow = true"
                />

                <div>
                    <!-- 做题记录 -->
                    <testRecord
                        v-if="examjudge && testRecordShow"
                        :lm="chapter"
                        @back="testRecordShow = false"
                    />
                </div>
            </div>
            <div class="center-r">
                <count :lm="lmItem" :nindex="num" />
                <!-- 统计模块 -->
            </div>
        </div>
        <foot style="margin-top:100px" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import { fetchcategory, getcolumn, getlist, getrecord } from "../action";

import foot from "~/components/foot.vue";
import record from "~/components/answer/record.vue";
import stat from "~/components/answer/stat.vue";
import chapter from "~/components/answer/chapter.vue";
import personal from "~/components/answer/personal.vue";
import testRecord from "~/components/answer/testRecord.vue";
import worrylist from "~/components/answer/worrylist.vue";
import count from "~/components/answer/count.vue";
export default {
    components: {
        testRecord,
        record,
        personal,
        stat,
        chapter,
        worrylist,
        count,
        foot
    },
    data() {
        return {
            num: 0,
            list: [],
            section: [],
            userchoseInfor: "",
            chapter: "",
            practice: true,
            state: this.$store.state,
            loading: false,
            lmlist: "",
            bition: "",
            testRecordShow: false,
            leftNavLen: 0,
            swich: 0,
            changenum: 0,
            indexcolumnId: "",
            imglist: [
                {
                    activeSrc: require("../../static/iconimg/home.png"),
                    disabledSrc: require("../../static/iconimg/home1 拷贝@2x.png")
                },
                {
                    disabledSrc: require("../../static/iconimg/editFile@2x.png"),
                    activeSrc: require("../../static/iconimg/editFile 拷贝@2x.png")
                },
                {
                    disabledSrc: require("../../static/iconimg/book1@2x.png"),
                    activeSrc: require("../../static/iconimg/book1 拷贝@2x.png")
                },
                {
                    disabledSrc: require("../../static/iconimg/alarm@2x.png"),
                    activeSrc: require("../../static/iconimg/alarm 拷贝@2x.png")
                },
                {
                    disabledSrc: require("../../static/iconimg/book1@2x.png"),
                    activeSrc: require("../../static/iconimg/book1 拷贝@2x.png")
                },
                {
                    activeSrc: require("../../static/iconimg/star 拷贝@2x.png"),
                    disabledSrc: require("../../static/iconimg/star@2x.png")
                },
                {
                    activeSrc: require("../../static/iconimg/wave 拷贝@2x.png"),
                    disabledSrc: require("../../static/iconimg/wave@2x.png")
                },
                {
                    activeSrc: require("../../static/iconimg/user 拷贝@2x.png"),
                    disabledSrc: require("../../static/iconimg/user@2x.png")
                }
            ]
        };
    },

    watch: {
        "state.token"(newtoken) {
            this.token = newtoken;
        },
        lmItem(lmInfor) {
            this.state.lmInfor = lmInfor;
        },
        num(num) {
            this.state.questionIndexActiveIndex = parseInt(num);
        }
    },

    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            objectstate: state => state.objectstate,
            lmInfor: state => state.lmInfor,
            examjudge: state => state.examjudge
        }),
        listen() {
            return this.$store.state.userchoseInfor;
        },
        lmItem() {
            return this.list[this.num];
        },
        examjudge() {
            return this.num > 0 && this.num < 1 + this.leftNavLen;
        }

    },
    created() {

    },
    mounted() {
        this.load()
        console.log(888, this.state.questionIndexRouteFlag, this.state.questionIndexActiveIndex)
        if (this.state.questionIndexRouteFlag) {
            this.num = this.state.questionIndexActiveIndex;
            this.state.questionIndexRouteFlag = false;
        } else {
            var selnum = this.$route.query.num || 0;
            this.num = selnum;
        }
    },
    methods: {
        load() {
            this.loading = true;
            fetchcategory().then(data => {
                this.userchoseInfor = data;
                let i = 0;
                getcolumn(data.id).then(bition => {
                    this.indexcolumnId = bition[0].id;

                    this.bition = bition;
                    this.leftNavLen = bition.length;
                    this.list = [
                        {
                            activeSrc: this.imglist[i].activeSrc,
                            disabledSrc: this.imglist[i++].disabledSrc,
                            name: "首页",
                            desc: "全部"
                        },
                        ...bition.map(d => {
                            getrecord(d.id).then(records => {
                                console.log("最近学习记录", records);
                            }).finally(() => {
                                this.loading = false;
                            })
                            console.log("d:", d);
                            return {
                                ...d,
                                activeSrc: this.imglist[i].activeSrc,
                                disabledSrc: this.imglist[i++].disabledSrc,
                                desc: d.name
                            };
                        }),
                        {
                            activeSrc: this.imglist[i].activeSrc,
                            disabledSrc: this.imglist[i++].disabledSrc,
                            name: "错题收藏",
                            desc: "错题收藏"
                        },
                        {
                            activeSrc: this.imglist[i].activeSrc,
                            disabledSrc: this.imglist[i++].disabledSrc,
                            name: "学习统计",
                            desc: "学习统计"
                        },
                        {
                            activeSrc: this.imglist[i].activeSrc,
                            disabledSrc: this.imglist[i++].disabledSrc,
                            name: "个人中心",
                            desc: "个人中心"
                        }
                    ];
                    this.chose(this.num);
                });
            });
        },
        chose(index) {
            var num = index;
            this.num = index
            this.changenum = index
            if (this.list[num].id) {
                getlist({
                    columnId: this.list[num].id,
                    categoryId: this.userchoseInfor.id
                }).then(data => {
                    this.section = data;
                    console.log(this.section, 11);
                });
            }
        },
        singechose() {
            this.swich = this.num - 1;
            this.num = 5
            this.$store.state.examjudge = false
            this.$store.state.lmInfor = this.list[5]
        }
    }

};
</script>

<style lang="less" scoped>
.center-l {
    background: white;
    padding: 20px 0;
    border-radius: 10px;
    height: 100%;
    width: 200px;
    font-size: 14px;
}
.lists {
    padding-left: 40px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-left: 4px solid #fff;
    img {
        margin-right: 7px;
    }
    img:nth-of-type(2) {
        display: none;
    }
}

.lists.checked {
    border-left: 4px solid #14bc91;
    color: #14bc91;
}
.lists:hover {
    color: #14bc91;
    background: #eef4f3;
    img:nth-of-type(2) {
        display: block;
    }
    img:nth-of-type(1) {
        display: none;
    }
}

.center {
    display: flex;
    width: 1200px;
    min-height: 600px;
    margin: 0 auto;
    margin-top: -60px;
}
el-menu {
    border: 0;
}
.center-m {
    animation: fadeIn 1s;
    width: 720px;
    margin: 0 20px;
}
.center-r {
    width: 20%;
}
.el-menu {
    border: 0px;
    border-radius: 8px;
}
</style>
