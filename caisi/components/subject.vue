<template>
    <div v-if="state.token && headjudge==1" class="main">
        <div class="contain">
            <div class="con_left">
                <div class="user_inf">
                    <!-- <img
                        class="headicon"
                        :src="userInfor.headUrl"
                    >-->
                    <div class="inf_r">
                        <div class="r_right">
                            <div class="hzinput">
                                <el-select
                                    v-model.trim="search"
                                    filterable
                                    placeholder="请输入科目名称关键词"
                                    @click="handopt"
                                >
                                    <el-option
                                        v-for="(item,index) in list"
                                        :key="index"
                                        :label="item.showName"
                                        :value="item.id"
                                        @click.native="handopt(index,item.showName)"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="con_right">
                <div v-if="userchose==''" class="r_left" />
                <div v-else class="r_left">{{ userchose }}</div>
                <div class="r_center" @click="change">切换</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
// import axios from "axios"
import {
    fetchcategory,
    fechsub,
    fechorder
    // fetchlist
} from "@/pages/action.js";
export default {
    data() {
        return {
            list: [],
            userchose: "",
            state: this.$store.state,
            mid: [],
            search: "",
            searchData: []
        };
    },
    computed: {
        ...mapState({
            objectstate: state => state.objectstate, // 科目切换
            userInfor: state => state.userInfor,
            link: state => state.link,
            token: state => state.token,
            userchoseInfor: state => state.userchoseInfor,
            imglink: state => state.imglink,
            headjudge: state => state.headjudge
        })
    },
    watch: {
        "state.userchoseInfor.id"(params) {
            this.load();
        }
    },
    created() {},
    mounted() {
        this.load();
    },
    methods: {
        load() {
            this.userchose = (this.userchoseInfor || {}).showName;
            // console.log('用户选中信息',this.userchoseInfor)
            // const categoryId = this.userchoseInfor.id
            if (this.token !== "") {
                fetchcategory({}).then(data => {
                    if (data) {
                        this.$store.state.userchoseInfor = data;
                        this.userchose = data.showName;
                        fechsub(data.id).then(data => {
                            this.list = data;
                        });
                    } else {
                        // 选择科目
                    }
                });
            }
        },
        change() {
            this.$store.commit("changeobjectstate");
        },
        handopt(n, str) {
            console.log(this.search, str, n)
            let kmid = this.list[n].id;
            this.mid.push(kmid);
            fechorder({
                list: this.mid
            })
                .then(data => {
                    this.userchose = str;
                    this.$router.push({ name: "question" });
                    this.mid = [];
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
<style lang="less" scoped>
@color: #14bc91;
.r_right {
    margin-left: 15px;
    position: relative;
}
el-dropdown-menu {
    max-height: 200px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.contain {
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    color: white;
    width: 1200px;
}
.main {
    background-image: url("../resouce/index/headbg.png");
    background-size: cover;
    width: 100%;
}
.headicon {
    width: 60px;
    height: 60px;

    border-radius: 50%;
}
.inf_r {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: center;
}
.user_inf {
    display: flex;
}
.user_count {
    display: flex;
}

.con_right {
    display: flex;
    align-items: center;
}
.r_center {
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 11px;
    padding: 5px 10px 5px 10px;
    margin-left: 10px;
    font-size: 12px;
    cursor: pointer;
}

.r_center:hover {
    background: @color;
    border: 1px solid @color;
}
.list {
    border: 1px solid white;
    border-radius: 10px;
    padding: 5px 10px 5px 10px;
    font-size: 12px;
    margin-left: 20px;
    cursor: pointer;
}
.down {
    color: white;
}
</style>
