<template>
    <div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
        <div v-if="!select_flag" class="ctc_div_mask" style="z-index: 100;">
            <div ref="ctc_div_markcenctinput" class="ctc_div_markcenct">
                <div class="ctc_div_query">
                    <img class="prd_img_query" src="/static/qijianwei/SearchGlyph.png" @click="queryName" />
                    <input v-model="oName" class="prd_input_query" type="text" placeholder="关键词搜索" @change="queryName" @focus="markcenctinput" />
                </div>
                <div class="ctc_div_queryitem">
                    <div class="ctc_div_queryitemall">
                        <mt-loadmore :bottom-method="loadBottomUse" :bottom-all-loaded="allUseLoad" :bottomPullText='bottomText' ref="loadmore">
                            <div ref="sss" v-for="(item,index) in arrItem" class="ctc_div_item">
                                <img :code="index1" @click="selectitem($event,index)" class="pr_img_item1" :src="index1==index ?  selectImg:unselectImg" />
                                <span class="pr_span_title marRightitem">{{item.parName}}</span>
                                <span class="pr_span_title marRightitem">{{item.plName}}</span>
                                <span class="pr_span_title">{{item.plCode}}</span>
                                <span v-show="false" class="pr_span_title">{{item.parCode}}</span>
                            </div>
                        </mt-loadmore>
                    </div>
                    <div class="ctc_div_bottombtn">
                        <span @click="cancelOccupationSelect('1')" class="ctc_span_clear">取消</span>
                        <span @click="cancelOccupationSelect('2')" class="ctc_span_ok">确定</span>
                    </div>
                </div>

            </div>
        </div>

        <div id="blur_all" ref="blur">
            <div class="twoCon">
                <p class="title_twoCon clearFloat">
                    <label class="left">投保人基本信息</label>
                </p>
                <div>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">姓名</label>
                        <input type="text" class="inputText inputWidth left" placeholder="请输入姓名" v-model="appName" maxlength="20" />
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">性别</label>
                        <span class="inputText inputSpan left" @click="genderClick">
                            <span class="sex sexM">
                                <img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow" />
                                <img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow" />
                                <label>男</label>
                            </span>
                            <span class="sex sexF">
                                <img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShow" />
                                <img src="/static/img/sexS.png" class="sexImg" v-show="sexShow" />
                                <label>女</label>
                            </span>
                        </span>
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">出生日期</label>
                        <input type="date" id="birthD7" class="inputText inputWidth left" v-model="birthDate" />
                        <label class="dateB" for="birthD7">
                            <img src="/static/upDown.png" class="upDownImg" />
                        </label>
                    </p>
                    <p class="inputGrop clearFloat" @click="occupationSelect('1')">
                        <label class="inputLabel left">职业名称</label>
                        <span class="inputText inputWidth left">{{occupation}}</span>
                        <!-- <input type="text"  class="inputText inputWidth left" placeholder="请输入职业名称" v-model="work" /> -->
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">职业代码</label>
                        <span class="inputText inputWidth left">{{occupaCode}}</span>
                        <!-- <input type="text" class="inputText inputWidth left" placeholder="请输入职业代码" v-model="workCode" /> -->
                    </p>
                </div>
            </div>

            <div class="twoCon twoCon1">
                <p class="title_twoCon clearFloat">
                    <label class="left">被保险人基本信息</label>
                </p>
                <div>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">与投保人的关系</label>
                        <select class="left inputText inputWidth" v-model="nexusType">
                            <option value="tp">请选择</option>
                            <option :value="nexus.dicCode" v-for="nexus in nexusList">{{nexus.dicName}}</option>
                        </select>
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">姓名</label>
                        <input type="text" class="inputText inputWidth left" placeholder="请输入姓名" v-model="appNamea" maxlength="20" />
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">性别</label>
                        <span class="inputText inputSpan left" @click="genderClicka">
                            <span class="sex sexM">
                                <img src="/static/img/sexNo.png" class="sexImg" v-show="sexShowa" />
                                <img src="/static/img/sexS.png" class="sexImg" v-show="!sexShowa" />
                                <label>男</label>
                            </span>
                            <span class="sex sexF">
                                <img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShowa" />
                                <img src="/static/img/sexS.png" class="sexImg" v-show="sexShowa" />
                                <label>女</label>
                            </span>
                        </span>
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">出生日期</label>
                        <input type="date" id="birthD7" class="inputText inputWidth left" v-model="birthDatea" />
                        <label class="dateB" for="birthD7">
                            <img src="/static/upDown.png" class="upDownImg" />
                        </label>
                    </p>
                    <p class="inputGrop clearFloat" @click="occupationSelect('2')">
                        <label class="inputLabel left">职业名称</label>
                        <span class="inputText inputWidth left">{{occupation1}}</span>
                        <!-- <input type="text" class="inputText inputWidth left" placeholder="请输入职业名称" v-model="worka" /> -->
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">职业代码</label>
                        <span class="inputText inputWidth left">{{occupaCode1}}</span>
                        <!-- <input type="text" class="inputText inputWidth left" placeholder="请输入职业代码" v-model="workCodea" /> -->
                    </p>
                </div>
            </div>

            <div class="twoCon twoCon1" v-show="related">
                <p class="title_twoCon clearFloat">
                    <label class="left">连带投保人信息</label>
                </p>
                <div>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">姓名</label>
                        <input type="text" class="inputText inputWidth left" placeholder="请输入姓名" v-model="appNameb" maxlength="20" />
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">性别</label>
                        <span class="inputText inputSpan left" @click="genderClickb">
                            <span class="sex sexM">
                                <img src="/static/img/sexNo.png" class="sexImg" v-show="sexShowb" />
                                <img src="/static/img/sexS.png" class="sexImg" v-show="!sexShowb" />
                                <label>男</label>
                            </span>
                            <span class="sex sexF">
                                <img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShowb" />
                                <img src="/static/img/sexS.png" class="sexImg" v-show="sexShowb" />
                                <label>女</label>
                            </span>
                        </span>
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">出生日期</label>
                        <input type="date" id="birthD7" class="inputText inputWidth left" v-model="birthDateb" />
                        <label class="dateB" for="birthD7">
                            <img src="/static/upDown.png" class="upDownImg" />
                        </label>
                    </p>
                    <p class="inputGrop clearFloat" @click="occupationSelect('3')">
                        <label class="inputLabel left">职业名称</label>
                        <span class="inputText inputWidth left">{{occupation2}}</span>
                        <!-- <input type="text" class="inputText inputWidth left" placeholder="请输入职业名称" v-model="workb" /> -->
                    </p>
                    <p class="inputGrop clearFloat">
                        <label class="inputLabel left">职业代码</label>
                        <span class="inputText inputWidth left">{{occupaCode2}}</span>
                        <!-- <input type="text" class="inputText inputWidth left" placeholder="请输入职业代码" v-model="workCodeb" /> -->
                    </p>
                </div>
            </div>
            <p class="btnBox">
                <span class="btn btn1" @click="toStatusTaxpayer">上一步</span>
                <span class="btn" @click="toInsuranceProducts">下一步</span>
            </p>
        </div>
    </div>
