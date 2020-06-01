<template>
    <div class="contain">
        <div class="contains">
            <div class="left">
                <div class="leftTitle">
                    <h3 v-for="(item,index) in titleList" :key="index">{{ item.dictionaryName }}</h3>
                </div>
                <div class="leftList">
                    <div
                        v-for="(item,index) in list"
                        :key="index"
                        @click="toJoin(item,index)"
                    >
                        {{ item.title }}
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="details">
                    <div>渝ICP备:14006812号-5</div>
                    <div>服务电话：023-6252-4805</div>
                    <div>举报邮箱：test@caishi.cn</div>
                    <div>Copynright 2019 才士题库（ti.caishi.cn）</div>
                    <div class="record">
                        <img src="https://www.cswx.com/static/images/cswxindex/ghs.png" alt />
                        <a
                            target="_blank"
                            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50010802002731"
                            style="color:#fff;"
                        >&nbsp;&nbsp;&nbsp;渝公网安备 50010802002731号</a>
                    </div>
                </div>
                <div class="down">
                    <div style="font-size:14px">才士题库APP下载</div>
                    <div class="outimg">
                        <img style="width:85px;height:85px" src="../resouce/index/ewmxz.png" alt />
                    </div>
                    <div style="text-align:center;color:#666666;font-size:10px">iOS & Android</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { joinData } from "../pages/action.js";

// import axios from "axios"
export default {
    data() {
        return {
            titleList: [], // 底部三个大标题数据
            list: [] // 列表数据
        };
    },
    computed: {
        ...mapState({
            link: state => state.link
        })
    },
    watch: {
        $route() {
            if (window._czc) {
                let location = window.location;
                let contentUrl = location.pathname + location.hash;
                let refererUrl = "/";
                window._czc.push(["_trackPageview", contentUrl, refererUrl]);
            }
        }
    },
    created() {
        joinData({}).then(res => {
            this.titleList = res;
            // console.log(this.titleList);
            for (let obj of res) {
                this.list.push(...obj.list);
            }
            // console.log(this.list);
        });
    },
    mounted() {
        window.onload = function() {
            const script = document.createElement("script");
            script.src =
                "https://s95.cnzz.com/z_stat.php?id=1278133893&web_id=1278133893";
            script.language = "JavaScript";
            document.body.appendChild(script);
        };
    },
    methods: {
        toJoin(item, index) {
            // 点击的div添加自定义属性myId 并拿到点击的div的id 传到合作页面
            let id = item.id;
            // console.log(id, 8222222)
            let idx = index;
            this.$router.push({
                path: "/join",
                query: { idx, id }
            });
            console.log(idx);
        }
    }
};
</script>
<style lang="less" scoped>
.contain {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    margin: 0 auto;
}
.center {
    width: 50px;
}
h3 {
    cursor: pointer;
}
.contains {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    padding: 40px 0;
}
.left {
    width: 500px;
}
.leftTitle {
    display: flex;
    justify-content: space-between;
}
.leftTitle > h3 {
    width: 30%;
    flex-wrap: wrap;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
}
.leftList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.leftList > div {
    flex-wrap: wrap;
    width: 30%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(201, 201, 201, 1);
    line-height: 21px;
    margin-top: 20px;
    cursor: pointer;
}
.details {
    color: rgba(102, 102, 102, 1);
    margin-right: 100px;
    font-size: 14px;
    div {
        margin-bottom: 15px;
    }
}
.right {
    display: flex;
}
.outimg {
    display: flex;
    justify-content: center;
    padding: 10px;
}
.down {
    color: white;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
}
.record {
    position: relative;
}
.record > img {
    position: absolute;
    left: 0px;
    top: 0;
}
.record > a {
    margin-left: 15px;
    color: #666 !important;
}
</style>
