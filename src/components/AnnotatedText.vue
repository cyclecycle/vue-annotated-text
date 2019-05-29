<template>
  <div>
    <span
      v-for="span in spans"
      :data-span-id="span.id"
      :key="span.id"
      :style="getSpanStyle(span)"
      v-on="spanEvents"
      :class="spanClasses"
      v-bind="spanAttributes"
    >{{ span.text }}</span>
  </div>
</template>

<script>
import c_c from 'color-mixer'
import { buildSpanList } from '../util/buildSpanList'

export default {
  name: 'AnnotatedText',
  props: {
    text: String,
    annotations: Array,
    getAnnotationColor: {
      type: Function,
      default: function(annotation) {
        return '#ffffff'
      },
    },
    getAnnotationInfo: Function,
    spanEvents: {
      type: Object,
      default: function() { return {} }
    },
    spanClasses: {
      type: Array,
      default: function() { return [] }
    },
    spanAttributes: {
      type: Object,
      default: function() { return {} }
    },
  },
  computed: {
    spans: function() {
      const spans = buildSpanList(this.text, this.annotations)
      return spans
    },
  },
  methods: {
    getSpanAnnotations(span) {
      const annotations = this.annotations.filter(annotation => {
        return span.annotation_ids.includes(annotation.id)
      })
      return annotations
    },
    getSpanStyle: function(span) {
      return {
        backgroundColor: this.getSpanColor(span)
      }
    },
    getSpanColor: function(span) {
      let color = null
      const annotations = this.getSpanAnnotations(span)
      let colors = annotations.map(annotation => this.getAnnotationColor(annotation))
      if (colors.length > 1) {
        colors = colors.map(color => {
          return new c_c.Color({hex: color})
        })
        const mix = new c_c.Color({mix: colors})
        color = mix.hex()
      } else {
        color = colors[0]
      }
      return color
    },
  },
}
</script>