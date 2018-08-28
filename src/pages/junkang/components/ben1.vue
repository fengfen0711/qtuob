<template>
	<div class="one">
		<!--<div class="twoCon">
			<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">受益人信息</label>
			</p>
			<p class="inputGrop1 clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>受益人类型</label>
					<select name="name_car"  class="left inputText inputWidth" >
						<option >法定受益人</option>
						<option >指定受益人</option>
					</select>
			</p>
			
		</div>-->
		<div class="twoCon" v-show="One">
			<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">受益人一</label>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>是投保人的</label>
					<select class="left inputText inputWidth">
						<option>哥哥</option>
                        <option>姐姐</option>
					</select>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">姓名</label>
					<input type="text" class="inputText left"   placeholder="请输入真实姓名" />
			</p>
			<p class="inputGrop clearFloat">
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
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>出生日期</label>
					<input type="date" class="inputText dateInput left" placeholder="请选择出生日期" />
					<span class="dateBox1"></span>
			</p>
			 <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>证件类型</label>
					<select name="name_car" class="left inputText inputWidth">
						<option>身份证</option>
                        <option>通行证</option>
					</select>
			</p>
			 <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>证件号码</label>
					<input type="text" maxlength="18" class="inputTextCard left" placeholder="请输入证件号码" />
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel left"><label class="start left">*</label>证件是否长期</label>
					<span class="inputText inputSpan left left1">
					<span class="sex sexM"  @click="sexOpen">
						<img src="/static/img/sexNo.png" class="sexImg" v-show="showImgY" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/sexS.png" class="sexImg" v-show="!showImgY" style="width:0.48rem;height:0.48rem;" />
						<label>是</label>
					</span>
					<span class="sex sexF" style="marginLeft:0.6rem;"  @click="sexOpen">
						<img src="/static/img/sexNo.png" class="sexImg" v-show="!showImgY" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/sexS.png" class="sexImg" v-show="showImgY" style="width:0.48rem;height:0.48rem;"/>
						<label>否</label>
					</span>
					</span>
			</p>
			<p class="inputGrop clearFloat" v-show="dataShow">
					<label class="inputLabel3 left"><label class="start left">*</label>证件有效期至</label>
					<input type="date" class="inputText dateInput left" placeholder=/>
					<span class="dateBox1"></span>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>国籍</label>
					<select class="inputWidth inputText left">
						<option>中国</option>
                        <option>外国</option>
					</select>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>受益顺序</label>
					<select class="inputWidth inputText left">
						<option>1</option>
					</select>
			</p>
			
			<p class="inputGrop1 clearFloat">
					<label class="inputLabel3 left">受益比例</label>
					<input type="text" class="inputText left"   placeholder="" />
			</p>
		</div>
		<ben2></ben2>
		<!--<p class="mesg1">继续添加受益人</p>-->
		<p class="mesg" @click="clickMore">添加受益人</p>
	
		<div  class="btnBox clearFloat" >
					<div class="boxLast" @click="lastClick">上一步</div>
					<div class="boxNext" @click="nextClick">下一步</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{	
				One:true,	
				showImg:false,
				showImgY:false,
				dataShow:false

			}
		},
		methods:{
			clickMore() {
				
			},
			lastClick() {
				this.$router.push('/recognizee');
			},
       		nextClick() {
				this.$router.push('/questionnaire');
			},
			//男女
			sexChose() {
				if(this.showImg){
					this.showImg = false
				}else{
					this.showImg = true
				}
			},
		//长期是否
			sexOpen(){
				if(this.showImgY){
					this.showImgY = false
					this.dataShow = false
				}else{
					this.showImgY= true
					this.dataShow = true
				}
			}
			
		}
	}
</script>

<style scoped="scoped">
	.left {
		float: left;
	}
	.left1 {
		margin-left: 0.16rem;
	}
	.right {
		float: right;
	}
	.mesg1{
		margin-left: 0.5rem;
		text-align: left;
		font-size: 0.24rem;
		color: #C9141E;
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
		position: absolute;
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
	.inputTextCard {
		width: 3rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
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
	.start {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
	}
	.mesg{
		width:6.7rem;
		height: 0.88rem;
		margin: 0.4rem auto;
    	line-height: 0.88rem;
		font-size: 0.28rem;
    	color: #FFFFFF;
    	background: #C9141E;
    	text-align: center;
    	border-radius: 0.16rem;
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
	.inputSpan {
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	.btnBox {
		/*position: absolute;*/
		width:6.64rem;
		height:0.88rem;
		margin: 0rem auto 0;
		padding-top: 0.64rem;
		padding-bottom: 0.64rem;
	}
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EB7760;
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
		color:  #c9141e;
		/*background: #c9141e;*/
		letter-spacing: 0;
		border: 0.01rem solid  #c9141e;
		border-radius: .44rem;
		float: right;
	}
</style>