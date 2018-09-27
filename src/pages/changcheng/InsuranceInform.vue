<template>
	<div class="insuranceadvice_all" :class="{opa0:!hui}" ref='bg'>
		<div class="insuracce_bg">
			<div v-if="hui" class="insuranceadvice_div">
				<p class="insuranceadvice_thing">被保险人告知事项</p>
			</div>
			<div v-show="item.showFlag==1" :showOrder="item.showOrder" ref="father" :flag="item.showFlag" class="father" v-for="(item,index) in tabs" yn="0" :status="item.status" style="clear: both;" :code="item.quesNo">
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
				<img src="/static/img/icon_select2_unfocu.png" ref="no" class="insurance_img1" @click="img_yes" v-model="mm"  />
				<img src="/static/img/icon_select1_focus@2x.png" ref="yes"  class="insurance_img" @click="img_no" v-model="mm"  />
				<div class="insurance_content">我已阅读被保险人告知项全部内容。</div>
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
	import { Toast, Indicator } from 'mint-ui';
	export default {
		name: "InsuranceInform",
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
				td4: "生效",
				td5: "无",
				mery: "",
				code: false,
				backData: "",
				sourceList: "",
				gender:"",
				age:"",
				item:"",
				table:[],
				count:0
			}
		},
		beforeCreate() {
			//			this.Sourceofincome()
		},
		created() {
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode

					},
					"opt": "INSRNT",
					"pkgNo": this.$route.query.orderNo, //订单号
				}

				this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
					.then(res => {
						if(res.data.code == "SYS_S_000") {
							console.log(res.data.output.insrntResp)
							this.age = res.data.output.insrntResp.age;
							this.gender = res.data.output.insrntResp.gender;
							this.getList()

						} else {
//							Toast(res.data.desc)
						}

					}, res => {
						console.log(res.data);
					})

				if(this.$route.query.code != undefined) {
					this.code = true
				}
				if(this.backview =="hui") {
				this.hui = false;
			}
			
			this.getDate()
			
		},
		beforeUpdate() {
			
		},
		updated() {
			var item = this.$refs.father;
			this.backView()
			this.item=item;
			var c = document.getElementsByClassName('inputAn')
			var tab = document.getElementsByTagName('table')[0]
			var tr=tab.getElementsByTagName('tr')
			var txta = document.getElementsByTagName('textarea')
			var selec = document.getElementsByTagName('select')[0]
			//			txta.setAttribute('style','width: 100%;margin-bottom: .2rem;height:2rem')
			var spa,spa1;
			tab.setAttribute('border', '1')
			tab.setAttribute('style', 'margin-bottom: .2rem;')
			var td = tab.getElementsByTagName('td');
			for(var i = 0, j = item.length; i < j; i++) {
				if(item[i].getElementsByTagName('table')[0] != undefined) {
					var para = document.createElement("span");
					item[i].getElementsByClassName('insurance_hidden')[0].appendChild(para)
					var par = document.createElement("a");
					item[i].getElementsByClassName('insurance_hidden')[0].appendChild(par)
					spa = item[i].getElementsByTagName('span')[0]
					spa1 = item[i].getElementsByTagName('a')[0]
//					console.log(item[i].getElementsByTagName('span'))
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
			spa.innerHTML = "添加"
			spa1.innerHTML = "删除"
			spa.setAttribute('style', 'display:block;text-align:center;width: 1.12rem;height: 0.6rem;border-radius: 0.08rem;background: #54CCC1;color:#fff;line-height: 0.6rem;margin: 0 auto .2rem;')
			spa1.setAttribute('style', 'display:block;text-align:center;width: 1.12rem;height: 0.6rem;border-radius: 0.08rem;background: #54CCC1;color:#fff;line-height: 0.6rem;margin: 0 auto .2rem;')
			for(var i = 0, j = c.length; i < j; i++) {
				c[i].setAttribute('style', 'width:.98rem;height:.4rem;border:0;border-radius:0; border-bottom:0.01rem solid #222;text-align:center;"')
			}
			for(var i = 0, j = txta.length; i < j; i++) {
				txta[i].setAttribute('maxlength', '200')
				txta[i].setAttribute('style', 'width: 100%;margin-bottom: .2rem;height:2rem')
				txta[i].setAttribute('placeholder', '请输入具体描述(最多200字)')
			}
			for(var i = 0, j = td.length; i < j; i++) {
				td[i].setAttribute('style', 'width:1.2rem;text-align:center')
			}
			
		},
		methods: {
			getList(){
				var data = {
				"age": this.age,
				"gender":this.gender,
				"prodCode": this.$route.query.prodCode
			}
			console.log(data)
			this.$http.post(this.$store.state.link + '/prd/prod/heallist', data)
				.then(res => {
					if(res.data.code == "SYS_S_000") {
						this.tabs = res.data.output;
						console.log(this.tabs)
						this.tabs[6].quesRmk="<table><tr><td>说明对象</td><td>承保公司</td><td>身故保额（万元）</td><td>承保日期</td><td>保单状态</td><td>理赔经历</td></tr><tr><td>请选择</td><td></td><td></td><td></td><td>请选择</td><td></td></tr><tr style='display:none'><td>请选择</td><td></td><td></td><td></td><td>请选择</td><td></td></tr><tr style='display:none'><td>说明对象</td><td>承包公司</td><td>身故保额（万元）</td><td>承包日期</td><td>保单状态</td><td>理赔经历</td></tr><tr style='display:none'><td>请选择</td><td></td><td></td><td></td><td>请选择</td><td></td></tr><tr style='display:none'><td>请选择</td><td></td><td></td><td></td><td>请选择</td><td></td></tr><tr style='display:none'><td>说明对象</td><td>承包公司</td><td>身故保额（万元）</td><td>承包日期</td><td>保单状态</td><td>理赔经历</td></tr><tr style='display:none'><td>请选择</td><td></td><td></td><td></td><td>请选择</td><td></td></tr><tr style='display:none'><td>请选择</td><td></td><td></td><td></td><td>请选择</td><td></td></tr><tr style='display:none'><td>请选择</td><td></td><td></td><td></td><td>请选择</td><td></td></tr></table>"
					} else {
						Toast(res.data.desc)						
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
					"opt": "INSNOT",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
					.then(res => {
						if(res.data.output.insNotResp!=undefined){
							this.backData = res.data.output.insNotResp
							if(this.backData[6].noticeAnswer1!=undefined){
								this.table.push(this.backData[6].noticeAnswer1)
								this.count=1
							}
							if(this.backData[6].noticeAnswer2!=undefined){
								this.table.push(this.backData[6].noticeAnswer2)
								this.count=2
							}
							if(this.backData[6].noticeAnswer3!=undefined){
								this.table.push(this.backData[6].noticeAnswer3)
								this.count=3
							}
							if(this.backData[6].noticeAnswer4!=undefined){
								this.table.push(this.backData[6].noticeAnswer4)
								this.count=4
							}
							if(this.backData[6].noticeAnswer5!=undefined){
								this.table.push(this.backData[6].noticeAnswer5)
								this.count=5
							}
							if(this.backData[6].noticeAnswer6!=undefined){
								this.table.push(this.backData[6].noticeAnswer6)
								this.count=6
							}
							if(this.backData[6].noticeAnswer7!=undefined){
								this.table.push(this.backData[6].noticeAnswer7)
								this.count=7
							}
						}
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
				for(var i = 0, j = this.backData.length; i < j; i++) {
					if(this.backData[i].noticeAnswer1 != undefined && arr[i].getElementsByClassName('inputAn').length > 0) {
						console.log(this.backData[i].noticeAnswer1)
						arr[i].setAttribute('yn', 1)
						arr[i].getElementsByClassName('insurance_hidden')[0].style.display = "block"
						arr[i].getElementsByClassName('insurance_yes')[0].setAttribute('class', "insurance_yes1")
						arr[i].getElementsByClassName('insurance_no')[0].setAttribute('class', "insurance_no1")
						arr[i].getElementsByClassName('inputAn')[0].value = this.backData[i].noticeAnswer1
						if(this.backData[i].noticeAnswer2 != undefined) {
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
						if(this.backData[i].noticeAnswer1!= undefined){
							var arrNew=this.backData[i].noticeAnswer1.split(',')
							arr[i].getElementsByTagName('td')[6].innerHTML = arrNew[0]
							arr[i].getElementsByTagName('td')[7].innerHTML = arrNew[1]
							arr[i].getElementsByTagName('td')[8].innerHTML = arrNew[2]
							arr[i].getElementsByTagName('td')[9].innerHTML = arrNew[3]
							arr[i].getElementsByTagName('td')[10].innerHTML =arrNew[4]
							arr[i].getElementsByTagName('td')[11].innerHTML = arrNew[5]
							this.count=1
							arr[i].getElementsByTagName('tr')[1].setAttribute('style','diaplay:;')
						}
						if(this.backData[i].noticeAnswer2!= undefined){
							var arrNew=this.backData[i].noticeAnswer2.split(',')
							arr[i].getElementsByTagName('td')[12].innerHTML = arrNew[0]
							arr[i].getElementsByTagName('td')[13].innerHTML = arrNew[1]
							arr[i].getElementsByTagName('td')[14].innerHTML = arrNew[2]
							arr[i].getElementsByTagName('td')[15].innerHTML = arrNew[3]
							arr[i].getElementsByTagName('td')[16].innerHTML = arrNew[4]
							arr[i].getElementsByTagName('td')[17].innerHTML = arrNew[5]
							this.count=2
//							this.table.push(this.backData[i].noticeAnswer2)
							arr[i].getElementsByTagName('tr')[2].setAttribute('style','display: ;')
						}
						if(this.backData[i].noticeAnswer3!= undefined){
							var arrNew=this.backData[i].noticeAnswer3.split(',')
							arr[i].getElementsByTagName('td')[18].innerHTML =arrNew[0]
							arr[i].getElementsByTagName('td')[19].innerHTML = arrNew[1]
							arr[i].getElementsByTagName('td')[20].innerHTML = arrNew[2]
							arr[i].getElementsByTagName('td')[21].innerHTML = arrNew[3]
							arr[i].getElementsByTagName('td')[22].innerHTML = arrNew[4]
							arr[i].getElementsByTagName('td')[23].innerHTML = arrNew[5]
							this.count=3
							arr[i].getElementsByTagName('tr')[3].setAttribute('style','display: ;')
						}
						if(this.backData[i].noticeAnswer4!= undefined){
							var arrNew=this.backData[i].noticeAnswer4.split(',')
							arr[i].getElementsByTagName('td')[24].innerHTML = arrNew[0]
							arr[i].getElementsByTagName('td')[25].innerHTML = arrNew[1]
							arr[i].getElementsByTagName('td')[26].innerHTML = arrNew[2]
							arr[i].getElementsByTagName('td')[27].innerHTML = arrNew[3]
							arr[i].getElementsByTagName('td')[28].innerHTML = arrNew[4]
							arr[i].getElementsByTagName('td')[29].innerHTML = arrNew[5]
							this.count=4
							arr[i].getElementsByTagName('tr')[4].setAttribute('style','diaplay:;')
						}
						if(this.backData[i].noticeAnswer5!= undefined){
							var arrNew=this.backData[i].noticeAnswer5.split(',')
							arr[i].getElementsByTagName('td')[30].innerHTML = arrNew[0]
							arr[i].getElementsByTagName('td')[31].innerHTML = arrNew[1]
							arr[i].getElementsByTagName('td')[32].innerHTML = arrNew[2]
							arr[i].getElementsByTagName('td')[33].innerHTML = arrNew[3]
							arr[i].getElementsByTagName('td')[34].innerHTML = arrNew[4]
							arr[i].getElementsByTagName('td')[35].innerHTML = arrNew[5]
							this.count=5
							arr[i].getElementsByTagName('tr')[5].setAttribute('style','diaplay:;')
						}
						if(this.backData[i].noticeAnswer6!= undefined){
							var arrNew=this.backData[i].noticeAnswer6.split(',')
							arr[i].getElementsByTagName('td')[36].innerHTML = arrNew[0]
							arr[i].getElementsByTagName('td')[37].innerHTML = arrNew[1]
							arr[i].getElementsByTagName('td')[38].innerHTML = arrNew[2]
							arr[i].getElementsByTagName('td')[39].innerHTML = arrNew[3]
							arr[i].getElementsByTagName('td')[40].innerHTML = arrNew[4]
							arr[i].getElementsByTagName('td')[41].innerHTML = arrNew[5]
							this.count=6
							arr[i].getElementsByTagName('tr')[6].setAttribute('style','diaplay:;')
						}
						if(this.backData[i].noticeAnswer7!= undefined){
							var arrNew=this.backData[i].noticeAnswer7.split(',')
							arr[i].getElementsByTagName('td')[42].innerHTML = arrNew[0]
							arr[i].getElementsByTagName('td')[43].innerHTML = arrNew[1]
							arr[i].getElementsByTagName('td')[44].innerHTML = arrNew[2]
							arr[i].getElementsByTagName('td')[45].innerHTML = arrNew[3]
							arr[i].getElementsByTagName('td')[46].innerHTML = arrNew[4]
							arr[i].getElementsByTagName('td')[47].innerHTML = arrNew[5]
							this.count=7
							arr[i].getElementsByTagName('tr')[7].setAttribute('style','diaplay:;')
						}
					} else if(this.backData[i].noticeAnswer1 != undefined && arr[i].getElementsByTagName('select').length > 0) {
						arr[i].setAttribute('yn', 1)
						arr[i].getElementsByClassName('insurance_hidden')[0].style.display = "block"
						arr[i].getElementsByClassName('insurance_yes')[0].setAttribute('class', "insurance_yes1")
						arr[i].getElementsByClassName('insurance_no')[0].setAttribute('class', "insurance_no1")
						arr[i].getElementsByTagName('select')[0].value = this.backData[i].noticeAnswer2
					}
				}
			},
			hhh(e) {
				if(e.currentTarget.getElementsByTagName('span')[0] != undefined) {
					if(e.target.innerHTML=="添加"){
						if(this.table.length>=7){
							Toast('投保经历最多录入7条')
						}else{
							this.mask = true	
							this.td1=""
							this.td2=""
							this.td3=""
							this.td4="生效"
							this.td5="无"
						}
					}else if(e.target.innerHTML=="删除"){
						if(this.table.length>1){
							var a=this.table.length
							this.table.pop();
							document.getElementsByTagName('tr')[a].setAttribute('style','display:none')
						}
					}
				}
			},
			back() {
				window.history.go(-1)
			},
			msg(value) {
				if(value != undefined) {
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
				window.location.reload()
			},
			img_yes() {
				console.log(this.$refs.no)
				this.$refs.no.setAttribute('class','insurance_img')
				this.$refs.yes.setAttribute('class','insurance_img1')
			},
			img_no() {
				this.$refs.no.setAttribute('class','insurance_img1')
				this.$refs.yes.setAttribute('class','insurance_img')
			},
			next() {
				var list = document.getElementsByClassName('inputAn'),
					arr = [],
					item = this.$refs.father,
					mery = [];
					console.log(this.$refs.father)
				for(var i = 0, j = list.length; i < j; i++) {
					if(list[i].parentNode.parentNode.style.display == "block") {
						arr.push(list[i].value)
					}

				}

				for(var i = 0, j = item.length; i < j; i++) {

					if(item[i].getAttribute('status') == 1) {
						if(item[i].getAttribute('flag')==1){
							if(item[i].getAttribute('yn') == 0) {
							if(item[i].getAttribute('code') == 16.1) {
								if(item[i].getElementsByClassName('inputAn')[0].value != "" && item[i].getElementsByClassName('inputAn')[1].value!=""){
									var data = {
										"noticeAnswer1": item[i].getElementsByClassName('inputAn')[0].value,
										"noticeAnswer2": item[i].getElementsByClassName('inputAn')[1].value,
										"noticeSubject": "1",
										"optNo": "N",
										"quesNo": item[i].getAttribute('code'),
										"showOrder":item[i].getAttribute('showOrder')
									}
								}else{
									Toast('请输入被保险人出生时的身高体重')
									return
								}
								
							}else {
								var data = {
									"noticeSubject": "1",
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
							if(item[i].getAttribute('code') == 16.1) {
								if(item[i].getElementsByClassName('inputAn')[0].value != "" && item[i].getElementsByClassName('inputAn')[1].value!=""){
									var data = {
										"noticeAnswer1": item[i].getElementsByClassName('inputAn')[0].value,
										"noticeAnswer2": item[i].getElementsByClassName('inputAn')[1].value,
										"noticeSubject": "1",
										"optNo": "N",
										"showOrder":item[i].getAttribute('showOrder'),
										"quesNo": item[i].getAttribute('code')
									}
								}else{
									Toast("请输入被保险人出生时的身高体重")
									return
								}
								
							} else if(domList.length > 0 && sel.length == 0 &&item[i].getAttribute('code') != 16.1) {
								var arr1 = [],
									arr2 = [];

								var data = {
									"noticeSubject": "1",
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
										"noticeSubject": "1",
										"optNo": "Y",
										"showOrder":item[i].getAttribute('showOrder'),
										"quesNo": item[i].getAttribute('code')
									}

								}
							} else if(tabl.length > 0) {
								var td = tabl[0].getElementsByTagName('td')
								//								console.log(td[7].innerHTML)
								if(td[7].innerHTML == "") {

									Toast('请回答告知书中的问题')
									return
								} else {
									var arr1 = [],
									arr2 = [];

								var data = {
									"noticeSubject": "1",
									"optNo": "Y",
									"showOrder":item[i].getAttribute('showOrder'),
									"quesNo": item[i].getAttribute('code')
								}

								for(var m = 0, n = this.table.length; m < n; m++) {
									//								object.noticeAnswer+i=domList[m].value
									var add = m + 1
									var keys = "noticeAnswer" + add
									arr1.push(keys)
									arr2.push(this.table[m])
								}
								for(var s = 0, l = arr1.length; s < l; s++) {
									var key = arr1[s];
									var val = arr2[s];
									data[key] = val;
								}

								}
							} else {
								var data = {
									"noticeSubject": "1",
									"optNo": "Y",
									"showOrder":item[i].getAttribute('showOrder'),
									"quesNo": item[i].getAttribute('code')
								}
							}

						}
						}else{
							var data = {
									"noticeSubject": "1",
									"optNo": "N",
									"showOrder":item[i].getAttribute('showOrder'),
									"quesNo": item[i].getAttribute('code')
								}
						}
						
						mery.push(data)
					}

				}
				//				console.log(mery)
				if(this.$refs.yes.getAttribute('class') == "insurance_img1") {
					console.log(this.code)
					if(this.code) {
						this.postData1(mery)
					} else {
						this.postData(mery)
					}

				} else{
					Toast("请先预览并选中告知书");
				}
			},
			postData(mery) {
				this.mery = mery
				for(var i=0,j=this.mery.length;i<j;i++){
					if(this.mery[i].noticeSubject == 0) {
						this.mery[i].noticeSubject = 1
					}
				}
				
						if(this.mery[6].noticeAnswer1!=undefined&&this.mery[6].noticeAnswer1.split(',')[0] == "投保人") {
							var arr=this.mery[6].noticeAnswer1.split(',')
							arr[0]="被保险人"
							this.mery[6].noticeAnswer1=arr.join(',')
						}
						if(this.mery[6].noticeAnswer2!=undefined&&this.mery[6].noticeAnswer2.split(',')[0] == "投保人") {
							var arr=this.mery[6].noticeAnswer2.split(',')
							arr[0]="被保险人"
							this.mery[6].noticeAnswer2=arr.join(',')
						}
						if(this.mery[6].noticeAnswer3!=undefined&&this.mery[6].noticeAnswer3.split(',')[0] == "投保人") {
							var arr=this.mery[6].noticeAnswer3.split(',')
							arr[0]="被保险人"
							this.mery[6].noticeAnswer3=arr.join(',')
						}
						if(this.mery[6].noticeAnswer4!=undefined&&this.mery[6].noticeAnswer4.split(',')[0] == "投保人") {
							var arr=this.mery[6].noticeAnswer4.split(',')
							arr[0]="被保险人"
							this.mery[6].noticeAnswer4=arr.join(',')
						}
						if(this.mery[6].noticeAnswer5!=undefined&&this.mery[6].noticeAnswer5.split(',')[0] == "投保人") {
							var arr=this.mery[6].noticeAnswer5.split(',')
							arr[0]="被保险人"
							this.mery[6].noticeAnswer5=arr.join(',')
						}
						if(this.mery[6].noticeAnswer6!=undefined&&this.mery[6].noticeAnswer6.split(',')[0] == "投保人") {
							var arr=this.mery[6].noticeAnswer6.split(',')
							arr[0]="被保险人"
							this.mery[6].noticeAnswer6=arr.join(',')
						}
						if(this.mery[6].noticeAnswer7!=undefined&&this.mery[6].noticeAnswer7.split(',')[0] == "投保人") {
							var arr=this.mery[6].noticeAnswer7.split(',')
							arr[0]="被保险人"
							this.mery[6].noticeAnswer7=arr.join(',')
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
					"mark": "UC",
					"noticeReq": mery,
					"opt": "INSNOT",
					"pkgNo": this.$route.query.orderNo,
				}

				console.log("1111" + JSON.stringify(data))
				Indicator.open()
				this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data).then(response => {
					Indicator.close()
					console.log(response.data);
					if(response.data.code == "SYS_S_000") {
						this.$router.push('/payInfo_tian?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)

					} else {
						Toast(response.data.desc)
					}
				}, response => {
					Indicator.close()
					console.log("ajax error");
				});
			},
			postData1(mery) {
				this.mery = mery
				for(var i=0,j=this.mery.length;i<j;i++){
					if(this.mery[i].noticeSubject == 1) {
						this.mery[i].noticeSubject = 0
					}
				}
						if(this.mery[6].noticeAnswer1!=undefined&&this.mery[6].noticeAnswer1.split(',')[0] == "被保险人") {
							var arr=this.mery[6].noticeAnswer1.split(',')
							arr[0]="投保人"
							this.mery[6].noticeAnswer1=arr.join(',')
						}
						if(this.mery[6].noticeAnswer2!=undefined&&this.mery[6].noticeAnswer2.split(',')[0] == "被保险人") {
							var arr=this.mery[6].noticeAnswer2.split(',')
							arr[0]="投保人"
							this.mery[6].noticeAnswer2=arr.join(',')
						}
						if(this.mery[6].noticeAnswer3!=undefined&&this.mery[6].noticeAnswer3.split(',')[0] == "被保险人") {
							var arr=this.mery[6].noticeAnswer3.split(',')
							arr[0]="投保人"
							this.mery[6].noticeAnswer3=arr.join(',')
						}
						if(this.mery[6].noticeAnswer4!=undefined&&this.mery[6].noticeAnswer4.split(',')[0] == "被保险人") {
							var arr=this.mery[6].noticeAnswer4.split(',')
							arr[0]="投保人"
							this.mery[6].noticeAnswer4=arr.join(',')
						}
						if(this.mery[6].noticeAnswer5!=undefined&&this.mery[6].noticeAnswer5.split(',')[0] == "被保险人") {
							var arr=this.mery[6].noticeAnswer5.split(',')
							arr[0]="投保人"
							this.mery[6].noticeAnswer5=arr.join(',')
						}
						if(this.mery[6].noticeAnswer6!=undefined&&this.mery[6].noticeAnswer6.split(',')[0] == "被保险人") {
							var arr=this.mery[6].noticeAnswer6.split(',')
							arr[0]="投保人"
							this.mery[6].noticeAnswer6=arr.join(',')
						}
						if(this.mery[6].noticeAnswer7!=undefined&&this.mery[6].noticeAnswer7.split(',')[0] == "被保险人") {
							var arr=this.mery[6].noticeAnswer7.split(',')
							arr[0]="投保人"
							this.mery[6].noticeAnswer7=arr.join(',')
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
					"mark": "UC",
					"noticeReq": mery,
					"opt": "APPLNOT",
					"pkgNo": this.$route.query.orderNo,
				}

				console.log("000" + JSON.stringify(mery))
				Indicator.open()
				this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data).then(response => {
					Indicator.close()
					console.log(response.data);
					//					this.postData(mery)
					if(response.data.code == "SYS_S_000") {

						this.postData(mery)
					} else {
						Toast(response.data.desc)
					}
				}, response => {
					Indicator.close()
					console.log("ajax error");
				});
			},
			handleClickCon(a) {
				if(a == 1) {
					this.mask = false
					this.$refs.bg.style.position = "absolute"
				} else if(a == 2) {
					if(this.td1 != "" && this.td2 != "" && this.td3 != "" && this.td4 != "" && this.td5 != "") {
						this.mask = false
						var tr = document.getElementsByTagName('tr')
						tr[this.count+1].setAttribute('style','display: ;')
						var td=tr[this.count+1].getElementsByTagName('td')
						this.$refs.bg.style.position = "absolute"
						var data="被保险人,"+this.td1+","+this.td2+","+this.td3+","+this.td4+","+this.td5
						td[0].innerHTML = "被保险人"
						td[1].innerHTML = this.td1
						td[2].innerHTML = this.td2
						td[3].innerHTML = this.td3
						td[4].innerHTML = this.td4
						td[5].innerHTML = this.td5
						this.table.push(data)
						this.count++
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
				this.tabs = value
			},
			table:function(value) {
				this.table = value
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
		margin-left: .6rem;
		color: #222222;
		line-height: 0.48rem;
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
	
	.opa0 {
		z-index: 2;
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
	
	.tab {
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
	.father{
		position: relative;
	}
	.father_mask{
		width: 100%;
		height: 100%;
		position: absolute;
		opacity: 0.5;
    	background: #222;
	}
	.selectimg{
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
	}
</style>