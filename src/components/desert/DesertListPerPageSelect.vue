<template lang="pug">
.elements-with-spacing
  .elements-with-spacing__element Rows per page:
  UISelect.elements-with-spacing__element(
    :options="availableValues"
    v-model="perPageSelected"
  )
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';
import UISelect from '@/components/UI/UISelect/UISelect.vue';

@Component({
  components: {
    UISelect,
  },
})
export default class DesertListPerPageSelect extends Vue {
  @Prop({
    type: Number,
    default: 10,
  }) perPage!: number;

  protected perPageSelected: number = this.perPage;

  get availableValues(): number[] {
    return [
      10,
      20,
      50,
    ];
  }

  @Watch('perPage', { immediate: true })
  protected onPerPageChange() {
    if (this.perPageSelected !== this.perPage) {
      this.perPageSelected = this.perPage;
    }
  }

  @Watch('perPageSelected', { immediate: true })
  protected onPerPageSelectedChange() {
    if (this.perPageSelected !== this.perPage) {
      this.$emit('change', this.perPageSelected);
    }
  }
}
</script>
