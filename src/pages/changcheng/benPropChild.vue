<template>
	<div class="twoCon">
		<div v-if="!select_flag" class="ctc_div_mask" style="z-index: 100;">
            <div ref="ctc_div_markcenctinput" class="ctc_div_markcenct">
                <div class="ctc_div_query">
                    <img class="prd_img_query" src="/static/qijianwei/SearchGlyph.png" @click="queryName" />
                    <input v-model="oName" class="prd_input_query" type="text" placeholder="关键词搜索" @change="queryName" @focus="markcenctinput" />
                </div>
                <div class="ctc_div_queryitem">
                    <div class="ctc_div_queryitemall">
                        <mt-loadmore :bottom-method="loadBottomUse" :bottom-all-loaded="allUseLoad" :bottomPullText='bottomText' ref="loadmore">
                            <div ref="sss" v-for="(zy,index) in arrItem" class="ctc_div_item" :key="zy.key">
                                <img :code="index1" @click="selectitem($event,index)" class="pr_img_item1" :src="index1==index ?  selectImg:unselectImg" />
                                <span class="pr_span_title marRightitem">{{zy.parName}}</span>
                                <span class="pr_span_title marRightitem">{{zy.plName}}</span>
                                <span class="pr_span_title">{{zy.plCode}}</span>
                                <span v-show="false" class="pr_span_title">{{zy.parCode}}</span>
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

		<div class="policyHolder" ref="blur">
			<p class="title_twoCon clearFloat">
				<span class="left">{{item.title}}{{parseInt(index)+1 | numberToChinese(this)}}</span>
				<span v-if="parseInt(index)+1>1" @click="deletepeople(index)" class="right title_twoCon1">清除</span>
			</p>
			<div class="policyHolder">
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>是被保险人的</label>
					<select class="inputText inputWidth left" v-model="item.relatoInsured" @change="changeRelation(item)">
						<option value="">请选择</option>
						<option :value="nexus.dicCode" v-for="nexus in nexusList" :key="nexus.key">{{nexus.dicName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>姓名</label>
					<input type="text" class="inputText inputWidth left" placeholder="请输入姓名" v-model="item.bnfName" />
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>证件类型</label>
					<select class="left inputText inputWidth" v-model="item.certfType" @change="">
						<option value="">请选择</option>
						<option :value="certfType.dicCode" v-for="certfType  in couponList" :key="certfType.key">{{certfType.dicName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>证件号码</label>
					<input type="text" maxlength="18" class="inputText inputWidth left" placeholder="请输入证件号码" v-model="item.certfCode" @input="idIdnum"/>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>性别</label>
					<span class="inputText inputSpan left">
						<span class="sex sexM" @click="genderClick">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="!(item.gender=='M')" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="(item.gender=='M')" />
							<label>男</label>
						</span>
						<span class="sex sexF" @click="genderClick">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="(item.gender=='M')" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!(item.gender=='M')" />
							<label>女</label>
						</span>
					</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>出生日期</label>
					<input type="date" id="birthD7" class="inputText inputWidth left" v-model="item.birthday" />
					<label class="dateB" for="birthD7">
						<img src="/static/upDown.png" class="upDownImg" />
					</label>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>证件是否长期有效</label>
					<span class="inputText inputSpan left">
						<span class="sex sexM" @click="benshouyi">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="(item.certfEnduringFlag=='N')" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!(item.certfEnduringFlag=='N')" />
							<label>是</label>
						</span>
						<span class="sex sexF" @click="benshouyi">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="!(item.certfEnduringFlag=='N')" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="(item.certfEnduringFlag=='N')" />
							<label>否</label>
						</span>
					</span>
				</p>
				<p class="inputGrop clearFloat" v-if="(item.certfEnduringFlag=='N')">
					<label class="inputLabel left">
						<label class="star">*</label>证件有效期至</label>
					<input type="date" id="birthD8" class="inputText inputWidth left" placeholder="请选择证件有效期" v-model="item.certfEndTime" />
					<label class="dateB" for="birthD8">
						<img src="/static/upDown.png" class="upDownImg" />
					</label>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>国籍</label>
					<select class="left inputText inputWidth" v-model="item.nationality">
						<option value="">请选择</option>
						<option :value="nexus.dicCode" v-for="nexus in nationalityList">{{nexus.dicName}}</option>
					</select>
				</p>
				<!-- <p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>职业名称</label>
					<select class="left inputText inputWidth" v-model="item.occName">
						<option value="">请选择</option>
						<option :value="nexus.dicCode" v-for="nexus in nationalityList">{{nexus.dicName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>职业代码</label>
					<input type="text" class="inputText inputWidth left" placeholder="请输入姓名" v-model="item.occNo" />
				</p> -->
				<p class="inputGrop clearFloat" @click="occupationSelect('1')">
					<label class="inputLabel left">
						<label class="star">*</label>职业名称</label>
					<span class="inputText inputWidth left inputzy" v-if="item.occName">{{item.occName}}</span>
					<span class="inputText inputWidth left inputzy" style="color:#B0B0B0;" v-if="!item.occName">请选择职业名称</span>
					<!-- <input type="text"  class="inputText inputWidth left" placeholder="请输入职业名称" v-model="work" /> -->
				</p>
				<p class="inputGrop clearFloat" @click="occupationSelect('1')">
					<label class="inputLabel left">
						<label class="star">*</label>职业代码</label>
					<span class="inputText inputWidth left inputzy" v-if="item.occNo">{{item.occNo}}</span>
					<span class="inputText inputWidth left inputzy" style="color:#B0B0B0;" v-if="!item.occNo">职业代码</span>
					<!-- <input type="text" class="inputText inputWidth left" placeholder="请输入职业代码" v-model="workCode" /> -->
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>联系电话</label>
					<input type="text" class="inputText inputWidth left" placeholder="请输入联系电话" maxlength="11" v-model="item.mobile" />
				</p>
				<div class="inputGrop1 clearFloat">
					<p class="inputP">
						<label class="inputLabel1 left"><label class="star">*</label>地址序号</label>
						<select v-model="addressXH" class="inputText1 inputWidth left"  @change="addressChange(addressXH)">
							<option value="">请选择</option>
							<option value="1">同投保人</option>
							<option value="2">同被保人</option>
							<option value="3">其他</option>
						</select>
					</p>
					<p class="inputP">
						<select v-model="item.province" class="inputText1 inputText2 inputWidth left"  @change="provinceA" :disabled="addressXH=='1'||addressXH=='2'">
							<option value="">请选择</option>
							<option :value="province.cnCode" v-for="province in provinceList" :key="province.key">{{province.cnName}}</option>
						</select>
					</p>
					<p class="inputP">
						<select v-model="item.city" class="inputText1 inputText2 inputWidth left" @change="cityB" :disabled="addressXH=='1'||addressXH=='2'">
							<!-- <option value="">请选择</option> -->
							<option value="">请选择</option>
							<option :value="city.cnCode" v-for="city in cityList" :key="city.key">{{city.cnName}}</option>
						</select>
					</p>
					<p class="inputP">
						<select v-model="item.county" class="inputText1 inputText2 inputWidth left" :disabled="addressXH=='1'||addressXH=='2'">
							<option value="">请选择</option>
							<option :value="county.cnCode" v-for="county in countyList" :key="county.key">{{county.cnName}}</option>
						</select>
					</p>
				</div>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left"><label class="star">*</label>详细地址</label>
					<input type="text" v-model="item.fullAddr" class="inputText inputWidth left" placeholder="请输入镇乡街道" />
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>受益顺序</label>
					<select class="left inputText inputWidth" v-model="item.bnfSeq">
						<option value="">请选择</option>
						<option :value="($index+1)" v-for="(ad,$index) in addBen" :key="ad.key">{{$index+1}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>受益比例（%）</label>
					<input type="text" class="inputText inputWidth left" placeholder="请输入受益比例" v-model="item.bnfShare" />
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { Dictionaries1 } from "../../assets/js/country.js";
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
	name: "benPropChild",
	props: {
		addBen: {
			type: Array,
		},
		item: {
			type: Object,
		},
		index: {
			type: Number,
		},
		dealtbData: {
			type: Function,
		},

	},
	data() {
		return {
			sexShow: true,
			longShow: true,
			select_flag: true,
			oName: '',
			allUseLoad: false,
			addressXH: "",//地址序号
            bottomText: '上拉加载更多...',
			arrItem: [],
			selectImg: "/static/qijianwei/icon_select1_focus1.png",
            unselectImg: "/static/qijianwei/icon_select1_unfocus1.png",
            index1: "sss",
			benType: 'F',
            addLoadFlag:1,
			//关系
			nexusType: '',
			nexusList: [],
			//身份证
			cardType: '',
			certfType: '',
			couponList: [],
			provinceList: [],
			cityList: [],
			countyList: [],
			dictionaries: "",
		}
	},
	created() {
		console.log(this.item)
		this.occupation_init();
		this.chengshi()
		if(!this.item.certfEnduringFlag){
			this.item.certfEnduringFlag="N"
		}
		
		if (localStorage.dataList != undefined) {
			this.dictionaries = JSON.parse(localStorage.dataList)
		} else {
			var _this = this
			Dictionaries1("http://192.168.171.12:9005", "000095").then((res) => {
				_this.dictionaries = res.output
			})
		}
		this.allType()

	},
	updated() {

	},
	filters:{
		numberToChinese(val,d){
			let numberToChineseUtils={
				units:'个十百千万@#%亿^&~',
				chars:'零一二三四五六七八九',
				/*
					数字转中文
					@number {Integer} 形如123的数字
					@return {String} 返回转换成的形如 一百二十三 的字符串
				*/
				numberToChinese:function(number){
					var a=(number+'').split(''),s=[],t=this;
					if(a.length>12){
						throw new Error('too big');
					}else{
						for(var i=0,j=a.length-1;i<=j;i++){
							if(j==1||j==5||j==9){//两位数 处理特殊的 1*
								if(i==0){
									if(a[i]!='1')s.push(t.chars.charAt(a[i]));
								}else{
									s.push(t.chars.charAt(a[i]));
								}
							}else{
								s.push(t.chars.charAt(a[i]));
							}
							if(i!=j){
								s.push(t.units.charAt(j-i));
							}
						}
					}
					//return s;
					return s.join('').replace(/零([十百千万亿@#%^&~])/g,function(m,d,b){//优先处理 零百 零千 等
						b=t.units.indexOf(d);
						if(b!=-1){
							if(d=='亿')return d;
							if(d=='万')return d;
							if(a[j-b]=='0')return '零'
						}
						return '';
					}).replace(/零+/g,'零').replace(/零([万亿])/g,function(m,b){// 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
						return b;
					}).replace(/亿[万千百]/g,'亿').replace(/[零]$/,'').replace(/[@#%^&~]/g,function(m){
						return {'@':'十','#':'百','%':'千','^':'十','&':'百','~':'千'}[m];
					}).replace(/([亿万])([一-九])/g,function(m,d,b,c){
						c=t.units.indexOf(d);
						if(c!=-1){
							if(a[j-c]=='0')return d+'零'+b
						}
						return m;
					});
				}
			}
			return d.addBen.length==1?"":numberToChineseUtils.numberToChinese(val)
		}
	},
	methods: {
		addressChange(addressXH){
			if(addressXH=="1"){//同投保人
				let lsben = this.dealtbData("applntResp",1,this.item.bnfType,2,this.index)
			}else if(addressXH=="2"){//同被保人
				let lsben = this.dealtbData("insrntResp",1,this.item.bnfType,2,this.index)
			}else if(addressXH=="3"){//其他
				
			}
		},
		changeRelation(params){
			if(params.relatoInsured=="A"){//如果是本人则直接复制被保人的信息
				// let lsben = this.dealtbData("applntResp",1,this.item.bnfType,1,this.index)
				let lsben = this.dealtbData("insrntResp",1,this.item.bnfType,1,this.index)
				console.log("%c ddd","color:green;",lsben)
				console.log("%c ddd","color:green;",this.item.bnfType)
				// this.item = lsben
			}
		},
		cancelOccupationSelect(index) {
            if (this.index1 == "sss" && index == "2") {
                Toast("请选择职业")
                return;
            }
            this.select_flag = true;
			// this.$refs.blur.style.position = "relative"
			if(index==2){
				this.item.occName = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText;
				this.item.occNo = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
			}
        },
		selectitem(ev, index) { //职业选择 
            this.index1 = index;
		},
		occupation_init() {
            var data = { //天安人寿
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
            var data = { //天安人寿
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
		loadBottomUse(id) {
            if (this.oName == "") {
                this.occupation_initbottom();
            } else {
                this.$refs.loadmore.onBottomLoaded();
            }
        },
		markcenctinput() {
            //this.$refs.ctc_div_markcenctinput.setAttribute("class", "ctc_div_markcenct1")
        },
		queryName() {
            //this.$refs.ctc_div_markcenctinput.setAttribute("class", "ctc_div_markcenct")
            if (this.oName == "") {
                this.occupation_init();
            } else {
                var data = { //天安人寿
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
		occupationSelect(index) { //职业
			this.occupationIndex = index;
            this.select_flag = false;
            // this.$refs.blur.style.position = "fixed"
            this.index1 = "sss";
        },
		chengshi() {
			var data = {
				"code": "0",
				"orgCode": "000034"
			}
			this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
				.then(res => {
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.provinceList = res.data.output;
						// this.item.province = this.provinceList.cnCode;
						this.allData = res.data.output;		
						this.provinceA();
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
		provinceA(orgCode) {
			var data = {
				"code": this.item.province,
				"orgCode": "000034"
			}
			this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
				.then(res => {
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.cityList = res.data.output;
						// this.item.city =  this.cityList.cnCode;
						this.cityB();
			} else {}
				}, res => {
					console.log(res.data);
				})

		},
		cityB(){
			var data = {
				"code": this.item.city,
				"orgCode": "000034"
			}
			this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
				.then(res => {
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						console.log(res.data)
						this.countyList = res.data.output;
						// this.item.county = this.countyList.cnCode
					} else {}
				}, res => {
					console.log(res.data);
				})
		},
		deletepeople(data) {
			console.log("删除"+data);
			// for(var i = 0; i < this.addBen.length; i++) {
				// if(this.addBen[i].id == data) {
					this.addBen.splice(data, 1);
				// }
			// }
			Toast("删除成功！")
		},
		allType() {
            console.log(JSON.parse(JSON.stringify(this.dictionaries)))
           this.nexusList = this.dictionaries.relatoInsured.codeList;
           this.couponList = this.dictionaries.certfType.codeList;
           this.nationalityList = this.dictionaries.nationality.codeList;
        },
		isCardIDRule(sId) {
			var iSum = 0;
			var info = "";
			if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
			sId = sId.replace(/x$/i, "a");
			//			if(aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
			var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
			var d = new Date(sBirthday.replace(/-/g, "/"));
			if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
			for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
			if (iSum % 11 != 1) return "你输入的身份证号非法";
			return true;
		},
		bnfScaleRule() {
			//创建一个长度为10的数组，下标1保存受益顺序为1的受益人、下标2保存受益人顺序为2的受益人。。。。
			var benefitOrderList = new Array(10);
			for(var i = 0; i < 10; i++) {
				benefitOrderList[i] = [];
			}
			this.addBen.forEach(element => {
				if(element.bnfSeq < 10) {
					benefitOrderList[element.bnfSeq].push(element); //向受益人数组添加数据
				} else {
					return '受益顺序必须从1开始且受益顺序必须连续'
				}
			})
			//受益顺序不从1开始
			if(benefitOrderList[1].length == 0) {
				return '受益顺序必须从1开始'
			} else { //收益顺序必须连续
				if(benefitOrderList[1][0].bnfSeq != "1") {
					return '受益顺序必须从1开始'
				}
				for(var i = 2; i < benefitOrderList.length; i++) {
					if(benefitOrderList[i].length == 0) {
						for(var j = i + 1; j < benefitOrderList.length; j++) {
							if(benefitOrderList[j].length != 0) {
								return '受益顺序必须连续'
							}
						}
					}
				};
			};
			for(var i = 1; i < benefitOrderList.length; i++) {
				if(benefitOrderList[i].length != 0) {
					var sumRatioB = 0;
					for(var j = 0; j < benefitOrderList[i].length; j++) {
						var item = benefitOrderList[i][j];
						sumRatioB = sumRatioB + parseInt(item.bnfShare);
						if((j + 1) == benefitOrderList[i].length && sumRatioB != 100) {
							return "同一受益顺序的受益比例之和必须为100%！"+"当前第"+i+"受益顺序受益比例之和为"+sumRatioB+"%"
						};
					}
				}
			};




			// let bnfSeq = 0, bnfShare = 0
			// this.addBen.forEach(element => {
			// 	bnfSeq += parseInt(element.bnfSeq)//受益顺序
			// 	bnfShare += parseInt(element.bnfShare)//受益比例
			// })
			// //受益人只有一人时，受益顺序应等于1，受益人为2人时，若为同一顺序，则受益比例应各等于50%。受益人为2人，若不为同一顺序，则受益比例应各等于100%
			// if ((this.addBen.length == 1 && bnfSeq == 1) || (bnfSeq - 1 != this.addBen.length)) {
			// 	return "受益顺序不正确"
			// } else if (bnfShare != 100) {
			// 	return "受益比例总和需为100%"
			// }

			return true
		},
		childSay() {
			let peo = this.item.title+this.$options.filters.numberToChinese(parseInt(this.index)+1,this)
			var re = /[^\u4e00-\u9fa5]/; //姓名校验
			var patrn = /^[0-9]*$/;
			var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
				regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
			if (this.item.relatoInsured == "") {
				return peo+"是被保险人的关系不能为空";
			}
			//
			if (this.item.bnfName == "") {
				return peo+"姓名不能为空";
			}else{
				if (re.test(this.item.bnfName)) {
					return peo+"姓名必须为汉字";
				}
				if (this.item.bnfName.length < 2) {
					return peo+"姓名需大于两个汉字";
				}
				if (this.item.bnfName.length > 50) {
					return peo+"姓名需小于等于50个汉字";
				}
			}
			if (!this.item.birthday) {
				return peo+"出生日期不能为空";
			}
			if (this.item.certfType == "N") {
				return peo+"证件类型不能为空";
			}
			if (this.item.certfCode == "") {
				return peo+"证件号码不能为空";
			}else{
				if (regEn.test(this.item.certfCode) || regCn.test(this.item.certfCode)) {
					return peo+"证件号码不能有特殊字符";
				}
				if(this.item.certfType == "A"){// "A-身份证"
					if (this.isCardIDRule(this.item.certfCode) != true) {
						return this.isCardIDRule(this.item.certfCode)
					}
				}else if(this.item.certfType == "F"){// "F-护照"
					if(!(/^[a-zA-Z0-9]*$/.test(this.item.certfCode))){
						return peo+"护照号码仅允许录入数字和字母";
					}
				}else if(this.item.certfType == "G"){// "G-军人证"
					if(!(/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(this.item.certfCode))){
						return peo+"警官证仅允许录入数字、字母和汉字";
					}
				}else if(this.item.certfType == "V"){// "V-异常身份证"
					if (this.isCardIDRule(this.item.certfCode) != true) {
						return this.isCardIDRule(this.item.certfCode)
					}
				}else if(this.item.certfType == "C"){// "C-户口本"

				}else if(this.item.certfType == "H"){// "H-警官证"
					if(!(/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(this.item.certfCode))){
						return peo+"警官证仅允许录入数字、字母和汉字";
					}
				}else if(this.item.certfType == "D"){// "D-出生证"

				}else if(this.item.certfType == "O"){// "O-其他"

				}else if(this.item.certfType == "W"){// "W-港澳台回乡证"
					if(!(/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(this.item.certfCode))){
						return peo+"港澳台回乡证仅允许录入数字、字母和汉字";
					}
				}
			}
			if (this.item.bendata == "") {
				return peo+"出生日期不能为空";
			}
			if(!this.item.certfEnduringFlag){
				this.item.certfEnduringFlag = "N"
			}else{
				if (this.item.certfEnduringFlag == "N" && this.item.certfEndTime == "") {
					return peo+"证件有效期不能为空";
				}
			}
			if(this.item.nationality == ""){
				return peo+"国籍不能为空";
			}else{
				if(this.item.certfType == "F"&&this.item.nationality == "37"){// "F-护照"//护照：当证件类型为护照时，国籍不能为中国
					return peo+"当证件类型为护照时，国籍不能为中国";
				}
			}
			if(!this.item.mobile){
				return peo+"请填写联系电话";
			}else{
				if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.item.mobile))){
					return peo+"联系电话格式不正确";
				}
			}
			if(!this.item.occName){
				return peo+"请填写职业名称";
			}
			if(!this.item.province||!this.item.city||!this.item.county){
				return peo+"请填写常住地址";
			}
			if(!this.item.fullAddr){
				return peo+"请填写详细地址";
			}
			if (this.item.bnfSeq == "N") {
				return peo+"请选择受益顺序";
			}
			if (this.item.bnfShare == "") {
				return peo+"请填写受益比例";
			}
			if (this.bnfScaleRule() != true) {
				return this.bnfScaleRule()
			}
			return true
		},
		toGaozhi(msg) {
			// alert(this.$options.filters.numberToChinese(2))
			if (this.childSay() == true) {
				console.log("校验通过")
				return true
			} else {
				let message = this.childSay()
				Toast(message)
				return false
			}
		},
		genderClick() {
			if (this.item.gender == "M") {
				this.item.gender = "F"
			} else {
				this.item.gender = "M"
			}
		},
		benshouyi() {
			if (this.item.certfEnduringFlag == "N") {
				this.item.certfEnduringFlag = "Y"
			} else {
				this.item.certfEnduringFlag = "N"
			}
		},
		idIdnum() {
			var str = this.isCardIDRule(this.item.certfCode);
			if (str) {
				var Idcard = this.item.certfCode.substring(6, 14); //截取生日字符串
				Idcard = Idcard.substring(0, 4) + "-" + Idcard.substring(4, 6) + "-" + Idcard.substring(6, 9);
				this.item.birthday = Idcard;
				 if (parseInt(this.item.certfCode.substr(16, 1)) % 2 == 1) {
				 	this.item.gender='M'
				 } else {
				 	this.item.gender='F'
				 }
			}
		}
	},

}
</script>


<style scoped="scoped">
.inputzy{
	line-height: 0.88rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space:nowrap;
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

.pr_span_title {
    display: block;
    float: left;
    width: 1.9rem;
    font-size: 0.28rem;
    color: #555555;
    line-height: 0.84rem;
}

.pr_img_item1 {
    /*margin-left: 0.12rem;*/
    margin-top: 0.1rem;
    display: block;
    float: left;
    width: 0.64rem;
    height: 0.64rem;
}

.marRightitem {
    margin-right: 0.15rem;
}

.ctc_div_item {
    display: inline-block;
    width: 6.7rem;
    /*height: 0.86rem;*/
    /*margin: 0 auto;*/
    border-bottom: 0.02rem solid #C8C7CC;
    margin-left: 0.24rem;
}

.inputText1 {
	height: 0.68rem;
	font-size: 0.28rem;
	color: #333333;
}

.inputText2 {
	margin-left: 3.22rem;
}

.inputP {
	height: 0.68rem;
}

.inputLabel1 {
	display: block;
	width: 3.22rem;
	height: 0.68rem;
	line-height: 0.68rem;
	color: #555555;
}

.left {
	float: left;
}

.right {
	float: right;
}

.star {
	color: #EB7760;
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
	border-bottom: solid 0.01rem #C8C7CC;
}

.title_twoCon1 {
	padding: 0;
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
	padding-bottom: 0.64rem;
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
	color: #C9141E;
	text-align: center;
}

.btn1 {
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

.inputLabel {
	display: block;
	width: 3.22rem;
	height: 0.88rem;
	line-height: 0.88rem;
	color: #555555;
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
	margin: 0.4rem 0 0.92rem 0;
}

.pushBtn {
	display: block;
	width: 6.7rem;
	height: 0.88rem;
	line-height: 0.88rem;
	margin: 0 auto;
	font-size: 0.28rem;
	color: #FFFFFF;
	background: #C9141E;
	border-radius: 0.16rem;
	text-align: center;
}
</style>