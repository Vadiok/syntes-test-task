<template lang="pug">
.select
  select(
    v-model="inputValue"
  )
    option(
      v-for="(option, index) in options"
      :key="index"
      :value="option"
    ) {{ option }}
  .select__dropdown
    IconDown(
      :size="20"
    )
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';
import IconDown from 'mdi-vue/MenuDown.vue';

@Component({
  components: {
    IconDown,
  },
})
export default class UISelect extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options!: any[];

  @Prop({
    default: null,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value!: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected inputValue: any = this.value;

  @Watch('value', { immediate: true })
  protected onValueChange() {
    if (JSON.stringify(this.value) !== JSON.stringify(this.inputValue)) {
      this.inputValue = this.value;
    }
  }

  @Watch('inputValue')
  protected onInputValueChange() {
    if (JSON.stringify(this.value) !== JSON.stringify(this.inputValue)) {
      this.$emit('input', this.inputValue);
    }
  }
}
</script>
