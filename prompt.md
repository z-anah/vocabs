## Stack
* HTML
* Vue 3 (CDN)
* Tailwind CSS (CDN)
* Google Fonts (CDN)
* Google Emoji Icon CDN (NO keyboard emoji, NO keyboard icon)
* Data Source & State: Use a mock CSV dataset baked directly into the Vue component state.
* run python

### Files

```text
vocabs/
├── index.html
├── style.css
│
├── data/
│   ├── categories.csv
│   │
│   ├── ocean/
│   │   └── vocabulary.csv
│   │
│   ├── airplane/
│   │   └── vocabulary.csv
│   │
│   ├── animals/
│   │   └── vocabulary.csv
│   │
│   ├── food/
│   │   └── vocabulary.csv
│   │
│   └── hunger-games-characters/
│       └── vocabulary.csv
│
├── js/
│   ├── app.js
│   ├── data.js
│   ├── parser.js
│   └── utils.js
│
└── assets/
    └── images/
        ├── categories/
        ├── ocean/
        ├── airplane/
        ├── animals/
        ├── food/
        └── hunger-games-characters/
```

#### Creating file, folder etc

Using terminal mac

### CSV

## Interface

### Flow

1. **Choose a Vocabulary Category**

   * The user selects the vocabulary category they want to learn.
   * Examples: **Ocean**, **Airplane**, etc.

2. **Choose a Learning Mode**
   The user selects how they want to learn:

   * **Browse the Vocabulary List**
   * **Learn One by One**
   * **Guess the Image from Audio tts**
   * **Guess the Image**

### Learning Modes

#### 1. Browse the Vocabulary List

* Display all vocabulary items in a **2-column grid**.
* Each item includes:

  * Vocabulary name
  * Image
* When the user clicks an item, play its corresponding audio tts.

#### 2. Learn One by One

* Display vocabulary items **one at a time in a predefined order**.
* Automatically play the corresponding audio tts when each image is displayed.
* The user progresses through the vocabulary items sequentially.

#### 3. Guess the Image from Audio tts

* Play an audio tts pronunciation of a vocabulary item.
* Display **4 randomly selected images** as answer options.
* The user must select the image that matches the audio tts.
* Continue until all vocabulary items have been tested.

#### 4. Guess the Image

* Display vocabulary items as images without revealing the answer.
* Randomly select an image for each question.
* The user must guess the correct vocabulary item.
* Provide:

  * **Hint button** — plays the corresponding audio tts.
  * **Next button** — moves to the next question.
* Continue until all vocabulary items have been tested.

### Design
* Mobile-first view ONLY
* Dark and Light Mode also for the exported image

#### Minimalist
* Whitespace & Density: Use generous padding (p-4 to p-6 on mobile) with tight, highly purposeful gaps between elements (gap-2 or gap-3). Avoid cluttered cards.
* Monochromatic Foundation: Rely on subtle shades of gray (zinc, slate, or neutral in Tailwind) for backgrounds, borders, and secondary text, reserving true black/white for high-contrast text.
* Single-Focus Hierarchy: Every screen or card should have one clear hero element (e.g., the contribution graph), with secondary details tucked into collapsible sections or clean tabular lists.

#### Interactive & Micro-Design Details
* Subtle Borders & Shadows: Instead of heavy drop shadows, use 1px crisp borders (border border-zinc-200 dark:border-zinc-800) and soft, diffused inner glows for active states.
* Typography Pairing: Font stack featuring 'Plus Jakarta Sans' for crisp, modern sans-serif headings and 'Inter' for clean, highly legible body text and UI labels.
* Icon: Google Material Symbols Outlined via CDN (e.g., class="material-symbols-outlined"), exclusively using semantic system icons for all controls, navigation, and visual indicators.

## DEVELOPMENT STYLE 

Do NOT give me the entire project at once.
Work with me interactively.
Develop the project step by step, with one focused implementation task at a time.

Recommended development order:

1. Project structure and base HTML
2. Global styling and design tokens
3. Mock CSV data
4. CSV parser and utility functions
5. Vue application state and routing between screens
6. Category selection screen
7. Learning mode selection screen
8. Browse Vocabulary List mode
9. Learn One by One mode
10. Guess the Image from Audio tts mode
11. Guess the Image mode
12. Audio tts/image handling and feedback states
13. Light/Dark mode
14. Responsive mobile refinements
15. Accessibility and interaction polish
16. Final cleanup and consistency pass

After completing each step, stop and wait for the user to review it before moving to the next step.

## Task

Lets begin

https://chatgpt.com/c/6a807275-dd64-83ec-bbbf-f7870bfcf637