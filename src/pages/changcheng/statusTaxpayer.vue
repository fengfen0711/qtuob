<template>
    <div class="one">
        <p class="title_twoCon clearFloat">
            <label class="titleLable_twoCon left qtb">投保人纳税人身份</label>
        </p>
        <div class="twoCon">
            <p class="title_twoCon1 clearFloat">
                <span class="word">本人确认投保人为：</span>
            </p>
            <p class="clearFloat cline" @click="handleClick">
                <img class="all" src="/static/muhaha/ben.png" alt="" v-show="!showImg" />
                <img class="all" src="/static/muhaha/Noben.png" alt="" v-show="showImg" />
                <span class="content1">仅为中国税收居民</span>
            </p>
            <p class="clearFloat cline" @click="handleClick">
                <img class="all" src="/static/muhaha/ben.png" alt="" v-show="showImg" />
                <img class="all" src="/static/muhaha/Noben.png" alt="" v-show="!showImg" />
                <span class="content1">仅为非居民</span>
            </p>
            <p class="clearFloat cline" @click="handleClick">
                <img class="all" src="/static/muhaha/ben.png" alt="" v-show="showImg" />
                <img class="all" src="/static/muhaha/Noben.png" alt="" v-show="!showImg" />
                <span class="content1">既是中国税收居民，又是其他国家（地区）税收居民</span>
            </p>
        </div>
        <p class="title_twoCon clearFloat">
            <label class="titleLable_twoCon left qtb">被保险人纳税人身份</label>
        </p>
        <div class="twoCon">
            <p class="title_twoCon1 clearFloat">
                <span class="word">本人确认被保险人为：</span>
            </p>
            <p class="clearFloat cline" @click="handleClick">
                <img class="all" src="/static/muhaha/ben.png" alt="" v-show="!showImg" />
                <img class="all" src="/static/muhaha/Noben.png" alt="" v-show="showImg" />
                <span class="content1">仅为中国税收居民</span>
            </p>
            <p class="clearFloat cline" @click="handleClick">
                <img class="all" src="/static/muhaha/ben.png" alt="" v-show="showImg" />
                <img class="all" src="/static/muhaha/Noben.png" alt="" v-show="!showImg" />
                <span class="content1">仅为非居民</span>
            </p>
            <p class="clearFloat cline" @click="handleClick">
                <img class="all" src="/static/muhaha/ben.png" alt="" v-show="showImg" />
                <img class="all" src="/static/muhaha/Noben.png" alt="" v-show="!showImg" />
                <span class="content1">既是中国税收居民，又是其他国家（地区）税收居民</span>
            </p>
        </div>
        <div class="conText">
            <p class="notes">注释说明</p>
            <p class="content">
                1、中国税收居民是指在中国境内有住所，或者无住所而在境内居住满一年的个人。在中国境内住所是指因户籍、家庭、经济利益关系而在 中国境内习惯性居住。在境内居住满年，是指在一个纳税年度中在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个 纳税年度中一次不超过30日或者多次累计不超过90日的离境。
            </p>
            <p class="content">
                2.非居民是指中国税收居民以外的个人。其他国家(地区)税收居民身份认定规则及纳税人识别号相关信息请参见国家税务总局网站(http://www.chinatax.gov.cn/aeoi index. html)。
            </p>
            <p class="content">
                3.军人、武装警察无需填写此声明文件。声明:本人确认上述信息的真实、准确和完整，且当这些信息发生变更时，将在30日内通知贵机构，否则本人承担由此造成的不利后果。
            </p>
        </div>
        <p class="btnBox">
            <span class="btn btn1">保存并分享</span>
            <span class="btn" @click="toBasicInformation">下一步</span>
        </p>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            showImg: false
        }
    },
    methods: {
        nextClick() {
            if (this.showImg == false) {
                Toast('请您确认信息真实准确和完整')
            } else {
                this.$router.push('/trialCalculation');
            }

        },
        handleClick() {
            if (this.showImg) {
                this.showImg = false
            } else {
                this.showImg = true
            }
        },
        toBasicInformation() {
            this.$router.push("/basicInformation");
        }

    }
}
</script>

<style scoped="scoped">
.left {
    float: left;
}

.right {
    float: right;
}

input,
button {
    background: none;
    border: none;
}

input,
button {
    outline: none;
}

input::-ms-clear {
    display: none;
    width: 0;
    height: 0;
}

input::-ms-reveal {
    display: none;
}

textarea::-webkit-input-placeholder,
input::-webkit-input-placeholder {
    color: #B2B2B2;
}

input:-ms-input-placeholder {
    color: #B2B2B2;
}

select {
    padding-right: 0.48rem;
    border: none;
    background: none;
    background: url(/static/upDown.png) no-repeat right center;
    background-size: 0.4rem 0.45rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.inputLabel3 {
    display: block;
    width: 2.3rem;
    height: 0.88rem;
    line-height: 0.88rem;
    font-weight: bold;
    color: #555555;
    /*background: #669900;*/
}

.inputText {
    height: 0.88rem;
    font-size: 0.28rem;
    color: #333333;
    padding-left: 0;
}

.inputWidth {
    width: 4.4rem;
}

.qtb {
    margin-left: 0.1rem;
}

.left {
    float: left;
}

.one {
    width: 100%;
    min-height: 100%;
    position: absolute;
    background: #F3F3F3;
}

.twoCon {
    padding: 0 0.4rem;
    font-size: 0.32rem;
    color: #222222;
    background: #FFFFFF;
    overflow: scroll;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.16rem;
}


/* .twoCon1 {
    padding: 0 0.4rem;
    font-size: 0.32rem;
    color: #222222;
    background: #FFFFFF;
    overflow: scroll;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
} */

.twoCon::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #fff;
}

.clearFloat:after {
    height: 0;
    display: block;
    overflow: hidden;
    visibility: hidden;
    clear: both;
    content: "";
}

.title_twoCon1 {
    height: 1rem;
    line-height: 1rem;
}

.title_twoCon {
    height: 1.11rem;
    line-height: 1.11rem;
}

.titleLable_twoCon {
    display: inline-block;
    font-size: 0.35rem;
    font-weight: bold;
    color: #222222;
    margin-left: 0.4rem;
}

.selected {
    width: 0.64rem;
    height: 0.64rem;
}

.word {
    font-size: 0.28rem;
    color: #555555;
    letter-spacing: 0;
    line-height: 0.44;
    font-weight: bold;
}

.conText {
    width: 6.44rem;
    height: 3.2rem;
    margin: 0 auto;
    margin-top: 0.4rem;
}

.notes {
    font-size: 0.28rem;
    line-height: 0.4rem;
}

.content {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #101010;
}

.mustRead {
    overflow: hidden;
    width: 6.44rem;
    height: 1.52rem;
    margin: 0 auto;
    margin-top: 0.4rem;
    background: #FFFFFF;
    border-radius: 0.16rem;
    margin-bottom: 0.64rem;
}

.all {
    float: left;
    width: 0.64rem;
}

.content1 {
    margin-top: 0.18rem;
    font-size: 0.28rem;
    line-height: 0.6rem;
    color: #555555;
}

.btnBox {
    padding-bottom: 1.16rem;
    text-align: center;
    margin-top: 4.16rem;
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