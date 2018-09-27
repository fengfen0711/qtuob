<template>
	<div class="bg">
		<div class="top">
			<img class="banner" src="/static/banner_active.png"/>
			<p>交通意外额外赔付最高250万保额</p>
			<p>意外医疗 意外住院津贴 全面覆盖</p>
		</div>
		<div class="tab">
			<div class="list">
				<div ref="item1" class="item item1" :class="{active:item1}" @click="handleClickTable(1)">
					<p class="money"><span>235</span>&yen;起</p>
					<p class="des">至尊计划</p>
				</div>
				<div ref="item2" class="item item2" :class="{active:item2}" @click="handleClickTable(2)">
					<p class="money"><span>145</span>&yen;起</p>
					<p class="des">豪华计划</p>
				</div>
				<div ref="item3" class="item item3" :class="{active:item3}" @click="handleClickTable(3)">
					<p class="money"><span>30</span>&yen;起</p>
					<p class="des">超值计划</p>
				</div>
			</div>
			<div class="content">
				<p>意外身故、伤残<span>{{money1}}万元</span></p>
				<p>意外医疗<span>{{money2}}元</span></p>
				<p>意外住院津贴<span>{{money3}}</span></p>
				<p>航空意外伤害<span>{{money4}}万元</span></p>
				<p>火车意外伤害<span>{{money5}}万元</span></p>
				<p class="detail" @click="handleClickDetail">查看保障详情</p>
				<p class="date">保障期限<span>1年</span></p>
				<p class="date">生效日期<span>{{date}}</span></p>
			</div>
		</div>
		<p class="per">保险受益人为法定受益人</p>
		<div class="intr1">
			<p class="intr" code="close" @click="handleClickOpen">理赔流程<img class="open" src="/static/img/open.png" /></p>
			<div class="article" v-if="show">
				1.报案：请在出险后拨打新华人寿客服热线95567或大特保报案电话400-606-7171。</br>
				2.申请：提交理赔资料申请理赔。</br>
				3.审核：保险公司进行审核。</br>
				4.结案：结案理赔款项支付。
			</div>
		</div>
		<p class="intr" style="border: none;">产品介绍</p>
		<img src="/static/active1.jpg"/>
		<img src="/static/active2.jpg"/>
		<img src="/static/active3.jpg"/>
		<img src="/static/active4.jpg"/>
		<img src="/static/active5.jpg"/>
		<div class="bottom">
			<div class="img_wrap" @click="handleClickYes">
				<img v-if="show1" src="/static/y.png" />
				<img v-if="!show1" src="/static/n.png" />
			</div>
			<p class="agreemen"><span id="" class="" style="color:#4d4d4d;"></span>本人已充分了解本保险产品，并承诺投保信息的真实性。<!--，理解并同意 <span style="color: #26A2FF;">《投保须知》</span>、<span style="color: #26A2FF;" @click="handleClickLict">《保险条款》</span>--></p>
		</div>
		<div class="footer">
			<span class="moneyto">{{money}}<span>元</span></span>
			<span class="buy" @click="handleClickBuy">我要投保</span>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: "Login",
		data() {
			return {
				item1: true,
				item2: false,
				item3: false,
				money1:"50",
				money2:"5万",
				money3:"18000",
				money4:"200",
				money5:"50",
				date:"",
				show:false,
				money:"235.00",
				show1:false
			}
		},
		created() {
			this.date=this.getNowFormatDate()
		},
		methods:{
			handleClickTable(data){
				if(data==1){
					this.item1=true
					this.item2=false
					this.item3=false
					this.money1="50"
					this.money2="5万"
					this.money3="18000"
					this.money4="200"
					this.money5="50"
					this.$refs.item1.style.background="#fff"
					this.$refs.item2.style.background="#ffd801"
					this.$refs.item3.style.background="#7dabff"
					this.money="235.00"
				}
				if(data==2){
					this.item1=false
					this.item2=true
					this.item3=false
					this.money1="30"
					this.money2="3万"
					this.money3="9000"
					this.money4="100"
					this.money5="30"
					this.$refs.item1.style.background="#ffd801"
					this.$refs.item2.style.background="#fff"
					this.$refs.item3.style.background="#7dabff"
					this.money="145.00"
				}
				if(data==3){
					this.item1=false
					this.item2=false
					this.item3=true
					this.money1="6"
					this.money2="5000"
					this.money3="-"
					this.money4="50"
					this.money5="10"
					this.$refs.item1.style.background="#ffd801"
					this.$refs.item2.style.background="#7dabff"
					this.$refs.item3.style.background="#fff"
					this.money="30.00"
				}
			},
			getNowFormatDate() {
		        var date = new Date();
		        var seperator1 = "-";
		        var year = date.getFullYear();
		        var month = date.getMonth() + 1;
		        var strDate = date.getDate();
		        if (month >= 1 && month <= 9) {
		            month = "0" + month;
		        }
		        if (strDate >= 0 && strDate <= 9) {
		            strDate = "0" + strDate;
		        }
		        var currentdate = year + seperator1 + month + seperator1 + strDate;
		        return currentdate;
		   },
		   handleClickOpen(e) {
				if(e.currentTarget.getAttribute('code') == "close") {
					this.show=true
					e.currentTarget.getElementsByClassName('open')[0].style.transform = "rotate(90deg)"
					e.currentTarget.setAttribute('code', "1")
				} else {
					this.show=false
					e.currentTarget.getElementsByClassName('open')[0].style.transform = "rotate(0deg)"
					e.currentTarget.setAttribute('code', "close")
				}
			},
			handleClickBuy(){
				Toast('您好，平台正在报备中，暂时无法投保。')
			},
			handleClickDetail(){
				this.$router.push('/active_detail')
			},
			handleClickYes() {
				if(this.show1) {
					this.show1 = false
				} else {
					this.show1 = true
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.bg{
		width: 100%;
		height: 100%;
		position: relative;
		background: #FAFAFA;
		padding-bottom: 1rem;
	}
	.top{
		width: 100%;
		/*height: 4rem;*/
		background: #fff;
		padding-bottom: .2rem;
	}
	.banner{
		width: 100%;
		height: 3rem;
	}
	.top p{
		margin-left: .3rem;
		line-height: .6rem;
	}
	.tab{
		margin-top: .3rem;
		width: 100%;
	}
	.list{
		width: 7rem;
		margin: 0 auto;
		overflow: hidden;
	}
	.item{
		float: left;
		width: 2.2rem;
		height: 1.2rem;
		background: red;
		margin-left: .1rem;
		color: #fff;
		border-radius:.06rem ;
	}
	.item1{
		margin-left: 0;
		
	}
	.item2{
		background: #ffd801;
	}
	.item3{
		background:#7dabff;
	}
	
	.money{
		text-align: center;
		font-size: .22rem;
		margin-top:.24rem ;
	}
	.money span{
		font-size: .4rem;
	}
	.des{
		text-align: center;
		font-size: .22rem;
		color: #1e5da7;
	}
	.active{
		border-top:.01rem solid #1e5da7;
		background: #fff;
		color: #1E5DA7;
	}
	.active .des{
		color: #757575;
	}
	.content{
		width: 100%;
		background: #fff;
	}
	.content p{
		height: .8rem;
		line-height: .8rem;
		margin-left: .3rem;
	}
	.content p span{
		float: right;
		height: .8rem;
		line-height: .8rem;
		margin-right: .3rem;
	}
	.detail{
		color: #7dabff;
	}
	.content .date{
		height: 1rem;
		line-height: 1rem;
		font-size: .28rem;
		border-top:.001rem solid #ccc ;
		color: #080808;
		margin-left: 0;
		padding-left: .3rem;
	}
	.content .date span{
		height: 1rem;
		line-height: 1rem;
		font-size: .24rem;
	}
	.per{
		margin-left:.3rem ;
		height: .8rem;
		line-height: .8rem;
		font-size: .22rem;
	}
	.intr{
		height: 1rem;
		line-height: 1rem;
		background: #fff;
		padding-left: .3rem;
		color: #080808;
		font-size: .28rem;
		border-bottom: .001rem solid #ccc;
		position: relative;
	}
	.open {
		width: .52rem;
		height: .52rem;
		position: absolute;
		right: .18rem;
		top: .24rem;
	}
	img{
		width: 7.5rem;
		height: auto;
	}
	.article{
		text-align: left;
		padding-left: .3rem;
		font-size: .26rem;
		color: #080808;
		line-height: .4rem;
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
	}
	.moneyto span{
		color: #080808;
		font-size: .28rem;
	}
	.buy{
		display: inline-block;
		width: 3.75rem;
		float: right;
		text-align: center;
		line-height: 1rem;
		font-size: .38rem;
		color: #fff;
		background: #0A81E5
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
	}
</style>