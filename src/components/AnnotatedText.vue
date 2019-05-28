<template>
  <div>
    <ComposedText
      v-bind:spans="spans"
      v-bind:annotations="annotations"
      v-bind:getAnnotationColor="getAnnotationColor"
      v-bind:getAnnotationInfo="getAnnotationInfo"
    />
  </div>
</template>

<script>
import ComposedText from './ComposedText'
import { buildSpanList } from '../util/buildSpanList'

export default {
  name: 'AnnotatedText',
  components: {
    ComposedText
  },
  props: {
    text: String,
    annotations: Array,
    getAnnotationColor: Function,
    getAnnotationInfo: Function,
  },
  computed: {
    spans: function() {
      const spans = buildSpanList(this.text, this.annotations)
      return spans
    },
  }
}
</script>

<style>
</style>