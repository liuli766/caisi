<template>
    <div class="bgbox" style="background:#F5F8F6">
        <!-- <login /> -->
        <forgetPassword />
        <register />
        <pchead />
        <div
            v-loading.fullscreen.lock="loading"
            class="main"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            style="width: 1200px;margin:0 auto;margin-top:104px"
        >
            <div class="left">
                <el-row class="tac" style="boder:0px">
                    <el-col>
                        <el-menu
                            class="el-menu-vertical-demo"
                            default-active="0"
                            @select="select"
                        >
                            <el-menu-item
                                v-for="(item,index) in leftdata"
                                :key="index"
                                :index="index+''"
                            >
                                <span>{{ item.name }}</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div ref="hahh" class="middle">
                <div class="ad">
                    <img src="../resouce/index/add.png" />
                </div>
                <div v-for="(item,index) in news" :key="index" class="newslist">
                    <div class="newstitle">
                        <span>{{ item.dictionaryName }}</span>
                    </div>
                    <div
                        v-for="(items,indexs) in item.list.result"
                        :key="indexs"
                        class="newstotal"
                        @click="tonewsdetail(items)"
                    >
                        <div class="newsdetail">
                            <div class="nleft">
                                <img :src="imglink+items.bannerPathList[0]" />
                            </div>
                            <div class="nright">
                                <div class="nright-top">{{ items.articleTitle }}</div>
                                <div class="nright-middle">{{ items.articleAbstract }}</div>
                                <div class="nright-bottom">
                                    <div class="nright-botl">
                                        <i class="el-icon-view" />
                                        <span>{{ items.readNumer }}</span>
                                    </div>
                                    <div class="nright-botr">
                                        <i class="el-icon-timer" />
                                        <span>{{ artDate }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="newsbottom" @click="getrightnum(item)">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :page-size="5"
                            :total="item.list.total"
                            @current-change="currentchange"
                        />
                    </div>
                </div>
            </div>
        </div>
        <foot v-if="news!==''" />
        <forgetPassword />
    </div>
</template>
<script>
import axios from "axios";
import pchead from "~/components/pchead.vue";
import register from "~/components/register.vue";
// import login from "~/components/login.vue";
import forgetPassword from "~/components/forgetPassword";
import foot from "~/components/foot.vue";
import { mapState } from "vuex";
// import { artilce } from "./action"

export default {
    components: {
        pchead,
        // login,
        register,
        foot,
        forgetPassword
    },
    data() {
        return {
            leftdata: [], // 侧边栏数据
            recommend: "",
            news: "",
            leftid: "",
            rightid: "",
            articleList: "", // 文章列表数据
            artDate: "", // 文章创建的时间
            loading: true,
            selectColumn: "",       // 选择的栏目
            selectColumnIndex: 0   // 选择某一个栏目的下标
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            imglink: state => state.imglink
        })
    },
    created() {

    },
    mounted() {
        // 顶部导航选中
        this.$store.state.headjudge = 3;
        axios({
            url: this.link + "/user/v1/pc/get/trade"
        }).then(res => {
            // loading:false
            this.leftdata = res.data.data;      // 左边栏数据
            // this.leftid = this.leftdata[0].id;
            console.log(this.leftdata, "当前行业列表");
            this.select(0);
        });
    },
    methods: {
        select(e) {
            // this.loading = true;
            let numIndex = e;
            console.log(e, 137777777777777)
            this.leftid = this.leftdata[numIndex].id;
            axios({
                url: this.link + "/user/v1/pc/get/trade/artilce/" + this.leftid
            }).then(res => {
                console.log(e, "当前下标", res.data.data, "当前行业文章");
                this.news = res.data.data; // 文章列表
                console.log(this.news, 1455555555555)

                res.data.data.forEach(resItem => {
                    this.articleList = resItem.list.result;
                    this.articleList.forEach(articleListItem => {
                        // 文章日期只需日期无需时间
                        let artDate = articleListItem.crtDate.split(" ")[0];
                        this.artDate = artDate;
                    });
                });
                this.$nextTick(() => {
                })
            }).finally(() => {
                this.loading = false;
            })
        },
        currentchange(e) {
            this.selectColumnIndex = e;
            console.log("当前切换的下标页码", this.selectColumnIndex);
            setTimeout(() => {
                // let outnum = this.selectColumnIndex;            // 选择的下标
                let categoryId = this.leftid;                   // 选择的行业ID
                let columnId = this.selectColumn.columnId;      // 选择的文章栏目ID
                console.log("选择的行业ID", categoryId);
                console.log("选择的文章栏目ID", columnId);
                axios({
                    url: this.link + "/user/v1/pc/get/pager/article",
                    method: "post",
                    data: {
                        columnId,
                        productTradeId: categoryId,
                        currentPage: this.selectColumnIndex,
                        pageSize: "5"
                    }
                }).then(res => {
                    console.log("页码切换后的文章数据列表", res.data.data);
                    console.log("当前列表", this.news);
                    this.selectColumn.list = res.data.data;
                });
            }, 200);
        },
        getrightnum(item) {
            this.selectColumn = item;
            console.log("当前选择的栏目对象", this.selectColumn);
        },
        // test() {
        //     // let link = this.link
        //     let categoryId = this.leftid;
        //     let columnId =
        //         "20190128170022-d9525462-0f9a-428e-9b5d-6623d3f588qq";
        //     axios({
        //         url: this.link + "/v1/app/get/pager/article",
        //         method: "post",
        //         data: {
        //             columnId,
        //             productTradeId: categoryId,
        //             currentPage: "2",
        //             pageSize: "5"
        //         }
        //     }).then(res => {
        //         // console.log(res)
        //     });
        // },
        tonewsdetail(items) {
            let leftid = this.leftid;
            let articleId = items.articleId;
            let articleTitle = items.articleTitle;
            console.log(leftid, articleId, articleTitle, 207777777);
            this.$router.push({
                name: "newsdetail",
                query: {
                    leftid,
                    articleId,
                    articleTitle
                    // id: JSON.stringify(articleId)
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
@color: #15bd91;
.left {
    width: 120px;
    text-align: center;
    position: fixed;
    margin: 30px 0;
}
.bgbox {
    // padding: 25px 0;
    margin: 0 auto;
}
.main {
    width: 1200px;
    z-index: 99;
    margin: 120px auto;
    display: flex;
}
.middle {
    width: 760px;
    margin: 30px 0 30px 170px;
}
.newslist {
    background: #fff;
    margin-top: 35px;
    padding: 34px 50px 50px 45px;
    box-sizing: border-box;
}

.newstitle {
    span {
        border-bottom: 3px solid @color;
        font-size: 26px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        padding-bottom: 5px;
        line-height: 30px;
    }
}
.newsdetail {
    margin-top: 30px;
    display: flex;
    overflow: hidden;
    cursor: pointer;
}
.nleft img {
    width: 150px;
}
.nright {
    margin-left: 15px;
    width: 100%;
    overflow: hidden;
    .nright-top {
        width: 90%;
        font-weight: 600;
        font-size: 19px;
        color: rgba(51, 51, 51, 1);
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.newsbottom {
    display: flex;
    justify-content: center;
}
.nright-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: rgba(189, 198, 194, 1);
    span {
        margin-left: 10px;
    }
}
.nright-middle {
    margin: 15px 0;
    height: 65px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: justify;
}
.is-active{
    background: #14bc91;
    color: #fff;
}
.contain{
    position: absolute;
    z-index: 9999;
}

</style>
