<template>
    <div class="main">
        <div
            v-if="firstjudge"
            v-show="showw"
            class="center"
        >
            <div class="top">
                <div class="firstclose">
                    <img src="../../resouce/index/close.png" @click="close" />
                </div>
                <div class="font">请选择您的考试</div>
            </div>
            <div class="contains">
                <div class="contain">
                    <div
                        v-for="(item,index) in lists"
                        :key="index"
                        class="lists"
                        @click="todetail(index)"
                    >
                        <img :src="imageLists[index].src" alt="图片" />
                        <div>{{ item.showName }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="secondjudge" class="center">
            <div class="tops">
                <div class="hz">
                    <img class="closeimg" src="../../resouce/index/close.png" @click="close" />
                </div>
                <div class="second">
                    <img
                        class="returnimg"
                        src="../../resouce/index/return.png"
                        @click="returnfirst"
                    />
                    <div class="choseClass">选择考试类型</div>
                    <div class="hzinput">
                        <el-input
                            v-model.trim="search"
                            placeholder="请输入科目名称关键词"
                            prefix-icon="el-icon-search"
                            size="small"
                            @keyup.enter.native="onSearch"
                        />
                    </div>
                </div>
            </div>
            <div v-if="2>1" class="bottom">
                <div class="bLeft">
                    <div
                        v-for="(item,inx) in lists[num].list"
                        :key="inx"
                        class="Left_lists"
                        :class="inx==clicknum?'chose':'notchose'"
                        @click="choseleft(inx)"
                    >
                        {{ item.showName }}
                    </div>
                </div>

                <div v-if="searchData.length>0" class="bRighrt">
                    <div
                        v-for="(item, ind) in searchData"
                        :key="ind"
                        class="bRights"
                        @click="choseright(ind)"
                    >
                        <span>{{ item.showName }}</span>
                    </div>
                </div>

                <div v-else-if="search.length==0" class="bRighrt">
                    <div
                        v-for="(item,ind) in secondlist"
                        :key="ind"
                        class="bRights"
                        @click="choseright(ind)"
                    >
                        <span>{{ item.showName }}</span>
                    </div>
                </div>
                <div v-else class="bRighrt">没有相关搜索~</div>
            </div>
        </div>

        <div v-if="thirdjudge" class="center">
            <div class="tops">
                <div class="hz">
                    <img class="closeimg" src="../../resouce/index/close.png" @click="close" />
                </div>
                <div class="second">
                    <img
                        class="returnimg"
                        src="../../resouce/index/return.png"
                        @click="returnsecond"
                    />
                    <div class="choseClass">选择考试类型</div>
                    <div class="hzinput">
                        <el-input
                            v-model.trim="search1"
                            placeholder="请输入科目名称关键词"
                            prefix-icon="el-icon-search"
                            size="small"
                            @keyup.enter.native="onSearch1"
                        />
                    </div>
                </div>
            </div>
            <div v-if="searchData1.length>0" class="bottom3">
                <div class="bRighrt3">
                    <div
                        v-for="(item,ind) in searchData1"
                        :key="ind"
                        class="bRights3"
                        @click="chosend(ind)"
                    >
                        <span>{{ item.showName }}</span>
                    </div>
                </div>
            </div>

            <div v-else-if="search1.length==0" class="bottom3">
                <div class="bRighrt3">
                    <div
                        v-for="(item,ind) in thirdlist"
                        :key="ind"
                        class="bRights3"
                        @click="chosend(ind)"
                    >
                        <span>{{ item.showName }}</span>
                    </div>
                </div>
            </div>

            <div v-else class="bottom3">没有相关搜索~</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@color: #15bd91;
* {
    box-sizing: border-box;
}
.b {
    border: 1px solid red;
}
.main {
    width: 100%;
    height: 100%;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
}
.center {
    width: 760px;
    background: white;
    border-radius: 5px;
    animation: fadeIn 1s;
    z-index: -5;
}
.top {
    padding: 10px;
    background: white;
    border-radius: 10px;
    div {
        height: 15px;
    }
    .font {
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        margin-left: 20px;
        font-size: 20px;
        height: 40px;
    }
    .returnimg {
        width: 20px;
    }
}
.firstclose {
    height: 15px;
    img {
        width: 15px;
        float: right;
        cursor: pointer;
    }
}
.contains {
    width: 100%;
    display: flex;
    justify-content: center;
}
.contain {
    display: flex;
    flex-wrap: wrap;
    background: rgba(245, 248, 246, 1);
    padding: 36px;
    // justify-content: center;
}
.lists {
    margin: 10px;
    padding: 25px 20px;
    width: 30%;
    background: white;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
}
.second {
    display: flex;
    align-items: center;
    padding-left: 20px;
}
.choseClass {
    margin:0 0 5px 20px;
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.tops {
    padding: 0 0 10px 10px;
    border-bottom: 2px solid rgba(224, 224, 224, 1);
    img {
        width: 20px;
        float: right;
    }
    .hz {
        height: 20px;
        padding: 10px;
    }
    .hzinput {
        margin-left: 20px;
        width: 372px;
        height: 35px;
    }
}
.bottom {
    display: flex;
}
.bLeft {
    width: 200px;
    background: rgba(245, 245, 245, 1);
    text-align: center;
    height: 500px;
    overflow: auto;
}
.Left_lists {
    width: 100%;
    padding: 20px 0 20px 0;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
}
.Left_lists:hover {
    background: rgba(205, 205, 205, 1);
    color: white;
    cursor: pointer;
}
.chose {
    color: @color;
}
.bRighrt {
    display: flex;
    overflow: auto;
    width: 70%;
    flex-wrap: wrap;
    align-items: flex-start;
    max-height: 600px;
    height: fit-content;
    animation: fadeInDown 1s;
    margin-top: 25px;
    // justify-content: space-around;
    margin-left: 10px;
}
.bRights {
    margin-top: 10px;
    font-size: 14px;
    height: 80px;
    width: 23%;
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 3px;
    background: rgba(245, 248, 246, 1);
    text-align: center;
    justify-content: center;
    cursor: pointer;
    animation: fadeInDown 1s;
    transition: all 1s;
    border-radius: 5px;
    margin-right: 10px;
}
.not {
    margin: 20px;
}
.bRighrt3 {
    display: flex;
    overflow: auto;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
}

.bottom3 {
    min-height: 200px;
    max-height: 800px;
    overflow: auto;
}

.bRights3 {
    margin: 5px 10px 5px 10px;
    height: auto;
    max-height: 120px;
    width: 20%;
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 3px;
    background: rgba(245, 248, 246, 1);
    text-align: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
}

.closeimg{
    cursor: pointer;
}
</style>
<script>
import { mapState, mapGetters } from "vuex";
// import axios from "axios"
import {
    fetchcategory,
    queryTop,
    querySubordinate,
    fechorder
} from "../../pages/action";
export default {
    data() {
        return {
            lists: "",
            num: 0,
            secondlist: "",
            clicknum: 0,
            thirdlist: "",
            firstjudge: true,
            secondjudge: false,
            thirdjudge: false,
            search: "",
            search1: "",
            searchData: [],
            searchData1: [],
            // loading: true,
            showw: false,
            imageLists: [
                {
                    src: require("../../static/img/建筑@2x.png")
                },
                {
                    src: require("../../static/img/宏观经济@2x.png")
                },
                {
                    src: require("../../static/img/职业认证@2x.png")
                },
                {
                    src: require("../../static/img/证券@2x.png")
                },
                {
                    src: require("../../static/img/职业病@2x.png")
                },
                {
                    src: require("../../static/img/考试 (1)@2x.png")
                },
                {
                    src: require("../../static/img/药@2x.png")
                },
                {
                    src: require("../../static/img/药@2x.png")
                }
            ]
        };
    },
    computed: {
        ...mapState({
            token: state => state.token,
            link: state => state.link,
            objectstate: state => state.objectstate
        }),
        ...mapGetters(["userchosestate"])
    },
    watch: {
        search() {
            this.onSearch();
        },
        search1() {
            this.onSearch1();
        },
        chosend(e) {
            var mid = [];
            var ids = this.thirdlist[e].id;
            mid.push(ids);
            fechorder({
                list: mid
            }).then(data => {
                if (data !== "") {
                    // 选择成功
                    this.$store.commit("changeobjectstate");
                    this.$router.push({ name: "question" });
                    fetchcategory().then(data => {
                        this.$store.state.userchoseInfor = data;
                        console.log("用户选中科目信息", data);
                    });
                    var code = /(\/question\/[a-z])/;
                    let codeItem = location.pathname.match(code);
                    if (codeItem) {
                        this.$router.push({ path: "/question" });
                    } else {
                        window.location.reload();
                    }
                } else {
                    this.$store.commit("changeobjectstate");
                }
            });
        },
        choseright(e) {
            // 第二级右边点击
            console.log("1");
            let that = this;
            const data = this.secondlist;
            let id = data[e].id;
            var mid = [];
            mid.push(id);
            if (data[e].isFlag == 0) {
                // 无下级完成科目选择
                fechorder({
                    list: mid
                }).then(data => {
                    // 完成科目选择后关闭科目选择界面
                    if (data !== "") {
                        // that.$store.state.userchoseInfor = "2"
                        that.$store.state.demo = "1";
                        // that.$store.dispatch("setuserchose", data)
                        that.$store.commit("changeobjectstate");
                        this.$router.push({ name: "question" });
                        fetchcategory().then(data => {
                            this.$store.state.userchoseInfor = data;
                        });
                        var code = /(\/question\/[a-z])/;
                        let codeItem = location.pathname.match(code);
                        if (codeItem) {
                            this.$router.push({ path: "/question" });
                        } else {
                            window.location.reload();
                        }
                    } else {
                        this.$store.commit("changeobjectstate");
                    }
                });
            } else {
                // 有下级目录
                that.secondjudge = !that.secondjudge;
                that.thirdjudge = !that.thirdjudge;
                querySubordinate(id).then(data => {
                    console.log("二级目录");
                    console.log(data);
                    this.thirdlist = data.list;
                });
            }
        }
    },
    created() {
        var that = this;
        queryTop().then(data => {
            that.lists = data;
            this.showw = true;
        }).finally(() => {
            // this.loading = false;
        })
    },
    methods: {
        todetail(index) {
            // 第一选择页面选择
            var that = this;
            this.$store.state.examid = this.lists[index];
            let id = that.lists[index].list[0].id;
            this.num = index;
            querySubordinate(id).then(data => {
                that.secondlist = data.list;
            });
            this.firstjudge = !this.firstjudge;
            this.secondjudge = !this.secondjudge;
        },
        choseleft(e) {
            // 第二级左边栏点击
            var that = this;
            let num = this.num;
            this.clicknum = e;
            let id = that.lists[num].list[e].id;
            querySubordinate(id).then(data => {
                console.log(data, 0);
                this.secondlist = data.list;
            });
        },
        choseright(e) {
            // 第二级右边点击
            console.log("1");
            let that = this;
            const data = this.secondlist;
            let id = data[e].id;
            var mid = [];
            mid.push(id);
            if (data[e].isFlag == 0) {
                // 无下级完成科目选择
                fechorder({
                    list: mid
                }).then(data => {
                    // 完成科目选择后关闭科目选择界面
                    console.log(data, 111111222222);
                    if (data !== "") {
                        // that.$store.state.userchoseInfor = "2"
                        that.$store.state.demo = "1";
                        // that.$store.dispatch("setuserchose", data)
                        that.$store.commit("changeobjectstate");
                        this.$router.push({ name: "question" });
                        fetchcategory().then(data => {
                            this.$store.state.userchoseInfor = data;
                        });
                        var code = /(\/question\/[a-z])/;
                        let codeItem = location.pathname.match(code);
                        if (codeItem) {
                            this.$router.push({ path: "/question" });
                        } else {
                            window.location.reload();
                        }
                    } else {
                        this.$store.commit("changeobjectstate");
                    }
                });
            } else {
                // 有下级目录
                that.secondjudge = !that.secondjudge;
                that.thirdjudge = !that.thirdjudge;
                querySubordinate(id).then(data => {
                    console.log("二级目录");
                    console.log(data);
                    this.thirdlist = data.list;
                });
            }
        },
        chosend(e) {
            var mid = [];
            var ids = this.thirdlist[e].id;
            mid.push(ids);
            fechorder({
                list: mid
            }).then(data => {
                console.log(data, 7937857438)
                if (data !== "") {
                    // 选择成功
                    this.$store.commit("changeobjectstate");
                    this.$router.push({ name: "question" });
                    fetchcategory().then(data => {
                        this.$store.state.userchoseInfor = data;
                        console.log("用户选中科目信息1", data);
                    });

                    var code = /(\/question\/[a-z])/;
                    let codeItem = location.pathname.match(code);
                    if (codeItem) {
                        this.$router.push({ path: "/question" });
                    } else {
                        window.location.reload();
                    }
                } else {
                    this.$store.commit("changeobjectstate");
                }
            });
        },

        // 搜索功能
        onSearch() {
            var search = this.search;
            if (search) {
                this.searchData = this.secondlist.filter(item => {
                    return item.showName.indexOf(search) > -1;
                });
                console.log(this.searchData, 1111);
            } else if (search.length === 0) {
                this.searchData = this.secondlist;
            } else {
                return this.searchData;
            }
        },
        onSearch1() {
            var search1 = this.search1;
            if (search1) {
                this.searchData1 = this.thirdlist.filter(item => {
                    return item.showName.indexOf(search1) > -1;
                });
                console.log(this.searchData1, 1111);
            } else if (search1.length === 0) {
                this.searchData1 = this.thirdlist;
            } else {
                return this.searchData1;
            }
        },
        returnfirst() {
            // 返回按钮
            this.firstjudge = !this.firstjudge;
            this.secondjudge = !this.secondjudge;
        },
        returnsecond() {
            this.secondjudge = !this.secondjudge;
            this.thirdjudge = !this.thirdjudge;
        },
        close() {
            // 关闭
            this.$store.commit("changeobjectstate");
            console.log(this.$store.state.objectstate);
        }
    }
};
</script>
