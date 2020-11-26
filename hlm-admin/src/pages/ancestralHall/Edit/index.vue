<template>

  <transition name="edit">
    <d2-container v-if="showPage" class="edit-panel">
      <template slot="header">
        <i title="后退" class="el-icon-back" @click="back"></i>
        <span style="cursor:pointer" @click="back">返回</span>
      </template>
      <!---->
      <div class="detail-view">
        <el-form ref="form" :model="form" label-width="130px"  :rules="formRules" >
          <el-form-item label="宗祠/祖坟名称："  prop="name">
            <el-input class="w400" placeholder="请输入标题" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="简介：">
            <el-input
              class="w400"
              placeholder="请输入标题"
              type="textarea"
              maxlength="300"
              show-word-limit
              v-model="form.ancestralHallDec">
            </el-input>
          </el-form-item>
          <el-form-item label="所在地区：" prop="cityCode">
            <city-cascader
              class="w100off"
              ref="cityCascader"
              @ready="updateMap"
              placeholder="省/市/区"
              v-model="form.cityCode" >
            </city-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" prop="ancestralHallAddess">
            <el-input class="w400" placeholder='请输入详细地址' v-model="form.ancestralHallAddess"></el-input>
            <el-button type="text" class="ml10" @click="updateMap()">查询位置</el-button>
          </el-form-item>
          <el-form-item label="地图信息：" prop="map">
            <baidu-map
              class="map"
              style="width: 500px; height:350px"
              ak="9BK1L0RsiHdwM8TBZUmqYl7HyALV4L4c"
              :zoom="map.zoom"
              :center="{lng: map.center.lng, lat: map.center.lat}"
              @ready="mapReady"
              @click="setMarker"
              :scroll-wheel-zoom="true">
              <!--比例尺控件-->
              <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
              <!--缩放控件-->
              <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
              <!--聚合动态添加的点坐标-->
              <bm-marker-clusterer :averageCenter="true">
                <bm-marker
                  v-for="marker of map.markers"
                  :key="marker.code"
                  :position="{lng: marker.lng, lat: marker.lat}">
                </bm-marker>
              </bm-marker-clusterer>
              <!--信息窗体-->
              <bm-info-window
                :position="{lng: form.longitude, lat: form.latitude}"
                :title="form.name"
                :show="map.infoWindow.show"
                @close="infoWindowClose">
              </bm-info-window>
            </baidu-map>
          </el-form-item>
          <el-form-item label="关联宗亲：" prop="clanManList">
            <el-tag
              v-for="clanMan in form.clanManList"
              :key="clanMan.name"
              closable
              class="mr10"
              @close="deleteClanMan(clanMan)"
              :type="clanMan.type">
              {{clanMan.name}}
            </el-tag>
            <el-button class="button-new-tag" size="small" @click="openDialog">+ 添加</el-button>
          </el-form-item>
          <el-form-item label="相册：" prop="clanManId">
            <div class="img-list flex-wrap">
              <el-image
                v-for="item in form.fileList"
                class="img-item"
                :src="item.fileUrl"
                fit="cover"
                :preview-src-list="fileUrlList">
              </el-image>
              <el-upload
                class="img-uploader"
                :action="$api.common.uploadAction"
                :data="fileData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus img-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <template slot="footer"></template>
      <el-dialog title="添加关联宗亲" :visible.sync="dialogShow" width="400px" append-to-body>
        <el-form ref="dialogVO" :model="dialogVO" label-width="120px" :rules="rules">
          <el-form-item label="宗亲房系：" prop="directoryId">
            <el-select v-model="dialogVO.directoryId" placeholder="请选择房系" @change="changeDirectory()">
              <el-option
                v-for="item in directoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宗亲世称：" prop="generationId">
            <el-select v-model="dialogVO.generationId" placeholder="请选择世称" :disabled="!dialogVO.directoryId"  @change="changeGeneration()">
              <el-option
                v-for="item in generationList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宗亲名称：" prop="clanManId">
            <el-select
              v-model="dialogVO.clanManId"
              placeholder="请选择世称"
              :loading="clanManListLoading"
              :disabled="!dialogVO.generationId">
              <el-option
                v-for="item in clanManList"
                :key="item.clansmanId"
                :label="item.clansmanName"
                :value="item.clansmanId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogShow = false">关闭</el-button>
          <el-button type="primary" @click="addClanMan()" :loading="btnLoading">添 加</el-button>
        </div>
      </el-dialog>
    </d2-container>
  </transition>

</template>

