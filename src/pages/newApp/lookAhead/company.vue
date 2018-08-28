<template>
	<div class="disBox">
		<div class="moduleBox clearFloat">
			<div class="module" v-for="com in companyList" :key="com.typeId" @click="toArtDetail(com.typeId,com.articleId)">
				<img :src="com.typePic" class="comImg" />
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'company',
		data() {
			return {
				id:this.$route.query.comId,
				companyList:[],
				serchList:'',
			}
		},
		created() {
			this.studyAjax(this.id)
			console.log(this.id)
		},
		methods: {
			studyAjax(id){
				var artInfo = {
					"parTypeId": id
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/queryArticleType", artInfo)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.companyList = res.data.output.articleTypeRespList;
					}
				}, res => {
					console.log(res.data)
				})
			},
			toArtDetail(id,articleId){
				console.log(articleId)
				if (articleId) {
					this.$router.push('/artDetail?detailId='+articleId)
				}else{
					this.$router.push('/rule?comId='+id)
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
	
	.disBox {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
	.moduleBox {
		padding-left: 0.21rem;
		padding-bottom: 0.64rem;
	}
	.module {
		float: left;
		width: 3.36rem;
		height: 1.08rem;
		margin: 0 0.07rem;
		margin-top: 0.24rem;
		border: 0.01rem solid #CCCCCC;
		border-radius: 0.16rem;
	}
	.comImg {
		display: block;
		width: 3.08rem;
		height: 0.84rem;
		margin: 0 auto;
		margin-top: 0.12rem;
	}
</style>