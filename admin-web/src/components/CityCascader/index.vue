<template>
  <el-cascader
    placeholder="省/市/区"
    ref ="cityCascader"
    :options="options"
    :props="props"
    :value="cascaderValue"
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
    let _this = this;
    return {

      cascaderValue:[],
      options:[],
      displayName:'',
      props: {
        label: 'name',
        value: 'id',
        lazy: true,
        lazyLoad (node, resolve) {
          if(node.level===1){
            _this.$api.common.getCity(node.value).then(res=>{
              let nodes = res.data.map(item=>{
                return {
                  name:item.cityName,
                  id:item.cityId,
                  children:[]
                }
              });
              resolve(nodes);
            });
          }
          if(node.level===2){
            _this.$api.common.getDistrict(node.value).then(res=>{
              let nodes = res.data.map(item=>{
                return {
                  name:item.districtName,
                  id:item.districtId,
                  leaf:true
                }
              });
              resolve(nodes);
            });
          }
        }
      }
    }
  },
  watch: {
    value(val){
      console.log(val);
      //调用父组件的input 事件
      this.cascaderValue = [...val];
    }
  },
  computed: {
  },
  methods: {
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
