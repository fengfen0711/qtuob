<template>
    <div class="pushBox" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
        <div class="twoCon">
            <p class="title_twoCon around">
                <span>附加险信息</span>
                <span class="removed" @click="deletepeople(item.$index)">删除</span>
            </p>
            <p class="title_twoCon title_twoCon1">{{tittle2}}</p>
            <div class="policyHolder">
                <p class="inputGrop clearFloat">
                    <label class="inputLabel left">保险期间</label>
                    <select class="inputText inputWidth left" v-model="periodinsurancepay1">
                        <option value="q">请选择</option>
                        <option :value="item.insuNo" v-for="item in periodinsurance1">{{item.insuRmk}}</option>
                    </select>
                </P>
                <p class="inputGrop clearFloat">
                    <label class="inputLabel left">交费期间</label>
                    <select class="inputText inputWidth left" v-model="period1">
                        <option value="q">请选择</option>
                        <option :value="item.payNo" v-for="item in peripayment1">{{item.payRmk}}</option>
                    </select>
                </P>
                <p class="inputGrop clearFloat">
                    <label class="inputLabel left">交费频率</label>
                    <select class="inputText inputWidth left" v-model="payFrequency1">
                        <option value="q">请选择</option>
                        <option :value="item.freqyNo" v-for="item in payFrequen1">{{item.freqyRmk}}</option>
                    </select>
                </P>
                <p class="inputGrop clearFloat">
                    <label class="inputLabel left">祝寿金领取年龄</label>
                    <select class="inputText inputWidth left" v-model="birthdayGold">
                        <option value="q">请选择</option>
                        <option :value="item.birthAmtNo" v-for="item in birthdayGoldby">{{item.birthAmtRmk}}</option>
                    </select>
                </p>
                <p class="inputGrop clearFloat">
                    <label class="inputLabel left">保额（元）</label>
                    <input type="number" class="inputText inputWidth left" name="text" placeholder="请输入保额" v-model="premium1" />
                </p>
                <p class="inputGrop clearFloat">
                    <label class="inputLabel left">保费（元）</label>
                    <input type="number" class="inputText inputWidth left" name="text" placeholder="请输入保费" v-model="coverage1" />
                </p>
                <!-- <span @click="select()">222</span> -->
                <!-- <span @click="select(0, $event)" :class="{'active': selectType===0}">222</span> -->
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: "fee",
    props: ['item', 'addBen', 'index', 'toCity','insuranceChildShow'],
    data() {
        return {
            sBoxShow: true,
            // 保险期间
            periodinsurancepay1: "",
            periodinsurance1: "",
            // 交费期间
            period1: "",
            peripayment1: "",
            // 交费频率
            payFrequency1: "",
            payFrequen1: "",
            // 保额
            premium1: '',
            // 保费
            coverage1: '222',
            // 祝寿金
            birthdayGold: "",
            birthdayGoldby: "",
            birthAmtAge: "",//祝寿金
            tittle2: ""//标题
        }
    },
    created() {
        this.cvrgList_init()
    },
    methods: {
        select() {
            let type = this.coverage1
            this.$emit('onSelectType', type)
            console.log(type)
        },
        cvrgList_init() {
            var data = {
                "cvrgExtType": "3",
                "prodCode": this.$route.query.prodCode,
            }
            Indicator.open();

            this.$http.post('http://192.168.171.12:9007' + "/cvrg/cvrglist", data).then(res => {
                Indicator.close();
                // console.log(JSON.stringify(res.data));
                this.tittle2 = res.data.output[0].cvrgName;//标题
                this.periodinsurance1 = res.data.output[0].insuPeriodList; //保险期间
                this.periodinsurancepay1 = "q"
                this.peripayment1 = res.data.output[0].payPeriodList; //交费期间
                this.period1 = "q"
                this.payFrequen1 = res.data.output[0].payFreqyList; //交费频率
                this.payFrequency1 = "q"
                this.birthdayGoldby = res.data.output[0].birthAmtList; //祝寿金
                this.birthdayGold = "q"
                if (this.birthdayGold == "70岁开始领取祝寿金") {
                    this.birthAmtAge = res.data.output[0].birthAmtList[0].birthAmtNo;
                } else if (this.birthdayGold == "75岁开始领取祝寿金") {
                    this.birthAmtAge = res.data.output[0].birthAmtList[1].birthAmtNo;
                } else if (this.birthdayGold == "79岁开始领取祝寿金") {
                    this.birthAmtAge = res.data.output[0].birthAmtList[2].birthAmtNo;
                } else if (this.birthdayGold == "88岁开始领取祝寿金") {
                    this.birthAmtAge = res.data.output[0].birthAmtList[3].birthAmtNo;
                }
            }, res => {
                Indicator.close();
                console.log("===失败1" + res.data)
            });
        },
        childSay() {
            if (this.periodinsurancepay1 == "q") {
                return '请选择保险期间';
            }
            if (this.period1 == "q") {
                return '请选择交费期间';
            }
            if (this.payFrequency1 == "q") {
                return '请选择交费频率';
            }
            if (this.birthdayGold == "q") {
                return '请选择祝寿金领取年龄';
            }
            if (this.premium1 == "" || this.premium1 == undefined) {
                return '请输入保额';
            }
            if (this.coverage1 == "" || this.coverage1 == undefined) {
                return '请输入保费';
            }
            return true;
        },
        toBenefitShow(msg) {
            if (this.childSay() == true) {
                console.log("校验通过")
                return true
            } else {
                let message = this.childSay()
                Toast(message)
                return false
            }
        },
        deletepeople(data) {
            console.log("删除" + data);
            // for(var i = 0; i < this.addBen.length; i++) {
            // if(this.addBen[i].id == data) {
            this.addBen.splice(data, 1);
            // }
            // }
            this.insuranceChildShow = false;
            console.log(this.insuranceChildShow)
            Toast("删除成功！")
        },

    }
}
</script>

