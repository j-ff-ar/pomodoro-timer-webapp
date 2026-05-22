# ANSWERS

## 1. How to run

Project root commands:

To install Dependencies:

npm install

To Run the Project:
npm run dev


Deployment URL: https://pomodoro-timer-webapp.vercel.app/

## 2. Stack and design choices

I chose React with Vite because it is fast to set up and easy to iterate on for a single-screen assessment. The timer behavior depends on state transitions, so React state plus effects made it straightforward to control running, pausing, resetting, and mode switching.

Two specific choices:

- I kept the app as a single-screen layout so the timer is always the main focus and controls are immediately reachable.
- I made the countdown large and centered with a separate history section so users can read time quickly without losing the session log context.

## 3. Responsive and accessibility

On a 360px phone, the card layout stacks and controls wrap so every button remains usable without horizontal scrolling. On a 1440px laptop, the layout keeps the content centered with more whitespace and the history stays readable.

One accessibility consideration I handled is using `aria-live="polite"` on the timer display so assistive tech can detect updates, plus clear button labels and keyboard-focusable controls.

I could have enhanced its UI by totally depending on AI but it tried to keep it as simplest as possible fulfilling the requirement it is supposed to be providing. Although i can enhance this into more attractive web app.

## 4. AI usage

AI support used:

- break the implementation into small steps (state model, countdown, controls, mode switching, persistence)
- draft and refine specific code updates one feature at a time
- explain each change in beginner-friendly language
- verify what submission files were still missing

A concrete change I made from AI guidance was implementing the daily reset logic by storing both `date` and `history` in localStorage, and clearing old history when the saved date is not today.


## 5. Honest gap

The least polished part is that focus and break durations are currently fixed values in state and not user-configurable through inputs yet. With another day, I would add validated controls for editing both durations and improve history entries with exact completion timestamps.
