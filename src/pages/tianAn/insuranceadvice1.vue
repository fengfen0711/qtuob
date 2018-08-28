<template>
	<div class="insuranceadvice_all" :class="{opa0:!hui}" ref='bg'>
		<div class="insuracce_bg">
			<div v-if="hui" class="insuranceadvice_div">
				<p class="insuranceadvice_thing">投保人告知事项</p>
			</div>
			<div v-show="item.showFlag==1" :showOrder="item.showOrder" ref="father" :flag="item.showFlag" v-for="(item,index) in tabs" yn="0" :status="item.status" style="clear: both;" :code="item.quesNo">
				<div class="insuranceadvice_line" style="clear: both;">
					<div class="insuranceadvice_span" v-html="msg(item.quesCont)"></div>
					<div class="insuranceadvice_quest" v-show="item.quesOptList!=undefined">
						<div class="insurance_yes" v-model="item.optNo" @click="insurance_yes($event,index)">是</div>
						<div class="insurance_no" v-model="item.optNo" @click="insurance_no($event,index)">否</div>
					</div>
				</div>
				<div class="insurance_hidden" ref="dis" @click="hhh($event)">
					<p v-html="msg(item.quesRmk)"></p>
				</div>
			</div>
			<div v-if="hui" class="insurance_boo">
				<img src="/static/img/icon_select2_unfocu.png" ref="no" class="insurance_img1" @click="img_yes" v-model="mm" />
				<img src="/static/img/icon_select1_focus@2x.png" ref="yes" class="insurance_img" @click="img_no" v-model="mm" />
				<div class="insurance_content">我已阅读投保人告知项全部内容。</div>
			</div>
			<div v-if="hui" class="insurance_div_botom">
				<div @click="back" class="insurance_up">上一步</div>
				<div class="insurance_next" @click="next">下一步</div>
			</div>
			<div class="mask" v-if="mask">
				<p class="mask_title">添加投保经历</p>
				<div class="mask_in">
					<span class="mask_tou">承保公司</span>
					<input class="mask_wei" type="text" v-model="td1" placeholder="公司名称" />
				</div>
				<div class="mask_in">
					<span class="mask_tou">身故保额</span>
					<input class="mask_wei" type="text" v-model="td2" placeholder="输入金额（万元）" />
				</div>
				<div class="mask_in">
					<span class="mask_tou">承保日期</span>
					<input class="mask_wei selectimg" type="date" v-model="td3" />
				</div>
				<div class="mask_in">
					<span class="mask_tou">保单状态</span>
					<select class="mask_wei selectimg" v-model="td4">
						<option value="生效">生效</option>
						<option value="未生效">未生效</option>
					</select>
					<!--<input type="text" v-model="td4"/>-->
				</div>
				<div class="mask_in">
					<span class="mask_tou">理赔经历</span>
					<select class="mask_wei selectimg" v-model="td5">
						<option value="有">有</option>
						<option value="无">无</option>
					</select>
				</div>
				<div class="insurance_up btn_left" @click="handleClickCon(1)">
					取消
				</div>
				<div class="insurance_next btn_right" @click="handleClickCon(2)">
					确定
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	var flag = "";
	export default {
		name: "insuranceadvice",
		props: ['backview'],
		data() {
			return {
				imgtt: true,
				istrue: false,
				//				istrue1:true,
				mm: "1",
				tabs: [],
				insurance: false,
				hui: true,
				mask: false,
				td1: "",
				td2: "",
				td3: "",
				td4: "",
				td5: "",
				mery: "",
				code: false,
				backData: "",
				sourceList: "",
				gender: "",
				age: ""
			}
		},
		beforeCreate() {

		},
		created() {
			if(this.backview == "hui") {
				this.hui = false;
			}
			var data = {
				"token": this.$route.query.token,
				"userId": this.$route.query.userId,
				"head": {
					"channelCode": "qtb_h5",
					"deptCode": this.$route.query.cmpCode,
					"oprCode": this.$route.query.userId,
					"prodCode": this.$route.query.prodCode

				},
				"opt": "APPL",
				"pkgNo": this.$route.query.orderNo, //订单号
			}

			this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
				.then(res => {
					if(res.data.code == "SYS_S_000") {
//						console.log(res.data.output)
						this.age = res.data.output.applntResp.age;
						this.gender = res.data.output.applntResp.gender;
						this.getList()

					} else {
						Toast(res.data.desc)
					}

				}, res => {
					console.log(res.data);
				})
			this.getDate()
			
		},
		updated() {
			var item = this.$refs.father;
			this.backView()
			var c = document.getElementsByClassName('inputAn')
			var tab = document.getElementsByTagName('table')[0]
			var txta = document.getElementsByTagName('textarea')
			var selec = document.getElementsByTagName('select')[0]
			//			txta.setAttribute('style','width: 100%;margin-bottom: .2rem;height:2rem')
			var spa;
			tab.setAttribute('border', '1')
			tab.setAttribute('style', 'margin-bottom: .2rem;')
			var td = tab.getElementsByTagName('td');
			for(var i = 0, j = item.length; i < j; i++) {
				if(item[i].getElementsByTagName('table')[0] != undefined) {
					var para = document.createElement("span");
					item[i].getElementsByClassName('insurance_hidden')[0].appendChild(para)
					spa = item[i].getElementsByTagName('span')[0]
				}
				if(item[i].getAttribute('code') == 100) {
					item[i].getElementsByTagName('select')[0].setAttribute('style', "width: 2rem;height:.8rem;font-size:.28rem;line-height:.5rem;border:none;")
//					console.log(this.sourceList.length)
					for(var m = 0, n = this.sourceList.length; m < n; m++) {
//						console.log(1)
						var para = document.createElement("option");
						item[i].getElementsByTagName('select')[0].appendChild(para)

						item[i].getElementsByTagName('option')[m].innerHTML = this.sourceList[m].name
						item[i].getElementsByTagName('option')[m].setAttribute('value', this.sourceList[m].code)
						//						item[i].setAttribute('style',"margin-bottom: .2rem;")

					}
					var stab = item[i].getElementsByTagName('span')

				}
			}
			spa.innerHTML = "填写"
			spa.setAttribute('style', 'display:block;text-align:center;width: 1.12rem;height: 0.6rem;border-radius: 0.08rem;background: #54CCC1;color:#fff;line-height: 0.6rem;margin: 0 auto .2rem;')

			for(var i = 0, j = c.length; i < j; i++) {
				c[i].setAttribute('style', 'width:.98rem;height:.4rem;border:0;border-radius:0; border-bottom:0.01rem solid #222;text-align:center;"')
			}
			for(var i = 0, j = txta.length; i < j; i++) {
				txta[i].setAttribute('style', 'width: 100%;margin-bottom: .2rem;height:2rem')
				txta[i].setAttribute('placeholder', '请输入具体描述')
			}
			for(var i = 0, j = td.length; i < j; i++) {
				td[i].setAttribute('style', 'width:1.2rem;text-align:center')
			}
		},
		methods: {
			getList() {
				var data = {
					"age": this.age,
					//				"amnt": this.$route.query.userId,
					"gender": this.gender,
					//				"prem":"",
					"prodCode": this.$route.query.prodCode
				}
				console.log(data)
				this.$http.post(this.$store.state.link + '/prd/prod/heallist', data)
					.then(res => {
						if(res.data.code == "SYS_S_000") {
							this.tabs = res.data.output;

						} else {
							Toast(response.data.desc)
						}
					}, data => {
						console.log(data.data);
					})
			},
			getDate() {
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode
					},
					"opt": "APPLNOT",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				console.log(JSON.stringify(data))
				this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
					.then(res => {
						//						console.log(res.data.output)
						this.backData = res.data.output.applNotResp
						console.log(JSON.stringify(this.backData))
						//						this.backView()

					}, res => {
						console.log(res.data);
					})
			},
			backView() {
				var arr = [],
					item = this.$refs.father,
					list = document.getElementsByClassName('inputAn');
				for(var i = 0, j = item.length; i < j; i++) {
					if(item[i].getAttribute('status') == 1) {
						arr.push(item[i])
					}
				}
				console.log(JSON.stringify(this.backData))
				for(var i = 0, j = this.backData.length; i < j; i++) {
					if(this.backData[i].noticeAnswer1 != undefined && arr[i].getElementsByClassName('inputAn').length > 0) {
						//						console.log(this.backData[i].noticeAnswer1)
						arr[i].setAttribute('yn', 1)
						arr[i].getElementsByClassName('insurance_hidden')[0].style.display = "block"
						arr[i].getElementsByClassName('insurance_yes')[0].setAttribute('class', "insurance_yes1")
						arr[i].getElementsByClassName('insurance_no')[0].setAttribute('class', "insurance_no1")
						arr[i].getElementsByClassName('inputAn')[0].value = this.backData[i].noticeAnswer1
						if(this.backData[i].noticeAnswer2 != undefined) {
							//							console.log(arr[i].getElementsByTagName('select'))
							if(arr[i].getElementsByTagName('select').length > 0) {
								arr[i].getElementsByClassName('sel')[0].value = this.backData[i].noticeAnswer2
							} else if(arr[i].getElementsByClassName('inputAn').length > 1) {
								arr[i].getElementsByClassName('inputAn')[1].value = this.backData[i].noticeAnswer2
								if(this.backData[i].noticeAnswer3 != undefined && arr[i].getElementsByClassName('inputAn').length > 2) {
									arr[i].getElementsByClassName('inputAn')[2].value = this.backData[i].noticeAnswer3
									if(this.backData[i].noticeAnswer4 != undefined && arr[i].getElementsByClassName('inputAn').length > 3) {
										arr[i].getElementsByClassName('inputAn')[3].value = this.backData[i].noticeAnswer4
										if(this.backData[i].noticeAnswer5 != undefined && arr[i].getElementsByClassName('inputAn').length > 4) {
											arr[i].getElementsByClassName('inputAn')[4].value = this.backData[i].noticeAnswer5
											if(this.backData[i].noticeAnswer6 != undefined && arr[i].getElementsByClassName('inputAn').length > 5) {
												arr[i].getElementsByClassName('inputAn')[5].value = this.backData[i].noticeAnswer6
												if(this.backData[i].noticeAnswer6 != undefined && arr[i].getElementsByClassName('inputAn').length > 6) {
													arr[i].getElementsByClassName('inputAn')[6].value = this.backData[i].noticeAnswer7
												}
											}
										}
									}
								}
							}

						}
					} else if(this.backData[i].noticeAnswer1 != undefined && arr[i].getElementsByTagName('textarea').length > 0) {
						arr[i].setAttribute('yn', 1)
						arr[i].getElementsByClassName('insurance_hidden')[0].style.display = "block"
						arr[i].getElementsByClassName('insurance_yes')[0].setAttribute('class', "insurance_yes1")
						arr[i].getElementsByClassName('insurance_no')[0].setAttribute('class', "insurance_no1")
						arr[i].getElementsByTagName('textarea')[0].innerHTML = this.backData[i].noticeAnswer1
					} else if(this.backData[i].noticeAnswer1 != undefined && arr[i].getElementsByTagName('table').length > 0) {
						arr[i].setAttribute('yn', 1)
						arr[i].getElementsByClassName('insurance_hidden')[0].style.display = "block"
						arr[i].getElementsByClassName('insurance_yes')[0].setAttribute('class', "insurance_yes1")
						arr[i].getElementsByClassName('insurance_no')[0].setAttribute('class', "insurance_no1")
						arr[i].getElementsByTagName('td')[6].innerHTML = this.backData[i].noticeAnswer1
						arr[i].getElementsByTagName('td')[7].innerHTML = this.backData[i].noticeAnswer2
						arr[i].getElementsByTagName('td')[8].innerHTML = this.backData[i].noticeAnswer3
						arr[i].getElementsByTagName('td')[9].innerHTML = this.backData[i].noticeAnswer4
						arr[i].getElementsByTagName('td')[10].innerHTML = this.backData[i].noticeAnswer5
						arr[i].getElementsByTagName('td')[11].innerHTML = this.backData[i].noticeAnswer6
					} else if(this.backData[i].noticeAnswer1 != undefined && arr[i].getElementsByTagName('select').length > 0) {
						arr[i].setAttribute('yn', 1)
						arr[i].getElementsByClassName('insurance_hidden')[0].style.display = "block"
						arr[i].getElementsByClassName('insurance_yes')[0].setAttribute('class', "insurance_yes1")
						arr[i].getElementsByClassName('insurance_no')[0].setAttribute('class', "insurance_no1")
						arr[i].getElementsByTagName('select')[0].value = this.backData[i].noticeAnswer2
						console.log(arr[i].getElementsByTagName('select')[0].value)
					}
				}
			},
			hhh(e) {
				if(e.currentTarget.getElementsByTagName('span')[0] != undefined) {
					this.mask = true
					this.$refs.bg.style.position = "fixed"
				}
			},
			back() {
				window.history.go(-1)
			},
			msg(value) {
				//				console.log(value)
				if(value != undefined) {
					//					var subStr = new RegExp('###')
					//					var subStr1 = new RegExp('#**')
					return value = value.replace(/###/g, '<input ref="iii" type="text" class="inputAn" style=""/>').replace(/textarea/g, "<textarea></textarea>").replace(/select/g, "<select class='sel'></select>")

				}
			},
			drinking() {
				document.getElementById("information_bottom_btn").className = "information_bottom_btn1"
			},
			havedring() {
				document.getElementById("information_bottom_btn").className = "information_bottom_btn1"
			},
			insurance_yes(e, index) {
				e.currentTarget.setAttribute('class', 'insurance_yes1')
				e.currentTarget.nextElementSibling.setAttribute('class', 'insurance_no1')
				this.$refs.dis[index].style.display = "block"
				e.currentTarget.parentNode.parentNode.parentNode.setAttribute('yn', '1')

			},
			insurance_no(e, index) {
				e.currentTarget.setAttribute('class', 'insurance_no')
				e.currentTarget.previousElementSibling.setAttribute('class', 'insurance_yes')
				this.$refs.dis[index].style.display = "none"
				e.currentTarget.parentNode.parentNode.parentNode.setAttribute('yn', '0')
			},
			next_up() {
				window.history.go(-1)
			},
			img_yes() {
				console.log(this.$refs.no)
				this.$refs.no.setAttribute('class','insurance_img')
				this.$refs.yes.setAttribute('class','insurance_img1')
//				this.imgtt = false;
//				this.mm = "2";

			},
			img_no() {
				this.$refs.no.setAttribute('class','insurance_img1')
				this.$refs.yes.setAttribute('class','insurance_img')
//				this.imgtt = true;
//				this.mm = "1";

			},
			next() {

				var list = document.getElementsByClassName('inputAn'),
					arr = [],
					item = this.$refs.father,
					mery = [];
				for(var i = 0, j = list.length; i < j; i++) {
					if(list[i].parentNode.parentNode.style.display == "block") {
						arr.push(list[i].value)
					}

				}

				for(var i = 0, j = item.length; i < j; i++) {
					if(item[i].getAttribute('status') == 1) {
						if(item[i].getAttribute('flag') == 1) {
							if(item[i].getAttribute('yn') == 0) {
								if(item[i].getAttribute('code') == 16.1 && item[i].getElementsByClassName('inputAn')[0].value != "" && item[i].getElementsByClassName('inputAn')[1].value != "") {
									var data = {
										"noticeAnswer1": item[i].getElementsByClassName('inputAn')[0].value,
										"noticeAnswer2": item[i].getElementsByClassName('inputAn')[1].value,
										"noticeSubject": "0",
										"optNo": "N",
										"showOrder":item[i].getAttribute('showOrder'),
										"quesNo": item[i].getAttribute('code')
									}
								} else {
									var data = {
										"noticeSubject": "0",
										"optNo": "N",
										"showOrder":item[i].getAttribute('showOrder'),
										"quesNo": item[i].getAttribute('code')
									}
								}

							} else {
								var domList = item[i].getElementsByClassName('inputAn');
								//							console.log(item[i].getElementsByTagName('textarea')[0].value)
								var texa = item[i].getElementsByTagName('textarea')
								var tabl = item[i].getElementsByTagName('table')
								var sel = item[i].getElementsByTagName('select')
								if(item[i].getAttribute('code') == 16.1 && item[i].getElementsByClassName('inputAn')[0].value != "" && item[i].getElementsByClassName('inputAn')[1].value != "") {
									var data = {
										"noticeAnswer1": item[i].getElementsByClassName('inputAn')[0].value,
										"noticeAnswer2": item[i].getElementsByClassName('inputAn')[1].value,
										"noticeSubject": "0",
										"optNo": "N",
										"showOrder":item[i].getAttribute('showOrder'),
										"quesNo": item[i].getAttribute('code')
									}
								} else if(domList.length > 0 && sel.length == 0 && item[i].getAttribute('code') != 16.1) {
									var arr1 = [],
										arr2 = [];

									var data = {
										"noticeSubject": "0",
										"optNo": "Y",
										"showOrder":item[i].getAttribute('showOrder'),
										"quesNo": item[i].getAttribute('code')
									}

									for(var m = 0, n = domList.length; m < n; m++) {
										//								object.noticeAnswer+i=domList[m].value
										var add = m + 1
										var keys = "noticeAnswer" + add
										arr1.push(keys)
										if(domList[m].value == "") {
											Toast('请回答告知书中的问题');
											return
										} else {
											arr2.push(domList[m].value)
										}

									}
									for(var s = 0, l = arr1.length; s < l; s++) {
										var key = arr1[s];
										var val = arr2[s];
										data[key] = val;
									}
								} else if(texa.length > 0) {
									if(texa[0].value == "") {

										Toast('请回答告知书中的问题')
										return
									} else {
										var data = {
											'noticeAnswer1': texa[0].value,
											"noticeSubject": "0",
											"optNo": "Y",
											"showOrder":item[i].getAttribute('showOrder'),
											"quesNo": item[i].getAttribute('code')
										}

									}
								} else if(tabl.length > 0) {
									var td = tabl[0].getElementsByTagName('td')
									console.log(td[7].innerHTML)
									if(td[7].innerHTML == "") {

										Toast('请回答告知书中的问题')
										return
									} else {
										var data = {
											'noticeAnswer1': "投保人",
											'noticeAnswer2': td[7].innerHTML,
											'noticeAnswer3': td[8].innerHTML,
											'noticeAnswer4': td[9].innerHTML,
											'noticeAnswer5': td[10].innerHTML,
											'noticeAnswer6': td[11].innerHTML,
											"noticeSubject": "0",
											"optNo": "Y",
											"quesNo": item[i].getAttribute('code'),
											"showOrder":item[i].getAttribute('showOrder')
										}

									}
								} else {
									var data = {
										"noticeSubject": "0",
										"optNo": "Y",
										"showOrder":item[i].getAttribute('showOrder'),
										"quesNo": item[i].getAttribute('code')
									}
								}

							}
						} else {
							var data = {
								"noticeSubject": "0",
								"optNo": "N",
								"showOrder":item[i].getAttribute('showOrder'),
								"quesNo": item[i].getAttribute('code')
							}
						}
						mery.push(data)
					}

				}

				if(this.$refs.yes.getAttribute('class') == "insurance_img1") {
					var data = {
						"token": this.$route.query.token,
						"userId": this.$route.query.userId,
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$route.query.userId,
							"prodCode": this.$route.query.prodCode
						},
						"mark": "UC",
						"noticeReq": mery,
						"opt": "APPLNOT",
						"pkgNo": this.$route.query.orderNo,
					}
					console.log(JSON.stringify(mery))
					Indicator.open();
					this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data).then(response => {
						Indicator.close();
						console.log(response.data);
						if(response.data.code == "SYS_S_000") {
							this.$router.push('/insuranceadvice?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)

						} else {
							Toast(response.data.desc)
						}
					}, response => {
						Indicator.close();
						console.log("ajax error");
					});

				} else{
					Toast("请先预览并选中告知书");
				}
			},
			handleClickCon(a) {
				if(a == 1) {
					this.mask = false
					this.$refs.bg.style.position = "absolute"
				} else if(a == 2) {
					if(this.td1 != "" && this.td2 != "" && this.td3 != "" && this.td4 != "" && this.td5 != "") {
						this.mask = false
						var td = document.getElementsByTagName('td')
						console.log(td)
						this.$refs.bg.style.position = "absolute"
						td[6].innerHTML = "投保人"
						td[7].innerHTML = this.td1
						td[8].innerHTML = this.td2
						td[9].innerHTML = this.td3
						td[10].innerHTML = this.td4
						td[11].innerHTML = this.td5
					} else {
						Toast('请完善投保信息')
					}
				}
			}
		},
		watch: {
			sourceList: function(value) {
				this.sourceList = value
			},
			tabs: function(value) {
				console.log(value)
				this.tabs = value
			}
		}

	}
