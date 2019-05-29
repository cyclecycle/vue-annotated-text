# vue-annotated-sentence

## Installation

```bash
// With npm
npm install vue-annotated-text
// or yarn
yarn add vue-annotated-text
```

## Example usage

```javascript

<template>
    <div>
        <AnnotatedText
            :text="text"  // The plain text
            :annotations="annotations"  // The array of annotations
            :getAnnotationColor="getAnnotationColor"
            :spanClasses="spanClasses"  // Classes to apply to the rendered <span> elements
            :spanEvents="spanEvents"  // Event listeners for the <span> elements
            :spanAttributes="spanAttributes"  // Any HTML attributes to apply to the <span> elements
        />
    </div>
</template>

<script>
import AnnotatedText from 'vue-annotated-text'

export default {
  name: 'MyComponent',
  components: {
    AnnotatedText
  },
  data() {
    return {
        text: "Forging is performed by a smith using hammer and anvil.",
        annotations: [
          {
            start: 0,
            length: 7,
            id: "forging",
            class: "process"
          },
          {
            start: 26,
            length: 18,
            id: "smith_using_hammer",
            class: "process"
          },
          {
            start: 38,
            length: 6,
            id: "hammer",
            class: "tool"
          },
          {
            start: 49,
            length: 5,
            id: "anvil",
            class: "tool"
          }
        ],
        spanEvents: {
            'click': function(event) { console.log('Span id:', event.target.attributes['data-span-id'].value) },
        },
        spanClasses: ['my-span-class'],
    }
  },
  methods: {
    getAnnotationColor: Function,

  }
  props: {
  },
}
</script>

<style>
.my-span-class:hover {
    outline: 1px solid black;
}
</style>
```

## Acknowledgements

Built with:

- flatten-overlapping-ranges