<template>
	<div class="box">
		<Home :homeShow="homeShow"></Home>
		<Product :productShow="productShow"></Product>
		<Descover :descoverShow="descoverShow"></Descover>
		<Mine :mineShow="mineShow"></Mine>
		<div class="footer">
			<div class="footerDiv" @click="handleClickFirst(1)">
				<img class="tag_img" src="/static/imgNew/icon_home_default3.png">
			    <img class="tag_img tag_img1" :class="{roundZ1:homeShow,roundZ:!homeShow}" src="/static/imgNew/icon_home_focus3.png">	
			    <span class="spanText" :class="{spanTextSelected:homeShow}">趣投保</span>
			</div>
			<div class="footerDiv" @click="handleClickFirst(2)">
				<img class="tag_img" src="/static/imgNew/icon_product_default3.png">
			    <img class="tag_img tag_img1" :class="{line1:productShow,line2:!productShow}" src="/static/imgNew/icon_product_focus3.png">	
			    <span class="spanText" :class="{spanTextSelected:productShow}">产品</span>
			</div>
			<div class="footerDiv" @click="handleClickFirst(3)">
				<img class="tag_img" src="/static/imgNew/icon_descover_unfocus3.png">
			    <img class="tag_img tag_img1" :class="{disblock:descoverShow,disnone:!descoverShow}" src="/static/imgNew/icon_descover_focus3.png">	
			    <span class="spanText" :class="{spanTextSelected:descoverShow}">发现</span>
			</div>
			<div class="footerDiv" @click="handleClickFirst(4)">
				<img class="tag_img" src="/static/imgNew/Icon_my_default3.png">
				<img class="tag_img tag_img1" :class="{line3:mineShow,line4:!mineShow}" src="/static/imgNew/Icon_my_focus3.png">
			    <span class="spanText" :class="{spanTextSelected:mineShow}">我的</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Home from "./index.vue"
	import Product from "./product.vue"
	import Descover from "./descover.vue"
	import Mine from "./mine.vue"
	export default {
	  	name: 'newIndex',
	  	data(){
	  		return {
	  			homeShow:true,
	  			productShow:false,
	  			descoverShow:false,
	  			mineShow:false,
	  			index:this.$route.query.index
	  		}
	  	},
	  	components:{
    		Home : Home,
    		Product : Product,
    		Descover : Descover,
    		Mine : Mine
    	},
    	created(){
//  		console.log(this.index)
    		if (this.index == "") {
    			this.index = 1
    		}
			this.handleClickFirst(this.index)
    	},
	  	methods:{
	  		handleClickFirst(index){
	  			if (index == 1) {
	  				this.$router.push('/newIndex?index=1')
	  				this.homeShow = true;
	  				this.productShow = false;
	  				this.descoverShow = false;
	  				this.mineShow = false;
	  			}
	  			else if (index == 2) {
	  				this.$router.push('/newIndex?index=2')
	  				this.productShow = true;
	  				this.homeShow = false;
	  				this.descoverShow = false;
	  				this.mineShow = false;
	  			}
	  			else if (index == 3) {
	  				this.$router.push('/newIndex?index=3')
	  				this.descoverShow = true;
	  				this.homeShow = false;
	  				this.productShow = false;
	  				this.mineShow = false;
	  			}
	  			else if (index == 4) {
	  				this.$router.push('/newIndex?index=4')
	  				this.mineShow = true;
	  				this.homeShow = false;
	  				this.descoverShow = false;
	  				this.productShow = false;
	  			}
	  		},
	  	}
	  }
</script>

