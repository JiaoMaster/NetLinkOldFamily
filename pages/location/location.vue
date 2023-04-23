<template>
	<view style="background-color: #f4f4f4;">
		<view class="page">
			
			<view>
			<view v-show="isOld" style="text-align:justify;">
				<text class="text_size" style="margin-bottom: 8px;">实时位置</text>
				<text class="text_size">{{'老人ID：'+oldid}}</text>
				<text class="text_size">{{'老人位置：'+location}}</text>
			</view>
			 <view v-show="!isOld">
				<text class="text_size">{{'请先绑定'}}</text>
			 </view>	 
			</view>
		</view>
		<view>
			<button @click="change">切换老人</button>
		</view>
		<view class="content">
		  <map id="map" class="map" :show-location="true" :latitude="xy.x" :longitude="xy.y"  ></map>
		</view>
		
	</view>
 
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk.js'
  export default {
    data() {
      return {
        latitude: 37.867666,
        longitude: 112.595583,
		oldid: '',
		location:'中国山西太原杏花岭区大东关街道山西大学',
		isOld:true,
		sec:2000,
		covers: [{
						latitude: 0,
						longitude: 0,
						iconPath: '../../static/loco.png'
					}],
		oids:{}	,
		xy:{},
		mapContext:{},
		now:0,
		NowLocation:'中国山西太原杏花岭区大东关街道山西大学'
      }
    },
    onReady() {
      
    },
	onShow() {
		uni.getStorage({
			key:"token",
			success(res) {
				if(res.data == "")
				{
					uni.showToast({
						title: '未登录，请登录',
						icon:'error',
						duration: 1000
					});
				}
			},
			fail() {
				uni.showToast({
					title: '未登录，请登录',
					icon:'error',
					duration: 1000
				});
			}
		})
		this.getlo(0)
		this.sec = 2000
		//在mounted 声明周期中创建定时器
		const timer = setInterval(()=>{
			// 这里调用调用需要执行的方法，1为自定义的参数，由于特殊的需求它将用来区分，定时器调用和手工调用，然后执行不同的业务逻辑
			this.getlo(this.now)
		}, this.sec) // 每两秒执行1次
		// 通过$once来监听定时器，在beforeDestroy钩子可以被清除
		this.$once('hook:beforeDestroy',()=>{
			// 在页面销毁时，销毁定时器
			clearInterval(timer)
		})
	},
	mounted(){
	
	},
	watch:{
		oldid(newName, oldName){
			if(newName != ''){
				this.isOld = true
			}else{
				this.isOld = false
			}
		}
	},
    methods: {
		change(){
			if(this.now == 0){
				this.now = 1
			}else{
				this.now = 0
			}
		},
		change1(){
		},
		getlo(e){
			let that = this
			this.mapContext = uni.createMapContext("map", this);
			uni.getStorage({
				key: 'token',
				success(res) {
					that.token = res.data
					uni.request({
						url:'https://link.netlinkold.cn/api/user/getOldByUid',
						method:'post',
						header: {
						'Authorization': 'Bearer ' + that.token,
						},
						success(res) {
							that.oids = res.data.oldId.split('+')
							uni.request({
								url: "https://link.netlinkold.cn/api/user/get_user_location",
								method:'POST',
								header: {
								'Authorization': 'Bearer ' + that.token,
								},
								data:{
									userId:that.oids[e]
								},
								success(res) {
									if(that.xy == res.data.location){
										return
									}
									that.xy = res.data.location
									that.location = that.xy.location
									let marker = {
													id:123,
													latitude:that.xy.x,
													longitude:that.xy.y,
													width:20,
													height:20,
													iconPath:'../../static/loco.png'
												}
									that.oldid = that.xy.userId			
									that.mapContext.addMarkers({
													markers:[marker],
													fail:()=>{
														console.log("失败了")
													}
												})	
								}
							})
						}
						})
					
				}
			})
		}
    }
  }
</script>

<style>
	.text_size{
		font-size: 15px;
		display:flex;/*实现垂直居中*/
		justify-content:center;
	}
	.page {
		height: 100px;
			margin-top: 5px;
			margin-left: 2px;
			margin-right: 2px;
		background: linear-gradient(15deg, #0F65DB, #0A8FEC, #0AC4EC);
		color: #FFFFFF;
			border-radius: 40rpx 40rpx 40rpx 40rpx;
	}
  .content {
	
	height: 500px;
	width: 100%;
    flex: 1;
  }

  .map {
	  height: 500px;
	  width: 100%;
    flex: 1;
  }
</style>