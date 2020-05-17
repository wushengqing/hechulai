<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">轮播图管理</template>

			<!---->
			<table-comb
					name="轮播图管理"
					ref="tableMain"
					:search-model-base="tableMainSearchModelBase"
					:get-action="$api.user.list"
					:get-action-where="getActionWhere"
					:afterFetchData="afterFetchData">
				<!--基础查询-->
				<template slot="baseSearchForm" slot-scope="scope">
					<el-input placeholder="请输入关键字" prefix-icon="el-icon-search" clearable v-model="scope.form.keyword" style="width: 250px; margin-left: 10px; margin-right: 10px">
					</el-input>
					 <el-button class="fr ml10" @click="openEditPage">新增</el-button>
				</template>
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="imgUrl" label="轮播图">
					</el-table-column>
					<el-table-column prop="userNum" label="标题">
					</el-table-column>
					<el-table-column prop="userNum" label="是否启用">
					</el-table-column>
					<el-table-column prop="userNum" label="是否置顶">
					</el-table-column>
					<el-table-column prop="userNum" label="外部链接">
					</el-table-column>
					<el-table-column label="操作" width="200px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="resetPassword(props.row)">预览</el-button>
							<el-button v-if="props.row.status!==1" type="text" size="mini" @click="changeUserState(props.row)">编辑</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>
		<Edit ref="editPage" @back="refreshTable" />
	</div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import Edit from '../Edit'
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "BannerList",
    components: {
      Edit,
	},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase: {
          keyword: '',
          categoryId: ''
        },
      }
    },
    computed: {
      getActionWhere() {
        return {

        }
      }
    },
    methods: {
      openEditPage(){
        this.$refs.editPage.open();
	  },
    },
    mounted() {

    }
  };
</script>
