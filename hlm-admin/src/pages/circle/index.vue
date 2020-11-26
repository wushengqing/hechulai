<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">
				宗族圈
				<el-button @click="openDialog()" type="primary" size="medium" class="fr" style="margin: -8px 0">＋创建圈子</el-button>
			</template>
			<!---->
			<div class=" circle-view" v-loading="loading">
				<div class="list" v-for="item in circleList">
					<div class="list-icon">
						<img :src="item.circleFileUrl" />
					</div>
					<div class="list-content">
						<div class="name">
							<span class="font20">{{item.circleName}}</span>
							<el-button type="text" title="编辑">
								<i class="el-icon-edit-outline color-primary" @click="openDialog(item)"></i>
							</el-button>
							<span class="ml50 ">话题数：<span class="ml10 color-error">{{ item.contentNum }}</span></span>
							<span class="ml50 ">已关注：<span class="ml10 color-green">{{ item.memberNum }}</span></span>
							<el-button
								class="ml50"
								style="padding: 4px 10px; font-size: 12px"
								@click="openDetailPage(item)"
								type="danger"
								size="mini">进入圈子</el-button>
						</div>
						<div class="dec">{{item.circleDec}}</div>
						<div class="content ellipsis">{{item.circleContent}}</div>
					</div>

				</div>
			</div>
			<template slot="footer"></template>
		</d2-container>
		<el-dialog :title="dialogVO.id?'编辑圈子':'创建圈子'" :visible.sync="dialogShow" width="700px">
			<el-form ref="dialogVO" :model="dialogVO" label-width="100px" :rules="rules">
				<el-form-item label="名称：" prop="circleName">
					<el-input style="width: 100%" placeholder="请输入" v-model="dialogVO.circleName"></el-input>
				</el-form-item>
				<el-form-item label="简介：" prop="circleDec">
					<el-input style="width: 100%" placeholder="请输入" v-model="dialogVO.circleDec"></el-input>
				</el-form-item>
				<el-form-item label="描述：" prop="circleContent">
					<el-input
						style="width: 100%"
						type="textarea"
						maxlength="100"
						show-word-limit
						:rows="2" placeholder="100字以内"
						v-model="dialogVO.circleContent">
					</el-input>
				</el-form-item>
				<el-form-item label="封面："  prop="circleFileUrl">
					<el-upload
						class="banner-uploader"
						:action="$api.common.uploadAction"
						:data="fileData"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="dialogVO.circleFileUrl" :src="dialogVO.circleFileUrl" class="banner-image" style="width: 150px">
						<i v-else class="el-icon-plus banner-uploader-icon"></i>
					</el-upload>
					<span class="color-grey" style="vertical-align: bottom"> 请上传 小于2M的jpg 图片，最佳尺寸150X100</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="save()">保 存</el-button>
				<el-button @click="dialogShow = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import { cloneDeep } from 'lodash';

  const defaultForm = {
    id:'',
    circleName:'',
    circleContent:'',
    circleDec:'',
    circleFileId:'',
    circleFileUrl:''

  }
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "CircleIndex",
    components: {

    },
    mixins: [
      listMixin
    ],
    data() {
      return {
        //圈子列表
        circleList:[],
        fileData:{
          defaultSuffix:'',
        },
        loading:false,
        btnLoading:false,
        dialogShow:false,
        dialogVO:{},
        rules:{
          circleName: [
            { required: true, message: '请输入圈子名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          circleDec: [
            { required: true, message: '请输入简介', trigger: 'blur' },
          ],
					circleContent: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
          circleFileUrl: [
            { required: true, message: '请上传图片', trigger: 'blur' },
          ],
        },
      };
    },
    computed: {
      getActionWhere() {
        return {

        }
      }
    },
    methods: {
      fetchData(){
        if(this.loading){
          return
				}
        this.loading = true;
				this.$api.circle.getCircleList({
					clanId:this.clanId
				}).then(res=>{
				  if(res.code===0){
				    this.circleList = res.data;
					}
          this.loading = false;
				  console.log(res)
				})
			},
      openDialog(item) {
        if(!item){
          this.dialogVO = cloneDeep(defaultForm);
        }else{
          this.dialogVO  = {
            id:item.id,
            circleName:item.circleName,
            circleContent:item.circleContent,
            circleDec:item.circleDec,
            circleFileId:item.circleFileId,
            circleFileUrl:item.circleFileUrl,
					}
        }
        if (this.$refs['dialogVO']) {
          this.$nextTick(() => {
            this.$refs['dialogVO'].clearValidate();
          })
        }
        this.dialogShow = true;
      },
      handleAvatarSuccess(res, file) {
        this.dialogVO.circleFileUrl =  res.uploadedImgUrl;
        this.dialogVO.circleFileId = res.id;
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
      save() {
        this.$refs['dialogVO'].validate((valid) => {
          if (valid) {
            let vo = {
              ...this.dialogVO,
              clanId:this.clanId,
            };
            //新增
            if (!vo.id) {
              delete vo.id;
            }
            delete  vo.circleFileUrl;
            this.btnLoading = true;
            this.$api.circle.add(vo).then(res => {
              this.btnLoading = false;
              if (res.code == 0) {
                this.dialogShow = false;
                this.$message.success(vo.id?'创建成功！':'修改成功！');
                this.fetchData();
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            return false;
          }
        });
      },
      openDetailPage(item){
        this.$router.push({
					path:`/circle/detail/${item.id}`
				})
			}
    },
    mounted() {
      this.fetchData();
    }
  };
</script>
<style lang='scss' scoped>
	.circle-view{
		min-height:300px;

	}
</style>
