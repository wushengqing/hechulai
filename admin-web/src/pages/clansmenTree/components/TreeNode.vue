<template>
  <div class="clansmen-node" >
    <div class="clansmen-node-view">
      <div class="node">
        <div class="node-wrap" >
          <div class="name" @click="openDialog(clansman,true)">
            <span class="mr5 " style="color:#409EFF">{{clansman.scName}}</span>
            <span class="">{{clansman.clansmanName}}</span>
						<span @click.stop="showMore=!showMore" title="收起" style="margin-left: 5px;" >
							<i v-if="showMore" class="el-icon-caret-bottom"></i>
							<i v-else class="el-icon-caret-top"></i>
						</span>
          </div>
        </div>
        <div class="add">
          <el-button v-if="showMore" icon="el-icon-circle-plus" style="font-size: 18px; margin-left:2px;padding: 4px" circle @click="openDialog(clansman)" size="mini" title="添加子嗣"></el-button>
					<el-button v-if="!showMore" @click="showMore=true" icon="el-icon-more-outline" style="font-size: 18px; margin-left:2px;padding: 4px" circle :title="`展开:${clansman.clansmanName}子嗣...`"></el-button>
        </div>
      </div>

      <div class="clansmen-tree border"  v-if="clansman.children.length>0 && showMore">
          <TreeNode v-for=" item in clansman.children" @getData="getData" :clansman="item"></TreeNode>
      </div>
    </div>
		<el-dialog style="text-align: left" :title="dialogVO.id?'编辑宗亲信息':'添加子嗣'" :visible.sync="dialogShow" :close-on-click-modal="false" width="800px">
			<el-form ref="dialogVO" :model="dialogVO" label-width="100px" :rules="rules" style="text-align: left" v-loading="loading">
				<el-form-item label="宗亲姓名：" prop="clansmanName">
					<el-input class="w200" v-model="dialogVO.clansmanName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="宗亲房系：" prop="directoryName">
					{{ dialogVO.directoryName }}
				</el-form-item>
				<el-form-item label="宗亲头像：" prop="headFileId">
					<el-upload
						class="img-uploader"
						:action="$api.common.uploadAction"
						:data="fileData"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="dialogVO.headFileUrl" :src="dialogVO.headFileUrl" class="img-item" style="margin-right: 0" />
						<i v-else class="el-icon-plus img-uploader-icon"></i>
					</el-upload>
					<span class="color-grey" style="vertical-align: bottom"> 请上传 小于2M的jpg 图片</span>
				</el-form-item>
				<el-form-item label="出生日期：" prop="name">
					<el-input  class="w200"  v-model="dialogVO.clansmanBirthDay" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="去世日期：" prop="name">
					<el-input  class="w200"  v-model="dialogVO.clansmanendDay" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item prop="clansmanDec" label="宗亲简介：">
					<el-input
						v-model="dialogVO.clansmanDec"
						type="textarea"
						:rows="2"
						placeholder="请输入">
					</el-input>
				</el-form-item>
				<el-form-item label="夫人列表：" width="180">
					<el-table :data="dialogVO.spouseDtoList" style="width: 100%" border size="mini">
						<el-table-column prop="spouseName" label="姓名" width="120">
							<template slot-scope="props">
								<el-input v-model="props.row.spouseName" placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="spouseBirthDay" label="出生日期" width="135">
							<template slot-scope="props">
								<el-input v-model="props.row.spouseBirthDay" placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="spouseendDay" label="死亡日期" width="135">
							<template slot-scope="props">
								<el-input v-model="props.row.spouseendDay" placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="简介">
							<template slot-scope="props">
								<el-input v-model="props.row.spouseDec" placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="操作" width="100">
							<template slot-scope="scope">
								<el-button
									type="primary"
									circle
									size="mini"
									title="添加到本条记录后面"
									@click="addWife(scope.$index)"
									icon="el-icon-circle-plus-outline"></el-button>
								<el-button
									type="danger"
									title="删除"
									circle
									size="mini"
									@click="deleteWife(scope.$index)"
									icon="el-icon-delete"></el-button>
							</template>
						</el-table-column>
					</el-table>

				</el-form-item>
				<el-form-item label="女儿：" width="180">
					<el-table :data="dialogVO.daughterDtoList" style="width: 100%" border size="mini">
						<el-table-column prop="daughterName" label="姓名" width="120">
							<template slot-scope="props">
								<el-input v-model="props.row.daughterName" placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="daughterBirthDay" label="出生日期" width="135">
							<template slot-scope="props">
								<el-input v-model="props.row.daughterBirthDay" placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="daughterendDay" label="死亡日期" width="135">
							<template slot-scope="props">
								<el-input v-model="props.row.daughterendDay" placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="简介">
							<template slot-scope="props">
								<el-input v-model="props.row.daughterDec" placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="操作" width="100">
							<template slot-scope="scope">
								<el-button
									type="primary"
									circle
									size="mini"
									title="添加到本条记录后面"
									@click="addDaughter(scope.$index)"
									icon="el-icon-circle-plus-outline"></el-button>
								<el-button
									type="danger"
									title="删除"
									circle
									size="mini"
									@click="deleteDaughter(scope.$index)"
									icon="el-icon-delete"></el-button>
							</template>
						</el-table-column>
					</el-table>

				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="danger" @click="deleteClansmen">删 除</el-button>
				<el-button type="primary" @click="save">保 存</el-button>
				<el-button @click="dialogShow = false">取 消</el-button>
			</div>
		</el-dialog>

  </div>

