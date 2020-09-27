<template>
  <el-cascader
    placeholder="省/市/区"
    ref ="cityCascader"
    :options="options"
    :props="props"
    :value="cascaderValue"
    @active-item-change="itemChange"
    @change="cascaderChange">
  </el-cascader>
</template>

<script>
export default {
  name: 'CityCascader',
  props: {
    value: {
      type:Array,
      default:[]
    },
  },
  data () {
    return {
      cascaderValue:[],
      options:[],
      displayName:'',
      props: {
        label: 'name',
        value: 'id'
      }
    }
  },
  watch: {
    value(val){
      //调用父组件的input 事件
      this.cascaderValue = [...val];
    }
  },
  computed: {
  },
  methods: {
    //选择省或者市
    itemChange(valueArray){
      //如果是省级
      if(valueArray.length===1){
        this.getCity(valueArray[0]);
      }
      //如果是城市
      if(valueArray.length===2){
        this.getDistrict(valueArray[0],valueArray[1]);
      }
    },
    //获取城市
    getCity(provinceId){
      let activeProvince = this.options.filter(item=>{
        return item.id === provinceId;
      })[0];
      if(!activeProvince.load){
        this.$api.common.getCity(provinceId).then(res=>{
          if(res.data.length===0){
            //如果是最后级则删除 children
            delete  activeProvince.children;
          }else {
            let children = res.data.map(item=>{
              return {
                name:item.cityName,
                id:item.cityId,
                children:[]
              }
            });
            activeProvince.children.push(...children)
            activeProvince.load = true;
          }
        });
      }
    },
    //获取县区
    getDistrict(provinceId,cityId){
      console.log(provinceId,cityId);
      //获取当前省
      let activeProvince = this.options.filter(item=>{
        return item.id === provinceId;
      })[0];
      //获取当前市/区
      let activeCity = activeProvince.children.filter(item=>{
        return item.id === cityId;
      })[0];
      if(!activeCity.load){
        this.$api.common.getDistrict(cityId).then(res=>{

          let children = res.data.map(item=>{
            return {
              name:item.districtName,
              id:item.districtId,
            }
          });
          activeCity.children.push(...children);
          activeCity.load = true;

          if(res.data.length===0) {
            //如果是最后级则删除 children
            delete  activeCity.children;
          }
        });

      }

    },
    //change 事件
    cascaderChange(valueArray){
      let checkedNodes = this.$refs.cityCascader.getCheckedNodes();
      if(checkedNodes.length>0){
        checkedNodes = checkedNodes[0].pathLabels;
      }
      this.displayName = checkedNodes.join('/');
      this.$emit('input', valueArray);
    },
  },
  mounted () {
    //获取省列表
    this.$api.common.getProvince().then(res=>{
      this.options = res.data.map(item=>{
        return {
          name:item.provinceName,
          id:item.provinceId,
          children:[]
        }
      });
    });
    //
  }
}
</script>

<style type="text/scss" scoped>
</style>
