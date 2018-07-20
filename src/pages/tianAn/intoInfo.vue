<template>
	<div class="one" :class="{opa0:!hui,addBoxF:!cust_flag}" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div v-show="!mark_flag" class="ctc_div_mask">
			<div class="ctc_div_maskitem">
				<span @click="cancel" class="span_cancel">取消</span>
				<span @click="addRiskfu" class="span_ok">确定</span>
				<div class="ctc_div_title">附加险列表</div>
				<div class="ctc_div_list">
					<div ref="listitemall" v-for="(item,index) in arrRiskfu" class="ctc_div_listitemall">
						<img @click.stop="setCheckValue($event,item,index)" class="pr_img_item" src="/static/qijianwei/icon_select1_unfocus1.png" />
						<div class="ctc_div_listitemleft">{{item.cvrgName}}</div>
					</div>
				</div>
			</div>
		</div>
		<div v-show="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
		<div v-show="!select_flag" class="ctc_div_mask">
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
		<div v-show="!cust_flag" class="addBox" @click="addBoxClick">
			<TaCustuserList @child_userList="childUserListSay"></TaCustuserList>
		</div>
		<div id="blur_all">
			<div v-if="hui" class="twoCon">
				<p class="title_twoCon clearFloat">
					<span class="titleLable_twoCon left">投保人信息</span>
				</p>
				<div class="policyHolder">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">姓名</label>
						<input type="text" class="inputText inputWidth left" v-model="InsureName" placeholder="请输入真实姓名" @input="check_name" maxlength="10" />
						<span class="sumBtn" @click="goSub('1')">+</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">出生日期</label>
						<input type="date" id="birthDate4" ref="dateInput" class=" inputText inputWidth left " v-model="InsureBr" placeholder="请选择出生日期" @change="aa" />
						<label class="dateB" for="birthDate4">
							<img src="/static/upDown.png" class="upDownImg3" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">投保人性别</label>
						<span class="inputText inputSpan left">
						<span class="sex sexM" @click="sexChose('1')">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow" />
							<label>男</label>
						</span>
						<span class="sex sexF" @click="sexChose('2')">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="sexShow" />
							<label>女</label>
						</span>
						</span>
					</p>
					<p @click="occupationSelect('1')" class="inputGrop clearFloat">
						<label class="inputLabel left">投保人职业</label>
						<span class="inputText2 left">{{occupation}}</span>
					</p>
				</div>
			</div>
			<div v-show="hui" class="twoCon twoCon1">
				<p class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">被保险人信息</label>
				</p>
				<div class="recognizee">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">与投保人关系</label>
						<select v-model="nexusType" class="left inputText inputWidth" @change="check_name">
							<option :value="nexus.code" v-for="nexus in nexusList">{{nexus.name}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">姓名</label>
						<input type="text" class="inputText inputWidth left" v-model="InsuredName" placeholder="请输入真实姓名" :disabled="!disabled" maxlength="10" />
						<span class="sumBtn" @click="goSub('2')">+</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">出生日期</label>
						<input type="date" id="birthDate5" class="inputText inputWidth left" v-model="InsuredBr" placeholder="请选择出生日期" :disabled="!disabled" @change="aa" />
						<label class="dateB" for="birthDate5">
							<img src="/static/upDown.png" class="upDownImg3" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">被保险人性别</label>
						<span class="inputText inputSpan left">
						<span class="sex sexM" @click="reSexChose('1')">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="reSexShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!reSexShow" />
							<label>男</label>
						</span>
						<span class="sex sexF" @click="reSexChose('2')">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="!reSexShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="reSexShow" />
							<label>女</label>
						</span>
						</span>
					</p>
					<p @click="occupationSelect('2')" class="inputGrop clearFloat">
						<label class="inputLabel left">被保险人职业</label>
						<span class="inputText2 left">{{occupation1}}</span>
					</p>
				</div>
			</div>
			<div class="twoCon">
				<p class="title_twoCon clearFloat">
					<span class="titleLable_twoCon left">险种信息</span>
				</p>
				<div class="policyHolder">
					<p class="inputGropq clearFloat">
						<label class="inputLabel left">主险</label>
						<span class="inputTextRisk left">{{mainRisk.cvrgName}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">缴费期间</label>
						<select class="inputText inputWidth left " v-model="mainPayPeriodList" @change="Premium">
							<option :value="little.payNo" v-for="little in mainRisk.payPeriodList">{{little.payRmk}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">保险期间</label>
						<select class="inputText inputWidth left" v-model="mainInsuPeriodList" @change="Premium">
							<option :value="little.insuNo" v-for="little in mainRisk.insuPeriodList">{{little.insuRmk}}</option>
						</select>
					</P>
					<p v-if="mainBirthAmtListFlag" class="inputGrop clearFloat">
						<label class="inputLabel left">祝寿金领取年龄</label>
						<select class="inputText inputWidth left" v-model="mainBirthAmtList" @change="Premium">
							<option :value="little.birthAmtNo" v-for="little in mainRisk.birthAmtList">{{little.birthAmtRmk}}</option>
						</select>
					</p>
					<p v-if="numberFlag" class="inputGrop clearFloat">
						<label class="inputLabel left">份数</label>
						<input type="text" class="inputText inputWidth left" placeholder="请输入份数" v-model="amntNumber" @change="PremiumNumber" @blur="PremiumNumber" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">保额(元)</label>
						<input type="text" class="inputText inputWidth left" name="text" id="text" placeholder="请输入保额" v-model="amnt" @blur="Premium" @change="Premium" :disabled="!disabled1" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">保费(元)</label>
						<span class="inputText1 inputWidth left">{{yearFee}}</span>
					</p>
				</div>
			</div>
			<Additional ref="test" @ievent="ievent" @ievent1="ievent1" @deletId="deletBen" v-for="(item,index) in arrList" :key="index" v-bind:peopledetail="item,gender1,InsuredBr,additionalRiskEcho,mainCvrgno,addIndex,amnt,mainInsuPeriodList,mainPayPeriodList"></Additional>
			<p v-show="hui" class="pushBox">
				<span @click="Additional_risk('1')" class="pushBtn">添加附加险</span>
			</p>
			<div v-show="hui" class="twoCon">
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">保险费自动垫交</label>
					<span class="inputText inputSpan left">
						<span class="sex sexM" @click="automatic('1')">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="automatic1" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!automatic1" />
							<label>是</label>
						</span>
						<span class="sex sexF" @click="automatic('2')">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="automatic2" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!automatic2" />
							<label>否</label>
						</span>
					</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel2 left">首次应缴保费(元)</label>
					<span class="inputText1 left">{{allYearFee}}</span>
				</p>
			</div>
			<p v-show="hui" class="sBox clearFloat" @click="sBoxShowHide">
				<img src="/static/img/noSelected.png" class="sImg left" v-show="sBoxShow" />
				<img src="/static/img/selected.png" class="sImg left" v-show="!sBoxShow" />
				<span class="sDes">我已阅读<span class="sSpan" @click.stop="sBoxGoPdf1(0)">《主险保险条款》</span>、<span class="sSpan" @click.stop="sBoxGoPdf1(1)">《附加险保险条款》</span>，将如实填写各项投保信。</span>
			</p>
			<p v-show="hui" class="btnBox clearFloat">
				<span class="btn btn1 left">保存并分享</span>
				<span class="btn left" @click="handleClickNext">下一步</span>
			</p>
		</div>
	</div>
</template>

<script>
	import TaCustuserList from './taCustuserList.vue'
	import Additional from './additional.vue'
	import Pdf from '@/components/pdf.vue'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import { Loadmore } from 'mint-ui';
	import { MessageBox } from 'mint-ui';

	export default {
		name: "IntoInfo",
		props: ['backview'],
		data() {
			return {
				custDetal: '',
				addIndex: true,
				hui: true,
				getScoreLog: [],
				pageNo: 1,
				allLoaded: false,
				bottomText: '上拉加载更多...',
				totalCount: '',
				allUseLoad: false,
				addLoadFlag: 1,
				mainBirthAmtListFlag: false, //是否显示祝寿金
				numberFlag: false, //是否显示份数
				selectImg: "/static/qijianwei/icon_select1_focus1.png",
				unselectImg: "/static/qijianwei/icon_select1_unfocus1.png",
				index1: "sss",
				disabled: false,
				disabled1: true,
				mark_flag: true,
				pdfFlag: true,
				cust_flag: true,
				select_flag: true,
				sexShow: false,
				automatic1: true,
				automatic2: true,
				policyHolderName: '',
				oName: '',
				birthDate: '',
				nexusType: '0',
				nexusList: [],
				occupation: '请选择投保人职业',
				occupation1: '请选择被保人职业',
				occupationcode: "", //投保人小类
				occupation1code: "", //被保人小类
				occupationName: "", //投保人小类名字
				occupation1Name: "", //被保人小类名字
				parCode: "", //投保人大类
				parCode1: "", //被保人大类
				occupationBigName: "", //投保人大类名字
				occupation1BigName: "", //被保人大类名字
				occupationIndex: '',
				arrItem: [],
				arrRiskfu: [],
				arrList: [],
				recognizeeName: '',
				reBirthDate: '',
				reSexShow: false,
				sBoxShow: true,
				gender: 'M',
				gender1: 'M',
				InsureName: '', //投保人姓名
				InsureBr: '', //投保人生日
				InsuredName: '', //被保人姓名
				InsuredBr: '', //被保人生日
				mainRisk: [],
				mainPayPeriodList: '', //缴费期间
				mainInsuPeriodList: '', //保险期间
				mainBirthAmtList: '', //祝寿金
				amnt: '', //主险保额
				amntNumber: '', //份数
				yearFee: "", //主险年交保费
				arrDisplayRisk: [],
				allYearFee: "", //总费
				money1: 0, //总保额
				arrAllFee: [], //算费数组
				arrAllRisk: [],
				arraySelect: [], //职业选择框的数组
				cvrgReq: [], //险种数组
				allDataInit: {}, //回显数据
				additionalRiskEcho: [], //附加险回显数据
				mainCvrgno: '', //主险mainCvrgno
				birth18: '',
				pdf: '',
				pdfShow:false,
				PDFArr:["http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDJyAKk0SABNVRm9ye70235.pdf", "http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDLCAQBojAAU5v_XYHtM766.pdf"]
			}
		},
		created() {
			if(this.backview == "hui") {
				this.hui = false;
			}
			var myDate = new Date();
			var day = myDate.getDate();
			if(myDate.getMonth() < 10) {
				var month = "0" + (myDate.getMonth() + 1);
			}
			if(myDate.getDate() < 10) {
				day = "0" + myDate.getDate();
			}

			var datew = (myDate.getFullYear() - 18) + "-" + month + "-" + day;
			var datew = datew.toString();
			this.birth18 = datew
			this.InsureBr = datew; //投保人生日
			this.InsuredBr = datew; //被保人生日

			this.init();
		},
		methods: {
			pdfClose(...data) {
				this.pdfFlag = data[0]
			},
			init() {
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode
					},
					"opt": "APPL,INSRNT,MAIN,CVRG",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				Indicator.open();
				//				console.log("data==" + JSON.stringify(data))
				this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
					.then(res => {
						Indicator.close();
						console.log(res.data)
						this.cvrgList_init(); //险种信息
						this.occupation_init(); //职业信息
						this.relationship(); //投被保人关系
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.allDataInit = res.data.output;
							//投保人
							if(res.data.output.applntResp.applName == "" || res.data.output.applntResp.applName == undefined) {
								//								window.localStorage.applNo = ""; //二次核保 第一次进来为空  核保过的有值
							} else {
								this.InsureName = res.data.output.applntResp.applName
							}
							if(res.data.output.applntResp.birthday == "" || res.data.output.applntResp.birthday == undefined) {} else {
								this.InsureBr = res.data.output.applntResp.birthday
							}
							if(res.data.output.applntResp.occDetailType == "" || res.data.output.applntResp.occDetailType == undefined) {} else {
								this.occupation = res.data.output.applntResp.occDetailType + "    " + res.data.output.applntResp.occName
								this.occupationBigName = res.data.output.applntResp.occDetailType;
								this.parCode = res.data.output.applntResp.occDetailTypeNo;
								this.occupationName = res.data.output.applntResp.occName;
								this.occupationcode = res.data.output.applntResp.occNo;
							}
							if(res.data.output.applntResp.gender == "" || res.data.output.applntResp.gender == undefined) {} else {
								if(res.data.output.applntResp.gender == "M") {
									this.sexChose('1')
								} else if(res.data.output.applntResp.gender == "F") {
									this.sexChose('2')
								}
								if(res.data.output.insrntResp.gender == "M") {
									this.reSexChose('1')
								} else if(res.data.output.insrntResp.gender == "F") {
									this.reSexChose('2')
								}
								if(res.data.output.mainResp.autoPayFlag == "N") {
									this.automatic2 = false;
								} else if(res.data.output.mainResp.autoPayFlag == "Y") {
									this.automatic1 = false;
								}
							}
							//被保人
							if(res.data.output.applntResp.relationToInsured == "" || res.data.output.applntResp.relationToInsured == undefined) {} else {
								//								this.nexusType = res.data.output.applntResp.relationToInsured;
								if(this.nexusType == "00") { //是本人
									this.reSexShow = this.sexShow;
									this.gender1 = this.gender;
									this.check_name();
									this.disabled = false;
								} else {
									this.disabled = true;
								}
							}
							if(res.data.output.insrntResp.insrntName == "" || res.data.output.insrntResp.insrntName == undefined) {} else {
								this.InsuredName = res.data.output.insrntResp.insrntName
							}
							if(res.data.output.insrntResp.birthday == "" || res.data.output.insrntResp.birthday == undefined) {} else {
								this.InsuredBr = res.data.output.insrntResp.birthday
							}
							if(res.data.output.insrntResp.occDetailType == "" || res.data.output.insrntResp.occDetailType == undefined) {} else {
								this.occupation1 = res.data.output.insrntResp.occDetailType + "    " + res.data.output.insrntResp.occName
								this.occupation1code = res.data.output.insrntResp.occNo;
								this.occupation1Name = res.data.output.insrntResp.occName;
								this.parCode1 = res.data.output.insrntResp.occDetailTypeNo;
								this.occupation1BigName = res.data.output.insrntResp.occDetailType;
							}
							if(res.data.output.mainResp.sumPrem == "" || res.data.output.mainResp.sumPrem == undefined) {} else {
								this.allYearFee = res.data.output.mainResp.sumPrem;
							}
						} else {
//														Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			goSub(index) {
				if(index == "1") {
					this.cust_flag = false;
					this.custDetal = "1";
				} else if(index == "2") {
					if(this.nexusType != "00") {
						this.cust_flag = false;
						this.custDetal = "2";
					}
				}
			},
			loadBottomUse(id) {
				if(this.oName == "") {
					this.occupation_initbottom();
				} else {
					Toast("暂无数据")
					this.$refs.loadmore.onBottomLoaded();
				}
			},
			aa() {
				//				e.currentTarget.setAttribute('type', 'date')
				//				console.log(e.currentTarget)
				//				e.currentTarget.focus()
				if(this.nexusType == "00") {
					this.InsuredBr = this.InsureBr;
				}
				this.Premium();
				for(var i = 0; i < this.arrList.length; i++) {
					this.$refs.test[i].Premium1(this.gender1, this.InsuredBr);
				}
			},
			policyHolderClear() {
				this.$refs.dateInput.setAttribute('type', 'text')
				this.InsureName = "";
				this.InsureBr = "";
				this.sexShow = true;
				this.occupation = "请选择投保人职业";
			},
			insuredClear() {
				this.nexusType = "";
				this.InsuredName = "";
				this.InsuredBr = "";
				this.reSexShow = true;
				this.occupation1 = "请选择被保人职业";
			},
			ievent(...data) { //子组件方法
				//				console.log('allData:===1' + JSON.stringify(data)); // data为包含传过来所有数据的数组，第一个元素是对象，第二个元素是字符串
				this.arrAllRisk = data;
				var obj = new Object;
				obj.id = data[0].cvrgCode;
				obj.Fee = data[0].yeeFee;
				var flag;
				if(this.arrAllFee.length == "0") {
					this.arrAllFee.push(obj);
				} else {
					for(var i = 0; i < this.arrAllFee.length; i++) {
						if(this.arrAllFee[i].id == data[0].cvrgCode) {
							this.arrAllFee[i].Fee = data[0].yeeFee;
						}
					}
				}
				this.totalPremium();
			},
			markcenctinput() {
				//				this.$refs.ctc_div_markcenctinput.setAttribute("class", "ctc_div_markcenct1")
			},
			ievent1(...data) { //子组件方法
				//				console.log('allData:===1' + JSON.stringify(data)); // data为包含传过来所有数据的数组，第一个元素是对象，第二个元素是字符串
				this.cvrgReq.push(data[0])
			},
			deletBen(...data) {
				//				console.log('allData:===1' + JSON.stringify(data[0]));
				var flag = false;
				for(var i = 0; i < this.arrList.length; i++) {
					//					arrRiskfu 所有的附加险
					//					arrList 已经添加的附加险
//					console.log('===2' + JSON.stringify(this.arrRiskfu));
					for(var k = 0; k < this.arrRiskfu.length; k++) {
						console.log("asdasd===123" + this.arrRiskfu[k].cvrgCode)
						console.log("asdasd===123" + this.arrList[i].cvrgCode)
						if(this.arrRiskfu[k].cvrgCode == this.arrList[i].cvrgCode) {
							flag = true;
						}
					}
					if(this.arrList[i].cvrgCode == data[0].cvrgCode) {
						this.arrList.splice(i, 1);
					}
				}
				if(!flag) {
					this.arrRiskfu.push(data[0]);
				}
				this.totalPremium();
			},
			addBoxClick(){
				this.cust_flag = true
			},
			childUserListSay(...data) {
//				console.log("====asd" + JSON.stringify(data[0][0]))
				//								this.code = data[0][0]
				this.cust_flag = data[0][1]
				if(data[0][0] != "") {
					this.etInformation(data[0][0])
				}
			},
			etInformation(code) {
				var data = {
					"custId": code,
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
				}
				this.$http.post(this.$store.state.link + "/cut/cut/queryCustInfo", data).then(response => {
//					console.log("==123=" + JSON.stringify(response.data))
					if(response.data.code == "SYS_S_000") {
						if(this.custDetal == "1") {
							if(response.data.output.custName != undefined) { //名字
								this.InsureName = response.data.output.custName;
								this.check_name();
							} else {
								this.InsureName = ""
							}
							if(response.data.output.custBirth != undefined) { //出生
								this.InsureBr = response.data.output.custBirthday;
								this.aa();
							} else {
								this.InsureBr = this.birth18
								this.InsuredBr = this.birth18
							}
							if(response.data.output.custGender != undefined) { //性别
								if(response.data.output.custGender == "M") {
									this.sexChose('1')
								} else {
									this.sexChose('2')
								}
							}
						} else if(this.custDetal == "2") {
							if(response.data.output.custName != undefined) { //名字
								this.InsuredName = response.data.output.custName;
							} else {
								this.InsuredName = ""
							}
							if(response.data.output.custBirth != undefined) { //出生
								this.InsuredBr = response.data.output.custBirthday;
								this.aa();
							} else {
								this.InsuredBr = this.birth18
							}
							if(response.data.output.custGender != undefined) { //性别
								if(response.data.output.custGender == "M") {
									this.reSexChose('1')
								} else {
									this.reSexChose('2')
								}
							}
						}
					}
				}, response => {
					console.log("ajax error");
				});
			},
			selectitem(ev, index) { //职业选择 
				this.index1 = index;
				//				if(this.arraySelect.length == 0) {
				//					this.arraySelect.push(index)
				//				} else {
				//					this.arraySelect.push(index)
				//					console.log("====" + JSON.stringify(this.arraySelect))
				//					console.log("====" + this.arraySelect[this.arraySelect.length - 2])
				//					console.log(this.$refs.sss[this.arraySelect[this.arraySelect.length - 2]].getElementsByClassName('pr_img_item1')[0].src)
				//					this.$refs.sss[this.arraySelect[this.arraySelect.length - 2]].getElementsByClassName('pr_img_item1')[0].src = "/static/qijianwei/icon_select1_unfocus1.png"
				//
				//				}
				//
				//				ev.currentTarget.src = "/static/qijianwei/icon_select1_focus1.png";

			},
			occupationSelect(index) { //职业
				if(this.nexusType == "00") {
					if(index == "1") {
						this.occupationIndex = index;
						this.select_flag = false;
						var blur_all = document.getElementById("blur_all");
						blur_all.setAttribute("class", "blur_all1");
						this.index1 = "sss";
					} else {}
				} else {
					this.occupationIndex = index;
					this.select_flag = false;
					var blur_all = document.getElementById("blur_all");
					blur_all.setAttribute("class", "blur_all1");
					this.index1 = "sss";
				}

			},
			cancelOccupationSelect(index) {
				if(this.index1 == "sss" && index == "2") {
					Toast("请选择职业")
					return;
				}
				this.select_flag = true;
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all");
				if(index == "2") {

					if(this.occupationIndex == "1") {
						this.occupation = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[0].innerText + "    " + this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText;
						this.occupationcode = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
						this.parCode = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[3].innerText;
						this.occupationName = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText
						this.occupationBigName = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[0].innerText
						if(this.nexusType == "00") { //是本人
							this.occupation1 = this.occupation;
							this.occupation1code = this.occupationcode;
							this.parCode1 = this.parCode;
							this.occupation1Name = this.occupationName;
							this.occupation1BigName = this.occupationBigName;
						}
					} else {
						this.occupation1 = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[0].innerText + "    " + this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText;
						this.occupation1code = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[2].innerText;
						this.parCode1 = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[3].innerText;
						this.occupation1Name = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[1].innerText
						this.occupation1BigName = this.$refs.sss[this.index1].getElementsByClassName("pr_span_title")[0].innerText
					}
				}
			},
			totalPremium() { //算总费
				var money = 0;
				for(var z = 0; z < this.arrAllFee.length; z++) {
					money += parseFloat(this.arrAllFee[z].Fee);
				}
				if(this.yearFee == "") {
					this.allYearFee = 0 + parseFloat(money);
				} else {
					this.allYearFee = parseFloat(this.yearFee) + parseFloat(money);
				}
				this.allYearFee = this.allYearFee.toFixed(2);
				if(isNaN(this.allYearFee)) {
					this.allYearFee = "";
				}
				if(this.allYearFee == 0 || this.allYearFee == 0.0 || this.allYearFee == 0.00) {
					this.allYearFee = "";
				}
			},
			totalPremium1(arrAllFee) { //算总费
				var money = 0;
				for(var z = 0; z < arrAllFee.length; z++) {
					money += parseFloat(arrAllFee[z].prem);
				}
				this.allYearFee = parseFloat(money);
				this.allYearFee = this.allYearFee.toFixed(2);
			},
			addRiskfu() {
				var flag = true;
				for(var i = 0; i < this.$refs.listitemall.length; i++) {
					if(this.$refs.listitemall[i].getElementsByClassName('pr_img_item')[0].src.indexOf("icon_select1_focus1") != -1) {
						flag = false;
						//						console.log(this.$refs.listitemall[i].getElementsByClassName('pr_img_item')[0].src)
					}
				}
				if(flag) {
					Toast("请至少选择一个附加险")
					return;
				}
				for(var i = 0; i < this.arrDisplayRisk.length; i++) {
					for(var z = 0; z < this.arrRiskfu.length; z++) {
						if(this.arrDisplayRisk[i].cvrgCode == this.arrRiskfu[z].cvrgCode) {
							this.arrRiskfu.splice(z, 1);
						}
					}
				}
				this.arrList = this.arrDisplayRisk;
				this.mark_flag = true;
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all");
			},
			setCheckValue(ev, item, index) {
				var flag;
				if(this.arrDisplayRisk.length == 0) {
					this.arrDisplayRisk.push(item);
					ev.currentTarget.src = "/static/qijianwei/icon_select1_focus1.png";
				} else {
					for(var i = 0; i < this.arrDisplayRisk.length; i++) {
						if(this.arrDisplayRisk[i].cvrgCode == item.cvrgCode) {
							this.arrDisplayRisk.splice(i, 1);
							ev.currentTarget.src = "/static/qijianwei/icon_select1_unfocus1.png";
							flag = true;
							break;
						} else {
							flag = false;
						}
					}
					if(flag == false) {
						this.arrDisplayRisk.push(item);
						ev.currentTarget.src = "/static/qijianwei/icon_select1_focus1.png";
					}
				}

			},
			ifbirthAmtList() {
				//				if(this.mainRisk.birthAmtList.length == 0) {
				//					return false;
				//				} else {
				//					return true;
				//				}
			},
			check_name() {
				if(this.nexusType == "00") {
					this.gender1 = this.gender;
					this.disabled = false;
					this.InsuredName = this.InsureName;
					this.reSexShow = this.sexShow;
					this.InsuredBr = this.InsureBr
					this.occupation1 = this.occupation;
					this.occupation1code = this.occupationcode;
					this.parCode1 = this.parCode;
					this.occupation1Name = this.occupationName;
					this.occupation1BigName = this.occupationBigName
				} else {
					this.disabled = true;
					this.InsuredName = "";
					var myDate = new Date();
					var day = myDate.getDate();
					if(myDate.getMonth() < 10) {
						var month = "0" + (myDate.getMonth() + 1);
					}
					if(myDate.getDate() < 10) {
						day = "0" + myDate.getDate();
					}
					var datew = (myDate.getFullYear() - 18) + "-" + month + "-" + day;
					var datew = datew.toString();
					this.InsuredBr = datew;
					this.reSexShow = false;
					this.gender1 = "M";
					this.occupation1 = "请选择被保人职业";
					this.occupation1code = "";
					this.parCode1 = "";
					this.occupation1Name = "";
					this.occupation1BigName = ""
				}
				this.Premium();
				for(var i = 0; i < this.arrList.length; i++) {
					this.$refs.test[i].Premium1(this.gender1, this.InsuredBr);
				}
			},
			cancel() {
				this.mark_flag = true;
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all");
			},
			Additional_risk(index) { //添加附加险
				if(index == 1) {
					MessageBox('提示', '附加险的保险期间、交费方式和保险金额需与主险保持一致。');
					this.addIndex = true;
				}
				if(this.arrList.length == 0) {
					if(this.arrRiskfu.length == 0) {
						Toast("无可添加的附加险")
					} else {
						this.mark_flag = false;
						var blur_all = document.getElementById("blur_all");
						blur_all.setAttribute("class", "blur_all1");
					}
				} else {
					//					arrRiskfu 所有的附加险
					//					arrList 已经添加的附加险
					for(var i = 0; i < this.arrRiskfu.length; i++) {
						for(var z = 0; z < this.arrList.length; z++) {
							if(this.arrRiskfu[i].cvrgCode == this.arrList[z].cvrgCode) {
								this.arrRiskfu.splice(i, 1);
							}
						}
					}
					if(this.arrRiskfu.length == 0) {
						Toast("无可添加的附加险")
						return;
					}
					this.mark_flag = false;
					var blur_all = document.getElementById("blur_all");
					blur_all.setAttribute("class", "blur_all1");
				}
			},
			sBoxGoPdf1(i) {
				this.pdf = this.PDFArr[i]
				this.pdfFlag = false;
				//				window.location.href = "http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDJyAKk0SABNVRm9ye70235.pdf";
			},
			sBoxShowHide() {
				this.sBoxShow = !this.sBoxShow
			},
			sexChose(index) {
				if(index == "1") {
					this.sexShow = false;
				} else if(index == "2") {
					this.sexShow = true;
				}
				if(this.sexShow) {
					this.gender = "F";
				} else {
					this.gender = "M";
				}
				if(this.nexusType == "00") { //是本人
					this.reSexShow = this.sexShow;
					this.gender1 = this.gender;
					this.Premium();
					for(var i = 0; i < this.arrList.length; i++) {
						this.$refs.test[i].Premium1(this.gender1, this.InsuredBr);
					}
				}
			},
			automatic(index) {
				if(this.automatic1 == true && this.automatic2 == true) {
					if(index == "1") {
						this.automatic1 = false;
					} else if(index == "2") {
						this.automatic2 = false;
					}
				} else {
					if(index == "1") {
						this.automatic1 = false;
						this.automatic2 = true;
					} else if(index == "2") {
						this.automatic1 = true;
						this.automatic2 = false;
					}
				}
			},
			reSexChose(index) {
				if(this.nexusType == "00") { //是本人

				} else { //不是本人
					if(index == "1") {
						this.reSexShow = false;
					} else if(index == "2") {
						this.reSexShow = true;
					}

					if(this.reSexShow) {
						this.gender1 = "F";
					} else {
						this.gender1 = "M";
					}
					this.Premium();
					for(var i = 0; i < this.arrList.length; i++) {
						this.$refs.test[i].Premium1(this.gender1, this.InsuredBr);
					}
				}
			},
			handleClickUp() {
				this.$router.push('/')
			},
			relationship() {
				var data = { //天安人寿
					"type": "A"
				}

				this.$http.post(this.$store.state.link + '/dic/findCustomerTypeForTianAn', data)
					.then(res => {
						console.log(res.data)
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.nexusList = res.data.output;
							if(this.allDataInit.applntResp == undefined) {
								this.nexusType = this.nexusList[0].code;
							} else {
								this.nexusType = this.allDataInit.applntResp.relationToInsured;
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			occupation_init() {
				var data = { //天安人寿
					"orgCode": "000034",
					"pageIndex": 1, //自增
					"pageSize": 20 //有几个
				}
				this.addLoadFlag = 1;
				this.$http.post(this.$store.state.link + '/dic/findProfessionalByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							if(res.data.output.length > 0) {
								this.arrItem = res.data.output;
							} else {
								Toast("没有数据")
							}
						} else {
							console.log("职业信息1" + res.data);
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
					"orgCode": "000034",
					"pageIndex": this.addLoadFlag, //自增
					"pageSize": 20 //有几个
				}
				this.$http.post(this.$store.state.link + '/dic/findProfessionalByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							if(res.data.output.length > 0) {
								for(var i = 0; i < res.data.output.length; i++) {
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
			queryName() {
				//				this.$refs.ctc_div_markcenctinput.setAttribute("class", "ctc_div_markcenct")
				if(this.oName == "") {
					this.occupation_init();
				} else {
					var data = { //天安人寿
						"keyWord": this.oName,
						"orgCode": "000034"
					}
					console.log("请求报文==" + JSON.stringify(data))
					this.$http.post(this.$store.state.link + '/dic/findProFessionalByOrgCodeAndKeyWord', data)
						.then(res => {
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								this.arrItem = res.data.output;
							} else {
								Toast(res.data.desc);
							}
						}, res => {
							console.log(res.data);
						})
				}

			},
			cvrgList_init() {
				var data = {
					"cvrgExtType": "3",
					"prodCode": this.$route.query.prodCode
				}
				this.$http.post(this.$store.state.link + '/prd/cvrg/cvrglist', data)
					.then(res => {
						//						console.log("===险种" + JSON.stringify(res.data))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							for(var i = 0; i < res.data.output.length; i++) { //默认
								if(res.data.output[i].cvrgType == "M") {
									this.mainRisk = res.data.output[i];
									this.mainCvrgno = this.mainRisk.cvrgNo;
									this.mainPayPeriodList = this.mainRisk.payPeriodList[0].payNo; //缴费期间
									this.mainInsuPeriodList = this.mainRisk.insuPeriodList[0].insuNo; //保险期间
									if(this.mainRisk.birthAmtList.length > 0) {
										this.mainBirthAmtList = this.mainRisk.birthAmtList[0].birthAmtNo; //祝寿金
										this.mainBirthAmtListFlag = true;
									} else {
										this.mainBirthAmtListFlag = false;
									}
									if(this.mainRisk.cvrgExtInfo.minUnits <= 0) {
										this.numberFlag = false; //否按分数购买
										this.disabled1 = true; //否按分数购买
									} else {
										this.numberFlag = true; //是按分数购买
										this.disabled1 = false; //是按分数购买
									}
								} else {
									this.arrRiskfu.push(res.data.output[i]);
								}
							}
							if(this.allDataInit.cvrgResp != undefined) {
								if(this.allDataInit.cvrgResp.length > 0) { //回显
									for(var i = 0; i < this.allDataInit.cvrgResp.length; i++) {
										if(this.allDataInit.cvrgResp[i].cvrgType == "M") {
											this.mainPayPeriodList = this.allDataInit.cvrgResp[i].payNo;
											this.mainInsuPeriodList = this.allDataInit.cvrgResp[i].insuNo;
											this.amnt = this.allDataInit.cvrgResp[i].amnt;
											this.yearFee = this.allDataInit.cvrgResp[i].prem;
											this.mainBirthAmtList = this.allDataInit.cvrgResp[i].fullBonusGetmode;
										}
									}
								}
							}

							if(this.allDataInit.cvrgResp != undefined) {
								if(this.allDataInit.cvrgResp.length > 0) {
									for(var k = 0; k < this.allDataInit.cvrgResp.length; k++) {
										if(this.allDataInit.cvrgResp[k].cvrgType == "A") {
											for(var z = 0; z < this.arrRiskfu.length; z++) {
												this.addIndex = false;
												if(this.allDataInit.cvrgResp[k].cvrgCode == this.arrRiskfu[z].cvrgCode) {
													this.additionalRiskEcho.push(this.allDataInit.cvrgResp[k]);
													this.arrList.push(this.arrRiskfu[z]);
												}
											}
										}
									}
								}
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			PremiumNumber() {
				var patrn = /^[0-9]*$/;
				if(this.amntNumber == "") {
					return;
				}
				if(!patrn.test(this.amntNumber)) {
					Toast("份数为纯数字")
					return;
				}
				this.amnt = this.amntNumber;
				this.Premium(); //按分数购买
			},
			Premium() {
				var patrn = /^[0-9]*$/;
				if(this.amnt == "") {
					return;
				}
				if(!patrn.test(this.amnt)) {
					Toast("保额必须为纯数字")
					if(this.mainRisk.cvrgExtInfo.calcPremType == "2") {
						this.yearFee = "";
					} else if(this.mainRisk.cvrgExtInfo.calcPremType == "1") {
						this.yearFee = "";
					}
					this.totalPremium();
					return;
				}
				var data;
				if(this.mainRisk.cvrgExtInfo.calcPremType == "1") {
					data = {
						"list": [{
							"cvrgCode": this.mainRisk.cvrgCode,
							"birthDays": this.InsuredBr,
							"prodId": this.$route.query.prodCode,
							"coverage": 0,
							"age": this.jsGetAge(this.InsuredBr),
							"yearFee": this.amnt,
							"cvrgName": this.mainRisk.cvrgName,
							"sex": this.gender1,
							"year": this.mainPayPeriodList,
							"safeGuard": this.mainInsuPeriodList,
							"lifeAmtAge": this.mainBirthAmtList,
							"freqyNo": ""
						}]
					}
				} else if(this.mainRisk.cvrgExtInfo.calcPremType == "2") {
					data = {
						"list": [{
							"cvrgCode": this.mainRisk.cvrgCode,
							"birthDays": this.InsuredBr,
							"prodId": this.$route.query.prodCode,
							"coverage": this.amnt,
							"age": this.jsGetAge(this.InsuredBr),
							"yearFee": 0,
							"cvrgName": this.mainRisk.cvrgName,
							"sex": this.gender1,
							"year": this.mainPayPeriodList,
							"safeGuard": this.mainInsuPeriodList,
							"lifeAmtAge": this.mainBirthAmtList,
							"freqyNo": ""
						}]
					}
				}
//				console.log(JSON.stringify(data))
				Indicator.open();
				this.$http.post(this.$store.state.link + '/ppt/count/queryCoverageFee', data)
					.then(res => {
						Indicator.close();
						//						console.log("==222==" + JSON.stringify(res.data));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							if(this.mainRisk.cvrgExtInfo.calcPremType == "2") {
								this.yearFee = res.data.output.coverageFeeList[0].yearFee;
							} else if(this.mainRisk.cvrgExtInfo.calcPremType == "1") {
								this.yearFee = res.data.output.coverageFeeList[0].coverage;
							}
							this.totalPremium();
						} else {
							if(this.mainRisk.cvrgExtInfo.calcPremType == "2") {
								this.yearFee = "";
							} else if(this.mainRisk.cvrgExtInfo.calcPremType == "1") {
								this.yearFee = "";
							}
							this.totalPremium();
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			jsGetAge(strBirthday) {
				var returnAge;
				var strBirthdayArr = strBirthday.split("-");
				var birthYear = strBirthdayArr[0];
				var birthMonth = strBirthdayArr[1];
				var birthDay = strBirthdayArr[2];
				var d = new Date();
				var nowYear = d.getFullYear();
				var nowMonth = d.getMonth() + 1;
				var nowDay = d.getDate();

				if(nowYear == birthYear) {
					returnAge = 0;
				} else {
					var ageDiff = nowYear - birthYear;
					if(ageDiff > 0) {
						if(nowMonth == birthMonth) {
							var dayDiff = nowDay - birthDay;
							if(dayDiff < 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						} else {
							var monthDiff = nowMonth - birthMonth;
							if(monthDiff < 0) {
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
			handleClickNext() {
				if(!this.sBoxShow) {
					if(this.InsureBr == "" || this.InsureBr == undefined) {
						Toast("投保人出生日期不得为空");
						return;
					}
					if(this.InsuredBr == "" || this.InsuredBr == undefined) {
						Toast("被保人出生日期不得为空");
						return;
					}
					var myDate = new Date();
					var day = myDate.getDate();
					if(myDate.getMonth() < 10) {
						var month = "0" + (myDate.getMonth() + 1);
					}
					if(myDate.getDate() < 10) {
						day = "0" + myDate.getDate();
					}
					var datew = (myDate.getFullYear()) + "-" + month + "-" + day;
					var datew1 = datew.toString();
					var d1 = datew.replace(/\-/g, "\/"); //今天
					var d2 = this.InsureBr.replace(/\-/g, "\/"); //投保人
					var d3 = this.InsuredBr.replace(/\-/g, "\/"); //被保人
					if(datew != "" && this.InsureBr != "" && d1 <= d2) {
						Toast('投保人出生日期不可以选择今天和今天之后')
						return;
					}
					if(datew != "" && this.InsuredBr != "" && d1 <= d3) {
						Toast('被保人出生日期不可以选择今天和今天之后')
						return;
					}
					var re = /[^\u4e00-\u9fa5]/; //姓名校验
					if(this.InsureName == "") {
						Toast("投保人姓名不得为空");
						return;
					}
					if(re.test(this.InsureName)) {
						Toast("投保人姓名必须为纯中文");
						return;
					}
					if(this.occupation == "请选择投保人职业") {
						Toast("请选择投保人职业");
						return;
					}
					if(this.InsuredName == "") {
						Toast("被保人姓名不得为空");
						return;
					}
					if(re.test(this.InsuredName)) {
						Toast("被保人姓名必须为纯中文");
						return;
					}
					if(this.occupation1 == "请选择被保人职业") {
						Toast("请选择被保人职业");
						return;
					}
					if(this.amnt == "" || this.amnt == 0) {
						Toast("险种信息残缺");
						return;
					}
					if(this.yearFee == "" || this.yearFee == 0) {
						Toast("险种信息残缺");
						return;
					}
					if(this.automatic1 == true && this.automatic2 == true) {
						Toast("请选择保险费自动垫交");
						return;
					}
					this.cvrgReq = [];
					for(var i = 0; i < this.arrList.length; i++) {
						this.$refs.test[i].bbb()
					}
					for(var k = 0; k < this.cvrgReq.length; k++) {
						if(this.cvrgReq[k].amnt == "" || this.cvrgReq[k].amnt == undefined) {
							Toast("险种信息残缺");
							return;
						}
						if(this.cvrgReq[k].prem == "" || this.cvrgReq[k].prem == undefined) {
							Toast("险种信息残缺");
							return;
						}
					}
					var payFlag = "";
					var insuFlag = "";
					for(var l = 0; l < this.mainRisk.payPeriodList.length; l++) {
						if(this.mainRisk.payPeriodList[l].payNo == this.mainPayPeriodList) {
							payFlag = this.mainRisk.payPeriodList[l].payFlag;
						}
					}
					for(var l = 0; l < this.mainRisk.insuPeriodList.length; l++) {
						if(this.mainRisk.insuPeriodList[l].insuNo == this.mainInsuPeriodList) {
							insuFlag = this.mainRisk.insuPeriodList[l].insuFlag;
						}
					}

					var myDate = new Date();
					var day = myDate.getDate();
					if(myDate.getMonth() < 10) {
						var month = "0" + (myDate.getMonth() + 1);
					}
					if(myDate.getDate() < 10) {
						day = "0" + myDate.getDate();
					}
					var datew = (myDate.getFullYear()) + "-" + month + "-" + day;
					var datew1 = datew.toString();
					var freqyNo;
					if(this.mainPayPeriodList == "B1") {
						freqyNo = "A"
					} else {
						freqyNo = "B"
					}
					var cvrgReqdata = {
						//							"mainCvrgNo": this.mainRisk.cvrgNo, //每个险种都要
						"mainCvrgNo": this.mainRisk.cvrgNo, //每个险种都要
						"amnt": this.amnt, //保额 
						"prem": this.yearFee, //保费  
						//							"cvrgNo": this.mainRisk.cvrgNo,
						"cvrgNo": this.mainRisk.cvrgNo,
						"cvrgCode": this.mainRisk.cvrgCode, //险种编码 
						"cvrgName": this.mainRisk.cvrgName, //险种名称  
						"cvrgType": "M", //主附险标志 : M主险；A附加险; 
						"payNo": this.mainPayPeriodList, //交费期间编码 
						"payFlag": payFlag,
						"insuNo": this.mainInsuPeriodList, //保险期间编码 
						"insuFlag": insuFlag,
						"freqyNo": freqyNo,
						"mult": this.amntNumber, //份数
						"fullBonusGetmode": this.Premium
					}
					this.cvrgReq.push(cvrgReqdata)
					this.money1 = 0;
					for(var i = 0; i < this.cvrgReq.length; i++) {
						this.money1 += parseFloat(this.cvrgReq[i].amnt);
					}
					var automaticFlag;
					if(this.automatic1 == false) {
						automaticFlag = "Y";
					}
					if(this.automatic2 == false) {
						automaticFlag = "N";
					}
					
					this.totalPremium1(this.cvrgReq)
					var addMainData;
//					console.log("===11==" + JSON.stringify(this.allDataInit.mainResp))
					if(this.allDataInit.applntResp != undefined) {
						if(this.allDataInit.applntResp.applName == "" || this.allDataInit.applntResp.applName == undefined) {
							addMainData = {
								"agentCode": "10000015", //代理人代码 
								"agentName": "高薇", //代理人名称 
								"amnt": this.money1, //保额
								"deptCode": "47", //机构代码   
								"deptName": "", //机构名称
								"agentDeptCode": "8001", //代理机构
								"expireProcessMode": "", //到期处理方式
								"firstPremium": this.allYearFee, //首期保费 
								"flightNo": "", //航班号 
								"initialPremamt": this.allYearFee, //首次缴费金额 
								"issueTime": "", //签单日期 
								"lowFlag": "A", //法定受益人标识 A-是;B-否 
								"oprCode": this.$route.query.userId, //录单员代码 
								"oprName": "", //录单员姓名 
								"plcyEffcTime": "", //保单生效时间 
								"plcyInvalidTime": "", //保单失效时间 
								"plcySts": "", //保单状态 
								"autoPayFlag": automaticFlag,
								"prem": this.allYearFee, //保费 
								"prodCode": this.$route.query.prodCode, //产品编码 
								"prodNo": this.mainRisk.cvrgNo, //产品代码 
								"prodName": this.$route.query.prodName, //产品名称 
								//						"prodName": "天安人寿健康源", //产品名称 
								"productPeriod": "", //产品期限 
								"productPeriodFlag": "", //产品期限标志
								"relaApplNo": "", //万能险关联投保单号
								"sumAmnt": this.money1, //保额合计 ,
								"sumPrem": this.allYearFee, //保费合计 
								"withdrawalDate": "", //撤单申请日期 
								"withdrawalTime": "" //撤单申请时间
							}
						} else {
							addMainData = {
								"agentCode": this.allDataInit.mainResp.agentCode, //代理人代码 
								"agentName": this.allDataInit.mainResp.agentName, //代理人名称 
								"amnt": this.money1, //保额
								"deptCode": this.allDataInit.mainResp.deptCode, //机构代码   
								"deptName": this.allDataInit.mainResp.deptName, //机构名称
								"agentDeptCode": this.allDataInit.mainResp.agentDeptCode, //代理机构
								"expireProcessMode": this.allDataInit.mainResp.expireProcessMode, //到期处理方式
								"firstPremium": this.allYearFee, //首期保费 
								"flightNo": this.allDataInit.mainResp.flightNo, //航班号 
								"initialPremamt": this.allYearFee, //首次缴费金额 
								"issueTime": this.allDataInit.mainResp.issueTime, //签单日期 
								"lowFlag": this.allDataInit.mainResp.lowFlag, //法定受益人标识 A-是;B-否 
								"oprCode": this.allDataInit.mainResp.oprCode, //录单员代码 
								"oprName": this.allDataInit.mainResp.oprName, //录单员姓名 
								"plcyEffcTime": this.allDataInit.mainResp.plcyEffcTime, //保单生效时间 
								"plcyInvalidTime": this.allDataInit.mainResp.plcyInvalidTime, //保单失效时间 
								"plcySts": this.allDataInit.mainResp.plcySts, //保单状态 
								"autoPayFlag": this.allDataInit.mainResp.autoPayFlag,
								"prem": this.allYearFee, //保费 
								"prodCode": this.allDataInit.mainResp.prodCode, //产品编码 
								"prodNo": this.allDataInit.mainResp.prodNo, //产品代码 
								"prodName": this.allDataInit.mainResp.prodName, //产品名称 
								//						"prodName": "天安人寿健康源", //产品名称 
								"productPeriod": this.allDataInit.mainResp.productPeriod, //产品期限 
								"productPeriodFlag": this.allDataInit.mainResp.productPeriodFlag, //产品期限标志
								"relaApplNo": this.allDataInit.mainResp.relaApplNo, //万能险关联投保单号
								"sumAmnt": this.money1, //保额合计 ,
								"sumPrem": this.allYearFee, //保费合计 
								"withdrawalDate": this.allDataInit.mainResp.withdrawalDate, //撤单申请日期 
								"withdrawalTime": this.allDataInit.mainResp.withdrawalTime //撤单申请时间
							}
						}
					} else {
						addMainData = {
							"agentCode": "10000015", //代理人代码 
							"agentName": "高薇", //代理人名称 
							"amnt": this.money1, //保额
							"deptCode": "47", //机构代码   
							"deptName": "", //机构名称
							"agentDeptCode": "8001", //代理机构
							"expireProcessMode": "", //到期处理方式
							"firstPremium": this.allYearFee, //首期保费 
							"flightNo": "", //航班号 
							"initialPremamt": this.allYearFee, //首次缴费金额 
							"issueTime": "", //签单日期 
							"lowFlag": "A", //法定受益人标识 A-是;B-否 
							"oprCode": this.$route.query.userId, //录单员代码 
							"oprName": "", //录单员姓名 
							"plcyEffcTime": "", //保单生效时间 
							"plcyInvalidTime": "", //保单失效时间 
							"plcySts": "", //保单状态 
							"autoPayFlag": automaticFlag,
							"prem": this.allYearFee, //保费 
							"prodCode": this.$route.query.prodCode, //产品编码 
							"prodNo": this.mainRisk.cvrgNo, //产品代码 
							"prodName": this.$route.query.prodName, //产品名称 
							//						"prodName": "天安人寿健康源", //产品名称 
							"productPeriod": "", //产品期限 
							"productPeriodFlag": "", //产品期限标志
							"relaApplNo": "", //万能险关联投保单号
							"sumAmnt": this.money1, //保额合计 ,
							"sumPrem": this.allYearFee, //保费合计 
							"withdrawalDate": "", //撤单申请日期 
							"withdrawalTime": "" //撤单申请时间
						}
					}

					var applntReq;
					if(this.allDataInit.applntResp == undefined) {
						applntReq = { //投保人信息、
							"relationToInsured": this.nexusType,
							"age": this.jsGetAge(this.InsureBr), //年龄
							"applName": this.InsureName, //投保人名字
							"birthday": this.InsureBr, //出生日期
							"gender": this.gender, //性别
							"occType": "", //职业大类 
							"occTypeNo": "", //职业大类代码
							"occDetailType": this.occupationBigName, //职业中类 
							"occDetailTypeNo": this.parCode, //职业中类代码
							"occName": this.occupationName, //职业小类 
							"occNo": this.occupationcode, //职业小类代码
						}
					} else {
						if(this.allDataInit.applntResp.certfCode == "" || this.allDataInit.applntResp.certfCode == undefined) {
							applntReq = { //投保人信息、
								"relationToInsured": this.nexusType,
								"age": this.jsGetAge(this.InsureBr), //年龄
								"applName": this.InsureName, //投保人名字
								"birthday": this.InsureBr, //出生日期
								"gender": this.gender, //性别
								"occType": "", //职业大类 
								"occTypeNo": "", //职业大类代码
								"occDetailType": this.occupationBigName, //职业中类 
								"occDetailTypeNo": this.parCode, //职业中类代码
								"occName": this.occupationName, //职业小类 
								"occNo": this.occupationcode, //职业小类代码
							}
						} else {
							applntReq = {
								"address": this.allDataInit.applntResp.address, //联系地址
								"age": this.jsGetAge(this.InsureBr), //年龄
								"applName": this.InsureName, //姓名
								"birthday": this.InsureBr, //出生日期
								"certfCode": this.allDataInit.applntResp.certfCode, //证件号码 ,
								"certfEndTime": this.allDataInit.applntResp.certfEndTime, //证件有效期
								"certfEnduringFlag": this.allDataInit.applntResp.certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 
								"certfType": this.allDataInit.applntResp.certfType, //证件类型 ,
								"city": this.allDataInit.applntResp.city, //地址市 
								"county": this.allDataInit.applntResp.county, //地址区县
								"email": this.allDataInit.applntResp.email, //邮箱
								"fullAddr": this.allDataInit.applntResp.fullAddr, //详细地址
								"gender": this.gender, //性别
								"height": this.allDataInit.applntResp.height, //  身高
								"incomeSource": this.allDataInit.applntResp.incomeSource, // 收入来源 
								"maritalStatus": this.allDataInit.applntResp.maritalStatus, //婚姻状态 ,
								"mobile": this.allDataInit.applntResp.mobile, // 联系电话
								"nationality": this.allDataInit.applntResp.nationality, //国籍 
								"occDetailType": this.occupationBigName, //职业中类 
								"occDetailTypeNo": this.parCode, //职业中类代码 
								"occName": this.occupationName, //职业名称
								"occNo": this.occupationcode, //职业名称代码 
								"occType": "", //职业大类 
								"occTypeNo": "", //职业大类代码
								"province": this.allDataInit.applntResp.province, //地址省
								"relationToInsured": this.nexusType, //投保人与被保人关系  后期从接口拉取
								"salary": this.allDataInit.applntResp.salary, //年收入
								"tel": this.allDataInit.applntResp.tel, //固定电话
								"weight": this.allDataInit.applntResp.weight, //体重
								"workCompany": this.allDataInit.applntResp.workCompany, //工作单位 
								"zipCode": this.allDataInit.applntResp.zipCode, //邮编
							}
						}
					}
					var insrntReq;
					if(this.allDataInit.insrntResp == undefined) {
						insrntReq = {
							"age": this.jsGetAge(this.InsuredBr), //年龄
							"insrntName": this.InsuredName, //投保人名字
							"birthday": this.InsuredBr, //出生日期
							"gender": this.gender1, //性别
							"occType": "", //职业大类 
							"occTypeNo": "", //职业大类代码
							"occDetailType": this.occupation1BigName, //职业中类 
							"occDetailTypeNo": this.parCode1, //职业中类代码
							"occName": this.occupation1Name, //职业小类 
							"occNo": this.occupation1code, //职业小类代码
							"relaToAppnt": this.nexusType //关系
						}
					} else {
						if(this.allDataInit.insrntResp.certfCode == "" || this.allDataInit.insrntResp.certfCode == undefined) {
							insrntReq = { //投保人信息、
								"age": this.jsGetAge(this.InsuredBr), //年龄
								"insrntName": this.InsuredName, //投保人名字
								"birthday": this.InsuredBr, //出生日期
								"gender": this.gender1, //性别
								"occType": "", //职业大类 
								"occTypeNo": "", //职业大类代码
								"occDetailType": this.occupation1BigName, //职业中类 
								"occDetailTypeNo": this.parCode1, //职业中类代码
								"occName": this.occupation1Name, //职业小类 
								"occNo": this.occupation1code, //职业小类代码
								"relaToAppnt": this.nexusType //关系
							}
						} else {
							insrntReq = { //投保人信息
								"address": this.allDataInit.insrntResp.address, //地址街道 
								"age": this.jsGetAge(this.InsuredBr), //年龄
								"birthday": this.InsuredBr, //出生年月 : 格式yyyy-MM-dd ,
								"certfCode": this.allDataInit.insrntResp.certfCode, //证件号码 ,
								"certfEndTime": this.allDataInit.insrntResp.certfEndTime, //证件有效期 : 格式yyyy-MM-dd ,
								"certfEnduringFlag": this.allDataInit.insrntResp.certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
								"certfType": this.allDataInit.insrntResp.certfType, //证件类型 ,
								"city": this.allDataInit.insrntResp.city, //地址市
								"county": this.allDataInit.insrntResp.county, //地址区县 
								"email": this.allDataInit.insrntResp.email, //邮箱
								"fullAddr": this.allDataInit.insrntResp.fullAddr, //详细地址
								"gender": this.gender1, //性别 : M-男;F-女 ,
								"height": this.allDataInit.insrntResp.height, //身高 ,
								"incomeSource": this.allDataInit.insrntResp.incomeSource, //收入来源 ,
								"insrntName": this.InsuredName, //被保人姓名 ,
								"maritalStatus": this.allDataInit.insrntResp.maritalStatus, //婚姻状态 ,
								"mobile": this.allDataInit.insrntResp.mobile, //联系电话 
								"nationality": this.allDataInit.insrntResp.nationality, //国籍
								"occDetailType": this.occupation1BigName, // 职业中类 ,
								"occDetailTypeNo": this.parCode1, //职业中类代码
								"occName": this.occupation1Name, //职业名称
								"occNo": this.occupation1code, //职业名称代码 
								"occType": "", //职业大类
								"occTypeNo": "", //职业大类代码 ,
								"province": this.allDataInit.insrntResp.province, // 地址省 ,
								"relaToAppnt": this.allDataInit.insrntResp.relaToAppnt, //与投保人关系 ,
								"salary": this.allDataInit.insrntResp.salary, //年收入
								"tel": this.allDataInit.insrntResp.tel, //固定电话
								"weight": this.allDataInit.insrntResp.weight, //体重
								"workCompany": this.allDataInit.insrntResp.workCompany, //工作单位 ,
								"zipCode": this.allDataInit.insrntResp.zipCode, //邮编 ,
							}
						}
					}
					var adddata = {
						"token": this.$route.query.token,
						"userId": this.$route.query.userId,
						"mark": "CALC",
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$route.query.userId,
							"prodCode": this.$route.query.prodCode
						},
						"opt": "MAIN,INSRNT,CVRG,APPL",
						"pkgNo": this.$route.query.orderNo,
						"applntReq": applntReq,
						"cvrgReq": this.cvrgReq,
						"insrntReq": insrntReq,
						"mainReq": addMainData
					}
					console.log(JSON.stringify(adddata));
					Indicator.open();
					this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', adddata)
						.then(res => {
							Indicator.close();
//							console.log("==222==" + JSON.stringify(res.data));
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								this.$router.push('/info1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
							} else {
								Toast(res.data.desc);
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})

				} else {
					Toast("请先阅读保险条款")
				}

			},
		},
		components: {
			Additional: Additional,
			TaCustuserList: TaCustuserList,
			Pdf: Pdf
		}
	}
</script>

<style scoped="scoped">
	.ctc_div_listitemleft {
		/*width: 3.2rem;*/
		display: block;
		float: left;
		line-height: 0.8rem;
	}
	
	.pr_span_title {
		display: block;
		float: left;
		width: 1.9rem;
		font-size: 0.28rem;
		color: #555555;
		line-height: 0.84rem;
		/*background: #669900;*/
		/*text-align: center;*/
		/*overflow: hidden;
		white-space: nowrap;*/
		/*margin-left: 0.32rem;*/
	}
	
	.marRightitem {
		margin-right: 0.15rem;
	}
	
	.prd_input_query {
		width: 6.46rem;
		height: 0.72rem;
		padding-left: 0.24rem;
		border: none;
		color: #666666;
		/*background: #EEEEEE;*/
		font-size: 0.34rem;
		line-height: 0.44rem;
	}
	
	.prd_img_query {
		display: block;
		float: left;
		width: 0.28rem;
		height: 0.28rem;
		margin-top: 0.22rem;
		margin-left: 0.2rem;
	}
	
	.ctc_div_bottombtn {
		width: 7.18rem;
		height: 0.91rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	
	.ctc_div_item {
		display: inline-block;
		width: 6.7rem;
		/*height: 0.86rem;*/
		/*margin: 0 auto;*/
		border-bottom: 0.02rem solid #C8C7CC;
		margin-left: 0.24rem;
	}
	
	.ctc_div_queryitemall {
		width: 7.18rem;
		height: 8.08rem;
		overflow: scroll;
	}
	
	.ctc_div_query {
		width: 7.18rem;
		height: 0.72rem;
		margin: 0 auto;
		/*margin-top: 1rem;*/
		background: rgba(255, 255, 255, 0.60);
		border-radius: 0.1rem;
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
	
	.pr_img_item {
		margin-top: 0.16rem;
		display: block;
		float: left;
		width: 0.64rem;
		height: 0.64rem;
	}
	
	.ctc_div_listitemall {
		width: 90%;
		height: 0.8rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #8E8E93;
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
	
	.ctc_div_list {
		margin-top: 0.3rem;
		width: 100%;
		height: 6rem;
		overflow-y: scroll;
		border-top: 0.01rem solid #8E8E93;
	}
	
	.ctc_div_markcenct {
		width: 7.5rem;
		/*height: 5rem;*/
		/*top: 50%;
		position: fixed;
		margin-top: -5.21rem;*/
		margin-top: 0.2rem;
	}
	
	.ctc_div_markcenct1 {
		width: 7.5rem;
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
	
	.blur_all {
		filter: blur(0);
	}
	
	.blur_all1 {
		position: fixed;
		filter: blur(0.18rem);
	}
	
	.ctc_div_mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		background: rgba(0, 0, 0, 0.40);
		z-index: 100;
	}
	
	.ctc_div_maskitem {
		width: 100%;
		height: 7rem;
		background: #ffffff;
		position: absolute;
		bottom: 0;
		padding-top: 0.32rem;
	}
	
	.pr_img_item1 {
		/*margin-left: 0.12rem;*/
		margin-top: 0.1rem;
		display: block;
		float: left;
		width: 0.64rem;
		height: 0.64rem;
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
	
	.rightimg {
		width: 3rem;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
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
	
	input {
		font-weight: 100;
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
		font-weight: 100;
	}
	
	input:-ms-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
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
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
		webkit-transform: translate3d(0,0,0);
-moz-transform: translate3d(0,0,0);
-ms-transform: translate3d(0,0,0);
-o-transform: translate3d(0,0,0);
transform: translate3d(0,0,0);
	}
	
	.twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	
	.twoCon2 {
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	
	.one .twoCon:first-child {
		margin-top: 0;
	}
	
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		border-bottom: solid 0.01rem #C8C7CC;
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
	
	.btnImg {
		display: inline-block;
		float: right;
		font-size: 0.32rem;
		font-weight: bold;
		color: #EB7760;
	}
	
	.btnBox {
		padding: 0 0.4rem;
		padding-bottom: 0.64rem;
		text-align: center;
	}
	
	.btnBox1 {
		position: absolute;
		left: 0;
		bottom: 0.64rem;
		padding-bottom: 0;
	}
	
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border: 0.02rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
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
	
	.inputGropq {
		position: relative;
		/*height: 0.88rem;*/
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
		/*background: #669900;*/
	}
	
	.inputLabel {
		display: block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	
	.inputLabel2 {
		display: block;
		width: 2.2rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	
	.inputLabel1 {
		line-height: 0.68rem;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
	}
	
	.inpuDate {
		width: 3rem;
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
	
	.selImg {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		margin-right: 0.26rem;
	}
	
	.selectBox {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
	}
	
	.inputText1 {
		display: block;
		width: 3.6rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	
	.inputTextRisk {
		display: block;
		width: 4.65rem;
		/*height: 0.88rem;*/
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		/*overflow: hidden;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;*/
	}
	
	.inputText2 {
		display: block;
		width: 4.6rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.pro {
		width: 3.6rem;
	}
	
	.dateInput {
		width: 3.4rem;
	}
	
	.inputWidth {
		width: 4.66rem;
	}
	
	.inputWidth1 {
		width: 3rem;
	}
	
	.inputWidth2 {
		width: 3.5rem;
	}
	
	.inputselect {
		height: 0.68rem;
	}
	
	.sBox {
		padding: 0 0.4rem;
		margin-top: 0.34rem;
		margin-bottom: 0.88rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
	}
	
	.sImg {
		display: block;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: -0.04rem;
	}
	
	.sDes {
		margin-left: 0.16rem;
	}
	
	.sSpan {
		color: #6BD1CF;
	}
	
	.inputselectP {
		position: relative;
		height: 0.68rem;
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
	
	.upDownImg3 {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.2rem;
	}
	
	.upDownImg {
		position: absolute;
		right: 0;
		top: 0.22rem;
		z-index: 3;
		width: 0.4rem;
		height: 0.44rem;
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
	
	.twoCon1 {
		margin-top: 0.4rem;
	}
	
	.sumBtn {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 3;
		width: 0.5rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.6rem;
		text-align: center;
		color: #EB7760;
	}
	
	.sexImg {
		display: inline-block;
		float: left;
		margin-top: 0.2rem;
		width: 0.48rem;
		height: 0.48rem;
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
		overflow: hidden;
	}
	
	.sexM {
		margin-right: 0.46rem;
	}
	
	.pushBox {
		margin: 0.4rem 0;
	}
	.pushBtn {
		display: block;
		width: 6.7rem;
		height: 0.88rem;
		margin: 0 auto;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #FFFFFF;
		background: #54CCC1;
		border-radius: 0.16rem;
		text-align: center;
	}
	
	.opa0 {
		z-index: 2;
	}
	.addBox {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.2);
	}
	.addBoxF {
		height: 100%;
		overflow: hidden;
	}
</style>