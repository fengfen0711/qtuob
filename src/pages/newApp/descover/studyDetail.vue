<template>
	<div class="disBox">
		<div class="studyDetail">
			<div class="clearFloat proContent" :class="art.atcStyle | layout" v-for="art in artList" :key="art.articleId" @click="godetail(art.articleId)">
				<img :src="art.picUrl" class="disImg" />
				<div class="disText">
					<p class="disTitle">{{art.title}}</p>
					<p class="disTitleDes">{{art.actDesc}}</p>
					<p class="disTitleDes">{{art.createTime}}<span class="sign">{{art.typeName}}</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'studyDetail',
		data() {
			return {
				detailId: this.$route.query.detailId,
				artList:[],
			}
		},
		created() {
			this.detailAjax(this.detailId)
		},
		methods: {
			detailAjax(id){
				var artInfo = {
					"typeId": id
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/selArticleList", artInfo)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.artList = res.data.output;
					}
				}, res => {
					console.log(res.data)
				})
			},
			godetail(id){
				console.log(id)
				this.$router.push('/artDetail?detailId='+id)
			},
		},
		filters:{
			layout : function (value){
				if(value == "U"){
					return value = 'imgUpTextDown' 
				}
				else if(value == "D"){
					return value = 'textUpImgDown' 
				}
				else if(value == "L"){
					return value = 'imgLeftTextRight' 
				}
				else if(value == "R"){
					return value = 'textLeftImgRight' 
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.disBox{
		position: absolute;
		background: #FFFFFF;
		width: 100%;
		min-height: 100%;
	}
	.studyDetail {
		padding-left: 0.32rem;
	}
	.proContent{
		position: relative;
		margin-top: 0.32rem;
		overflow: hidden;
	}
	.imgUpTextDown {
		height: 4.62rem;
	}
	.imgUpTextDown .disImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		display: block;
		width: 6.86rem;
		height: 3.2rem;
		margin: 0 auto;
	}
	.imgUpTextDown .disText{
		position: absolute;
		top: 3.32rem;
		left: 0;
		z-index: 1;
	}
	.textUpImgDown {
		height: 4.62rem;
	}
	.textUpImgDown .disImg {
		position: absolute;
		top: 1.4rem;
		left: 0;
		z-index: 1;
		display: block;
		width: 6.86rem;
		height: 3.2rem;
		margin: 0 auto;
	}
	.textUpImgDown .disText{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.imgUpTextDown .disTitle, .textUpImgDown .disTitle {
		width: 6.86rem;
		height: 0.48rem;
		line-height: 0.48rem;
		margin-top: 0.02rem;
		font-size: 0.32rem;
		font-weight: bold;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.imgUpTextDown .disTitleDes, .textUpImgDown .disTitleDes {
		width: 6.86rem;
		height: 0.4rem;
		line-height: 0.4rem;
		font-size: 0.24rem;
		color: #555555;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sign {
		margin-left: 0.2rem;
		color: #E73748;
	}
	.imgLeftTextRight {
		height: 2.14rem;
	}
	.imgLeftTextRight .disImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		display: block;
		width: 2.14rem;
		margin: 0 auto;
	}
	.imgLeftTextRight .disText{
		position: absolute;
		top: 0;
		left: 2.76rem;
		z-index: 1;
	}
	.textLeftImgRight {
		height: 2.14rem;
	}
	.textLeftImgRight .disImg {
		position: absolute;
		top: 0;
		left: 4.72rem;
		z-index: 1;
		display: block;
		width: 2.14rem;
		margin: 0 auto;
	}
	.textLeftImgRight .disText{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.imgLeftTextRight .disTitle, .textLeftImgRight .disTitle {
		width: 4.1rem;
		height: 0.8rem;
		line-height: 0.4rem;
		margin-top: 0.02rem;
		font-size: 0.32rem;
		margin-bottom: 0.16rem;
		font-weight: bold;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; 
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
	}
	.imgLeftTextRight .disTitleDes, .textLeftImgRight .disTitleDes {
		width: 4.1rem;
		/*height: 0.64rem;*/
		line-height: 0.32rem;
		margin-bottom: 0.22rem;
		font-size: 0.24rem;
		color: #555555;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; 
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
	}
</style>