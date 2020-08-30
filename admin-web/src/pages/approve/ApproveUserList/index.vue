<template>
	<transition name="edit">
		<d2-container v-if="showPage" class="edit-panel">
			<template slot="header">
				<i title="后退" class="el-icon-back" @click="back"></i>
				<span style="cursor:pointer" @click="back">{{approveVo.name}}</span>
				<el-button class="fr" style="margin: -8px 0" type="primary" @click="openDialog()">添加审核员</el-button>
			</template>
			<el-table
				:data="approveVo.userList"
				border
				style="width: 100%">
				<el-table-column prop="auditUserName" label="宗亲名称"></el-table-column>
				<el-table-column prop="fxName" label="房系"></el-table-column>
				<el-table-column prop="scName" label="世称"></el-table-column>
				<el-table-column prop="userAccessName" label="管理角色"></el-table-column>
				<el-table-column prop="" label="操作" width="200px">
					<template slot-scope="props">
						<el-button type="text" size="mini" @click="del(props.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog title="新增审核员" :visible.sync="dialogShow" width="400px" append-to-body>
				<el-form ref="dialogVO" :model="dialogVO" label-width="120px" :rules="rules">
					<el-form-item label="审核员房系：" prop="directoryId">
						<el-select v-model="dialogVO.directoryId" placeholder="请选择房系" @change="changeDirectory()">
							<el-option
									v-for="item in directoryList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核员世称：" prop="generationId">
						<el-select v-model="dialogVO.generationId" placeholder="请选择世称" :disabled="!dialogVO.directoryId"  @change="changeGeneration()">
							<el-option
									v-for="item in generationList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核员：" prop="auditUserClanManId">
						<el-select v-model="dialogVO.auditUserClanManId" placeholder="请选择世称" :disabled="!dialogVO.generationId"  @change="changeAuditUserClanMan()">
							<el-option
									v-for="item in auditUserClanManList"
									:key="item.clansmanId"
									:label="item.clansmanName"
									:value="item.clansmanId">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="save()" :loading="btnLoading">保 存</el-button>
					<el-button @click="dialogShow = false">取 消</el-button>
				</div>
			</el-dialog>
		</d2-container>
	</transition>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "ApproveUserList",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableData:[],
        showPage:false,
        dialogShow:false,
		approveVo:{},
        dialogVO:{
          auditUserClanManId:'',
          directoryId:'',
          generationId:'',
          auditUserName:'',
          userAccessName:'',
          auditUserId:'',
		},
        directoryList:[],
        generationList:[],
        auditUserClanManList:[],
        rules:{
          directoryId: [{required: true, message: '请输入'}, ],
          generationId: [{required: true, message: '请输入'}, ],
          auditUserClanManId: [{required: true, message: '请输入'}, ],
        },
		btnLoading:false
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
      //判断已经添加过了该成员
      owned(id){
        return this.approveVo.userList.find(item=>item.auditUserClanManId===this.dialogVO.auditUserClanManId)
	  },
      open(item){
        this.approveVo = item;
		this.showPage = true;

      },
      back(){
        this.showPage= false;
        this.$emit('back')
      },
      openDialog(){
        this.dialogShow =true;
        //获取角色列表
	  },
	  //获取房系
      getDirectoryList() {
        //获取房系列表
        this.$api.branch.list({clanId: this.clanId}).then(res=>{
          this.directoryList = res.data;
		})
      },
      changeDirectory(){
        this.dialogVO.generationId='';
		this.dialogVO.auditUserClanManId='';
        this.generationList = [];
		this.auditUserClanManList = [];
        this.getGenerationList();
	  },
	  //获取世称
	  getGenerationList() {
        //获取世称列表
        this.generationList = this.directoryList.filter(item=>{
          return item.id === this.dialogVO.directoryId
        })[0].scIds||[]
      },
      changeGeneration(){
        this.dialogVO.auditUserClanManId='';
        this.auditUserClanManList = [];
        this.getClanUserRelList()
	  },
	  //获取宗亲
      getClanUserRelList() {
        //获取宗亲列表
        this.$api.user.getClanUserRelList({
          clanId: this.clanId,
          currentPage:0,
          pageSize:10000,
          scId:this.dialogVO.generationId,
          directoryId:this.dialogVO.directoryId,
        }).then(res=>{
          this.auditUserClanManList = res.data
		})
      },
	  //切换宗亲
      changeAuditUserClanMan(){
        let user = this.auditUserClanManList.find(item=>item.clansmanId===this.dialogVO.auditUserClanManId);
        this.dialogVO = {
		  ...this.dialogVO,
          auditUserName:user.clansmanName,
          userAccessName:user.userAccessName,
          auditUserId:user.userId,
          scName:user.scName
		}
	  },
	  //删除审核员
      del(){
        this.$msgbox({
          title: '提示',
          message: `确定要删除该审核员？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            //未开发
            this.$message.error('接口未开发')
			return;
            this.$api.approve.del().then(res=>{
              if(res.code===0){
                this.$message.success('删除成功！');
                this.approveVo.userList.s();
              }else{
                this.$message.error(res.msg)
              }
			})
          }
        }).catch(() => {
        })
	  },
	  //添加角色
      save(){
        this.$refs['dialogVO'].validate((valid) => {
          if (!valid) {return;}
          if(this.owned()){
            this.$message.error('已经存在该审核员');
		  };
          this.btnLoading = true;
          this.$api.approve.save({
            clanId: this.clanId,
            auditId:this.approveVo.id,
            clanManId:this.dialogVO.auditUserClanManId
		  }).then(res=>{
            this.btnLoading = false;
            if(res.code===0){
              this.dialogShow= false;
              this.$message.success('新增成功！');
              this.approveVo.userList.push({
                auditUserName:this.dialogVO.auditUserName,
                userAccessName:this.dialogVO.userAccessName,
                auditUserId:this.dialogVO.auditUserId,
                auditUserClanManId:this.dialogVO.auditUserClanManId
              });
              this.dialogVO={
                auditUserClanManId:'',
                directoryId:'',
                generationId:'',
                auditUserName:'',
                userAccessName:'',
                auditUserId:'',
              };
              this.$nextTick(()=>{
                this.$refs['dialogVO'].clearValidate();
			  })

            }else{
              this.$message.error(res.msg)
            }
		  })
        });
	  }
    },
    mounted() {
      this.getDirectoryList();

    }
  };
</script>
