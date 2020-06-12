<template lang="pug">
#app
  .container
    DesertList
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DesertList from '@/components/desert/DesertList.vue';

@Component({
  components: {
    DesertList,
  },
})
export default class App extends Vue {}
</script>
