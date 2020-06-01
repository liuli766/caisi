<template>
    <!-- 错题收藏 -->
    <div>
        <div class="main">
            <div class="title">
                <el-menu
                    default-active="1"
                    class="el-menu-demo"
                    active-text-color="#15BD91"
                    mode="horizontal"
                    text-color="#000000"
                    @select="handleSelect"
                >
                    <el-menu-item class="de" index="1">我的错题</el-menu-item>
                    <el-menu-item class="de" index="2">我的收藏</el-menu-item>
                    <el-menu-item class="de" index="3">易错试题</el-menu-item>
                    <el-menu-item class="de" index="4">热门试题</el-menu-item>
                </el-menu>
            </div>
            <!-- 我的收藏 -->
            <div v-if="topnum==2" class="content">
                <img
                    v-if="collectjudge"
                    style="width:20px;height:20px;float:left"
                    src="../../resouce/index/return.png"
                    alt="返回"
                    @click="returnlist"
                />
                <div class="titletop">
                    <div
                        v-for="(item,n) in lms"
                        :key="n"
                        :class="[item.checked?'right':'']"
                        @click="collect(n)"
                    >
                        {{ item.name }}
                    </div>
                </div>
                <div v-if="!collectjudge" class="body">
                    <div v-for="(item,m) in list" :key="m">
                        <div v-if="item.ifJunior==0" class="body1">
                            <div>{{ item.chapterName }}</div>
                            <div>
                                <div class="btn" @click="toMyCollDetail(0,item)">收藏回顾</div>
                                <div
                                    class="btn"
                                    style="margin:5px 0"
                                    @click="toMyCollDetail(1,item)"
                                >
                                    收藏重做
                                </div>
                            </div>
                        </div>
                        <div v-if="item.ifJunior==1" class="body1">
                            <div>{{ item.chapterName }}</div>
                            <div>
                                <div class="btn" @click="zk(m)">展开</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="collectjudge">
                    <rewrite :list="nextlist"></rewrite>
                </div>
            </div>

            <!-- 易错试题 -->
            <div v-else-if="topnum==3" class="content">
                <div v-loading.lock="loading3"
                     element-loading-text="拼命加载中"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                     class="content3"
                >
                    <div v-for="(item,n) in list3" :key="n" class="body3" :wdlist="list3">
                        <div class="left3">
                            <div class="lines">
                                <!-- <i class="el-icon-circle-close"></i> -->
                                <span>{{ n+1 }}、</span>
                                <p class="stem" v-html="item.stem"></p>
                            </div>
                        </div>
                        <div class="right3">
                            <div class="btn" @click="toEasyErrTest(item,n)">查看</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 热门试题 -->
            <div v-else-if="topnum==4" class="content">
                <div class="content3">
                    <div v-for="(item,n) in list4" :key="n" class="body3">
                        <div class="left3">
                            <div class="lines">
                                <!-- <i style="color:#17B486" class="el-icon-reading"></i> -->
                                <span>{{ n+1 }}、</span>
                                <p class="stem" v-html="item.stem"></p>
                            </div>
                        </div>
                        <div class="right3">
                            <div class="btn" @click="look(item,n)">查看</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 我的错题 -->
            <div v-else class="content">
                <img
                    v-if="collectjudge1"
                    style="width:20px;height:20px;float:left"
                    src="../../resouce/index/return.png"
                    alt="返回"
                    @click="returnlist1"
                />
                <div class="titletop">
                    <div
                        v-for="(item,n) in lms"
                        :key="n"
                        :class="[item.checked?'right':'']"
                        @click="showdetail(n)"
                    >
                        {{ item.name }}
                    </div>
                </div>
                <div v-if="!collectjudge1" class="body">
                    <div v-for="(item,m) in list1" :key="m" class="body1">
                        <div>{{ item.chapterName }}</div>
                        <div v-if="item.ifJunior ===1" class="pointer btn" @click="NextFloor(item)">
                            展开
                        </div>
                        <div v-else>
                            <div class="btn" @click="toMyErrDetail(0,item)">错题回顾</div>
                            <div
                                class="btn"
                                style="margin:5px 0"
                                @click="toMyErrDetail(1,item)"
                            >
                                错题重做
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="collectjudge1">
                    <rewrite :list="nextlist"></rewrite>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import axios from "axios";
