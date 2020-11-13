<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">
				{{ detailVo.circleName || '宗族圈详情' }}
			</template>
			<div class=" circle-view">
				<div class="list">
					<div class="list-icon">
						<img :src="detailVo.circleFileUrl" />
					</div>
					<div class="list-content">
						<div class="name">
							<span class="">话题数：<span class="ml10 color-error">{{ detailVo.contentNum }}</span></span>
							<span class="ml50 ">已关注：<span class="ml10 color-green">{{ detailVo.memberNum }}</span></span>
						</div>
						<div class="dec">{{detailVo.circleDec}}</div>
						<div class="content ellipsis">{{detailVo.circleContent}}</div>
					</div>
				</div>
			</div>
			<el-tabs v-model="listType" @tab-click="changeListType">
				<el-tab-pane label="文章列表" name="article"></el-tab-pane>
				<el-tab-pane label="关注列表" name="user"></el-tab-pane>
			</el-tabs>
			<!---->
			<table-comb
				name="用户管理"
				ref="tableMain"
				:search-model-base="tableMainSearchModelBase"
				:get-action="listAction"
				:get-action-where="getActionWhere">
				<!--基础查询-->
				<template slot="baseSearchForm" slot-scope="scope">
					<el-input placeholder="请输入文章标题" prefix-icon="el-icon-search" clearable v-model="scope.form.keyword" style="width: 250px; margin-left: 10px; margin-right: 10px">
					</el-input>
					<!-- <el-button class="fr ml10" @click="addRubbish">新增</el-button> -->
				</template>
				<!--表格-->
				<template slot="tableColumns" v-if="listType==='article'">
					<el-table-column prop="circleContent" label="文章标题" width="500">
					</el-table-column>
					<el-table-column prop="clanManName" label="作者">
					</el-table-column>
					<el-table-column prop="auditUserName" label="审核员">
					</el-table-column>
					<el-table-column prop="goodNum" label="点赞数">
					</el-table-column>
					<el-table-column prop="commentNum" label="评论数">
					</el-table-column>
					<el-table-column prop="createTime" label="发布时间">
					</el-table-column>
					<!--<el-table-column prop="auditState" label="是否审核">
					</el-table-column>-->
				</template>
				<template slot="tableColumns" v-if="listType==='user'">
					<el-table-column prop="clanManHeadUrl" label="宗亲头像" >
						<template slot-scope="props">
							<el-avatar :size="60" :src="props.row.clanManHeadUrl"></el-avatar>
						</template>
					</el-table-column>
					<el-table-column prop="clanManName" label="宗亲名称">
					</el-table-column>
					<el-table-column prop="createTime" label="关注时间">
					</el-table-column>
					<el-table-column prop="auditUserName" label="审核员">
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>

	</div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import { cloneDeep } from 'lodash';

  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "CircleDetail",
    components: {

    },
    mixins: [
      listMixin
    ],
    data() {
      return {
        //圈子列表
        tableMainSearchModelBase: {
          keyword: '',
          categoryId: ''
        },
        listAction:this.$api.circle.article,
				id:'',
        detailVo:{},
				//列表类型
				listType:'article'


      };
    },
    computed: {
      getActionWhere() {
        if(this.listType==='article'){
          return {
            circleId:this.id,
            clanId:this.clanId
          }
				}else{
          return {
            id:this.id,
          }
				}

      }
    },
    methods: {
      getData(){
        this.$api.circle.detail({
					id:this.id
				}).then(res=>{
				  this.detailVo = res.data;
				})
			},
      changeListType(tab, event){
        console.log(tab,event)
        this.listType = tab.name;
        if(this.listType==='article'){
          this.listAction = this.$api.circle.article;
				}else{
          this.listAction = this.$api.circle.user;
        }
        this.$nextTick(()=>{
          this.$refs.tableMain.fetchData(1);
				})
			},
    },
    mounted() {
    },
		watch:{
      '$route.params.id': {
        immediate: true,
        handler(id) {
          this.id = parseInt(id);
          this.getData()
        },
      },
		}
  };
</script>
<style lang='scss' scoped>

</style>
