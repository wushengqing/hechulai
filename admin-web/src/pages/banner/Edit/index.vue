<template>

  <transition name="edit">
      <d2-container v-if="showPage" class="edit-panel">
        <template slot="header">
          <i title="后退" class="el-icon-back" @click="back"></i>
          <span style="cursor:pointer" @click="back">返回</span>
          <div class="fr" style="margin: -8px 0">
            <el-button type="" plain @click="openPreviewPage">预览</el-button>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </div>
        </template>
        <!---->
        <div class="detail-view">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="标题：">
                <el-input class="w400" placeholder="请输入标题" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="轮播图：">
                <el-upload
                  class="banner-uploader"
                  :action="$api.common.uploadAction"
                  :data="fileData"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.imageUrl" :src="form.imageUrl" class="banner-image">
                  <i v-else class="el-icon-plus banner-uploader-icon"></i>
                </el-upload>
                <span class="color-grey" style="vertical-align: bottom"> 请上传 小于2M的jpg 图片</span>
              </el-form-item>
              <el-form-item label="背景颜色：">
                <el-color-picker v-model="form.bgColor"></el-color-picker>
                <div style="font-size: 16px;display: inline-block; vertical-align: top" class="ml10" :style="{color: form.bgColor }">{{ form.bgColor }}</div>
              </el-form-item>
              <el-form-item label="文章内容：" >
                <div class="w800" >
                  <editor-bar v-model="form.content" placeholder="请输入内容"  :isClear="isClear" @change="changeEditor"></editor-bar>
                </div>
              </el-form-item>
              <el-form-item label="是否开启外链：">
                <el-radio-group v-model="form.isSkip">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="外链地址：" v-if="form.isSkip===1">
                <el-input placeholder="请输入链接地址" class="w400" v-model="form.linkUrl">
                  <template slot="prepend">Http(s)://</template>
                </el-input>
              </el-form-item>
              <el-form-item label="关联宗祠：">
                <el-select v-model="value" placeholder="请选择" class="w400">
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
                  v-model="value"
                  :options="clansmenOptions"
                  @change="handleChange">
                </el-cascader>
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
        form: {
          title: '',
          imageUrl: '',
          isTop: '0',
          isSkip: '0',
          bgColor: '#8F4008',
          linkUrl: [],
          resource: '',
          content: ''
        },
        fileData:{
          defaultSuffix:'',
        },
        //关联宗祠
        mienOptions:[],
        //关联宗亲
        clansmenOptions:[],
      }
    },
    methods: {
      open(){
        this.showPage= true;
      },
      back(){
        this.showPage= false;
        this.$emit('back')
      },
      handleAvatarSuccess(res, file) {
        this.form.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt10M;
      },
      changeEditor(val) {
        console.log(val)

      },
      onSubmit() {
        console.log('submit!');
      },
      openPreviewPage(){}
    },
    mounted() {

    }
  };
</script>
