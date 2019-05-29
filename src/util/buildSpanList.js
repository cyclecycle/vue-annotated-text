const flatten = require("flatten-overlapping-ranges");

export const buildSpanList = (text, annotations) => {
  // Prepare range list to send to flatten-overlapping-spans.flatten()
  let ranges = [];
  const fullRange = ["baseText", 0, text.length];
  ranges.push(fullRange);
  const annotationRanges = annotations.map(annotation => {
    return [annotation.id, annotation.start, annotation.length];
  });
  ranges = ranges.concat(annotationRanges);
  // Flatten
  const sections = Array.from(flatten(ranges));
  // Each section becomes a span
  let sectionTextStart = 0;
  let spanId = 0;
  const spans = sections.map(section => {
    const length = section[0];
    let annotationIds = section[1];
    annotationIds = annotationIds.filter(annotationId => {
      return annotationId !== 'baseText'
    })
    const start = sectionTextStart;
    const end = sectionTextStart + length;
    const sectionText = text.slice(start, end);
    const span = {
      id: spanId,
      start: start,
      length: length,
      text: sectionText,
      annotationIds: annotationIds
    };
    spanId = spanId + 1;
    sectionTextStart = end;
    return span;
  });
  return spans;
};