<script>
  import CityCascader from "@/components/CityCascader";
  //百度地图
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmScale from 'vue-baidu-map/components/controls/Scale'
  import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
  import BmMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker'
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'

  import listMixin from "@/mixins/list.mixin";
  import { cloneDeep } from 'lodash';

  const defaultForm = {
    id:'',
    name: '',
    ancestralHallDec:'',
    ancestralHallAddess:'',
    pId: 0,
    cId: 0,
    dId: 0,
    cityCode:[],
    longitude:'',
    latitude:'',
    ancestralHallState:0,
    fileList:[],
    clanManList:[],

  }

  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "ancestralHallEdit",
    components: {
      CityCascader,
      BaiduMap,
      BmScale,
      BmNavigation,
      BmMarkerClusterer,
      BmMarker,
      BmInfoWindow
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
      },
      fileUrlList(){
        return this.form.fileList.map(item=>item.fileUrl)
      },
    },
    data() {
      let validateMap = (rule, value, callback) => {
        if (this.form.longitude === '') {
          callback(new Error('请设置定位'));
        } else {
          callback();
        }
      };
      return {
        showPage:false,
        //1 banner图 2 新闻
        mienType:2,
        isClear:true,
        form:cloneDeep(defaultForm),
        fileData:{
          defaultSuffix:'',
        },
        formRules:{
          name: [
            { required: true, message: '请输入标题',  },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', }
          ],
          cityCode: [
            { required: true, message: '请输入地区',  },
          ],
          ancestralHallAddess: [
            { required: true, message: '请输入详细地址', },
          ],
          map: [
            { required: true, message: '', validator: validateMap, },
          ],
        },
        rules:{
          name: [
            { required: true, message: '请输入标题', },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符',  }
          ],
          cityCode: [
            { required: true, message: '请输入地区',  },
          ],
          ancestralHallAddess: [
            { required: true, message: '请输入详细地址', },
          ],
        },
        //百度地图相关
        map:{
          zoom:1,
          center:{
            lng:'',
            lat:''
          },
          markers:[],
          infoWindow:{
            show:false
          }
        },
        dialogShow:false,
        dialogVO:{
          clanManId:'',
          directoryId:'',
          generationId:'',
        },
        directoryList:[],
        generationList:[],
        clanManList:[],
        clanManListLoading:false,
        btnLoading:false,
        fileData:{
          defaultSuffix:'',
        },
      }
    },
    methods: {
      open(item){
        this.getDirectoryList();
        this.showPage= true;
        if(item && item.id){
          item.cityCode =item.pId ? [item.pId,item.cId,item.dId]:[];
          this.form = cloneDeep(item);
          this.map.zoom = 10;
          this.map.center.lat = item.latitude;
          this.map.center.lng = item.longitude;
        }else{
          this.form = cloneDeep(defaultForm);

        }
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
        this.dialogVO.clanManId='';
        this.generationList = [];
        this.clanManList = [];
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
        this.dialogVO.clanManId='';
        this.clanManList = [];
        this.getClanUserRelList()
      },
      //获取宗亲
      getClanUserRelList() {
        //获取宗亲列表
        this.clanManListLoading = true;
        this.$api.user.getClanUserRelList({
          clanId: this.clanId,
          currentPage:0,
          pageSize:10000,
          scId:this.dialogVO.generationId,
          directoryId:this.dialogVO.directoryId,
        }).then(res=>{
          this.clanManList = res.data;
          this.clanManListLoading = false;
        })
      },
      //删除关联宗亲
      deleteClanMan(clanMan){
        this.$confirm('是否删除该宗亲？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '放弃'
        }).then(() => {
          this.form.clanManList.splice(this.form.clanManList.findIndex(item=>item.id===clanMan.id),1)
        }).catch(action => {});
      },
      //添加关联宗亲
      addClanMan(){
        //判断是否已经存在
        let isExist = this.form.clanManList.length==0 || this.form.clanManList.find(item=>item.id=== this.dialogVO.clanManId);
        if(isExist){
          this.$message.error('该宗亲已在关联列表，请勿重复添加');
          return false;
        }
        let name = this.clanManList.filter(item=>item.clansmanId == this.dialogVO.clanManId )[0].clansmanName;
        this.form.clanManList.push({
          id:this.dialogVO.clanManId,
          name,
        })
        this.dialogVO.clanManId = '';
      },
      //相册上传
      handleAvatarSuccess(res, file) {
        this.form.fileList.push({
          id:res.id,
          fileUrl:res.uploadedImgUrl
        })
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
      //保存
      save(){
        this.$refs['form'].validate((valid) => {
          if (!valid) {return;}
          let vo = cloneDeep(this.form);
          vo.clanId = this.clanId;
          vo.fileList = this.form.fileList.map(item=>{
            return {
              id:item.id,
            }
          })
          vo.clanManList = this.form.clanManList.map(item=>{
            return {
              id:item.id,
            }
          })
          delete vo.cityCode;
          delete vo.updateTime;
          delete vo.createTime;
          this.$api.ancestralHall.save(vo).then(res=>{
            if (res.code == 0) {
              this.back();
              this.$message.success(vo.id ? '修改成功！':'新增成功！');
            } else {
              this.$message.error(res.msg)
            }
          })
        })
      },
      //百度地图
      mapReady(){
        //获取浏览器定位
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(res=>{
          if(!this.map.center.lat){
            this.map.center.lat = res.latitude;
            this.map.center.lng = res.longitude;
          }

        },{enableHighAccuracy: true});

      },
      //根据省市区code 获取省市区名称
      getCityName(){
        if(this.form.cityCode.length===0){
          return {
            city:'',
            region:''
          };
        }
        let [province,city,region] =  this.$refs.cityCascader.displayName;
        return {
          city,
          region,
        };

      },
      //设置定位地址
      setMarker(e){
        console.log(e);
        this.form.latitude = e.point.lat;
        this.form.longitude = e.point.lng;
        this.map.markers = [
          {
            code:'code',
            lat:e.point.lat,
            lng:e.point.lng,
          }
        ]
        setTimeout(()=>{
          this.map.infoWindow.show = true;
        },0)
      },
      infoWindowClose(){
        this.map.infoWindow.show = false;
      },
      //根据省市区和详细地址更新地图
      updateMap(){
        let addr = this.getCityName();
        let address = addr.city + addr.region + this.form.ancestralHallAddess;
        let myGeo = new BMap.Geocoder();
        myGeo.getPoint(address, point=>{
          if (point) {
            this.map.zoom=18;
            this.map.center.lng = point.lng;
            this.map.center.lat = point.lat;
            this.setMarker({
              point:{
                ...this.map.center
              }
            })
          }else{
            alert("您选择地址没有解析到结果!");
          }
        },  addr.city);
      },
    },
    mounted() {

    }
  };
</script>
