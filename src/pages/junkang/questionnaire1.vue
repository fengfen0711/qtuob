<template>
	<div class="one">
			<div class="Group">
				<div class="twoCon">
					<p  class="title_twoCon clearFloat">
							<label class="titleLable_twoCon left">财务情况</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left"><label class="start left">*</label>年收入</label>
						<input type="text" class="inputText left"   placeholder="请输入您的年收入/万元" />
					</p>
					<p class="inputGrop clearFloat">
							<label class="inputLabel3 left"><label class="start left">*</label>身高</label>
							<input type="text" class="inputText left"   placeholder="请输入身高/cm" />
					</p>
					<p class="inputGrop1 clearFloat">
							<label class="inputLabel3 left"><label class="start left">*</label>体重</label>
							<input type="text" class="inputText left"   placeholder="请输入体重/kg" />
					</p>
				</div>
				<div class="twoCon">
					<p  class="title_twoCon clearFloat">
							<label class="titleLable_twoCon left">被保险人健康情况</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left">1.您是否吸烟？</label>
						<span class="inputText inputSpan left">
								<span class="sex sexM" @click="sexChose">
									<img src="/static/muhaha/Noben.png" class="sexImg" v-show="reSexShow" />
									<img src="/static/muhaha/ben.png" class="sexImg" v-show="!reSexShow" />
									<label>是</label>
								</span>
								<span class="sex sexF" @click="sexChose">
									<img src="/static/muhaha/Noben.png" class="sexImg" v-show="!reSexShow" />
									<img src="/static/muhaha/ben.png" class="sexImg" v-show="reSexShow" />
									<label>否</label>
								</span>
						</span>
					</p>
					<p class="inputGrop1 clearFloat">
						<label class="inputLabel4 left">2.您日常是否饮酒？</label>
						<span class="inputText inputSpan14 left">
								<span class="sex sexM" @click="sexChose1">
									<img src="/static/muhaha/Noben.png" class="sexImg" v-show="reSexShow1" />
									<img src="/static/muhaha/ben.png" class="sexImg" v-show="!reSexShow1" />
									<label>是</label>
								</span>
								<span class="sex sexF" @click="sexChose1">
									<img src="/static/muhaha/Noben.png" class="sexImg" v-show="!reSexShow1" />
									<img src="/static/muhaha/ben.png" class="sexImg" v-show="reSexShow1" />
									<label>否</label>
								</span>
						</span>
					</p>
				</div>
				
				<div class="twoCon1">
					<p class="inputGrop1 clearFloat">
						<p class="left">
							<label class="inputLabel1 left">已饮酒</label>
							<input type="text" class="inputText1 left" /><label class="inputLabel1 left">年&nbsp;;</label>
							<label class="inputLabel1 left">&nbsp;平均每天饮白酒</label>
							<input type="text" class="inputText1 left" /><label class="inputLabel1 left">两。</label>
						</p>
					</p>
				</div>
				<div  class="btnBox clearFloat" >
					<div class="boxLast" @click="lastClick">上一步</div>
					<div class="boxNext" @click="nextClick">下一步</div>
				</div>
				
			</div>	
			
		
	</div>
</template>

<script>
	export default{
		data(){
			return{	
				reSexShow:false,
				reSexShow1:false,
			}
		},
		methods:{
			sexChose() {
				if(this.reSexShow){
					this.reSexShow = false
				}else{
					this.reSexShow = true
				}
			},
			sexChose1() {
				if(this.reSexShow1){
					this.reSexShow1 = false
				}else{
					this.reSexShow1 = true
				}
			},
			lastClick() {
				this.$router.push('/questionnaire');
			},
       		nextClick() {
				this.$router.push('/businessInform');
			},
			
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
		border-radius:0.16rem ;
		-webkit-overflow-scrolling: touch;
	}
	.twoCon1 {
		/*margin-bottom: 0.4rem;*/
		padding: 0 0.4rem;
		/*font-size: 0.32rem;*/
		font-size:lighter;
		color: #222222;
		background: #F3F3F3;
		overflow: scroll;
		overflow-y: auto;
		border-radius:0.16rem ;
		-webkit-overflow-scrolling: touch;
	}
	.Group{
		width:6.44rem;
		height:3.02rem;
		background: #FFFFFF;
		border-radius: 0.16rem;
		margin:0.44rem 0.52rem 0.48rem;
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
	.inputGrop1 {
		font-size: 0.28rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	.inputGrop2{
		height:1rem;
	}
	.inputLabel1{
		display: block;
		/*width:2rem;*/
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	.inputLabel3 {
		display: block;
		width: 2.3rem;
		height: 0.88rem;
		line-height: 0.88rem;
		/*font-weight: bold;*/
		color: #555555;
		/*background: #669900;*/
	}
	.inputLabel4 {
		display: block;
		width: 2.5rem;
		height: 0.88rem;
		line-height: 0.88rem;
		/*font-weight: bold;*/
		color: #555555;
		/*background: #669900;*/
	}
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	.inputText1 {
		width:0.58rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	.start {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
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
	.inputSpan {
		margin-left: 1.7rem;
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	.inputSpan14 {
		margin-left: 1.5rem;
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	.inputLabel {
		display: block;
		/*width: 2.04rem;*/
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		padding-left: 0;
	}
	.sex label {
		display: inline-block;
		float: left;
	}
	.conText{
		line-height:0.45rem;
		font-size: 0.28rem;
	}
	.btnBox {
		/*position: absolute;*/
		width:100%;
		/*height:0.88rem;*/
		background:#F3F3F3;
		display: flex;
		justify-content: space-around;
		/*margin: 0 auto;
		padding-top: 0.64rem;*/
		/*padding-bottom: 0.64rem;*/
	}
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #c9141e;
		letter-spacing: 0;
		border: 1px solid #c9141e;
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
		color: #fff;
		color:  #c9141e;
		/*background: #c9141e;*/
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
		border-radius: .44rem;
		float: right;
	}
</style>