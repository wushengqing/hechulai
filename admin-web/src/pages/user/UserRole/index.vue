<template>
	<transition name="edit">
		<d2-container v-if="showPage" class="edit-panel">
			<template slot="header">
				<i title="后退" class="el-icon-back" @click="back"></i>
				<span style="cursor:pointer" @click="back">用户角色管理</span>
			</template>
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column prop="name" label="角色名称"></el-table-column>
				<el-table-column prop="" label="操作" width="200px">
					<template slot-scope="props">
						<el-button v-if="owned(props.row.id)" type="text" size="mini" @click="delUserAccessRel(props.row)">删除</el-button>
						<el-button v-else="owned(props.row.id)" type="text" size="mini" @click="addOrUpdateUserAccessRel(props.row)">添加</el-button>
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
        dialogShow:false,
        userRoleList:[],
        userId:'',
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
      //判断是否拥有了该角色
      owned(id){
        return this.userRoleList.filter(item=>item.accessId===id).length>0
      },
      open(userId){
        this.userId = userId;
        //获取用户角色列表
        let Promise1 = this.$api.user.getUserAccessRelList({userId});
        let Promise2 = this.$api.role.list();
        Promise.all([Promise1,Promise2]).then(res=>{
          this.userRoleList = res[0].data;
          if(this.userInfo.userId!=="1"){
            res[1].data = res[1].data.filter(item=>item.id !==1)
          }
          this.tableData = res[1].data
        })
        this.showPage = true;

      },
      back(){
        this.showPage= false;
        this.$emit('back')
      },
			//删除角色
      delUserAccessRel(item){
        this.$api.user.delUserAccessRel({
          userId:this.userId,
          relId:item.id
        }).then(res=>{
          if(res.code===0){
            this.$message.success('删除成功！');
            //刷新列表
            this.open(this.userId);
          }else{
            this.$message.error(res.msg)
          }
        })
			},
      //添加角色
      addOrUpdateUserAccessRel(item){
        this.$api.user.addOrUpdateUserAccessRel({
          userId:this.userId,
          accessId:item.id
        }).then(res=>{
          if(res.code===0){
            this.$message.success('新增成功！');
            //刷新列表
            this.open(this.userId);
          }else{
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {

    }
  };
</script>
