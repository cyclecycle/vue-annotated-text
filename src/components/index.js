import Vue from 'vue'
import AnnotatedText from './AnnotatedText.vue'
import ComposedText from './ComposedText.vue'

const Components = {
  AnnotatedText,
  ComposedText
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components