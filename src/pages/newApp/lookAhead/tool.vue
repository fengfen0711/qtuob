<template>
	<div class="disBox">
		<div class="moduleBox clearFloat">
			<div class="module" v-for="com in companyList" :key="com.typeId" @click="toRule(com.typeId,com.compCode)">
				<img :src="com.typePic" class="comImg" />
				<span class="comTxt">{{com.name}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'tool',
		data() {
			return {
				status:this.$route.query.status,
				companyList:[],
			}
		},
		created() {
			this.titleAjax()
		},
		methods: {
			titleAjax() {
				var titleInfo = {
					"parTypeId": "0-2"
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/queryArticleType", titleInfo)
					.then(res => {
						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							this.companyList = res.data.output.articleTypeRespList;
							this.status = this.$route.query.status
							for (var i=0;i<this.companyList.length;i++) {
								if (this.companyList[i].compCode == "plan") {
									this.companyList.splice(i,1)
								}
								else if (this.companyList[i].compCode == "commission") {
									if (this.status == 'ZS' || (this.$store.state.brokerInfo.isSignEnum == 'Y' && this.$store.state.brokerInfo.brokerCode != '')) {
										
									}else{
										this.companyList.splice(i,1)
									}
								}
							}
						}
					}, res => {
						console.log(res.data)
					})
			},
			toRule (id,code){
				console.log(id+','+code)
				this.$router.push('/company?comId='+id)
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
		background: #FAFAFA;
	}
	.moduleBox {
		padding-left: 0.27rem;
		padding-bottom: 0.64rem;
	}
	.module {
		float: left;
		width: 2.88rem;
		height: 2.88rem;
		margin: 0 0.3rem;
		margin-top: 0.48rem;
		background: #FFFFFF;
		border: 0.01rem solid #CCCCCC;
		border-radius: 0.16rem;
	}
	.comImg {
		display: block;
		width: 1.28rem;
		height: 1.28rem;
		margin: 0 auto;
		margin-top: 0.48rem;
		margin-bottom: 0.28rem;
	}
	.comTxt {
		display: block;
		line-height: 0.44rem;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
		text-align: center;
	}
</style>