(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/OldQuestion/Que"],{"055b":function(t,n,e){"use strict";e.r(n);var o=e("f7ff"),i=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=i.a},5137:function(t,n,e){"use strict";(function(t){e("58fa");o(e("66fd"));var n=o(e("5b75"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},"5b75":function(t,n,e){"use strict";e.r(n);var o=e("aa6f"),i=e("055b");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("7473");var a,l=e("f0c5"),s=Object(l["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=s.exports},7473:function(t,n,e){"use strict";var o=e("893d"),i=e.n(o);i.a},"893d":function(t,n,e){},aa6f:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var o={uTabs:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-tabs/u-tabs")]).then(e.bind(null,"2bd8"))},uEmpty:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-empty/u-empty")]).then(e.bind(null,"2f7b"))},uDivider:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-divider/u-divider")]).then(e.bind(null,"49d4"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,null!=t.indexList?t.__map(t.indexList,(function(n,e){var o=t.__get_orig(n),i=t.timestampToTime(n.create_time);return{$orig:o,m0:i}})):null);t.$mp.data=Object.assign({},{$root:{l0:e}})},u=[]},f7ff:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{title:"Hello",oldname:"",indexList:{},token:"",amount:10,page:1,loadStatu:!1,listStatus:"loading",contentText:{contentdown:"加载更多",contentrefresh:"正在加载...",contentnomore:"我是有底线的"},userId:"",oids:[],oldids:[],list1:[{name:"老人1"},{name:"老人2"}],oldIndex:0,res:{}}},onShow:function(){var n=this;this.amount=10;var e="";t.getStorage({key:"UserId",success:function(t){n.userId=t.data}}),t.getStorage({key:"token",success:function(o){if(n.token=o.data,""==o.data)return t.showToast({title:"未登录，请登录",icon:"error",duration:1e3}),n.question_list=null,void(n.indexList=null);t.request({url:"https://link.netlinkold.cn/api/user/getOldByUid",method:"post",header:{Authorization:"Bearer "+n.token},success:function(o){if(null==o.data.oldId)return n.indexList=null,void console.log(o);n.oldids=o.data.oldId.split("+"),t.request({url:"https://link.netlinkold.cn/api/user/get_user_name/"+n.oldids[0],method:"post",header:{Authorization:"Bearer "+n.token},success:function(o){e=o.data.name,t.request({url:"https://link.netlinkold.cn/api/question/get_question_by_id/"+e+"/"+n.page+"/"+n.amount,method:"post",header:{Authorization:"Bearer "+n.token},success:function(t){n.indexList=t.data.question_list,n.listStatus="loading",n.loadStatu=!1,console.log(t)},fail:function(t){console.log(t)}})},fail:function(t){console.log(t)}})},fail:function(t){console.log(t)}})},fail:function(){t.showToast({title:"未登录，请登录",icon:"error",duration:1e3})}})},onLoad:function(){this.amount=10},onReachBottom:function(){console.log("触底’"),this.loadmore()},methods:{toLogin:function(){t.navigateTo({url:"/pages/user/login"})},click:function(n){var e=this,o=this;this.amount=10,o.oldIndex=n.index;var i="";t.request({url:"https://link.netlinkold.cn/api/user/getOldByUid",method:"post",header:{Authorization:"Bearer "+o.token},success:function(u){o.oldids=u.data.oldId.split("+"),t.request({url:"https://link.netlinkold.cn/api/user/get_user_name/"+o.oldids[n.index],method:"post",header:{Authorization:"Bearer "+o.token},success:function(n){i=n.data.name,t.request({url:"https://link.netlinkold.cn/api/question/get_question_by_id/"+i+"/"+e.page+"/"+e.amount,method:"post",header:{Authorization:"Bearer "+o.token},success:function(t){console.log(t),o.res=t,null!=t.data.question_list?(o.indexList=t.data.question_list,o.listStatus="loading",o.loadStatu=!1):o.indexList=null},fail:function(t){o.indexList=null,console.log(t)}}),console.log(i)},fail:function(t){console.log(t)}})},fail:function(t){console.log(t)}})},toDetail:function(n){t.navigateTo({url:"./chatdetail?id="+n,animationType:"pop-in",animationDuration:200})},timestampToTime:function(t){return t=t.replace("T"," "),t=t.replace("Z"," "),t},loadmore:function(){var n=this;if(!(n.amount>=70)){n.loadStatu=!0,n.amount+=10,n.listStatus="loading";var e="";t.request({url:"https://link.netlinkold.cn/api/user/getOldByUid",method:"post",header:{Authorization:"Bearer "+n.token},success:function(o){n.oldids=o.data.oldId.split("+"),t.request({url:"https://link.netlinkold.cn/api/user/get_user_name/"+n.oldids[n.oldIndex],method:"post",header:{Authorization:"Bearer "+n.token},success:function(o){e=o.data.name,t.request({url:"https://link.netlinkold.cn/api/question/get_question_by_id/"+e+"/"+n.page+"/"+n.amount,method:"post",header:{Authorization:"Bearer "+n.token},success:function(t){console.log(t),n.res=t,null!=t.data.question_list?(n.indexList=t.data.question_list,n.listStatus="loading",n.loadStatu=!1):n.indexList=null},fail:function(t){n.indexList=null,console.log(t)}}),console.log(e)},fail:function(t){console.log(t)}})},fail:function(t){console.log(t)}})}}}};n.default=e}).call(this,e("543d")["default"])}},[["5137","common/runtime","common/vendor"]]]);