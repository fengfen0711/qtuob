<template>
	<div class="background">
		<div v-if="!cust_status" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						非保险从业人员，无法通过本平台做产品推广，请联系我们的客服马上办理从业资格认证。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancer1" @click="notopen">取消</div>
					<div class="cs_btn_bg"></div>
					<a class="cs_btn_cancer2" @click="notopenknow" :href="'tel:' +  phoneNum ">马上联系</a>
				</div>
			</div>
		</div>
		<div v-if="!cust_Sevenindex" class="custseven_sattus" @touchmove.prevent > 
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
					该客户的生日为系统智能匹配，我们力求精准匹配生日客户，但数据不一定精准，你一旦发现有误，请及时修复。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancercust" @click="indexknow">知道了</div>
				</div>
			</div>
		</div>
		<div v-if="!mark_flag" class="cs_div_centenall" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">客户生日</div>
				<div class="cs_div_openiputindex">
					<input v-model="birth" class="cs_input_namebir" placeholder="生日" type="date" />
				</div>
				<div class="cs_btn_bootom">
					<div @click="cancel" class="cs_btn_cancer">取消</div>
					<div class="cs_btn_bg"></div>
					<div @click="add_newCust" class="cs_btn_cancer">确定</div>
				</div>
			</div>
		</div>
