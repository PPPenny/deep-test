<template>
  <div class="index">
    <el-data-table 
    ref="dataTable" 
    v-bind = "tableConfig"
    ></el-data-table>
  </div>
</template>
<script>
import Vue from 'vue';
import ElDataTable from 'el-data-table';
Vue.component('el-data-table', ElDataTable);
import formatDate from '@/const/filter';
import ApiUrls from '@/const/api';
// import {Lang, Type, Status} from './typeConfig'
export default {
  layout: 'list',
  name: 'list',
  data() {
    return {
      tableConfig: {
        url: ApiUrls.GET_LIST,
        type:'get',
        hasEdit: false,
        hasDelete:false,
        hasNew:false,
        hasDailog:false,
        operationAttrs: {
          width: '160px'
        },
        searchForm: [
          {
            $el: {placeholder: '请输入'},
            label: '门店名称',
            $id: 'name',
            $type: 'input'
          },
          {
            label: '创建时间',
            $id: 'up_time',
            $type: 'date-picker',
            $el: {
                placeholder: '请选择',
                valueFormat: 'timestamp'  // 不使用 value-format 属性，则获取到的是一个空对象，格式请参考 element-ui 组件 date-picker 的日期格式部分
            }
          }
            
        ],
        headerButtons:[
             {
            type: 'primary',
            size: 'small',
            text: '新增',
            atClick: () => {
                 this.goDetail();
                return Promise.resolve(false);
            }
          },
        ],
        // form:[
        //   {
        //     $type: 'input',
        //     $id: 'name',
        //     label: '门店名称',
        //   },
        //   {
        //     $type: 'input',
        //     $id: 'pro-city',
        //     label: '门店所属区域',

        // inputFormat:

        // },
        // {
        //     $type: 'input',
        //     $id: 'address',
        //     label: '门店地址'
        // }
        // ],
        columns: [
          // 要实现单个的删除，所以，前面第一列的复选框不用写
          // {type: 'selection', selectable: (row, index) => index > -1},
          {prop: 'name', label: '门店名称', minWidth: '110px',},
          {
            prop: 'type',
            label: '门店所属区域',
             minWidth: '110px',
            formatter: row =>{
               let str='';
                row.pro_city.map(it=>{
                    str +=  `${it[Object.keys(it)]}  `
                })
                return str;
            } 
          },
          {prop: 'address', label: '门店地址'}, 
          {
            prop: 'up_time',
            label: '创建时间',
            minWidth: '100px',
            formatter: row => formatDate(row.up_time, 'YYYY-MM-DD')
          }
        ],
        extraButtons: [
        //   {
        //     type: 'primary',
        //     size: 'small',
        //     text: '查看',
        //     atClick: row => {
        //         //  this.goDetail(row.id);
        //         return Promise.resolve(this.$refs.dataTable.onDefaultView(row))
        //     }
        //   },
          {
            text: '编辑',
            type: 'primary',
            size: 'small',
            atClick: row => {
                this.goDetail(row._id);
                return Promise.resolve(false)
            }
          },
           {
            text: '刪除',
            size: 'small',
            atClick: row => {
                return Promise.resolve(this.$refs.dataTable.onDefaultDelete(row))
            }
          }
        ]
      },
    

    }
  },
  methods: {
      //跳转到编辑和新增页面
      //编辑页面要传一个门店id 
       goDetail(id){
          this.$router.push({
                path:'/detail',
                query:{
                    storeId:id
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
}
</style>