<template>

  <transition name="edit">
      <d2-container v-if="showPage" class="edit-panel">
        <template slot="header">
          <i title="后退" class="el-icon-back" @click="back"></i>
          <span style="cursor:pointer" @click="back">返回</span>
        </template>
        <!---->
        <div class="detail-view">
            <el-form ref="form" :model="form" label-width="120px"  :rules="rules" >
              <el-form-item label="标题：">
                <el-input class="w400" placeholder="请输入标题" v-model="form.mienTitle"></el-input>
              </el-form-item>
              <el-form-item label="轮播图：">
                <el-upload
                  class="banner-uploader"
                  :action="$api.common.uploadAction"
                  :data="fileData"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.mienImageUrl" :src="form.mienImageUrl" class="banner-image">
                  <i v-else class="el-icon-plus banner-uploader-icon"></i>
                </el-upload>
                <span class="color-grey" style="vertical-align: bottom"> 请上传 小于2M的jpg 图片，最佳尺寸1000X500</span>
              </el-form-item>
              <el-form-item label="背景颜色：">
                <el-color-picker v-model="form.mienBgColor"></el-color-picker>
                <div style="font-size: 16px;display: inline-block; vertical-align: top" class="ml10" :style="{color: form.mienBgColor }">{{ form.mienBgColor }}</div>
              </el-form-item>
              <el-form-item label="文章内容：" >
                <div class="w800" >
                  <editor-bar v-model="form.mienContent" placeholder="请输入内容"  :isClear="isClear" @change="changeEditor"></editor-bar>
                </div>
              </el-form-item>
              <el-form-item label="是否开启外链：">
                <el-radio-group v-model="form.isSkip">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="外链地址：" v-if="form.isSkip===1">
                <el-input placeholder="请输入链接地址" class="w400" v-model="form.linkUrl">
                  <template slot="prepend">Http(s)://</template>
                </el-input>
              </el-form-item>
              <!--<el-form-item label="关联宗祠：">
                <el-select  placeholder="请选择" class="w400">
                  <el-option
                      v-for="item in mienOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关联宗亲："  >
                <el-cascader
                  class="w400"
                  :options="clansmenOptions">
                </el-cascader>
              </el-form-item>-->
              <el-form-item label="">
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
        </div>
        <template slot="footer"></template>
      </d2-container>
  </transition>

</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  //调用编辑器
  import EditorBar from '@/components/wangEnduit'
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "BannerEdit",
    components: {
      EditorBar
    },
    mixins: [
      listMixin
    ],
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      },
      getActionWhere() {
        return {

        }
      }
    },
    data() {
      return {
        showPage:false,
        //1 banner图 2 新闻
        mienType:1,
        isClear:true,
        form: {
          id:'',
          mienTitle: '',
          mienFileId:'',
          mienImageUrl: '',
          imageUrl: '',
          isTop: false,
          isSkip: false,
          mienBgColor: '#8F4008',
          linkUrl: '',
          mienResource: '',
          mienContent: ''
        },
        fileData:{
          defaultSuffix:'',
        },
        rules:{
          mienTitle: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          mienImageUrl: [
            { required: true, message: '请上传图片', trigger: 'blur' },
          ],
        },
        //关联宗祠
        mienOptions:[],
        //关联宗亲
        clansmenOptions:[],
      }
    },
    methods: {
      open(item){
        console.log(item)
        this.showPage= true;
        if(item && item.id){
          this.form = item;
        }else{
          this.form = {
            id:'',
            mienTitle: '',
            mienFileId:'',
            mienImageUrl: '',
            isTop: false,
            isSkip: false,
            mienBgColor: '#8F4008',
            linkUrl: '',
            mienResource: '',
            mienContent: ''
          }
        }
      },
      back(){
        this.showPage= false;
        this.$emit('back')
      },
      handleAvatarSuccess(res, file) {
        this.form.mienImageUrl =  res.uploadedImgUrl;
        this.form.mienFileId = res.id;
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
      changeEditor(val) {
        console.log(val)
        this.form.mienContent = val;
      },
      onSubmit() {
        console.log('submit!');
        this.$refs.form.validate((valid)=>{
          if(!valid){ return}
          let vo = {
            id:this.form.id,
            mienTitle: this.form.mienTitle,
            mienFileId: this.form.mienFileId,
            mienImageUrl: this.form.mienImageUrl,
            isTop: this.form.isTop,
            isSkip: this.form.isSkip,
            mienBgColor: this.form.mienBgColor,
            linkUrl: this.form.linkUrl,
            mienResource: this.form.mienResource,
            mienContent: this.form.mienContent,
            mienType:this.mienType,
            clanId:this.clanId
          };
          if(!vo.id){
            delete  vo.id;
          }
          //保存banner图
          this.$api.banner.save(vo).then(res=>{
            if(res.code===0){
              this.$message.success('新增成功！');
              this.back();
            }else{
              this.$message.error(res.msg)
            }
          })
        })
      },
      openPreviewPage(){}
    },
    mounted() {

    }
  };
</script>
