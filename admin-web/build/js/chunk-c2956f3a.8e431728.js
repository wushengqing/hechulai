(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c2956f3a"],{"04a5":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"m-table-comb"},[a("section",{staticClass:"table-filter"},[a("div",{staticClass:"controls"},[e._t("controls")],2),a("el-form",{staticStyle:{"font-size":"14px"},attrs:{model:e.searchModelDataBase,"label-width":"120px",size:"small"}},[e.isShowBaseSearch?a("el-input",{staticStyle:{width:"160px"},attrs:{placeholder:"请输入关键字","prefix-icon":"el-icon-search",clearable:""},model:{value:e.searchModelDataBase.name,callback:function(t){e.$set(e.searchModelDataBase,"name",t)},expression:"searchModelDataBase.name"}}):e._e(),e._t("baseSearchForm",null,{form:this.searchModelDataBase}),e.isOpenAdvancedSearch?e._e():a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.isNotBaseSearch,expression:"!isNotBaseSearch"}],staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")]),e.searchModel?a("el-button",{staticStyle:{"margin-left":"10px"},on:{click:function(t){return e.openAdvancedSearch()}}},[e._v(e._s(e.isOpenAdvancedSearch?"关闭高级查询":"高级查询"))]):e._e()],2)],1),a("section",{directives:[{name:"show",rawName:"v-show",value:e.isOpenAdvancedSearch,expression:"isOpenAdvancedSearch"}],staticClass:"table-filter-advanced"},[a("el-form",{attrs:{model:e.searchModelData,"label-width":"120px",size:"small"}},[e._t("advancedSearchForm",null,{form:this.searchModelData}),a("div",{staticClass:"form-controls"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.search}},[e._v("查询")]),a("el-button",{attrs:{size:"small"},on:{click:e.reset}},[e._v("重置")]),a("el-button",{attrs:{size:"small"},on:{click:function(t){e.isOpenAdvancedSearch=!1}}},[e._v("取消")])],1)],2)],1),a("div",{staticClass:"table-title"},[e._t("tableTitle")],2),a("section",{staticClass:"table-content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""},on:{select:e.checkedOne,"select-all":e.checkedAll,"sort-change":e.tableSortChange}},[e._t("tableColumns")],2)],1),a("section",{directives:[{name:"show",rawName:"v-show",value:this.checkedItems&&this.checkedItems.length>0,expression:"this.checkedItems && this.checkedItems.length > 0"}]},[a("div",{staticClass:"checked-items"},[a("transition-group",{attrs:{tag:"div",name:"scale",mode:"out-in"}},e._l(this.checkedItems,function(t){return a("span",{key:t[e.customId]},[e._v(e._s(t[e.checkedDispalyName]||t.username||t.name||t.title||t[e.customId])+" "),a("i",{on:{click:function(a){return e.removeCheckedItem(t)}}})])}),0),a("a",{staticClass:"clear-all",attrs:{href:"javascript:void(0);"},on:{click:function(t){return e.removeAllCheckedItem()}}},[e._v("清空")])],1)]),e.showPagination?a("section",{staticClass:"table-paging"},[a("el-pagination",{attrs:{"current-page":e.pagingInfo.page,"page-sizes":[10,20,50,100],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.pagingInfo.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.fetchData}})],1):e._e()])},n=[],c=a("391c"),i={name:"DataTableComb",props:{name:String,getAction:Function,getActionWhere:Object,removeAction:Function,removeBatchAction:Function,isSearchAll:{type:Boolean,default:!1},isNotBaseSearch:{type:Boolean,default:!1},customId:{type:String,default:"id"},checkedDispalyName:{type:String,default:"name"},editPath:String,listPath:String,searchModel:Object,searchModelBase:{type:Object,default:function(){return{name:""}}},pagingConfig:Object,autoFetch:{type:Boolean,default:!0},sortChange:Function,afterFetchData:Function,showPagination:{type:Boolean,default:!0}},data:function(){return{loading:!0,tableData:[],checkedItems:[],isOpenAdvancedSearch:!1,sortInfo:null,pagingInfo:{size:10,page:1,totalCount:0},searchModelDataBase:{},searchModelData:{}}},watch:{searchModelBase:function(){this.searchModelDataBase=Object(c["clone"])(this.searchModelBase)},searchModel:function(){this.searchModelData=Object(c["clone"])(this.searchModel)},checkedItems:function(e,t){e.length!==t&&this.$emit("on-checked-item-change",this.checkedItems)}},computed:{isShowBaseSearch:function(){return!this.$scopedSlots.baseSearchForm}},methods:{tableSortChange:function(e){var t=e.column,a=e.prop,s=e.order;this.sortChange?this.sortChange({column:t,prop:a,order:s}):this.sortInfo=t?a+"_"+s.substr(0,3):null,this.fetchData()},checkedOne:function(e,t){var a,s=this.customId,n=e.some(function(e){return e[s]===t[s]});if(n)a=this.checkedItems.some(function(e){return e[s]===t[s]}),a||this.checkedItems.push(t);else for(var c=0;c<this.checkedItems.length;c++)if(this.checkedItems[c][s]===t[s]){this.checkedItems.splice(c,1);break}},checkedAll:function(e){var t=this;e.length>0?e.map(function(a){t.checkedOne(e,a)}):this.tableData.map(function(e){t.checkedOne([],e)})},removeCheckedItem:function(e){for(var t=this.customId,a=0;a<this.checkedItems.length;a++)if(this.checkedItems[a][t]===e[t]){this.$refs.table.toggleRowSelection(e,!1);for(var s=0;s<this.tableData.length;s++)if(this.tableData[s][t]===e[t]){this.$refs.table.toggleRowSelection(this.tableData[s],!1);break}this.checkedItems.splice(a,1);break}},removeAllCheckedItem:function(){for(var e=this.customId,t=0;t<this.checkedItems.length;t++){this.$refs.table.toggleRowSelection(this.checkedItems[t],!1);for(var a=0;a<this.tableData.length;a++)if(this.tableData[a][e]===this.checkedItems[t][e]){this.$refs.table.toggleRowSelection(this.tableData[a],!1);break}this.checkedItems.splice(t,1),t--}},initRecordChecked:function(){for(var e=this.customId,t=0;t<this.checkedItems.length;t++)for(var a=0;a<this.tableData.length;a++)if(this.checkedItems[t][e]===this.tableData[a][e]){this.$refs.table.toggleRowSelection(this.tableData[a],!0);break}},openAdvancedSearch:function(){this.isOpenAdvancedSearch=!this.isOpenAdvancedSearch},edit:function(e){this.editPath?this.$router.push({path:this.editPath+"/"+e}):this.$message.error("编辑失败，因为对应的Action没有设置")},remove:function(e){var t=this.customId,a=this;console.log(a),a.removeAction?this.$msgbox({title:"提示",message:"确定要删除该数据？",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(s){"confirm"===s&&(a.loading=!0,a.removeAction(e).then(function(s){if(0===s.code){for(var n=0;n<a.tableData.length;n++)a.tableData[n][t]===e&&(a.tableData.splice(n,1),n++);a.tableData.length>0?a.fetchData():a.fetchData(a.pagingInfo.page-1||1),a.$message.success("删除数据成功"),a.$emit("on-remove-success")}else a.$message.error(s.message);a.loading=!1}).catch(function(){a.$message.error("删除数据失败")}))}).catch(function(){}):a.$message.error("删除失败，因为对应的Action没有设置")},removeBatch:function(){var e=this,t=this.customId,a=this.checkedItems.map(function(e){return e[t]});this.removeBatchAction?0!==a.length?this.$msgbox({title:"提示",message:"确定要删除选中的数据？",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(s){"confirm"===s&&(e.loading=!0,e.removeBatchAction(a).then(function(){for(var s=0;s<e.tableData.length;s++)for(var n=0;n<a.length;n++)if(e.tableData[s][t]===a[n]){e.tableData.splice(s,1),s--;break}e.checkedItems=[],e.loading=!1,e.$message.success("删除数据成功"),e.$emit("on-remove-success")}).catch(function(){e.$message.error("删除数据失败")}))}).catch(function(){}):e.$message.warning("请选择数据"):this.$message.error("删除失败，因为对应的Action没有设置")},fetchData:function(e){var t=this;if(this.getAction){t.pagingInfo.page=e||t.pagingInfo.page||1,t.loading=!0;var a=this.getPageVo();this.getAction(a,t.pagingInfo).then(function(e){"development"===t.$env&&console.log("[DEBUG] tableData:"),"development"===t.$env&&console.log(e),t.tableData=e.data,t.pagingInfo.totalCount=e.totalCount||e.data.length,t.$nextTick(function(){t.initRecordChecked()}),t.afterFetchData&&"function"==typeof t.afterFetchData&&t.afterFetchData(),t.loading=!1}).catch(function(e){console.error(e),t.$message.error("获取数据列表失败"),t.loading=!1})}else this.$message.error("获取数据失败，因为对应的Action没有设置")},getPageVo:function(e){var t=this,a={};for(var s in this.searchModelDataBase)if(this.searchModelDataBase.hasOwnProperty(s)){console.log(s);var n=this.searchModelDataBase[s];void 0!=n&&null!=n&&""!==n&&0!==n.length&&(a[s]=this.searchModelDataBase[s])}if(this.isOpenAdvancedSearch||this.isSearchAll)for(var c in this.searchModelData)if(this.searchModelData.hasOwnProperty(c)){var i=this.searchModelData[c];void 0!=i&&""!=i&&null!=i&&0!==i.length&&(a[c]=this.searchModelData[c])}return t.sortInfo&&(a.sort=t.sortInfo),Object.assign(a,this.getActionWhere),a},reset:function(){this.searchModelData=Object(c["clone"])(this.searchModel)},handleSizeChange:function(e){this.pagingInfo.size=e,this.fetchData()},search:function(){this.fetchData(1)}},mounted:function(){var e=this;this.autoFetch?e.fetchData():e.loading=!1,this.searchModelData=Object(c["clone"])(this.searchModel),this.searchModelDataBase=Object(c["clone"])(this.searchModelBase),Object.assign(this.pagingInfo,this.pagingConfig),this.$emit("tableMounted")}},o=i,h=(a("d7f4"),a("6691")),r=Object(h["a"])(o,s,n,!1,null,"6d6d31be",null);t["default"]=r.exports},5884:function(e,t,a){},d7f4:function(e,t,a){"use strict";var s=a("5884"),n=a.n(s);n.a}}]);
//# sourceMappingURL=chunk-c2956f3a.8e431728.js.map