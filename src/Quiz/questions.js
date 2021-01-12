const json = {
  "title": "Concept Inventory",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "radiogroup",
      "name": "Set question",
      "title": "Let S be a well defined set (a set with no ambiguity on whether an object belongs to the set), for example C = {a,b,c} is well-defined as it is clear what is and is not in the set. Let {} be the empty set with no elements, which of the following statements are always true. (PICK ONE)",
      "isRequired": true,
      "choices": [
       {
        "value": "a",
        "text": "{}  ∈  S"
       },
       {
        "value": "correct",
        "text": "{} ⊆ S"
       },
       {
        "value": "c",
        "text": "{} ⊂ S"
       },
       {
        "value": "d",
        "text": "{} = {{}}"
       }
      ],
      "colCount": 0
     }
    ]
   },
   {
    "name": "page2",
    "elements": [
     {
      "type": "radiogroup",
      "name": "implication question 2",
      "title": "Suppose each card has a number on one side and a letter on the other. Which cards are relevant to turn over if you want to know whether the following statement is false? If a card has a vowel on one side, then it has an even number on the other side.",
      "isRequired": true,
      "choices": [
       {
        "value": "a",
        "text": "The A card"
       },
       {
        "value": "b",
        "text": "The A card and the 7 card"
       },
       {
        "value": "c",
        "text": "The A card and the 4 card"
       },
       {
        "value": "d",
        "text": "The A, 4, and 7 card"
       },
       {
        "value": "e",
        "text": "All the cards"
       }
      ],
      "colCount": 0
     },
     {
      "type": "image",
      "name": "question1",
      "startWithNewLine": false,
      "imageLink": "https://i.ibb.co/5GLyqdH/cards.png",
      "imageHeight": 250,
      "imageWidth": 500
     },
     {
      "type": "radiogroup",
      "name": "Implication question",
      "title": "If the teacher marks all the exam papers, they will get paid 50 pounds, the teacher did not get paid 50 pounds, which of the following conclusions are valid? (select one)",
      "isRequired": true,
      "choices": [
       {
        "value": "a",
        "text": "The teacher marked the papers"
       },
       {
        "value": "b",
        "text": "The teacher did not mark the papers"
       },
       {
        "value": "c",
        "text": "If the teacher got paid 50 pounds then they marked all the papers"
       },
       {
        "value": "d",
        "text": "The teacher did not get the papers"
       },
       {
        "value": "e",
        "text": "None of the above"
       }
      ],
      "colCount": 0
     }
    ]
   },
   {
    "name": "page3",
    "elements": [
     {
      "type": "image",
      "name": "question5",
      "startWithNewLine": false,
      "imageLink": "https://i.ibb.co/997RDDt/deduce.png",
      "imageWidth": 1000
     },
     {
      "type": "radiogroup",
      "name": "question6",
      "title": "~p => q | p",
      "isRequired": true,
      "choices": [
       "item1",
       "item2",
       "item3"
      ]
     }
    ]
   },
   {
    "name": "page4",
    "elements": [
     {
      "type": "checkbox",
      "name": "modus ponens",
      "title": "Assume the following statements are true, tick ALL statements which can be deduced.  ",
      "isRequired": true,
      "choices": [
       {
        "value": "correct-a",
        "text": "p"
       },
       {
        "value": "b",
        "text": "~p"
       },
       {
        "value": "correct-c",
        "text": "q"
       },
       {
        "value": "c",
        "text": "~q"
       },
       {
        "value": "d",
        "text": "None of the above"
       }
      ],
      "colCount": 0
     },
     {
      "type": "image",
      "name": "question7",
      "startWithNewLine": false,
      "imageLink": "https://i.ibb.co/dgrnTts/ponens.png",
      "imageFit": "cover",
      "imageWidth": 250
     },
     {
      "type": "checkbox",
      "name": "modus tollens",
      "title": "Assume the following statements are true, tick ALL statements which can be deduced.",
      "isRequired": true,
      "choices": [
       {
        "value": "a",
        "text": "p"
       },
       {
        "value": "b",
        "text": "~p"
       },
       {
        "value": "c",
        "text": "q"
       },
       {
        "value": "d",
        "text": "~q"
       },
       {
        "value": "e",
        "text": "None of the above"
       }
      ],
      "colCount": 0
     },
     {
      "type": "image",
      "name": "question2",
      "startWithNewLine": false,
      "imageLink": "https://i.ibb.co/nz6hzB1/tollens.png",
      "imageWidth": 250
     }
    ]
   },
   {
    "name": "page5",
    "elements": [
     {
      "type": "checkbox",
      "name": "biconditional question",
      "title": "Check all choices the result in ~p <=> q holding.",
      "isRequired": true,
      "choices": [
       {
        "value": "a",
        "text": "p,q both true"
       },
       {
        "value": "b",
        "text": "p true q false"
       },
       {
        "value": "c",
        "text": "p false q true"
       },
       {
        "value": "d",
        "text": "p,q both false"
       }
      ],
      "colCount": 0
     }
    ]
   },
   {
    "name": "page6",
    "elements": [
     {
      "type": "image",
      "name": "question3",
      "imageLink": "https://i.ibb.co/JH3jP0L/comp.png",
      "imageHeight": 100,
      "imageWidth": 900
     },
     {
      "type": "radiogroup",
      "name": "negation question",
      "title": "Consider the above statement The negation of this statement is",
      "isRequired": true,
      "choices": [
       {
        "value": "a",
        "text": "x < -2 or 2 < x or -1 < x < 1"
       },
       {
        "value": "b",
        "text": "x < -2 or 2 < x"
       },
       {
        "value": "c",
        "text": "-1 < x < 1"
       },
       {
        "value": "d",
        "text": "-2 < x < 2"
       },
       {
        "value": "e",
        "text": "x <= -2 or 2 <= x or -1 < x < 1"
       }
      ],
      "colCount": 0
     }
    ]
   },
   {
    "name": "page7",
    "elements": [
     {
      "type": "radiogroup",
      "name": "Inductive Reasoning question",
      "title": "A man and woman are walking side by side and their RIGHT feet touch the ground at the same time. The woman takes THREE steps for each TWO steps the man takes. Which of the following most accurately represents the number of steps the man takes until the LEFT foot of the man and the woman touch the ground at the same time",
      "isRequired": true,
      "choices": [
       {
        "value": "a",
        "text": "6"
       },
       {
        "value": "b",
        "text": "6*n for all n = 1,2,3..."
       },
       {
        "value": "c",
        "text": "some k = 1,2,3... 10000"
       },
       {
        "value": "d",
        "text": "12*n for all n=1,2,3..."
       },
       {
        "value": "e",
        "text": "None of the above"
       }
      ],
      "colCount": 0
     }
    ]
   },
   {
    "name": "page8",
    "elements": [
     {
      "type": "radiogroup",
      "name": "xor question",
      "title": "Suppose a pizza shop allows pizza's with the following toppings, p = pepperoni, h = ham, m = mushrooms, what boolean expression specifies a pizza with exactly two toppings. (Where ⊕ is XOR)",
      "isRequired": true,
      "choices": [
       {
        "value": "a",
        "text": "ph + pm + hm"
       },
       {
        "value": "b",
        "text": "p ⊕ h ⊕ m"
       },
       {
        "value": "c",
        "text": "~(p ⊕ h ⊕ m)"
       },
       {
        "value": "d",
        "text": "ph~m + p~hm + ~phm"
       }
      ],
      "colCount": 0
     }
    ]
   }
  ],
  "maxTimeToFinish": 5000
 }
export default json;
