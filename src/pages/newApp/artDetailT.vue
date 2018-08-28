<template>
	<div class="detailBox" :class="{box1:titleShow}">
		<p class="upTop" @click="upPath">
			<img src="/static/imgNew/upImg.png" class="upImg" />
			<span class="upTopspan">返回</span>
		</p>
		<div class="topBox">
			<p class="topTitle">{{title}}</p>
			<p class="titleDes"><span>发布时间：{{time}}</span><span class="right" v-for="tag in tagList">{{tag}}</span></p>
		</div>
		<div v-html="html" class="htmlStyle">{{html}}</div>
		<div class="sortMenu clearfix" v-show="titleShow">
			<div class="sortMenu-ul">
				<ul class="sortMenu-ul1">
					<li ref="item" class="cell1" v-for="link in linkList" :id="link.articleId" @click="toArtDetail($event,link.typeId,link.articleId)">
						<span class="prd_div_itemlab1">{{link.name}}</span>
						<b class="titleBg"></b>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'artDetail',
		data() {
			return {
				titleShow: true,
				title: '',
				time: '',
				tagList: [],
				html: '',
				linkList: [],
				linkListFirst: [],
				isScroll:''
			}
		},
		created() {
			this.detailAjax(this.$route.query.detailId, 1)
			this.common.noShare();
		},
		methods: {
			detailAjax(id, a) {
				var detailInfo = {
					"articleId": id
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/queryArticleDetails", detailInfo)
					.then(res => {
						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							this.html = res.data.output.content;
//							if(res.data.output.linkList) {
//								this.linkList = res.data.output.linkList;
//								if(a == 1) {
//									this.linkListFirst = this.linkList;
//								}
//							} else {
//								this.titleShow = false
//							}
							this.title = res.data.output.title;
							this.time = res.data.output.createDatetime;
							this.tagList = res.data.output.tagList;
						}
					}, res => {
						console.log(res.data)
					})
			},
			toArtDetail(ev, id, articleId) {
				if(articleId) {
					this.detailAjax(articleId)
				} else {
					this.$router.push('/rule?comId=' + id)
				}
				for(var i = 0; i < this.$refs.item.length; i++) {
					this.$refs.item[i].setAttribute("class", "cell1");
					this.$refs.item[i].children[1].setAttribute("class", "titleBg");
				}
				ev.currentTarget.setAttribute("class", "cell");
				ev.currentTarget.children[1].setAttribute("class", "titleBg1");
			},
			upPath(){
				window.history.go(-1);
			}
		},
		watch: {
			linkListFirst: function() {
				this.$nextTick(function() {
					for(var i = 0; i < this.$refs.item.length; i++) {
						if(this.$refs.item[i].id == this.$route.query.detailId) {
							this.$refs.item[i].setAttribute("class", "cell");
							this.$refs.item[i].children[1].setAttribute("class", "titleBg1");
						}
					}
				})
			},
			html: function() {
				window.scroll(0, 0);
			},
		}
	}
</script>

<style scoped="scoped">
	.right {
		margin-left: 0.3rem;
		/*font-size: 0.26rem;*/
		color: #E73748;
	}
	.detailBox {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
		overflow: hidden;
	}
	.box1 {
		padding-top: 0.8rem;
	}
	.linkBox {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
		display: flex;
		width: 100%;
		background: #FFFFFF;
	}
	.linkSpan {
		flex: 1;
		height: 0.8rem;
		line-height: 0.4rem;
		font-size: 0.28rem;
		color: #222222;
		text-align: center;
	}
	.selected {
		flex: 1;
		height: 0.8rem;
		line-height: 0.4rem;
		font-size: 0.28rem;
		text-align: center;
		color: #C9141E;
	}
	.sortMenu {
		display: none;
		position: fixed;
		top: 0.8rem;
		right: 0;
		z-index: 10;
		width: 100%;
		height: 1rem;
		background: #FFFFFF;
		overflow-x: scroll;
		-webkit-overflow-x: scroll;
	}
	.sortMenu::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	.sortMenu-ul {
		display: flex;
		justify-content: flex-start;
		min-width: 7rem;
		padding: 0 0.1rem;
		padding-left: 0.3rem;
	}
	.sortMenu-ul1 {
		position: relative;
		min-width: 7rem;
		border-bottom: solid 0.01rem #CCCCCC;
	}
	.cell {
		position: relative;
		display: inline-block;
		height: 0.88rem;
		line-height: 0.88rem;
		margin: 0 0.5em;
		font-size: 0.32rem;
		font-weight: bold;
		color: #FF4848;
		text-align: center;
		position: relative;
		text-overflow: ellipsis;
		word-break: keep-all;
	}
	.cell1 {
		position: relative;
		display: inline-block;
		height: 0.88rem;
		line-height: 0.88rem;
		margin: 0 0.5em;
		font-size: 0.3rem;
		color: #222222;
		text-align: center;
		position: relative;
		text-overflow: ellipsis;
		word-break: keep-all;
	}
	.sortMenu-ul1 .cell:first-child, .sortMenu-ul1 .cell1:first-child {
		margin-left: 0;
	}
	.titleBg {
		display: none;
	}
	.titleBg1 {
		position: absolute;
		bottom: -0.04rem;
		left: 0;
		z-index: 3;
		display: block;
		width: 100%;
		height: 0.08rem;
		background: linear-gradient(90deg, #FF4F87 0%, #A86BF6 100%);
		border-radius: 0.08rem;
	}
	>>> .htmlStyle {
		padding: 0 0.3rem;
		font-size: 0.28rem;
		line-height: 0.5rem;
		padding-bottom: 0.64rem;
		
	}
	>>> strong, h1, h2, h3, h4, h5, h6, b {
		font-weight: bold;
	}
	.topBox {
		padding: 0 0.32rem;
		padding-top: 0.42rem;
		padding-bottom: 0.6rem;
	}
	.topTitle {
		padding-bottom: 0.24rem;
		line-height: 0.6rem;
		font-weight: bold;
		font-size: 0.42rem;
		color: #000000;
	}
	.titleDes {
		line-height: 0.42rem;
		font-size: 0.3rem;
		color: #B3B3B3;
	}
	.upTop {
		position: fixed;
		top: 0;
		left: 0;
		width: 7.2rem;
		padding: 0 0.15rem;
		padding-top: 0.2rem;
		height: 0.64rem;
		line-height: 0.64rem;
		font-size: 0.36rem;
		color: #EB7760;
		background: #FFFFFF;
	}
	.upTopspan {
		display: block;
		float: left;
	}
	.upImg {
		display: block;
		float: left;
		width: 0.64rem;
		height: 0.64rem;
	}
</style>