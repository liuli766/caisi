<template>
    <div
        class="main"
    >
        <div>
            <pchead />
        </div>
        <div>
            <subject />
        </div>
        <div
            class="page-body xy-center al-start"
        >
            <div class="order-box pc-box yx-center al-str back-fff-box">
                <div class="title order-row bold">订单信息</div>
                <hr color="#E5EAE8" />
                <div class="orderTop">
                    <div class="goBack" @click="goBack">
                        <div class="icon">
                            <i class="el-icon-back" />
                        </div>
                        <div class="goBack">返回</div>
                    </div>
                    <div class="order-sn order-row">
                        订单号：{{ order.orderSn }}
                    </div>
                </div>
                <div class="order-table yx-center al-str order-row">
                    <div class="th xy-between">
                        <div class="td td1">产品</div>
                        <div class="td td2">科目类型</div>
                        <div class="td td3">科目</div>
                        <div class="td td4">内容</div>
                        <div class="td td5">单价</div>
                        <div class="td td6">实际支付</div>
                    </div>
                    <div class="tbody order-box-f1 yx-between">
                        <div
                            v-for="item in [order]"
                            :key="item.categoryId"
                            class="tr xy-between"
                        >
                            <div class="td td1">
                                <el-image
                                    :src="imglink + item.mobileHeadImg"
                                    fit="contain"
                                >
                                    <div slot="placeholder" class="image-slot">
                                        加载中
                                        <span class="dot">...</span>
                                    </div>
                                </el-image>
                            </div>
                            <div class="td td2">
                                {{
                                    (item.skuList || [])
                                        .map(ku => ku.specName)
                                        .join("+")
                                }}
                            </div>
                            <div class="td td3">
                                {{ (item.skuList || [{}])[0].typeName }}
                            </div>
                            <div class="td td4">{{ item.summary }}</div>
                            <div class="td td5">
                                ¥{{ (item.price || 0).toFixed(2) }}
                            </div>
                            <div class="td td6 bold red">
                                ¥{{ (item.price || 0).toFixed(2) }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="title order-row bold">支付方式</div>
                <div class="order-row pay-box">
                    <div
                        class="type-ls xy-between order-box-f1 full-height jf-start al-start"
                    >
                        <div class="type-item yx-between">
                            <el-checkbox v-model="weixinPay" border>
                                <span
                                    class="icon-weixin-pay icon-pay"
                                />微信支付
                            </el-checkbox>
                        </div>
                        <div class="type-item yx-between">
                            <el-checkbox v-model="zfbPay" border>
                                <span class="icon-zfb-pay icon-pay" />支付宝支付
                            </el-checkbox>
                        </div>
                    </div>
                </div>
                <div class="bottom-btn order-row full-width xy-between">
                    <div class="title">
                        应付金额：
                        <span class="red bold">¥{{ (order.price || 0).toFixed(2) }}</span>
                    </div>
                    <div
                        type="primary"
                        size="small"
                        :disabled="
                            !(weixinPay || zfbPay || cPay) ||
                                order.orderState !== '0'
                        "
                        class="payBtn"
                        @click="pay"
                    >
                        立即支付
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div />
            <foot />
            <login />
            <register />
            <forgetPassword />
        </div>
        <el-dialog
            :visible.sync="orderSuccess"
            width="21.35%"
            top="30vh"
            center
        >
            <div class="yx-center dia-box">
                <img class="dia-img" src="../../resouce/pay/pay-success.png" />
                <div class="title bold">支付成功，快去学习吧！</div>
                <div class="bottom-btn xy-between">
                    <div class="btn btn-index pointer" @click="goIndex">
                        返回首页
                    </div>
                    <div class="btn root-bk-color fff pointer" @click="goStu">
                        前往学习
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            :visible.sync="qrcodeShow"
            width="410px"
            top="30vh"
            center
            @opened="canvasQr"
        >
            <div class="yx-center weixin-qr-dia">
                <div class="title bold">请使用微信扫描二维码以完成支付</div>
                <div class="qr">
                    <img src="../../resouce/pay/qr.png" />
                    <div id="qrcode" ref="qrcode" class="two-code" />
                </div>
                <div class="order-sn order">订单号：{{ order.orderSn }}</div>
                <div class="product-name order">
                    商品名称：{{ order.summary }}（{{
                        (order.skuList || []).map(ku => ku.specName).join("+")
                    }}）
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    // get,
    // postJson,
    orderDetail,
    fetchErrorMessage,
    orderPay
} from "../action.js";
// import Utils from "../../static/untai.js"
import pchead from "~/components/pchead.vue";
import register from "~/components/register.vue";
import login from "~/components/login.vue";
import subject from "~/components/subject.vue";
import foot from "~/components/foot.vue";
import forgetPassword from "~/components/forgetPassword";
import { mapState } from "vuex";
let QRCode;
export default {
    components: {
        pchead,
        login,
        register,
        foot,
        forgetPassword,
        subject
    },
    data() {
        return {
            createOrderLoading: false,
            state: this.$store.state,
            weixinPay: true,
            zfbPay: false,
            cPay: false,
            orderSuccess: false,
            paySubmitFlag: false,
            zfbPaying: false,
            qrcodeShow: false,
            // state: this.$store.state,
            qrUrl: "",
            order: {}
        };
    },
    computed: {
        ...mapState({
            imglink: state => state.imglink
        })
    },

    watch: {
        weixinPay(weixinPay) {
            if (weixinPay) {
                this.zfbPay = false;
                this.cPay = false;
            }
        },
        zfbPay(zfbPay) {
            if (zfbPay) {
                this.weixinPay = false;
                this.cPay = false;
            }
        },
        cPay(cPay) {
            if (cPay) {
                this.weixinPay = false;
                this.zfbPay = false;
            }
        }
    },
    created() {
        // console.log("route:", this.$route);
    },
    mounted() {
        this.orderDetail();
        QRCode = require("qrcodejs2")
    },
    methods: {
        goBack() {
            // 订单头部返回按钮
            this.$router.go(-1);
        },
        orderDetail() {
            let { orderId } = this.$route.query;
            // this.createOrderLoading = true;
            console.log(this.$route.query, "liu");
            orderDetail(orderId)
                .then(order => {
                    // console.log("order:", order);
                    this.order = order;
                    console.log(this.order);
                })
                .catch(e => {
                    fetchErrorMessage(e, "订单创建失败");
                })
                .finally(() => {
                    this.createOrderLoading = false;
                });
        },
        getPayType() {
            if (this.weixinPay) {
                return 1;
            }
            if (this.zfbPay) {
                return 0;
            }
            if (this.cPay) {
                return 3;
            }
            return -1;
        },
        pay() {
            this.paySubmitFlag = true;
            orderPay({
                orderId: this.order.orderId,
                payType: this.getPayType()
            })
                .then(r => {
                    this.intervalPaySuccess();
                    if (this.zfbPay) {
                        this.openZfb(r.payInfo);
                    }
                    if (this.weixinPay) {
                        let payInfo = JSON.parse(r.payInfo);
                        this.qrUrl = payInfo.code_url;
                        this.qrcodeShow = true;
                    }
                })
                .finally(() => {
                    this.paySubmitFlag = false;
                });
        },
        openZfb(form) {
            this.$confirm("是否支付成功？", "", {
                distinguishCancelAndClose: true,
                cancelButtonText: "失败",
                confirmButtonText: "成功"
            }).then(() => {
                this.$router.push({ path: "/user" })
            }).catch(() => {

            })
            this.zfbPaying = true;
            let routerData = this.$router.resolve({
                path: "/order/zfb",
                query: { htmls: form }
            });
            this.htmls = form; // 打开新页面
            window.open(routerData.href, "_ blank");
            const div = document.createElement("div");
            div.innerHTML = htmls;
            document.body.appendChild(div);
            document.forms[0].submit();
        },
        canvasQr() {
            if (this.qrcodeShow) {
                this.$refs.qrcode.innerText = "";
                new QRCode("qrcode", {
                    width: 212,
                    height: 212,
                    text: this.qrUrl
                });
            }
        },
        goIndex() {
            this.$router.push({ path: "/" });
        },
        goStu() {
            this.$router.push({ path: "/question" });
        },
        intervalPaySuccess() {
            let start = new Date().getTime();
            let { orderId } = this.$route.query;
            let interval = () => {
                let now = new Date().getTime();
                if (start < now - 5 * 60 * 1000) {
                    // 支付超时
                    this.orderDetail();
                    this.zfbPaying = false;
                    this.qrcodeShow = false;
                    this.$message({
                        message: "订单支付超时",
                        type: "warning",
                        showClose: true,
                        duration: 0
                    });
                    return;
                }
                orderDetail(orderId)
                    .then(order => {
                        this.order = order;
                        if (order.orderState == 0) {
                            setTimeout(() => {
                                interval();
                            }, 500);
                        } else {
                            this.zfbPaying = false;
                            this.qrcodeShow = false;
                            if (order.orderState == 1) {
                                this.orderSuccess = true;
                            } else if (order.orderState == 4) {
                                this.$message({
                                    message: "订单已过期",
                                    type: "warning",
                                    showClose: true,
                                    duration: 0
                                });
                            } else {
                                this.$message({
                                    message: "订单异常",
                                    type: "error",
                                    showClose: true,
                                    duration: 0
                                });
                            }
                        }
                    })
                    .catch(e => {
                        this.zfbPaying = false;
                        this.qrcodeShow = false;
                        this.$message({
                            message: "订单异常",
                            type: "error",
                            showClose: true,
                            duration: 0
                        });
                    });
            };
            interval();
        }
    }
};
</script>

