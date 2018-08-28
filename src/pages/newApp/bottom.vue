<template>
	<div class="box">
		<div class="content">
	      	<router-view></router-view>
	    </div>
		<div class="footer" ref="styles">
			<div class="footerDiv">
				<router-link :to="{name: 'home'}" tag="div">
					<img class="tag_img" src="/static/imgNew/icon_home_default3.png">
				    <img class="tag_img tag_img1" :class="{roundZ1:homeShow,roundZ:!homeShow}" src="/static/imgNew/icon_home_focus3.png">	
				    <span class="spanText" :class="{spanTextSelected:homeShow}">趣投保</span>
			    </router-link>
			</div>
			<div class="footerDiv">
				<router-link :to="{name: 'product'}" tag="div">
					<img class="tag_img" src="/static/imgNew/icon_product_default3.png">
				    <img class="tag_img tag_img1" :class="{line1:productShow,line2:!productShow}" src="/static/imgNew/icon_product_focus3.png">	
				    <span class="spanText" :class="{spanTextSelected:productShow}">产品</span>
			    </router-link>
			</div>
			<div class="footerDiv">
				<router-link :to="{name: 'descover'}" tag="div">
					<img class="tag_img" src="/static/imgNew/icon_descover_unfocus3.png">
				    <img class="tag_img tag_img1" :class="{disblock:descoverShow,disnone:!descoverShow}" src="/static/imgNew/icon_descover_focus3.png">	
				    <span class="spanText" :class="{spanTextSelected:descoverShow}">发现</span>
			    </router-link>
			</div>
			<div class="footerDiv" @click="toMine">
				<router-link :to="{name: minePath}" tag="div">
					<img class="tag_img" src="/static/imgNew/Icon_my_default3.png">
					<img class="tag_img tag_img1" :class="{line3:mineShow,line4:!mineShow}" src="/static/imgNew/Icon_my_focus3.png">
				    <span class="spanText" :class="{spanTextSelected:mineShow}">我的</span>
			    </router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  	name: 'newIndex',
	  	data(){
	  		return {
	  			homeShow:true,
	  			productShow:false,
	  			descoverShow:false,
	  			mineShow:false,
	  			path:this.$route.path,
	  			pathMain:'',
	  			minePath:'',
	  			titleList:[],
	  			question: 0,
				size: 0,
	  		}
	  	},
    	created(){
    		this.size = document.documentElement.clientHeight;
    		this.pathMain = this.path.split('newIndex/')
			this.handleClickFirst(this.pathMain[this.pathMain.length-1])
			this.titleAjax()
    	},
    	updated(){
    		this.pathMain = this.path.split('newIndex/')
			this.handleClickFirst(this.pathMain[this.pathMain.length-1])
    	},
		mounted() {
			const that = this
			window.onresize = function temp() {
				that.question = document.documentElement.clientHeight;
				that.styleSet()
			}
		},
	  	methods:{
	  		handleClickFirst(index){
	  			if (index.indexOf("home") != -1) {
	  				this.homeShow = true;
	  				this.productShow = false;
	  				this.descoverShow = false;
	  				this.mineShow = false;
	  			}
	  			else if (index.indexOf("product") != -1) {
	  				this.productShow = true;
	  				this.homeShow = false;
	  				this.descoverShow = false;
	  				this.mineShow = false;
	  			}
	  			else if (index.indexOf("descover") != -1) {
	  				this.descoverShow = true;
	  				this.homeShow = false;
	  				this.productShow = false;
	  				this.mineShow = false;
	  			}
	  			else if (index.indexOf("mine") != -1) {
	  				this.mineShow = true;
	  				this.homeShow = false;
	  				this.descoverShow = false;
	  				this.productShow = false;
	  			}else{
	  				if(index.indexOf("newIndex") != -1){
	  					this.$router.push('/newIndex/home')
	  				}
	  			}
	  		},
	  		toMine () {
	  			if (this.$store.state.loginId == "0") {
					this.$router.push('/logNew')
				}else{
					this.minePath = 'mine'
					this.$router.push('/newIndex/mine')
				}
	  		},
	  		titleAjax(){
				var titleInfo = {
					"parTypeId": "0-1"
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/queryArticleType", titleInfo)
				.then(res => {
//					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.titleList = res.data.output.articleTypeRespList;
					}
				}, res => {
					console.log(res.data)
				})
			},
			styleSet() {
				if(parseInt(this.size) <= parseInt(this.question)) {
					this.$refs.styles.style.display = "block"
				} else {
					this.$refs.styles.style.display = "none"
				}
			},
	  	},
	  	watch:{
    		$route () {
    			this.path = this.$route.path
		    }
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
		z-index: 3;
		width: 6.8rem;
		padding: 0 0.35rem;
		height: 1.16rem;
		background: #fff;
	}
	.footerDiv{
		position: relative;
		width: 1.7rem;
		padding-top: .16rem;
		float: left;
		font-size: 0.2rem;
		color: #8A8A8F;
		text-align: center;
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