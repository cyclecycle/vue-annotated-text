# vue-annotated-text

![Example output](https://github.com/cyclecycle/vue-annotated-text/blob/master/example_output.png)

## Features

- Renders the text as a set of spans representing the segments composing the sentence
- These spans can be associated with custom styles or events
- Overlapping annotations are represented by mixed colors

## Installation

With npm:

```bash
npm install vue-annotated-text
```

With yarn:

```bash
yarn add vue-annotated-text
```

## Example usage

```html
<template>
    <div>
        <AnnotatedText
            :text="text"  <!-- The text to be annotated -->
            :annotations="annotations"  <!-- The array of annotations -->
            :getAnnotationColor="getAnnotationColor"  <!-- Function called to get color value to signal the annotation -->
            :spanClasses="spanClasses"  <!-- CSS classes to apply to the rendered <span> elements -->
            :spanEvents="spanEvents"  <!-- Event listeners to apply to the <span> elements -->
            :spanAttributes="spanAttributes"  <!-- Any HTML attributes to apply to the <span> elements -->
        />
    </div>
</template>
```
```js
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
            'click': function(event) {
                const spanId = event.target.attributes['data-span-id'].value
                console.log('Span id:', spanId) 
            },
        },
        spanClasses: ['my-span-class'],
    }
  },
  methods: {
    getAnnotationColor: function(annotation) {
      const classToColor = {
        'process': '#f44283',
        'tool': '#41acf4',
      }
      const color = classToColor[annotation.class]
      return color  // Must return hex value
    },
  }
}
</script>
```
```css
<style>
.my-span-class:hover {
    outline: 1px solid black;
}
</style>
```

## Acknowledgements

Uses:

- [flatten-overlapping-ranges](https://github.com/derhuerst/flatten-overlapping-ranges)

## TODO

- Add default info box onHover
