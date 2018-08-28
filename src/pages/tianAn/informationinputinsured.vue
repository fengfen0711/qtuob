<template>
	<div class="information_all">
		<div class="information_text">
			<label class="information_label">被保人个税声明</label>
			<select class="information_select" v-model="identityType" @change="getIdentity">
				<option value="1">仅为中国税收居民</option>
				<option value="2">仅为非居民</option>
				<option value="3">既是中国税收居民又是其他国家(地区)税收居民</option>
			</select>
			<img src="/static/img/upDown.png" class="information_img" />
		</div>
		<!--<label class="start left">*</label>
		<label class="startopacity left">*</label>-->
		<div v-if="detailFlag" class="information_allitem">
			<!--<p class="inputGrop clearFloat information_item">
				<label class="inputLabel3 left">请录入各项信息</label>
			</p>-->
			<p class="inputGrop clearFloat information_text">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="start left">*</label>姓(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="start left">*</label>名(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="start left">*</label>出生日期</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>现居住地国家(中文)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>现居住地省市(中文)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>现居住地详细地址(中文)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="start left">*</label>现居住地国家(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>现居住地省(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>现居住地市(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="start left">*</label>现居住地详细地址(英文或拼音)</label>
			</p>

			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>出生地国家(中文)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>出生地省市(中文)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>出生地详细地址(中文)</label>
			</p>

			<p class="inputGrop clearFloat information_text">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="start left">*</label>出生地国家(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>出生地省(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>出生地市(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="start left">*</label>出生地详细地址(英文或拼音)</label>
			</p>
			<p class="inputGrop clearFloat information_text">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>税收居民国</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>纳税人识别号</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>如不能提供居民国(地区)纳税人识别号，请选择原因：</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>居民国(地区)不提发放纳税人识别号</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>账户持有人未能取得纳税人识别号，如...</label>
			</p>
			<p class="inputGrop clearFloat information_item">
				<!--<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>-->
				<label class="inputLabel3 left"><label class="startopacity left">*</label>请输入不能提供纳税人识别号的原因</label>
			</p>
		</div>
		<div v-if="!detailFlag" class="information_bottom_btn">
			<span class="information_bottom" @click="handleClickback">上一步</span>
			<span class="information_next" @click="next">下一步</span>
		</div>
		<div v-if="detailFlag" class="information_bottom_fixed">
			<span class="information_bottom" @click="handleClickback">上一步</span>
			<span class="information_nexttwo">下一步</span>
		</div>
	</div>

</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: "informationinput",
		data() {
			return {
				identityType: '1', //证件类型
				detailFlag: false
			}
		},
		created() {

		},

		methods: {
			getIdentity() {
				if(this.identityType != "1") {
					Toast("仅支持仅为中国税收居民")
					this.detailFlag = true;
				} else { //中国
					this.detailFlag = false;
				}
			},
			next() {
					this.$router.push('/insuranceadvice1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&code=" + "1" + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
			},
			handleClickback() {
				window.history.go(-1)
			}
		}

	}
</script>

<style scoped="scoped">
	.left {
		float: left;
	}
	
	.startopacity {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
		opacity: 0;
	}
	
	.inputLabel3 {
		display: block;
		/*width: 6.8rem;*/
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.26rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.twoCon .inputGrop:last-child {
		border: none;
	}
	
	.information_all {
		background: #F3F3F3;
		width: 100%;
		height: 100%;
		position: absolute;
	}
	
	.information_item {
		width: 100%;
		background: #F3F3F3;
	}
	
	.information_text {
		height: 0.88rem;
		background: #FFFFFF;
		/*padding: 0 0.4rem 0 0.4rem;*/
		line-height: 0.88rem;
		/*margin-top: 0.2rem;*/
		/*border-top: 0.2rem solid#f3f3f3;*/
		position: relative;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	
	.information_item {
		height: 0.88rem;
		background: #FFFFFF;
		/*padding: 0 0.4rem 0 0.4rem;*/
		line-height: 0.88rem;
		position: relative;
	}
	
	.information_allitem {
		background: #FFFFFF;
		padding: 0 0.4rem 0 0.4rem;
		/*padding-bottom: 1rem;*/
	}
	
	.information_label {
		margin-left: 0.4rem;
		font-size: 0.28rem;
		color: #555555;
		width: 1.12rem;
	}
	
	.information_select {
		width: 4.2rem;
		height: 0.52rem;
		font-size: 0.28rem;
		line-height: 0.5rem;
		margin-left: 0.76rem;
		background: #FFFFFF;
		color: #666666;
		border: none;
	}
	
	.start {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
	}
	
	select {
		/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
		border: solid 1px #000;
		/*很关键：将默认的select选择框样式清除*/
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		/*在选择框的最右侧中间显示小箭头图片*/
		background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll rightright center transparent;
		/*为下拉小箭头留出一点位置，避免被文字覆盖*/
		padding-right: 14px;
	}
	/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
	
	select::-ms-expand {
		display: none;
	}
	
	.information_img {
		width: 0.4rem;
		height: 0.44rem;
		position: absolute;
		top: 0.22rem;
		right: 0.6rem;
		bottom: 0.22;
	}
	
	.information_bottom {
		width: 3.12rem;
		height: 0.88rem;
		border: 0.02rem solid #EB7760;
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
	}
	
	.information_nexttwo {
		width: 3.12rem;
		height: 0.88rem;
		border: 0.02rem solid gray;
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
		margin-left: 0.3rem;
		background: gray;
		opacity: 0.3;
	}
	
	.information_next {
		width: 3.12rem;
		height: 0.88rem;
		border: 0.02rem solid #EB7760;
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
		margin-left: 0.3rem;
	}
	
	.information_bottom_btn {
		padding: 0 0 0 0.48rem;
		vertical-align: bottom;
		height: 0.88rem;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		margin-bottom: 0.56rem;
	}
	
	.information_bottom_fixed {
		position: fixed;
		bottom: 0.56rem;
		left: 0.48rem;
	}
	
	.information_bottom_next {
		padding-left: 0.48rem;
		margin-top: 1rem;
	}
</style>