</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import { cloneDeep } from 'lodash';
  const defaultDialogVO = {
    id: '',
    clanId: '',
    scId: '',
    headFileId:'',
    headFileUrl:'',
    directoryId: '',
    directoryName:'',
    parentId: '',
    clansmanName: '',
    clansmanBirthDay:'',
    clansmanendDay: '',
    clansmanDec: '',
    auditUserId: 0,
    spouseDtoList: [
      {
        spouseName:'',
        spouseBirthDay:'',
        spouseendDay:'',
        spouseDec:''
      },
    ],
		daughterDtoList: [
	  {
	    daughterName:'',
	    daughterBirthDay:'',
	    daughterendDay:'',
	    daughterDec:''
	  },
	]
  }
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "ClansmenTreeNode",
    components: {},
    mixins: [
      listMixin
    ],
    props:{
      clansman:{
        type:Object,
        default:[]
      }
    },
    data() {
      return {
        clansmenList:[],
        dialogShow:false,
        showMore:true,
        loading:false,
        fileData:{
          defaultSuffix:'',
        },
        branchList:[],
        dialogVO:cloneDeep(defaultDialogVO),
        rules:{}
      };
    },
    computed: {
      getActionWhere() {
        return {
          clanId:this.clanId
        }
      },
    },
    methods: {
      //打开子嗣或者编辑
      openDialog(vo,edit){
        this.dialogShow = true;
        if(edit){
          //编辑
					this.dialogVO.id = vo.id;
					this.loading = true;
          //查询房系
					this.$api.branch.list({
            clanManId:vo.parentId
					}).then(res=>{
					  console.log(res);
					});
          //查询宗亲信息
          this.$api.clansmen.detail({
            clanId:this.clanId,
            clansmanId:vo.clansmanId,
					}).then(res=>{
					  if(res.code===0){
              this.loading = false;
              this.dialogVO={
                id:res.data[0].id,
                headFileUrl:res.data[0].headFileUrl,
                headFileId:res.data[0].headFileId,
                clansmanId:res.data[0].clansmanId,
                auditUserId: res.data[0].auditUserId,
                clanId:this.clanId,
                clansmanBirthDay:res.data[0].clansmanBirthDay,
                clansmanDec:res.data[0].clansmanDec,
                clansmanName:res.data[0].clansmanName,
                directoryName:res.data[0].directoryName,
                clansmanendDay:res.data[0].clansmanendDay,
                directoryId:res.data[0].directoryId,
                parentId:res.data[0].parentId,
                scId:res.data[0].scId,
                spouseDtoList:res.data[0].spouseDtoList,
                daughterDtoList:res.data[0].daughterDtoList
              };
              if(this.dialogVO.spouseDtoList.length===0){
                this.addWife(0)
              }
              if(this.dialogVO.daughterDtoList.length===0){
                this.addDaughter(0)
              }
						}else{

						}
					});
        }else{
          //添加子嗣
          this.dialogVO={
            auditUserId:'',
            clanId:this.clanId,
            clansmanBirthDay: "",
            clansmanDec: "",
            clansmanName: "",
            clansmanendDay: "",
            directoryId:vo.directoryId,
            parentId:vo.clansmanId,
            scId:vo.scId,
            spouseDtoList: [{spouseName: "", spouseBirthDay: "", spouseendDay: "", spouseDec: ""}],
            daughterDtoList: [{daughterName: "", daughterBirthDay: "", daughterendDay: "", daughterDec: ""}]
          };
          //查询房系
				}

      },
      //添加夫人
      addWife(index){
        this.dialogVO.spouseDtoList.splice(index,0,{
          spouseName:'',
          spouseBirthDay:'',
          spouseendDay:'',
          spouseDec:''
        })
      },
      deleteWife(index){
        this.dialogVO.spouseDtoList.splice(index,1)
      },
	  //添加女儿
	  addDaughter(index){
	    this.dialogVO.daughterDtoList.splice(index,0,{
	      daughterName:'',
	      daughterBirthDay:'',
	      daughterendDay:'',
	      daughterDec:''
	    })
	  },
	  //删除女儿
	  deleteDaughter(index){
	    this.dialogVO.daughterDtoList.splice(index,1)
	  },
      getData(){
        this.$emit('getData');
      },
      handleAvatarSuccess(res, file) {
        this.dialogVO.headFileUrl =  res.uploadedImgUrl;
        this.dialogVO.headFileId = res.id;
      },
      beforeAvatarUpload(file) {
        const isIMG = file.type === 'image/jpeg'||  file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isIMG) {
          this.$message.error('上传头像图片只能是 JPG,PNG格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        this.fileData.defaultSuffix = '.'+file.name.split('.').pop();
        return isIMG && isLt10M;
      },
			//删除
      deleteClansmen(){
        this.$msgbox({
          title: '提示',
          message: `删除本宗亲会导致该宗亲下所有子孙宗亲一并删除，请再次确认！`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            let vo = cloneDeep(this.dialogVO);
            vo.state = 1;

            this.$api.clansmen.add(vo).then(res => {
              if (res.code == 0) {
                this.dialogShow = false;
                this.getData();
                this.$message.success('删除成功!')
              } else {
                this.$message.error(res.msg)
              }
            })

          }
        }).catch(() => {
        })
			},
      save(){
        this.$refs['dialogVO'].validate((valid) => {
          if (valid) {
            let vo = cloneDeep(this.dialogVO);
            vo.clanId = this.clanId;
            vo.auditUserId = this.userInfo.userId;

            vo.spouseDtoList = vo.spouseDtoList.filter(item=>item.spouseName);
            vo.daughterDtoList = vo.daughterDtoList.filter(item=>item.daughterName);

            this.$api.clansmen.add(vo).then(res => {
              if (res.code == 0) {
                this.dialogShow = false;
                this.getData();
                this.$message.success(vo.id ? '修改成功！':'新增成功！');
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            return false;
          }
        });
      }
    },
    mounted() {
    }
  };
</script>
