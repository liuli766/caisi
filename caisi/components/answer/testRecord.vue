<template>
    <div>
        <div class="contain">
            <div class="title">
                <div class="toback">
                    <i
                        class="el-icon-back pointer"
                        @click="back"
                    />
                    <!-- <h3>考试记录</h3> -->
                </div>
                <div class="accuracy">
                    <h4>正确率</h4>
                </div>
                <div
                    class="titleR"
                    @click="clearRecord"
                >
                    <span class="record">清除记录</span>
                    <i class="el-icon-delete-solid" />
                </div>
            </div>
            <div v-if="list!==''" class="content">
                <div
                    v-for="(item,index) in list" :key="index"
                    class="body"
                >
                    <div class="left">
                        <div class="left-top">
                            {{ item.chapterName }}
                        </div>
                        <div class="left-bottom">
                            <div class="time">
                                {{ item.createTime }}
                            </div>
                            <div class="tmcount">
                                总{{ item.chapterTotal }}题/对{{ item.rightTotal }}题
                            </div>
                        </div>
                    </div>
                    <div class="mid">
                        {{ item.accuracy }}
                    </div>
                    <div class="right">
                        <div class="right1">
                            <div
                                v-for="(items,index) in item.typeList" :key="index"
                                class="rights"
                            >
                                <div class="name">
                                    {{ items.typeName }}({{ items.total }})
                                </div>
                                <div class>
                                    正确{{ items.rightTotal }}题
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="content" style="text-align: center;margin:20px">暂无考试记录</div>
            <div class="paging">
                <div class="pageing-top">
                    <el-button
                        class="lastpage"
                        @click="tolast"
                    >
                        上一页
                    </el-button>
                    <div style="width:50px" />
                    <el-button
                        class="nextpage"
                        @click="tonext"
                    >
                        下一页
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.contain {
    background: white;
    padding: 20px;
    border-radius: 10px;
}
.accuracy {
}

.title {
    border-bottom: 1px solid rgba(229, 234, 232, 1);
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.toback {
    width: 40%;
    display: flex;
    align-items: center;
    i {
        font-size: 30px;
        margin-right: 10px;
    }
}
.accuracy {
    width: 20%;
    text-align: center;
}

.left {
    width: 40%;
}
.titleR {
    width: 40%;
    color: #fd4852;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}
.record {
    font-size: 15px;
    margin-left: 10px;
    cursor: pointer;
}

.body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    .left-top {
        font-size: 17px;
    }
    .left-bottom {
        display: flex;
        // justify-content: space-between;
        color: #999999;
        font-size: 14px;
        margin-top: 8px;
        .tmcount {
            margin-left: 30px;
        }
    }
}
.mid {
    color: #38c5a1;
    font-size: 22px;
    width: 20%;
    text-align: center;
}
.right {
    width: 40%;
    display: flex;
    flex-direction: row-reverse;
}
.rights {
    display: flex;
    color: #999999;
    font-size: 15px;
    margin-bottom: 5px;
    .name {
        margin-right: 10px;
    }
}
.paging {
    display: flex;
    justify-content: center;
    .pageing-top {
        display: flex;
    }
}
</style>
<script>
import { mapState } from "vuex"
import { clearRecord, testRecord } from "../../pages/action"
export default {
    props: {
        lm: {
            type: [Object, String],
            required: true
        }
    },
    data() {
        return {
            list: "",
            num: 1,
            clearlist: ""
        }
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            lmInfor: state => state.lmInfor
        })
    },
    created() {
        this.load(1)
    },
    methods: {
        clearRecord() {
            var clearlist = this.clearlist

            if (clearlist == "") {
                this.$message({
                    showClose: true,
                    message: "记录为空无需清除",
                    type: "warning"
                })
            } else {
                this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        clearRecord({
                            list: this.clearlist
                        }).then(data => {
                            this.$message({
                                showClose: true,
                                message: "清除成功",
                                type: "success"
                            })
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        })
                    })
            }
        },
        tolast() {
            var n = this.num
            if (n == 1) {
                this.$message({
                    showClose: true,
                    message: "现在是最前面了",
                    type: "warning"
                })
            } else {
                var m = n - 1
                this.num = this.num - 1
                this.load(m)
            }
        },
        tonext() {
            if (this.num == 1 && this.list.length !== 10) {
                this.$message({
                    showClose: true,
                    message: "已经是最后一页了哦！",
                    type: "warning"
                })
            } else if (this.num === 1 && this.list.length === 10) {
                var n = this.num + 1
                this.num = n
                this.load(n)
            } else if (this.num !== 1 && this.list.length === 10) {
                let n = this.num + 1
                this.num = n
                this.load(n)
            }
        },
        load(n) {
            var lmid = this.lm.id
            testRecord(lmid, n).then(data => {
                console.log(data, 999999)
                if (data != null) {
                    this.list = data.datalist
                    this.clearlist = data.examIds
                }
            })
        },
        back() {
            this.$emit("back")
        }
    }
}
</script>
