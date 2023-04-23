<template>
	<view class="content">
		<u-gap></u-gap>
		<view class="mobile">
			<view class="mobile-item selectd">
				<image src="../../static/login.png"></image>
				账号登录
			</view>
			<view class="mobile-item">
				<image src="../../static/shouji_2.png"></image>
				手机登录
			</view>
		</view>
		<u-gap></u-gap>
		<u-gap></u-gap>
		<view class="login">
			<view class="login-item">
				<image src="../../static/shouji_2.png" mode=""></image>
				<input v-model="username" type="text" placeholder-class="placeholder" placeholder="输入账号登录">
			</view>
			<view class="login-item">
				<image src="../../static/mima.png" mode=""></image>
				<input v-model="password" password type="text" placeholder-class="placeholder" placeholder="输入密码">
			</view>
			<view class="btnv">
				<view class="btn" @click="login">登录</view>
			</view>
			 <view class="btnv">
			 	<view class="btn" @click="toSign">无账号，点击注册</view>
			 </view>
			<view class="login-desc">
				登录表示同意
				<a href="#">《网联花甲用户协议》</a>
			</view>
			<view class="friend-style">
				<view class="borders"></view>
				<view class="friend-title">无账号，点击注册</view>
				<view class="borders"></view>
			</view>
			<view class="QQ-login">
				<view class="friend-login">
					<view class="friend-img">
						<image src="../../static/qq_2.png" mode=""></image>
					</view>
					<view class="friend-desc">
						QQ
					</view>
				</view>
				<view class="friend-login">
					<view class="friend-img">
						<image src="../../static/wxchat.png" mode=""></image>
					</view>
					<view class="friend-desc">
						微信
					</view>
				</view>
				<view class="friend-login">
					<view class="friend-img">
						<image src="../../static/weibo.png" mode=""></image>
					</view>
					<view class="friend-desc">
						微博
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				title:"登陆",
				username: "",
				password: "",
				token:"",
			}
		},
		components:{},
		methods: {
			toSign(){
				uni.navigateTo({
					url:"/pages/user/signup"
				})
			},
			gotoDetail() {
				uni.navigateTo({
					url: "mallMessage"
				})
			},
			login(){
				let that = this
				uni.request({
					url:'https://link.netlinkold.cn/login',
					method: 'POST',
					data:{
						username:this.username,
						password:this.password
					},
					success:(res)  =>{
						if(res.data.code == "200"){
							that.token = res.data.token
							uni.setStorage({
								key:'token',
								data:that.token,
							})
							uni.navigateBack({
								delta:1,
							})
						}else{
							uni.showModal({
							    title: '提示',
							    content: '账号不存在或密码错误',
							    success: function (res) {
							       
							    }
							})
							console.log(this.username)
							console.log(this.password)
						}
					},
					fail:(res)  =>{
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		
		
		width: 100%;
		height: 800px;
		background-color: #637e96;
		/* overflow: hidden; */
	}

	.logo {
		height: 30vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.regist {
		position: fixed;
		top: 0.2rem;
		right: .2rem;
		color: #fff;
		font-size: 32px;
	}

	.logo image {
		width: 200px;
		height: 200px;
	}

	.mobile {
		height: 10vh;
		width: 100%;
		display: flex;
		color: #fff;
		align-items: center;
	}

	.mobile image {
		margin-top: 20px;
		width: 34px;
		height: 40px;
		margin-right: 10px;
	}

	.mobile-item {
		width: 50%;
		line-height: 10vh;
		height: 10vh;
		text-align: center;
		box-sizing: border-box;
	}

	.selectd {
		color: #CD6839;
	}

	.login {
		height: 80vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 0.4rem;
		box-sizing: border-box;
	}

	.login-item {
		position: relative;
	}

	.login image {
		width: 13px;
		height: 20px;
		
		top: 2px;
		left: 10px;
	}

	.login input {
		font-size: 15px;
		width: 100%;
		height: 3rem;
		border-radius: 0.6rem;
		margin-bottom: 0.5rem;
		padding-left: 1rem;
		background: none;
		box-sizing: border-box;
		border: solid 1px #ffffff;
		color: #b6b6b6;
	}

	.placeholder {
		color: #b6b6b6;
	}

	.btn {
		width: 50%;
		height: 3rem;
		line-height: 3rem;
		border-radius: 0.6rem;
		margin-top: 1rem;
		margin-bottom: 2rem;
		text-align: center;
		background: #CD6839;
		color: #fff;
		font-size:20px;
	}
	.btnv{
		display:flex;
		justify-content:center;//子元素水平居中
		align-items:center;//子元素垂直居中
	}
	.login-desc {
		height: 4vh;
		line-height: 6vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #a7a7a7;
		font-size: 15px;
	}

	.login-desc a {
		color: #CD6839;
	}

	.friend-style {
		height: 2vh;
		width: 100%;
		margin-top: 2rem;
		margin-bottom: 0rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.friend-title {
		font-size: .28rem;
		color: #b6b6b6;
		padding: 0 0.2rem;
	}

	.borders {
		flex: 1;
		height: 2px;
		background: #b6b6b6;
	}

	.QQ-login {
		height: 30vh;
		width: 100%;
		display: flex;
	}

	.friend-login {
		width: 33.33%;
		height: 15vh;
		display: flex;
		flex-direction: column;
	}

	.friend-img {
		height: 10vh;
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.friend-img image {
		position: absolute;
		left: 50%;
		margin-left:-25px;
		width: 50px;
		height: 50px;
		margin-top: 10px;
		
	}

	.friend-desc {
		height: 3vh;
		width: 100%;
		color: #b6b6b6;
		font-size: 20px;
		text-align: center;
		margin-top: 10px;
	}
</style>