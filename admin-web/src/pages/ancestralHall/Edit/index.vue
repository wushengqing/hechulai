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
              <el-form-item label="宗祠/祖坟名称：">
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
                <el-cascader
                        ref="cityCascader"
                        v-model="form.cityCode"
                        placeholder='省/市/区'
                        class="w400"
                        clearable
                        :options="pcdList">
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址：" prop="ancestralHallAddess">
                <el-input class="w400" placeholder='请输入详细地址' v-model="form.ancestralHallAddess"></el-input>
                <el-button type="text" class="ml10" @click="updateMap()">查询位置</el-button>
              </el-form-item>
              <el-form-item label="地图信息：" prop="address">
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
                        :type="clanMan.type">
                  {{clanMan.name}}
                </el-tag>
                <el-button class="button-new-tag" size="small" @click="openDialog">+ 添加</el-button>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary" @click="save">保存</el-button>
              </el-form-item>
            </el-form>
        </div>
        <template slot="footer"></template>
        <el-dialog title="添加关联宗亲" :visible.sync="dialogShow" width="400px" append-to-body>
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
    cityCode:[],
    longitude:'',
    latitude:'',
    ancestralHallState:0,
    fileList:[],
    clanManList:[],
  }

  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "BannerEdit",
    components: {
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
      }
    },
    data() {
      return {
        showPage:false,
        //1 banner图 2 新闻
        mienType:2,
        isClear:true,
        form:cloneDeep(defaultForm),
        fileData:{
          defaultSuffix:'',
        },
        rules:{
          name: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          mienImageUrl: [
            { required: true, message: '请上传图片', trigger: 'blur' },
          ],
        },
        //省市区级联
        pcdList:[],
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
        btnLoading:false
      }
    },
    methods: {
      open(item){

        this.getDirectoryList();
        this.showPage= true;
        if(item && item.id){
          this.form = item;
          this.map.zoom=10;
          this.map.center.lat = item.latitude;
          this.map.center.lng = item.longitude;
        }else{
          this.form = {
            id:'',
            name: '',
            mienFileId:'',
            mienImageUrl: '',
            isTop: false,
            isSkip: false,
            mienBgColor: '#8F4008',
            linkUrl: '',
            mienResource: '',
            mienContent: ''
          };

        }
      },
      back(){
        this.showPage= false;
        this.$emit('back')
      },
      getPcdList(){
        this.$api.common.getPcdList().then(res=>{
          res.data.forEach(province=>{
            province.label = province.provinceName;
            province.value = province.provinceId;
            province.children = province.cityInfoDtoList;
            delete province.provinceName;
            delete province.provinceId;
            delete province.cityInfoDtoList;
            province.children.forEach(city=>{
              city.label = city.cityName;
              city.value = city.cityId;
              city.children = city.districtionInfoDtoList;
              delete city.cityName;
              delete city.cityId;
              delete city.districtionInfoDtoList;
              if(city.children){
                city.children.forEach(region=>{
                  region.label = region.districtName;
                  region.value = region.districtId;
                  region.children = null;
                  delete region.districtName;
                  delete region.districtId;
                })
              }


            })
          })
          this.pcdList = res.data
        });
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
      save(){},
      //百度地图
      mapReady(){
        //获取浏览器定位
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(res=>{
          if(true || !this.map.center.lat){
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
        let [provinceCode,cityCode,regionCode] =  this.form.cityCode;
        let province = this.pcdList.find(item=>item.value===provinceCode);
        let city = province.children.find(item=>item.value===cityCode);
        let region = city.children.find(item=>item.value===regionCode);
        return {
          city:city.label,
          region:region.label,
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
        console.log(address)
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
      this.getPcdList();

    }
  };
</script>
