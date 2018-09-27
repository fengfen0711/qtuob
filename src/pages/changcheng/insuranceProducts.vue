<template>
    <div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
        <div>
            <div class="twoCon">
                <p class="title_twoCon">主险信息</p>
                <p class="title_twoCon title_twoCon1">{{tittle1}}</p>
                <div class="policyHolder">
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">保险期间</label>
                        <select class="inputText inputWidth left" v-model="periodinsurancepay">
                            <option value="q">请选择</option>
                            <option :value="item.insuNo" v-for="item in periodinsurance">{{item.insuRmk}}</option>
                        </select>
                    </P>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">交费期间</label>
                        <select class="inputText inputWidth left" v-model="period">
                            <option value="q">请选择</option>
                            <option :value="item.payNo" v-for="item in peripayment">{{item.payRmk}}</option>
                        </select>
                    </P>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">交费频率</label>
                        <select class="inputText inputWidth left" v-model="payFrequency">
                            <option value="q">请选择</option>
                            <option :value="item.freqyNo" v-for="item in payFrequen">{{item.freqyRmk}}</option>
                        </select>
                    </P>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">保额（元）</label>
                        <input type="number" class="inputText inputWidth left" name="text" placeholder="请输入保额" v-model="premium" v-on:input="amuntall" />
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">保费（元）</label>
                        <input type="number" class="inputText inputWidth left" name="text" placeholder="请输入保费" v-model="coverage" />
                    </p>

                </div>
            </div>
            <!-- <InsuranceChild v-if="insuranceChildShow" ref="insuranceChild" :addIndex="addIndex" @deletId="deletBen" @child_saya="listenToMyChild" @onSelectType="onSelectType" :addBen="addBen" v-for="(item,index) in addBen" :key="item.key" :item="item" :index="index" :insuranceChildShow="insuranceChildShow"></InsuranceChild> -->

            <div class="twoCon" v-if="insuranceShow">
                <p class="title_twoCon around">
                    <span>附加险信息</span>
                    <span class="removed" @click="deletepeople">删除</span>
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
                        <input type="number" class="inputText inputWidth left" name="text" placeholder="请输入保额" v-model="premium1" v-on:input="amuntall1" />
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">保费（元）</label>
                        <input type="number" class="inputText inputWidth left" name="text" placeholder="请输入保费" v-model="coverage1" />
                    </p>
                </div>
            </div>

            <p class="pushBox">
                <span class="pushBtn" @click="removed">添加附加险</span>
            </p>
            <p class="inputGrop2 clearFloat">
                <label class="inputLabel2 left">首期保费（元）</label>
                <span class="inputText inputSpan inputWidth left">{{covermoney}}</span>
            </p>
            <div class="sBox clearFloat " @click="openClick">
                <img src="/static/noSelected.png" class="sImg left" v-if="sBoxShow" />
                <img src="/static/selected.png" class="sImg left" v-if="!sBoxShow" />
                <span class="sDes">我已阅读
                    <span class="book" style="color: #240000;">《保险条款》、</span>
                    <span class="book" style="color: #240000;">《客户委托书》</span>，将如实 填写各项投保信息。
                </span>
            </div>
            <p class="btnBox">
                <span class="btn btn1">保存并分享</span>
                <span class="btn" @click="toBenefitShow">下一步</span>
            </p>
            <!-- <p @click="onSelectType">111</p> -->
        </div>
    </div>
</template>

