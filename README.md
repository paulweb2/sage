# SAGE – Supporting Accessible Guidance in Education

SAGE is a mobile-first learning companion for **The Open University** that curates video, audio, and written guidance to help educators understand and support students with a wide range of disabilities. Built with the Ionic Framework, the app places inclusive-practice know‑how in your pocket so you can reference it any time, online or off.

---

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Section Structure](#section-structure)
4. [Getting Started](#getting-started)
5. [Project Layout](#project-layout)
6. [Accessibility](#accessibility)
7. [Content & Licence](#content--licence)
8. [Contributing](#contributing)
9. [Roadmap](#roadmap)
10. [Contact](#contact)

---

## Overview <a id="overview"></a>
SAGE (pronounced “sage” like the mentor) is designed to answer the most common *“What do I do in my module/class when…?”* questions surrounding disability and learning. Whether you’re preparing course materials, facilitating tutorials, or marking assessments, SAGE surfaces practical tips, case studies, and multimedia resources in seconds.

> **Scope** – The first release focuses on four disability categories identified by the project team: **Physical**, **Cognition or Learning**, **Communication & Interaction**, and **Multiple Impairments**. Each category contains around 1,000 words of guidance, supporting PDFs, images, short videos or audio case studies, and reflective journal prompts.

---

## Key Features <a id="key-features"></a>
- **Bite-sized guidance** written by OU experts and practitioners.
- **Rich media** – streaming or offline-cached video, audio, and infographics.
- **Reflective tasks** that export to the learner’s journal.
- **Optional screening tool**: a simple questionnaire that signposts which sections to explore next.
- **Fully accessible UI**: works with screen readers, dynamic text, and high‑contrast modes.

---

## Section Structure <a id="section-structure"></a>
```text
Section 1 – General Information
└─ Universal Design for Learning
   Assistive technologies overview
   OU policy & support contacts

Section 2 – Specific Disabilities
├─ 2.1 Physical
│   └─ Visual • Hearing • Physical • Speech
├─ 2.2 Cognition or Learning
├─ 2.3 Communication & Interaction
└─ 2.4 Multiple Impairments
    • Resources (PDF / images / video)
    • Case study (audio or video)
    • Reflective tasks
```
Each disability topic follows the same pattern so users can predict where to find **Resources → Case Study → Reflection**.

---

## Getting Started <a id="getting-started"></a>
### Prerequisites
- **Node.js ≥ 20** and **npm ≥ 10**
- **Ionic CLI**: `npm i -g @ionic/cli`
- **Capacitor 5** (bundled with Ionic 7)

### Installation
```bash
# 1  Clone the repository
$ git clone https://github.com/open-university-sage/sage-app.git
$ cd sage-app

# 2  Install dependencies
$ npm install

# 3  Run in the browser
$ ionic serve

# Build native shells (optional)
$ ionic capacitor add android
$ ionic capacitor add ios
```

---

## Project Layout <a id="project-layout"></a>
```text
sage-app/
├─ src/
│  ├─ app/
│  │  ├─ pages/            # Angular routing + page modules
│  │  ├─ components/       # Re-usable Ionic components
│  │  └─ services/         # Data & storage providers
│  └─ assets/
│     ├─ media/            # Videos & audio
│     ├─ pdf/              # Resource documents
│     └─ images/           # Icons & illustrations
├─ capacitor.config.ts     # Native build settings
└─ README.md               # (you are here)
```

---

## Accessibility <a id="accessibility"></a>
- **WCAG 2.2 AA** compliance target
- Logical tab order and semantic HTML components
- Colour pairs checked against contrast ratios ≥ 4.5 : 1
- Captions & transcripts for all media
- Tested with VoiceOver (iOS), TalkBack (Android), and NVDA (Windows)

---

## Content & Licence <a id="content--licence"></a>
| Asset type       | Licence           | Notes                               |
|------------------|-------------------|-------------------------------------|
| Code             | MIT               | See `LICENSE` file                  |
| OU‑produced text/media | © Open University | Re‑use with written permission     |
| Third‑party media| Various (CC‑BY, etc.) | Each file embedded with metadata |

---

## Contributing <a id="contributing"></a>
1. **Fork** the repo and create a feature/bug branch.
2. Follow the **commit convention**: `feat(ui): add high‑contrast button`.
3. Lint & test: `npm run lint && npm run test`.
4. Open a **pull request** describing your change and how to test it.

> **Note** – Please include accessibility testing notes with every UI PR.

---

## Roadmap <a id="roadmap"></a>
| Milestone | Target       | Status        |
|-----------|--------------|---------------|
| Alpha MVP (content stub, navigation) | 2025‑09‑30 | 🔄 In progress |
| Beta (full content & screening tool) | 2025‑12‑15 | ⏳ Planned     |
| v1 Store release | 2026‑02‑28 | ⏳ Planned |

---

## Contact <a id="contact"></a>
Created by the **Access & Success Team** at *The Open University*.

- Project lead: *Jane Doe* – <jane.doe@open.ac.uk>
- Issues & bugs: please use the [GitHub issue tracker](https://github.com/open-university-sage/sage-app/issues).

*Happy teaching, happy learning!*
