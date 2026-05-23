# PROMPTS.md

# Cursor Prompts for Signal to System

Use these prompts stage by stage in Cursor.

Recommended workflow:

1. Add `TASKS.md`, `DESIGN.md`, `AGENTS.md`, and `PROMPTS.md` to the project root.
2. Open Cursor.
3. Use one prompt at a time.
4. Let Cursor inspect files before editing.
5. Run quality checks after each phase.
6. Use the QA prompt after every major phase.
7. Do not jump to advanced effects until the base story works.

---

# Master Context Prompt

Use this once at the beginning of the project.

```txt
You are helping me build a cinematic scroll storytelling website called "Signal to System".

Read these files first:
- TASKS.md
- DESIGN.md
- AGENTS.md
- PROMPTS.md
- Existing source files

Project concept:
A one-page cinematic website where the user scrolls through a story:
signal → spark → chaos → structure → system → launch.

The vibe is:
"Netflix intro meets art installation."

The site should use:
- Next.js
- TypeScript
- Tailwind CSS
- GSAP ScrollTrigger
- Three.js
- React Three Fiber
- Drei
- Lenis
- Motion for React
- Zustand if needed

Important rules:
- Do not build a generic SaaS landing page.
- Do not overbuild.
- Implement one phase at a time.
- Keep animation logic modular.
- Make the site work without animation first.
- Respect reduced motion.
- Keep mobile usable.
- Run lint and build after changes.

First, inspect the project and tell me what exists, what is missing, and which phase from TASKS.md we should start with.
Do not edit files yet.
```

---

# Stage 0 Prompt: Project Setup

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and the current project structure.

Implement Phase 0: Project Setup.

Goal:
Create or fix the project foundation for the Signal to System cinematic scroll storytelling website.

Tasks:
- Verify this is a Next.js TypeScript project.
- Add or confirm Tailwind CSS setup.
- Install required libraries if missing:
  gsap, three, @react-three/fiber, @react-three/drei, lenis, motion, zustand.
- Create the folder structure from TASKS.md.
- Add clean global CSS variables from DESIGN.md.
- Keep app/page.tsx simple.
- Create placeholder components where needed.
- Add basic metadata.
- Make sure the app runs.

Rules:
- Do not implement advanced animations yet.
- Do not add 3D scene logic yet.
- Do not create random sections beyond the setup.
- Keep the code clean and typed.

After implementation:
- Run npm run lint.
- Run npm run build.
- Fix any errors.
- Summarize changed files and how to test.
```

---

# Stage 1 Prompt: Static Cinematic Layout

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and existing files.

Implement Phase 1: Static Cinematic Layout.

Goal:
Build the full six-scene scroll story as a static page before adding advanced animation.

Create the page for:
1. Signal
2. Spark
3. Chaos
4. Structure
5. System
6. Launch

Use this scene text:

Scene 1:
Title: Every product begins as a signal.
Body: A small pulse in the dark. A thought before form. A direction waiting to be discovered.

Scene 2:
Title: The signal becomes a spark.
Body: Energy gathers around the idea. Motion begins. The invisible starts asking to be built.

Scene 3:
Title: Then comes the chaos.
Body: Notes, sketches, code, doubt, experiments, broken flows, and half-shaped systems collide.

Scene 4:
Title: Structure turns noise into product.
Body: Patterns appear. Pieces align. Decisions become interfaces. Motion becomes meaning.

Scene 5:
Title: The product finds its shape.
Body: What began as a spark becomes a system people can see, use, and remember.

Scene 6:
Title: Build what people remember.
Body: Start the next scene.
CTA: Explore the work

Design requirements:
- Dark cinematic background.
- Full-screen sections.
- Fixed background/canvas placeholder layer.
- Content overlay layer.
- Scene labels like "01 / SIGNAL".
- Minimal scroll progress indicator.
- Responsive typography.
- No generic SaaS layout.

Rules:
- Do not add GSAP yet unless needed for a tiny basic reveal.
- Do not add Three.js Canvas yet.
- Make content readable without animation.
- Keep components modular.

After implementation:
- Run npm run lint.
- Run npm run build.
- Fix any errors.
- Summarize changed files and how to test.
```

