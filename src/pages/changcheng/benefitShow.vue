<template>
    <div class="window" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
        <ul class="btns">
             <li class="btnsli" :class="{ 'active': $index == index }" v-for="(page, $index) in sliders" :key="page.index" 
                @click="handleChange(page.index)">
                 {{page.name}}
            </li>
        </ul>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(page, $index) in sliders" :key="page.id">
                <benefitPlan v-if="$index==0"></benefitPlan>
                <!-- <benefitDec v-if="$index==1"></benefitDec> -->
                <benefitTable v-if="$index==1"></benefitTable>
            </swiper-slide>
        </swiper>
        <p class="btnBox">
            <span class="btn btn1" @click="last">上一步</span>
            <span class="btn" @click="next">下一步</span>
        </p>
    </div>
</template>
 
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import benefitPlan from './benefitPlan'
import benefitDec from './benefitDec'
import benefitTable from './benefitTable'
import Vue from 'vue'
export default {
    name: '',
    components: {
        swiper,
        swiperSlide,
        benefitPlan,
        benefitDec,
        benefitTable,
    },
    data() {
        let that = this;
        return {
            index: 0,
            swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                // swiper configs 所有的配置同swiper官方api配置
                autoplay: 3000,
                speed: 50,
                direction : 'horizontal',
                grabCursor : true,
                setWrapperSize :true,
                autoHeight: true,
                pagination : '.swiper-pagination',
                paginationClickable :true,
                prevButton:'.swiper-button-prev',//上一张
                nextButton:'.swiper-button-next',//下一张
                scrollbar:'.swiper-scrollbar',//滚动条
                mousewheelControl : true,
                observeParents:true,
                // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                debugger: true,
                noSwipingClass: 'ruler-container',
                on: {
                    slideChangeTransitionEnd: function(){
                        that.changePages(this.activeIndex)
                        console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                        console.log(that.index);//切换结束时，告诉我现在是第几个slide
                    },
                },
            },
            sliders:[
                {
                    "name":"保障计划",
                    "index":"0"
                },
                // {
                //     "name":"利益说明",
                //     "index":"1"
                // },
                {
                    "name":"利益表",
                    "index":"1"
                }
            ]
        }
    },
    created() {

    },
    methods: {
        next(){
            this.$router.push('/policyHolders?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode + '&occupation=' + this.$route.query.occupation + '&occupaCode=' + this.$route.query.occupaCode + '&occupation1=' + this.$route.query.occupation1 + '&occupaCode1=' + this.$route.query.occupaCode1+ '&appName=' + this.$route.query.appName + '&appNamea=' + this.$route.query.appNamea);
        },
        last(){
            window.history.go(-1)
        },
        handleChange(index){
            this.index = index
            // console.log('this is current swiper instance object', this.swiper)
            this.swiper.slideTo(index, 300, false)
            window.scrollTo(0,0)
        },
        changePages(index){
            this.index = index
            window.scrollTo(0,0)
        },
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
}
</script>
 
<style scoped="scoped">
.right {
    float: right;
}

input,
button {
    background: none;
    border: none;
}

input,
button {
    outline: none;
}

input::-ms-clear {
    display: none;
    width: 0;
    height: 0;
}

input::-ms-reveal {
    display: none;
}

textarea::-webkit-input-placeholder,
input::-webkit-input-placeholder {
    color: #B2B2B2;
}

input:-ms-input-placeholder {
    color: #B2B2B2;
}

.window {
    position: absolute;
    width: 100%;
    min-height: 100%;
    background: #F3F3F3;
}

.btns {
    display: flex;
    width: 90%;
    margin-left: 5%;
    margin-top: 0.32rem;
    border: 1px solid #EB7760;
    overflow: hidden;
    border-radius: 0.1rem;
    position: fixed;
    z-index: 10;
    background:#ffffff;
}

.btnsli {
    width: 50%;
    height: 0.56rem;
    line-height: 0.56rem;
    text-align: center;
    color: #EB7760;
    border-left: 1px solid #EB7760;
}

.btns li:first-child {
    border-left: none;
}

.active {
    background: #EB7760;
    color: #ffffff;
}

.inputSpan {
    display: inline-block;
    line-height: 0.88rem;
    color: #555555;
    font-weight: bold;
}

.dateB {
    position: absolute;
    right: 0;
    top: 0rem;
    z-index: -1;
    /*下箭头隐藏变1*/
    width: 0.5rem;
    height: 0.88rem;
    background: #FFFFFF;
}

.upDownImg {
    width: 0.4rem;
    height: 0.44rem;
    margin-top: 0.2rem;
}

.btnBox {
    padding-top: 0.92rem;
    padding-bottom: 1.16rem;
    text-align: center;
}

.lis{
    margin-left: -100%;
}

.btn {
    display: inline-block;
    width: 3.12rem;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.32rem;
    border: 0.02rem solid #C9141E;
    border-radius: 0.88rem;
    background: #C9141E;
    color: #FFFFFF;
    text-align: center;
}

.btn1 {
    background: none;
    border: 0.02rem solid #C9141E;
    color: #C9141E;
    margin-right: 0.3rem;
}
</style>