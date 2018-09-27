<template>
	<div class="bg">
		<header>
			<img class="img_bai" src="/static/active_bai.png" />
		
			<p class="title_by">全民e保·百万医疗险</p>
			<p class="tips">一站式报销医疗费用，最高600万</p>
		
		<img class="bai_img_logo" src="/static/logo.png" />
		</header>
		<div class="bai_p">
			<div class="why_tips">
				<p class="title">为什么要买全民e保.百万医疗险?</p>
				<p class="sub_title">据统计，重大疾病患病概率高达72.18%</p>
				<p class="sub_title">一站报销医疗费用，报销比例100%</p>
				<p class="sub_title">防止因看病带来的经济负担</p>
			</div>
			<div class="ensur_content">
				<div class="ensur_label">保障内容</div>
				<div class="ensur-item">
					<div class="ensur-item-leable">一般医疗保险金(不限病种)</div>
					<div class="ensur-item-value">300万</div>

				</div>
				<div class="ensur-item">
					<div class="ensur-item-leable">恶性肿瘤医疗保险金</div>
					<div class="ensur-item-value">300万</div>

				</div>
				<div class="ensur-item" @click="interrogation" v-if="isShow">
					<div class="ensur-item-leable">视频问诊</div>
					<div class="ensur-item-value">
						<img class="cell-right-icon" src="/static/cell-right-icon.png" />
					</div>
				</div>
				<div v-if="!isShow" @click="interrogation1" >
					<div class="ensur-item" >
						<div class="ensur-item-leable">视频问诊</div>
						<div class="ensur-item-value">
							<img class="cell-right-icon"  src="/static/cell-top-icon.png" />
						</div>
					</div>
					<div class="bai_padding">
					<div class="item-context" >
						<p>
							<span class="title1">
								24小时不限次视频咨询服务一年： 
					    	</span>
						</p>
					    <p>
					    	(1) 7x24小时全职全科医生团队， 成人/儿科全覆盖。
					    </p>
					    <p>
					    	(2) 一人投保，全家可享问诊服务。
					    </p>
					    <p>
					    	(3) 一键接入，一分钟内响应。
					    </p>
					</div>
					</div>
				
				</div>
				<div class="ensur-item" @click="medicalservice" v-if="ishidden">
					<div class="ensur-item-leable">专属就医服务</div>
					<div class="ensur-item-value">
						<img class="cell-right-icon" src="/static/cell-right-icon.png" />
					</div>
				</div>
				<div v-if="!ishidden" @click="medicalservice1" >
					<div class="ensur-item" >
						<div class="ensur-item-leable">视频问诊</div>
						<div class="ensur-item-value">
							<img class="cell-right-icon"  src="/static/cell-top-icon.png" />
						</div>
					</div>
					<div class="bai_padding">
					<div class="item-context" >
						<p>
							<span class="title1">
								代约专家：
					    	</span>
						</p>
					    <p>
					    	初步诊断罹患恶性肿瘤，可享受专家门诊、专家手术、专家病房服务。
					    </p>
					   
					    
					</div>
					<div class="item-context" >
						
					    <p>
							<span class="title1">
								住院押金垫付：
					    	</span>
						</p>
					    <p>
					    	覆盖36个城市范围内的二级或二级以上公立医院，确诊恶性肿瘤即可申请。
					    </p>
					    
					</div>
					</div>
				
				</div>
			</div>
			<div class="bottom">
			<div class="img_wrap" @click="handleClickYes">
				<img v-if="show" src="/static/y.png" />
				<img v-if="!show" src="/static/n.png" />
			</div>
			<p class="agreemen"><span id="" class="" style="color:#4d4d4d;"></span>本人已充分了解本保险产品，并承诺投保信息的真实性。理解并同意</br>
				<span style="color: #26A2FF;" @click="handleClickLict(1)">《泰医保百万医疗条款》</span></p>
		</div>
		
		<div class="btn">
			<span class="money">￥1.00元/月起
				<!--<label style="border: 1px solid red; top:0.2rem">￥1.00元/月起</label> <br />
				<label style="border: 1px solid red;">原价11.00元/月起</label>-->
			</span>
			<span @click="handleClickBuy" class="buy">立即投保</span>
		</div>
		<div v-if="!pdfShow" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
		</div>
	</div>
	</div>

</template>

<script>
	import Pdf from '@/components/pdf.vue'
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				isShow: true,
				ishidden:true,
				show:false,
				pdf:"",
				pdfShow:true
			}
		},
		methods: {
			pdfClose(...data) {
				this.pdfShow = data[0]
			},
			interrogation() {
				this.isShow = false;
			},
			interrogation1() {
				this.isShow = true;
			},
			medicalservice(){
				this.ishidden=false;
			},
			medicalservice1(){
				this.ishidden=true;
			},
			handleClickYes(){
				if(this.show) {
					this.show = false
				} else {
					this.show = true
				}
			},
			handleClickLict(a){
				this.pdfShow=false
				if(a==1){
					this.pdf="http://h5.qtoubao.cn:8012/onlinePreview?url=http://outer.qtoubao.cn:9900/group1/M00/00/83/rBUADVuYkIOAcxl1AAXpxpwwt6I762.pdf"
				}
				if(a==2){
					this.pdf="http://h5.qtoubao.cn:8012/onlinePreview?url=http://outer.qtoubao.cn:9900/group1/M00/00/83/rBUADVuYj_OAcWsYAAYdfzZqmA0084.pdf"
				}	
			},
			handleClickBuy() {
				Toast('您好，平台正在报备中，暂时无法投保。')
			},
		},
		components:{
			Pdf:Pdf
		},

	}