<script>
// import InsuranceChild from './insuranceChild.vue'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: "",
    data() {
        return {
            sBoxShow: true,
            // insuranceChildShow: true,
            // addIndex: false,
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
            coverage1: '',
            // 祝寿金
            birthdayGold: "",
            birthdayGoldby: "",
            birthAmtAge: "",//祝寿金
            tittle2: "",//标题
            // addBen: [],
            // 保险期间
            periodinsurancepay: "",
            periodinsurance: "",
            // 交费期间
            period: "",
            peripayment: "",
            // 交费频率
            payFrequency: "",
            payFrequen: "",
            // 保额
            premium: '',
            // 保费
            coverage: '',
            cvrgCode: "", //险种代码
            plantename: "", //险种名称
            cvrgCode1: "", //险种代码
            plantename1: "", //险种名称
            payFlag: "", //交费年期单位
            // birthday: "", //被保险人出生日期
            covermoney: "", //保费合计
            insuNo: "",//保险期间代码
            cvrgType: "",
            insuFlag: "",
            freqyNo: "",
            payNo: "",
            atmnum: "", //份数
            atmnum1: "", //份数
            nextFlag: false,
            selectType: 0,
            tittle1: "",
            insuNo1: "",
            cvrgType1: "",
            insuFlag1: "",
            payFlag1: "",
            freqyNo1: "",
            payNo1: "",
            insuranceShow: true
        }
    },
    created() {
        this.cvrgList_init();
        // this.feement();
    },
    methods: {
        init() {
            var data = {
                "token": this.$store.state.token,
                "userId": this.$store.state.userId,
                "head": {
                    "channelCode": "qtb_h5",
                    "deptCode": this.$route.query.cmpCode,
                    "oprCode": this.$store.state.userId,
                    "prodCode": this.$route.query.prodCode
                },
                "opt": "INSRNT,CVRG,MAIN",
                "pkgNo": this.$route.query.orderNo, //订单号
            }
            console.log(JSON.stringify(data))
            this.$http.post(this.$store.state.link6 + '/order/v1/queryorder', data)
                .then(res => {
                    console.log(res.data);
                    var dataCode = res.data.code;
                    console.log(JSON.stringify(res.data));
                    if (dataCode == "SYS_S_000") {
                        // this.allData = res.data.output;
                        this.main = res.data.output.mainResp;
                        //console.log(res.data.output.mainResp);
                        this.periodinsurancepay = res.data.output.cvrgResp[0].insuNo;//保险期间
                        this.period = res.data.output.cvrgResp[0].payNo; //交费期间
                        this.payFrequency = res.data.output.cvrgResp[0].freqyNo;//交费频率
                        this.premium = res.data.output.cvrgResp[0].amnt; //保额
                        this.coverage = res.data.output.cvrgResp[0].prem; //保费

                        this.periodinsurancepay1 = res.data.output.cvrgResp[1].insuNo;//保险期间
                        this.period1 = res.data.output.cvrgResp[1].payNo; //交费期间
                        this.payFrequency1 = res.data.output.cvrgResp[1].freqyNo;//交费频率
                        this.birthdayGold = res.data.output.cvrgResp[1].birthAmtAge;//祝寿金
                        this.premium1 = res.data.output.cvrgResp[1].amnt; //保额
                        this.coverage1 = res.data.output.cvrgResp[1].prem; //保费

                        this.covermoney = this.main.amnt;//保费合计
                        this.sBoxShow = false;
                    } else {
                        Toast(res.data.desc);
                    }

                }, res => {
                    console.log(res.data);
                })
        },
        // onSelectType(type) {
        //     this.selectType = type
        //     console.log(this.selectType)
        // },
        deletepeople() {
            this.insuranceShow = false
        },
        removed() {
            if (this.insuranceShow == true) {
                Toast("暂无可添加的附加险")
            } else if (this.insuranceShow == false) {
                this.insuranceShow = true
            }
        },
        listenToMyChild(...data) {
            this.nextFlag = data[0];
        },
        deletBen(...data) {
            for (var i = 0; i < this.addBen.length; i++) {
                if (this.addBen[i].id == data[0]) {
                    this.addBen.splice(i, 1);
                }
            }
            if (this.addBen.length < 3) {
                this.addFlag = false;
            }
        },
        // listenToMyChild(...data) {
        //     console.log("data" + JSON.stringify(data))
        //     this.allData.push(data[0])
        // },
        cvrgList_init() {
            var data = {
                "cvrgExtType": "3",
                "prodCode": this.$route.query.prodCode,
            }
            Indicator.open();

            this.$http.post('http://192.144.139.88:9002' + "/prd/cvrg/cvrglist", data).then(res => {
                Indicator.close();
                console.log(JSON.stringify(res.data));

                this.tittle1 = res.data.output[1].cvrgName;//标题
                this.periodinsurance = res.data.output[1].insuPeriodList; //保险期间
                this.periodinsurancepay = "q"
                this.peripayment = res.data.output[1].payPeriodList; //交费期间
                this.period = "q"
                this.payFrequen = res.data.output[1].payFreqyList; //交费频率
                this.payFrequency = "q"
                for (let i = 0; i < res.data.output[1].payPeriodList.length; i++) {
                    if(res.data.output[1].payPeriodList[i].payNo == "B1"){
                        this.payFrequency = res.data.output[1].payFreqyList[0].freqyRmk;
                    } else {
                        this.payFrequency = res.data.output[1].payFreqyList[1].freqyRmk;
                    }
                }
                this.cvrgCode = res.data.output[1].cvrgCode; //险种代码
                this.plantename = res.data.output[1].cvrgName; //险种名称
                this.cvrgCode1 = res.data.output[0].cvrgCode; //险种代码
                this.plantename1 = res.data.output[0].cvrgName; //险种名称
                this.insuNo = res.data.output[1].insuPeriodList[0].insuNo;//保险期间代码
                this.cvrgType = res.data.output[1].cvrgType;
                this.insuFlag = res.data.output[1].insuPeriodList[0].insuFlag;
                this.payFlag = res.data.output[1].payPeriodList[0].payFlag;
                for (var i = 0; i < res.data.output[1].payFreqyList.length; i++) {
                    this.freqyNo = res.data.output[1].payFreqyList[i].freqyNo;
                    // if (res.data.output[0].payFreqyList[i].freqyRmk == "趸缴") {
                    //     this.freqyNo = res.data.output[0].payFreqyList[i].freqyNo;
                    // }
                }
                for (var i = 0; i < res.data.output[1].payPeriodList.length; i++) {
                    this.payNo = res.data.output[1].payPeriodList[i].payNo;
                }

                this.tittle2 = res.data.output[0].cvrgName;//标题
                this.periodinsurance1 = res.data.output[0].insuPeriodList; //保险期间
                this.periodinsurancepay1 = "q"
                this.peripayment1 = res.data.output[0].payPeriodList; //交费期间
                this.period1 = "q"
                this.payFrequen1 = res.data.output[0].payFreqyList; //交费频率
                this.payFrequency1 = "q"
                this.birthdayGoldby = res.data.output[0].birthAmtList; //祝寿金
                this.birthdayGold = "q"
                for (var i = 0; i < res.data.output[0].birthAmtList.length; i++) {
                    this.birthAmtAge = res.data.output[0].birthAmtList[i].birthAmtNo;
                }
                this.insuNo1 = res.data.output[0].insuPeriodList[0].insuNo;//保险期间代码
                this.cvrgType1 = res.data.output[0].cvrgType;
                this.insuFlag1 = res.data.output[0].insuPeriodList[0].insuFlag;
                this.payFlag1 = res.data.output[0].payPeriodList[0].payFlag;
                for (var i = 0; i < res.data.output[0].payFreqyList.length; i++) {
                    this.freqyNo1 = res.data.output[0].payFreqyList[i].freqyNo;
                }
                for (var i = 0; i < res.data.output[0].payPeriodList.length; i++) {
                    this.payNo1 = res.data.output[0].payPeriodList[i].payNo;
                }
                this.init()
            }, res => {
                Indicator.close();
                console.log("===失败1" + res.data)
            });
        },
        //已经阅读
        openClick() {
            this.sBoxShow = !this.sBoxShow;
        },
        amuntall() {
            var patrn = /^[0-9]*$/;
            if (this.periodinsurancepay == "q") {
                Toast('请选择保险期间');
            } else if (this.period == "q") {
                Toast("请选择交费期间");
            } else if (this.peripaymentpay == "q") {
                Toast("请选择缴费期间");
            } else if (this.payFrequency == "q") {
                Toast("请选择交费频率");
            } else if (this.premium == "" || this.premium == undefined) {
                Toast("请输入保额");
            } else if (!patrn.test(this.premium)) {
                Toast("保额必须为纯数字");
                return;
            } else {
                if (this.premium.length >= 5) {
                    if (parseInt(this.coverage % 1000) == 0) {
                        this.atmnum = parseInt(this.premium / 1000)
                        this.feement();
                    } else {
                        Toast("保费应为1000的整数倍");
                    }
                } else {
                    this.coverage = "";
                }

            }
        },
        amuntall1() {
            var patrn = /^[0-9]*$/;
            if (this.periodinsurancepay1 == "q") {
                Toast('请选择保险期间');
            } else if (this.period1 == "q") {
                Toast("请选择交费期间");
            } else if (this.peripaymentpay1 == "q") {
                Toast("请选择缴费期间");
            } else if (this.payFrequency1 == "q") {
                Toast("请选择交费频率");
            } else if (this.birthdayGold == "q") {
                Toast("请选择祝寿金领取年龄");
            } else if (this.premium1 == "" || this.premium1 == undefined) {
                Toast("请输入保额");
            } else if (!patrn.test(this.premium1)) {
                Toast("保额必须为纯数字");
                return;
            } else {
                if (this.premium1.length >= 5) {
                    if (parseInt(this.coverage1 % 1000) == 0) {
                        this.atmnum1 = parseInt(this.premium1 / 1000)
                        this.feement1();
                    } else {
                        Toast("保费应为1000的整数倍");
                    }
                } else {
                    this.coverage1 = "";
                }

            }
        },
        // 保费试算
        feement() {
            var patrn = /^[0-9]*$/;
            if (this.premium == "") {
                return;
            }
            if (!patrn.test(this.premium)) {
                Toast("保额必须为纯数字")
                return;
            }
            var data = {
                "userId": this.$store.state.userId,
                "token": this.$store.state.token,
                "cvrgResp": [{
                    "calcPremType": "1",
                    "cvrgCode": this.cvrgCode,
                    "cvrgName": this.plantename,
                    "cvrgNo": this.cvrgCode,
                    "cvrgType": this.cvrgType,
                    "insuFlag": this.insuFlag,
                    "insuNo": this.insuNo,
                    "payFlag": this.payFlag,
                    "freqyNo": this.freqyNo,
                    "payNo": this.payNo,
                    "amnt": this.premium,
                    // "birthAmtAge": this.birthAmtAge
                }],
                "head": {
                    "channelCode": "qtb_h5",
                    "deptCode": this.$route.query.cmpCode,
                    "oprCode": this.$store.state.userId,
                    "prodCode": this.$route.query.prodCode,

                },

                "insrntResp": {
                    "age": this.$route.query.age,
                    "birthday": this.$route.query.birthDatea,
                    "gender": this.$route.query.genderFlaga
                },
                "mainResp": {
                    "agentCode": "test",
                    "deptCode": this.$route.query.cmpCode,
                    "pkgNo": this.$route.query.orderNo,
                    "prodCode": this.$route.query.prodCode,
                    "prodName": this.plantename,
                    "prodNo": this.$route.query.prodNo,
                    "userId": this.$store.state.userId
                }

            }
            Indicator.open();

            console.log(JSON.stringify(data))
            this.$http.post(this.$store.state.link6 + "/calc/v1/prenium", data).then(res => {
                Indicator.close();
                console.log(JSON.stringify(res.data));
                if (res.data.code == "SYS_S_000") {
                    console.log(res.data.output);
                    if (res.data.output.code == "SSE00001") {
                        Toast(res.data.output.message);
                    } else if (res.data.output.code == "SSI00000") {
                        this.coverage = res.data.output.cvrgList[0].prem;
                        this.covermoney = this.coverage + this.coverage1;
                        // console.log(this.coverage)
                    }
                } else {
                    Toast(res.data.desc)
                }
            }, res => {
                Indicator.close();
                console.log("2===失败1" + res.data)
            });
        },
        // 保费试算
        feement1() {
            var patrn1 = /^[0-9]*$/;
            if (this.premium1 == "") {
                return;
            }
            if (!patrn1.test(this.premium1)) {
                Toast("保额必须为纯数字")
                return;
            }
            var data = {
                "userId": this.$store.state.userId,
                "token": this.$store.state.token,
                "cvrgResp": [{
                    "calcPremType": "1",
                    "cvrgCode": this.cvrgCode1,
                    "cvrgName": this.plantename1,
                    "cvrgNo": this.cvrgCode1,
                    "cvrgType": this.cvrgType1,
                    "insuFlag": this.insuFlag1,
                    "insuNo": this.insuNo1,
                    "payFlag": this.payFlag1,
                    "freqyNo": this.freqyNo1,
                    "payNo": this.payNo1,
                    "amnt": this.premium1,
                    "birthAmtAge": this.birthAmtAge
                }],
                "head": {
                    "channelCode": "qtb_h5",
                    "deptCode": this.$route.query.cmpCode,
                    "oprCode": this.$store.state.userId,
                    "prodCode": this.$route.query.prodCode,

                },

                "insrntResp": {
                    "age": this.$route.query.age,
                    "birthday": this.$route.query.birthDatea,
                    "gender": this.$route.query.genderFlaga
                },
                "mainResp": {
                    "agentCode": "test",
                    "deptCode": this.$route.query.cmpCode,
                    "pkgNo": this.$route.query.orderNo,
                    "prodCode": this.$route.query.prodCode,
                    "prodName": this.plantename1,
                    "prodNo": this.$route.query.prodNo,
                    "userId": this.$store.state.userId
                }

            }
            Indicator.open();

            console.log(JSON.stringify(data))
            this.$http.post(this.$store.state.link6 + "/calc/v1/prenium", data).then(res => {
                Indicator.close();
                console.log(JSON.stringify(res.data));
                if (res.data.code == "SYS_S_000") {
                    console.log(res.data.output);
                    if (res.data.output.code == "SSE00001") {
                        Toast(res.data.output.message);
                    } else if (res.data.output.code == "SSI00000") {
                        this.coverage1 = res.data.output.cvrgList[0].prem;
                        this.covermoney = this.coverage + this.coverage1;
                        // console.log(this.coverage)
                    }
                } else {
                    Toast(res.data.desc)
                }
            }, res => {
                Indicator.close();
                console.log("2===失败1" + res.data)
            });
        },
        toBenefitShow() {
            if (this.periodinsurancepay == "q") {
                Toast('请选择保险期间');
                return;
            }
            if (this.period == "q") {
                Toast('请选择交费期间');
                return;
            }
            if (this.payFrequency == "q") {
                Toast('请选择交费频率');
                return;
            }
            if (this.premium == "" || this.premium == undefined) {
                Toast('请输入保额');
                return;
            }
            if (this.coverage == "" || this.coverage == undefined) {
                Toast('请输入保费');
                return;
            }
            if (this.periodinsurancepay1 == "q") {
                Toast('请选择保险期间');
                return;
            }
            if (this.period1 == "q") {
                Toast('请选择交费期间');
                return;
            }
            if (this.payFrequency1 == "q") {
                Toast('请选择交费频率');
                return;
            }
            if (this.birthdayGold == "q") {
                Toast('请选择祝寿金领取年龄');
                return;
            }
            if (this.premium1 == "" || this.premium1 == undefined) {
                Toast('请输入保额');
                return;
            }
            if (this.coverage1 == "" || this.coverage1 == undefined) {
                Toast('请输入保费');
                return;
            }
            if (this.sBoxShow == true) {
                Toast('请阅读条款');
                return;
            }
            // let errorMessage = ""
            // for (let index = 0; index < this.$refs.insuranceChild.length; index++) {
            //     errorMessage = this.$refs.insuranceChild[index].toBenefitShow("lll")
            //     console.log(errorMessage)
            //     if (!errorMessage) break
            // }
            // if (errorMessage == true || errorMessage == "") {
            //     console.log("下一步")
            //     this.goSave()
            // } else if (errorMessage == false) {
            //     return
            // }
            // console.log(JSON.stringify(errorMessage))
            this.goSave()
        },
        // 下一步
        goSave() {
            var data = {
                "head": {
                    "channelCode": "qtb_h5",
                    "deptCode": this.$route.query.cmpCode,
                    "oprCode": this.$store.state.userId,
                    "prodCode": this.$route.query.prodCode
                },
                "userId": this.$store.state.userId,
                "token": this.$store.state.token,
                "insrntReq": {
                    "age": this.$route.query.age,
                    "birthday": this.$route.query.birthDatea,
                    "gender": this.$route.query.genderFlaga
                },
                "cvrgReq": [{
                    "mainCvrgNo": this.plantename,
                    "amnt": this.premium,
                    "cvrgCode": this.cvrgCode,
                    "cvrgName": this.plantename,
                    "cvrgNo": this.cvrgNo,
                    "cvrgType": "M",
                    "freqyNo": this.payFrequency,
                    "insuFlag": this.insuFlag,
                    "insuNo": this.periodinsurancepay,
                    "payFlag": this.payFlag,
                    "payNo": this.period,
                    "prem": this.coverage,
                    "calcPremType": "1"
                }, {
                    "mainCvrgNo": this.plantename1,
                    "amnt": this.premium1,
                    "cvrgCode": this.cvrgCode1,
                    "cvrgName": this.plantename1,
                    "cvrgNo": this.cvrgNo1,
                    "cvrgType": "M",
                    "freqyNo": this.payFrequency1,
                    "insuFlag": this.insuFlag1,
                    "insuNo": this.periodinsurancepay1,
                    "payFlag": this.payFlag1,
                    "payNo": this.period1,
                    "prem": this.coverage1,
                    "calcPremType": "1",
                    "birthAmtAge": this.birthdayGold
                }],
                "mainReq": {
                    //						    "agentCode": this.$store.state.brokerInfo.brokerId,
                    //						    "agentDeptCode": this.$store.state.brokerInfo.brokerName,
                    //							"agentCode": mainAgentCode, //代理人代码 
                    "agentCode": "test",
                    //							"agentName": mainAgentName, //代理人名称 
                    //							"deptCode": "000300",
                    //							"agentDeptCode": this.$store.state.userInfo.brokerId, //代理机构
                    "agentName": "test", //代理人名称 
                    "deptCode": "000300",
                    "agentDeptCode": this.plantename, //代理机构
                    "amnt": this.covermoney,
                    "cmpCode": this.$route.query.cmpCode,
                    "prem": this.coverage,
                    "prodCode": this.$route.query.prodCode,
                    "prodName": this.plantename,
                    "prodNo": this.$route.query.prodNo,
                    "sumAmnt": this.covermoney, //保额合计 ,
                    "sumPrem": this.coverage, //保费合计 
                    "lowFlag": "A", //法定受益人标识 A-是;B-否 
                    "userId": this.$store.state.userId

                },
                "insuranceDutyReq": [{
                    "calMode": "1",
                    "clatmCoinsurance": "1",
                    "cvrgNo": this.$route.query.prodNo,
                    "dutyCode": this.$route.query.prodCode,
                    "dutyNo": "017B30",
                    "dutyPrem": this.coverage,
                    "dutyAmnt": this.covermoney,
                    "mult": "1",
                }],
                "mark": "CALC",
                "opt": "INSRNT,CVRG,MAIN,DUTY",
                "pkgNo": this.$route.query.orderNo,

            }
            console.log(JSON.stringify(data))
            Indicator.open();
            this.$http.post(this.$store.state.link6 + '/order/v1/saveorder', data).then(res => {
                Indicator.close();
                console.log(JSON.stringify(res.data));
                if (res.data.code == "SYS_S_000") {
                    this.$router.push('/benefitShow?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode + '&appName=' + this.$route.query.appName + '&appNamea=' + this.$route.query.appNamea + '&covermoney=' + this.$route.query.covermoney);
                }
            }, res => {
                Indicator.close();
                console.log("2===失败1" + res.data)
            });
        }
    },
    components: {
        // InsuranceChild
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
    width: 3rem;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #555555;
}

.inputLabel2 {
    display: block;
    width: 3rem;
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
    width: 3.68rem;
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