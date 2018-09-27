<template>
	<div class="epolicy_bg">
		<p class="eplocy_content">电子投保单内容</p>
		<iframe :src="tmFmsUrl" id="iframe"></iframe>
		<span class="epolicy_span" @click="handleClick">
			投保人人脸识别及签字
       	</span>
	</div>
	
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "Epolicy",
		data() {
			return {
				tmFmsUrl:'',
			}
		},
		created() {
			this.pdfFile()
		},
		methods: {
			handleClick(){
				this.$router.push('/facerecognition?prodCode=' +
									this.$route.query.prodCode + '&prodNo=' +
									this.$route.query.prodNo + '&orderNo=' +
									this.$route.query.orderNo + '&cmpCode=' + 
									this.$route.query.cmpCode+"&responseCode="+this.$route.query.responseCode);
			},
			pdfFile(){
				var data = 	[
							  {
							    "tmId": "TM0003"
							  }
							]
				console.log("请求=="+JSON.stringify(data))
				this.$http.post(this.$store.state.link + '/css/css/queryTemplateByTmIdList', data)
				.then(res => {
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.tmFmsUrl = res.data.output[0].tmFmsUrl;
						console.log("响应=="+JSON.stringify(res.data.output))
					} else {
						console.log("响应1=="+JSON.stringify(res.data))
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
			}
		},
		
	}
</script>

<style scoped="scoped">
	.epolicy_bg{
		width: 100%;
		height: 100%;
	}
	.eplocy_content{
		font-size: 0.28rem;
		color: #444444;
		text-align: center;
		margin-top: 0.32rem;
	}
	.epolicy_span{
		font-size: 0.32rem;
		color: #C9141E;
		border: 0.01rem solid #C9141E;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255,255,255,0.50);
		position: fixed;
		padding: 0.25rem 1.42rem;
		left: 0.72rem;
		bottom: 1.16rem;
		border-radius: 0.5rem;
	}
	#iframe {
		width: 7.5rem;
		height: 10.5rem;
		background: #fff;
		border: none;
		padding: none;
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
</style>