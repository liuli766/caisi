<template>
    <div>
        <h3 class="title">推荐课程</h3>
        <div style="width:100px"></div>
        <div v-for="(item,index) in list" :key="index" class="main" @click="toshop(index)">
            <div class="mtitle">{{ item.name }}</div>
            <div class="mdetail">{{ item.summary }}</div>
            <div class="mlist">
                <div v-for="(items,i) in item.tagList" :key="i" class="mlists">{{ items }}</div>
            </div>
            <div class="mtotail">
                <div class="ltotail">共{{ item.categoryNumber }}科</div>
                <div class="rtotail">{{ item.buyNumber }}人学习</div>
            </div>
        </div>-
    </div>
</template>
<style lang="less" scoped>
.main {
    background: white;
    padding: 15px;
    margin-top: 10px;
    border-radius: 5px;
}
.mtitle {
    color: #262d34;
    font-weight: 600;
}
.mdetail {
    color: #bdc6c2;
}
.mlist {
    margin-top: 10px;
}
.mlists {
    color: #14bc91;
    padding: 3px 7px 3px 7px;
    border: 1px solid #14bc91;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 8px;
}
.mlist {
    display: flex;
}
.mtotail {
    margin-top: 10px;
    display: flex;
    color: #bdc6c2;
    div {
        margin-right: 20px;
    }
}
</style>
<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
    data() {
        return {
            list: ""
        };
    },
    computed: {
        ...mapState({
            userchoseInfor: state => state.userchoseInfor,
            token: state => state.token,
            link: state => state.link
        })
    },
    created() {
        axios({
            // 套餐列表推荐科目
            url: this.link + "/question/v1/setmeal/setmeal/list",
            method: "post",
            headers: {
                "x-authorize-token": this.token,
                "web-authorize-flag": "hmzJ/IPcepp9QKtustWPqw=="
            },
            data: {
                examinationId: this.userchoseInfor.kztProductExaminationId,
                keyword: "",
                pageNo: 1,
                pageSize: 3
            }
        }).then(res => {
            console.log("模块推荐科目信息");
            console.log(res);
            this.list = res.data.data;
        });
    },
    methods: {
        toshop(e) {
            var id = this.list[e].id; // 套餐id
            console.log(id);
            this.$router.push({
                path: "/question/shop",
                query: { id }
            });
        }
    }
};
</script>