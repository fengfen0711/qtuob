<template>
    <div class="paybox">
        <div class="wrap_img">
            <img src="../../../static/img/sign/iconerror.png" class="wrap_image"/>
        </div>
        <p class="pay">核保失败</p>
        <p class="pay_first">被拒保的理由</p>
        <div class="btn">
            <span class="btn_left" @click="againClick">重新制定投保计划</span>
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
			againClick() {
				this.$router.push('/trialCalculation');
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
    .btn{
        width: 100%;
        margin-top: 7rem;
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