---

# Stage 2 Prompt: Lenis and Scroll Architecture

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and existing files.

Implement Phase 2: Smooth Scroll and Scroll Architecture.

Goal:
Add Lenis smooth scrolling and prepare safe GSAP ScrollTrigger architecture.

Tasks:
- Add a client-safe Lenis setup.
- Add a reusable hook or component for Lenis.
- Register GSAP ScrollTrigger safely on the client only.
- Add scroll progress tracking.
- Make the existing progress indicator respond to real scroll progress.
- Prepare section refs or data attributes for future GSAP timelines.
- Add reduced motion handling.
- Ensure cleanup works correctly.

Important rules:
- Avoid hydration errors.
- Do not duplicate ScrollTrigger instances during hot reload.
- Do not add heavy animations yet.
- Do not overuse pinned sections.
- Respect prefers-reduced-motion.
- Keep the static layout working if JavaScript animation fails.

After implementation:
- Run npm run lint.
- Run npm run build.
- Fix any errors.
- Summarize changed files and how to test.
```

---

# Stage 3 Prompt: Three.js Base Scene

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and existing files.

Implement Phase 3: Three.js Base Scene.

Goal:
Add a persistent 3D scene behind the cinematic story content.

Tasks:
- Add React Three Fiber Canvas as a fixed background layer.
- Create SceneCanvas component.
- Create SceneLights component.
- Create ParticleField component.
- Create MainObject component.
- Add a basic camera setup.
- Render a simple main object using primitive geometry.
- Add particles for atmosphere and depth.
- Cap canvas DPR for performance.
- Add a simple fallback if WebGL is unavailable or if 3D fails.
- Keep the content overlay readable.

Main object:
Start simple:
- a small glowing sphere or icosahedron
- subtle rotation
- soft material
- scene-compatible lighting

Rules:
- Do not import large 3D models.
- Do not add complex shaders yet.
- Do not add postprocessing yet.
- Keep mobile performance in mind.
- Keep TypeScript clean.

After implementation:
- Run npm run lint.
- Run npm run build.
- Fix any errors.
- Summarize changed files and how to test.
```

---

# Stage 4 Prompt: Scroll-Driven Cinematic Motion

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and existing files.

Implement Phase 4: Scroll-Driven Camera and Object Animation.

Goal:
Make the site feel like a cinematic scroll story.

Tasks:
- Connect scroll progress or scene progress to the 3D object.
- Add GSAP ScrollTrigger timelines for each scene.
- Add text reveal animations.
- Add subtle parallax movement to overlay content.
- Animate the main object across scenes:
  1. Signal: tiny distant glow
  2. Spark: glowing orb
  3. Chaos: fractured/unstable form
  4. Structure: aligned geometric system
  5. System: polished centered object
  6. Launch: final emblem-like form
- Add camera-like movement or fake camera movement.
- Add one pinned moment if it improves the story.
- Keep animation readable and controlled.

Rules:
- Motion must support the scene story.
- Do not create random animation.
- Do not pin every section.
- Clean up GSAP timelines.
- Respect reduced motion.
- Use transform and opacity where possible.
- Avoid making text unreadable.

