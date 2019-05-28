<template>
  <div>
    <ComposedSentence
      v-bind:spans="spans"
      v-bind:annotations="annotations"
      v-bind:getAnnotationColor="getAnnotationColor"
      v-bind:getAnnotationInfo="getAnnotationInfo"
    />
  </div>
</template>

<script>
import ComposedSentence from './ComposedSentence'
import { buildSpanList } from '../util/buildSpanList'

export default {
  name: 'AnnotatedSentence',
  components: {
    ComposedSentence
  },
  props: {
    sentence: String,
    annotations: Array,
    getAnnotationColor: Function,
    getAnnotationInfo: Function,
  },
  computed: {
    spans: function() {
      const spans = buildSpanList(this.sentence, this.annotations)
      return spans
    },
  }
}
</script>

<style>
</style>