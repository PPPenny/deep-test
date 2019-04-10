<template>
  <el-select-area
       type="all"
       ref="selectArea" 
       size="small"
       v-model="area"
     ></el-select-area>
</template>

<script>
import ElSelectArea from '@femessage/el-select-area'
export default {
  name: 'SelectArea',
  components: {
    ElSelectArea
  },
  data(){
      return {
          area:[]
      }
  }
}
</script>
<style scoped>

</style>
