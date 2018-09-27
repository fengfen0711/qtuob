<template>
	<div class="one">
		<div class="threeBox">
			<p class="prodName">上海人寿览海智选两全保险</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">订单编号</label>
				<span class="inputText right">2839030843030</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">订单状态</label>
				<span class="inputText right">已支付</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">保单号</label>
				<span class="inputText right">2839030843030</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">保费金额</label>
				<span class="inputText right">700000元</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">承保时间</label>
				<span class="inputText right">2018-3-2</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">生效时间</label>
				<span class="inputText right">2019-6-20</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">结束时间</label>
				<span class="inputText right">2028-3-2</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">购买数量</label>
				<span class="inputText right">21</span>
			</p>
		</div>
		<p class="payTitle"></p>
		<div class="twoCon">
			<p class="title_twoCon clearFloat" :class="{borderNone:show1}">
				<label class="titleLable_twoCon left">投保人信息</label>
				<img src="/static/leftImg.png" class="btnImg right" v-show="show1" @click="showHide"/>
				<img src="/static/downImg.png" class="btnImg right" v-show="!show1" @click="showHide"/>
			</p>
			<div class="policyHolder" v-show="!show1">
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">姓名</label>
					<span class="inputText left">冯芬</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">证件类型</label>
					<span class="inputText left">身份证</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">证件号码</label>
					<span class="inputText left">142702198801013320</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">证件有效期</label>
					<span class="inputText left">2018-8-10</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">出生日期</label>
					<span class="inputText left">1998-5-15</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">手机号码</label>
					<span class="inputText left">13222222222</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">邮箱</label>
					<span class="inputText left">fengfen@163.com</span>
				</p>
				<div class="inputGrop">
					<label class="inputLabel left">联系地址</label>
					<p class="selectBox clearFloat">
						<span class="inputText left">山西省</span>
						<span class="inputText left">运城市</span>
						<span class="inputText left">永济市</span>
					</p>
				</div>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">详细地址</label>
					<span class="inputText left">城北街道东信村二组</span>
				</p>
			</div>
		</div>
		<div class="twoCon twoCon1">
			<p class="title_twoCon clearFloat" :class="{borderNone:show2}">
				<label class="titleLable_twoCon left">被保险人信息</label>
				<img src="/static/leftImg.png" class="btnImg right" v-show="show2" @click="showHide1"/>
				<img src="/static/downImg.png" class="btnImg right" v-show="!show2" @click="showHide1"/>
			</p>
			<div class="recognizee" v-show="!show2">
				<p class="inputGrop clearFloat" :class="{borderNone:!recognizeeChild}">
					<label class="inputLabel left">与投保人关系</label>
					<span class="inputText left">{{nexus}}</span>
				</p>
				<div class="recognizeeChild" v-show="recognizeeChild">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">姓名</label>
						<span class="inputText left">冯芬</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件类型</label>
						<span class="inputText left">身份证</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件号码</label>
						<span class="inputText left">142702198801013320</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件有效期</label>
						<span class="inputText left">2018-8-10</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">出生日期</label>
						<span class="inputText left">1998-5-15</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">手机号码</label>
						<span class="inputText left">13222222222</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">身高（cm）</label>
						<span class="inputText left">167</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">体重（kg）</label>
						<span class="inputText left">52</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业大类</label>
						<span class="inputText left">职业大类</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业中类</label>
						<span class="inputText left">职业中类</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业小类</label>
						<span class="inputText left">职业小类</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">推荐人编码</label>
						<span class="inputText left">10000001</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
    	name: "OrderInfo",
    	data () {
      		return {
      			show1:false,
      			show2:false,
      			nexus:'本人',
      			recognizeeChildShow:true,
      			minPrice:'1000',
      			recognizeeChild:false
      		}
    	},
    	created(){
    		if (this.nexus == '本人') {
    			this.recognizeeChild = false
    		}else{
    			this.recognizeeChild = true
    		}
    	},
    	methods:{
    		showHide(){
    			this.show1 = !this.show1
    		},
    		showHide1(){
    			this.show2 = !this.show2
    		},
    		handleClickGoPay(){
    			if (this.a == true) {
    				this.$router.push('/paySucess')
    			}else{
    				this.$router.push('/payFail')
    			}
    			
    		},
    		handleClickPopup(){
    			this.$router.push('/payInfo')
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
	input, button {
		background: none;
		border: none;
	}
	input, button {
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
	textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
		color: #B2B2B2;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.one{		
		position: absolute;
		width: 100%;
		min-height: 100%;
		padding-bottom: 1rem;
		background: #F3F3F3;
	}
	.twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	.title_twoCon {
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
	.btnImg {
		display: inline-block;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.275rem;
	}
	.btnBox {
		padding: 0 0.48rem;
		padding-bottom: 2.4rem;
		text-align: center;
	}
	.btn {
		display: inline-block;
		width: 6.04rem;
		height: 1rem;
		line-height: 1rem;
		border: 0.01rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255,255,255,0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
	}
	.inputGrop1 {
		height: 0.8rem;
		font-size: 0.28rem;
	}
	.inputGrop {
		height: 0.8rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputLabel {
		display: inline-block;
		width: 2.52rem;
		line-height: 0.8rem;
		font-weight: bold;
		color: #555555;
	}
	.inputText {
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.28rem;
		color: #333333;
	}
	.selected {
		color: #EB7760;
	}
	select{
		border: none;
		background: none;
		outline: none;
	}
	.selImg {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		margin-right: 0.26rem;
	}
	.inputText1 {
		display: inline-block;
		height: 0.88rem;
		margin-right: 0.2rem;
		font-size: 0.28rem;
		color: #333333;
	}
	.sBox {
		padding: 0 0.4rem;
		margin-top: 0.34rem;
		margin-bottom: 0.88rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
	}
	.sImg {
		display: block;
		width: 0.48rem;
		height: 0.48rem;
	}
	.sDes {
		margin-left: 0.16rem;
	}
	.sSpan {
		color: #6BD1CF;
	}
	.prodName {
		height: 0.44rem;
		padding-top: 0.32rem;
		margin-bottom: 0.16rem;
		line-height: 0.44rem;
		font-size: 0.34rem;
		color: #222222;
		font-weight: bold;
	}
	.threeBox {
		padding: 0 0.4rem;
		background: #FFFFFF;
	}
	.iconBox {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 1.06rem;
		line-height: 1.06rem;
		border-top: solid 0.01rem #C8C7CC;
		background: #FFFFFF;
	}
	.figure {
		flex: 1;
		font-size: 0.36rem;
		color: #222222;		
		text-align: center;
	}
	.figure2 {
		font-size: 0.36rem;
		color: #FFFFFF;
		background: #E7A128;
	}
	.price {
		color: #EB6069;
	}
	.twoCon .inputGrop:last-child {
		border: none;
	}
	.borderNone {
		border: none;
	}
</style>