<template>
	<view style="background-color: #f4f4f4;">
		<view class="page">
			<br>
			<view>
				<view class="avatar">
					<u-avatar :src="userimage" size="100" v-show="islogin" style=""></u-avatar>
				</view>
				<view v-show="!islogin">
					<text class="text_size">{{'请先登录'}}</text>
				</view>
				<view v-show="islogin">
					<text class="text_size">{{'名称：'+username}}</text>
					<text class="text_size">{{'ID：'+userid}}</text>
				</view>
			</view>
		</view>
		<view>
			<u-gap height="10" bgColor="#f4f4f4"></u-gap>
		</view>
		<u-cell icon="man-add" title="添加老人" :isLink="true" @click="link()"></u-cell>
		<u-cell icon="map" title="添加收货地址" :isLink="true" @click="addaddress()"></u-cell>
		<view>
			<u-gap height="20" bgColor="#f4f4f4"></u-gap>
		</view>
		<view class="button_size" v-show="islogin">
			<u-button type="error" text="退出登录" @click="exit"></u-button>
		</view>
		<view class="button_size" v-show="!islogin">
			<u-button type="success" text="登录" @click="toLogin"></u-button>
			<u-button type="primary" text="注册" @click="toSignup"></u-button>
		</view>
		<u-popup :show="show" mode="center" :closeOnClickOverlay="true">
			<view class="pop">
				<u-row>
					<view>
						<text class="text_left">老人的ID: (注意如果已绑定老人将会覆盖原来的老人)</text>
						<br/>
						老人1：<u--input placeholder="请输入内容" v-model="oldid1" border="surround" clearable></u--input>
					    老人2：<u--input placeholder="请输入内容" v-model="oldid2" border="surround" clearable></u--input>
					</view>
				</u-row>
				<button @click="setInfo()">
					<text>确认</text>
				</button>
				<button @click="cancel()">
					<text>取消</text>
				</button>
			</view>
		</u-popup>
		
		<u-popup :show="show1" mode="center" :closeOnClickOverlay="true">
			<view class="pop">
				<u-row>
					<view>
						<text class="text_left">添加收货地址</text>
						<br/>
						姓名：<u--input placeholder="请输入内容" v-model="RealName" border="surround" clearable></u--input>
					    手机号：<u--input placeholder="请输入内容" v-model="phone" border="surround" clearable></u--input>
					    省：<u--input placeholder="请输入内容" v-model="province" border="surround" clearable></u--input>
						市：<u--input placeholder="请输入内容" v-model="city" border="surround" clearable></u--input>
						县：<u--input placeholder="请输入内容" v-model="county" border="surround" clearable></u--input>
						镇：<u--input placeholder="请输入内容" v-model="town" border="surround" clearable></u--input>
					</view>
				</u-row>
				<button @click="setaddress()">
					<text>确认</text>
				</button>
				<button @click="cancel1()">
					<text>取消</text>
				</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "默认用户",
				userid: "暂无",
				userimage: "./static/logo.png",
				islogin: false,
				token: "",
				oldid1: "0",
				oldid2: "0",
				show: false,
				oldname: "",
				RealName:"",
				phone:"",
				address:"",
				show1:false,
				province:"",
				city:"",
				county:"",
				town:""
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'token',
				success(res) {
					that.token = res.data
					uni.request({
						url: "https://link.netlinkold.cn/api/user/get_user_info",
						method:'POST',
						header: {
						'Authorization': 'Bearer ' + that.token,
						},
						success(res) {
							console.log(res)
						    that.userid = res.data.info.userid
							that.username = res.data.info.nickName
							that.islogin = true
							uni.setStorage({
								key:'UserId',
								data:res.data.info.userid,
							})
						}
					})
				}
			})
		},
		watch: {
			token(newName, oldName) {
				if (newName != '') {
					this.islogin = true
				} else {
					this.islogin = false
				}
			}
		},
		methods: {
			cancel(){
				this.show = !this.show
			},
			setInfo() {
				let that = this
				var oids = new Array(0)
				if(that.token == ""){
					uni.navigateTo({
						url:"/pages/user/login"
					})
					return
				}
				oids.push(that.oldid1)
				oids.push(that.oldid2)
				uni.request({
					url:"https://link.netlinkold.cn/api/user/set_old/",
					method:'POST',
					header:{
						'Authorization': 'Bearer ' + that.token,
					},
					data:{
						oldId:oids
					},
					success(res) {
						console.log(res)
						if(res.data.code == 200){
							
						}else{
							
						}
					}
				})
				that.show = !that.show
			},
			setaddress() {
				let that = this
				var addresses = new Array(0)
				if(that.token == ""){
					uni.navigateTo({
						url:"/pages/user/login"
					})
					return
				}
				addresses.push(that.RealName)
				uni.request({
					url:"https://link.netlinkold.cn/api/address/add/" + that.userid,
					method:'POST',
					header:{
						'Authorization': 'Bearer ' + that.token,
					},
					data:{
						name:that.RealName,
						userid:that.userid,
						phone:that.phone,
						address:"中国"+that.province+that.city+that.county+that.town
					},
					success(res) {
						console.log(res)
						if(res.data.code == 200){
							
						}else{
							
						}
					}
				})
				that.show1 = !that.show1
			},
			cancel1(){
				this.show1=!this.show1
			},
			link() {
				this.show = !this.show
			},
			addaddress()
			{
				this.show1=!this.show1
			},
			toLogin() {
				uni.navigateTo({
					url: './login',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			toSignup() {
				uni.navigateTo({
					url: './signup',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			exit() {
				uni.setStorage({
					key: 'token',
					data: "",
					success: function() {
						console.log("存储成功")
					}
				})
				uni.setStorage({
					key: 'UserName',
					data: "",
					success: function() {
						console.log("存储成功")
					}
				})
				uni.navigateTo({
					url: "./login"
				})
			}
			}
		}
	
</script>

<style>
	.page {
		height: 200px;
		background: linear-gradient(15deg, #0F65DB, #0A8FEC, #0AC4EC);
		color: #FFFFFF;
	}

	.avatar {
		display: flex;
		justify-content: center; //子元素水平居中
		align-items: center; //子元素垂直居中
	}

	.text_size {
		font-size: 15px;
		display: flex;
		/*实现垂直居中*/
		align-items: center;
		/*实现水平居中*/
		justify-content: center;
		text-align: justify;
	}

	.context_size {

		display: inline-block;
	}
</style>