import rewrite from "~/components/exercise/rewrite";
import {
    getMyErrTest,
    getMyCollTest,
    getEasyErrTest,
    getHotErrTest,
    getMyErrTestNextFloor
} from "../../pages/action";

export default {
    components: {
        rewrite
    },
    props: {
        swich: {
            default: ""
        },
        lm: {
            // 接收刷题中心首页过来的列表  用以生成我的错题和我的收藏子栏目
            default: ""
        }

    },
    data() {
        return {
            collectjudge: false,
            collectjudge1: false, // 定义箭头是否显示
            topnum: 1, // 用于判断顶部title被选中，默认选中“我的错题”
            a: true,
            judge: "",
            lms: "", // 我的错题和我的收藏下边的四个子栏目
            detail: [],
            lmid: "", // 用户选择的子栏目id
            loading: true,
            loading3: true,
            list: "",
            list1: "", // 我的错题子栏目下边的列表数据
            list2: "",
            list3: "", // 易错试题数据
            list4: "",
            nextlist: "",
            nextFloorList: ""
        };
    },
    created() {
        // console.log(this.lm)
        var detail = [];
        var demo = this.lm.map(item => {
            return item;
        });
        demo.map(item => {
            detail.push(["1"]);
        });
        var demo1 = demo.map(item => {
            return {
                ...item,
                checked: false
            };
        });
        this.lms = demo1; // 得到我的错题和我的收藏下边的四个子栏目
        // console.log(this.lms, 156666666666);
        var mid = [];
        this.lm.map(() => {
            mid.push(0);
        });
        // console.log(mid);
        mid[0] = 1;
        this.judge = mid;
        console.log(this.swich)
        if (this.swich == null || this.swich === "") {
            this.swich = 0;
        }
        this.showdetail(this.swich);
    },

    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            userInfor: state => state.userchoseInfor
        })
    },
    methods: {
        NextFloor(item) {
            // console.log(item, 23666)
            let kmid = item.chapterId;
            getMyErrTestNextFloor(kmid).then(res => {
                this.list1 = res
                console.log(res, 2388888)
            })
        },
        handleSelect(e, m) {
            // console.log("索引", e);
            // console.log("第二个参数", m);
            this.topnum = e;
            if (m.length == 1) {
                if (e == 2) {
                    // console.log(this.lms);
                    this.collect(0); // 渲染列表时自动生成第一个章节练习下边的数据
                } else if (e == 3) {
                    this.easyerr();
                } else {
                    this.hotquestion();
                }
            }
        },
        showdetail(n) {
            // 生成我的错题下边的子栏目下边的列表内容
            // console.log(n,'这是点击的子栏目的下标');
            this.returnlist1();
            // console.log(this.lms)
            if (!this.lms.length || this.lms.length === 0) {
                return;
            }
            this.lms.map(item => {
                // lms是四个子栏目数据
                item.checked = false;
            });
            this.lms[n].checked = true;
            var lmid = this.lms[n].id; // 获取用户选择的子栏目id
            this.lmid = lmid;
            // console.log(this.lmid, 247247)
            getMyErrTest(lmid).then(res => {
                // console.log(res, 248248248);
                this.list1 = res; // 根据选择的子栏目的id分别获取子栏目下边的列表数据
            }).finally(() => {
                this.loading = false;
            })
        },
        collect(n) {
            // 生成我的收藏下边的数据列表
            // console.log(n)
            this.returnlist();
            this.lms.map(item => {
                item.checked = false;
            });
            this.lms[n].checked = true;
            var lmid = this.lms[n].id;
            this.lmid = lmid;
            // console.log(this.lmid)
            getMyCollTest(lmid).then(res => {
                // console.log("我的收藏数据列表", res);
                this.list = res;
                // console.log(this.list)
            });
        },
        easyerr() {
            // 生成易错试题列表
            let kmid = this.userInfor.id;
            getEasyErrTest(kmid).then(res => {
                // console.log(res, 288888888888888888)
                // console.log(res,'易错题列表')
                this.list3 = res;
                this.loading3 = false;
            });
        },
        hotquestion() {
            // 生成热门试题列表
            let kmid = this.userInfor.id;
            getHotErrTest(kmid).then(res => {
                // console.log(res,"热门试题");
                this.list4 = res;
            }).finally(() => {
                this.loading = false;
            })
        },
        toMyErrDetail(type, item) {
            // 跳转错题回顾页面和错题重做页面
            this.$router.push({
                path: "/question/myErrDetail",
                query: {
                    type,
                    item
                }
            });
        },
        toMyCollDetail(type, item) {
            // 跳转收藏回顾页面和收藏重做页面
            this.$router.push({
                path: "/question/myCollDetail",
                query: {
                    type,
                    item
                }
            });
        },
        toEasyErrTest(item, n) {
            // 跳转查看易错试题
            let questionId = item.questionId;
            this.$router.push({
                path: "/question/easyErrTest",
                query: { questionId, n }
            });
        },
        look(item, n) {
            // 跳转查看热门试题
            let questionId = item.questionId;
            this.$router.push({
                path: "/question/hot",
                query: { questionId, n }
            });
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        test(e, n) {
            // console.log(e, n);
        },
        returnlist() {
            this.collectjudge = false;
        },
        returnlist1() {
            this.collectjudge1 = false;
        }
        // toExercise1(m, n) {
        //     // 我的收藏去练习
        //     let list = this.list;
        //     // console.log(n);
        //     let chapterid = list[m].chapterId;
        //     let kmid = this.userInfor.id;
        //     axios({
        //         url: this.link + "/question/v1/app/get/app/my/collect/question",
        //         headers: {
        //             "x-authorize-token": this.token,
        //             "web-authorize-flag": "hmzJ/IPcepp9QKtustWPqw=="
        //         },
        //         method: "post",
        //         data: {
        //             categoryId: kmid,
        //             chapterId: chapterid,
        //             errorShowType: n
        //         }
        //     }).then(res => {
        //         // console.log(res);
        //         this.nextlist = res.data.data;
        //         this.collectjudge = true;
        //     });
        // }
    }
};
</script>