After implementation:
- Run npm run lint.
- Run npm run build.
- Fix any errors.
- Summarize changed files and how to test.
```

---

# Stage 5 Prompt: Cinematic Typography and Micro-Interactions

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and existing files.

Implement Phase 5: Cinematic Typography and UI Polish.

Goal:
Make the website feel premium through typography, layout, text reveals, and small interactions.

Tasks:
- Create AnimatedText component if not already present.
- Add mask or stagger reveal for scene headings.
- Improve scene labels.
- Add cinematic section spacing.
- Add a MagneticButton component for the final CTA.
- Add desktop-only cursor glow if appropriate.
- Add subtle grain/noise overlay.
- Add refined hover states.
- Improve mobile typography.
- Improve visual hierarchy.

Rules:
- Do not make the design busy.
- Do not reduce readability.
- Do not add hover-only functionality.
- Disable cursor effects on touch devices.
- Respect reduced motion.
- Keep the visual style aligned with DESIGN.md.

After implementation:
- Run npm run lint.
- Run npm run build.
- Fix any errors.
- Summarize changed files and how to test.
```

---

# Stage 6 Prompt: Shaders and Atmosphere

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and existing files.

Implement Phase 6: Shaders, Effects, and Visual Depth.

Goal:
Add premium atmosphere without hurting performance.

Tasks:
- Add subtle animated material to the main object.
- Add soft background gradient or shader-like effect.
- Add optional light streaks or depth planes.
- Add subtle glow/bloom only if performance allows.
- Add a reduced effects path for low-power or reduced-motion users.
- Keep text readable.
- Keep effects restrained.

Rules:
- Effects must be subtle.
- Do not add heavy postprocessing if it causes lag.
- Do not use bloom everywhere.
- Do not make text hard to read.
- Keep mobile simplified.
- Do not add large assets.

After implementation:
- Run npm run lint.
- Run npm run build.
- Fix any errors.
- Summarize changed files and how to test.
```

---

# Stage 7 Prompt: Work / Project Section

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and existing files.

Implement Phase 7: Project / Work Section.

Goal:
Connect the cinematic story to portfolio value through project cards.

Create 4 project case files:
1. Agentic Coding Dashboard
2. 3D Gallery Experience
3. TrustDoko Review Platform
4. Visual Git Commit Graph

Each project should include:
- title
- category
- one-line description
- tech tags
- status or year

Design:
- Cards should feel like cinematic case files or hologram panels.
- They should match the dark cinematic theme.
- They should not feel like generic portfolio cards.
- Add hover/focus states.
- Make mobile layout clean.

Rules:
- Do not add backend.
- Do not add real routing unless needed.
- Keep data in a simple data file.
- Maintain accessibility.
- Keep story flow intact.

After implementation:
- Run npm run lint.
- Run npm run build.
- Fix any errors.
- Summarize changed files and how to test.
```

---

# Stage 8 Prompt: Production Polish

```txt
Read TASKS.md, DESIGN.md, AGENTS.md, and existing files.

Implement Phase 8: Performance, Accessibility, and Final Polish.

Goal:
Make the website production-ready.

Tasks:
- Add loading state if needed.
- Add WebGL fallback.
- Confirm reduced motion mode.
- Optimize Canvas DPR.
- Reduce excessive particles or effects.
- Lazy load heavy components if needed.
- Check semantic HTML.
- Check keyboard navigation.
- Check CTA focus states.
- Add metadata and Open Graph placeholders.
- Remove unused code.
- Improve comments where helpful.
- Make sure production build passes.

Quality checks:
- Run npm run lint.
- Run npm run build.
- Check the browser console.
- Check mobile responsive layout.
- Check reduced motion.
- Check keyboard navigation.

Rules:
- Do not add new major features.
- Do not redesign everything.
- Focus on polish, stability, performance, and accessibility.

After implementation:
- Summarize final status.
- List remaining optional improvements.
- Explain how to deploy to Vercel.
```

---

# QA Prompt After Each Phase

```txt
Act as a strict senior frontend reviewer.

Review the current implementation against:
- TASKS.md
- DESIGN.md
- AGENTS.md
- The current phase requirements

Check:
- correctness
- visual consistency
- code quality
- TypeScript quality
- animation safety
- accessibility
- reduced motion support
- mobile responsiveness
- performance risks
- production build readiness

Run or ask me to run:
- npm run lint
- npm run build

Give your response in this format:

## Pass/Fail
State whether the phase passes.

## Issues Found
List concrete issues.

## Required Fixes
List exact fixes needed.

## Nice-to-Have Improvements
List optional improvements.

## Fix Prompt
Give me a Cursor-ready prompt to fix the required issues.
```

