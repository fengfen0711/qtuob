<template>
	<div class="scrollDiv" ref="viewBox">
		<Scroll :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomPullText='bottomText' :auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
			<div class="products">
				<div class="clearFloat proContent" :class="art.atcStyle | layout" v-for="art in artList" @click="godetail(art.articleId)">
					<img :src="art.picUrl" class="disImg" />
					<div class="disText">
						<p class="disTitle"><span>{{art.title}}</span></p>
						<p class="disTitleDes">{{art.actDesc}}</p>
						<p class="disTitleDes"><span>{{art.createTime}}</span><span class="sign" v-for="tag in art.tagList">{{tag.name}}</span></p>
					</div>
				</div>
				<p class="noMore" v-show="noMoreShow">没有更多了~</p>
				<p class="noCon" v-show="noShow">没有搜索到任何内容哦~</p>
				<div v-show="loading" slot="bottom" class="loading">
					加载中...
				</div>
			</div>
		</Scroll>
	</div>
</template>

<script>
	import Scroll from '@/components/scroll.vue'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'recommend',
		data() {
			return {
				id:this.$route.query.typeId,
				artList:[],
				serchList:'',
				counte: 1,
				num: 10,
				scrollHeight: 0,
                scrollTop: 0,
                containerHeight: 0,
                loading: false,
                allLoaded: false,
                bottomText: '上拉加载更多...',
                bottomStatus: '',
                pageNo: 1,
                totalCount: '',
                noMoreShow: false,
				noShow: false,
				serchText: '',
			}
		},
		created() {
			console.log(this.id)
			if (this.id) {
				this.getList(this.id)
			}
		},
		components: {
			Scroll: Scroll
		},
		computed: {
			listenstage() {
				return this.$store.state.serchInfo;
			}
		},
		methods: {
			_scroll: function(ev) {
				ev = ev || event;
				ev.preventDefault();
        		ev.stopPropagation();
				this.scrollHeight = this.$refs.innerScroll.scrollHeight;
				this.scrollTop = this.$refs.innerScroll.scrollTop;
				this.containerHeight = this.$refs.innerScroll.offsetHeight;
			},
			loadBottom: function() {
				this.loading = true;
				var artInfo = {
					"search": this.serchText,
					"typeId": this.id,
					"pageIndex": this.counte,
					"pageSize": this.num,
				}
				console.log(artInfo)
				this.$http.post(this.$store.state.link + "/cnt/atc/selArticleList", artInfo)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.$nextTick(() => {
							let arr = res.data.output;
							this.artList = this.artList.concat(arr);
							if(res.data.output.length < this.num) {
								this.loading = false;
								this.allLoaded = true;
								this.noMoreShow = true;
								this.serchText = ""
								return;
							}else{
								this.counte++;
							}
							done()
						})
					}
				}, (response) => {
					console.log('error');
				});
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			getList(a) {
				var artInfo = {
					"search": this.serchText,
					"typeId": this.id,
					"pageIndex": 1,
					"pageSize": this.num,
				}
				console.log(artInfo)
				this.$http.post(this.$store.state.link + "/cnt/atc/selArticleList", artInfo)
					.then(res => {
						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							this.artList = res.data.output.slice(0, this.num);
							if(res.data.output.length == 0) {
								this.allLoaded = true;
								this.noShow = true;
								this.noMoreShow = false;
								this.serchText = ""
							} else if(res.data.output.length == 10) {
								this.counte = 2;
								this.noMoreShow = false;
								this.noShow = false;
								this.allLoaded = false;
							} else if(res.data.output.length < 10) {
								this.allLoaded = true;
								this.noMoreShow = true;
								this.noShow = false;
								this.serchText = ""
							}
							if(a == 1) {
								this.serchShow = false;
							}
						}
					}, res => {
						console.log(res.data)
					})
			},
			godetail(id){
				console.log(id)
				this.$router.push('/artDetail?detailId='+id)
			},
		},
		watch:{
			listenstage : function (ov,nv) {
				if (this.$store.state.serchInfo.titlePath == "recommend") {
					this.serchList = this.$store.state.serchInfo.serchList;
					this.artList = this.serchList;
				}
			}
		},
		filters: {
			layout: function(value) {
				if(value == "U") {
					return value = 'imgUpTextDown'
				} else if(value == "D") {
					return value = 'textUpImgDown'
				} else if(value == "L") {
					return value = 'imgLeftTextRight'
				} else if(value == "R") {
					return value = 'textLeftImgRight'
				}
			}
		},
	}
</script>

<style scoped="scoped">
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.my_body {
		position: absolute;
		background: #FFFFFF;
		width: 100%;
		height: 100%;
	}
	.titleBoxW {
		padding-left: 0.32rem;
	}
	.titleBox {
		position: relative;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.34rem;
		color: #222222;
		border-bottom: solid 0.01rem #CCCCCC;
	}
	.titleBox span {
		display: block;
		float: left;
		/*width: 0.88rem;*/
		margin-right: 0.24rem;
		text-align: center;
		white-space: normal;
		overflow: hidden;
	}
	.titleBox span.titleSlected {
		font-size: 0.36rem;
		font-weight: bold;
	}
	
	.titleBg {
		position: absolute;
		bottom: -0.04rem;
		left: -0.06;
		z-index: 3;
		width: 1.2rem;
		height: 0.08rem;
		background-image: linear-gradient(90deg, #FF4F87 0%, #FFBA80 100%);
		border-radius: 2.5px;
	}
	.products {
		padding-left: 0.3rem;
		padding-bottom: 1.5rem;
	}
	.proContent{
		margin-top: 0.24rem;
		padding-right: 0.3rem;
		overflow: hidden;
	}
	.disImg {
		display: block;
		width: 6.86rem;
		margin: 0 auto;
	}
	.disTitle {
		height: 0.48rem;
		line-height: 0.48rem;
		margin-top: 0.04rem;
		font-size: 0.24rem;
		font-weight: bold;
		color: #222222;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.disTitleDes {
		font-size: 0.2rem;
		color: #222222;
		margin-bottom: 0.24rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>