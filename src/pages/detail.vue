<template>
  <div class="index">
    <el-form-renderer
      ref="formRender" 
      :content = "content"
      inline
    >
    <!-- <div slot="$id:address" class='show-pro-city'>
    <label class='show-pro-city-label'>门店所属区域</label>
      <el-select-area
       type="all"
       ref="selectArea" 
       size="small"
       v-model="area"
     ></el-select-area></div> -->
    </el-form-renderer>
       <el-button type="primary" @click="sureClick(formRender)" :loading="btnLoading">{{sureTxt}}</el-button>
       <el-button @click="cancleClick">取消</el-button>
      
  </div>
</template>
<script>
import Vue from 'vue';
import ElFormRenderer from '@femessage/el-form-renderer';
import ElSelectArea from '@femessage/el-select-area';
import ApiUrls from '@/const/api';
export default {
  layout: 'list',
  components: {
    ElFormRenderer,
    ElSelectArea
  },
  data() {
    return {
      storeId:this.$route.query.storeId || "",  
      sureTxt:this.$route.query.storeId ?'确认修改':'确认创建',
      btnLoading:false,
      content:[
        {
          $id: 'name',
          $type: 'input',
          label: '门店名称',
          $el: {
            placeholder: '请输入'
          },
          rules:[
            { required: true, message: '请输入门店名称'},
          ]
        },
        {
          $id:'pro_city',
          label:'门店所属区域',
          $default:[],
          $el: {
              type:"all",
              ref:"selectArea"
          },
           component: ElSelectArea,
           rules:[
            { required: true, message: '请选择门店所属区域'},
          ]
        },
        {
          $id: 'address',
          $type: 'input',
          label: '门店地址',
          $el: {
            placeholder: '请输入'
          },
        rules:[
            { required: true, message: '请输入门店地址'},
          ]
        }
      ],
      formRender:{
        name:'',
        address:'',
        pro_city:''
      }
    }
  },
  mounted(){
    // console.log(this.storeId );
        if(this.storeId){ //传了参数，说明有门店Id，是编辑页面，需要获取门店详情
          this.$axios.$get(ApiUrls.GET_DETAIL,{params:{
            storeId:this.storeId
          }}).then(res=>{
              const { payload } =  res;
                //更新名字 
                this.$refs.formRender.updateForm({ name: payload.name });
                // 更新地址
               this.$refs.formRender.updateForm({ address: payload.address });
               //更新所属区域
               this.$refs.formRender.updateForm({ pro_city: this.returnAddArr(payload['pro_city'])});
          })
        }  
    },

  methods: { 
 
    //  编辑页面，默认值 ，重新组装数据
      returnAddArr(data){
          const newArr = [];
          data.forEach(element => {
             newArr.push(element[Object.keys(element)]); 
          });
          return newArr;
      },
      //点击取消
      cancleClick(){
          this.$router.back(-1);
      },
      //点击确认
      sureClick(formName){
        this.btnLoading = true;
        this.$refs.formRender.validate(valid => {
        if (valid) {
          const value = this.$refs.formRender.getFormValue();
          let submitArray = Object.keys(value);
          let url = this.storeId ?ApiUrls.UPDATE_STORE:ApiUrls.CREATE_STORE;
          this.$axios.$post(url,{
            ...value
          } ).then(res=>{
                if(Number(res.code) === 0){
                    this.$router.back(-1);
                }
            })

        } else {
          this.btnLoading = false;
          return false
        }
      })


      } 
   }
}
</script>

<style lang="less">
.index {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .show-pro-city{
      margin-bottom: 22px;
     .show-pro-city-label{
        text-align: right;
        font-size: 14px;
        color: #606266;
        line-height: 36px; 
        padding: 0 12px 0 0;
        box-sizing: border-box;
       
    }
    .show-pro-city-label::before {      
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  
  }

}
</style>
