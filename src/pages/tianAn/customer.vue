<template>
	<div class="bg">
		<div class="file">
			<div class="file_title">人身保险投保提示书</div>
			<div class="file_hr"></div>
			<div class="file_pdf">
				<div class="cont">
					<p>尊敬的客户：</p>
					<p>人身保险这是一个用纯文字的简单卡片。但卡片可以包含自己的页头、页脚、列表试图、图像和里面的任何元素。</p>
				</div>
			</div>
			<div class="file_hr"></div>
			<div class="file_look">
				<div class="look_all">查看全部</div>
				<img src="/static/img2/right.png" alt="" />
			</div>
		</div>		
		<div class="sign">
			点击签字
		</div>
		<div class="agree">
			<div class="circle"></div>
			<div class="read_agree">我已阅读并同意<a href="">《人身保险投保提示书》</a>，了解并确认全部内容。</div>
		</div>
		<div class="btn">
			<div class="last" @click="back">上一步</div>
			<div class="next" @click="next">下一步</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Code",
		data() {
			return {
				points: [],
				canvasTxt: null,
				startX: 0,
				startY: 0,
				moveY: 0,
				moveX: 0,
				endY: 0,
				endX: 0,
				w: null,
				h: null,
				isDown: false,
				mask: false,
				blur:false,
				flag:false,
				sign:false,
				signPhoto:""
			}
		},
		created() {

		},
		methods:{
			next(){
				this.$router.push('/dianzi')
			},
			back(){
				window.history.go(-1)
			}
		}
	}
</script>

<style scoped="scoped">
	.bg{
	    position: fixed;
	    height:100%;
	    width:100%;
		background: #F3F3F3;
		overflow: hidden;
	}
	.file{
		width:6.44rem;
		height:3.56rem;
		margin-top: 0.4rem;
		margin: 0.4rem auto;
		background: pink;
		border-radius: 8px;
		background: #FFFFFF;
	}
	.file_title{
		font-family: PingFangSC-Regular;
		height:0.7rem;
		line-height:0.7rem;
		margin-top: 0.28rem;
		font-size:0.28rem;
		color: #555555;
		text-align: center;
		letter-spacing: 0;
	}
	.file_hr{
		border: 1px solid #EEEEEE;
	}
	.file_pdf{
		height:2.04rem;
		margin-top: 0.2rem;
		font-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #777777;
		letter-spacing: 0;
	}
	.cont{
		width:5.88rem;
		height:1.60rem;
		line-height:0.4rem;
		margin: 0 auto;
		font-size: 0.28rem;
		color: #777777;
		letter-spacing: 0;
	}
	.file_look{
		height:0.7rem;
	}
	.look_all{
		height:0.9rem;
		line-height:0.7rem;
		float: left;
		margin-left: 0.32rem;
		font-family: PingFangSC-Medium;
		font-size: 0.28rem;
		color: #EB7760;
		letter-spacing: 0;
	}
	.file_look img{
		width:0.56rem;
		height:0.56rem;
		float: right;
		margin-right: 0.24rem;
	}
	.sign{
		width:6.44rem;
		height:3.56rem;
		margin: 0.32rem auto 0.32rem;
		font-size: 0.4rem;
		line-height: 3.56rem;
		text-align: center;
		color: #EB7760;
		letter-spacing: 0;
		background: #FFFFFF;
		border-radius: 8px;
	}
	.agree{
		width:6.44rem;
		height:0.80rem;
		background: #F3F3F3;
		margin-left: 0.52rem;
	}
	.circle{
		width:0.32rem;
		height:0.32rem;
		border-radius: 50%;
		border: 0.001rem solid #EB7760;
		float: left;
	}
	.read_agree{
		width:5.88rem;
		height:0.80rem;
		line-height: 0.4rem;
		float: right;
		font-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #222222;
		letter-spacing: 0;
	}
	.read_agree a{
		color:#6BD1CF ;
	}
	.btn{
		width:6.64rem;
		height:0.88rem;
		margin: 2.02rem auto 0.92rem;
	}
	.btn .last{
		width:3.12rem;
		height:0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: 22px;
		float: left;
	}
	.btn .next{
		width:3.12rem;
		height:0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: 22px;
		float: right;
	}
</style>