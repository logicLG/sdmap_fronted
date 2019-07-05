export const classificationSystem = [{
  value: '0',
  label: '框架数据'
}, {
  value: '1',
  label: '类型数据'
}]

export const typeFields = [
  {"name": "fieldName", "label": "字段名", type: "text", immutable: true},
  {"name": "reflectName", "label": "映射名", type: "text", immutable: false},
  {"name": "fieldType", "label": "字段类型", type: "text", immutable: true},
  {"name": "isChecked", "label": "是否选用", type: "checkbox", immutable: false},
  {"name": "isMatch", "label": "是否可模糊匹配", type: "checkbox", immutable: false},
  {"name": "weight", "label": "权重", type: "text", immutable: false},
  {"name": "description", "label": "描述", type: "text", immutable: false}
]
