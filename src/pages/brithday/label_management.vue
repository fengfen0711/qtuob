<template>
	<div class="label_all">
		<div class="div_layer" id="lab_layer">
			<div class="label_bottom">
				<p class="label_hidd">
					<span class="label_canel" v-on:click="canel">取消</span>
					<span class="label_con" v-on:click="confirm">确定</span>
				</p>
				<div class="label_ment">
					<input class="label_input" v-model="labtext" type="text" placeholder="自定义标签名称" maxlength="6" />
				</div>
			</div>
		</div>
		<div class="" id="label_div">
			<div class="label_div">
				<p class="label_text">
					<span class="gener">性别</span>
					<span class="sex" v-model="label_sex">{{label_sex}}</span>
				</p>
			</div>
			<div class="label_div1">
				<p class="label_text">
					<span class="gener">出生日期</span>
					<span class="sex" v-model="label_data">{{label_data}}</span>
				</p>
			</div>
			<div class="label_div1">
				<p class="label_text">
					<span class="gener">地区</span>
					<span class="sex" v-model="label_gound">{{label_gound}}</span>
				</p>
			</div>
			<div class="label_div1">
				<p class="label_text">
					<span class="gener">年收入（万元）</span>
					<span class="sex" v-model="label_money">{{label_money}}</span>
				</p>
			</div>
			<div class="label_mang">
				<div class="label_manget_div" v-for="(item,index) in tabs" code="item.kindName">
					<label class="label_gener_hun" ref="item">{{item.kindName}}</label>
					<div class="label_manget_gener">
						<!--<span class="man_span" v-for="(items,index1) in item.subTagList" style="border: 1px solid red;">-->
							<span class="label_marry_manget" ref="a1" :code="items.tagId"  v-on:click="label_meet($event,index1,item)" v-for="(items,index1) in item.subTagList">
								<img src="/static/qijianwei/icon_select1_focus.png" class="lab_img1" id="" :code="items.tagId"/>
								{{items.tagName}}
								
							</span>
						
						<!--</span>-->

					</div>
				</div>
			</div>
			<div class="label_mang">
				<p class="label_spel">
					<span class="label_family">个人特征</span>
					<span class="label_zi" v-on:click="customtag($event)">自定义标签</span>
				</p>

				<div class="label_biao">
					<span class="label_marry" ref="a1" :code="item.tagId" v-on:click="personal_characteristic($event,styles,index)" v-for="(item,index) in styles.subTagList">
					<img src="/static/qijianwei/icon_select1_focus.png" class="lab_img" id=""/>
					 {{item.tagName}}
				</span>

				</div>
			</div>
		</div>
		<div class="ctc_div_ok" v-on:click="label_save">保存</div>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	var selectlables = []; //选中标签
	export default {
		name: "Login",
		data() {
			return {
				label_sex: "",
				label_data: "",
				label_gound: "",
				label_money: "",
				tabs: [],
				tabscont: [],
				styles: [],
				txat: [],
				index1: "",
				index: "",
				x: "",
				labarry: [],
				labtext: "",
				add_array: {
					"custId": "",
					"tagList": [],
					"userId": "",
					"token":""
				}
			}
		},
		created() {
			this.label_manget();
			this.label_all();
			console.log(this.$refs.tag);
		},

		methods: {

			customtag(eve) {
				console.log(eve.currentTarget);
				document.getElementById("lab_layer").style.display = "block";
				var lab = document.getElementById("label_div");
				lab.setAttribute("class", "label_filter");

			},
			confirm() {
				
				document.getElementById("label_div").className = "";
				if(this.labtext == "") {
					Toast("请输入标签");
					return;
				} else {
					document.getElementById("lab_layer").style.display = "none";
				}

						var data = {
			  			"kindName": this.styles.kindName,
			  			"tagKind": 0,
			 			"tagName":this.labtext,
			 			"userId": localStorage.userId,
			 			"custId": this.$route.query.custId ,
			 			"token": localStorage.token,
						}
					this.$http.post(this.$store.state.link + '/cut/cut/addTagReq', data)
					.then(res => {
						Indicator.close()
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
							this.labtext = "";
							this.label_all();
							this.add_array.tagList=[];
					
						}else{
							this.labtext = "";
							this.label_all();
							this.add_array.tagList=[];
							Toast(res.data.desc);
						}
					}, data => {
						Indicator.close()
						console.log(data.data);
					})

			},
			canel() {
				document.getElementById("lab_layer").style.display = "none";
				document.getElementById("label_div").className = "";
			},
			personal_characteristic(evev, item, index1) {
				console.log(evev.currentTarget);
				console.log("====1" + JSON.stringify(item));
				console.log("====2" + index1);
				var labelName = evev.currentTarget.getAttribute("class");

				var flag = false;
				if(this.add_array.tagList.length == "0") {
					if(labelName == "label_marry") {
						evev.currentTarget.setAttribute("class", "label_person");
						evev.currentTarget.getElementsByClassName("lab_img")[0].style.display = "inline";
					} else {
						evev.currentTarget.setAttribute("class", "label_marry");
						evev.currentTarget.getElementsByClassName("lab_img")[0].style.display = "none";
					}
					var data_item = {
						"kindName": item.kindName,
						"tagId": item.subTagList[index1].tagId,
						"tagKind": item.tagKind,
						"tagName": item.subTagList[index1].tagName,
						"token": localStorage.token,
						"userId": localStorage.userId
					};
					this.add_array.tagList.push(data_item);
				} else {
					for(var i = 0; i < this.add_array.tagList.length; i++) {
						if(this.add_array.tagList[i].tagId == item.subTagList[index1].tagId) {
							if(labelName == "label_marry") {
								evev.currentTarget.setAttribute("class", "label_person");
								evev.currentTarget.getElementsByClassName("lab_img")[0].style.display = "inline";
							} else {
								evev.currentTarget.setAttribute("class", "label_marry");
								evev.currentTarget.getElementsByClassName("lab_img")[0].style.display = "none";
							}
							this.add_array.tagList.splice(i, 1);
							flag = true;
							break;
						} else {
							flag = false;
						}
					}
					if(flag == false) {
						if(labelName == "label_marry") {
							evev.currentTarget.setAttribute("class", "label_person");
							evev.currentTarget.getElementsByClassName("lab_img")[0].style.display = "inline";
						} else {
							evev.currentTarget.setAttribute("class", "label_marry");
							evev.currentTarget.getElementsByClassName("lab_img")[0].style.display = "none";
						}
						var data_item = {
							"kindName": item.kindName,
							"tagId": item.subTagList[index1].tagId,
							"tagKind": item.tagKind,
							"tagName": item.subTagList[index1].tagName,
							"token": localStorage.token,
							"userId": localStorage.userId
						};
						this.add_array.tagList.push(data_item);
					}
				}
				console.log("===2" + JSON.stringify(this.add_array));

			},
			label_meet(labevent, index1, item) {
				var labeltag = labevent.currentTarget.getAttribute("class");
			
				var flage = false;
				if(this.add_array.tagList.length == "0") {
					if(labeltag=="label_marry_manget"){
						labevent.currentTarget.setAttribute("class", "label_person1");
						labevent.currentTarget.getElementsByClassName("lab_img1")[0].style.display="inline";
						
					}else{
						labevent.currentTarget.setAttribute("class", "label_marry_manget");
						labevent.currentTarget.getElementsByClassName("lab_img1")[0].style.display="none";
					}
					
					var data_item = {
						"kindName": item.kindName,
						"tagId": item.subTagList[index1].tagId,
						"tagKind": item.tagKind,
						"tagName": item.subTagList[index1].tagName,
						"token": localStorage.token,
						"userId": localStorage.userId
					};
					this.add_array.tagList.push(data_item);

				} else {
					for(var i = 0; i < this.add_array.tagList.length; i++) {
						if(this.add_array.tagList[i].tagId == item.subTagList[index1].tagId) {
							
							if(labeltag=="label_marry_manget"){
										labevent.currentTarget.setAttribute("class", "label_person1");
										labevent.currentTarget.getElementsByClassName("lab_img1")[0].style.display = "inline";
									}else{
										labevent.currentTarget.setAttribute("class", "label_marry_manget");
										labevent.currentTarget.getElementsByClassName("lab_img1")[0].style.display = "none";
									}
							this.add_array.tagList.splice(i, 1);
							flage = true;
							break;
						} else {
							flage = false;
						}
					}
					if(flage == false) {
						if(labeltag=="label_marry_manget"){
						labevent.currentTarget.setAttribute("class", "label_person1");
						labevent.currentTarget.getElementsByClassName("lab_img1")[0].style.display = "inline";
					}else{
						labevent.currentTarget.setAttribute("class", "label_marry_manget");
						labevent.currentTarget.getElementsByClassName("lab_img1")[0].style.display = "none";
					}
						var data_item = {
							"kindName": item.kindName,
							"tagId": item.subTagList[index1].tagId,
							"tagKind": item.tagKind,
							"tagName": item.subTagList[index1].tagName,
							"token": localStorage.token,
							"userId": localStorage.userId
						};
						this.add_array.tagList.push(data_item);
					}
				}
				console.log("===2" + JSON.stringify(this.add_array));
			},
			label_manget() {
				var data = {
					"custId": this.$route.query.custId ,
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				Indicator.open();
				this.$http.post(this.$store.state.link + '/cut/cut/queryCustInfo', data)
					.then(res => {
						Indicator.close();
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							if(res.data.output.custGender != undefined) {
								if(res.data.output.custGender == "F") {
									this.label_sex = "女";
								} else if(res.data.output.custGender == "M") {
									this.label_sex = "男";
								}
							} else {
								this.label_sex = "";
							}

							if(res.data.output.custBirthday != undefined) {
								this.label_data = res.data.output.custBirthday;
							} else {
								this.label_data = "";
							}
							if(res.data.output.custBirthday != undefined) {
								this.label_gound = res.data.output.custHomeAddr;
							} else {
								this.label_gound = "";
							}
							if(res.data.output.yearIncome != undefined) {
								this.label_money = res.data.output.yearIncome;
							} else {
								this.label_money = "";
							}

						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
						Indicator.close();
					})

			},
			label_all() {
//			adocument.getElementsByClassName("lab_img");
//				document.getElementsByClassName("lab_img").setAttribute("class","");
				var data = {
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				this.$http.post(this.$store.state.link + '/cut/cut/queryTagList', data)
					.then(res => {
						console.log("全部标签"+JSON.stringify(res.data));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.tabs = res.data.output;
							console.log(this.tabs)
							for(var i = 0, j = this.tabs.length; i < j; i++) {
								console.log(this.tabs[i].kindName == "个性特征")
								if(this.tabs[i].kindName == "个性特征") {
									this.styles = this.tabs[i];
									this.tabs.splice(i, 1);

								} else {
									this.styles = this.tabs[i];
								}
							}
							var labeldata = {
								 "custId": this.$route.query.custId,
								 "token": localStorage.token,
								 "userId": localStorage.userId
							};
							this.$http.post(this.$store.state.link + '/cut/cut/queryCustTagList', labeldata).then(response => {
								console.log("选中标签"+JSON.stringify(response.data));
								Indicator.close()
								if(response.data.code == "SYS_S_000") {
									
									if(response.data.output.length != 0) {
										var data = response.data.output
										var arr = []
										for(var j = 0; j < data.length; j++) {
											
											if(data[j].subTagList.length <= 1) {
												arr.push(data[j].subTagList[0])
											} else {
												for(var m = 0; m < data[j].subTagList.length; m++) {
													arr.push(data[j].subTagList[m])
												}
											}
											
											for(var k=0;k<data[j].subTagList.length;k++){
												var aaa={
													"kindName": data[j].kindName,
													"tagId": data[j].subTagList[k].tagId,
													"tagKind": data[j].tagKind,
													"tagName": data[j].subTagList[k].tagName
												}
													this.add_array.tagList.push(aaa);
											}
										}
										console.log("2223333=="+JSON.stringify(this.add_array))
										//								var list=document.getElementsByClassName('a');
										var list = this.$refs.a1;
										for(var i = 0, j = list.length; i < j; i++) {
											for(var m = 0, n = arr.length; m < n; m++) {
												if(list[i].getAttribute('code') == arr[m].tagId) {
													list[i].setAttribute("class", "label_marry_manget1");
													
													
												
												}
											}

										}
									} else {

									}

								} else {
									Toast(response.data.desc);
								}
							}, response => {
								Indicator.close()
								console.log("ajax error");
							});

						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			label_save() {
//				var data = {
//					
//						"custId": "1",
//						"tagList":this.add_array ,
//						"userId": "1"
//					};
			this.add_array.custId=this.$route.query.custId;
			this.add_array.userId=localStorage.getItem("userId")
			this.add_array.token=localStorage.token;

				console.log("23456==="+JSON.stringify(this.add_array));
				this.$http.post(this.$store.state.link + '/cut/cut/updateCustTag', this.add_array)
					.then(res => {
						Indicator.close();
						console.log("===ass"+JSON.stringify(res.data));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							
							Toast("保存成功");
							this.label_all();
							this.add_array.tagList=[];
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
						Indicator.close();
					})
			},

		}
	}
</script>

<style scoped="scoped">
	.label_all {
		padding-bottom: .35rem;
		background-color: #FFFFFF;
	}
	
	.label_filter {
		filter: blur(0.18rem);
	}
	
	.label_div {
		height: 0.88rem;
		padding-top: 0.32rem;
	}
	
	.label_div1 {
		height: 0.88rem;
		margin-top: 0.16rem;
	}
	
	.label_even {
		/*height: 1.64rem;*/
		margin-top: 0.16rem;
		padding: 0.16rem 0.6rem 0.26rem 0;
	}
	
	.label_text {
		margin-left: 0.4rem;
		height: 100%;
		box-shadow: 0 0.01rem 0 rgba(0, 0, 0, 0.05);
		border-bottom: 0.001rem solid #e4e5e6;;
	}
	
	.label_gener {
		box-shadow: 0 0.01rem 0 rgba(0, 0, 0, 0.05);
		border-bottom-style: 0.001rem solid;
	}
	
	.gener {
		/*line-height: 0.88rem;*/
		font-size: 0.36rem;
		color: #222222;
		display: inline-block;
		margin-top: 0.26rem;
	}
	
	.label_gener_hun {
		font-size: 0.36rem;
		color: #222222;
		display: block;
		float: left;
	}
	
	.sex {
		
		font-size: 0.32rem;
		color: #969696;
		margin-right: 0.4rem;
		float: right;
		display: inline-block;
		margin-top: 0.26rem;
	}
	
	.label_mang {
		margin-top: 0.86rem;
		padding: 0 0 0 0.4rem;
	}
	
	.label_family {
		font-size: 0.36rem;
		color: #222222;
	}
	
	.label_biao {
		margin-top: 0.4rem;
		box-shadow: 0 0.01rem 0 rgba(0, 0, 0, 0.05);
		border-bottom-style: 0.001rem solid;
		
		padding-right: 0.4rem;
		
	}
	
	.label_manget_div {
		box-shadow: 0 0.01rem 0 rgba(0, 0, 0, 0.05);
		border-bottom-style: 0.001rem solid;
		padding: 0.2rem 0 0 0;
		overflow: hidden;
		border-bottom: .001rem solid #e4e5e6;
	}
	
	.label_marry {
		font-size: 0.28rem;
		color: #555555;
		border: 0.01rem solid #555555;
		border-radius: 0.2rem;
		padding: 0.05rem 0.26rem;
		display: inline-block;
		margin-right: 0.21rem;
		margin-left: 0.21rem;
		margin-bottom: 0.38rem;
		text-align: center;
		vertical-align: middle;
		
	}
	
	.label_marry_manget {
		font-size: 0.28rem;
		color: #555555;
		border: 0.01rem solid #555555;
		border-radius: 0.2rem;
		padding: 0.05rem 0.26rem;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		margin-bottom: 0.3rem;
		margin-left: 0.32rem;
	}
	
	.label_marry_manget1 {
		font-size: 0.28rem;
		color: #EB6067;
		border: 0.01rem solid #EB6067;
		border-radius: 0.2rem;
		padding: 0.05rem 0.26rem;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		margin-bottom: 0.3rem;
		margin-left: 0.32rem;
	}
	
	.label_person {
		font-size: 0.28rem;
		color: #F25858;
		border: 0.01rem solid #F25858;
		border-radius: 0.2rem;
		padding: 0.05rem 0.26rem;
		display: inline-block;
		margin-right: 0.21rem;
		margin-left: 0.21rem;
		margin-bottom: 0.38rem;
		text-align: center;
		vertical-align: middle;
		position: relative;
	}
	.label_person1{
		font-size: 0.28rem;
		color: #EB6067;
		border: 0.01rem solid #EB6067;
		border-radius: 0.2rem;
		padding: 0.05rem 0.26rem;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		margin-bottom: 0.3rem;
		margin-left: 0.32rem;
		position: relative;
	}
	.label_marry1 {
		font-size: 0.28rem;
		color: #F25858;
		border: 0.01rem solid #F25858;
		border-radius: 0.2rem;
		padding: 0.05rem 0.26rem;
		display: inline-block;
		margin-right: 0.21rem;
		margin-bottom: 0.38rem;
		text-align: center;
		vertical-align: middle;
	}
	
	.label_spel {
		height: 0.44rem;
	}
	
	.label_zi {
		float: right;
		margin-right: 0.4rem;
		font-size: 0.28rem;
		color: #EB6067;
	}
	
	.div_layer {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.20);
		position: fixed;
		z-index: 1;
		display: none;
	}
	
	.label_bottom {
		position: fixed;
		bottom: 0;
		height: 3.98rem;
		width: 100%;
		background: #FAFAFA;
	}
	
	.label_hidd {
		height: 0.88rem;
		box-shadow: 0 0.01rem 0 rgba(0, 0, 0, 0.05);
		border-bottom-style: 0.001rem solid;
		padding: 0 0.32rem;
	}
	
	.label_canel {
		display: inline-block;
		line-height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
	}
	
	.label_con {
		display: inline-block;
		line-height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		float: right;
	}
	
	.label_ment {
		margin-top: 0.92rem;
		padding: 0 0.4rem;
	}
	
	.label_input {
		width: 100%;
		height: 0.68rem;
		font-size: 0.24rem;
		color: #8A8A8F;
	}
	
	.lab_img {
		width: 0.48rem;
		height: 0.48rem;
		position: absolute;
		right: -0.16rem;
		top: 0.01rem;
		display: none;
	}
	.lab_img1 {
		width: 0.48rem;
		height: 0.48rem;
		position: absolute;
		right: -0.16rem;
		top: 0.01rem;
		display: none;
		
	}
	.la_ma {
		float: right;
		vertical-align: middle;
		margin-top: 0.2rem;
	}
	
	.label_manget_gener {
		float: right;
		width: 3.5rem;
		display: inline-block;
		margin-right: 0.4rem;
	}
	
	.chil {
		margin-right: 2.68rem;
	}
	
	.man_span {
		float: right;
	}
	
	.classtrue {
		display: none;
	}
	
	.ctc_div_ok {
		width: 3rem;
		height: 0.8rem;
		margin: 0 auto;
		margin-bottom: 0.7rem;
		margin-top: 0.65rem;
		font-size: 0.4rem;
		text-align: center;
		color: #FFFFFF;
		line-height: 0.8rem;
		border-radius: 0.5rem;
		background: #EB7760;
	}
</style>