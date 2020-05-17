<template>

  <transition name="edit">
    <div v-if="showPage" class="edit-panel">
      <d2-container>
        <template slot="header">轮播图管理</template>
        <!---->
        具体内容
        <template slot="footer"></template>
      </d2-container>
    </div>
  </transition>

</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "BannerList",
    components: {
    },
    mixins: [
      listMixin
    ],
    data() {
      return {
        showPage:false
      }
    },
    computed: {
      getActionWhere() {
        return {

        }
      }
    },
    methods: {
      open(){
        this.showPage= true;
      },
    },
    mounted() {

    }
  };
</script>
