# AGENTS.md

# Cursor Agent Guide

This file defines how AI coding agents should work on the **Signal to System** cinematic scroll storytelling website.

All agents must read:

1. `TASKS.md`
2. `DESIGN.md`
3. `AGENTS.md`
4. Current project files

Before making changes.

---

## Project Mission

Build a cinematic one-page website where scrolling controls a visual story.

Core transformation:

```txt
signal → spark → chaos → structure → system → launch
```

The site should feel like:

> Netflix intro meets art installation.

---

## Agent Working Rules

1. Read the relevant files before editing.
2. Make the smallest complete change for the current phase.
3. Do not skip phases.
4. Do not add unnecessary libraries.
5. Do not create random animations without story purpose.
6. Keep TypeScript strict and clean.
7. Keep animation logic modular.
8. Preserve accessibility and reduced motion behavior.
9. Run quality checks after each phase.
10. Explain what changed after implementation.

---

## Required Agent Output Format

After each task, respond with:

```md
## Summary
- What was implemented.

## Files Changed
- List changed files.

## How To Test
- Commands to run.
- Manual checks.

## Notes
- Any limitation or next step.
```

---

## Agent Roles

## 1. Planning Agent

### Purpose

Break the project into safe, sequential implementation steps.

### Responsibilities

- Read `TASKS.md`.
- Verify current progress.
- Identify the current phase.
- Create a small implementation plan.
- Avoid overbuilding.
- Update tasks only when needed.

### Must Avoid

- Starting multiple phases at once.
- Adding complex 3D before layout exists.
- Rewriting the full project without reason.

---

## 2. Design System Agent

### Purpose

Implement the visual foundation.

### Responsibilities

- Add color variables.
- Add typography system.
- Add spacing rules.
- Add background layers.
- Add scene layout.
- Add responsive styles.
- Ensure the site matches `DESIGN.md`.

### Must Avoid

- Generic SaaS styling.
- Too many colors.
- Overly decorative UI.
- Poor mobile readability.

---

## 3. Scroll Motion Agent

### Purpose

Implement Lenis, GSAP, and scroll-synced cinematic motion.

### Responsibilities

- Register GSAP safely.
- Add ScrollTrigger setup.
- Add scroll progress.
- Build scene timelines.
- Add pinned sections only when needed.
- Clean up animation instances.
- Respect reduced motion.

### Must Avoid

- Running GSAP during SSR.
- Creating duplicate ScrollTriggers.
- Scroll-jacking.
- Overusing pinning.
- Animating layout properties when transforms work.

---

## 4. Three.js Scene Agent

### Purpose

Implement the persistent 3D world.

### Responsibilities

- Add React Three Fiber Canvas.
- Add camera, lights, particles, and main object.
- Keep geometry simple first.
- Add object evolution across scenes.
- Optimize render performance.
- Add WebGL fallback.

### Must Avoid

- Importing huge models early.
- Overusing postprocessing.
- Causing hydration errors.
- Creating expensive re-renders.
- Making mobile unusable.

---

## 5. Cinematic UI Agent

### Purpose

Create premium typography, overlays, project cards, buttons, and micro-interactions.

### Responsibilities

- Add animated text components.
- Add scene labels.
- Add CTA button.
- Add project cards.
- Add hover interactions.
- Add desktop-only cursor glow if appropriate.
- Maintain accessibility.

### Must Avoid

- Unreadable text.
- Tiny click targets.
- Hover-only access.
- Excessive glitch effects.
- UI that fights the 3D scene.

---

## 6. Performance Agent

### Purpose

Keep the site smooth and production-ready.

### Responsibilities

- Check build output.
- Reduce unnecessary renders.
- Cap canvas DPR.
- Lazy load heavy components.
- Add reduced effects mode.
- Check mobile performance.
- Remove dead code.
- Check bundle weight where possible.

### Must Avoid

- Premature optimization before features work.
- Removing necessary accessibility.
- Hiding performance issues.

---

## 7. QA Agent

### Purpose

Review correctness, design quality, accessibility, and production readiness.

### Responsibilities

- Run lint and build.
- Check browser console.
- Check responsiveness.
- Check reduced motion.
- Check keyboard navigation.
- Check visual consistency.
- Compare output against `DESIGN.md`.

### Must Avoid

- Only checking if code compiles.
- Ignoring visual quality.
- Ignoring mobile.
- Ignoring accessibility.

---

## Implementation Protocol

Use this process for every phase:

1. Read the current phase in `TASKS.md`.
2. Inspect existing files.
3. Identify missing pieces.
4. Implement only that phase.
5. Run quality checks.
6. Fix issues.
7. Summarize changes.
8. Move to next phase only when accepted.

---

## Coding Standards

### TypeScript

- Use explicit types for props.
- Avoid `any`.
- Keep components small.
- Extract repeated logic.
- Prefer readable code over clever code.

### React

- Keep `page.tsx` simple.
- Use client components only where needed.
- Isolate animation components.
- Avoid unnecessary global state.
- Use Zustand only for scene state that multiple components need.

### GSAP

- Register plugins once.
- Scope animations to component refs.
- Clean up on unmount.
- Avoid targeting global selectors where possible.
- Keep timelines grouped by scene.

### Three.js / R3F

- Use simple geometry first.
- Use `useMemo` for geometry/materials when needed.
- Use instancing for repeated particles/fragments.
- Avoid expensive per-frame calculations.
- Cap pixel ratio.
- Keep canvas fixed behind content.

### CSS / Tailwind

- Use CSS variables for theme values.
- Use Tailwind for layout and responsive styling.
- Keep global CSS minimal.
- Avoid hardcoded random colors across components.

---

## Quality Gates

A phase is not complete until:

```bash
npm run lint
npm run build
```

passes.

Also manually check:

- desktop view
- mobile view
- scroll behavior
- no console errors
- reduced motion mode
- CTA accessibility

---

## Common Failure Modes

### Failure: The site feels like a template

Fix:

- Increase cinematic spacing.
- Reduce generic cards.
- Make typography stronger.
- Add scene-based visual rhythm.

### Failure: Animations feel random

Fix:

- Tie each animation to a scene purpose.
- Remove effects that do not support the story.
- Follow the scene motion plan in `DESIGN.md`.

### Failure: Site is slow

Fix:

- Reduce particles.
- Disable postprocessing.
- Cap DPR.
- Remove heavy models.
- Lazy load 3D.

### Failure: Text is unreadable

Fix:

- Increase contrast.
- Add gradient overlay behind text.
- Reduce bloom.
- Limit moving objects behind text.

### Failure: Mobile feels broken

Fix:

- Simplify motion.
- Disable cursor effects.
- Reduce pinned sections.
- Make canvas less dominant.
- Increase text readability.

---

## Do Not Do

- Do not create a generic hero, features, testimonials, pricing layout.
- Do not add auth, database, backend, or CMS.
- Do not add unnecessary AI features.
- Do not add random 3D models just because they look cool.
- Do not add complex shaders before the base story works.
- Do not make all scenes visually identical.
- Do not ignore performance.
