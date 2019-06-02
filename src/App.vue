<template>
  <div id="app">
    <AnnotatedText
      :text="text"
      :annotations="annotations"
      :spanEvents="spanEvents"
      :getSpanClasses="getSpanClasses"
      :getAnnotationColor="getAnnotationColor"
    />
  </div>
</template>

<script>
import AnnotatedText from './components/AnnotatedText.vue'
import annotations from './data/annotations.js'

export default {
  name: 'app',
  components: {
    AnnotatedText
  },
  data() {
    return {
      text: "Forging is performed by a smith using hammer and anvil.",
      annotations: annotations,
      spanEvents: {
        'click': function(e, annotations) {  // All event callbacks take arguments: (event, annotations)
          console.log(annotations)
        },
      },
      spanAttributes: {},
    }
  },
  methods: {
    getAnnotationColor: function(annotation) {
      const classToColor = {
        'process': '#f44283',
        'tool': '#41acf4',
      }
      const color = classToColor[annotation.class]
      return color
    },
    getSpanClasses: function(span) {
      const classes = ['my-span-class']
      const annotationIds = span.annotationIds
      if (annotationIds.length > 0) {
        classes.push('annotated')
      }
      return classes
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.my-span-class:hover {
  outline: 1px solid black;
}
.annotated {
  font-weight: bold;
}
</style>
