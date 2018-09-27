<template>
    <div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
        <div class="twoCon">
           <ul class="twoCon_ul">
                <li>
                    <span>投保人资料</span>
                    <img src="/static/leftImg.png" />
                </li>
                <li>
                    <span>被保险人资料</span>
                    <img src="/static/leftImg.png" />
                </li>
                <li>
                    <span>身故受益人资料</span>
                    <img src="/static/leftImg.png" />
                </li>
                <li>
                    <span>生存受益人资料</span>
                    <img src="/static/leftImg.png" />
                </li>
                <li>
                    <span>保险计划</span>
                    <img src="/static/leftImg.png" />
                </li>
                <li>
                    <span>账户信息</span>
                    <img src="/static/leftImg.png" />
                </li>
                <li>
                    <span>健康告知事项</span>
                    <img src="/static/leftImg.png" />
                </li>
                <li>
                    <span>财务和其他告知事项</span>
                    <img src="/static/leftImg.png" />
                </li>
           </ul>
        </div>
        <p class="btnBox">
			<span class="btn btn1" @click="toInsuranceTips">上一步</span>
			<span class="btn" @click="toSignPdf">下一步</span>
		</p>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "tips",
		data() {
			return {
            
				
			}
		},
		mounted() {},
		
		methods: {
			toInsuranceTips(){
				window.history.go(-1)
			},
			toSignPdf(){
				this.$router.push("/signPdf")
			}
		}	  
	}
</script>
<style scoped="scoped">
    .one {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #F3F3F3;
	}

    .twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	
	.one .twoCon:first-child {
		margin-top: 0;
	}

    .twoCon_ul{
        width: 100%;
    }

    .twoCon_ul li{
        width: 100%;
        line-height: 1.2rem;
        border-bottom: 1px solid #C8C7CC;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .twoCon_ul li:last-child{
        border-bottom: 0;
    }

    .twoCon_ul li img{
        width: 0.6rem;
       height: 0.6rem; 
    }

    .btnBox {
		padding-top: 0.92rem;
		padding-bottom: 1.16rem;
		text-align: center;
        margin-top: 0.6rem;
	}
    
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.32rem;
		border: 0.02rem solid #C9141E;
		border-radius: 0.88rem;
		background: #C9141E;
		color: #FFFFFF;
		text-align: center;
	}
	
	.btn1 {
		background: none;
		border: 0.02rem solid #C9141E;
		color: #C9141E;
		margin-right: 0.3rem;
	}
</style>