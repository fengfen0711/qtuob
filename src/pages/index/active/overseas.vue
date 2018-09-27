<template>
	<div class="bg">
		<img class="img" src="/static/sea1.png" />
		<img class="img" src="/static/sea2.png" />
		<img class="img" src="/static/sea3.png" />
		<img class="img" src="/static/sea4.png" />
		<table class="insurance_table">
			<tr>
				<th class="thT"></th>
				<th class="thTa">标准版</th>
				<th class="thTa thTb">VIP版</th>
			</tr>
			<tr>
				<th>涵盖的治疗</th>
				<td colspan="2" class="tdTa">
					<ul>
						<li>
							<span>①</span>
							<span>癌症治疗</span><br />
							<span class="tdTb">所有恶性肿瘤(含白血病)、原位癌、癌前病变，但皮肤淋巴瘤除外，皮肤癌只保恶性黑素瘤</span>
						</li>
						<li>
							<span>②</span>
							<span>冠状动脉旁路移植手术</span><br />
							<span class="tdTb">冠状动脉搭桥手术</span>
						</li>
						<li>
							<span>③</span>
							<span>心脏瓣膜置换和修复手术</span>
						</li>
						<li>
							<span>③</span>
							<span>心脏瓣膜置换和修复手术</span>
						</li>
						<li>
							<span>④</span>
							<span>神经外科手术</span>
						</li>
						<li>
							<span>⑤</span>
							<span>活体器官移植</span>
						</li>
						<li>
							<span>⑥</span>
							<span>骨髓移植</span>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<th>保额</th>
				<td>600万元/保单年度</td>
				<td>1200万元/保单年度</td>
			</tr>
			<tr>
				<th>交通</th>
				<td>经济舱</td>
				<td>公务舱</td>
			</tr>
			<tr>
				<th>住宿</th>
				<td>3-4星级酒店</td>
				<td>5星级酒店</td>
			</tr>
			<tr>
				<th>住院津贴</th>
				<td>600元/天<br/>最多60天/年</td>
				<td>1200元/天<br/>最多60天/年</td>
			</tr>
			<tr>
				<th>归国药费</th>
				<td>30万元</td>
				<td>30万元</td>
			</tr>
			<tr>
				<th>归国津贴</th>
				<td>无</td>
				<td>终身12万元</td>
			</tr>
			<tr>
				<th>保险期间</th>
				<td>1年</td>
				<td>1年</td>
			</tr>
			<tr>
				<th>30天-18周岁</th>
				<td class="orange">557元</td>
				<td class="blue">1045元</td>
			</tr>
			<tr>
				<th>19-64周岁</th>
				<td class="orange">2519元</td>
				<td class="blue">4925元</td>
			</tr>
			<tr>
				<th>65-74周岁<br/><span style="font-size: 0.2rem; color: #666;">(仅限续保)</span></th>
				<td class="orange">4375元</td>
				<td class="blue">8352元</td>
			</tr>			
		</table>
		<img class="img img1" src="/static/sea5.png" />
		<div class="btn_wrapper">
			<span class="toInsure" @click="handleClickBuy">立即投保</span>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			handleClickBuy() {
				Toast('您好，平台正在报备中，暂时无法投保。')
			},
		},
	}
</script>

<style scoped="scoped">
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 10;
	}
	.bg {
		width: 100%;
		height: 100%;
		background: #f8f8f8;
		position: relative;
		padding-bottom: .3rem;
	}
	.img {
		width: 7.5rem;
		height: auto;
	}
	.img1 {
		margin-bottom: 0.6rem;
	}
	.insurance_table {
		width: 98%;
		margin: .2rem auto;
		border-collapse: collapse;
		line-height: 1rem;
		border: 0.01rem solid #e6e6e6;
		background: #FFFFFF;
	}
	.insurance_table td {
		padding: .1rem;
		color: #000000;
		font-size: 0.26rem;
		text-align: center;
		border-bottom: .01rem dashed #e6e6e6;
		border-right: .01rem dashed #e6e6e6;
	}
	tr td:last-child {
		border-right: none;
	}
	tr {
		height: .4rem;
		line-height: .4rem;
	}
	th {
		width: 1.6rem;
		font-size: 0.26rem;
		background: #f3f3f3;
		text-align: center;		
	    border-right: .01rem solid #e6e6e6;
	    border-bottom: .01rem dashed #e6e6e6;
	}
	.thT {
		background: #FFFFFF;
	}
	.thTa {
		height: 0.7rem;
		color: #FFFFFF;
		background: #f19149;
		text-align: center;
	}
	.thTb {
		background: #307c90;
	}
	.insurance_table td.tdTa {
		padding-left: 0.5rem;
		text-align: left;
	}
	.insurance_table td .tdTb{
		padding-left: 0.34rem;
		color: #75b6ca;
	}
	.insurance_table td.orange {
		font-weight: bold;
		color: #f19149;
	}
	.insurance_table td.blue {
		font-weight: bold;
		color: #307c90;
	}
	.btn_wrapper {
	    position: fixed;
	    bottom: 0;
	    z-index: 10;
	    display: flex;
	    width: 100%;
	    align-items: center;
	    justify-content: center;
	    height: 1rem;
	    line-height: 1rem;
	    background: #fff;
	}
	.toInsure {
	    display: block;
	    flex: 1;
	    background: #2f8196;
	    height: 1rem;
	    line-height: 1rem;
	    color: #fff;
	    font-size: .32rem;
	    text-align: center;
	}
</style>