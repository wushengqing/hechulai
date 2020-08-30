<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">
				审核员管理
			</template>
			<!---->
			<table-comb
					name="审核事件管理"
					ref="tableMain"
					:search-model-base="tableMainSearchModelBase"
					:showSearchBar="false"
					:get-action="$api.approve.userList"
					:showPagination="false"
					:autoFetch="false"
					@tableMounted="tableMounted"
					:get-action-where="getActionWhere">
				<!--基础查询-->
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="name" width="200" label="审核事件"></el-table-column>
					<el-table-column prop="name" label="审核员">
						<template slot-scope="props">
							{{ getUserList(props.row) }}
						</template>
					</el-table-column>
					<el-table-column label="操作" width="120">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openUserListPage(props.row)">设置审核员</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>
		<UserList ref="userListPage" @back="refreshTable" />
	</div>
</template>

<script>
  import UserList from '../ApproveUserList'
  import listMixin from "@/mixins/list.mixin";
  import { mapState } from 'vuex'
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "GenerationList",
    components: {
      UserList
	},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase: {
          keyword: '',
        },
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.d2admin.userinfo,
      }),
      getActionWhere() {
        return {
          clanId:this.clanId
        }
      }
    },
    methods: {
      getUserList(item){
        let names =  item.userList.map(user=>user.auditUserName);
       return names.join('，');
	  },
      tableMounted(){
        this.$nextTick(()=>{
          this.$refs.tableMain.fetchData();
        })
      },
      openUserListPage(item){
        this.$refs.userListPage.open(item);
      }
    },
    mounted() {

    },
  };
</script>
