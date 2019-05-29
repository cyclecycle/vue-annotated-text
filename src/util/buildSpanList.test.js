const { buildSpanList } = require("./buildSpanList");

const text = "Forging is performed by a smith using hammer and anvil.";

const annotations = [
  {
    start: 0,
    length: 10,
    text: "Forging is",
    id: "Forging is" // id same as text for easy visual verification output of correctness
  },
  {
    start: 8,
    length: 12,
    text: "is performed",
    id: "is performed"
  },
  {
    start: 26,
    length: 5,
    text: "smith",
    id: "smith"
  },
  {
    start: 26,
    length: 18,
    text: "smith using hammer",
    id: "smith using hammer"
  },
  {
    start: 38,
    length: 6,
    text: "hammer",
    id: "hammer"
  },
  {
    start: 49,
    length: 5,
    text: "anvil",
    id: "anvil1"
  },
  {
    start: 49,
    length: 5,
    text: "anvil",
    id: "anvil2"
  }
];

const expected = [
  {
    id: 0,
    start: 0,
    length: 8,
    text: "Forging ",
    annotationIds: ["Forging is"]
  },
  {
    id: 1,
    start: 8,
    length: 2,
    text: "is",
    annotationIds: ["Forging is", "is performed"]
  },
  {
    id: 2,
    start: 10,
    length: 10,
    text: " performed",
    annotationIds: ["is performed"]
  },
  { id: 3, start: 20, length: 6, text: " by a ", annotationIds: [] },
  {
    id: 4,
    start: 26,
    length: 5,
    text: "smith",
    annotationIds: ["smith using hammer", "smith"]
  },
  {
    id: 5,
    start: 31,
    length: 7,
    text: " using ",
    annotationIds: ["smith using hammer"]
  },
  {
    id: 6,
    start: 38,
    length: 6,
    text: "hammer",
    annotationIds: ["smith using hammer", "hammer"]
  },
  { id: 7, start: 44, length: 5, text: " and ", annotationIds: [] },
  {
    id: 8,
    start: 49,
    length: 5,
    text: "anvil",
    annotationIds: ["anvil2", "anvil1"]
  },
  { id: 9, start: 54, length: 1, text: ".", annotationIds: [] }
];

test("Annotation spans correspond with text", () => {
  annotations.forEach(annotation => {
    const { start, length } = annotation;
    const end = start + length;
    const span = text.slice(start, end);
    expect(span).toBe(annotation.text);
  });
  const fullTextSpan = text.slice(0, text.length);
  expect(fullTextSpan).toBe(text);
});

test("Builds expected span list", () => {
  const spans = buildSpanList(text, annotations);
  expect(spans).toEqual(expected);
});

test("Span text corresponds exactly with original text", () => {
  const spans = buildSpanList(text, annotations);
  const textSections = spans.map(span => span.text);
  const joinedText = textSections.join("");
  expect(joinedText).toBe(text);
});
