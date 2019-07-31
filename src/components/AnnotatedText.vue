<template>
  <span>
    <span
      v-for="span in spans"
      :key="span.id"
      :data-span-id="span.id"
      :data-annotation-ids="span.annotationIds"
      :class="getSpanClasses(span)"
      :style="getSpanStyle(span)"
      v-bind="spanAttributes"
      v-on="preppedSpanEvents"
    >{{ span.text }}</span>
  </span>
</template>

<script>
import c_c from 'color-mixer'
import { buildSpanList } from '../util/buildSpanList'

export default {
  name: 'AnnotatedText',
  props: {
    text: String,
    annotations: {
      type: Array,
      default: function() {
        return []
      },
    },
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
    getSpanClasses: {
      type: Function,
      default: function() { return () => {} }
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
    preppedSpanEvents() {
      // Get annotations and pass to the event callback
      const spanEvents = this.spanEvents
      const preppedSpanEvents = {}
      Object.keys(spanEvents).forEach(eventType => {
        const callback = spanEvents[eventType]
        const newCallback = (e) => {
          const spanId = this.elementSpanId(e.target)
          const span = this.spanById(spanId)
          const annotationIds = span.annotationIds
          const annotations = this.getAnnotations(annotationIds)
          callback(e, annotations)
        }
        preppedSpanEvents[eventType] = newCallback
      })
      return preppedSpanEvents
    },
  },
  methods: {
    elementSpanId(el) {
      let spanId = el.attributes['data-span-id'].value
      spanId = Number(spanId)
      return spanId
    },
    spanById(spanId) {
      const spans = this.spans.filter(span => {
        return span.id === spanId
      })
      const span = spans[0]
      return span
    },
    getAnnotations(annotationIds) {
      const annotations = this.annotations.filter(annotation => {
        return annotationIds.includes(annotation.id)
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
      const annotationIds = span.annotationIds
      const annotations = this.getAnnotations(annotationIds)
      let colors = annotations.map(annotation => this.getAnnotationColor(annotation))
      colors = [...new Set(colors)]
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