<template>
	<div class="one">
		
		<div class="twoCon">
			<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">被保险人信息</label>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">出生日期</label>
					<input type="date" class="inputText dateInput left"placeholder="请选择出生日期"/>
					<span class="dateBox1"></span>
			</p>
			 <p class="inputGrop1 clearFloat">
					<label class="inputLabel left"><label class="start left">*</label>性别</label>
					<span class="inputText inputSpan left left1">
					<span class="sex sexM" @click="sexChose">
						<img src="/static/img/sexNo.png" class="sexImg" v-show="showImg" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/sexS.png" class="sexImg" v-show="!showImg" style="width:0.48rem;height:0.48rem;" />
						<label>男</label>
					</span>
					<span class="sex sexF" style="marginLeft:0.6rem;" @click="sexChose">
						<img src="/static/img/sexNo.png" class="sexImg" v-show="!showImg" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/sexS.png" class="sexImg" v-show="showImg" style="width:0.48rem;height:0.48rem;"/>
						<label>女</label>
					</span>
					</span>
				</p>
		</div>
		
		<div class="twoCon">
			<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">主险信息</label>
			</p>
			<p class="inputGrop clearFloat">
					<label class="more left">君康尊享金生终身年金保险</label>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">缴费方式</label>
					<select name="name_car"  class="left inputText inputWidth" >
						<option >年缴</option>
						<option >年缴</option>
					</select>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">缴费期间</label>
					<select name="name_car"  class="left inputText inputWidth" >
						<option >年缴</option>
						<option >年缴</option>
					</select>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">保险期间</label>
					<select name="name_car"  class="left inputText inputWidth" >
						<option >年缴</option>
						<option >年缴</option>
					</select>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">保额（元）</label>
					<input type="text" class="inputText left"   placeholder="请输入保额" />
			</p>
			<p class="inputGrop1 clearFloat">
					<label class="inputLabel3 left">保费（元）</label>
					<input type="text" class="inputText left"   placeholder="请输入保费" />
			</p>
		</div>
		
		<trialCalculation1 v-show="child1"></trialCalculation1>
		<trialCalculation2 v-show="child2"></trialCalculation2>
		<trialCalculation3 v-show="child3"></trialCalculation3>
		<trialCalculation4 v-show="child4"></trialCalculation4>
		
		<div class="addMore" @click="addPop">添加附加险</div>
		<div class="twoCon twoCon1">
		<p class="inputGrop1 clearFloat">
			<label class="inputLabel3 left">合计保费（元）</label>
			<input type="text" class="inputText left" placeholder="合计"  />
		</p>
		</div>
		<div  class="btnBox clearFloat" >
				<div class="boxLast" @click="lastClick">上一步</div>
				<div class="boxNext" @click="nextClick">下一步</div>
		</div>
		<div class="box_wrap" v-show="popUp">
			<div class="box_choose">
				<p class="box_left"><span class="middlle">请添加附加险</span><span @click="cleanPop" class="remove">×</span></p>
				<p class="box_add"><span>附加住院费用医疗</span><span class="btn_add" @click="addChild('1')">添加</span></p>
				<p class="box_add"><span>附加住院津贴医疗</span><span class="btn_add" @click="addChild('2')">添加</span></p>
				<p class="box_add"><span>附加住院费用医疗</span><span class="btn_add" @click="addChild('3')">添加</span></p>
				<p class="box_add"><span>附加住院津贴医疗</span><span class="btn_add" @click="addChild('4')">添加</span></p>
			</div>
		</div>	
	</div>
</template>

<script>
	import trialCalculation1 from "./trialCalculation1.vue"
	import trialCalculation2 from "./trialCalculation2.vue"
	import trialCalculation3 from "./trialCalculation3.vue"
	import trialCalculation4 from "./trialCalculation4.vue"
	export default{
		data(){
			return{	
				showImg:false,
				add:true,
				popUp:false,
				child1:false,
				child2:false,
				child3:false,
				child4:false
			}
		},
		components:{
			trialCalculation1,
			trialCalculation2,
			trialCalculation3,
			trialCalculation4
		},
		methods:{
			//男女
			sexChose() {
				if(this.showImg){
					this.showImg = false
				}else{
					this.showImg = true
				}
			},
			lastClick(){
				this.$router.push('/affirm');
			},
			nextClick() {
				this.$router.push('/policyHolder');
			},
			// 添加弹框
			addPop(){
				if(!this.popUp){
					this.popUp = true;
				}
			},
			// 删除弹框
			cleanPop(){
				if(this.popUp){
					this.popUp = false;
				}
			},
			// 添加子组件
			addChild(index){
				if(index == 1){
					this.popUp= false;
					this.child1= true;
				};
				if(index == 2){
					this.popUp= false;
					this.child2= true;
				};
				if(index == 3){
					this.popUp= false;				
					this.child3= true;
				};
				if(index == 4){
					this.popUp= false;
					this.child4= true;
				}
			}
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
	.inputWidth {
		width: 4.4rem;
	}
	.one {
		width: 100%;
		min-height: 100%;
		position: relative;
		background: #F3F3F3;
	}
	.twoCon {
		margin-bottom: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
		overflow: scroll;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.twoCon1{
		margin-bottom: 0.64rem;
	}
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	.title_twoCon1 {
		height: 1.11rem;
		line-height: 1.11rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.titleLable_twoCon {
		display: inline-block;
		font-size: 0.34rem;
		font-weight: bold;
		color: #222222;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputGrop1{
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	.inputLabel3 {
		display: block;
		width: 2.3rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	.dateInput {
		width: 2.7rem;
	}
	.more{
		line-height: 0.88rem;
		font-size: 0.3rem;
		color: #C9141E;
	}
	.addMore{
		width:6.7rem;
		height:0.88rem;
		margin: 0.2rem auto 0.4rem;
		background: #C9141E;
		border-radius: 0.16rem;
		font-size:0.28rem;
		text-align: center;
		color: #FFFFFF;
		line-height: 0.88rem;
	}
	.addMoney{
		background: #FFFFFF;
		width:100%;
		height:0.88rem;
	}
	.btnBox {
		/*position: absolute;*/
		width:6.64rem;
		/*height:0.88rem;*/
		margin: 0 auto;
		padding-bottom: 0.84rem;
	}
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #c9141e;
		letter-spacing: 0;
		border: 0.01rem solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	
	.boxNext {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #c9141e;
		/*background: #c9141e;*/
		letter-spacing: 0;
		border: 0.01rem solid #c9141e;
		border-radius: .44rem;
		float: right;
	}
		.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputSpan {
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	
	.inputLabel {
		display: block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		padding-left: 0;
	}
	
	.inputLabel3 {
		display: block;
		width: 2.3rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	.left1{
		margin-left: 0.18rem;
	}
	.box_wrap{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		background: rgba(0,0,0,0.5);
	}
	.box_choose{
		width: 100%;
		height: 70%;
		background: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 20;
	}
	.box_left{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid #ccc; 
	}
	.box_left span{
		float: left;
		margin-left: 2.5rem;
	}
	.middlle{
		font-weight: bold;
	}
	.box_add{
		width: 100%;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 0.01rem solid #ccc; 
	}
	.btn_add{
		color: #fff;
		background: #C9141E;
		width: 1rem;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
	}
	.remove{
		font-size: 0.8rem;
	}
</style>