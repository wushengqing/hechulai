(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/union/union"],{4532:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(e("a34a")),i=e("2f62");function u(n){return n&&n.__esModule?n:{default:n}}function o(n,t,e,r,i,u,o){try{var c=n[u](o),a=c.value}catch(s){return void e(s)}c.done?t(a):Promise.resolve(a).then(r,i)}function c(n){return function(){var t=this,e=arguments;return new Promise((function(r,i){var u=n.apply(t,e);function c(n){o(u,r,i,c,a,"next",n)}function a(n){o(u,r,i,c,a,"throw",n)}c(void 0)}))}}function a(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function s(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?a(Object(e),!0).forEach((function(t){f(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):a(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function f(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var l=function(){e.e("components/uni-list/uni-list").then(function(){return resolve(e("18fd"))}.bind(null,e)).catch(e.oe)},d=function(){e.e("components/uni-list-item/uni-list-item").then(function(){return resolve(e("5cd0"))}.bind(null,e)).catch(e.oe)},p={components:{uniList:l,uniListItem:d},data:function(){return{unionList:[]}},methods:s({},(0,i.mapMutations)(["setClanInfo"]),{getClanList:function(){var n=c(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,this.$api.request.getClanList();case 2:this.unionList=n.sent;case 3:case"end":return n.stop()}}),n,this)})));function t(){return n.apply(this,arguments)}return t}(),changeClanId:function(t){this.setClanInfo(t),n.reLaunch({url:"/pages/index/index"})}}),onLoad:function(){this.getClanList()}};t.default=p}).call(this,e("543d")["default"])},5837:function(n,t,e){"use strict";(function(n){e("12ac"),e("921b");r(e("66fd"));var t=r(e("6542"));function r(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"62a4":function(n,t,e){"use strict";var r={"uni-list-item":function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"5cd0"))}},i=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return r}))},6542:function(n,t,e){"use strict";e.r(t);var r=e("62a4"),i=e("92c4");for(var u in i)"default"!==u&&function(n){e.d(t,n,(function(){return i[n]}))}(u);var o,c=e("f0c5"),a=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,"47fd63e7",null,!1,r["a"],o);t["default"]=a.exports},"92c4":function(n,t,e){"use strict";e.r(t);var r=e("4532"),i=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=i.a}},[["5837","common/runtime","common/vendor"]]]);