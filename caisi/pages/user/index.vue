// 个人中心板块
<template>
    <div>
        <pchead />
        <div class="main">
            <div class="title" style="text-align: center;">
                <el-menu
                    default-active="1"
                    class="el-menu-demo"
                    active-text-color="#15BD91"
                    mode="horizontal"
                    text-color="#000000"
                    @select="handleSelect"
                >
                    <el-menu-item class="de" index="1">我的资料</el-menu-item>
                    <el-menu-item class="de" index="2">我的订单</el-menu-item>
                    <el-menu-item class="de" index="3">消息中心</el-menu-item>
                    <el-menu-item class="de" index="4">我的题库</el-menu-item>
                </el-menu>
            </div>
            <!-- 我的资料模块 -->
            <transition name="animated-a" enter-active-class="slideInDown animated">
                <div v-if="topnum === 1" class="content yx-center userinfo al-str">
                    <div class="info">
                        <el-form ref="formData" :model="formData" :rules="rules">
                            <!-- 个人资料 -->
                            <div class="myinformation userinfo-row yx-between al-str box-root">
                                <div
                                    class="header i-xy-between"
                                    :class="headerOpenData.info ? 'open' : 'close'"
                                    @click="headerOpenData.info = !headerOpenData.info"
                                >
                                    <div class="i-xy-between jf-start left">
                                        <div class="title">个人资料</div>
                                        <div
                                            v-if="!headerOpenData.info"
                                            class="static"
                                        >
                                            {{ formData.nickName }}
                                        </div>
                                    </div>
                                    <div class="op pointer">
                                        <span>{{ headerOpenData.info ? '收起' : '编辑' }}</span>
                                        <img
                                            v-if="headerOpenData.info"
                                            src="../../resouce/userindex/up.png"
                                        />
                                        <img v-else src="../../resouce/userindex/down.png" />
                                    </div>
                                </div>
                                <transition
                                    name="userinfo-transition"
                                    enter-active-class="box-show-1"
                                    leave-active-class="box-hidden-1"
                                >
                                    <div
                                        v-if="headerOpenData.info"
                                        class="yx-center full-width box-body"
                                    >
                                        <div class="userinfo-detail-row xy-between full-width">
                                            <label>昵称：</label>
                                            <div class="input xy-center jf-start">
                                                <el-form-item prop="nickName">
                                                    <el-input
                                                        v-model="formData.nickName"
                                                        placeholder="请输入昵称"
                                                    />
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div class="userinfo-detail-row xy-between full-width">
                                            <label>性别：</label>
                                            <div class="input xy-center jf-start">
                                                <el-form-item prop="sex">
                                                    <el-radio-group v-model="formData.sex">
                                                        <el-radio :label="1">男</el-radio>
                                                        <el-radio :label="2">女</el-radio>
                                                        <el-radio :label="0">保密</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <!-- <div class="userinfo-detail-row xy-between full-width"> -->
                                        <!-- <label>生日：</label> -->
                                        <!-- <div class="input xy-center jf-start"> -->
                                        <!-- <el-date-picker
                                                v-model="formData.birthDay"
                                                type="date"
                                                placeholder="选择生日"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                        />-->
                                        <!-- <el-date-picker
                                                v-model="value1"
                                                type="date"
                                                placeholder="选择日期"
                                            >
                                            </el-date-picker>
                                        </div>
                                        </div>-->
                                        <div class="userinfo-detail-row xy-between full-width">
                                            <label>专业：</label>
                                            <div class="input xy-center jf-start">
                                                <el-input
                                                    v-model="formData.major"
                                                    placeholder="请输入专业"
                                                />
                                            </div>
                                        </div>
                                        <!-- <div class="userinfo-detail-row xy-between full-width"> -->
                                        <!-- <label>邮箱：</label> -->
                                        <!-- <div class="input xy-center jf-start">
                                            <el-form-item prop="email">
                                                <el-input
                                                    v-model="formData.email"
                                                    placeholder="请输入邮箱"
                                                />
                                            </el-form-item>
                                        </div>-->
                                        <!-- </div> -->
                                        <div class="userinfo-detail-row xy-between full-width">
                                            <label />
                                            <div class="input xy-center jf-start">
                                                <el-button
                                                    type="primary"
                                                    :loading="flag.clickSaveInfoFlag"
                                                    @click="clickSaveInfo"
                                                >
                                                    保存
                                                </el-button>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                            <!-- 头像部分 -->
                            <div class="myinformation userinfo-row yx-between al-str box-root">
                                <div
                                    class="header i-xy-between"
                                    :class="headerOpenData.head ? 'open' : 'close'"
                                    @click="headerOpenData.head = !headerOpenData.head"
                                >
                                    <div class="i-xy-between jf-start left">
                                        <div class="title">头像</div>
                                        <el-avatar
                                            v-if="!headerOpenData.head"
                                            :size="60"
                                            :src="imageConver(formData.headImg)"
                                            style="width:40px;height:40px;"
                                        >
                                            <img
                                                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                                            />
                                        </el-avatar>
                                    </div>
                                    <div class="op pointer">
                                        <span>{{ headerOpenData.head ? '收起' : '编辑' }}</span>
                                        <img
                                            v-if="headerOpenData.head"
                                            src="../../resouce/userindex/up.png"
                                        />
                                        <img v-else src="../../resouce/userindex/down.png" />
                                    </div>
                                </div>
                                <transition
                                    name="userinfo-transition"
                                    enter-active-class="box-show-2"
                                    leave-active-class="box-hidden-2"
                                >
                                    <div
                                        v-if="headerOpenData.head"
                                        class="xy-center full-width box-body head-body"
                                    >
                                        <el-avatar :size="60" :src="imageConver(formData.headImg)">
                                            <img
                                                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                                            />
                                        </el-avatar>
                                        <el-upload
                                            class="upload-demo"
                                            :on-success="handleAvatarSuccess"
                                            name="files"
                                            :data="{
                                                flag: 5
                                            }"
                                            :action="link + '/user/v1/app/upload/pictures'"
                                            :headers="{
                                                'x-authorize-token': state.token,
                                                'web-authorize-flag': state.authKey,
                                            }"
                                            :before-upload="() => {
                                                this.flag.saveheadImgFlag = true;
                                                return true;
                                            }"
                                        >
                                            <el-button
                                                size="small"
                                                type="primary"
                                                :loading="flag.saveheadImgFlag"
                                            >
                                                上传头像
                                                <i class="el-icon-upload el-icon--right" />
                                            </el-button>
                                        </el-upload>
                                    </div>
                                </transition>
                            </div>
                            <!-- <div class="myinformation userinfo-row yx-between al-str box-root">
                            <div
                            class="header i-xy-between"
                            :class="headerOpenData.email ? 'open' : 'close'"
                            @click="headerOpenData.email = !headerOpenData.email"
                            >
                            <div>邮箱</div>
                            <div class="op pointer">
                                <span>{{headerOpenData.email ? '收起' : '编辑'}}</span>
                                <img v-if="headerOpenData.email" src="../../resouce/userindex/up.png">
                                <img v-else src="../../resouce/userindex/down.png">
                            </div>
                            </div>
                            <transition
                            name="userinfo-transition"
                            enter-active-class="box-show-2"
                            leave-active-class="box-hidden-2"
                            >
                            <div
                                v-if="headerOpenData.email"
                                class="yx-center full-width box-body head-body email-body"
                            >
                                <div class="userinfo-detail-row xy-between full-width">
                                <label>邮箱：</label>
                                <div class="input xy-center jf-start">
                                    <el-input v-model="formData.nickname" placeholder="请输入邮箱"></el-input>
                                </div>
                                </div>
                            </div>
                            </transition>
                            </div>-->
                            <!-- 绑定手机部分 -->
                            <div class="myinformation userinfo-row yx-between al-str box-root">
                                <div
                                    class="header i-xy-between"
                                    :class="headerOpenData.phone ? 'open' : 'close'"
                                >
                                    <div class="i-xy-between jf-start left">
                                        <div class="title">绑定手机</div>
                                        <div class="static">{{ formData.phone || '12345678901' }}</div>
                                    </div>
                                    <div class="op pointer">
                                        <!-- <span>{{ headerOpenData.phone ? '收起' : '编辑' }}</span> -->
                                        <!-- <img
                                        v-if="headerOpenData.phone"
                                        src="../../resouce/userindex/up.png"
                                    />
                                        <img v-else src="../../resouce/userindex/down.png" />-->
                                    </div>
                                </div>
                                <transition
                                    name="userinfo-transition"
                                    enter-active-class="box-show-3"
                                    leave-active-class="box-hidden-3"
                                >
                                    <div
                                        v-if="headerOpenData.phone"
                                        class="yx-center full-width box-body phone-body"
                                    >
                                        <transition
                                            name="edit-box-transition"
                                            enter-active-class="animated fadeInDown"
                                        >
                                            <div
                                                v-if="editPhone === 1"
                                                class="show-box an-box full-width yx-center al-start"
                                            >
                                                <div class="title">
                                                    <span class="static">已绑定手机号：</span>
                                                    {{ formData.phone || '12345678901' }}
                                                </div>
                                                <div class="btn">
                                                    <el-button
                                                        type="primary"
                                                        @click="editPhone = 2"
                                                    >
                                                        更换手机号
                                                    </el-button>
                                                </div>
                                            </div>
                                        </transition>
                                        <transition
                                            name="edit-box-transition"
                                            enter-active-class="animated fadeInDown"
                                        >
                                            <div
                                                v-if="editPhone === 2"
                                                class="edit-box an-box full-width"
                                            >
                                                <div
                                                    class="userinfo-detail-row xy-between full-width title"
                                                >
                                                    <label class="static">旧手机号：</label>
                                                    <div
                                                        class="input xy-center jf-start"
                                                    >
                                                        {{ formData.phone || '12345678901' }}
                                                    </div>
                                                </div>
                                                <div
                                                    class="userinfo-detail-row xy-between full-width jf-start vcode title"
                                                >
                                                    <label class="static">手机验证码：</label>
                                                    <div class="xy-center jf-start">
                                                        <el-input
                                                            v-model="formData.vcode"
                                                            placeholder="输入旧手机号收到的验证码"
                                                        />
                                                        <el-button
                                                            type="primary"
                                                            :disabled="vcodeTime"
                                                            @click="sendCode"
                                                        >
                                                            {{ vcodeTime > 0 ? `${vcodeTime}秒后重试` : '发送验证码' }}
                                                        </el-button>
                                                    </div>
                                                </div>
                                                <div
                                                    class="userinfo-detail-row xy-between full-width jf-start"
                                                >
                                                    <label class="static" />
                                                    <div class="i-xy-center jf-start">
                                                        <el-button
                                                            type="primary"
                                                            :disabled="!formData.vcode"
                                                            @click="editPhone = 3"
                                                        >
                                                            下一步
                                                        </el-button>
                                                        <el-button @click="editPhone = 1">取消</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </transition>
                                        <transition
                                            name="edit-box-transition"
                                            enter-active-class="animated fadeInDown"
                                        >
                                            <div
                                                v-if="editPhone === 3"
                                                class="new-phone edit-box an-box full-width"
                                            >
                                                <div
                                                    class="userinfo-detail-row input xy-between full-width jf-start vcode title"
                                                >
                                                    <label class="static">新手机号：</label>
                                                    <div class="xy-center jf-start">
                                                        <el-form-item prop="newPhone">
                                                            <el-input
                                                                v-model="newPhone"
                                                                placeholder="输入要绑定的新手机号"
                                                            />
                                                        </el-form-item>
                                                    </div>
                                                </div>
                                                <div
                                                    class="userinfo-detail-row xy-between full-width jf-start"
                                                >
                                                    <label class="static" />
                                                    <div class="i-xy-center jf-start">
                                                        <el-button
                                                            type="primary"
                                                            :disabled="!newPhone"
                                                            @click="confirmMobile"
                                                        >
                                                            确定
                                                        </el-button>
                                                        <el-button @click="editPhone = 1">取消</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </transition>
                            </div>
                            <!-- 密码部分 -->
                            <div class="myinformation userinfo-row yx-between al-str box-root">
                                <div
                                    class="header i-xy-between"
                                    :class="headerOpenData.pass ? 'open' : 'close'"
                                    @click="headerOpenData.pass = !headerOpenData.pass"
                                >
                                    <div class="i-xy-between jf-start left">
                                        <div style="font-size:16px;padding:40px;">密码</div>
                                    </div>
                                    <div class="op pointer">
                                        <span>{{ headerOpenData.pass ? '收起' : '编辑' }}</span>
                                        <img
                                            v-if="headerOpenData.pass"
                                            src="../../resouce/userindex/up.png"
                                        />
                                        <img v-else src="../../resouce/userindex/down.png" />
                                    </div>
                                </div>
                                <transition
                                    name="userinfo-transition"
                                    enter-active-class="box-show-4"
                                    leave-active-class="box-hidden-4"
                                >
                                    <div
                                        v-if="headerOpenData.pass"
                                        class="yx-center full-width box-body phone-body pass-body"
                                    >
                                        <div
                                            class="userinfo-detail-row xy-between full-width title"
                                        >
                                            <label class="static">当前密码：</label>
                                            <div class="input xy-center jf-start">
                                                <el-form-item prop="oldPass">
                                                    <el-input
                                                        v-model="formData.oldPass"
                                                        placeholder="当前密码"
                                                    />
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div
                                            class="userinfo-detail-row xy-between full-width title"
                                        >
                                            <label class="static">新密码：</label>
                                            <div class="input xy-center jf-start">
                                                <el-form-item prop="newPass">
                                                    <el-input
                                                        v-model="formData.newPass"
                                                        placeholder="新密码"
                                                    />
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div
                                            class="userinfo-detail-row xy-between full-width title"
                                        >
                                            <label class="static">确认新密码：</label>
                                            <div class="input xy-center jf-start">
                                                <el-form-item prop="newPassBak">
                                                    <el-input
                                                        v-model="formData.newPassBak"
                                                        placeholder="确认新密码"
                                                    />
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div class="userinfo-detail-row xy-between full-width">
                                            <label />
                                            <div class="input xy-center jf-start">
                                                <el-button
                                                    type="primary"
                                                    :loading="flag.updatePassFlag"
                                                    @click="clickUpdatePass"
                                                >
                                                    保存
                                                </el-button>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </el-form>
                    </div>
                </div>
            </transition>
            <!-- 我的订单 -->
            <transition name="animated-b" enter-active-class="fadeInRight animated">
                <div v-if="topnum === 2" class="content order-box">
                    <div
                        v-infinite-scroll="loadOrders"
                        class="list"
                        :infinite-scroll-disabled="orderNoMore || flag.loadOrderFlag"
                    >
                        <transition
                            v-for="order in orders"
                            :key="order.id"
                            name="order-transition"
                            leave-active-class="animated fadeOutRight"
                        >
                            <div v-if="order.show" class="i-yx-between al-str full-width listItem">
                                <div
                                    class="order-state"
                                    :class="`order-state-${order.orderState}`"
                                >
                                    {{ orderState[order.orderState] }}
                                </div>
                                <div v-if="order.orderState==1" class="goSty" @click="goStussss(order.skuList[0].categoryId)">前往学习</div>
                                <div class="order-body xy-between al-str jf-start">
                                    <el-image v-if="order.mobileHeadImg==null"
                                              class="img"
                                              src="/_nuxt/resouce/answer/demo.jpg"
                                    />
                                    <el-image v-else
                                              class="img"
                                              :src="hp+order.mobileHeadImg"
                                    />
                                    <div class="i-yx-between sn al-start">
                                        <div class="order-sn yx-center">订单号：{{ order.orderId }}</div>
                                        <div class="setmealName yx-center">{{ order.setmealName }}</div>
                                    </div>
                                    <div class="i-yx-between price al-start">
                                        <div class="title xy-center">
                                            总价：
                                            <span class="red">¥{{ order.price }}</span>
                                        </div>
                                        <div class="title xy-center">
                                            优惠：
                                            <span class="red">¥{{ 0 }}</span>
                                        </div>
                                    </div>
                                    <div
                                        style="align-self: center;width:8%;text-align:right;color:#666666;"
                                    >
                                        x{{ 1 }}
                                    </div>
                                </div>
                                <el-divider content-position="right" />
                                <div class="xy-between y-price">
                                    应付总额：
                                    <span class="red total">¥{{ order.price }}</span>
                                </div>
                                <div v-if="order.orderState == 0" class="xy-between b-btn">
                                    <el-button type="primary" @click="clickPay(order.orderId)">去结算</el-button>
                                    <el-button
                                        :loading="flag.cancelOrderFlag"
                                        @click="clickCancelOrder(order)"
                                    >
                                        取消订单
                                    </el-button>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div v-if="flag.loadOrderFlag" class="xy-center order-scr back-fff-box">
                        加载中
                        <i class="el-icon-loading" />
                    </div>
                    <div v-if="orderNoMore" class="xy-center order-scr back-fff-box">没有更多了</div>
                </div>
            </transition>
            <!-- 消息中心 -->
            <transition name="animated-b" enter-active-class="fadeInRight animated">
                <div v-if="topnum === 3" class="content order-box">
                    <div
                        v-infinite-scroll="loadMessage"
                        class="list"
                        :infinite-scroll-disabled="messageNoMore || flag.loadMessageFlag"
                    >
                        <div class="newsItem">
                            <transition
                                v-for="message in messages"
                                :key="message.id"
                                name="message-transition"
                                leave-active-class="animated fadeOutRight"
                            >
                                <div
                                    v-if="message.show"
                                    class="message-item xy-between jf-start al-start full-width"
                                >
                                    <el-avatar :size="48" src="https://empty">
                                        <img
                                            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                                        />
                                    </el-avatar>
                                    <div class="i-yx-between al-start right">
                                        <div class="head i-xy-center jf-start">
                                            <div class="memssageName">{{ message.memssageName }}</div>
                                            <div
                                                class="time1 time"
                                            >
                                                {{ messageTime1(message.crtDate) }}
                                            </div>
                                            <div
                                                class="time2 time"
                                            >
                                                {{ messageTime2(message.crtDate) }}
                                            </div>
                                        </div>
                                        <div class="message-body">{{ message.memssageAbstract }}</div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div v-if="flag.loadMessageFlag" class="xy-center order-scr back-fff-box">
                        加载中
                        <i class="el-icon-loading" />
                    </div>
                    <div v-if="messageNoMore" class="xy-center order-scr back-fff-box">没有更多了</div>
                </div>
            </transition>
            <!-- 我的题库 -->
            <transition name="animated-b" enter-active-class="fadeInRight animated">
                <div
                    v-if="topnum === 4"
                    v-loading="flag.loadUserSetmealFlag"
                    class="content order-box"
                >
                    <div class="contentBox">
                        <div
                            v-for="questionBank in questionBanks"
                            :key="questionBank.id"
                            class="questionBank xy-between"
                        >
                            <div class="BankL xy-between jf-start">
                                <img class="Bankimg" src="../../resouce/pay/question.png" alt />
                                <div class="bankdetail">
                                    <div class="bankname">{{ questionBank.qmName }}</div>
                                    <div class="banktime">有效期至{{ questionBank.expiredDate }}</div>
                                </div>
                            </div>
                            <div class="BankR">
                                <div
                                    class="pointer"
                                    @click="goStussss(questionBank.categoryId)"
                                >
                                    前往学习
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <foot />
    </div>
