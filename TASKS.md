# TASKS.md

# Cinematic Scroll Storytelling Website

## Project Goal

Build a one-page cinematic scroll storytelling website named **Signal to System**.

The website should feel like:

> Netflix intro meets art installation.

The user scrolls through a visual story where an idea transforms into a structured digital product.

Core story arc:

1. Signal
2. Spark
3. Chaos
4. Structure
5. System
6. Launch

The site should use cinematic scroll, pinned scenes, smooth camera movement, 3D objects, layered parallax, typography synced to motion, and premium transitions.

---

## Recommended Stack

Use this stack unless there is a strong reason not to:

- Next.js
- TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Three.js
- React Three Fiber
- Drei
- Lenis
- Motion for React
- Zustand for lightweight scene state
- Vercel deployment

Optional later:

- GLSL shaders
- Postprocessing bloom
- React Three Drei text
- Blender-created GLB assets
- Lottie or Anime.js for micro animations

---

## Project Rules

1. The website must be visual-first.
2. Do not create a normal SaaS landing page.
3. Every animation must support the story.
4. Avoid random effects.
5. Use one main 3D object that evolves through the whole page.
6. Keep the first version technically simple.
7. Add complex shaders and assets only after the base scroll story works.
8. Always test performance after adding 3D or scroll animation.
9. Keep mobile usable, even if the desktop version is more cinematic.
10. Respect reduced motion preferences.

---

## Phase 0: Project Setup

### Goal

Create a clean Next.js project foundation with the correct folders, packages, styling, and development commands.

### Tasks

- Create or verify a Next.js TypeScript project.
- Add Tailwind CSS.
- Install core libraries:
  - gsap
  - three
  - @react-three/fiber
  - @react-three/drei
  - lenis
  - motion
  - zustand
- Create clean folder structure.
- Add global CSS variables.
- Add base layout.
- Add metadata.
- Add responsive page shell.
- Add development scripts.
- Confirm the app runs locally.

### Suggested Folder Structure

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    cinematic/
      CinematicPage.tsx
      SceneCanvas.tsx
      ScrollScenes.tsx
      SceneOverlay.tsx
      ScrollProgress.tsx
    three/
      MainObject.tsx
      ParticleField.tsx
      SceneLights.tsx
      CameraRig.tsx
    ui/
      MagneticButton.tsx
      SectionLabel.tsx
      AnimatedText.tsx
  lib/
    gsap/
      registerGsap.ts
      useGsapContext.ts
    scroll/
      useLenis.ts
    motion/
      useReducedMotionPreference.ts
  store/
    cinematicStore.ts
  data/
    scenes.ts
