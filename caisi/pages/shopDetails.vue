<template>
    <div>
        <pchead />
        <div
            v-loading.fullscreen.lock="flag.loading"
            class="main"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
        >
            <div class="top">
                <div class="left">
                    <img v-if="list.mobileShowImg!==null"
                         :src="'https://image-manger.oss-cn-shanghai.aliyuncs.com/'+list.mobileShowImg"
                    />
                    <img v-else src="../resouce/answer/demo.jpg" alt="">
                </div>
                <div class="right">
                    <div class="right-t">
                        <div class="right-tl">
                            <h3>
                                {{ list.name }}
                                <span class="time">有效期{{ list.effectiveDays }}天</span>
                            </h3>
                            <div class="detail">
                                <span
                                    v-for="(item,index) in list.tagList"
                                    :key="index"
                                    class="details"
                                >{{ item }}</span>
                            </div>
                        </div>
                        <div class="right-tr">￥：{{ prices }}</div>
                    </div>

                    <div class="right-m">
                        <div class="right-mt">
                            <div class="lx">科目类型</div>
                            <div class="lxss">
                                <div
                                    v-for="(item,index) in list.typeList"
                                    :key="index"
                                    class="lxs"
                                    :class="{chosed:item.checked==1}"
                                    @click="titleChange(item)"
                                >
                                    {{ item.typeName }}
                                </div>
                            </div>
                        </div>
                        <div class="right-mm">
                            <div class="lx1">科目</div>
                            <div class="lxss1">
                                <el-checkbox-group
                                    v-for="(items,indexs) in list.specList"
                                    :key="indexs"
                                    v-model="productIds"
                                    class="lxs1"
                                >
                                    <el-checkbox
                                        style="width:100%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"
                                        border
                                        :label="items.productId"
                                        size="medium"
                                        :title="items.specName"
                                    >
                                        {{ items.specName }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                    <div class="right-b">
                        <div v-loading="submitOrderFlag" class="buy pointer" @click="sold">立刻购买</div>
                        <div class="try pointer" @click="tryIt">点击试用</div>
                        <div>
                            <div class="kf"
                                 onclick="window.location.href = 'http://q.url.cn/CDh9xP?_type=wpa&qidian=true'"
                            >
                                <div>
                                    <img src="../resouce/answer/kf.png" />
                                </div>
                                <div>咨询客服</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="add">
                    <div v-if="list.content!==''" v-html="list.content"></div>
                    <div v-else class="resImg"><img src="../resouce/details/detailadd.png" alt=""></div>
                    <div style="clear:both;" />
                </div>
                <div class="tips">
                    <h3>购买须知</h3>
                    <P>
                        1、在线看课卡怎么办？
                        首先建议您查看自己的当前网络环境，如您是公司环境，建议咨询网管是否网络环境做了限制。
                        如您是在家中，建议可以重置浏览器。
                    </P>
                    <P>2、如何查看自己已购买课程？ 请用购课账号登录http://ti.caishi.cn或下载才士题库APP登录，即可查看课程；</P>
                </div>
            </div>
            <pchead />>
            <foot />
            <login />
            <forgetPassword />
            <register />
        </div>
    </div>
</template>

<script>
import {
    createOrder,
    fetchErrorMessage,
    fetchSetmealInfo,
    flagPromise,
    fechorder
} from "./action.js";
import register from "~/components/register.vue";
import login from "~/components/login.vue";
import foot from "~/components/foot.vue";
import pchead from "~/components/pchead.vue";
import forgetPassword from "~/components/forgetPassword";

import { mapState } from "vuex";
export default {
    components: {
        foot,
        pchead,
        forgetPassword,
        login,
        register
    },
    data() {
        return {
            radio: 0,
            list: "",
            radios: 0,
            productIds: [],
            selectegoryId: "",
            selcategoryIdMap: {},
            submitOrderFlag: false,
            flag: {
                loading: false
            },
            prices: 0,
            priceMap: {}
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token
        })
    },
    watch: {
        productIds() {
            console.log(this.priceMap);
            this.secondeChange();
            console.log(this.prices);
        }
    },
    created() {

    },
    mounted() {
        var id = this.$route.query.id;
        flagPromise
            .bind(this)(
                fetchSetmealInfo({
                    setmealId: id,
                    setmealTypeId: ""
                }),
                "loading",
                "套餐加载异常"
            )
            .then(data => {
                // 得到购买套餐信息
                console.log(data, "套餐信息");
                if (data) {
                    this.list = data;
                    this.productIds.push(
                        (this.list.specList[0] || {}).productId
                    );
                    this.selcategoryId = this.list.specList[0].categoryId
                    // let secondId = data.specList[0].setMealId;
                    console.log(this.productIds);
                    this.list.specList.forEach(item => {
                        // 遍历所有科目
                        this.priceMap[item.productId] = item.sellingPrice; // 得到所有科目的价格压入priceMap对象中
                        this.selcategoryIdMap[item.productId] = item.categoryId;
                    });
                }
            });

        if (location.pathname === "/question/shop") {
            this.$store.state.headjudge = 2;
            this.headjudge = this.$store.state.headjudge;
        }
    },
    methods: {
        titleChange({ setMealId, typeId }) {
            // 切换科目选择
            this.productIds = [];
            // console.log(this.prices);
            fetchSetmealInfo({
                setmealId: setMealId,
                setmealTypeId: typeId
            }).then(data => {
                this.list = data;
                this.productIds.push((this.list.specList[0] || {}).productId);
                this.list.specList.forEach(item => {
                    this.priceMap[item.productId] = item.sellingPrice;
                    this.selcategoryIdMap[item.productId] = item.categoryId;
                });
            });
            console.log(this.priceMap);
        },
        secondeChange(e) {
            this.prices = 0;
            console.log(this.productIds);
            this.productIds.forEach(item => {
                console.log(item);
                this.prices += this.priceMap[item];
                this.selectegoryId = this.selcategoryIdMap[item];
                console.log(this.selectegoryId, this.selcategoryIdMap, 123132)
            });
        },
        sold() {
            // 点击购买按钮
            let setMealId = this.$route.query.id;
            this.submitOrderFlag = true;
            console.log(this.productIds)
            if (this.productIds.indexOf(null) == -1) {
                createOrder(this.productIds, setMealId)
                    .then(r => {
                        console.log(r);
                        this.$router.push({
                            path: "/order/pay",
                            query: {
                                orderId: r.orderId
                            }
                        });
                    })
                    .catch(e => {
                        fetchErrorMessage(e, "创建订单失败");
                    })
                    .finally(() => {
                        this.submitOrderFlag = false;
                    });
            } else {
                this.$message({
                    type: "info",
                    message: "此科目无内容",
                    offset: 100
                })
                this.submitOrderFlag = false
            }
        },
        tryIt(url) {
            if (this.productIds.length > 1) {
                this.$message("试用只能选择一个科目，请重新选择")
            } else if (this.productIds.length === 0) {
                this.$message("试用只能选择一个科目");
            } else {
                let kmid = this.selectegoryId;
                // 点击试用 跳到刷题中心
                this.$store.state.headjudge = 1;
                let kmidlist = []
                kmidlist.push(kmid)
                fechorder({
                    list: kmidlist
                }).then(data => {
                    this.$router.push({
                        path: "/question"
                    });
                    console.log(data);
                })
                    .catch(e => {
                        fetchErrorMessage(e, "点击试用失败");
                    })
            }
        }
    }
};
</script>

