<template>
  <div id="app">
    <AnnotatedText
      :text="text"
      :annotations="annotations"
      :spanEvents="spanEvents"
      :spanClasses="spanClasses"
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
        'click': function(e) {
          console.log(e.target.attributes['data-span-id'].value)
        }
      },
      spanClasses: ['custom-span-class'],
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
.custom-span-class:hover {
  outline: 1px solid black;
}
</style>
