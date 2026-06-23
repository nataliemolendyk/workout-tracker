# Product Requirements Document: Workout Tracker

**Version:** 1.0  
**Date:** June 22, 2026  
**Author:** Product Manager (via interview)  
**Status:** Draft  

---

## 1. Executive Summary

A zero-backend, client-side JavaScript web application hosted on GitHub Pages that generates a personalized weight-loss plan. Users input basic anthropometric data and goals, and receive calculated calorie/macro targets, an estimated timeline, and a prescriptive weekly workout schedule. All data persists via `localStorage`; no accounts or server required.

---

## 2. Target Persona

| Attribute | Value |
|-----------|-------|
| **Primary user** | Adults aged 18–30 searching for structured weight loss guidance |
| **Fitness background** | Beginner to intermediate; no prior knowledge required |
| **Goal** | Weight loss (cutting) |
| **Motivation** | Reduce the stress and guesswork of creating a plan from scratch |
| **Tech comfort** | Comfortable using a single-page web app on desktop or mobile |

---

## 3. User Stories

| ID | User Story |
|----|------------|
| US-01 | As a new user, I want to enter my height, weight, age, sex, goal weight, activity level, and time frame so that the app can personalize my plan. |
| US-02 | As a returning user, I want my profile and progress to be saved so I don't have to re-enter data each visit. |
| US-03 | As a user, I want to see my BMR, TDEE, daily calorie deficit, target calorie intake, and macronutrient breakdown so I understand my diet targets. |
| US-04 | As a user, I want to see an estimated timeline to my goal weight (either derived from a default deficit or from my custom deadline). |
| US-05 | As a user, I want to receive a prescriptive weekly workout schedule so I know exactly what to do each day. |
| US-06 | As a user, I want to choose between gym and at-home exercise options so the plan fits my environment. |
| US-07 | As a user, I want to browse, filter, and add custom exercises so I can tailor my exercise library. |
| US-08 | As a user, I want to log my weight over time and see a trend graph so I can track my progress. |
| US-09 | As a user, I want to download my plan as a PDF so I can take it offline or print it. |

---

## 4. Functional Requirements

### 4.1 Tab Structure

The app uses a **tab-based navigation** with four tabs:

| Tab | Contents |
|-----|----------|
| **Profile** | Input fields (height, weight, age, sex, goal weight, activity level, time frame) + Settings (workout days override, macro split, theme toggle) |
| **My Plan** | Calculated results (BMR, TDEE, deficit, timeline, target calories, macros) + Weight progress graph |
| **Workout Schedule** | Prescriptive weekly rotation with embedded exercises |
| **Exercise Library** | Browse, search/filter by muscle group or equipment, add custom exercise form |

### 4.2 Profile Tab (Inputs + Settings)

| Field | Type | Notes |
|-------|------|-------|
| Height | Number (cm or ft/in) | Input with unit toggle |
| Weight | Number (kg or lbs) | Input with unit toggle |
| Age | Number | 18–100 |
| Sex | Dropdown | Male / Female (for BMR equation) |
| Goal Weight | Number | Same unit as weight |
| Activity Level | Dropdown | Sedentary, Light, Moderate, Active, Very Active |
| Time Frame | Toggle + Input | Option A: "I have a deadline" → enter weeks. Option B: "Healthy pace" → auto-calculated |
| Workout Days | Number slider | 1–7, default 3 |
| Macro Split | Three number inputs | Protein / Carbs / Fat %, default 40/30/30 |
| Theme Toggle | Switch | Light / Dark |

### 4.3 My Plan Tab (Calculations + Progress)

#### Calculations (read-only display):

| Metric | Formula / Source |
|--------|------------------|
| BMR | Mifflin-St Jeor equation |
| TDEE | BMR × Activity Level multiplier |
| Daily Deficit | If custom deadline: (goal weight change × 7700) / (days × 7). Else: 500 kcal (default) |
| Target Calories | TDEE – Deficit |
| Weekly Loss | Deficit × 7 / 7700 (kg) or × 7 / 3500 (lbs) |
| Timeline | If auto: (weight change × 7700) / (500 × 7) weeks. If custom: user-entered value |
| Macros (g) | (Target Calories × %protein) / 4, (%carbs) / 4, (%fat) / 9 |

#### Progress Tracking:

- **Manual weight entry:** user types a weight value and date (auto-filled to today)
- **Storage:** array of `{ date: string, weight: number }` persisted in localStorage
- **Visualization:** line chart (x-axis: date, y-axis: weight) using a lightweight library (e.g., Chart.js or canvas)

### 4.4 Workout Schedule Tab

- **Default rotation (3 days):**
  - Day 1: Upper Body
  - Day 2: Lower Body
  - Day 3: Core (first) + Cardio (second)