<!--	<div class="blur_all"  style="border: 1px solid red;">-->
		<img class="manage_top" src="/static/img/bg_manage_top.png" />
			<div ref="first_w" id="first_w" >
			<div class="first">
				<p class="name">{{list.custName}}</p>
			</div>
		</div>

		
		
		<div class="height" >
			<div ref="rotatoDom" id="rotatoDom" class="rotatoDom">
				<p class="age_w">
					<img class="sex" v-if="img" src="/static/img/sex.png" alt="" />
					<img class="sex" v-if="!img" src="/static/img/nan.png" alt="" />
					<span class="index_age">
						<span class="age" :class="list.custBirthday | display">
						出生年月:{{list.custBirthday}}
						</span>
					<img class="question1" src="/static/img/question.png" alt="" :class="list.custBirthFrom |displayin" @click="index_birth"/>	
					</span>
				</p>
				<p class="phone_w" :class="list.custMobile | display ">
					<img class="sex" src="/static/img/tel.png" alt="" />
					<a class="tel" :href="'tel:' +  list.custMobile">{{ list.custMobile }}</a>
					<img class="local" src="/static/img/local.png" :class="list.mobileArea | display " />
					<span :class="list.mobileArea | display " class="address">{{list.mobileArea}}</span>
				</p>
				<div class="xiang_w">
					<p class="xiang" @click="handleClickXiang">详情 &gt;</p>
					<p class="scale" @click="handleClickComplete">资料完整度{{list.infoPercent }}%
						<img class="question" src="/static/img/question.png" alt="" />
					</p>
				</div>
				
				<div class="tag_w">
					<span @click="handleClickTag" class="tag" v-for="item in tagList">{{item.tagName}}</span>
				</div>
			</div>
			<div class="allSort">
				<p class="luck_title">送祝福/备忘录</p>
				<div class="sortMenu clearfix">
					<ul class="sortMenu-ul sortMenu-ul-first">
						<li class="cell" @click="handleClickMing">
							<img class="bg_imgcard" src="/static/img/bg_manage.png" />
							<img class="bir" src="/static/img/bir.png" alt="" />
							<p class="bir_txt">生日送祝福</p>
							<p class="bir_date" :class="list.custBirth | displayblock">为客户设置生日，</br></br>   不错过TA任何一个重要的成长时刻</p>
							<p class="bir_date" :class="list.custBirth | display">{{list.custBirth}}&nbsp;&nbsp;{{list.birthWeek}}</p>
							<!--<p class="bir_next" :class="list.custBirth | display">{{list.nextBirthCount | data_fil}}&nbsp;&nbsp;{{list.custAge | add}}岁生日</p>-->
							<p class="bir_next" id="birth_id" :class="list.custBirth | display">距TA{{list.custAge}}生日还有{{list.nextBirthCount | data_fil}}天</p>
							<p class="bir_next" id="bircount" :class="list.nextBirthCount | displayvalue">今天TA{{list.custAge}}岁生日，记得送去祝福</p>
						</li>
						<li class="cell1" @click="handleClickPlan">
							<img class="bir" src="/static/img/bei.png" alt="" />
							<p class="bir_txt">设置备忘</p>
							<p class="bir_date">{{list.custBirth}}&nbsp;&nbsp;{{list.birthWeek}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="allSort" >
				<p class="luck_title">限时优惠/个性推荐 <span class="more" @click="handleClickMore">全部&nbsp;&gt;</span></p>
				<div class="sortMenu clearfix">
					<ul class="sortMenu-ul sortMenu-ul1 ">
						<li v-if="!mark_flag1" class="hui" @click="handleClickDetail" v-for="item in discount" :prodCode="item.prodCode" :prodSaleCode="item.prodSaleCode">
							<p class="hui_title">{{item.prodName }}</p>
							<p class="birthdy_hui" ><span class="birthdy_left">生日后再购买要<span class="upstyle">涨</span><span class="upstyle1">涨</span><span class="upstyle2">涨</span></span></p>
							<p class="hui_money">
								<!--<span class="price">&yen;{{item.coverageFeesList[0].actFee}}</span>
								<span class="original">&yen;{{item.coverageFeesList[0].oriFee}}</span>-->
								<span class="index_span">
									<img src="/static/img/up.png" class="index_img"/>
									<span class="percentage">￥{{item.actPre}}</span>
								</span>
								
							</p>
						</li>
						<li v-if="mark_flag1" class="hui1 clearFloat" @click="handleClickDetail1" v-for="item1 in discount" :prodCode="item1.prodCode" :prodSaleCode="item1.prodSaleCode" >
							<img :src="item1.prdPicUrl" class="imgBirth" />
							<p class="rightBox">
								<span class="hui_title1">{{item1.prodName }}</span>
								<span class="hui_title2">{{item1.cmpName }}</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="allSort">
				<p class="luck_title">客户画像</p>
				<ul class="photo">
					<li class="photo_item" @click="handleClickTag">
						<img class="tag_img" src="/static/img/tag.png" alt="" />
						<p class="tag_title">标签管理</p>
						<p class="tag_title1">给你留下的印象</p>
					</li>
					<li class="photo_item" @click="handleClickMing">
						<img class="tag_img" src="/static/img/tager_v.png" alt="" />
						<p class="tag_title">生日生名人堂</p>
						<p class="tag_title1">与名人的生日奇缘</p>
					</li>
					<li class="photo_item" @click="handleClickBir">
						<img class="tag_img" src="/static/img/tag_star.png" alt="" />
						<p class="tag_title">生日物语</p>
						<p class="tag_title1">解密性格</p>
					</li>
				</ul>
			</div>
			<div class="allSort">
				<p class="luck_title">展业助手</p>
				<ul class="assistant">
					<li class="assistant_item" @click="handleClickPlan">
						<img class="assistant_img" src="/static/img/manage_plan.png" alt="" />
						<p class="assistant_p">计划书</p>
					</li>
					<li class="assistant_item" @click="handleClickshare">
						<img class="assistant_share" src="/static/img/manage_share.png" alt="" />
						<p class="assistant_p">产品分享</p>
					</li>
					<li class="assistant_item" @click="handleClickconfirm">
						<img class="assistant_img" src="/static/img/manage_customer.png" alt="" />
						<p class="assistant_p">客户委托书</p>
					</li>
					<li class="assistant_item" @click="handleClickPlan">
						<img class="assistant_img" src="/static/img/manage_ai.png" alt="" />
						<p class="assistant_p">智能评测</p>
					</li>
				</ul>
			</div>
		</div>
	<!--</div>-->
		<div class="mask" v-if="mask">
			<div class="complete">
				<p class='com_title'>客户资料完成度</p>
				<div class="com_center">
					<span>姓名（10%）</span>
					<span class="color_red">手机号码（20%）</span>
					<span>职业（5%）</span>
					<span class="color_red">证件号码（20%）</span>
					<span>身高（5%）</span>
					<span>出生日期（10%）</span>
					<span>体重（5%）</span>
					<span>电子邮件（10%）</span>
					<span>年收入（5%）</span>
					<span>常用地址（10%）</span>
				</div>
				<div class="mask_btn" @click="handleClickMask">知道了</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'allSort',
		data() {
			return {
				tagList: [],
				shou: true,
				list: [],
				discount: [],
				imgBirth:'',
				custId: this.$route.query.custId,
				show: "",
				birth: "",
				mark_flag: true,
				mark_flag1: true,
				img: "",
				mask: false,
				cust_Sevenindex:true,
				test: false,
				cust_status:true,
				phoneNum:"010-86220865",
			}
		},
		created() {
			this.getInformation()
			this.getTag()
			this.getDiscount()
		},
		mounted() {
			//window.addEventListener('scroll', this.handleScroll)
		},
		methods: {
			notopenknow(){
				this.cust_status=true;
			},
			notopen(){
				this.cust_status=true;
			},
			indexknow(){
				this.cust_Sevenindex=true
			},
			index_birth(){
				
				this.cust_Sevenindex=false
			},
			handleClickDetail1(e) {
				var prodCode = e.currentTarget.getAttribute("prodCode");
				var prodSaleCode = e.currentTarget.getAttribute("prodSaleCode");
				this.$router.push('/detail?prodCode=' + prodCode + "&&prodSaleCode=" + prodSaleCode)
			},
			handleClickDetail(e) {
				var prodCode = e.currentTarget.getAttribute("prodCode");
				var prodSaleCode = e.currentTarget.getAttribute("prodSaleCode");
				this.$router.push('/detail?prodCode=' + prodCode + "&&prodSaleCode=" + prodSaleCode)
			},
			handleClickMask() {
				this.mask = false
			},
			handleClickComplete() {
				this.mask = true
			},
			handleClickPlan() {
				Toast('功能暂未开放')
			},
			getTag() {
				var data = {
					"custId": this.custId,
					"token": localStorage.token,
					"userId": localStorage.userId
				}
				this.$http.post(this.$store.state.link + '/cut/cut/queryCustTagList', data).then(response => {
					var arr = response.data.output;
//					console.log("gggg000=="+arr)
					for(var i = 0, j = arr.length; i < j; i++) {
						for(var m = 0, n = arr[i].subTagList.length; m < n; m++)
							this.tagList.push(arr[i].subTagList[m])
					}
					if(this.tagList.length > 3) {
						this.tagList.length = 3
					}
				}, response => {
					console.log("ajax error");
				});
			},
			handleClickshare() {
				this.$router.push('/product')
			},
			handleClickconfirm() {
				if (this.$store.state.loginId == "2") {
					window.localStorage.custName=this.list.custName
					this.$router.push('/custConfirmation?custId='+this.$route.query.custId)
				}else{
					this.cust_status=false;
				}
			},
			handleClickXiang() {
				this.$router.push('/information?custId=' + this.custId)
			},
			handleClickMing() {
				if(this.list.custBirth) {
					this.$router.push('/brithdayfall?custId=' + this.custId)
				} else {
					this.mark_flag = false
					this.getDiscount()
				}

			},
			handleClickTag() {
				this.$router.push('/labelmanagement?custId=' + this.custId)
			},
			getDiscount() {
				var data = {
					"custId": this.custId,
					"pageIndex": 0,
					"pageSize": 100,
					"token":  localStorage.token,
					"userId": localStorage.userId
				}
				console.log(data)
				this.$http.post(this.$store.state.link + '/cut/cut/queryProdList', data).then(response => {
					console.log(response.data)
					if(response.data.code == "SYS_S_000") {
						if(response.data.output.length >= 3) {
							response.data.output.length = 3
						}
						this.discount = response.data.output

//						console.log(this.discount[0].coverageFeesList != undefined && this.discount[0].coverageFeesList != "")
						if(this.discount.length > 0 && (this.discount[0].coverageFeesList != undefined && this.discount[0].coverageFeesList != "")) {

							this.mark_flag1 = false;
						}else{
							this.mark_flag1 = true;
						}
						console.log(this.mark_flag1)
					} else {
						Toast(response.data.desc);
					}
				}, response => {
					console.log("ajax error");
				});
			},
			getInformation() {
				var data = {
					"custId": this.custId,
					"token": localStorage.token,
					"userId": localStorage.userId
				}
//				console.log(data)
				this.$http.post(this.$store.state.link + "/cut/cut/queryCustInfo", data).then(response => {
					this.list = response.data.output
					console.log(this.list)
					console.log("444555=="+JSON.stringify(this.list));
					if(response.data.code == "SYS_S_000"){
						
						if(this.list.custBirthday!=undefined){
							
						var newcustBirthday=this.list.custBirthday.substring(0,4);
						var monthcustBirthday=this.list.custBirthday.substring(5,11);
						if(newcustBirthday=="0001"){
						this.list.custBirthday=monthcustBirthday;
						this.list.custAge="下一个"
						
						}else{
						if(this.list.nextBirthCount=="0"){
							document.getElementById("birth_id").style.display="none";
						}else{
							this.list.custAge=Number(this.list.custAge)+1+"岁";
						}
						}
					}
//					if (this.list.custBirth == undefined && this.mark_flag1 == true) {
//						
//						this.getDiscount()
//					}else{
//						
//						this.getDiscount()
//					}
					
					console.log(this.list.custGender == "M")
					if(this.list.custGender == "M") {
						this.img = false
					} else if(this.list.custGender == "F") {
						this.img = true
					}
					}
					
				}, response => {
					console.log("ajax error");
				});
			},
			handleClickMore() {
				
				if(!this.mark_flag1) {
					this.$router.push('/preferentialRecommendation?custId=' + this.custId)
				} 
				else if(this.list.custBirthday==undefined){
					this.mark_flag = false
				}
				else if(this.list.custBirthday.length>=10) {
					Toast("客户暂时不满足购买条件")
				}
				
				else{
					
					this.mark_flag = false
				}
			},
			handleClickBir() {
				if(this.list.custBirth) {
					this.$router.push('/birthdayObject?birthday=' + this.list.custBirth)
				} else {
					this.mark_flag = false
					this.getDiscount()
				}
			},
			cancel() {
				this.mark_flag = true
				this.getDiscount()
			},
			add_newCust() {
				if(this.birth != "") {
					var data = {
						"addr": this.list.custHomeAddr,
						"age": "",
						"area": this.list.mobileArea,
						"birth": this.birth,
						"cName": this.list.custName,
						"certiType": this.list.custCertiType,
						"custId": this.custId,
						"email": this.list.custEmail,
						"height": this.list.custHeight,
						"idNo": this.list.custIdNo,
						"job": this.list.occDetailType,
						"mobile": this.list.custMobile,
						"pic": "",
						"sex": this.list.custGender,
						"weight": this.list.custWeight,
						"yearIncome": this.list.yearIncome,
						"token": localStorage.token,
						"userId": localStorage.userId
					}
					console.log(data)
					this.$http.post(this.$store.state.link + "/cut/cut/updateCust", data).then(response => {
						console.log(response.data)
						if(response.data.code == "SYS_S_000") {
							
							this.mark_flag = true
							this.getDiscount()
							Toast("客户生日添加成功")
							this.getInformation()
						}else{
							Toast(response.data.desc)
						}
					}, response => {
						console.log("ajax error");
					});
				} else {
					Toast("请选择生日")
				}
			}
		},
		filters: {
//			add: function(value) {
//				return value += 1
//				
//			
//			},
			displayin:function(value){
				if(value==0){
					return value = "displayin"
				}else{
					return value = "displayblock"
				}
			},
			displayvalue:function(value){
				if(value==0){
					return value = "displayblock"
				}else{
					return value ="displayvalue"
				}
			},
			display: function(value) {
				if(value == "" || value == undefined) {
					return value = "display"
				} else {
					return value = ""
				}
			},
			displayblock:function(value) {
				if(value == "" || value == undefined) {
					return value = "displayblock"
				} else {
					return value = "display"
				}
			},
			data_fil:function(value) {
				if(value == 0) {
					return value = "今天"
				}else{
					return Number(value)
				}
			},
			money: function(value) {
				if(value == "") {
					return value = "false"
				} else {
					return value = "true"
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.blur_all {
		width: 100%;
		height: 100%;
		border: 1px solid red;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.background {
		position: absolute;
	}
	
	.height {
		width: 100%;
		position: fixed;
		top: 1.4rem;
		bottom: 0;
		overflow: scroll;
	}
	.blur_all1 {
		filter: blur(0.18rem);
	}
	.height::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.background {
		overflow: hidden;
	}
	
	.bei {
		margin-top: 2.18rem;
		height: 2.44rem;
	}
	
	.rotatoDom {
		overflow: hidden;
	}
	
	.manage_top {
		width: 7.5rem;
		height: 7.52rem;
		position: fixed;
		z-index: -1;
	
	}
	
	.top {
		width: 100%;
		height: 5.76rem;
		overflow: hidden;
	}
	
	#first_w {
		width: 100%;
		height: 1.74rem;
		position: fixed;
		overflow: hidden;
	}
	
	.first {
		height: .74rem;
		position: relative;
		margin-top: .5rem;
	}
	
	.name {
		float: left;
		font-size: .7rem;
		margin-left: .42rem;
		font-weight: bold;
	}
	
	.scale {
		margin-left: .4rem;
		margin-top: .24rem;
		color: #EB6067;
		font-size: .3rem;
		float: left;
		position: relative;
	}
	
	.question {
		width: .28rem;
		height: .28rem;
		position: absolute;
		top: -.08rem;
		right: -.3rem;
	}
	.question1{
		width: .28rem;
		height: .28rem;
		float: left;
		
	}
	.age_w {
		z-index: 1;
		height: .6rem;
		position: relative;
		margin-top: .25rem;
	}
	
	.sex {
		width: .36rem;
		height: .38rem;
		position: absolute;
		left: .42rem;
		z-index: -1;
	}
	
	.age {
		/*position: absolute;*/
		font-size: .4rem;
		float: left;
		z-index: -1;
		
	}
	.index_age{
		width: 6rem;
		position: absolute;
		left: .96rem;
		z-index: -1;
		display: inline-block;
		
	}
	.phone_w {
		height: .4rem;
		position: relative;
	}
	
	.tel {
		width: .36rem;
		height: .38rem;
		position: absolute;
		left: .98rem;
		font-size: .28rem;
		top: .04rem;
	}
	
	.local {
		width: .28rem;
		height: .38rem;
		position: absolute;
		left: 2.86rem;
		top: -.02rem;
	}
	
	.address {
		position: absolute;
		left: 3.26rem;
		font-size: .28rem;
		top: .03rem;
	}
	
	.xiang {
		font-size: .32rem;
		color: #EB6067;
		margin-left: .4rem;
		margin-top: .24rem;
		z-index: 0;
		float: left;
	}
	.xiang_w{
		overflow: hidden;
	}
	.allSort {
		overflow: hidden;
		margin-bottom: 0rem;
	}
	
	.tag_w {
		margin-top: .35rem;
		margin-left: .4rem;
		height: .5rem;
	}
	
	.tag {
		border-radius: 1rem;
		padding: .06rem .26rem;
		border: .001rem solid #EB6067;
		margin-right: .16rem;
		color: #EB6067;
	}
	
	.luck_title {
		margin-top: .3rem;
		font-size: .28rem;
		font-weight: bolder;
		margin-left: .4rem;
		margin-bottom: .06rem;
	}
	
	.more {
		float: right;
		margin-right: .32rem;
	}
	
	.sortMenu {
		width: 100%;
		overflow-x: scroll;
	}
	
	.sortMenu::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.sortMenu-ul {
		height: 2.75rem;
		display: flex;
		padding: 0 .2rem;
	}
	
	.sortMenu-ul-first {
		min-width: 9.8rem;
	}
	
	.sortMenu-ul1 {
		min-width: 7rem;
		height: 2.72rem;
		justify-content: flex-start;
	}
	
	.cell {
		display: inline-block;
		width: 4.66rem;
		height: 2.64rem;
		font-size: 12px;
		margin-left: .1rem;
		position: relative;
	}
	
	.cell1 {
		display: inline-block;
		width: 4.42rem;
		height: 2.4rem;
		background: #fff 90%;
		background: rgba(255, 255, 255, 0.90);
		box-shadow: 0 .02rem .06rem 0 rgba(0, 0, 0, 0.10);
		border-radius: .12rem;
		margin-top: .06rem;
		margin-left: .2rem;
		position: relative;
	}
	
	.bg_imgcard {
		width: 4.66rem;
		height: 2.64rem;
		position: absolute;
		z-index: -1;
	}
	
	.bir {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .36rem;
		left: .3rem;
	}
	
	.bir_txt {
		position: absolute;
		font-size: .32rem;
		color: #222222;
		top: .47rem;
		left: .9rem;
	}
	
	.bir_date {
		position: absolute;
		font-size: .24rem;
		color: #000;
		top: 1.09rem;
		left: .3rem;
	}
	
	.bir_next {
		position: absolute;
		font-size: .36rem;
		color: #ff0000;
		bottom: .5rem;
		right: .32rem;
	}
	
	.hui {
		margin-top: .2rem;
		min-width: 4.64rem;
		height: 2.12rem;
		background: rgba(255, 255, 255, 0.90);
		box-shadow: 0 0rem .2rem 0 rgba(0, 0, 0, 0.10);
		border-radius: .12rem;
		margin-left: .2rem;
		position: relative;
		text-overflow: ellipsis;
		word-break: keep-all;
	}
	
	.hui_title {
		width: 3.94rem;
		margin: 0 auto;
		margin-top: .26rem;
		font-size: .24rem;
	}
	
	.hui1 {
		margin-top: .2rem;
		min-width: 4.64rem;
		height: 2.12rem;
		background: rgba(255, 255, 255, 0.90);
		box-shadow: 0 0rem .2rem 0 rgba(0, 0, 0, 0.10);
		border-radius: .12rem;
		margin-left: .2rem;
		position: relative;
	}
	
	.imgBirth {
		display: block;
		width: 2.3rem;
		height: 1.9rem;
		margin-top: 0.11rem;
		margin-left: 0.12rem;
		float: left;
	}
	.rightBox {
		float: right;
		width: 2rem;
		padding-right: 0.12rem;
	}
	.hui_title1 {
		display: block;
		width: 2rem;
		margin-top: .26rem;
		line-height: 0.34rem;
		font-size: .24rem;
	}
	.hui_title2 {
		position: absolute;
		bottom: 0.12rem;
		right: 0;
		display: block;
		width: 2rem;
		margin-top: .26rem;
		font-size: .2rem;
		text-overflow: ellipsis;
		word-break: keep-all;
		overflow: hidden;
	}
	
	.birthdy_hui {
		margin-top: .4rem;
		overflow: hidden;
		padding: 0 .2rem;
		color: #555;
	}
	
	.birthdy_left {
		float: left;
	}
	
	.birthdy_right {
		float: right;
		margin-right: .6rem;
	}
	
	.hui_money {
		padding: 0 .2rem;
		color: #EB6067;
		font-size: .36rem;
		margin-top: .2rem;
	}
	
	.original {
		text-decoration: line-through;
		font-size: .24rem;
		color: #666;
	}
	
	.percentage {
		float: right;
		font-size: 0.48rem;
		color: #EB6067;
		margin-left: 0.2rem;
		
	}
	
	.photo {
		margin-top: .2rem;
		height: 2.34rem;
		padding-left: .4rem;
	}
	
	.photo_item {
		float: left;
		width: 2.12rem;
		height: 2.12rem;
		background: rgba(255, 255, 255, 0.90);
		box-shadow: 0 0rem .12rem 0 rgba(0, 0, 0, 0.10);
		border-radius: .12rem;
		margin-right: .2rem;
		margin-top: .1rem;
	}
	
	.tag_img {
		width: .64rem;
		height: .64rem;
		margin: .22rem 0 0 .2rem;
	}
	
	.tag_title {
		margin-left: .2rem;
		margin-top: .2rem;
		font-size: .26rem;
		color: #555555;
	}
	
	.tag_title1 {
		margin-left: .2rem;
		margin-top: .18rem;
		font-size: .2rem;
		color: #777777;
	}
	
	.assistant {
		margin-top: .3rem;
		width: 7.5rem;
		height: 3.8rem;
		padding-left: .4rem;
	}
	
	.assistant_item {
		width: 3.28rem;
		height: 1.22rem;
		background: rgba(255, 255, 255, 0.90);
		box-shadow: 0 0rem .12rem 0 rgba(0, 0, 0, 0.10);
		border-radius: .12rem;
		float: left;
		margin-right: .2rem;
		margin-bottom: .16rem;
		position: relative;
	}
	
	.assistant_img {
		width: .4rem;
		height: .46rem;
		position: absolute;
		top: .38rem;
		left: .32rem;
	}
	
	.assistant_share {
		width: .44rem;
		height: .44rem;
		position: absolute;
		top: .4rem;
		left: .28rem;
	}
	
	.assistant_p {
		line-height: .44rem;
		color: #000;
		font-size: .32rem;
		position: absolute;
		left: .9rem;
		top: .39rem;
	}
	
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000;
		z-index: 200;
		background: rgba(0, 0, 0, 0.40);
	}
	
	.complete {
		width: 6rem;
		mine-height: 4rem;
		background: #fff;
		border-radius: .16rem;
		margin: 0 auto;
		margin-top: 50%;
		overflow: hidden;
	}
	
	.mask_btn {
		width: 100%;
		border-top: .001rem solid #C8C7CC;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		color: #EB7760;
		margin-top: .2rem;
	}
	
	.com_title {
		text-align: center;
		margin-top: .2rem;
		font-size: .38rem;
		color: #222;
		margin-bottom: .2rem;
	}
	
	.com_center {
		overflow: hidden;
		margin-bottom: .18rem;
	}
	
	.com_center span {
		display: inline-block;
		float: left;
		width: 50%;
		text-align: center;
		margin-top: .2rem;
	}
	
	.color_red {
		color: #EB7760;
	}
	/*遮罩*/
	
	.cs_div_centenall {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 120;
		background: rgba(0, 0, 0, 0.20);
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
		height: .6rem;
		margin: 0 auto;
		margin-top: 0.48rem;
		border: 0.01rem solid #8E8E93;
	}
	.cs_div_openiputindex{
		width: 4.76rem;
		height: .3rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		/*border: 0.01rem solid #8E8E93;*/
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
	.cs_input_namebir{
		border-radius: 0;
		border: none;
		width: 4.66rem;
		height: 0.6rem;
		font-size: 0.24rem;
		color: #8A8A8F;
		padding-left: 0.1rem;
		margin-top: 0.3rem;
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
	
	.cs_btn_bg {
		display: block;
		float: left;
		height: 0.88rem;
		width: 0.01rem;
		background: #CCCCCC;
	}
	.displayblock{
		display:block
	}
	.displayin{
		display: none;
	}
	.display {
		display: none;
	}
	.displaynone{
		display: none;
	}
	.index_img{
		width: 0.74rem;
		height: 0.48rem;
		
	}
	.upstyle{
		font-size: 0.32rem;
		color: #EB6067;
		font-weight: bold;
	}
	.upstyle1{
		font-size: 0.36rem;
		color: #EB6067;
		font-weight: bold;
	}
	.upstyle2{
		font-size: 0.4rem;
		color: #EB6067;
		font-weight: bold;
	}
	.index_span{
		float: right;
	}
	.displayvalue{
		display: none;
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
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	.cs_btn_cancercust{
		display: block;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	.cust_p{
		text-align: justify;
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
	.cs_div_opentitle {
		width: 100%;
		height: 0.36rem;
		text-align: center;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
		margin-top: 0.32rem;
	}
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	.cust_p{
		text-align: justify;
	}
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
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
	.cs_btn_bg {
		display: block;
		float: left;
		height: 0.88rem;
		width: 0.01rem;
		background: #CCCCCC;
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
	.blur_all {
		width: 100%;
		height: 100%;
	}
	.blur_all1 {
		filter: blur(0.18rem);
	}
</style>