```

### Acceptance Criteria

- `npm run dev` works.
- Home page loads without runtime errors.
- Tailwind classes work.
- TypeScript passes.
- Folder structure is clean.
- No animation logic is mixed directly into `page.tsx`.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Phase 1: Static Cinematic Layout

### Goal

Create the full scroll story as a static page before adding advanced animation.

### Tasks

- Build all six story sections.
- Add text content for each scene.
- Create a full-screen section layout.
- Add dark cinematic background.
- Add fixed canvas layer placeholder.
- Add overlay content layer.
- Add scroll progress indicator.
- Add basic CTA section.
- Make sections responsive.

### Scene Content

#### Scene 1: Signal

Title:

> Every product begins as a signal.

Supporting text:

> A small pulse in the dark. A thought before form. A direction waiting to be discovered.

#### Scene 2: Spark

Title:

> The signal becomes a spark.

Supporting text:

> Energy gathers around the idea. Motion begins. The invisible starts asking to be built.

#### Scene 3: Chaos

Title:

> Then comes the chaos.

Supporting text:

> Notes, sketches, code, doubt, experiments, broken flows, and half-shaped systems collide.

#### Scene 4: Structure

Title:

> Structure turns noise into product.

Supporting text:

> Patterns appear. Pieces align. Decisions become interfaces. Motion becomes meaning.

#### Scene 5: System

Title:

> The product finds its shape.

Supporting text:

> What began as a spark becomes a system people can see, use, and remember.

#### Scene 6: Launch

Title:

> Build what people remember.

Supporting text:

> Start the next scene.

CTA:

> Explore the work

### Acceptance Criteria

- All scenes are visible.
- Each scene occupies at least one viewport height.
- Content is readable.
- Page works without JavaScript animation.
- Mobile view is usable.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Phase 2: Smooth Scroll and Scroll Architecture

### Goal

Add Lenis smooth scrolling and prepare the page for GSAP ScrollTrigger animations.

### Tasks

- Add Lenis setup.
- Register GSAP ScrollTrigger safely on client only.
- Create a reusable scroll scene system.
- Add section refs.
- Add scroll progress value.
- Add cleanup for animations.
- Avoid duplicate ScrollTrigger instances in development.
- Respect reduced motion preference.

### Implementation Rules

- GSAP and ScrollTrigger must run only on the client.
- Use `useLayoutEffect` or a safe isomorphic effect.
- Kill ScrollTrigger instances during cleanup.
- Do not animate layout properties when transform/opacity can be used.
- Do not overuse pinned sections.

### Acceptance Criteria

- Smooth scroll works.
- Scroll progress indicator works.
- No hydration errors.
- No console errors.
- Reloading during dev does not duplicate animations.
- Reduced motion users get simplified transitions.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Phase 3: Three.js Base Scene

### Goal

Add a persistent 3D scene behind the story content.

### Tasks

- Add React Three Fiber Canvas.
- Add basic lighting.
- Add camera.
- Add particle field.
- Add main 3D object.
- Add responsive camera settings.
- Add performance-friendly defaults.
- Add fallback for mobile or low-power devices.

### Main Object Evolution

Start with a simple object before importing models:

1. Dot / small sphere
2. Glowing orb
3. Distorted crystal
4. Structured geometric system
5. Product-like object
6. Final logo-like form

The first version can use primitive meshes:

- sphere
- box
- torus
- icosahedron
- instanced fragments
- lines

### Acceptance Criteria

- Canvas renders behind content.
- Main object is visible.
- Particles render smoothly.
- No layout shift.
- Mobile does not crash or become unusable.
- Page still works if WebGL fails.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Phase 4: Scroll-Driven Camera and Object Animation

### Goal

Make the 3D world respond to scroll like a cinematic camera sequence.

### Tasks

- Connect scroll progress to camera movement.
- Animate object position, rotation, and scale by scene.
- Add pinned scene moments.
- Add parallax layers.
- Sync text reveals with scroll.
- Add scene-to-scene transitions.
- Use GSAP timelines for deterministic control.

### Scene Motion Plan

#### Signal

- Camera slowly pushes forward.
- Particles drift toward the viewer.
- Text fades in with a mask reveal.

#### Spark

- Orb appears and pulses.
- Camera orbits slightly.
- Accent light increases.

#### Chaos

- Fragments scatter through depth.
- Camera moves through debris.
- Typography appears between layers.

#### Structure

- Fragments align into a grid.
- Camera slows.
- Text becomes sharper and more stable.

#### System

- Main object becomes polished and centered.
- UI cards or project previews appear around it.

#### Launch

- Camera pulls back.
- Final title locks into frame.
- CTA appears with magnetic hover.

### Acceptance Criteria

- Scroll controls the story.
- Motion feels smooth.
- Text and 3D are synchronized.
- No major jank.
- Scroll is not confusing.
- The site still communicates the story if animations are disabled.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Phase 5: Cinematic Typography and UI Polish

### Goal

Make the site feel premium through typography, spacing, transitions, and micro-interactions.

### Tasks

- Add animated headline component.
- Add text mask reveal.
- Add staggered word animation.
- Add magnetic CTA button.
- Add custom cursor or cursor glow for desktop only.
- Add section labels.
- Add scene numbers.
- Add subtle grain/noise overlay.
- Add route-safe component structure.
- Improve spacing and responsive typography.

### Typography Rules

- Use large type.
- Use short sentences.
- Do not fill the screen with paragraphs.
- Make typography part of the scene.
- Use uppercase labels for scene markers.
- Use wide letter spacing for cinematic feel.

### Acceptance Criteria

- UI looks intentionally designed.
- Text feels cinematic.
- CTA is clear.
- Mobile text does not overflow.
- Cursor effects do not affect touch devices.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Phase 6: Shaders, Effects, and Visual Depth

### Goal

Add depth, atmosphere, and premium visual effects without hurting performance.

### Tasks

- Add subtle noise/grain overlay.
- Add bloom/postprocessing if performance allows.
- Add animated shader material to the orb.
- Add light streaks or volumetric-feeling planes.
- Add depth layers.
- Add subtle background gradient.
- Add reduced effects mode for low-power devices.

### Effects Rules

- Effects should be subtle.
- Do not make text harder to read.
- Do not add heavy shaders before the story works.
- Do not use bloom everywhere.
- Prefer one strong visual signature over many random effects.

### Acceptance Criteria

- Visuals feel richer.
- Performance remains usable.
- Text is still readable.
- Effects can be disabled or reduced.
- Build passes.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Phase 7: Project / Work Section

### Goal

Add portfolio value by connecting the cinematic story to real or sample work.

### Tasks

- Add 3 to 4 project cards.
- Make project cards appear as cinematic case files.
- Add hover interaction.
- Add click/detail interaction if needed.
- Add project data file.
- Keep cards inside the visual language.

### Suggested Projects

Use placeholders first:

1. Agentic Coding Dashboard
2. 3D Gallery Experience
3. TrustDoko Review Platform
4. Visual Git Commit Graph

### Acceptance Criteria

- Projects are clearly visible.
- Cards match the cinematic style.
- Hover states work.
- Mobile layout works.
- Project section does not break the story flow.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Phase 8: Performance, Accessibility, and Final Polish

### Goal

Make the site production-ready.

### Tasks

- Add loading state.
- Add WebGL fallback.
- Add reduced motion fallback.
- Optimize canvas pixel ratio.
- Reduce geometry count if needed.
- Lazy load heavy components.
- Check keyboard navigation.
- Check color contrast.
- Add metadata.
- Add Open Graph image placeholder.
- Test mobile.
- Test production build.
- Deploy to Vercel.

### Performance Targets

- Home page should load quickly.
- Keep first-load JS reasonable.
- Avoid massive 3D models.
- Use compressed GLB files if models are added.
- Avoid too many ScrollTrigger instances.
- Use instancing for many repeated objects.
- Limit device pixel ratio for canvas.

### Acceptance Criteria

- Production build passes.
- Site works on desktop and mobile.
- Reduced motion works.
- WebGL fallback exists.
- No major console errors.
- The site feels polished.

### Quality Check Command

```bash
npm run lint
npm run build
```

---

## Definition of Done

The project is complete when:

- The story arc is clear.
- Scroll drives the cinematic experience.
- 3D object evolves across scenes.
- Typography is synced to motion.
- The site has at least one polished CTA.
- Mobile version is usable.
- Reduced motion fallback exists.
- Build passes.
- Code is clean and maintainable.
- The result feels like an art-directed portfolio piece, not a generic landing page.
