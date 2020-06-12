<template lang="pug">
.table
  VueElementLoading(
    :active="loading"
    spinner="bar-fade-scale"
    color="#888"
    backgroundColor="rgba(255, 255, 255, .5)"
  )
  table.table__inner
    thead.table__header.text-no-wrap
      tr.table__row.table__row--in-header
        th.table__data.table__data--clickable(
          v-for="(column, index) in columns"
          :key="index"
          :class="{ 'table__data--selected': orderKey && (column.key === orderKey) }"
          @click.prevent="setOrder(column.key)"
        ) {{ column.title }}
          .table__arrow-icon-container
            component(
              v-if="orderKey && (column.key === orderKey)"
              :is="sortIconComponent"
            )
    tbody
      tr.table__row(
        v-for="(item, index) in tableData"
        :key="index"
      )
        td.table__data(
          v-for="(columnKey, index) in columnKeys"
          :key="index"
        ) {{ getItemFieldString(item, columnKey) }}
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
import VueElementLoading from 'vue-element-loading/lib/vue-element-loading.min';
import OrderAsc from 'mdi-vue/ArrowUp.vue';
import OrderDesc from 'mdi-vue/ArrowDown.vue';

export interface UITableColumn {
  key: string;
  title?: string;
  sortable?: boolean;
  valueSuffix?: string;
}

export interface UITableDataItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [s: string]: any;
}

const getDataItemFieldValue = (item: UITableDataItem, key: string): number|string|null => {
  if (typeof item[key] === 'string' || typeof item[key] === 'number') {
    return item[key];
  }
  return null;
};

const getColumnByKey = (columns: UITableColumn[], key: string) => {
  const filtered = columns.filter((column) => column.key === key);
  return filtered.length ? filtered[0] : null;
};

@Component({
  components: {
    VueElementLoading,
    OrderAsc,
    OrderDesc,
  },
})
export default class UITable extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  tableData!: UITableDataItem[];

  @Prop({
    type: Array,
    default: () => [],
  })
  columns!: UITableColumn[];

  @Prop({
    type: String,
    default: null,
  })
  orderKey!: string|null;

  @Prop({
    type: Boolean,
    default: false,
  })
  protected orderByDesc!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  protected loading!: boolean;

  get columnKeys(): string[] {
    return [...this.columns].map((column) => column.key);
  }

  get columnHeaders(): string[] {
    return [...this.columns].map((column) => column.title || '');
  }

  get sortIconComponent() {
    return this.orderByDesc ? 'OrderDesc' : 'OrderAsc';
  }

  protected getItemFieldString(item: UITableDataItem, key: string) {
    const result = [getDataItemFieldValue(item, key)];
    const column = getColumnByKey(this.columns, key);
    if (column && column.valueSuffix) {
      result.push(column.valueSuffix);
    }
    return result.join('');
  }

  protected setOrder(column: string) {
    if (this.orderKey && (column === this.orderKey)) {
      this.$emit('changeOrderDirection', !this.orderByDesc);
      return;
    }
    this.$emit('changeOrderField', column);
  }
}
</script>