<style lang="less" scoped>
@color: #14bc91;
.animat {
    animation: fadeIn 1s;
}
.btn {
    background: rgba(239, 243, 247, 0.88);
    border: 1px solid rgba(214, 214, 214, 1);
    border-radius: 5px;
    padding: 3px 10px 3px 10px;
    cursor: pointer;
    font-size: 14px;
}
.btn:hover {
    border: 1px solid;
    color: white;
    background: #14bc91;
}

.returnlist {
    float: left;
    position: absolute;
}
.body1 {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(229, 234, 232, 1);
    padding: 0 20px;
}

.box-show-2 {
    animation: box-show-2 0.3s;
}
.box-hidden-2 {
    animation: box-hidden-2 0.3s;
}
.body3 {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    i {
        color: #fd4852;
        font-size: 22px;
        cursor: pointer;
    }
}

.el-menu-demo {
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    height: 70px;
}

.de {
    width: 20%;
    font-size: 18px;
    font-weight: 600;
    color: #000000;
    text-align: center;
}
.right {
    color: #14bc91;
}
.right3 .btn{
    font-size: 14px;
}
.left3 {
    div {
        display: flex;
        align-items: center;
    }
}
.content3 {
    max-height: 800px;
    overflow: auto;
}

.stem {
    max-width: 500px;
    overflow: hidden;
    margin-left: 20px;
    text-overflow: ellipsis;
    // white-space: nowrap;
}
.content3::-webkit-scrollbar {
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.content3::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
}
.content3::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}
.content {
    padding: 20px;
    border-radius: 5px;
    background: white;
    margin-top: 20px;
}
.titletop {
    width: 445px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
}
.titletop > div {
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
}
</style>
