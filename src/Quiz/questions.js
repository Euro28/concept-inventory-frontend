const json = {
  "title": "Concept Inventory",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "radiogroup",
      "name": "Set question",
      "title": "Let S be a well defined set (a set with no ambiguity on whether an object belongs to the set), for example C = {a,b,c} is well-defined as it is clear what is and is not in the set. Let {} be the empty set with no elements, which of the following statements are always true.",
      "isRequired": true,
      "choices": [
       {
        "value": "item1",
        "text": "{}  ∈  S"
       },
       {
        "value": "correct",
        "text": "{} ⊆ S"
       },
       {
        "value": "item3",
        "text": "{} ⊂ S"
       },
       {
        "value": "item4",
        "text": "{} = {{}}"
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "Inductive Reasoning question",
      "title": "A man and woman are walking side by side and their RIGHT feet touch the ground at the same time. The woman takes THREE steps for each TWO steps the man takes. Which of the following most accurately represents the number of steps the man takes until the LEFT foot of the man and the woman touch the ground at the same time",
      "isRequired": true,
      "choices": [
       {
        "value": "item1",
        "text": "6"
       },
       {
        "value": "item2",
        "text": "6*n for all n = 1,2,3..."
       },
       {
        "value": "item3",
        "text": "some k = 1,2,3... 10000"
       },
       {
        "value": "item4",
        "text": "12*n for all n=1,2,3..."
       },
       {
        "value": "correct",
        "text": "None of the above"
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "Implication question",
      "title": "If the teacher marks all the exam papers, they will get paid 50 pounds, the teacher did not get paid 50 pounds, which of the following conclusions are valid? (select one)",
      "isRequired": true,
      "choices": [
       {
        "value": "explanation",
        "text": "The teacher marked the papers"
       },
       {
        "value": "explanation",
        "text": "The teacher did not mark the papers"
       },
       {
        "value": "explanation",
        "text": "If the teacher got paid 50 pounds then they marked all the papers"
       },
       {
        "value": "explanation",
        "text": "The teacher did not get the papers"
       },
       {
        "value": "correct",
        "text": "None of the above"
       }
      ]
     }
    ]
   }
  ]
 }
export default json;
