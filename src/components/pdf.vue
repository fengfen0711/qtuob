<template>
	<div class="pdf_w">
		<iframe :src="pdf" id="iframe"></iframe>
		<div class="pdf_btn" @click="handleClickClose">
			关闭
		</div>
	</div>

</template>

<script>
	export default {
		name: "pdf",
		props: ['pdf'],
		data() {
			return {
				data: true
			}
		},
		created() {
			//			if(this.pdf!=""){
			//				this.$
			//			}else{
			////				alert(2)
			//			}
		},
		methods: {
			handleClickClose() {
				//				alert(1)
				this.$emit('pdfClose', this.data);
			}
		}
	}
</script>

<style>
	.pdf_w {
		width: 100%;
		height: 100%;
		background: #fff;
		/*padding-bottom:.5rem ;*/
		position: absolute;
	}
	
	.pdf_btn {
		position: absolute;
		bottom: .2rem;
		left: .5rem;
		width: 6.5rem;
		height: 0.88rem;
		margin: 0.4rem auto;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #FFFFFF;
		background: #54CCC1;
		border-radius: 0.16rem;
		text-align: center;
	}
	
	#iframe {
		width: 100%;
		height: 100%;
		background: #fff;
		border: none;
		padding: none;
	}
</style>