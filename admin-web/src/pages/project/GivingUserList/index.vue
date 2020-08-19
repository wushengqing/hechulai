<template>
	<transition name="edit">
		<d2-container v-if="showPage" class="edit-panel">
			<template slot="header">
				<i title="后退" class="el-icon-back" @click="back"></i>
				<span style="cursor:pointer" @click="back">乐捐用户列表</span>
			</template>
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column prop="userName" label="乐捐宗亲"></el-table-column>
				<el-table-column prop="giveMoney" label="乐捐金额"></el-table-column>
				<el-table-column prop="giveDec" label="备注"></el-table-column>
				<el-table-column prop="auditUserName" label="审核员"></el-table-column>
				<el-table-column prop="createTime" label="申请乐捐时间"></el-table-column>
				<el-table-column prop="" label="操作" width="200px">
					<template slot-scope="props">
						<el-button v-if="owned(props.row.id)" type="text" size="mini" @click="delRubbish(props.row)">删除角色</el-button>
						<el-button v-else="owned(props.row.id)" type="text" size="mini" @click="addOrUpdateUserAccessRel(props.row)">添加角色</el-button>
					</template>
				</el-table-column>
			</el-table>
		</d2-container>
	</transition>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "UnionList",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableData:[],
        showPage:false,
        givingId:'',
      }
    },
    computed: {
      getActionWhere() {
        return {
          clanId:this.clanId
        }
      }
    },
    methods: {
      open(givingId){
        this.givingId = givingId;
        //获取用户角色列表
        this.$api.project.givingUserRelList({givingId}).then(res=>{
          this.tableData = res.data;
		});
		this.showPage = true;
      },
      back(){
        this.showPage= false;
        this.$emit('back')
      },
    },
    mounted() {

    }
  };
</script>