---

# Design Upgrade Prompt

Use this after the base website works.

```txt
Act as a premium creative director and senior frontend designer.

Review the website visually against DESIGN.md.

Goal:
Upgrade the site so it feels more like:
"Netflix intro meets art installation."

Improve:
- cinematic composition
- scene spacing
- typography scale
- visual hierarchy
- atmosphere
- premium dark theme
- depth
- text readability
- CTA quality
- project card design

Rules:
- Do not change the core story.
- Do not add random effects.
- Do not hurt performance.
- Do not make text harder to read.
- Keep mobile usable.
- Keep code clean.

First inspect the files and explain the design gaps.
Then implement the improvements.
After implementation, run lint and build.
```

---

# Performance Fix Prompt

Use this if the site becomes slow.

```txt
Act as a senior frontend performance engineer.

The site is a cinematic scroll storytelling website using Next.js, GSAP, Lenis, and React Three Fiber.

Review the code for performance problems.

Focus on:
- unnecessary React re-renders
- expensive Three.js geometry
- too many particles
- uncapped DPR
- unnecessary postprocessing
- bad ScrollTrigger usage
- layout thrashing
- heavy client components
- large assets
- missing lazy loading
- mobile performance

Rules:
- Preserve the visual concept.
- Do not remove the story.
- Prefer graceful degradation.
- Keep reduced motion and fallback modes.
- Do not blindly delete features.

After review:
1. List performance issues.
2. Fix the most important ones.
3. Run lint and build.
4. Explain what improved.
```

---

# Animation Review Prompt

Use this when the motion feels off.

```txt
Act as a senior motion designer and GSAP expert.

Review the website motion against this story:
signal → spark → chaos → structure → system → launch.

The vibe should be:
"Netflix intro meets art installation."

Check:
- Does each scene have one clear motion idea?
- Is scroll controlling the story clearly?
- Are text and 3D synchronized?
- Are animations too fast, too slow, or random?
- Is the camera movement smooth?
- Are pinned sections useful or annoying?
- Is reduced motion respected?
- Is text readable during animation?

Then improve the motion.

Rules:
- Do not add random new effects.
- Remove or simplify motion that does not support the story.
- Keep performance good.
- Keep mobile usable.
- Clean up GSAP timelines properly.

After changes:
- Run lint and build.
- Summarize the motion improvements.
```

---

# Bug Fix Prompt

Use this when something breaks.

```txt
Act as a senior debugging engineer.

The project is a Next.js cinematic scroll storytelling website using:
- TypeScript
- Tailwind
- GSAP ScrollTrigger
- Lenis
- React Three Fiber
- Drei
- Motion for React

Problem:
[PASTE THE ERROR OR BROKEN BEHAVIOR HERE]

Instructions:
- Inspect the related files.
- Find the root cause.
- Fix the issue safely.
- Do not rewrite unrelated code.
- Do not remove major features unless necessary.
- Preserve the design direction from DESIGN.md.
- Run lint and build.
- Explain the cause and fix clearly.
```

---

# Final Polish Prompt

```txt
Act as a senior creative frontend engineer.

The website is almost complete.

Perform final polish for:
- visual consistency
- cinematic mood
- responsive layout
- reduced motion
- keyboard navigation
- production build
- dead code cleanup
- naming consistency
- small UI details
- final CTA clarity

Do not add major new features.
Do not redesign the concept.
Do not add heavy assets.
Do not hurt performance.

Run:
- npm run lint
- npm run build

Then provide:
- final summary
- how to run locally
- how to deploy
- remaining optional improvements
```