</script>

<style scoped="scoped">
	.inputAn {
		width: .98rem;
		height: .4rem;
		border: 0;
		border-radius: 0;
		border-bottom: 0.01rem solid #222;
		text-align: center
	}
	
	.insuranceadvice_all {
		background: #FFFFFF;
		width: 100%;
		position: absolute;
		padding-bottom: 1rem;
	}
	
	.insuracce_bg {
		background: #FFFFFF;
		padding: 0.32rem 0.4rem 0 0.4rem;
		padding-bottom: .45rem;
	}
	
	.insuranceadvice_div {
		height: 0.64rem;
	}
	
	.insuranceadvice_thing {
		font-size: 0.34rem;
		color: #222222;
	}
	
	.insuranceadvice_line {
		display: block;
		border-top: 0.01rem solid #C8C7CC;
		/*	border-bottom: 0.01rem solid #C8C7CC;*/
		line-height: 0.88rem;
		clear: both;
	}
	
	.insuranceadvice_span {
		font-size: 0.28rem;
		color: #555555;
		display: inline-block;
		line-height: .5rem;
	}
	
	.insurance_yes {
		width: 1.12rem;
		height: 0.6rem;
		border: 1px solid #54CCC1;
		border-radius: 0.08rem;
		display: inline-block;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.28rem;
		color: #54CCC1;
		margin-right: 0.15rem;
	}
	
	.insurance_yes1 {
		width: 1.12rem;
		height: 0.6rem;
		border-radius: 0.08rem;
		background: #54CCC1;
		display: inline-block;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.28rem;
		margin-right: 0.15rem;
		color: #FFFFFF;
	}
	
	.insurance_no {
		width: 1.12rem;
		height: 0.6rem;
		background: #54CCC1;
		border-radius: 0.08rem;
		display: inline-block;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.28rem;
		color: #FFFFFF;
		/*margin-left: 0.28rem;*/
	}
	
	.insurance_no1 {
		width: 1.12rem;
		height: 0.6rem;
		border-radius: 0.08rem;
		display: inline-block;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.28rem;
		border: 1px solid #54CCC1;
		color: #54CCC1;
	}
	
	.insuranceadvice_quest {
		width: 2.72rem;
		/*height: 0.6rem;*/
		/*	display: inline-block;*/
		float: right;
		clear: both;
	}
	
	.insurance_hidden {
		/*	height: 0.88rem;*/
		/*border-top: 0.01rem solid #C8C7CC;*/
		line-height: 0.88rem;
		clear: both;
		display: none;
	}
	
	.insurancedive {
		width: 0.98rem;
		height: 0.44rem;
		border: none;
		background: none;
		border-bottom: 0.01rem solid #979797;
	}
	
	.insurance_img {
		width: 0.48rem;
		height: 0.48rem;
		float: left;
		position: absolute;
		opacity:0;
		z-index: 1;
	}
	.insurance_img1 {
		width: 0.48rem;
		height: 0.48rem;
		float: left;
		position: absolute;
		opacity:1;
		z-index: 2;
	}
	
	.insurance_boo {
		padding: 0 0 0 0.4rem;
		margin-top: 0.4rem;
		height: 0.48rem;
		display: inline-block;
		width: 100%;
	}
	
	.insurance_content {
		height: 0.48rem;
		font-size: 0.28rem;
		color: #222222;
		line-height: 0.48rem;
		margin-left: .6rem;
	}
	
	.information_bottom_btn {
		padding: 0 0 0 0.48rem;
		vertical-align: bottom;
		height: 0.88rem;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		margin-bottom: 0.56rem;
	}
	
	.information_bottom_btn1 {
		padding: 0 0 0 0.48rem;
		vertical-align: bottom;
		height: 0.88rem;
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		margin-bottom: 0.56rem;
	}
	
	.opa0 {
		z-index: 2;
	}
	
	.information_bottom {
		width: 3.12rem;
		height: 0.88rem;
		border: 0.01rem solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
	}
	
	.information_next {
		width: 3.12rem;
		height: 0.88rem;
		border: 0.01rem solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
		margin-left: 0.3rem;
	}
	
	#input {
		width: .98rem;
		height: 1rem;
		border: 1px solid red;
	}
	
	.insurance_up {
		width: 3.12rem;
		height: 0.88rem;
		border-radius: 0.44rem;
		display: inline-block;
		border: 1px solid #EB7760;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EB7760;
	}
	
	.insurance_next {
		width: 3.12rem;
		height: 0.88rem;
		border-radius: 0.44rem;
		display: inline-block;
		border: 1px solid #EB7760;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EB7760;
		margin-left: 0.28rem;
	}
	
	.insurance_div_botom {
		margin-top: 0.5rem;
	}
	
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
	}
	
	.mask_title {
		width: 100%;
		margin-top: .4rem;
		text-align: center;
		color: #222;
		font-size: .4rem;
	}
	
	.mask_in {
		width: 6.8rem;
		margin: 0 auto;
		height: 1rem;
		border-bottom: .001rem solid #C8C7CC;
		line-height: 1rem;
	}
	
	.mask_tou {
		font-size: .3rem;
		float: left;
		border: none;
	}
	
	.mask_wei {
		float: right;
		width: 3.5rem;
		height: 1rem;
		border: none;
		appearance:none;
		 -moz-appearance:none;
		 -webkit-appearance:none;
		
	}
	
	.btn_left {
		margin: 2rem 0 0 .36rem;
	}
	
	.btn_right {
		margin: 2rem .36rem 0;
	}
	.selectimg{
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
	}
</style>