(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-bindLineage-index"],{"18cf":function(e,t,n){var i=n("2069");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("4f06").default;a("11066309",i,!0,{sourceMap:!1,shadowMode:!1})},2069:function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,".uni-form-item .title[data-v-db02a9ba]{padding:%?20?% 0}",""]),e.exports=t},"3e17":function(e,t,n){"use strict";n.r(t);var i=n("a095"),a=n("e1f6");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("e1ca");var s,c=n("f0c5"),o=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"db02a9ba",null,!1,i["a"],s);t["default"]=o.exports},a095:function(e,t,n){"use strict";var i,a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"container form-box"},[n("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)},reset:function(t){arguments[0]=t=e.$handleEvent(t),e.formReset.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"form-item"},[n("v-uni-view",{staticClass:"label"},[e._v("祖宗名称")]),n("v-uni-view",{staticClass:"field"},[e._v(e._s(e.clanInfo.name))])],1),n("v-uni-view",{staticClass:"form-item"},[n("v-uni-view",{staticClass:"label"},[e._v("您的世称")]),n("v-uni-view",{staticClass:"field"},[n("v-uni-picker",{attrs:{value:e.generationIndex,range:e.generationList,"range-key":"name"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.changeGeneration.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.generationList[e.generationIndex].name))])],1)],1)],1),n("v-uni-view",{staticClass:"form-item"},[n("v-uni-view",{staticClass:"label"},[e._v("您的房系")]),n("v-uni-view",{staticClass:"field"},[n("v-uni-picker",{attrs:{value:e.directoryIndex,range:e.directoryList,"range-key":"name"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.changeDirectory.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(0===e.directoryList.length?"":e.directoryList[e.directoryIndex].name))])],1)],1)],1),n("v-uni-view",{staticClass:"form-item"},[n("v-uni-view",{staticClass:"label"},[e._v("您的名字")]),n("v-uni-view",{staticClass:"field"},[n("v-uni-picker",{attrs:{value:e.clanUserRelIndex,range:e.clanUserRelList,"range-key":"clansmanName"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.changeClanUserRel.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(0===e.clanUserRelList.length?"":e.clanUserRelList[e.clanUserRelIndex].clansmanName))])],1)],1)],1),n("v-uni-view",{staticClass:"form-item"},[n("v-uni-view",{staticClass:"label"},[e._v("备注信息")]),n("v-uni-view",{staticClass:"field"},[n("v-uni-textarea",{attrs:{"placeholder-style":"color:#aaa",placeholder:"请描述您的宗亲信息,如父亲,兄弟,信息越齐全,审核通过的成功率越高"}})],1)],1),n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary","form-type":"submit"}},[e._v("提交申请")])],1)],1)],1)},r=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}))},b8be:function(e,t,n){"use strict";var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("8e6e"),n("ac6a"),n("456d"),n("96cf");var a=i(n("3b8d")),r=i(n("bd86")),s=n("2f62");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,r.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={computed:o({},(0,s.mapState)(["userInfo","clanInfo"])),data:function(){return{generationList:[],generationIndex:0,directoryList:[],directoryIndex:0,clanUserRelList:[],clanUserRelIndex:0,formData:{generationId:"",directoryId:"",name:""}}},methods:{formSubmit:function(e){var t=this.$api.request.userRelClanMain({id:this.userInfo.id,clanId:this.clanInfo.id,clanManId:this.formData.clanUserRelId});console.log(t)},formReset:function(e){console.log("清空数据")},getGenerationList:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.request.generationList({clanId:this.clanInfo.id});case 2:this.generationList=e.sent;case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getDirectoryList:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.request.directoryList({clanId:this.clanInfo.id});case 2:this.directoryList=e.sent;case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getClanUserRelList:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.request.clanUserRelList({clanId:this.clanInfo.id,currentPage:0,pageSize:1e4,scId:this.formData.generationId});case 2:this.clanUserRelList=e.sent;case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),changeGeneration:function(e){this.generationIndex=e.target.value,this.formData.generationId=this.generationList[e.target.value].id,this.getDirectoryList()},changeDirectory:function(e){this.directoryIndex=e.target.value,this.formData.directoryId=this.directoryList[e.target.value].id,this.getClanUserRelList()},changeClanUserRel:function(e){this.clanUserRelIndex=e.target.value,this.formData.clanUserRelId=this.clanUserRelList[e.target.value].id}},onLoad:function(){this.getGenerationList()}};t.default=u},e1ca:function(e,t,n){"use strict";var i=n("18cf"),a=n.n(i);a.a},e1f6:function(e,t,n){"use strict";n.r(t);var i=n("b8be"),a=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a}}]);