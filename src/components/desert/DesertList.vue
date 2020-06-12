<template lang="pug">
div
  UITable(
    :tableData="items"
    :columns="columns"
    :orderKey="orderField"
    :orderByDesc="orderByDesc"
    :loading="isLoading"
    @changeOrderField="onFieldChange"
    @changeOrderDirection="onOrderChange"
  )
  .table-summary
    DesertListPerPageSelect.table-summary__item(
      :perPage="perPage"
      @change="onPerPageChange"
    )
    UIPagination.table-summary__item(
      :page="page"
      :perPage="perPage"
      :total="total"
      @setPage="onSetPage"
    )
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import { desertModule } from '@/store';
import { Food } from '@/entities/Food';
import UITable, { UITableColumn } from '@/components/UI/UITable/UITable.vue';
import UIPagination from '@/components/UI/UIPagination/UIPagination.vue';
import DesertListPerPageSelect from './DesertListPerPageSelect.vue';

@Component({
  components: {
    DesertListPerPageSelect,
    UIPagination,
    UITable,
  },
  created() {
    (this as DesertList).loadData();
  },
})
export default class DesertList extends Vue {
  protected orderField: keyof Food = 'title';

  protected orderByDesc = false;

  get items() {
    return [...desertModule.items];
  }

  get columns(): UITableColumn[] {
    return [
      { key: 'title', title: 'Dessert (100g serving)' },
      { key: 'calories', title: 'Calories' },
      { key: 'fat', title: 'Fat (g)' },
      { key: 'carbs', title: 'Carbs (g)' },
      { key: 'protein', title: 'Protein (g)' },
      { key: 'ironPercent', title: 'Iron (%)', valueSuffix: '%' },
    ];
  }

  get page() {
    return desertModule.page;
  }

  get perPage() {
    return desertModule.perPage;
  }

  get total() {
    return desertModule.total;
  }

  get isLoading() {
    return desertModule.loading;
  }

  loadData(page?: number, perPage?: number) {
    desertModule.fetchData({
      page: page || this.page,
      perPage: perPage || this.perPage,
      orderField: this.orderField,
      orderByDesc: this.orderByDesc,
    });
  }

  protected onFieldChange(field: keyof Food) {
    if (this.orderField !== field) {
      this.orderField = field;
      if (this.orderByDesc) {
        this.orderByDesc = false;
      }
      this.loadData();
    }
  }

  protected onOrderChange(orderByDesc = false) {
    if (this.orderByDesc !== orderByDesc) {
      this.orderByDesc = orderByDesc;
      this.loadData();
    }
  }

  protected onSetPage(page: number) {
    this.loadData(page);
  }

  protected onPerPageChange(perPage: number) {
    if (this.perPage !== perPage) {
      let currentFirstItem = this.perPage * (this.page - 1) + 1;
      if (currentFirstItem < 1) {
        currentFirstItem = 1;
      }
      let newPage = Math.ceil(currentFirstItem / (perPage || 1));
      if (newPage < 1) {
        newPage = 1;
      }
      this.loadData(newPage, perPage);
    }
  }
}
</script>
