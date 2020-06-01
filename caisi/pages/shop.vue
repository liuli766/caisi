<template>
    <div class="main fade">
        <div>
            <pchead />
        </div>
        <div class="page-body">
            <div
                class="nav-box full-width yx-center root-bk-color"
                @mouseleave="subjectsShow = false"
            >
                <div class="xy-between nav-head pc-box">
                    <div
                        v-for="industry in industrys"
                        :key="industry.id"
                        class="item full-height i-xy-center pointer"
                        :class="
                            navActive.id === industry.id
                                ? 'active root-ft-color'
                                : 'fff'
                        "
                        @mouseover="clickNav(industry)"
                    >
                        <span style="margin-top:10px;">{{ industry.name }}</span>
                        <i
                            style="margin:10px 0 0 8px;"
                            :class="
                                navActive.id === industry.id
                                    ? 'el-icon-arrow-up'
                                    : 'el-icon-arrow-down'
                            "
                        />
                    </div>
                </div>
                <transition
                    name="custom-classes-transition"
                    enter-active-class="animated bounceInLeft"
                    leave-active-class="animated bounceOutRight"
                >
                    <div
                        v-if="true"
                        v-loading="!navActive.subjects"
                        class="nav-hover back-fff-box full-width xy-center"
                    >
                        <div class="xy-between pc-box jf-start nav-hover-box">
                            <div
                                v-for="subject in navActive.subjects"
                                :key="subject.id"
                                class="full-height i-xy-center item pointer"
                                :class="{
                                    'black':
                                        activeSubject === subject.id
                                }"
                                @click="clickSubject(subject.id)"
                            >
                                {{ subject.name }}
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="product-body yx-center">
                <div
                    v-loading="loadProduct"
                    class="produc-box pc-box xy-between jf-start al-start"
                >
                    <div
                        v-for="(product, index) in products"
                        :key="product.id"
                        class="product-item-box i-xy-center al-start"
                        :class="'product-item-box-' + (index % 2)"
                        @click="clickProduct(product.id)"
                    >
                        <div
                            class="item product-item i-yx-between al-str back-fff-box full-height pointer"
                        >
                            <div class="title">
                                {{ product.name }}
                            </div>
                            <div class="prompt">
                                包含：{{ product.summary }}
                            </div>
                            <div class="tags i-xy-center jf-start full-width">
                                <div
                                    v-for="tagName in product.tagList"
                                    :key="tagName"
                                    class="tag-box i-xy-center"
                                >
                                    <div class="tag root-ft-color i-xy-center">
                                        {{ tagName }}
                                    </div>
                                </div>
                            </div>
                            <div class="bottom i-xy-between">
                                <div class="sum-page">
                                    共{{ product.categoryNumber }} 科
                                </div>
                                <div class="sum-member">
                                    {{ product.buyNumber }} 人已学习
                                </div>
                            </div>
                        </div>
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
    </div>
</template>

