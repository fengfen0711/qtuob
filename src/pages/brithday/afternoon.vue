<template>
	<div>
		<img class="afternoon_img" :src="imgdata" />
		<div class="after_div">
			<p class="after_p">{{after_title}}</p>
			<p class="afetr_time">
				<span class="after_color">{{after_time}}</span>
				<span class="after_data">{{afetr_data}}</span>
			</p>
			<p class="after_content">
				{{aftercontent}}
			</p>
		</div>

	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import wx from 'weixin-js-sdk'
	export default {
		name: "",
		data() {
			return {
				imgdata: '',
				after_title: '',
				aftercontent: '',
				after_time: '',
				afetr_data: '',
				temCode: ""
			}
		},
		created() {
			Indicator.open()
			this.temCode = this.$route.query.temCode
			var afterdata = {
				"temCode": this.temCode
			}
			console.log(afterdata)
			this.$http.post(this.$store.state.link + '/cnt/resource/temdetail', afterdata).then(response => {
				Indicator.close()
				if(response.data.code == "SYS_S_000") {
					this.imgdata = response.data.output.temImgPath;
					this.after_title = response.data.output.temTitle;
					this.aftercontent = response.data.output.temCnt;
					this.after_time = response.data.output.currentTime.substring(10, 16);
					this.afetr_data = response.data.output.currentTime.substring(0, 10);

				}
			}, response => {
				Indicator.close()
				console.log("ajax error");
			});
		},

		methods: {

		}
	}
</script>

<style scoped="scoped">
	.afternoon_img {
		width: 7.5rem;
		height: 3.9rem;
		display: block;
		margin: 0 auto;
	}
	
	.after_div {
		padding: 0.32rem 0.3rem 0.16rem 0.3rem;
	}
	
	.after_p {
		font-size: 0.36rem;
		color: #000000;
	}
	
	.afetr_time {
		margin-top: 0.17rem;
	}
	
	.after_color {
		font-size: 0.22rem;
		color: #666666
	}
	
	.after_data {
		font-size: 0.22rem;
		color: #888888;
		margin-left: 0.1rem;
	}
	
	.after_content {
		font-size: 0.28rem;
		color: #666666;
		margin-top: 0.16rem;
		line-height: 0.5rem;
	}
</style>