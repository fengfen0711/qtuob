<template>
    <div class="paybox">
        <div class="wrap_img">
            <img src="../../../static/icon_false.png" class="wrap_image"/>
        </div>
        <p class="pay">支付失败</p>
        <p class="pay_first">所选银行卡余额不足，请及时充值</p>
        <div class="ground_write">
            <p class="ground_writep">
                <span class="ground_left">投保单号</span>
                <span class="ground_right">INDENT00004328QQ99</span>
            </p>
            <p class="ground_writep">
                <span class="ground_left">投保时间</span>
                <span class="ground_right">2018-07-06&nbsp;14:56:28</span>
            </p>
            <p class="ground_writep">
                <span class="ground_left">投保人姓名</span>
                <span class="ground_right">柴富强</span>
            </p>
            <p class="ground_writep">
                <span class="ground_left">被保险人姓名</span>
                <span class="ground_right">柴富强</span>
            </p>
            <p class="ground_writep">
                <span class="ground_left">主险名称</span>
                <span class="ground_right">内容</span>
            </p>
            <p class="ground_writep">
                <span class="ground_left">附加险名称</span>
                <span class="ground_right">内容</span>
            </p>
            <p class="ground_writep" style="border-bottom:none;">
                <span class="ground_left">合计保费</span>
                <span class="ground_right">￥300.00</span>
            </p>
        </div>
        <div class="btn">
            <span class="btn_left" @click="pageClick">订单详情</span>
            <span class="btn_left btn_right" @click="homeClick">返回首页</span>
        </div>
    </div>
</template>

<script>
    export default {
		name: "",
		data() {
			return {
            }
        },
        methods:{
			pageClick() {
				this.$router.push('/orderDetails');
			},
       		homeClick() {
				this.$router.push('/');
			}	
		}
	}
</script>

<style scoped>
    .paybox{
        width:100%;
        min-height: 100%;
        background: #eee;
        box-sizing: border-box;
        position: absolute;
        overflow-x: hidden;
    }
    .wrap_img{
        width: 100%;
        text-align: center;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
    }
    .wrap_image{
        width: 1.6rem;
        height: 1.6rem;
        margin-top: 0.5rem;
    }
    .pay{
        width: 100%;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        font-size: 0.5rem;
        text-align: center;
        margin-bottom: 0.2rem;
    }
    .pay_first{
        width: 100%;
        color: #ccc;
        text-align: center;
    }
    .ground_write{
        width: 6.44rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        margin: 0.4rem auto;
        background: #fff;
    }
    .ground_writep{
        width: 100%;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .ground_right{
        color: #ccc;
    }
    .btn{
        width: 100%;
        padding-top: 0.7rem;
        padding-bottom: 0.5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .btn_left{
        width: 30%;
        padding: 0.3rem 0.3rem;
        border: 1px solid #c9141e;
        text-align: center;
        color: #c9141e;
        border-radius: 1rem;
    }
</style>