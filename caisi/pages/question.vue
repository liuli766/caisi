<template>
    <div class="main" style="background:#F5F8F6;height:100%">
        <login />
        <register />
        <pchead />
        <subject />
        <div v-if="objectstate">
            <objectChose />
        </div>
        <nuxt-child />
    </div>
</template>

<script>
import { mapState } from "vuex";
import pchead from "~/components/pchead.vue";
import login from "~/components/login.vue";
import register from "~/components/register.vue";
import subject from "~/components/subject.vue";
import objectChose from "~/components/answer/objectChose.vue";
import { fetchlist, fetchcategory, getcolumn } from "./action";
export default {
    components: {
        pchead,
        subject,
        objectChose,
        login,
        register
    },
    data() {
        return {
            choseindex: 1,
            list: "",
            section: "",
            leftnum: 3,
            chapter: "",
            lmjudge: false,
            practice: true,
            state: this.$store.state,
            token: null
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            objectstate: state => state.objectstate,
            lmInfor: state => state.lmInfor,
            examjudge: state => state.examjudge,
            userchoseInfor: state => state.userchoseInfor
        }),
        userchoseInfor: {
            get() {
                return this.$store.state.userchoseInfor;
            },
            set(userchoseInfor) {
                this.$store.state.userchoseInfor = userchoseInfor;
            }
        }
    },
    watch: {
        "state.demo"(demo) {
            console.log("success:", demo);
        },
        "state.token"(newtoken) {
            this.token = newtoken;
        }
    },
    mounted() {
        this.token = this.$store.getters.getToken;
        this.$store.state.headjudge = 1;
        var id = this.$store.state.userchoseInfor.id || {};
        if (id !== undefined) {
            this.$store.state.objectstate = false;
        }
        if (this.token !== "") {
            this.$store.state.objectstate = false;
            fetchcategory()
                .then(data => {
                    this.userchoseInfor = data;
                    this.$store.state.userchoseInfor = data;
                    getcolumn(data.id).then(response => {
                        this.list = response;
                        this.leftnum = response.length;
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {},
    methods: {
        chose(index) {
            this.choseindex = index; // 左边栏索引值
            if (index != 1 && index < this.leftnum + 2) {
                var num = index - 2; // 获取栏目索引  list为返回的栏目数据type为类型
                this.chapter = this.list[num];
                this.$store.commit("changeexamjudgeout"); // 点击栏目改变考试记录状态
                this.$store.state.lmInfor = this.list[num]; // 点击的栏目信息传递给考试记录组件
                // 获取栏目下的章节或试卷信息
                fetchlist({
                    columnId: this.list[num].id,
                    categoryId: this.userchoseInfor.id
                }).then(data => {
                    this.section = data;
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
.main {
    width: 100%;
    margin-top: 100px;
}
.center {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
}
el-menu {
    border: 0;
}
.center-m {
    width: 50%;
    margin: 0 20px 0 20px;
}
</style>
