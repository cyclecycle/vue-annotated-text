import Vue from 'vue'
import AnnotatedText from './AnnotatedText.vue'

const Components = {
  AnnotatedText,
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components