<style scoped="scoped">
	.box {
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
	.footer{
		position: fixed;
		bottom: 0;
		width: 6.8rem;
		padding: 0 0.35rem;
		height: 1.16rem;
		background: #fff;
	}
	.footer div{
		width: 1.7rem;
		padding-top: .16rem;
		float: left;
		font-size: 0.2rem;
		color: #8A8A8F;
		text-align: center;
	}
	.footerDiv {
		position: relative;
	}
	.tag_img{
		width: .48rem;
		height: .48rem;
		display: block;
		margin: 0 auto;
		margin-bottom: .06rem;
	}
	.tag_img1{
		position: absolute;
		top: 0.16rem;
		left: 0.61rem;
		z-index: 3;
	}
	.spanText {
		display: inline-block;
		height: 0.2rem;
		line-height: 0.2rem;
	}
	.spanTextSelected {
		color: #E73748;
	}
	.roundZ {
		z-index: 1;
		-webkit-animation: roundZ 0.6s 1 ease-in-out;
		animation: roundZ 0.6s 1 ease-in-out;
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	@-webkit-keyframes roundZ {
		0% {
			transform: rotateY(90deg);
			-webkit-transform: rotateY(90deg);
			opacity: 1;
			display: block;
		}
		100% {
			transform: rotateY(0deg);
			-webkit-transform: rotateY(0deg);
			opacity: 0;
			display: none;
		}
	}
	@keyframes roundZ {
		0% {
			transform: rotateY(90deg);
			-webkit-transform: rotateY(90deg);
			opacity: 1;
			display: block;
		}
		100% {
			transform: rotateY(0deg);
			-webkit-transform: rotateY(0deg);
			opacity: 0;
			display: none;
		}
	}
	.roundZ1 {
		z-index: 2;
		-webkit-animation: roundZ1 0.6s 1 ease-in-out;
		animation: roundZ1 0.6s 1 ease-in-out;
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	@-webkit-keyframes roundZ1 {
		0% {
			transform: rotateY(-90deg);
			-webkit-transform: rotateY(-90deg);
			opacity: 0;
			display: none;
		}
		100% {
			transform: rotateY(0deg);
			-webkit-transform: rotateY(0deg);
			opacity: 1;
			display: block;
		}
	}
	@keyframes roundZ1 {
		0% {
			transform: rotateY(-90deg);
			-webkit-transform: rotateY(-90deg);
			opacity: 0;
			display: none;
		}
		100% {
			transform: rotateY(0deg);
			-webkit-transform: rotateY(0deg);
			opacity: 1;
			display: block;
		}
	}
	
	.line1 {
		z-index: 2;
		-webkit-animation: line1 0.3s 1 ease-in-out;
		animation: line1 0.3s 1 ease-in-out;
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	@-webkit-keyframes line1 {
		0% {
			transform: translate(0, -8px);
			-webkit-transform: translate(0, -8px);
			opacity: 0;
			display: none;
		}
		100% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			opacity: 1;
			display: block;
		}
	}
	@keyframes line1 {
		0% {
			transform: translate(0, -8px);
			-webkit-transform: translate(0, -8px);
			opacity: 0;
			display: none;
		}
		100% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			opacity: 1;
			display: block;
		}
	}
	.line2 {
		z-index: 2;
		-webkit-animation: line2 0.3s 1 ease-in-out;
		animation: line2 0.3s 1 ease-in-out;
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	@-webkit-keyframes line2 {
		0% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			opacity: 1;
			display: block;
		}
		100% {
			transform: translate(0, -8px);
			-webkit-transform: translate(0, -8px);
			opacity: 0;
			display: none;
		}
	}
	@keyframes line2 {
		0% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			opacity: 1;
			display: block;
		}
		100% {
			transform: translate(0, -8px);
			-webkit-transform: translate(0, -8px);
			opacity: 0;
			display: none;
		}
	}
	.disblock{
		display: block;
	}
	.disnone {
		display: none;
	}
	.line3 {
		z-index: 2;
		-webkit-animation: line3 0.3s 1 ease-in-out;
		animation: line3 0.3s 1 ease-in-out;
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	@-webkit-keyframes line3 {
		0% {
			transform: translate(8px, 0);
			-webkit-transform: translate(8px, 0);
			opacity: 0;
			display: none;
		}
		100% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			opacity: 1;
			display: block;
		}
	}
	@keyframes line3 {
		0% {
			transform: translate(8px, 0);
			-webkit-transform: translate(8px, 0);
			opacity: 0;
			display: none;
		}
		100% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			opacity: 1;
			display: block;
		}
	}
	.line4 {
		z-index: 2;
		-webkit-animation: line4 0.3s 1 ease-in-out;
		animation: line4 0.3s 1 ease-in-out;
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	@-webkit-keyframes line4 {
		0% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			opacity: 1;
			display: block;
		}
		100% {
			transform: translate(8px, 0);
			-webkit-transform: translate(8px, 0);
			opacity: 0;
			display: none;
		}
	}
	@keyframes line4 {
		0% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			opacity: 1;
			display: block;
		}
		100% {
			transform: translate(8px, 0);
			-webkit-transform: translate(8px, 0);
			opacity: 0;
			display: none;
		}
	}
</style>