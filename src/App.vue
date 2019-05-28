<template>
  <div id="app">
    <AnnotatedText
      text="Forging is performed by a smith using hammer and anvil."
      v-bind:annotations="annotations"
      v-bind:getAnnotationColor="getAnnotationColor"
      v-bind:getAnnotationInfo="getAnnotationInfo"
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
      annotations: annotations
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
    getAnnotationInfo: function(annotation) {
      return 'Annotation info'
    }
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
</style>
