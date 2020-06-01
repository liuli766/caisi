<template>
    <div>
        <div v-if="nindex>0 && nindex<5" class="main0">
            <div class="title">
                <h3>{{ (lm || {}).desc }}统计</h3>
            </div>
            <div class="main">
                <div class="total">总题：{{ list.totalNum }}</div>
                <div class="process">
                    <div class="p-left">
                        <el-progress
                            :percentage="num"
                            :text-inside="true"
                            :stroke-width="12"
                            type="line"
                            status="success"
                        />
                    </div>
                    <div class="p-right">
                        已做
                        <span>{{ list.doneNum }}</span>
                    </div>
                </div>
                <div class="count">
                    <div class="right">
                        做对数:
                        <span>{{ list.rightNum }}</span>
                    </div>
                    <div class="worry">
                        做错数:
                        <span>{{ list.wrongNum }}</span>
                    </div>
                </div>
                <div class="rewrite">
                    <div class="write" @click="rewrite">
                        <i class="el-icon-circle-close" />
                        <span>错题重做</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.main {
    width: 237px;
    background: white;
    padding: 26px 20px 20px 31px;
    border-radius: 10px;
    .title {
        margin-bottom: 20px;
        h3 {
            font-size: 22px;
            font-weight: 600;
            line-height: 38px;
        }
    }
}

.total {
    margin: 0 auto;
    color: #333333;
    font-size: 16px;
}
.process {
    display: -webkit-box;
    .p-left {
        width: 80%;
        margin-right: 13px;
    }
}
.p-right {
    font-size: 12px;
    color: #a2a2a2;
}
.count {
    display: flex;
    justify-content: space-around;
    color: #333333;
    font-size: 16px;
    margin-top: 20px;
}
.rewrite {
    margin-top: 30px;
    cursor: pointer;
}
.write {
    padding: 4px 20px;
    border: 1px solid #fd4852;
    border-radius: 20px;
    width: 140px;
    text-align: center;
    margin: 0 auto;
    color: #fd4852;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 20px;
}
</style>
<script>
import { mapState } from "vuex";
import { Statistics, start } from "../../pages/action";

export default {
    props: {
        lm: {
            type: [Object, String]
            // required: true
        },
        nindex: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            list: "",
            name: "",
            num: 0,
            zlist: "",
            flag: false
        };
    },
    computed: {
        ...mapState({
            token: state => state.token,
            link: state => state.link,
            userinfo: state => state.userchoseInfor
        })
    },
    watch: {
        lm(params) {
            this.change(params);
        }
    },
    created() {
        start(this.userinfo.id).then(data => {
            console.log(data, 1111)
            if (data !== "") {
                this.flag = true
                this.zlist = data;
                let num = this.zlist.questionCount / this.zlist.totalQuestionCount;
                this.num = num * 100;
                let pass = parseFloat(0 + "." + this.zlist.accuracy);
                if (isNaN(this.rightnum / pass - this.rightnum)) {
                    this.errornum = 0;
                } else {
                    this.errornum = parseInt(this.rightnum / pass - this.rightnum);
                }
            }
        });
    },
    methods: {
        change(params) {
            console.log(params, 11);
            this.name = params.name;
            var id = params.id;
            if (id) {
                Statistics(id).then(data => {
                    this.list = data;
                    var num = data.doneNum / data.totalNum;
                    num = num.toFixed(4);
                    this.num = num * 100;
                });
            }
        },
        rewrite() {
            this.$parent.singechose();
        }
    }
};
</script>
