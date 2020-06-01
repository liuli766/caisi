<template>
    <div class="main">
        <pchead />
        <register />
        <forgetPassword />
        <div v-wechat-title="$route.meta.title" class="mainCenter">
            <div class="title">{{ list.title }}</div>
            <div class="subtitle">
                <div class="creatDate">
                    才士官方
                    <span>{{ artDate }}</span>
                </div>
                <div class="see">
                    <img src="../resouce/index/eye.png" />
                    <span class="readNum">{{ list.readNum }}阅读</span>
                </div>
            </div>
            <P v-html="list.content"></P>
        </div>
        <foot v-if="list!==''" />
    </div>
</template>
<script>
import { mapState } from "vuex";
import pchead from "~/components/pchead.vue";
import foot from "~/components/foot.vue";
import register from "~/components/register.vue";
import forgetPassword from "~/components/forgetPassword";
import { getDetails } from "./action";

export default {
    components: {
        pchead,
        foot,
        register,
        forgetPassword
    },
    data() {
        return {
            list: "",
            artDate: "",
            title: "",
            articleTitle: ""
        }
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token
        })
    },
    created() {
    },
    mounted() {
        // console.log(location.search, 45455555555);
        this.$store.state.headjudge = 3;
        let id = this.$route.query.articleId; // 接收文章列表用户点击的文章id
        let articleTitle = this.$route.query.articleTitle; // 接收文章标题
        this.articleTitle = articleTitle;
        console.log(this.$route.meta.title, 544444444)
        this.$route.meta.title = this.articleTitle + "才士题库-祝你轻松通关";// 重新设置页面标题
        // console.log(id, articleTitle, 499999999)
        getDetails(id)
            .then(data => {
                // console.log(data, 5634783784783);
                this.list = data;
                console.log(this.list.content, 61111111111111111)
                let artDate = data.crtDate.split(" ")[0];
                this.artDate = artDate;
                // console.log(this.artDate)
            })
        this.title = window.document.title;
        setTimeout(() => {
            window.document.title = articleTitle;
        }, 10);
    },
    destroyed() {
        window.document.title = this.title;
    },
    methods: {}
};
</script>

<style lang="css" scoped>
.mainCenter {
    width: 1200px;
    background: #fff;
    margin: 130px auto;
    padding: 43px 28px 45px 35px;
    animation: slideInUp 1s;
}
.title {
    font-size: 26px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 39px;
    text-align: center;
}
.subtitle {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 45px;
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
}
p {
    font-size: 16px;
    font-weight: 400;
    color: rgba(38, 38, 38, 1);
    line-height: 24px;
    margin-top: 50px;
}
span {
    margin-top: 50px;
}
.see span {
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
}
.creatDate {
    font-size: 14px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 45px;
}
</style>
