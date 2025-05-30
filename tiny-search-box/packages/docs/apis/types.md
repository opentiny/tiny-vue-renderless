# Types

## ISearchBoxItem

```js
interface ISearchBoxItem {
  field: string; // 搜索标签的label
  label: string; // tag 键的显示值
  type?: ISearchBoxTagType; // tag类型
  options?: ISearchBoxOption[]; // 选项数据
  regexp?: RegExp; // 此标签项的正则匹配
  replace?: boolean; // 单选或多选设置
  optionValueKey?: string; // 选中项键值
  format?: string; // 日期类型显示格式
  start?: number | Date; // 最小值或开始日期
  end?: number | Date; // 最大值或结束日期
  min?: number | Date; // 用于校验的最小值
  max?: number | Date; // 用于校验的最大值
  placeholder?: string; // 占位文本
  editAttrDisabled: boolean; // 编辑状态此属性禁用状态，常用以设置不可变更
  searchKeys?: Array<string>; // 搜索的字段范围
  idMapKey?: string; // 标识字段映射
  operators?: Array<string>; // 分隔符数组
  mergeTag?: boolean; // type=checkbox时生效，设置是否合并成一个标签
  maxTimeLength?: number; // type=dateRange/datetimeRange时生效，设置用户只能选择某个时间跨度，只接受毫秒数
  slotName?: string; // type=custom时生效，用于指定二级面板的插槽名，对应的编辑态自定义面板插槽名为item.slotName + '-edit'
  groupKey?: string; // 自定义分组名，默认为：属性类型
  [propName: string]: any;
}

type ISearchBoxTagType =
  | 'radio'
  | 'noValue'
  | 'checkbox'
  | 'map'
  | 'numRange'
  | 'dateRange'
  | 'dateTimeRange'
  | 'custom'
```

## ISearchBoxTag

```javascript
interface ISearchBoxTag {
  field: string;
  label: string;
  value: string;
  type: ISearchBoxTagType;
  start?: number | string;
  end?: number | string;
  operator?: string; // 分隔符[3.14.0新增]
  [propName: string]: any;
}

type ISearchBoxTagType = 'radio' | 'noValue' | 'checkbox' | 'map' | 'numRange' | 'dateRange' | 'dateTimeRange'
```

## ISearchBoxMatchItem

```javascript
interface ISearchBoxMatchItem {
  label: string;
  field: string;
  value: string;
  type?: string;
}
```