</template>

<style lang="less" scoped>
@color: #14bc91;
.main{
    width: 1100px;
    margin:120px auto;
}
.el-menu-demo {
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
}
.goSty{
    width: 80px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    background: #14bc91;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    right: -840px;
}
.de {
    font-size: 18px;
    width: 18%;
}
.content {
    border-radius: 5px;
    margin-top: 20px;
}
.content .info {
    padding: 0 40px;
    background: #fff;
    border-radius: 10px;
}
.myinformation {
    .infLists {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .infL {
            display: flex;

            ._infR {
                margin-left: 20px;
                font-size: 14px;
                display: flex;
                align-items: center;
            }
            ._infL {
                color: rgba(102, 102, 102, 1);
            }
        }
        .infR {
            font-size: 14px;
            display: flex;
            align-items: center;
            img {
                margin-left: 10px;
                width: 12px;
            }
        }
    }
}
.orderDetails {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(233, 238, 236, 1);
    .orderDetailsL {
        display: flex;
    }
    .ordertotal {
        margin-left: 20px;
        padding: 5px 0 5px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .orderDetailsR {
        display: flex;
        .middle {
            display: flex;
            align-items: center;
        }
        .middleR {
            display: flex;
            align-items: center;
            margin-left: 20px;
        }
    }
}
.orderBottom {
    display: flex;
    flex-direction: row-reverse;
    .shouldPay {
        font-size: 15px;
        color: #666666;
    }
    .money {
        color: #fd4852;
        font-weight: 500;
        font-size: 20px;
    }
    .settleAccounts {
        padding: 5px 10px 5px 10px;
        border: 1px solid rgba(214, 214, 214, 1);
        width: 100px;
        text-align: center;
    }
    .settleAccounts:hover {
        color: white;
        background: @color;
        border: 1px solid @color;
    }
    .orderP {
        display: flex;
        flex-direction: row-reverse;
        margin: 20px 0 20px 0;
    }
}
.questionBank {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .BankL {
        display: flex;
    }
    .BankR {
        padding: 5px 10px;
        background: #14bc91;
        color: white;
        border-radius: 5px;
    }
    .bankdetail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 0 10px 20px;
        .bankname {
            font-size: 14px;
            color: #333333;
        }
        .banktime {
            font-size: 14px;
            color: #bbbbbb;
            margin-top: 1em;
        }
    }
}
</style>