- **User can override days per week** (1–7) via Profile Settings
- **Schedule re-generates** whenever days-per-week changes
- Each day displays:
  - Day label (e.g., "Day 1 – Upper Body")
  - List of exercises pulled from the library filtered by muscle group
  - Reps / Sets / Rest (curated by goal: weight loss → higher reps, shorter rest)
  - Equipment indicator (gym icon vs home icon)

#### Prescriptive Day Types (extensible for 4–7 day schedules):

| Days/Week | Rotation |
|-----------|----------|
| 1 | Full Body |
| 2 | Upper / Lower |
| 3 (default) | Upper / Lower / Core+Cardio |
| 4 | Upper / Lower / Core+Cardio / Full Body |
| 5 | Upper / Lower / Core+Cardio / Upper / Lower |
| 6 | Upper / Lower / Core+Cardio / Push / Pull / Legs |
| 7 | Upper / Lower / Core+Cardio / Push / Pull / Legs / Full Body |

### 4.5 Exercise Library Tab

- **Pre-populated JSON array** of exercises, each with:
  - `id` (string)
  - `name` (string)
  - `description` (string, e.g., "Stand with feet shoulder-width apart…")
  - `muscleGroup` (enum: `upper`, `lower`, `core`, `cardio`, `full_body`)
  - `equipment` (enum: `none`, `dumbbell`, `barbell`, `machine`, `band`, `cardio_machine`)
  - `goal` (enum: `weight_loss`, `toning`, `strength`)
  - `reps` (string, e.g., "12–15")
  - `sets` (number)
  - `rest` (string, e.g., "45 sec")
- **User can add custom exercises** via a form (stored in localStorage under a separate key)
- **Filter bar:** by muscle group, equipment, or free-text search
- **Grid/card display** of exercises

### 4.6 PDF Export

- A "Download PDF" button on **My Plan** and/or **Workout Schedule** tabs
- Generated client-side using `jsPDF` or `html2pdf.js`
- Contains:
  - User profile summary (age, sex, goal)
  - Calorie/macro targets
  - Weekly schedule with exercises

---

## 5. Non-Functional / Technical Requirements

| Requirement | Detail |
|-------------|--------|
| **Hosting** | Static site on GitHub Pages (free tier) |
| **Zero backend** | No API calls, no server, no database — 100% client-side |
| **Persistence** | `localStorage` for profile, custom exercises, weight log |
| **Frameworks** | Vanilla JavaScript or single JS framework (e.g., plain DOM or Svelte / Alpine if preferred; no React unless you want it) |
| **Chart library** | Lightweight, e.g., Chart.js |
| **PDF library** | jsPDF or html2pdf.js |
| **Responsive** | Works on mobile (≥320px) and desktop |
| **Dark mode** | CSS custom properties toggle |
| **Performance** | No external API latency; all computation is O(1) |

---

## 6. Data Model (localStorage Keys)

| Key | Type | Description |
|-----|------|-------------|
| `workout_profile` | Object | `{ height, weight, age, sex, goalWeight, activityLevel, timeFrameMode, customWeeks, workoutDays, macroProtein, macroCarbs, macroFat, theme }` |
| `workout_progress` | Array | `[ { date: "2026-06-22", weight: 82.5 }, … ]` |
| `workout_exercises` | Array (custom) | User-added exercises; app merges with built-in array at runtime |
| `workout_plan_cache` | Object (optional) | Pre-computed schedule to avoid recalculation on tab switch |

---

## 7. Acceptance Criteria

| ID | Criterion |
|----|-----------|
| AC-01 | User can complete full flow (input → results → schedule → PDF) without any network requests to a backend |
| AC-02 | Closing and reopening the browser restores the most recent profile and progress data |
| AC-03 | BMR / TDEE / deficit / timeline calculations match manually verified values (±1%) |
| AC-04 | Workout schedule respects the user-chosen number of days per week and gym/home preference |
| AC-05 | Custom exercises added in the Library tab appear in the Workout Schedule tab immediately |
| AC-06 | Weight progress chart renders with at least one data point; chart updates instantly on new entry |
| AC-07 | PDF download produces a valid, printable file with at least the summary and schedule |
| AC-08 | Dark mode toggle persists across sessions and applies to all tabs |
| AC-09 | All UI renders without console errors in latest Chrome, Firefox, and Safari |

---

## 8. Future Considerations (Post-MVP)

- **Progressive Web App (PWA)** – service worker for offline use and install prompt
- **Export/import JSON backup** of all localStorage data
- **Email/print** alternative to PDF
- **Alternative goals** (maintenance, muscle gain) with different macro splits
- **Meal suggestions** or recipe ideas based on calorie/macro targets
- **Reminder/calendar integration** (Web Push or Calendar API)

---

**End of PRD.**