<style lang="less" scoped>
.zx{
    cursor: pointer;
}
.main {
    margin: 110px 0 auto;
    padding-top: 1px;
}
.top {
    width: 1200px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    background: white;
    margin: 0 auto;
    margin-top: 30px;
}
.left img {
    width: 400px;
    height: 250px;
    margin: 10px 0 0 20px;
}
.detail {
    margin-top: 10px;
    width: 500px;
    display: flex;
    flex-wrap: wrap;

    .details {
        color: #ffaa00;
        padding: 3px 10px;
        border: 1px solid rgba(255, 170, 0, 1);
        border-radius: 13px;
        background: rgba(255, 170, 0, 0.11);
        font-size: 14px;
        margin: 5px;
        width: 16%;
    }
}
.time {
    color: #bdc6c2;
    font-size: 14px;
    margin-left: 10px;
}
.right {
    margin-left: 60px;
}
.right-t {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
}
.right-m {
    border-bottom: 1px solid #efefef;
    padding: 20px 0;
}
.right-mm {
    margin-top: 20px;
}
.right-tr {
    font-size: 20px;
    font-weight: 500;
    color: rgba(253, 63, 72, 1);
}
.right-b {
    padding: 30px 40px 0 0;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    div {
        margin-left: 30px;
    }
    .try {
        padding: 5px 10px;
        border: 1px solid #fd4852;
        background: rgba(253, 72, 82, 0.1);
        border-radius: 5px;
        color: rgba(253, 72, 82, 1);
    }
    .buy {
        background: #fd4852;
        color: white;
        padding: 5px 10px;
        border: 1px solid #fd4852;
        border-radius: 5px;
    }
}
.chosed {
    background: #14bc91;
    color: #fff;
    border-radius: 5px !important;
    border: 1px solid #14bc91 !important;
}
.lx,
.lx1 {
    color: rgba(153, 153, 153, 1);
    display: flex;
    font-size: 14px;
    font-weight: 400;
}
.lxss {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
}
.lxss1 {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
}
.lxs {
    width: 23%;
    margin: 5px;
    text-align: center;
    border: 1px solid #ddd;
    padding: 6px 0px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}
.lxs1 {
    width: 23%;
    margin: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.km {
    color: rgba(153, 153, 153, 1);
}
.kf {
    text-align: center;
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    cursor: pointer;
}
.bottom {
    margin: 0 auto;
    display: flex;
    width: 60%;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 20px;
    border-radius: 10px;
}
.shopdetail {
    width: 70%;
    background: white;
    padding: 15px;
    border-radius: 10px;
}

.btn {
    border: 1px solid gray;
    border-radius: 0px;
    margin-left: 10px;
}
.lxs {
    .el-radio__input {
        .el-radio__input {
            display: none !important;
        }
    }
}
.el-radio__inner {
    display: none !important;
}

.add {
    width: 878px;
    background: #fff;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
}
.add img {
   position: absolute;
    left: 50%;
    margin-left: -103px;
}
.tips {
    width: 300px;
    height: 282px;
    background: #fff;
    padding: 17px 22px;
    box-sizing: border-box;
    margin-left: 20px;
    border-radius: 10px;
}
.tips > h3 {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 38px;
}
.tips > p {
    margin-top: 16px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 19px;
    text-align: justify;
}
.right-tl > h3 {
    font-size: 20px;
    font-weight: 500;
    color: rgba(38, 45, 52, 1);
}
.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__label {
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
}
.chosedSub {
    border: 1px solid #14bc91 !important;
}
.el-checkbox {
    width: 115px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.resImg{
    height: 1076px;
}
</style>
<style lang="css">
.lxs .el-radio__input {
    display: none !important;
}
.lxs1 .el-checkbox__input {
    display: none;
}
</style>
