# Vocabulary Learning App

A **mobile-first multilingual vocabulary learning platform** built with **Vue 3, Tailwind CSS, and browser-native Text-to-Speech**.

Designed for language learning, visual memorization, and custom knowledge datasets — from everyday vocabulary to **character names, places, objects, and specialized topics**.

## Features

* **5 learning languages**

  * Indonesian
  * Arabic with full tashkeel
  * English (USA)
  * French
  * Malagasy
* **Custom vocabulary categories**

  * Ocean
  * Airplane
  * Animals
  * Food
  * Characters and other custom datasets
* **4 learning modes**

  * Browse Vocabulary
  * Learn One by One
  * Guess Image from Audio
  * Guess the Image
* Browser-native **Text-to-Speech**
* Randomized quiz questions and answers
* Progress tracking and scoring
* Image fallback handling
* Light / Dark mode
* Mobile-first responsive interface
* CSV-driven data architecture
* Modular JavaScript structure

## Tech Stack

| Layer        | Technology                |
| ------------ | ------------------------- |
| Frontend     | HTML5                     |
| Framework    | Vue 3 CDN                 |
| Styling      | Tailwind CSS CDN          |
| Typography   | Plus Jakarta Sans + Inter |
| Icons        | Material Symbols          |
| Data         | CSV                       |
| Audio        | Web Speech API            |
| Architecture | Modular JavaScript        |

## Architecture

```text
vocabs/
├── index.html
├── style.css
│
├── data/
│   ├── categories.csv
│   ├── ocean/
│   │   └── vocabulary.csv
│   ├── airplane/
│   │   └── vocabulary.csv
│   ├── animals/
│   │   └── vocabulary.csv
│   └── food/
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
        └── food/
```

## Product Design

The interface follows a deliberately minimal design system:

* Mobile-first UX
* Clear single-focus screens
* Monochromatic visual foundation
* Generous whitespace
* Crisp borders instead of heavy shadows
* Semantic Material icons
* RTL support for Arabic
* Reusable learning components

## Data-Driven by Design

Vocabulary is separated from application logic.

Adding a new learning category does not require rebuilding the application:

```text
New Category
     ↓
CSV Dataset
     ↓
Images
     ↓
Vocabulary Engine
     ↓
All Learning Modes
```

This makes the platform adaptable to **language courses, educational products, specialized training, and custom client datasets**.

## Development

The project is intentionally built incrementally with Git:

```text
Structure
→ Design System
→ Data
→ Parser
→ Vue State
→ Category Selection
→ Learning Modes
→ TTS
→ Quiz Logic
→ Theme
→ Accessibility
→ Final Polish
```

Each implementation stage is committed separately to keep the project maintainable and reviewable.

## Why This Project

This is more than a vocabulary flashcard UI.

It demonstrates the ability to build a **data-driven interactive product** with:

* Component-oriented frontend architecture
* Multilingual content handling
* RTL language support
* Dynamic datasets
* Browser APIs
* Interactive quiz state
* Randomized learning algorithms
* Error handling
* Responsive UX
* Maintainable project structure

**Built to turn structured educational data into a polished learning experience.**