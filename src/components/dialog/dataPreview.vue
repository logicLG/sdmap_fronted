<template>
  <el-dialog title="收货地址" :visible="dataPreviewVisible" :before-close="modalClose">
    <el-table :data="data">
      <el-table-column v-for="item in columns"
                       :prop="item.name"
                       :label=item.label>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>

  export default {
    name: "dataPreview",
    props: {
      dataPreviewVisible: Boolean
    },
    data() {
      return {
        columns: [
          {"name": "fieldName", "label": "字段名", type: "text", immutable: true, width: 180},
          {"name": "reflectName", "label": "映射名", type: "text", immutable: false, width: 160},
          {"name": "fieldType", "label": "字段类型", type: "text", immutable: true, width: 100},
          {"name": "isChecked", "label": "是否选用", type: "checkbox", immutable: false, width: 100},
          {"name": "isMatch", "label": "是否可模糊匹配", type: "checkbox", immutable: false, width: 100},
          {"name": "weight", "label": "权重", type: "select", immutable: false, width: 100},
          {"name": "description", "label": "描述", type: "text", immutable: false, width: 200}
        ],
        data: [
          {
            "id": 1,
            "fieldName": "ADMINCODE",
            "reflectName": "districe",
            "fieldType": "string",
            "isChecked": "true",
            "isMatch": true,
            "weight": "1.0",
            "description": "正常"
          },
          {
            "id": 2,
            "fieldName": "ADMINCODE2",
            "reflectName": "districe2",
            "fieldType": "string",
            "isChecked": false,
            "isMatch": "false",
            "weight": "1.0",
            "description": "正常"
          }, {
            "id": 3,
            "fieldName": "ADMINCOD4E2",
            "reflectName": "districe2",
            "fieldType": "string",
            "isChecked": false,
            "isMatch": "false",
            "weight": "1.0",
            "description": "正常"
          }
        ]

      }

    },
    methods: {
      modalClose() {
        this.$emit('update:dataPreviewVisible', false); // 直接修改父组件的属性
      }

    }


  }
</script>
