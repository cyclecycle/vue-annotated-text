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
            :getSpanClasses="getSpanClasses"  <!-- function returning CSS classes to apply to the rendered <span> element -->
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
        {  // All annotations must have a unique 'id', and values for 'start' and 'length'
          id: "forging",
          start: 0,
          length: 7,
          class: "process"
        },
        {
          id: "smith_using_hammer",
          start: 26,
          length: 18,
          class: "process"
        },
        {
          id: "hammer",
          start: 38,
          length: 6,
          class: "tool"
        },
        {
          id: "anvil",
          start: 49,
          length: 5,
          class: "tool"
        }
      ],
      spanEvents: {
        'click': function(e, annotations) {  // All event callbacks take arguments: (event, annotations)
          console.log(annotations)
        },
      },
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
    getSpanClasses: function(span) {
      const classes = ['my-span-class']
      const annotationIds = span.annotationIds
      if (annotationIds.length > 0) {
        classes.push('annotated')
      }
      return classes
    }
  }
}
</script>
```
```css
<style>
.my-span-class:hover {
  outline: 1px solid black;
}
.annotated {
  font-weight: bold;  
}
</style>
```

## Acknowledgements

Uses:

- [flatten-overlapping-ranges](https://github.com/derhuerst/flatten-overlapping-ranges)
- [color-mixer](https://github.com/kosamari/color-mixer)

## TODO

- Add default info box on hover
