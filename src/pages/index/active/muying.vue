<template>
	<div class="bg">
		<div class="banner">
			<img src="/static/banner_y.jpg"/>
		</div>
		<div class="tab">
			<div @click="handleClickTable(1)" class="item" style="box-sizing: border-box;" :class="{active:item1}">
				<p class="list">C款</p>
				<p class="tab_money">&yen;398元起</p>
			</div>
			<div @click="handleClickTable(2)" style="border-left:1px solid #ccc ;box-sizing: border-box;" class="item" :class="{active:item2}">
				<p class="list">D款</p>
				<p class="tab_money">&yen;788元起</p>
			</div>
			<div @click="handleClickTable(3)" style="border-left:1px solid #ccc ;box-sizing: border-box;" class="item" :class="{active:item3}">
				<p class="list">E款</p>
				<p class="tab_money">&yen;988元起</p>
			</div>
		</div>
		<div class="content">
			<p class="title">保险责任 <span class="lipei">新华保险承保并负责理赔</span></p>
			<p class="title title1">意外伤害保险 <span class="lipei lipei1">{{money1}}</span></p>
			<p class="title title1">被保险人意外伤害保险责任 <span class="lipei lipei1">{{money2}}</span></p>
			<p class="title title1">被保险人并发症及连带被保险人损伤保险责任 <span class="lipei lipei1">{{money3}}</span></p>
			
			<p class="title2">保额
				<span class="lipei lipei1">{{money1}}</span>
			</p>
		</div>
		<div class="bottom">
			<div class="img_wrap" @click="handleClickYes">
				<img v-if="show1" src="/static/y.png" />
				<img v-if="!show1" src="/static/n.png" />
			</div>
			<p class="agreemen"><span id="" class="" style="color:#4d4d4d;"></span>本人已充分了解本保险产品，并承诺投保信息的真实性。，理解并同意 <span style="color: #26A2FF;" @click="handleClickLict">《保险条款》</span></p>
		</div>
		<div class="footer">
			<span class="moneyto">{{money}}<span>元起</span></span>
			<span class="buy" @click="handleClickBuy">我要投保</span>
		</div>
		<div v-if="!pdfShow" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
	</div>
</template>

<script>
	import Pdf from '@/components/pdf.vue'
	import { Toast } from 'mint-ui';
	export default {
		name: "Login",
		data() {
			return {
				item1: true,
				item2: false,
				item3: false,
				show:false,
				pdfShow:true,
				show1:false,
				money:"398.00",
				money1:"15万",
				money2:"7千",
				money3:"5千",
				pdf:"http://h5.qtoubao.cn:8012/onlinePreview?url=http://outer.qtoubao.cn:9900/group1/M00/00/6A/rBUADVuIscaAKrTUAAK0ChueVxc795.pdf"
			}
		},
		methods:{
			handleClickYes() {
				if(this.show1) {
					this.show1 = false
				} else {
					this.show1 = true
				}
			},
			pdfClose(...data) {
				this.pdfShow = data[0]
			},
			handleClickTable(data){
				if(data==1){
					this.item1=true
					this.item2=false
					this.item3=false
					this.money="398.00"
					this.money1="15万"
					this.money2="7千"
					this.money3="5千"
				}
				if(data==2){
					this.item1=false
					this.item2=true
					this.item3=false
					this.money="788.00"
					this.money1="20万"
					this.money2="1万"
					this.money3="1万"
				}
				if(data==3){
					this.item1=false
					this.item2=false
					this.item3=true
					this.money="988.00"
					this.money1="25万"
					this.money2="2万"
					this.money3="1.5万"
				}
			},
			handleClickCla(){
				if(this.show){
					this.show=false
				}else{
					this.show=true
				}
			},
			handleClickLict(){
				this.pdfShow=false
			},
			handleClickBuy(){
				Toast('您好，平台正在报备中，暂时无法投保。')
			}
		},
		components:{
			Pdf:Pdf
		}
	}
</script>

<style scoped="scoped">
	.bg{
		width: 100%;
		height: 100%;
		position: absolute;
		background: #FAFAFA;
	}
	.banner{
		width: 100%;
	}
	.banner img{
		width: 100%;
		height: auto;		
	}
	.tab{
		width: 100%;
		background: #fff;
		overflow: hidden;
	}
	.item{
		width: 33.33%;
		height: 1.5rem;
		float: left;
		text-align: center;
	}
	.list{
		margin-top: .35rem;
	}
	.tab_money{
		margin-top: .2rem;
	}
	.active{
		border-bottom: .02rem solid #05beca;
	}
	.active .list{
		color: #05beca;
	}
	.content{
		width: 100%;
		background: #fff;
		margin-top: .3rem;
	}
	.title{
		height: .8rem;
		line-height: .8rem;
		color: #000000;
		font-weight: bold;
		font-size: .3rem;
		margin: 0 .3rem;
		border-bottom: 1px solid #ccc;
	}
	.lipei{
		height: .8rem;
		line-height: .8rem;
		float: right;
		font-size: .24rem;
		color: #818181;
	}
	.title1{
		font-weight: normal;
		font-size: .24rem;
	}
	.lipei1{
		color: #000;
	}
	.title2{
		height: .8rem;
		line-height: .8rem;
		color: #000000;
		font-size: .3rem;
		margin: 0 .3rem;
		border-bottom: 1px solid #ccc;
	}
	.cla{
		display: inline-block;
		width: 1.5rem;
		height: .5rem;
		line-height: .5rem;
		margin-top: .15rem;
		border: 1px solid #ccc;
    	float: right;
    	margin-left: .2rem;
    	text-align: center;
    	border-radius:.1rem ;
	}
	.claActive{
		color: #05beca;
    	border: 1px solid #05beca;
	}
	.footer{
		width: 100%;
		height: 1rem;
		background: #fff;
		position: fixed;
		bottom: 0;
	}
	.moneyto{
		display: inline-block;
		width: 3.75rem;
		text-align: center;
		line-height: 1rem;
		color: red;
		font-size: .4rem;
		background: rgba(0,0,0,.8);
    	color: #fff;
	}
	.buy{
		display: inline-block;
		width: 3.75rem;
		float: right;
		text-align: center;
		line-height: 1rem;
		font-size: .38rem;
		color: #fff;
		background: #05beca;
	}
	.bottom {
		position: relative;
		height: 2rem;
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
</style>