<style lang="less" scoped></style>

<style lang="css">
.order-box{
    width: 1200px;
}
.order-box-f1 .td2 {
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
body {
    background-color: #f1f1f1;
}
.red {
    color: #fd4852 !important;
}
.order-row {
    padding: 0 1.833333%;
}
.order-box {
    border-radius: 10px;
    margin-top: 120px;
}
.order-box .title {
    font-size: 22px;
    height: 61px;
    line-height: 61px;
}
.order-box .order-sn {
    font-size: 14px;
    color: #666666;
    height: 54px;
    line-height: 54px;
}
.order-box-f1 {
    background-color: #f5f8f6;
}
.order-table {
    margin-top: 9px;
    margin-bottom: 30px;
}
.order-table .th {
    background-color: #ebf0ed;
}
.order-table .td {
    text-align: center;
}
.order-table .th .td {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #999999;
    border-radius: 4px 4px 0px 0px;
}
.order-table .td1,
.order-table .td2 {
    width: 20%;
}

.order-table .td3,
.order-table .td4,
.order-table .td5,
.order-table .td6 {
    width: 15%;
}
.order-table .tbody {
    border-radius: 0px 0px 4px 4px;
}
.order-table .tbody .td {
    font-size: 16px;
    color: #333333;
}
.order-table .tbody .tr {
    height: 116px;
    width: 100%;
}
.order-table .tbody .td1 .el-image img {
    height: 76px;
    border-radius: 4px;
    overflow: hidden;
    width: 52%;
}

.order-table .tbody .td6 {
    font-size: 20px;
}
.pay-box {
    height: 110px;
}
.pay-box .type-ls {
    padding: 35px 0 0 5%;
    box-sizing: border-box;
    border-radius: 4px;
}
.order-box .bottom-btn {
    height: 126px;
    justify-content: flex-end;
}
.order-box .bottom-btn .title {
    font-size: 14px;
    color: #333333;
    margin-right: 28px;
}
.type-item {
    margin-right: 10%;
    font-size: 16px;
    color: #333333;
}
.type-item .el-checkbox,
.type-item .el-checkbox .el-checkbox__label,
.type-item .el-checkbox .el-checkbox__input {
    display: inline-flex;
    align-items: center;
    z-index: 0;
}
.type-item .el-checkbox {
    min-width: 13em;
}
.icon-pay {
    margin-right: 11px;
    margin-left: 29px;
    width: 20px;
    height: 20px;
    display: inline-block;
}
.icon-weixin-pay {
    background: url("../../resouce/pay/weixin-pay.png") no-repeat;
}

.icon-zfb-pay {
    background: url("../../resouce/pay/zfb-pay.png") no-repeat;
}
.icon-c-pay {
    background: url("../../resouce/pay/cPay.png") no-repeat;
}
.dia-img {
    width: 37.56%;
    height: 92px;
}
.dia-box .title {
    font-size: 18px;
    color: #333333;
    margin-top: 35px;
}
.dia-box .bottom-btn {
    margin-top: 51px;
}
.dia-box .bottom-btn .btn {
    width: 8em;
    font-size: 16px;
    border-radius: 17px;
    text-align: center;
    height: 34px;
    line-height: 34px;
}
.dia-box .bottom-btn .btn-index {
    border: 1px solid rgba(201, 201, 201, 1);
    margin-right: 18.333333%;
}
.qrcode {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.6);
}
.weixin-qr-dia .title {
    font-size: 14px;
    color: #333333;
}
.weixin-qr-dia .qr {
    width: 212px;
    height: 212px;
    margin: 8px 0;
    position: relative;
}
.weixin-qr-dia .qr > img {
    position: absolute;
    width: 44px;
    height: 44px;
    left: 85px;
    top: 85px;
    z-index: 99;
}
.weixin-qr-dia .order {
    margin: 5px 0;
}
.payBtn {
    color: #fff;
    width: 141px;
    height: 38px;
    background: rgba(20, 188, 145, 1);
    border-radius: 5px;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
}
.orderTop {
    display: flex;
    font-size: 14px;
    color: #666;
    font-weight: 400;
    padding: 0 30px;
}
.orderTop > div {
    line-height: 54px;
}
.orderTop .el-icon-back {
    font-weight: 600;
}
.orderTop > .goBack {
    cursor: pointer;
    display: flex;
}
</style>
<style lang="css" scoped>
.page-body {
    min-height: calc(100vh - 205px - 110px - 84px);
}
</style>
