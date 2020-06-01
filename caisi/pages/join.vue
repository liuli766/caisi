<template>
    <div class="contain">
        <pchead></pchead>
        <div
            v-loading.fullscreen.lock="loading"
            class="main"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
        >
            <div class="side">
                <el-row class="tac">
                    <el-col>
                        <el-menu
                            class="el-menu-vertical-demo"
                            style="text-align:center"
                            :default-active="idx"
                        >
                            <el-menu-item
                                v-for="(item,index) in leftData"
                                :key="index"
                                :index="index"
                                @click="choose(item,index)"
                            >
                                <span>{{ item.title }}</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div class="joinInfo" v-html="rightContent"></div>
        </div>
        <foot />
    </div>
</template>

<script>
import pchead from "~/components/pchead.vue";
import foot from "~/components/foot.vue";
import { mapState } from "vuex";
import { joinData, getDetails } from "./action.js";

export default {
    components: {
        pchead,
        foot
    },
    data() {
        return {
            leftData: [],
            idx: 0, // 从foot页面点击传过来的下标
            rightContent: "",
            loading: false
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token
        })
    },
    created() {},
    mounted() {
        this.loading = true;
        this.$store.state.headjudge = -1; // 导航无需选中
        let id = this.$route.query.id; // 接收用户点击选择的id 用以请求右边文章详情
        this.idx = this.$route.query.idx; // 接收到底部栏选择的下标
        joinData({}).then(res => {
            // 生成侧边栏
            // console.log(res, 163636363633333);
            for (let obj of res) {
                this.leftData.push(...obj.list);
            }
            // console.log(this.leftData, 6999999999999)
        });
        getDetails(id).then(res => {
            // console.log(res, 1721727272222)
            this.rightContent = res.content;
        }).finally(() => {
            this.loading = false;
        });
    },
    methods: {
        choose(item, index) {
            getDetails(item.id).then(res => {
                // console.log(res, 1721727272222)
                this.rightContent = res.content;
            });

            this.idx = index; // 在当前页面点击侧边栏时  将idx修改为当前点击的下标
        }
    }
};
</script>

<style lang = "css" scoped>
.main {
    width: 1200px;
    margin: 140px auto;
    display: flex;
    justify-content: space-between;
}
.side {
    width: 240px;
    background: #fff;
    position: fixed;
}
.tac,
.joinInfo {
    background: #fff;
}
.tac {
    width: 240px;
}
.joinInfo {
    width: 931px;
    padding: 20px 30px 80px 30px;
    margin-left: 280px;
}
.joinInfo img{
    width: 860px !important;
}
.el-menu-item.is-active {
    color: #fff;
    background: #14bc91;
}
.joinInfo h2 {
    margin-bottom: 30px;
    color: #333;
}
h4 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 20px 0;
}
p {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    line-height: 22px;
    margin-top: 10px;
}
</style>
