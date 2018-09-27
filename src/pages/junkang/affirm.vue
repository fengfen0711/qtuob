<template>
	<div class="one">
		<div class="twoCon">
			<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left qtb">纳税人身份（投保人）</label>
			</p>
			<p  class="title_twoCon1 clearFloat">
					<!--<img class="selected" src="/static/selected.png" alt="" />-->
					<span class="word">仅为中国税收居民</span>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>出生地</label>
					<select class="inputLabel inputText inputWidth left">
						<option>中国</option>
					</select>
			</p>
		</div>
		<div class="twoCon1" v-show="shouj">
			<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left qtb">纳税人身份（受益人）</label>
			</p>
			<p  class="title_twoCon1 clearFloat">
					<!--<img class="selected" src="/static/selected.png" alt="" />-->
					<span class="word">仅为中国税收居民</span>
			</p>
			<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>出生地</label>
					<select class="inputLabel inputText inputWidth left">
						<option>中国</option>
					</select>
			</p>
		</div>
		<div class="conText">
			<p class="notes">注释说明</p>
			<p class="content">
				1、在中国境内有住所，或者无住所而在境内居住满
				    一年的个人应认定为中国税收居民。 在中国境内有<br>住所是指因户籍、 家庭、经济利益关系而在中
				    国境内习惯性居住。
			</p>	 
			<p class="content">
				2、非居民是指中国税收居民以外的个人。 其他国家(地区)税收居民身份认证规则，以及纳税人识别号相关信息请参见国家税收总则网站。
			</p>	
		</div>
		<div class="mustRead" @click="handleClick">
			<img class="all" src="/static/muhaha/ben.png" alt=""  v-show="showImg"/>
			<img class="all" src="/static/muhaha/Noben.png" alt="" v-show="!showImg"/>
			<p class="content1">本人已确认上述信息真实、准确和完整，且
			当这些信息发生变更时，将在30日内通知贵
			机构，否则本人承担由此造成的不利后果。</p>
		</div>
		<div class="btn" @click="nextClick">
			<!--<img src="/static/btn.png" alt="" />-->
			<p >下一步</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default{
		data(){
			return{	
				showImg:true,
				shouj:true
			}
		},
		methods:{
			nextClick() {
				if(this.showImg == false){
					Toast('请您确认信息真实准确和完整')
				}else{
					this.$router.push('/trialCalculation');
				}
				
			},
			handleClick(){
				if(this.showImg){
					this.showImg = false
				}else{
					this.showImg = true
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
		color: #333333;
		padding-left: 0;
	}
	.inputWidth {
		width: 4.4rem;
	}
	.qtb{
		margin-left:0.1rem ;
	}
	.left{
		float: left;
	}
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	.twoCon {
		/*margin-top: 0.4rem;*/
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
		overflow: scroll;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.twoCon1 {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
		overflow: scroll;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.twoCon::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.title_twoCon1{
		height: 1.11rem;
		line-height: 1.11rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.titleLable_twoCon {
		display: inline-block;
		font-size: 0.35rem;
		font-weight: bold;
		color: #222222;
	}
	.selected{
		width:0.64rem;
		height:0.64rem;
	}
	.word{
		font-size:0.28rem;
		color: #555555;
		letter-spacing: 0;
		line-height:0.44;
	}
	.conText{
		width:6.44rem;
		height:3.2rem;
		margin: 0 auto;
		margin-top: 0.4rem;
	}
	.notes{
		font-size: 0.28rem;
		line-height: 0.4rem;
		color: #C9141E;
	}
	.content{
		font-size: 0.28rem;
		line-height: 0.4rem;	
		color: #101010;
	}
	.mustRead{
		overflow: hidden;
		width:6.44rem;
		height:1.52rem;
		margin: 0 auto;
		margin-top: 0.4rem;
		background: #FFFFFF;
		border-radius: 0.16rem;
		margin-bottom: 0.64rem;
	}
	.all{
		float: left;
		padding-bottom: 0.2rem;
		width:0.64rem;
		height:0.64rem;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		margin-right: 0.1rem;
	}
	.content1{
		margin-top: 0.18rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
		color: #222222;
	}
	.btn{
		width:6.04rem;
		height: 1rem;
		margin-left: 0.72rem;
		margin-bottom: 0.84rem;
		border: 0.01rem solid #C9141E;
		border-radius:0.7rem;
	}
	.btn p{
		text-align: center;
		font-size: 0.32rem;
		color: #C9141E;
		margin-top: 0.4rem;
	}
</style>