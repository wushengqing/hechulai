<template>
  <el-cascader
    placeholder="省/市/区"
    ref ="cityCascader"
    :options="options"
    :props="props"
    v-model="cascaderValue"
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
    value: {
      immediate: true,
      handler(val) {
        //调用父组件的input 事件
        this.init();
        this.cascaderValue = [...val];
        //
      },
    },
  },
  computed: {
  },
  methods: {
    init(){
      let val = this.value;
      if(val && val.length==3){
        //如果省还没加载完，先等待省
        if(this.options.length===0){
          return;
        }
        let province = this.options.filter(item=>item.id===val[0])[0];
        //市、区如果没有加载，则一起加载
        if(province.children.length===0){
          let p1 = this.$api.common.getCity(val[0]);
          let p2 = this.$api.common.getDistrict(val[1]);
          Promise.all([p1,p2]).then(res=>{
            province.children = res[0].data.map(item=>{
              return {
                name:item.cityName,
                id:item.cityId,
                children:[]
              }
            });
            let city = province.children.filter(item=>item.id===val[1])[0];
            city.children = res[1].data.map(item=>{
              return {
                name:item.districtName,
                id:item.districtId,
                leaf:true
              }
            });
          })
        }else{
          //
          let city = province.children.filter(item=>item.id===val[1])[0];
          console.log(city);
          if(city.children.length===0){
            this.$api.common.getDistrict(val[1]).then(res=>{
              city.children = res.data.map(item=>{
                return {
                  name:item.districtName,
                  id:item.districtId,
                  leaf:true
                }
              });
            })
          }
        }
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
      })
      this.init();
    });
    //
  }
}
</script>

<style type="text/scss" scoped>
</style>