<style scoped="scoped">
.ctc_div_listitemleft {
    float: left;
    display: block;
}

.pr_img_item {
    margin-top: 0.07rem;
    display: block;
    float: left;
    width: 0.64rem;
    height: 0.64rem;
}

.ctc_div_listitemall {
    width: 90%;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #8E8E93;
}

.ctc_div_list {
    margin-top: 0.3rem;
    width: 100%;
    height: 6rem;
    overflow-y: scroll;
    border-top: 0.01rem solid #8E8E93;
}

.span_cancel {
    display: block;
    float: left;
    margin-left: 0.4rem;
    font-size: 0.32rem;
    color: #EB6067;
}

.span_ok {
    display: block;
    float: right;
    margin-right: 0.4rem;
    font-size: 0.32rem;
    color: #EB6067;
}

.ctc_div_mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.40);
}

.ctc_div_maskitem {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 7rem;
    padding-top: 0.32rem;
    background: #ffffff;
}

.ctc_div_title {
    width: 100%;
    margin: 0 auto;
    font-size: 0.32rem;
    text-align: center;
    color: #555555;
}

.left {
    float: left;
}

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

select {
    padding-right: 0.48rem;
    border: none;
    background: none;
    background: url(/static/upDown.png) no-repeat right center;
    background-size: 0.4rem 0.45rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.clearFloat:after {
    height: 0;
    display: block;
    overflow: hidden;
    visibility: hidden;
    clear: both;
    content: "";
}

.one {
    position: absolute;
    width: 100%;
    min-height: 100%;
    background: #F3F3F3;
}

.twoCon {
    margin-top: 0.4rem;
    padding: 0 0.4rem;
    font-size: 0.32rem;
    color: #222222;
    background: #FFFFFF;
}

.one .twoCon:first-child {
    margin-top: 0;
}

.title_twoCon {
    height: 0.84rem;
    line-height: 0.84rem;
    padding-top: 0.28rem;
    font-size: 0.32rem;
    font-weight: bold;
    color: #222222;
}

.title_twoCon1 {
    padding: 0;
    color: #C9141E;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
}

.borderNone {
    border: none;
}

.titleLable_twoCon {
    display: inline-block;
    font-size: 0.34rem;
    font-weight: bold;
    color: #222222;
}

.btnBox {
    padding-top: 0.92rem;
    padding-bottom: 1.16rem;
    text-align: center;
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

.inputGrop1 {
    font-size: 0.28rem;
    border-bottom: solid 0.01rem #C8C7CC;
}

.inputGrop {
    position: relative;
    height: 0.88rem;
    font-size: 0.28rem;
    border-bottom: solid 0.01rem #C8C7CC;
}

.inputGrop2 {
    background: #ffffff;
    height: 0.88rem;
    font-size: 0.28rem;
}

.inputLabel {
    display: block;
    width: 3.22rem;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #555555;
}

.inputLabel2 {
    display: block;
    width: 3.22rem;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #555555;
    margin-left: 0.45rem;
}

.inputText {
    height: 0.88rem;
    font-size: 0.28rem;
    color: #333333;
}

.inputSpan {
    display: inline-block;
    line-height: 0.88rem;
}

.inputWidth {
    width: 3.48rem;
}

.dateBox {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    display: block;
    height: 0.88rem;
    padding: 0 0.26rem;
    line-height: 0.88rem;
    background: #FFFFFF;
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

input[type=date]::-webkit-inner-spin-button {
    visibility: hidden;
}

input[type=date]::-webkit-calendar-picker-indicator {
    width: 0;
    height: 0;
    opacity: 0;
}

input[type=date]::-webkit-clear-button {
    visibility: hidden;
}

.twoCon .inputGrop:last-child {
    border: none;
}

.sexImg {
    float: left;
    display: inline-block;
    width: 0.48rem;
    height: 0.48rem;
    margin-top: 0.2rem;
    margin-right: 0.06rem;
}

.sex label {
    display: inline-block;
    float: left;
}

.sex {
    display: inline-block;
    height: 0.88rem;
    margin-right: 0.46rem;
}

.sexM {
    margin-right: 0.46rem;
}

.pushBox {
    margin: 0.4rem 0;
}

.pushBtn {
    display: block;
    width: 100%rem;
    height: 0.88rem;
    line-height: 0.88rem;
    margin: 0 auto;
    font-size: 0.28rem;
    font-weight: bold;
    color: #C9141E;
    background: #FFFFFF;
    border-radius: 0.16rem;
    text-align: center;
}

.sBox {
    margin-top: 0.34rem;
    margin-left: 0.4rem;
    margin-bottom: 0.44rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
}

.sImg {
    display: block;
    width: 0.48rem;
    height: 0.48rem;
    margin-top: -0.04rem;
}

.around {
    display: flex;
    justify-content: space-between;
}

.removed {
    color: #C9141E;
}
</style>