</template>

<script>
import { Dictionaries1 } from "../../assets/js/country.js";
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: "basicInformation",
    data() {
        return {
            related: false,
            sexShow: true,
            sexShowa: true,
            sexShowb: true,
            allData: {},
            select_flag: true,
            oName: '',
            allUseLoad: false,
            bottomText: '上拉加载更多...',
            arrItem: [],
            index1: "sss",
            addLoadFlag: 1,
            occupationIndex: '',
            occupation: '请输入职业名称',
            occupation1: '请输入职业名称',
            occupation2: '请输入职业名称',
            occupaCode: '请输入职业代码',
            occupaCode1: '请输入职业代码',
            occupaCode2: '请输入职业代码',
            parCode: "", //投保人大类
            parCode1: "", //被保险人大类
            parCode2: "", //被保险人大类
            occupationcode: "", //投保人小类
            occupation1code: "", //被保险人小类
            occupation2code: "", //被保险人小类
            occupationName: "", //投保人小类名字
            occupation1Name: "", //被保险人小类名字
            occupation2Name: "", //被保险人小类名字
            occupationBigName: "", //投保人大类名字
            occupation1BigName: "", //被保险人大类名字
            occupation2BigName: "", //被保险人大类名字
            selectImg: "/static/qijianwei/icon_select1_focus1.png",
            unselectImg: "/static/qijianwei/icon_select1_unfocus1.png",

            appName: '',// 姓名
            birthDate: '',//出生日期
            nexusList: [],//关系
            nexusType: [],
            appNamea: '',// 姓名
            birthDatea: '',//出生日期
            appNameb: '', // 姓名
            birthDateb: '',//出生日期

            dictionaries: ""
        }
    },
    created() {
        // if (localStorage.dataList != undefined) {
        //     this.dictionaries = JSON.parse(localStorage.dataList)
        //     //				console.log("123"+JSON.stringify(this.dictionaries))
        // } else {
        //     var _this = this
        //     Dictionaries1("http://192.168.171.12:9005", "000095").then((res) => {
        //         _this.dictionaries = res.output
        //         //					console.log("456"+JSON.stringify(this.dictionaries))
        //     })
        // }
        var _this = this
        Dictionaries1(this.$store.state.link7).then((res) => {
            _this.dictionaries = res.output
            // console.log(JSON.stringify(this.dictionaries))
            this.allType()
        })
        this.occupation_init()
        this.echo()
        
    },
    methods: {
        //回显数据  
        echo() {
            var data = {
                "token": this.$store.state.token,
                "userId": this.$store.state.userId,
                "head": {
                    "channelCode": "qtb_h5",
                    "deptCode": this.$route.query.cmpCode,
                    "oprCode": this.$store.state.userId,
                    "prodCode": this.$route.query.prodCode
                },
                "opt": "ALL",
                "pkgNo": this.$route.query.orderNo, //订单号
            }
            // console.log(JSON.stringify(data));
            this.$http.post(this.$store.state.link6 + '/order/v1/queryorder', data)
                .then(res => {
                    console.log(res.data);
                    console.log(JSON.stringify(res.data));
                    var dataCode = res.data.code;
                    if (dataCode == "SYS_S_000") {
                        this.allData = res.data.output;
                        this.allType();
                        // 投保人
                        this.appName = res.data.output.applntResp.applName; //姓名
                        if (res.data.output.applntResp.gender == "M") {
                            // this.gender = "M" //性别
                            this.sexShow = false
                        } else if (res.data.output.applntResp.gender == "F") {
                            // this.gender = "F" //性别
                            this.sexShow = true
                        }
                        this.birthDate = res.data.output.applntResp.birthday; //出生日期
                        this.occupation = res.data.output.applntResp.occName; //职业名称
                        this.occupaCode = res.data.output.applntResp.occNo; //职业代码
                        // 被保人
                        if (res.data.output.insrntResp.relaToAppnt != undefined) {
                            this.nexusType = res.data.output.insrntResp.relaToAppnt; //投被保人关系
                        } else {
                            this.nexusType = "tp";
                        }
                        this.appNamea = res.data.output.insrntResp.insrntName; //姓名
                        if (res.data.output.insrntResp.gender == "M") {
                            // this.gender = "M" //性别
                            this.sexShowa = false
                        } else if (res.data.output.insrntResp.gender == "F") {
                            // this.gender = "F" //性别
                            this.sexShowa = true
                        }
                        this.birthDatea = res.data.output.insrntResp.birthday; //出生日期
                        this.occupation1 = res.data.output.insrntResp.occName; //职业名称
                        this.occupaCode1 = res.data.output.insrntResp.occNo; //职业代码
                    } else {
                        this.allType();
                        Toast(res.data.desc);
                    }
                }, res => {
                    console.log(res.data);
                })
        },
        allType() {
            // console.log(JSON.stringify(this.dictionaries))
            // console.log(JSON.stringify(this.allData))
            //关系
            this.nexusList = this.dictionaries.relaToAppnt.codeList;
            this.nexusType = "tp"
            // if (this.allData.insrntResp.relaToAppnt != undefined) {
            //     this.nexusType = this.allData.insrntResp.relaToAppnt;
            // } else {
            //     this.nexusType = "q";
            // }
        },
        occupationSelect(index) { //职业
            // if (this.nexusType == "A") {
            //     if (index == "1") {
            //         this.occupationIndex = index;
            //         this.select_flag = false;
            //         this.$refs.blur.style.position = "fixed"
            //         this.index1 = "sss";
            //     } else { }
            // } else {
            this.occupationIndex = index;
            this.select_flag = false;
            this.$refs.blur.style.position = "fixed"
            this.index1 = "sss";
            // }

        },
        childUserListSay(...data) {
            //				console.log("====asd" + JSON.stringify(data[0][0]))
            //								this.code = data[0][0]
            this.cust_flag = data[0][1]
            // if (data[0][0] != "") {
            //     this.etInformation(data[0][0])
            // }
        },
        queryName() {
            //				this.$refs.ctc_div_markcenctinput.setAttribute("class", "ctc_div_markcenct")
            if (this.oName == "") {
                this.occupation_init();
            } else {
                var data = { //长城人寿
                    "keyWord": this.oName,
                    "orgCode": "000095"
                }
                console.log("请求报文==" + JSON.stringify(data))
                this.$http.post('http://192.168.171.12:9002' + '/dic/findProFessionalByOrgCodeAndKeyWord', data)
                    .then(res => {
                        var dataCode = res.data.code;
                        if (dataCode == "SYS_S_000") {
                            this.arrItem = res.data.output;
                            if (this.arrItem.length <= 20) {
                                this.allUseLoad = true;
                            }
                        } else {
                            Toast(res.data.desc);
                        }
                    }, res => {
                        console.log(res.data);
                    })
            }

        },
        loadBottomUse(id) {
            if (this.oName == "") {
                this.occupation_initbottom();
            } else {
                this.$refs.loadmore.onBottomLoaded();
            }
        },
        markcenctinput() {
            //				this.$refs.ctc_div_markcenctinput.setAttribute("class", "ctc_div_markcenct1")
        },
        occupation_init() {
            var data = { //长城人寿
                "orgCode": "000095",
                "pageIndex": 1, //自增
                "pageSize": 20 //有几个
            }
            console.log(JSON.stringify(data))
            this.addLoadFlag = 1;
            this.$http.post('http://192.168.171.12:9002' + '/dic/findProfessionalByOrgCode', data)
                .then(res => {
                    var dataCode = res.data.code;
                    if (dataCode == "SYS_S_000") {
                        if (res.data.output.length > 0) {
                            this.arrItem = res.data.output;
                        } else {
                            Toast("没有数据")
                        }
                    } else {
                        console.log("职业信息1" + JSON.stringify(res.data));
                        Toast(res.data.desc);
                    }
                }, res => {
                    console.log("职业信息2" + res.data);
                })
        },
        occupation_initbottom() {
            this.addLoadFlag++;
            var data = { //长城人寿
                //					"dicName": "",
                "orgCode": "000095",
                "pageIndex": this.addLoadFlag, //自增
                "pageSize": 20 //有几个
            }
            console.log(JSON.stringify(data))
            this.$http.post('http://192.168.171.12:9002' + '/dic/findProfessionalByOrgCode', data)
                .then(res => {
                    console.log(JSON.stringify(res.data))
                    var dataCode = res.data.code;
                    if (dataCode == "SYS_S_000") {
                        if (res.data.output.length > 0) {
                            for (var i = 0; i < res.data.output.length; i++) {
                                this.arrItem.push(res.data.output[i]);
                            }
                        } else {
                            Toast("暂无更新")
                        }
                        this.$refs.loadmore.onBottomLoaded();
                    } else {
                        Toast(res.data.desc);
                    }
                }, res => {
                    console.log(res.data);
                })
        },
        cancelOccupationSelect(index) {
            if (this.index1 == "sss" && index == "2") {
                Toast("请选择职业")
                return;
            }
            this.select_flag = true;
            this.$refs.blur.style.position = "relative"
            //				this.$refs.blur.style.filter="blur(0)"
            //				var blur_all = document.getElementById("blur_all");
            //				blur_all.setAttribute("class", "blur_all");
            if (index == "2") {

                if (this.occupationIndex == "1") {
                    this.occupation = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText;
                    this.occupaCode = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
                    this.occupationcode = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
                    this.parCode = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[3].innerText;
                    this.occupationName = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText
                    this.occupationBigName = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[0].innerText
                    if (this.nexusType == "A") { //是本人
                        this.occupation1 = this.occupation;
                        this.occupation1code = this.occupationcode;
                        this.parCode1 = this.parCode;
                        this.occupation1Name = this.occupationName;
                        this.occupation1BigName = this.occupationBigName;
                    }
                } else if (this.occupationIndex == "2") {
                    this.occupation1 = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText;
                    this.occupaCode1 = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
                    this.occupation1code = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
                    this.parCode1 = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[3].innerText;
                    this.occupation1Name = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText
                    this.occupation1BigName = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[0].innerText
                } else {
                    this.occupation2 = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText;
                    this.occupaCode2 = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
                    this.occupation2code = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
                    this.parCode2 = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[3].innerText;
                    this.occupation2Name = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText
                    this.occupation2BigName = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[0].innerText
                }
            }
        },
        selectitem(ev, index) { //职业选择 
            this.index1 = index;
        },
        //性别
        genderClick() {
            if (this.sexShow) {
                //this.gender = "F";
                this.sexShow = false;
            } else {
                //this.gender = "M";
                this.sexShow = true;
            }
        },
        genderClicka() {
            if (this.sexShowa) {
                this.sexShowa = false;
            } else {
                this.sexShowa = true;
            }
        },
        genderClickb() {
            if (this.sexShowb) {
                this.sexShowb = false;
            } else {
                this.sexShowb = true;
            }
        },
        jsGetAge(strBirthday) {//出生日期
            var returnAge;
            var strBirthdayArr = strBirthday.split("-");
            var birthYear = strBirthdayArr[0];
            var birthMonth = strBirthdayArr[1];
            var birthDay = strBirthdayArr[2];
            var d = new Date();
            var nowYear = d.getFullYear();
            var nowMonth = d.getMonth() + 1;
            var nowDay = d.getDate();

            if (nowYear == birthYear) {
                returnAge = 0;
            } else {
                var ageDiff = nowYear - birthYear;
                if (ageDiff > 0) {
                    if (nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay;
                        if (dayDiff <= 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    } else {
                        var monthDiff = nowMonth - birthMonth;
                        if (monthDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    }
                } else {
                    returnAge = -1;
                }
            }
            return returnAge;
        },
        // 上一步
        toStatusTaxpayer() {
            window.history.go(-1);
        },
        // 下一步
        toInsuranceProducts() {
            // 汉字
            var myReg = /^([\u4E00-\u9FA5]{2,})+$/;

            // 投保人
            if (this.appName == "" || this.appName == undefined) {
                Toast('请输入您的姓名');
                return;
            } else if (!myReg.test(this.appName)) {
                Toast("投保人的姓名必须为汉字，并且需大于等于两个汉字")
                return
            } else if (this.appName.length > 50) {
                Toast("投保人的姓名必须小于50个汉字")
            }
            if (this.birthDate == "" || this.birthDate == undefined) {
                Toast('请输入您的出生日期');
                return;
            }
            if (this.jsGetAge(this.birthDate) <= 16) {
                Toast('投保人年龄必须大于16岁');
                return;
            }
            if (this.occupation == "请输入职业名称") {
                Toast("请输入职业名称");
                return;
            }
            if (this.occupaCode == "请输入职业代码") {
                Toast("请输入职业代码");
                return;
            }

            // 被保险人
            if (this.nexusType == "tp") {
                Toast("请选择投保关系")
                return;
            }
            if (this.appNamea == "" || this.appNamea == undefined) {
                Toast('请输入您的姓名');
                return;
            } else if (!myReg.test(this.appNamea)) {
                Toast("投保人的姓名必须为汉字，并且需大于等于两个汉字")
                return
            } else if (this.appNamea.length > 50) {
                Toast("投保人的姓名必须小于50个汉字")
            }
            if (this.birthDatea == "" || this.birthDatea == undefined) {
                Toast('请输入您的出生日期');
                return;
            }
            if (this.occupation1 == "请输入职业名称") {
                Toast("请输入职业名称");
                return;
            }
            if (this.occupaCode1 == "请输入职业代码") {
                Toast("请输入职业代码");
                return;
            }

            // 连带投保人
            // if (this.appNameb == "" || this.appNameb == undefined) {
            //     Toast('请输入您的姓名');
            //     return;
            // } else if (!myReg.test(this.appNameb)) {
            //     Toast("投保人的姓名必须为汉字，并且需大于等于两个汉字")
            //     return
            // } else if (this.appNameb.length > 50) {
            //     Toast("投保人的姓名必须小于50个汉字")
            // }
            // if (this.birthDateb == "" || this.birthDateb == undefined) {
            //     Toast('请输入您的出生日期');
            //     return;
            // }
            // if (this.occupation2 == "请输入职业名称") {
            //     Toast("请输入职业名称");
            //     return;
            // }
            // if (this.occupaCode2 == "请输入职业代码") {
            //     Toast("请输入职业代码");
            //     return;
            // }

            var genderFlag;
            var genderFlaga;
            if (this.sexShow == true) {
                genderFlag = 'F'
            } else {
                genderFlag = 'M'
            }
            if (this.sexShowa == true) {
                genderFlaga = 'F'
            } else {
                genderFlaga = 'M'
            }
            var msg = {
                "applName": this.appName, //投保人姓名 ,
                "gender": genderFlag, //性别 : M-男;F-女
                "birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
                "occName": this.occupation, //职业名称
                "occNo": this.occupaCode,//职业代码
            }
            var msg1 = {
                "relaToAppnt": this.nexusType, //与投保人关系 ,
                "insrntName": this.appNamea, //被保人姓名 ,
                "gender": genderFlaga, //性别 : M-男;F-女
                "birthday": this.birthDatea, //出生年月 : 格式yyyy-MM-dd ,
                "occName": this.occupation1, //职业名称
                "occNo": this.occupaCode1,//职业代码
            }
            var msg2 = {
                "agentCode": "test",
                "agentName": "test", //代理人名称 
                "deptCode": "000095",
                "agentDeptCode": "长城人寿保险", //代理机构
                // "amnt": this.covermoney,
                "cmpCode": this.$route.query.cmpCode,
                // "prem": this.coverage,
                "prodCode": this.$route.query.prodCode,
                // "prodName": this.plantename,
                "prodNo": this.$route.query.prodNo,
                // "sumAmnt": this.covermoney, //保额合计 ,
                // "sumPrem": this.coverage, //保费合计 
                // "lowFlag": "A", //法定受益人标识 A-是;B-否 
                "userId": this.$store.state.userId
            }
            var data = {
                "token": this.$store.state.token,
                "userId": this.$store.state.userId,
                "head": {
                    "channelCode": "qtb_h5",
                    "deptCode": this.$route.query.cmpCode,
                    "oprCode": this.$store.state.userId,
                    "prodCode": this.$route.query.prodCode,
                },
                "mark": "CALC",
                "opt": "APPL,INSRNT,MAIN",
                "pkgNo": this.$route.query.orderNo,
                "applntReq": msg,
                "insrntReq": msg1,
                "mainReq": msg2
            }
            Indicator.open();
            console.log(JSON.stringify(data))
            this.$http.post(this.$store.state.link6 + '/order/v1/saveorder', data)
                .then(res => {
                    Indicator.close();
                    console.log(res.data);
                    if (res.data.code == "SYS_S_000") {
                        this.$router.push('/insuranceProducts?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode + '&appName=' + this.appName + '&genderFlag=' + genderFlag + '&appNamea=' + this.appNamea + '&genderFlaga=' + genderFlaga + '&birthDatea=' + this.birthDatea + '&age=' + this.jsGetAge(this.birthDatea));
                    } else {
                        Toast(res.data.desc);
                    }
                }, res => {
                    Indicator.close();
                    //							console.log(res.data);
                })
        }
    },
    components: {

    }
}
</script>

<style scoped="scoped">
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

.selectp {
    padding-right: 0.48rem;
    border: none;
    background: none;
    /* background: url(/static/upDown.png) no-repeat right center; */
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
    font-size: 0.28rem;
    color: #EB7760;
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

.inputGrop {
    position: relative;
    height: 0.88rem;
    font-size: 0.28rem;
    border-bottom: solid 0.01rem #C8C7CC;
}

.inputGrop1 {
    font-size: 0.28rem;
    border-bottom: solid 0.01rem #C8C7CC;
}

.inputP {
    height: 0.68rem;
}

.inputLabel {
    display: block;
    width: 2rem;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #555555;
}

.inputLabel1 {
    display: block;
    width: 3.22rem;
    height: 0.68rem;
    line-height: 0.68rem;
    color: #555555;
}

.inputText {
    height: 0.88rem;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.88rem;
}

.inputText1 {
    height: 0.68rem;
    font-size: 0.28rem;
    color: #333333;
}

.inputText2 {
    margin-left: 3.22rem;
}

.inputWidth {
    width: 4.7rem;
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

.star {
    display: inline-block;
    width: 0.15rem;
    color: #C9141E;
}

.inputSpan {
    display: inline-block;
    line-height: 0.88rem;
    color: #555555;
    font-weight: bold;
}

.inputLabel2 {
    display: block;
    /*width: 1rem;*/
    height: 0.88rem;
    line-height: 0.88rem;
    /*font-weight: bold;*/
    color: #555555;
}

.bg {
    margin-top: 0.2rem;
}

.boderbo {
    /*width: 5.5rem;*/
    border: none;
    border-radius: 0;
    border-bottom: 0.02rem solid #979797;
    /*margin-bottom: 0.32rem;*/
}

.bg1 {
    margin-left: 0.2rem;
}

.inputText22 {
    width: 2.7rem;
    height: 0.88rem;
    font-size: 0.28rem;
    color: #333333;
    padding-left: 0;
}

.start {
    display: block;
    height: 0.88rem;
    line-height: 0.88rem;
    color: red;
}

.money {
    width: 100%;
}

.signBox {
    padding-bottom: 0.32rem;
    /*margin-bottom: 0.64rem;*/
}























































/*.signBox span {
		display: inline-block;
		float: left;
		width: 1.84rem;
		margin: 0 0.15rem;
		height: 0.68rem;
		line-height: 0.68rem;
		margin-top: 0.32rem;
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
		margin-right: 0.2rem;
	}
	
	.signBox span.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}*/

.selectedSign2 {
    display: inline-block;
    float: left;
    width: 1.84rem;
    margin: 0 0.15rem;
    height: 0.68rem;
    line-height: 0.68rem;
    margin-top: 0.32rem;
    font-size: 0.28rem;
    color: #555555;
    text-align: center;
    border: solid 0.02rem #54CCC1;
    border-radius: 0.34rem;
    margin-right: 0.2rem;
}

.selectedSign1 {
    background: #54CCC1;
    display: inline-block;
    float: left;
    width: 1.84rem;
    margin: 0 0.15rem;
    height: 0.68rem;
    line-height: 0.68rem;
    margin-top: 0.32rem;
    font-size: 0.28rem;
    color: #FFFFFF;
    text-align: center;
    border: solid 0.02rem #54CCC1;
    border-radius: 0.34rem;
    margin-right: 0.2rem;
}

.ctc_div_mask {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #000;
    background: rgba(0, 0, 0, 0.40);
    z-index: 10;
}

.ctc_div_markcenct {
    width: 7.5rem;
    margin-top: 0.2rem;
}

.ctc_div_query {
    width: 7.18rem;
    height: 0.72rem;
    margin: 0 auto;
    /*margin-top: 1rem;*/
    /*background: rgba(255, 255, 255, 0.60);*/
    background: #fff;
    border-radius: 0.1rem;
}

.prd_img_query {
    display: block;
    float: left;
    width: 0.28rem;
    height: 0.28rem;
    margin-top: 0.22rem;
    margin-left: 0.2rem;
}

.prd_input_query {
    width: 6.46rem;
    height: 0.72rem;
    padding-left: 0.24rem;
    border: none;
    color: #333333;
    /*background: #EEEEEE;*/
    font-size: 0.34rem;
    line-height: 0.44rem;
}

.ctc_div_queryitem {
    width: 7.18rem;
    /*height: 7.82rem;*/
    height: 9rem;
    /*height: 10.08rem;*/
    margin: 0 auto;
    margin-top: 0.4rem;
    padding-top: 0.18rem;
    position: relative;
    background: rgba(247, 247, 247, 0.96);
    border-radius: 0.06rem;
}

.ctc_div_queryitemall {
    width: 7.18rem;
    height: 8.08rem;
    overflow: scroll;
}

.ctc_div_item {
    display: inline-block;
    width: 6.7rem;
    /*height: 0.86rem;*/
    /*margin: 0 auto;*/
    border-bottom: 0.02rem solid #C8C7CC;
    margin-left: 0.24rem;
}

.pr_img_item1 {
    /*margin-left: 0.12rem;*/
    margin-top: 0.1rem;
    display: block;
    float: left;
    width: 0.64rem;
    height: 0.64rem;
}

.pr_span_title {
    display: block;
    float: left;
    width: 1.9rem;
    font-size: 0.28rem;
    color: #555555;
    line-height: 0.84rem;
}

.marRightitem {
    margin-right: 0.15rem;
}

.ctc_div_bottombtn {
    width: 7.18rem;
    height: 0.91rem;
    position: absolute;
    bottom: 0;
    border-top: 0.01rem solid #CCCCCC;
}

.ctc_span_clear {
    display: block;
    float: left;
    width: 3.59rem;
    height: 0.87rem;
    border-right: 0.01rem solid #CCCCCC;
    text-align: center;
    line-height: 0.87rem;
    color: #EB6067;
    font-size: 0.32rem;
    box-sizing: border-box;
}

.ctc_span_ok {
    display: block;
    float: left;
    width: 3.59rem;
    height: 0.87rem;
    text-align: center;
    line-height: 0.87rem;
    color: #EB6067;
    font-size: 0.32rem;
}

.blur_all {
    filter: blur(0);
}
</style>