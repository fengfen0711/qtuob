<template>
	<div class="cs_div_body">
		<div v-if="!cust_Seven" class="custseven_sattus" @touchmove.prevent > 
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						你已经开启了客户生日智能匹配的功能，我们将通过大数据为你匹配和维护客户生日。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancercust" @click="clickknow">知道了</div>
				</div>
			</div>
		</div>
		<div v-if="!cust_Sevenstatus" class="custseven_sattus" @touchmove.prevent > 
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						你已经关闭了客户生日智能匹配的功能，我们将不再通过大数据为你匹配和维护客户生日。重新开启请在客户管理首页开启该功能。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancercust" @click="clickknowno">知道了</div>
				</div>
			</div>
		</div>
		<div v-if="!cust_status" class="custseven_sattus" @touchmove.prevent id="cust_id">
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">开启生日智能匹配</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						开启生日智能匹配功能，我们会为您匹配客户的生日，如有遗漏和错误，望您及时手动修复。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancer1" @click="notopen">暂不开启</div>
					<div class="cs_btn_bg"></div>
					<div class="cs_btn_cancer2" @click="openpipei">开启匹配</div>
				</div>
			</div>
		</div>
		<div v-if="!popup_mark" class="cs_div_centenall" @touchmove.prevent>
			<div class="cs_popup_bottom">
				<div class="cs_popup_topbtn">
					<div @click="cancel_br" class="cs_popup_topbtncancel">取消</div>
					<div @click="btnok_br" class="cs_popup_topbtnok">确定</div>
				</div>
				<div class="cs_popup_bottombg"></div>
				<div class="cs_popup_bottomitemall">
					<div ref="item" v-for="item in databr" @click="selectbr_ok($event,item.optKey)" class="cs_popup_bottomitem">{{item.optDesc}}</div>
				</div>
			</div>
		</div>
		<div v-if="!mark_flag" class="cs_div_centenall" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">新建客户</div>
				<div class="cs_div_openiput">
					<input v-model="addName" class="cs_input_name" placeholder="姓名*" type="text" maxlength="10" />
					<div class="cs_input_bottombg"></div>
					<input v-model="addIphone" class="cs_input_namebottom" placeholder="手机号" type="number" />
				</div>
				<div class="cs_btn_bootom">
					<div @click="cancel()" class="cs_btn_cancer">取消</div>
					<div class="cs_btn_bg"></div>
					<div @click="add_newCust" class="cs_btn_cancer">确定</div>
				</div>
			</div>
		</div>
		<div class="blur_all" :class="{blur_all1:test}" ref="test" id="blur_all">
			<div class="cs_div_titleNamenn">
				<div class="cs_div_screen1">
					<div class="cs_div_screenLeft1" @click="custreport">匹配报告{{nearbirth}}</div>
					<img class="cs_div_screenRightbtn1" src="/static/qijianwei/btn_nex.png" @click="custreport" />
					<div class="cs_div_screenRight1">
						<div @click="screen()" class="cs_div_screenRightscreen1" id="matching">自动匹配</div>
						<div>
							<!--<mt-switch v-model="value" class="switch_style" :result="filterResult"  ></mt-switch>-->
							<img src="/static/img/Slide1new.png" v-if="!slide" class="switch_style"  @click="aaa1"/>
							<img src="/static/img/Slidenew.png" v-if="slide" class="switch_style"  @click="aaa"/>
						</div>
						
					</div>
				</div>
			</div>
			<div class="cs_div_screen">

				<div class="cs_div_screenLeft">近{{optKey}}天过生日的客户({{brLength}})</div>
				<div class="cs_div_screenRight">
					<div @click="screen()" class="cs_div_screenRightscreen">筛选</div>
					<img class="cs_div_screenRightbtn" src="/static/qijianwei/btn_nex.png" />
				</div>
			</div>
			<div class="cs_div_sevenbr">
				<div @click="itemDetails(item2.custId)" v-for="item2 in sevenData" :class="item2.sex| className">
					<div :class="item2.sex| classNameName">{{item2.cName}}</div>
					<div :class="item2.sex| classNameTime">{{item2.birth}}</div>
					<div :class="item2.sex| classNameDate">{{item2.countDays | capitalize}}</div>
					<img :class="item2.sex| classNameClass" :src="item2.sex| classNameIMG" />
				</div>
			</div>
			<div class="cs_div_screen">
				<div class="cs_div_screenLeft">新创建的客户</div>
				<div class="cs_div_screenRight" >
					<div @click="all_Cust" class="cs_div_screenRightscreen">全部</div>
					<img class="cs_div_screenRightbtn" src="/static/qijianwei/btn_nex.png" />
				</div>
			</div>
			<div class="cs_div_sevenbr pad_98">
				<div @click="itemDetails(item1.custId)" v-for="item1 in add_cust" class="cs_div_sevenbritemadd">
					<div class="cs_div_additemName">{{item1.cName}}</div>
				</div>
			</div>
			<div class="cs_div_bootomCust">
				<div @click="addCust" class="cs_div_bootomCustadd">新建客户</div>
				<div @click="all_Cust" class="cs_div_bootomCustadd">全部客户</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Popup } from 'mint-ui';
	import { Switch } from 'mint-ui';
	export default {
		name: 'allSort',
		data() {
			return {
				mark_flag: true,
				popup_mark: true,
				databr: [],
				optKey: '',
				brLength: '0',
				edit_optKey: '',
				add_cust: [],
				addName: '',
				addIphone: '',
				sevenData: [],
				value: "",
				cust_status: true,
				test: false,
				nearbirth: "",
				cust_Seven:true,
				cust_Sevenstatus:true,
				slide:true,
			}
		},
		created() {
			
			this.init();
			this.initCreatCust();
			if(localStorage.remind_read == "Y") {
				this.cust_status = true;
			
				this.test = false
			} else {

				this.cust_status = false;
			
				this.test = true
			}
			this.custstatus();
			this.nearbirthday();

		},
		computed:{
			filterResult(){
				
			}
		},
		mounted() {
			console.log(this.$refs.test)
		},
		filters: {
			capitalize: function(value) {
				if(value == "0") {
					return '今天'
				} else {
					return value + '天后'
				}
			},
			className: function(value) {
				console.log("value===" + value)
				if(value == "M") {
					return 'cs_div_sevenbritem1'
				} else if(value == "F") {
					return 'cs_div_sevenbritem'
				} else {
					return 'cs_div_sevenbritem2'
				}
			},
			classNameName: function(value) {
				if(value == "M") {
					return 'cs_div_sevenbritemName'
				} else if(value == "F") {
					return 'cs_div_sevenbritemName'
				} else {
					return 'cs_div_sevenbritemName1'
				}
			},
			classNameTime: function(value) {
				if(value == "M") {
					return 'cs_div_sevenbritemTime'
				} else if(value == "F") {
					return 'cs_div_sevenbritemTime'
				} else {
					return 'cs_div_sevenbritemTime1'
				}
			},
			classNameDate: function(value) {
				if(value == "M") {
					return 'cs_div_sevenbritemDate'
				} else if(value == "F") {
					return 'cs_div_sevenbritemDate'
				} else {
					return 'cs_div_sevenbritemDate1'
				}
			},
			classNameIMG: function(value) {
				if(value == "M") {
					return '/static/qijianwei/man_rt.png'
				} else if(value == "F") {
					return '/static/qijianwei/womanrt.png'
				} else if(value == "") {
					return '/static/qijianwei/man_rt.png'
				}
			},
			classNameClass: function(value) {
				if(value == "M") {
					return 'cs_div_sevenbritemrt1'
				} else if(value == "F") {
					return 'cs_div_sevenbritemrt'
				} else if(value == "") {
					return 'cs_div_sevenbritemrt2'
				}
			}
		},
	
		methods: {
			aaa(){
				
					document.getElementById("matching").style.display = "block";
					var serardata = {

						"typeKey": "D0001",
						"userId": localStorage.getItem("userId"),
						"value": [
							"1"
						],
						"token": localStorage.getItem("token")

					}
					Indicator.open();
					this.$http.post(this.$store.state.link + "/pct/editConfigRead", serardata).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
						this.cust_Sevenstatus=false;
						this.test = true;
						this.slide=false;
						} else {
							if(res.data.desc != undefined) {
								Toast(res.data.desc);
							} else {
								console.log("分享接口undefined");
							}
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
				
			},
			aaa1(){
				document.getElementById("matching").style.display = "none";
					var serardata = {

						"typeKey": "D0001",
						"userId": localStorage.getItem("userId"),
						"value": [
							"0"
						],
						"token": localStorage.getItem("token")

					}
					Indicator.open();
					this.$http.post(this.$store.state.link + "/pct/editConfigRead", serardata).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
							this.cust_Seven=false;
							this.test = true;
							this.slide=true;
						} else {
							if(res.data.desc != undefined) {
								Toast(res.data.desc);
							} else {
								console.log("分享接口undefined");
							}
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
			},
			aaaknow(){
				
					document.getElementById("matching").style.display = "block";
					var serardata = {

						"typeKey": "D0001",
						"userId": localStorage.getItem("userId"),
						"value": [
							"1"
						],
						"token": localStorage.getItem("token")

					}
					Indicator.open();
					this.$http.post(this.$store.state.link + "/pct/editConfigRead", serardata).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
//						this.cust_Sevenstatus=false;
//						this.test = true;
						this.slide=false;
						} else {
							if(res.data.desc != undefined) {
								Toast(res.data.desc);
							} else {
								console.log("分享接口undefined");
							}
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
				
			},
			aaa1know(){
				document.getElementById("matching").style.display = "none";
					var serardata = {

						"typeKey": "D0001",
						"userId": localStorage.getItem("userId"),
						"value": [
							"0"
						],
						"token": localStorage.getItem("token")

					}
					Indicator.open();
					this.$http.post(this.$store.state.link + "/pct/editConfigRead", serardata).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
//							this.cust_Seven=false;
//							this.test = true;
							this.slide=true;
						} else {
							if(res.data.desc != undefined) {
								Toast(res.data.desc);
							} else {
								console.log("分享接口undefined");
							}
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
			},
			clickknowno(){
				this.cust_Sevenstatus=true;
				this.test = false;
				
			},
			clickknow(){
				this.cust_Seven=true;
				this.test = false;
			},
			nearbirthday() {
				var neardata = {
					"userId": localStorage.getItem("userId"),
					"token": localStorage.getItem("token")
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/cut/cut/queryNoReadyBirByUserId", neardata).then(res => {
					Indicator.close();
					console.log("14444====" + JSON.stringify(res.data));
					if(res.data.code == "SYS_S_000") {
						this.nearbirth = res.data.output.count;
						if(res.data.code == "SYS_S_000") {
							if(this.nearbirth == 0) {
								this.nearbirth = "";
							} else if(this.nearbirth <= 99) {
								this.nearbirth = "(" + this.nearbirth + ")"
							} else {
								this.nearbirth = "(99+)"
							}
						}

					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {

						}
					}
				}, res => {
					Indicator.close();

				});
			},
			custstatus() {
				var creatdata = {
					"typeKey": "",
					"userId": localStorage.getItem("userId"),
					"token": localStorage.getItem("token")
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/pct/selConfigRead", creatdata).then(res => {
					Indicator.close();
					console.log("111====" + JSON.stringify(res.data));
					if(res.data.code == "SYS_S_000") {
						if(res.data.output[0].value == "0") {
//							this.value = false;
				document.getElementById("matching").style.display = "none";
							this.slide=true;
						} else {
//							this.value = true;
							this.slide=false;
							document.getElementById("matching").style.display = "block";
						}
					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {

						}
					}
				}, res => {
					Indicator.close();

				});
			},
			notopen() {

				var data = {
					"typeKey": "",
					"userId": localStorage.getItem("userId"),
					"token": localStorage.getItem("token")
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/pct/editRead", data).then(res => {
					Indicator.close();
					console.log("mmmm777=="+JSON.stringify(res.data));
					if(res.data.code == "SYS_S_000") {
						this.cust_status = true;
						this.test = false;
//						this.value=false;
						this.slide=false;
						document.getElementById("matching").style.display = "block";
						window.localStorage.remind_read = "Y";
						this.aaaknow();
					} else {
						this.cust_status = true;
						this.test = false;
						this.slide=false;
						window.localStorage.remind_read = "Y";
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});

			},
			openpipei(){
				var data = {
					"typeKey": "",
					"userId": localStorage.getItem("userId"),
					"token": localStorage.getItem("token")
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/pct/editRead", data).then(res => {
					Indicator.close();
					console.log(res.data);
					if(res.data.code == "SYS_S_000") {
						this.cust_status = true;
						this.test = false;
						this.slide=true;
//						this.value=true;
					document.getElementById("matching").style.display = "none";
					window.localStorage.remind_read = "Y";
					this.aaa1know();
					} else {
						this.cust_status = true;
						this.test = false;
						this.slide=true;
						window.localStorage.remind_read = "Y";
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});
			},
			custreport() {
				this.$router.push('/matchReport');
			},
			itemDetails(custId) {
				this.$router.push('/manage?custId=' + custId);
			},
			all_Cust() {
				this.$router.push('/all');
			},
			addCust() {
				this.mark_flag = false;
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all1");
				this.addName = "";
				this.addIphone = "";
			},
			cancel() {
				this.mark_flag = true;
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all");
			},
			screen() {
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all1");
				this.popup_mark = false;
			},
			cancel_br() {
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all");
				this.popup_mark = true;
			},
			checkIphone() {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(this.addIphone)) {
					return false;
				} else {
					return true;
				}

			},
			add_newCust() {
				if(this.addName == "") {
					Toast("姓名不得为空");
					return;
				}
				if(this.addIphone != "") {
					if(!this.checkIphone()) {
						Toast("手机号格式不正确")
						return;
					}
				}
				var saveData = {
					"brokerId": localStorage.BrokerId,
					"userId": localStorage.getItem("userId"),
					"cName": this.addName,
					"mobile": this.addIphone,
					"token": localStorage.token,
					"userId": localStorage.userId,
					"email": "",
					"idNo": ""
				};

				Indicator.open();
				this.$http.post(this.$store.state.link + "/cut/cut/addCust", saveData).then(res => {
					Indicator.close();
					console.log("回来的数据1" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.initCreatCust();
//						this.btnok_br();
						this.mark_flag = true;
						var blur_all = document.getElementById("blur_all");
						blur_all.setAttribute("class", "blur_all");
					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("分享接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});

			},
			btnok_br() {
				//点击选择时间
				var leastBirCustData = {
					"rangeDay": this.edit_optKey,
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				this.optKey = this.edit_optKey;
				window.localStorage.optKey = this.edit_optKey;
				console.log(leastBirCustData);
				Indicator.open();
				this.$http.post(this.$store.state.link + "/cut/cut/querylatelyBirCustList", leastBirCustData).then(res => {
					Indicator.close();
					console.log("回来的数据1" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.brLength = res.data.output.latelyBirCustList.length;
						this.sevenData = res.data.output.latelyBirCustList;

					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("分享接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});
				this.cancel_br();
			},
			selectbr_ok(ev, Key) {
				for(var i = 0; i < this.$refs.item.length; i++) {
					this.$refs.item[i].setAttribute("class", "cs_popup_bottomitem");
				}
				ev.currentTarget.setAttribute("class", "cs_popup_bottomitem1");
				console.log(ev.currentTarget)
				this.edit_optKey = Key;
			},
			init() {
			
				//默认下拉列表
				var selectDaysData = {
					"dicType": "D0001",
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				Indicator.open();
				console.log(this.$store.state.link + "/cut/cut/queryBirthdayOpt");
				console.log(selectDaysData);
				this.$http.post(this.$store.state.link + "/cut/cut/queryBirthdayOpt", selectDaysData).then(res => {
					Indicator.close();
					console.log("回来的数据" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.databr = res.data.output;
						if(localStorage.optKey == undefined || localStorage.optKey == "") {
							for(var i = 0; i < this.databr.length; i++) {
								if(this.databr[i].defVal == "Y") {
									this.optKey = this.databr[i].optKey;
									console.log("optKey1===" + this.optKey)
								}
							}
						} else {
							this.optKey = localStorage.optKey;

						}
						//						
						this.init_cust();
					} else {
						if(res.data.desc != undefined || res.data.desc != null) {
							//							Toast(res.data.desc);
						} else {
							console.log("分享接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===失败" + res.data)
				});
			},
			init_cust() {
				//默认选择时间
				var leastBirCustData = {
					"rangeDay": this.optKey,
					"userId": localStorage.getItem("userId"),
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				console.log(leastBirCustData);
				Indicator.open();
				this.$http.post(this.$store.state.link + "/cut/cut/querylatelyBirCustList", leastBirCustData).then(res => {
					Indicator.close();
					console.log("回来的数据5" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.brLength = res.data.output.latelyBirCustList.length;
						this.sevenData = res.data.output.latelyBirCustList;
					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("分享接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});
			},
			initCreatCust() {

				var newCreateCustData = {
					"userCount": "",
					"userId": localStorage.getItem("userId"),
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				console.log("newCreateCustData==" + JSON.stringify(newCreateCustData))
				Indicator.open();
				this.$http.post(this.$store.state.link + "/cut/cut/queryNewAddCustList", newCreateCustData).then(res => {
					Indicator.close();
					console.log("回来的数据2" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						if(res.data.output.length < 10) {
							this.add_cust = res.data.output;
						} else {
							for(var z = 0; z < 9; z++) {
								this.add_cust.push(res.data.output[z])
							}
						}

					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("分享接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===失败2" + res.data)
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.cs_div_body {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #F8F8F8;
	}
	
	.cs_div_titleName {
		width: 7.2rem;
		/*height: 0.7rem;*/
		font-size: 0.68rem;
		color: #222222;
		font-weight: bold;
		/*padding-top: 0.34rem;*/
		padding-left: 0.3rem;
		/*padding-bottom: 0.32rem;*/
		background: #ffffff;
	}
	
	.cs_div_screen {
		width: 100%;
		height: 0.88rem;
		background: #FFFFFF;
	}
	
	.cs_div_screen1 {
		height: 0.86rem;
		background: #FFFFFF;
		border-bottom: 0.01rem solid;
		border-bottom-color: #E3E3E3;
	}
	
	.cs_div_screenLeft {
		display: block;
		float: left;
		font-size: 0.32rem;
		color: #000000;
		line-height: 0.88rem;
		margin-left: 0.32rem;
	}
	
	.cs_div_screenLeft1 {
		display: block;
		float: left;
		font-size: 0.32rem;
		color: #000000;
		line-height: 0.86rem;
		/*margin-left: 0.32rem;*/
	}
	
	.cs_div_screenRight {
		display: block;
		float: right;
		width: 1.1rem;
		height: 0.88rem;
		margin-right: 0.16rem;
	}
	
	.cs_div_screenRight1 {
		display: block;
		float: right;
		width: 2.5rem;
		height: 0.88rem;
		margin-right: 0.16rem;
	}
	
	.cs_div_screenRightscreen {
		display: block;
		float: left;
		font-size: 0.28rem;
		color: #EB6067;
		line-height: 0.88rem;
	}
	
	.cs_div_screenRightscreen1 {
		display: none;
		float: left;
		font-size: 0.28rem;
		/*color: #EB6067;*/
		color:#008000;
		line-height: 0.86rem;
	}
	
	.cs_div_screenRightbtn {
		display: block;
		float: left;
		width: 0.52rem;
		height: 0.52rem;
		margin-top: 0.14rem;
	}
	
	.cs_div_screenRightbtn1 {
		display: block;
		float: left;
		width: 0.52rem;
		height: 0.52rem;
		margin-top: 0.15rem;
	}
	
	.cs_div_sevenbr {
		width: 7.18rem;
		padding-left: 0.32rem;
		padding-top: 0.16rem;
		padding-bottom: 0.16rem;
		background: #F8F8F8;
		overflow: hidden;
	}
	
	.pad_98 {
		padding-bottom: 0.98rem;
	}
	
	.cs_div_sevenbritem {
		display: block;
		float: left;
		width: 2.2rem;
		height: 1.4rem;
		background: url(/static/qijianwei/woman_bg.png) no-repeat;
		background-size: contain;
		position: relative;
		margin-bottom: 0.16rem;
		margin-right: 0.14rem;
	}
	
	.cs_div_sevenbritem1 {
		display: block;
		float: left;
		width: 2.2rem;
		height: 1.4rem;
		background: url(/static/qijianwei/man_bg.png) no-repeat;
		/*border-radius: 0.1rem;*/
		background-size: contain;
		position: relative;
		margin-bottom: 0.16rem;
		margin-right: 0.14rem;
	}
	
	.cs_div_sevenbritem2 {
		display: block;
		float: left;
		width: 2.2rem;
		height: 1.4rem;
		background: url(/static/qijianwei/logoAdd.png) no-repeat;
		/*border-radius: 0.1rem;*/
		background-size: contain;
		position: relative;
		margin-bottom: 0.16rem;
		margin-right: 0.14rem;
	}
	
	.cs_div_sevenbritemadd {
		display: block;
		float: left;
		width: 2.2rem;
		height: 1.4rem;
		background: url(/static/qijianwei/logoAdd.png) no-repeat;
		background-size: contain;
		margin-bottom: 0.16rem;
		margin-right: 0.14rem;
	}
	
	.cs_div_sevenbritemName {
		width: 1.4rem;
		font-size: 0.28rem;
		color: #FFFFFF;
		margin-left: 0.16rem;
		padding-top: 0.16rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.cs_div_sevenbritemName1 {
		width: 1.4rem;
		font-size: 0.28;
		color: #000000;
		margin-left: 0.16rem;
		padding-top: 0.16rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.cs_div_sevenbritemTime {
		font-size: 0.2rem;
		color: #FFFFFF;
		margin-left: 0.16rem;
		margin-top: 0.16rem;
	}
	
	.cs_div_sevenbritemTime1 {
		font-size: 0.2rem;
		color: #000000;
		margin-left: 0.16rem;
		margin-top: 0.16rem;
	}
	
	.cs_div_sevenbritemDate {
		font-size: 0.28rem;
		color: #FFFFFF;
		margin-left: 0.16rem;
		margin-top: 0.16rem;
	}
	
	.cs_div_sevenbritemDate1 {
		font-size: 0.28rem;
		color: #000000;
		margin-left: 0.16rem;
		margin-top: 0.16rem;
	}
	
	.cs_div_sevenbritemrt {
		width: 0.48rem;
		height: 0.5rem;
		position: absolute;
		top: 0.16rem;
		right: 0.16rem;
	}
	
	.cs_div_sevenbritemrt {
		width: 0.48rem;
		height: 0.5rem;
		position: absolute;
		top: 0.16rem;
		right: 0.16rem;
	}
	
	.cs_div_sevenbritemrt1 {
		width: 0.48rem;
		height: 0.46rem;
		position: absolute;
		top: 0.16rem;
		right: 0.16rem;
	}
	
	.cs_div_sevenbritemrt2 {
		display: none;
		width: 0.48rem;
		height: 0.46rem;
		position: absolute;
		top: 0.16rem;
		right: 0.16rem;
	}
	
	.cs_div_additemName {
		font-size: 0.28rem;
		color: #222222;
		margin-top: 0.16rem;
		margin-left: 0.16rem;
	}
	
	.cs_div_bootomCust {
		width: 100%;
		height: 0.98rem;
		background: #ffffff;
		position: fixed;
		bottom: 0;
	}
	
	.cs_div_bootomCustadd {
		display: block;
		float: left;
		width: 3.75rem;
		height: 0.96rem;
		font-size: 0.32rem;
		color: #EB7760;
		line-height: 0.98rem;
		text-align: center;
	}
	
	.cs_div_centen {
		overflow: hidden;
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.90);
		border-radius: 0.26rem;
		position: relative;
	}
	
	.cs_div_centenall {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
	}
	
	.custseven_sattus {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
	}
	
	.cs_div_opentitle {
		width: 100%;
		height: 0.36rem;
		text-align: center;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
		margin-top: 0.32rem;
	}
	
	.cs_div_openiput {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		border: 0.01rem solid #8E8E93;
	}
	
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	
	.cs_input_name {
		border-radius: 0;
		border: none;
		width: 4.66rem;
		height: 0.6rem;
		font-size: 0.24rem;
		color: #8A8A8F;
		padding-left: 0.1rem;
	}
	
	.cs_input_namebottom {
		border-radius: 0;
		border: none;
		width: 4.66rem;
		height: 0.6rem;
		font-size: 0.24rem;
		color: #8A8A8F;
		padding-left: 0.1rem;
		border-top: 0.01rem solid #8E8E93;
	}
	
	.cs_input_bottombg {
		width: 100%;
		height: 0.01rem;
		background: #8E8E93;
	}
	
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	
	.cs_btn_cancer {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
	}
	
	.cs_btn_cancer1 {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
	.cs_btn_cancercust{
		display: block;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
	.cs_btn_cancer2 {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		font-weight: bold;
	}
	
	.cs_btn_bg {
		display: block;
		float: left;
		height: 0.88rem;
		width: 0.01rem;
		background: #CCCCCC;
	}
	
	.blur_all {
		width: 100%;
		height: 100%;
	}
	
	.blur_all1 {
		filter: blur(0.18rem);
	}
	
	.cs_popup_bottom {
		width: 100%;
		height: 5rem;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
	}
	
	.cs_popup_topbtn {
		width: 100%;
		height: 0.84rem;
		/*background: #669900;*/
	}
	
	.cs_popup_topbtncancel {
		display: block;
		float: left;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.84rem;
		margin-left: 0.32rem;
	}
	
	.cs_popup_topbtnok {
		display: block;
		float: right;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.84rem;
		margin-right: 0.32rem;
	}
	
	.cs_popup_bottombg {
		width: 100%;
		height: 0.02rem;
		background: #EEEEEE;
		margin-bottom: 0.3rem;
	}
	
	.cs_popup_bottomitem {
		width: 100%;
		height: 0.4rem;
		font-size: 0.28rem;
		color: #555555;
		line-height: 0.4rem;
		text-align: center;
		margin-bottom: 0.32rem;
	}
	
	.cs_popup_bottomitem1 {
		width: 100%;
		height: 0.4rem;
		font-size: 0.36rem;
		color: #555555;
		line-height: 0.4rem;
		text-align: center;
		margin-bottom: 0.32rem;
	}
	
	.cs_popup_bottomitemall {
		width: 100%;
		height: 3.84rem;
		overflow-y: scroll;
	}
	
	.cs_div_titleNamenn {
		height: 0.88rem;
		background: #FFFFFF;
		padding: 0 0 0 0.32rem;
	}
	
	.cs_div_style {
		/*width: 3.5rem;*/
	}
	
	.cs_div_reprot {
		font-size: 0.32rem;
		color: #000000;
		line-height: 0.88rem;
		display: inline-block;
		border: 1px solid red;
	}
	
	.cs_div_padding {
		border-bottom: 0.01rem solid;
		border-bottom-color: #E3E3E3;
		/*height: 0.88rem;*/
	}
	
	.cs_div_img {
		width: 0.52rem;
		height: 0.52rem;
		border: 1px solid red;
	}
	
	.matching {
		display: inline-block;
		/*float:right;
		margin-right: 0.2rem;*/
		/*width: 1rem;*/
		border: 1px solid red;
		height: 0.88rem;
	}
	
	.automatic {
		display: inline-block;
		line-height: 0.88rem;
		margin-bottom: 0.26rem;
	}
	.switch_style{
		width: 0.9rem;
		height: 0.54rem;
		float: right;
		margin-top: 0.08rem;
	}
	.cust_p{
		text-align: justify;
	}
</style>