<script>
import {
    // get,
    // postJson,
    fetchIndustry,
    fetchSubject,
    fetchPackageList,
    fetchErrorMessage
    // mapState
} from "./action.js";
// import Utils from "../static/untai.js"
import pchead from "~/components/pchead.vue";
import register from "~/components/register.vue";
import login from "~/components/login.vue";
import foot from "~/components/foot.vue";
import forgetPassword from "~/components/forgetPassword";
export default {
    // computed: {
    //     ...mapState({
    //         token: state => state.token
    //     })
    // },
    components: {
        pchead,
        login,
        register,
        foot,
        forgetPassword
    },
    data() {
        return {
            navActive: {},
            activeSubject: null,
            subjectsShow: false,
            industrys: [],
            products: [],
            loadProduct: false
        };
    },

    watch: {
        activeSubject(activeSubject) {
            // console.log("activeSubject:", activeSubject);
            this.loadProductList(activeSubject);
        }
    },
    created() {},
    mounted() {
        this.$store.state.headjudge = 2; // 改变导航状态
        this.dataInit();
    },
    methods: {
        dataInit() {
            this.loadIndustrys();
        },
        loadIndustrys() {
            fetchIndustry({})
                .then(data => {
                    // 获取标题的7个行业名称
                    console.log(data);
                    this.industrys = data.map(d => {
                        return {
                            ...d,
                            subjects: undefined
                        };
                        // console.log(...d)
                    });
                    if (!this.navActive.id) {
                        this.navActive = this.industrys[0];
                    }
                    this.industrys.forEach(ind => {
                        // 获取科目
                        fetchSubject(ind.id)
                            .then(subjects => {
                                ind.subjects = subjects;
                                if (
                                    !this.activeSubject &&
                                    this.navActive.id === ind.id
                                ) {
                                    this.activeSubject = (subjects[0] || {}).id;
                                }
                            })
                            .catch(e => {
                                ind.subjects = [];
                                fetchErrorMessage(e, "考试加载失败");
                            });
                    });
                })
                .catch(e => {
                    fetchErrorMessage(e, "行业加载失败");
                });
        },
        clickNav(navActive) {
            this.navActive = navActive;
            this.subjectsShow = true;
        },
        clickSubject(activeSubject) {
            this.subjectsShow = false;
            this.activeSubject = activeSubject;
        },
        clickProduct(productId) {
            this.$router.push({
                path: "/shopDetails",
                query: { id: productId }
            });
        },

        loadProductList(subjectId) {
            this.loadProduct = true;
            fetchPackageList({
                examinationId: subjectId,
                pageNo: 0,
                pageSize: 9
            })
                .then(data => {
                    this.products = data;
                    //   console.log(data)
                })
                .catch(e => {
                    fetchErrorMessage(e, "套餐加载失败");
                })
                .finally(() => {
                    this.loadProduct = false;
                });
        }
    }
};
</script>

<style lang="css" scoped>
.i-xy-center:hover {
}
.page-body {
    min-height: calc(100vh - 205px - 84px);
    background-color: #f1f1f1;
    margin-top: 84px;
}
</style>
<style lang="css">

.nav-box {
    position: relative;
}
.nav-head {
    height: 70px;
    width: 1200px;
}
.nav-head .item {
    flex-grow: 1;
    font-size: 18px;
    height: 100%;
}
.nav-head .item.active {
    background-color: #fff;
    transition: all 0.5s;
}
.nav-hover {
    box-shadow: 0px 0px 38px 0px rgba(0, 0, 0, 0.03);
    top: 60px;
    min-height: 200px;
    transition: all 2s;
}
.nav-hover-box {
    flex-wrap: wrap;
}
.nav-hover .item {
    font-size: 14px;
    margin:10px 30px;
    color: #333;
    line-height: 30px;
    padding: 0 5px;
    border-radius: 5px;
}
 .nav-hover .black{
    background-color:#14BC91;
    color: #fff;
    padding: 0 5px;
    border-radius: 5px;
    font-size: 14px;
    margin:10px 30px;
    line-height: 30px;
    padding: 0 5px;
    border-radius: 5px;
}
.nav-hover .item:hover{
   background-color:#14BC91;
    color: #fff;
    padding: 0 5px;
    border-radius: 5px;
}
.product-body {
    background-color: #f1f1f1;
}
.produc-box {
    flex-wrap: wrap;
    min-height: 611px;
}
.produc-box .product-item-box {
    width: 33.333333%;
    height: 169px;
    margin-top: 30px;
    overflow: hidden;
}
product-item-box-1 {
    align-items: center;
}
product-item-box-2 {
    align-items: flex-end;
}
.produc-box .item {
    width: 95%;
    box-sizing: border-box;
    padding: 0 4.473684%;
    border-radius: 2px;
}
.product-item .title {
    font-size: 18px;
    color: #262d34;
    font-weight: bold;
    margin-top: 22px;
}
.product-item .prompt {
    font-size: 16px;
    color: #bdc6c2;
}
.product-item .tags {
    overflow-x: auto;
    display: block;
    white-space: nowrap;
}
.product-item .tags::-webkit-scrollbar {
    display: none;
}
.product-item .tags .tag-box {
    width: 25%;
}
.product-item .tags .tag {
    width: 90%;
    border: 1px solid rgba(21, 189, 145, 1);
    border-radius: 12px;
    height: 24px;
    font-size: 14px;
}
.product-item .bottom {
    font-size: 14px;
    color: #bdc6c2;
    margin-bottom: 18px;
}
.pc-box {
    width: 1200px;
    text-align: justify;
}
</style>