<script>
import Utils from "../../static/untai.js";
import { mapState } from "vuex";
import formatDate from "format-datetime";
import pchead from "~/components/pchead.vue";
import foot from "~/components/foot.vue";
import {
    updatePass,
    fetchErrorMessage,
    sendVcode,
    updatePhone,
    currentUserInfo,
    updateUserInfo,
    fetchAllOrder,
    cancelOrder,
    flagPromise,
    fetchMessage,
    fetchUserSetmeal,
    fechorder
} from "../../pages/action.js";

export default {
    components: {
        pchead,
        foot
    },
    data() {
        return {
            formData: {},
            state: this.$store.state,
            value1: "",
            topnum: 0,
            userId: this.$store.state.userInfor.id,
            userInfor: {},
            headerOpenData: {
                info: false,
                head: false,
                email: false,
                phone: false,
                pass: false
            },
            editPhone: 1,
            vcode: "",
            vcodeTime: 0,
            hp: "https://image-manger.oss-cn-shanghai.aliyuncs.com/",
            flag: {
                updatePassFlag: false,
                clickSaveInfoFlag: false,
                saveheadImgFlag: false,
                loadOrderFlag: false,
                cancelOrderFlag: false,
                loadMessageFlag: false,
                loadUserSetmealFlag: false
            },
            orders: [],
            orderPage: {
                flag: true,
                pageNo: 1,
                pageSize: 5
            },
            messagePage: {
                flag: true,
                pageNo: 1,
                pageSize: 5
            },
            orderState: {
                1: "支付成功",
                0: "未支付",
                2: "支付失败",
                3: "已退款",
                4: "已过期"
            },
            orderNoMore: false,
            messages: [],
            messageNoMore: false,
            questionBanks: null,
            rules: {
                email: [
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ],
                nickName: [
                    { required: true, message: "请输入昵称", trigger: "blur" }
                ],
                sex: [
                    { required: true, message: "请选择性别", trigger: "change" }
                ],
                newPhone: [
                    {
                        required: true,
                        message: "请输入新手机号",
                        trigger: "blur"
                    }
                ],
                oldPass: [
                    { required: true, message: "请输入旧密码", trigger: "blur" }
                ],
                newPass: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 16,
                        message: "密码长度在 6 到 16 个字符",
                        trigger: "blur"
                    }
                ],
                newPassBak: [
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error("请再次输入密码"));
                            } else if (value !== this.formData.newPass) {
                                callback(new Error("两次输入密码不一致!"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            link: state => state.link,
            token: state => state.token,
            imglink: state => state.imglink
        })
    },
    watch: {
        topnum(topnum) {
            if (topnum === 2) {
                if (this.orderPage.flag) {
                    this.orderPage.flag = false;
                    this.loadOrders();
                }
            } else if (topnum === 3) {
                if (this.messagePage.flag) {
                    this.messagePage.flag = false;
                    this.loadMessage();
                }
            } else if (topnum === 4) {
                if (!this.questionBanks) {
                    this.loadUserSetmeal();
                }
            }
        }
    },
    created() {},
    mounted() {
        this.$store.state.headjudge = -1;
        this.topnum = 1;
        this.loadUserinfo();
    },
    methods: {
        loadUserinfo() {
            currentUserInfo().then(r => {
                this.formData = r;
            });
        },
        handleSelect(e) {
            this.topnum = parseInt(e);
        },
        clickSaveInfo() {
            let result = 0;
            this.$refs.formData.validateField(
                ["email", "nickName", "sex"],
                errorMessage => {
                    if (!errorMessage) {
                        if (++result === 1) {
                            this.flag.clickSaveInfoFlag = true;
                            updateUserInfo(this.formData)
                                .then(r => {
                                    this.$message.success("修改成功");
                                })
                                .catch(e => {
                                    fetchErrorMessage(e, "资料修改失败");
                                })
                                .finally(() => {
                                    this.flag.clickSaveInfoFlag = false;
                                });
                        }
                    }
                }
            );
        },
        handleAvatarSuccess(res) {
            console.log("res:", res);
            if (res.code !== 1) {
                this.flag.saveheadImgFlag = false;
                fetchErrorMessage(res, "头像上传失败");
            } else {
                let url = JSON.parse(res.data)[0];
                updateUserInfo({
                    ...this.formData,
                    headImg: url
                })
                    .then(r => {
                        this.formData.headImg = url;
                        this.$message.success("头像更换成功");
                    })
                    .catch(e => {})
                    .finally(() => {
                        this.flag.saveheadImgFlag = false;
                    });
            }
        },
        sendCode() {
            // 发送验证码
            sendVcode(4, this.formData.phone)
                .then(r => {
                    this.vcodeTime = 60;
                    let int = setInterval(() => {
                        this.vcodeTime--;
                        if (this.vcodeTime < 1) {
                            clearInterval(int);
                        }
                    }, 1000);
                })
                .catch(e => {
                    fetchErrorMessage(e, "短信验证码获取失败");
                });
        },
        confirmMobile() {
            this.$refs.formData.validateField("newPhone", errorMessage => {
                if (!errorMessage) {
                    this.flag.updatePhoneFlag = true;
                    updatePhone(this.formData.phone, this.formData.vcode)
                        .then(r => {
                            this.$message.success("手机更换成功");
                            this.formData.phone = this.formData.newPhone;
                            this.formData.vcode = "";
                            this.editPhone = 1;
                        })
                        .catch(e => {
                            this.flag.updatePhoneFlag = false;
                            fetchErrorMessage(e, "更换手机号失败");
                        });
                }
            });
        },
        imageConver(path) {
            return (
                path ||
                "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            ).startsWith("http")
                ? path
                : this.imglink + path;
        },
        clickUpdatePass() {
            let result = 0;
            this.$refs.formData.validateField(
                ["oldPass", "newPass", "newPassBak"],
                errorMessage => {
                    if (!errorMessage) {
                        if (++result === 3) {
                            this.flag.updatePassFlag = true;
                            updatePass(
                                Utils.encrypt(
                                    this.formData.oldPass,
                                    "5456546874852364"
                                ),
                                Utils.encrypt(
                                    this.formData.newPass,
                                    "5456546874852364"
                                )
                            )
                                .then(r => {
                                    this.$message.success("密码修改成功");
                                })
                                .catch(e => {
                                    fetchErrorMessage(e, "密码修改失败");
                                })
                                .finally(() => {
                                    this.flag.updatePassFlag = false;
                                });
                        }
                    }
                }
            );
        },
        loadOrders() {
            flagPromise
                .bind(this)(
                    fetchAllOrder(this.orderPage),
                    "loadOrderFlag",
                    "订单获取失败"
                )
                .then(r => {
                    if (!r || r.length === 0) {
                        this.orderNoMore = true;
                        return;
                    }
                    console.log("rr:", r);
                    this.orderPage.pageNo++;
                    this.orders.push(
                        ...r.map(o => {
                            return {
                                ...o,
                                show: true
                            };
                        })
                    );
                });
        },
        clickPay(orderId) {
            this.$router.push({
                path: "/order/pay",
                query: {
                    orderId
                }
            });
        },
        clickCancelOrder(order) {
            flagPromise
                .bind(this)(
                    cancelOrder(order.orderId),
                    "cancelOrderFlag",
                    "订单取消失败"
                )
                .then(r => {
                    this.$message.success("订单取消成功");
                    order.show = false;
                });
        },
        loadMessage() {
            flagPromise
                .bind(this)(
                    fetchMessage(this.messagePage),
                    "loadMessageFlag",
                    "消息加载失败"
                )
                .then(({ result }) => {
                    if (!result || result.length === 0) {
                        this.messageNoMore = true;
                        return;
                    }
                    this.messagePage.pageNo++;
                    this.messages.push(
                        ...result.map(o => {
                            return {
                                ...o,
                                show: true
                            };
                        })
                    );
                });
        },
        messageTime1(time) {
            if (!time) {
                return "";
            }
            let date = new Date(time);
            let now = new Date();
            console.log(date.getFullYear, 9798787987);
            if (date.getFullYear() < now.getFullYear()) {
                return formatDate(date, "yyyy年MM月dd日");
            }
            if (date.getTime() < now.getTime() - 7 * 24 * 3600 * 1000) {
                return formatDate(date, "MM月dd日");
            } else {
                return {
                    0: "星期天",
                    1: "星期一",
                    2: "星期二",
                    3: "星期三",
                    4: "星期四",
                    5: "星期五",
                    6: "星期六"
                }[date.getDay()];
            }
        },
        messageTime2(time) {
            return time ? formatDate(new Date(time), "HH:mm") : "";
        },
        loadUserSetmeal() {
            flagPromise
                .bind(this)(
                    fetchUserSetmeal(),
                    "loadUserSetmealFlag",
                    "我的题库加载失败"
                )
                .then(r => {
                    this.questionBanks = r.flatMap(l => l.list);
                });
        },
        goStussss(categoryId) {
            // 点击试用 跳到刷题中心
            let kmidlist = [];
            kmidlist.push(categoryId);
            fechorder({
                list: kmidlist
            })
                .then(data => {
                    this.$router.push({ path: "/question" });
                })
                .catch(e => {
                    fetchErrorMessage(e, "点击试用失败");
                });
        }
    }
};
</script>

<style lang="css">
.userinfo {
    font-size: 18px;
    color: #666666;
}
.userinfo-row .header {
    height: 74px;
    z-index: 2;
    background-color: #fff;
}
.header .left .title {
    width: 8em;
    color: #666666;
    font-size: 16px;
    margin-right: 100px;
}
.header .left .static {
    color: #333333;
    font-size: 14px;
}
.userinfo-row .header.open {
    border-bottom: 1px dashed rgba(233, 238, 236, 1);
}
.userinfo-row .header.close {
    border-bottom: 1px solid rgba(233, 238, 236, 1);
}
.userinfo-row .header .op {
    color: #333333;
    font-size: 14px;
}
.userinfo-row .header .op > span {
    margin-right: 9px;
}
.userinfo-row .header .op > img {
    width: 12px;
    height: 12px;
}
.userinfo-detail-row {
    height: 60px;
}
.userinfo-detail-row > label {
    width: 30%;
    text-align: right;
    font-size: 14px;
    color: #7e8c85;
}
.userinfo-detail-row .input {
    width: 69%;
}
.userinfo-detail-row .input input {
    width: 20em;
}
.box-body {
    position: relative;
    border-bottom: 1px solid rgba(233, 238, 236, 1);
    margin-top: 30px;
}
.box-root {
    position: relative;
    overflow: hidden;
}
.head-body {
    height: 142px;
}
.head-body .el-avatar {
    margin-right: 29px;
}
.phone-body {
    position: relative;
    height: 180px;
    overflow: hidden;
}
.phone-body .show-box {
    padding-left: 120px;
    height: 180px;
}
.phone-body .title {
    color: #333333;
    font-size: 14px;
}
.phone-body .title .static {
    color: #7e8c85;
}
.phone-body .show-box .btn {
    margin-top: 18px;
}
.phone-body .edit-box {
    padding: 40px 0;
}
.phone-body .edit-box .vcode .el-button {
    margin-left: 19px;
}
.pass-body {
    height: 240px;
}
.input .el-form-item {
    margin-bottom: 0;
}
.head-body .el-upload-list.el-upload-list--text {
    display: none;
}
.order-box {
    margin-bottom: 20px;
    overflow: auto;
    height: 596px;
}
.order-box::-webkit-scrollbar {
    display: none;
}
.order-box .listItem {
    margin-top: 20px;
    padding-top: 10px;
    background: #fff;
    border-radius: 10px;
    padding: 30px;
}
.order-box .listItem:nth-of-type(1) {
    margin-top: 0;
}
.order-box .order-state {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;
}

.order-state-1 {
    color: #14bc91;
}
.order-state-0 {
    color: #ffab03;
}
.order-body .img {
    width: 16%;
    height: 76px;
}
.order-body .sn {
    width: 40%;
    margin-left: 4%;
}

.red {
    color: #fd4852 !important;
}
.total {
    font-size: 20px;
    font-weight: 600;
}
.order-body .sn > div,
.order-body .price > div {
    flex-grow: 1;
    font-size: 14px;
}
.order-body .sn .order-sn {
    color: #666666;
}
.order-body .sn .setmealName {
    color: #333333;
}
.order-body .price {
    width: 30%;
    margin-left: 10px;
}
.order-box .y-price {
    justify-content: flex-end;
    /* height: 61px; */
    font-size: 14px;
    color: #666666;
    margin-bottom: 20px;
}

.order-box .b-btn {
    justify-content: flex-end;
}
.order-scr {
    height: 40px;
}
.newsItem {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
}
.message-item {
    margin-top: 34px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(233, 238, 236, 1);
}
.message-item .right {
    margin-left: 24px;
}
.message-item .right .head {
    height: 38px;
}
.message-item .right .head .memssageName {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
}
.message-item .right .head .time {
    font-size: 14px;
    color: #bbbbbb;
}
.message-item .right .head .time1 {
    margin-right: 2em;
    margin-left: 27px;
}
.message-body {
    font-size: 14px;
    color: #999999;
}
.questionBank {
    border-bottom: 1px solid rgba(233, 238, 236, 1);
    padding: 15px 0;
}
.questionBank .Bankimg {
    width: 135px;
    height: 76px;
    overflow: hidden;
    border-radius: 4px;
}
.contentBox{
    background: #fff;
    padding: 20px;
    border-radius: 10px;
}
.pointer{
    font-size: 14px;
}
</style>

<style lang="css" scoped>
.box-show-1 {
    animation: box-show-1 0.5s;
}
.box-hidden-1 {
    animation: box-hidden-1 0.5s;
}
.box-show-2 {
    animation: box-show-2 0.5s;
}
.box-hidden-2 {
    animation: box-hidden-2 0.5s;
}

.box-show-3 {
    animation: box-show-3 0.5s;
}
.box-hidden-3 {
    animation: box-hidden-3 0.5s;
}

.box-show-4 {
    animation: box-show-4 0.5s;
}
.box-hidden-4 {
    animation: box-hidden-4 0.5s;
}
@keyframes box-show-1 {
    0% {
        top: -360px;
        height: 0;
    }
    100% {
        top: 0px;
        height: 360px;
    }
}

@keyframes box-hidden-1 {
    0% {
        top: 0px;
        height: 360px;
    }
    100% {
        top: -360px;
        height: 0px;
    }
}

@keyframes box-show-2 {
    0% {
        top: -142px;
        height: 0;
    }
    100% {
        top: 0px;
        height: 142px;
    }
}

@keyframes box-hidden-2 {
    0% {
        top: 0px;
        height: 142px;
    }
    100% {
        top: -142px;
        height: 0px;
    }
}

@keyframes box-show-3 {
    0% {
        top: -180px;
        height: 0;
    }
    100% {
        top: 0px;
        height: 180px;
    }
}

@keyframes box-hidden-3 {
    0% {
        top: 0px;
        height: 180px;
    }
    100% {
        top: -180px;
        height: 0px;
    }
}

@keyframes box-show-4 {
    0% {
        top: -240px;
        height: 0;
    }
    100% {
        top: 0px;
        height: 240px;
    }
}

@keyframes box-hidden-4 {
    0% {
        top: 0px;
        height: 240px;
    }
    100% {
        top: -240px;
        height: 0px;
    }
}
</style>
