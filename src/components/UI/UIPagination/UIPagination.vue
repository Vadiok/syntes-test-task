<template lang="pug">
.elements-with-spacing(
  v-if="visible"
)
  .elements-with-spacing__element {{ from }}-{{ to }} of {{ total }}
  .elements-with-spacing__element
    a.text-color-basic(
      href="#"
      :class="{ 'text-color-muted cursor-not-allowed': backDisabled }"
      @click.prevent="goBack"
    )
      IconLeft(
        :size="20"
      )
  .elements-with-spacing__element
    a.text-color-basic(
      href="#"
      :class="{ 'text-color-muted cursor-not-allowed': forwardDisabled }"
      @click.prevent="goForward"
    )
      IconRight(
        :size="20"
      )
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
import IconLeft from 'mdi-vue/ChevronLeft.vue';
import IconRight from 'mdi-vue/ChevronRight.vue';

@Component({
  components: {
    IconLeft,
    IconRight,
  },
})
export default class UIPagination extends Vue {
  @Prop({
    type: Number,
    default: 1,
  }) page!: number;

  @Prop({
    type: Number,
    default: 10,
  }) perPage!: number;

  @Prop({
    type: Number,
    default: 0,
  }) total!: number;

  get visible() {
    return this.total > this.perPage;
  }

  get from() {
    const from = this.perPage * (this.page - 1) + 1;
    return from <= this.total ? from : this.total;
  }

  get to() {
    const to = this.perPage * this.page;
    return to <= this.total ? to : this.total;
  }

  get backDisabled() {
    return this.page <= 1;
  }

  get forwardDisabled() {
    return (this.page * this.perPage) >= this.total;
  }

  goBack() {
    if (!this.backDisabled && this.page > 1) {
      this.$emit('setPage', this.page - 1);
    }
  }

  goForward() {
    if (!this.forwardDisabled) {
      this.$emit('setPage', this.page + 1);
    }
  }
}
</script>
