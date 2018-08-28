<template>
	<div class="disBox">
		<div class="moduleBox">
			<div class="module clearFloat" v-for="rule in ruleList" :key="rule.typeId" @click="toDetail(rule.typeId)">				
				<div class="textBox">
					<p class="textTitle">{{rule.name}}</p>
				</div>
				<span class="imgBox">
					<img :src="rule.typePic" class="iconImg" />
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'study',
		data() {
			return {
				id:this.$route.query.comId,
				ruleList:[],
			}
		},
		created() {
			this.studyAjax(this.id)
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
						this.ruleList = res.data.output.articleTypeRespList;
					}
				}, res => {
					console.log(res.data)
				})
			},
			toDetail (id){
				var artInfo = {
					"typeId": id
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/selArticleList", artInfo)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.$router.push('/artDetail?detailId='+res.data.output[0].articleId)
					}
				}, res => {
					console.log(res.data)
				})
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
		height: 100%;
		background: #FFFFFF;
	}
	.moduleBox {
		padding-bottom: 0.48rem;
	}
	.module {
		width: 6.86rem;
		height: 1.08rem;
		margin: 0 auto;
		margin-top: 0.24rem;
		border: 0.01rem solid #CCCCCC;
		border-radius: 0.16rem;
	}
	.imgBox {
		display: block;
		float: right;
		width: 1.84rem;
		height: 1.08rem;
		padding-right: 0.2rem;
	}
	.iconImg {
		display: inline-block;
		width: 1.84rem;
		height: 0.68rem;
		margin-top: 0.2rem;
	}
	.textBox {
		float: left;
		width: 4.6rem;
		padding-left: 0.2rem;
	}
	.textTitle {
		height: 0.36rem;
		line-height: 0.36rem;
		padding-top: 0.18rem;
		font-size: 0.28rem;
		color: #222222;
		font-weight: bold;
	}
</style>