</script>

<style scoped="scoped">

	.bg {
		width: 100%;
		height: 100%;
		background: #f8f8f8;
		position: relative;
		padding-bottom: .3rem;
		
	}
	header{
	position: relative;
	padding: 1rem 0 0 0;
    top: -.1rem;
    background-image: linear-gradient(#fff,#dff4ff);
	}
	.tips{
		position: absolute;
	    line-height: 100%;
	    left: .3rem;
	    color: #333;
		top: 1rem;
   		font-size: .28rem;
	}
	.img_bai {
		width: 100%;
		height: 3.76rem;
	}
	.div_bai_title{
		 position: absolute;
	    left: .25rem;
	   
	}
	.title_by{
			position: absolute;
		    line-height: 100%;
		    left: .3rem;
		    color: #333;
		    font-size: .4rem;
		    font-weight: 700;
		    top: .405rem;
	}
	.bai_img_logo{
	    position: absolute;
	    right: .35rem;
	    top: .415rem;
	    width: 1.04rem;
	    height: .36rem;
    /*background-repeat: no-repeat;
    background-size: contain;*/
	}

	.bai_p {
		
		position: relative;
		padding: 0 0.26rem;
		top: -1.1rem
	}
	
	.why_tips {
		padding: 0.24rem 0.4rem 0.26rem;
		background-color: #FFFFFF;
		border-radius: 0.25rem;
		box-shadow: 0 5px 17px hsla(0, 4%, 72%, .06);
	}
	
	.title {
		font-size: .32rem;
		color: #333;
		line-height: 100%;
		margin-bottom: .12rem;
	}
	
	.sub_title {
		padding-left: .52rem;
		margin-bottom: .09rem;
		font-size: .28rem;
		line-height: .4rem;
		color: #666;
		background-image: url(/static/checkout.png);
		background-repeat: no-repeat;
		background-size: .3rem .3rem;
		background-position: 0;
	}
	
	.ensur_content {
		background-color: #FFFFFF;
		/*margin: -.74rem .3rem 0;*/
		box-shadow: 0 10px 34px hsla(0, 4%, 72%, .06);
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		margin-top: 0.2rem;
	}
	
	.ensur_label {
		font-size: .32rem;
		line-height: .8rem;
		text-align: center;
		color: #333;
	}
	
	.ensur-item {
		position: relative;
		display: -webkit-box;
		padding: 0 .3rem;
		line-height: .9rem;
		color: #333;
		font-size: .3rem;
		border-top: 1px solid #F3F3F3;
	}
	
	.ensur-item-value {
		-webkit-box-flex: 1;
		text-align: right;
	}
	
	.weui-cell {
		position: relative;
		display: -ms-flexbox;
		-webkit-box-align: center;
		align-items: center;
		border-top: 1px solid #F3F3F3;
		display: inline-block;
	}
	
	.content-cell-item {
		padding: .32rem .3rem;
	}
	
	.vux-cell-primary {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	
	.vux-label {
		display: block;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.cell-right-icon {
		width: .39rem;
		height: .24rem;
		-webkit-box-flex: 1;
		text-align: right;
	}
	
	.item-context {
		display: block;
		background-color: #f8f8f8;
		border-radius: .1rem;
		padding: .1rem .3rem;
	}
	.bai_padding{
		padding: 0.2rem 0.3rem;
	}
	.item-context p {
		    padding: .02rem 0;
   			color: #999;
   			line-height: 0.4rem;
   			display: block;
		    -webkit-margin-before: 0.5em;
		    -webkit-margin-after: 0.5em;
		    -webkit-margin-start: 0px;
		    -webkit-margin-end: 0px;
	}
	.title1{
		color: #666;
    	font-weight: 500;
	}
	.bottom {
		position: relative;
		height: 3rem;
	}
	.img_wrap {
		position: relative;
	}
	.img_wrap img {
		width: .32rem;
		height: .32rem;
		position: absolute;
		top: .3rem;
		left: .3rem;
	}
	
	.agreemen {
		position: absolute;
		top: .2rem;
		left: .7rem;
		line-height: .4rem;
	}
	.ctc_div_mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000;
		background: rgba(0, 0, 0, 0.40);
		z-index: 10;
	}
	.btn {
		position: fixed;
		bottom: 0;
		width: 7.5rem;
		left: 0;
	}
	.money {
		display: inline-block;
		width: 50%;
		text-align: center;
		height: 1.5rem;
		line-height: 1.5rem;
		background: #fff;
		color: #ee1446;
		font-size: .34rem;
	}
	.buy {
		display: inline-block;
		width: 50%;
		text-align: center;
		height: 1.5rem;
		line-height: 1.5rem;
		background: #4b8ffb;
		color: #fff;
		font-size: .34rem;
		float: right;
	}
</style>