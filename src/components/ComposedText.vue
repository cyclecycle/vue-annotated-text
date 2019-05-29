<template>
  <div>
    <span
      v-for="span in spans"
      v-bind:data-span-id="span.id"
      v-bind:key="span.id"
      v-bind:style="getSpanStyle(span)"
      v-on="spanEvents"
      v-bind:class="spanClasses"
      v-bind="spanAttributes"
    >{{ span.text }}</span>
  </div>
</template>

<script>
import c_c from 'color-mixer'

export default {
  name: 'ComposedText',
  props: {
    spans: Array,
    annotations: Array,
    getAnnotationColor: Function,
    getAnnotationInfo: Function,
  },
  data() {
    return {
      spanEvents: {
        'click': function(e) {
          console.log(e.target.attributes['data-span-id'].value)
        }
      },
      spanClasses: ['custom-span-class'],
      spanAttributes: {}
    }
  },
  // mounted() {
  //   console.log(this.spans)
  // },
  methods: {
    clicked() {
      console.log('clicked')
    },
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
    // getSpanInfo: function(span) {
    //   return 'Span info'
    // },
  }
}
</script>


<style>
.custom-span-class:hover {
  outline: 1px solid black;
}
</style>