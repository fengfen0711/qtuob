<template>
	<div class="stairs" @click="handleClickNext1">
		<div class="prd_div_topall" @click="handleClickNext11">
			<div class="prd_div_queryall">
				<img class="prd_img_query" src="/static/qijianwei/SearchGlyph.png" @click="changeCount" />
				<input v-model="input_value" class="prd_input_query" type="text" placeholder="搜索" v-on:blur="changeCount()" />
			</div>
		</div>
		<dl v-for='item in title' :class="item">
			<dt class="initials" :class="item">{{item}}</dt>
			<dd class="city-name" v-for="ite in someData" :class="[ite.letter,item]|add" @click="handleClickNext" :code="ite.custId">
				<p class="cityarea-item" >
					<span class="cityarea-itemL" >{{ite.cname}}</span>
					<span class="cityarea-itemR" >{{ite.mobile}}</span>
				</p>
			</dd>
		</dl>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				input_value:"",
				someData:[],
				title:[]
			}
		},
		created() {
			this.getList()
		},
		computed:{
			cityData:function() {
				return this.someData.inlandCity
			},
			distance:function() {
				return this.movedistance
			}
		},
		methods: {
			getList(){
				var data={
					"name":this.input_value,
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				}
//				console.log(data)
			var arr=[]
			this.$http.post(this.$store.state.link +'/cut/cut/queryCustList',data).then(response => {
//				console.log(response.data.output)
			    this.someData = response.data.output;   
			    for(var i=0,j=this.someData.length;i<j;i++){
			    	arr.push(this.someData[i].letter)
			    	
			    }
			     var i,j,len = arr.length;
				 for(i = 0; i < len; i++){
				  for(j = i + 1; j < len; j++){
				   if(arr[i] == arr[j]){
				    arr.splice(j,1);
				    len--;
				    j--;
				   }
				  }
				 }
			    this.title=arr
			}, response => {});
			},
			changeCount(){
				this.getList()
			},
			handleClickStore(e) {
				var newCity = e.target.innerHTML
				localStorage.newCity = newCity
				this.$store.commit("changeCurrentCity",{
					city:newCity
				})
				document.body.scrollTop = 0;
			},
			handleChooseLetter(e) {
				var LetterList = Array.from(document.querySelectorAll(".initials"));
				for(let i =0 ;i < LetterList.length ;i++) {
					var that = LetterList[i];
					if(e.target.innerHTML === that.innerHTML) {
						var top = that.offsetTop;
						document.body.scrollTop = top - 44;
					}
				}
			},
			handleMoveGet(e) {
				e.preventDefault()
				var rightInitial = document.querySelector('.right-initials'),
					rightInitialTop = rightInitial.offsetTop,
					LetterList = Array.from(document.querySelectorAll(".initials")),
					averageHeight = (rightInitial.offsetHeight) / (LetterList.length),
					movedistance =  Math.floor((e.targetTouches[0].clientY -rightInitialTop)/averageHeight);
				if(movedistance>=0 && movedistance<LetterList.length){
					var top = LetterList[movedistance].offsetTop;
					document.body.scrollTop = top  - 44;
				}
			},
			handleClickNext(e){
				var code=e.currentTarget.getAttribute('code')
				var codeShow = true
				var codeList = [code,codeShow]
				this.$emit('child_userList',codeList);
			},
			handleClickNext11(e){
				e.stopPropagation()
			},
			handleClickNext1(){
				var code=""
				var codeShow = true
				var codeList = [code,codeShow]
				this.$emit('child_userList',codeList);
			}
		},
		filters: {
	  	add([a,b]) {
		    	if(a==b){
		    		return ""
		    	}else{
		    		return "display"
		    	}
			}
	}
	}
</script>

<style scoped>
	.display{
		display: none;
	}
	.stairs {
		position: absolute;
		width: 100%;
		height:80%;
		bottom: 0;
		left: 0;
		z-index: 8;
		font-size:50px;
		overflow-y: scroll;
		background: #EEEEEE;
	}
	.prd_div_topall {
		padding-bottom: .16rem;
		background: #ffffff;
		padding-top: 0.2rem;
	}
	.prd_div_queryall {
		width: 7.18rem;
		height: 0.72rem;
		margin: 0 auto;
		background: #EEEEEE;
		border-radius: 0.2rem;
	}
	.prd_img_query {
		display: block;
		float: left;
		width: 0.28rem;
		height: 0.28rem;
		margin-top: 0.22rem;
		margin-left: 0.2rem;
	}
	.prd_input_query {
		float: left;
		height: 0.72rem;
		padding-left: 0.24rem;
		border: none;
		background: #EEEEEE;
		font-size: 0.32rem;
	}
	.initials {
		line-height:.54rem;
		padding-left:.3rem;
		color:#616161;
		font-size:.26rem;
		background:#f5f5f5;
	}
	.city-name,.initials {
		border-bottom:1px solid #e4e5e6;
	}
	.city-name {
		background: #fff;
		height: .76rem;
	}
	.cityarea-item {
		display: block;
		line-height: .8rem;
		padding-left:.2rem;
		font-size:.28rem;
		color:#212121;
		overflow: hidden	
	}
	.right-initials {
		position:fixed;
		right:0;
		top:24%;
	}
	.right-initials .letter-item {
		display:block;
		width: .5rem;
    	line-height: .32rem;
    	text-align: center;
		color: #00afc7;
		font-size: .24rem;	
		
	}
	.cityarea-itemL{
		float: left;
	}
	.cityarea-itemR{
		float: right;
		margin-right: .6rem;
		font-size: .24rem;
		color: rgba(0,0,0,0.50);
	}
	.new{
		width: 1.12rem;
		height: 1.12rem;
		background: #EB6067;
		box-shadow: 0 .02rem .04rem 0 rgba(235,96,103,0.30), inset 0 .01rem .03rem 0 rgba(255,255,255,0.50);
		font-size: .32rem;
		color: #FFFFFF;
		border-radius:50% ;
		text-align: center;
		line-height: 1.12rem;
		position: fixed;
		bottom: 1.64rem;
		right: .8rem;
	}
</style>