# DESIGN.md

# Signal to System Design Guide

## Creative Direction

**Signal to System** is a cinematic scroll storytelling website.

It tells the story of how an idea moves from invisible signal to finished digital product.

The experience should feel like:

> Netflix intro meets art installation.

It should not feel like a normal landing page.

The site should use:

- cinematic darkness
- slow camera movement
- glowing 3D forms
- large typography
- layered depth
- scroll-synced motion
- restrained UI
- atmospheric effects

---

## Narrative

The website is built around one transformation:

```txt
signal → spark → chaos → structure → system → launch
```

The main object evolves with the story.

At first, it is almost nothing.

Then it becomes energy.

Then it breaks into fragments.

Then it aligns.

Then it becomes a system.

Finally, it becomes a polished product-like form.

---

## Visual Identity

### Mood

- cinematic
- mysterious
- premium
- technical
- artistic
- focused
- immersive

### Keywords

- signal
- depth
- light
- motion
- system
- transformation
- precision
- atmosphere

### Avoid

- generic SaaS look
- cartoon styling
- too many gradients
- random icons
- noisy UI
- heavy paragraphs
- bright flat backgrounds
- decorative animations with no story purpose

---

## Color System

### Primary Palette

```css
--background: #030305;
--background-soft: #080A0F;
--surface: #0D1117;
--surface-soft: #151A23;

--text: #F4F7FB;
--text-muted: #9BA3AF;
--text-soft: #5F6875;

--border: rgba(255, 255, 255, 0.12);

--accent: #7C5CFF;
--accent-2: #00D5FF;
--accent-warm: #FF7A3D;

--danger-glow: #FF355E;
--success-glow: #60FFB1;
```

### Recommended Main Theme

Use black, white, gray, and one dominant electric accent.

Best default:

- background: near black
- text: soft white
- accent: violet-blue
- secondary glow: cyan

### Scene Color Progression

#### Signal

- black
- soft white
- faint blue-gray

#### Spark

- violet
- cyan glow
- soft bloom

#### Chaos

- red-orange accents
- broken light streaks
- sharper contrast

#### Structure

- cyan
- white
- grid lines

#### System

- violet-blue
- silver
- soft depth

#### Launch

- white
- violet
- calm glow

---

## Typography

### Font Direction

Use a clean modern sans-serif.

Good choices:

- Inter
- Geist
- Satoshi
- Space Grotesk
- Neue Montreal style fonts
- Manrope

### Type Scale

```txt
Scene label: 12px to 14px, uppercase, wide tracking
Body text: 16px to 20px
Main headline mobile: 44px to 64px
Main headline desktop: 88px to 144px
Hero headline large desktop: 120px to 180px
```

### Typography Rules

1. Use short lines.
2. Prefer one powerful sentence per scene.
3. Do not over-explain.
4. Let the visuals carry meaning.
5. Use large headlines.
6. Use muted body text.
7. Use wide letter spacing for labels.
8. Avoid long paragraphs.

---

## Layout System

### Page Layers

The page should use three main layers:

```txt
1. Background atmosphere layer
2. Fixed 3D canvas layer
3. Scroll content overlay layer
```

### Layout Structure

```txt
body
  fixed canvas
  fixed grain/noise overlay
  fixed scroll progress
  main scroll story
    scene 1
    scene 2
    scene 3
    scene 4
    scene 5
    scene 6
```

### Scene Layout

Each scene should be at least `100vh`.

Some scenes can be taller for longer scroll animation:

```txt
Signal: 120vh
Spark: 140vh
Chaos: 220vh
Structure: 180vh
System: 160vh
Launch: 120vh
```

### Content Positioning

Do not center every scene the same way.

Use cinematic framing:

- Scene 1: center
- Scene 2: lower-left
- Scene 3: split left/right
- Scene 4: upper-left with grid alignment
- Scene 5: center-right
- Scene 6: centered final title

---

## Motion Design

### Core Principle

Motion should feel directed like a camera sequence.

Not every object needs to move.

Every scene needs one main motion idea.

### Motion Timing

Use slow, smooth easing.

Recommended feel:

```txt
Large camera movement: slow
Text reveal: medium
Small details: quick
Hover interaction: snappy
Scene transition: smooth and weighty
```

### Motion Rules

1. Use scroll to control main scene progress.
2. Use time-based animation only for ambience.
3. Use hover for small interactions only.
4. Keep camera movement smooth.
5. Avoid sudden direction changes.
6. Avoid too many simultaneous animations.
7. Use transform and opacity when possible.
8. Respect reduced motion.

---

## Scene Design

## Scene 1: Signal

### Purpose

Introduce mystery.

### Visuals

- Black void
- Tiny particles
- Distant glow
- Large white headline

### Text

> Every product begins as a signal.

### Motion

- Slow camera push forward.
- Particles drift past.
- Text appears through mask reveal.
- Distant object becomes slightly brighter.

### Feeling

Quiet. Empty. Suspenseful.

---

## Scene 2: Spark

### Purpose

Show energy forming.

### Visuals

- Glowing orb
- Soft bloom
- Curved text fragments
- Light pulse

### Text

> The signal becomes a spark.

### Motion

- Orb pulses.
- Camera orbits slightly.
- Letters subtly float.
- Accent glow increases.

### Feeling

Alive. Curious. Electric.

---

## Scene 3: Chaos

### Purpose

Show complexity and creative mess.

### Visuals

- Floating shards
- Code fragments
- Wireframes
- Broken UI cards
- Fast depth layers

### Text

> Then comes the chaos.

### Motion

- Camera flies through debris.
- Fragments cross foreground.
- Text appears between layers.
- Scroll velocity can add subtle blur.

### Feeling

Messy but controlled. Energetic.

---

## Scene 4: Structure

### Purpose

Show clarity and decision-making.

### Visuals

- Grid system
- Aligning fragments
- Clean lines
- Stable typography

### Text

> Structure turns noise into product.

### Motion

- Fragments align.
- Grid fades in.
- Camera slows.
- Text locks into place.

### Feeling

Relief. Order. Precision.

---

## Scene 5: System

### Purpose

Show the final product or portfolio work.

### Visuals

- Polished 3D object
- Floating project cards
- Hologram panels
- Soft reflections

### Text

> The product finds its shape.

### Motion

- Object rotates calmly.
- Cards appear in sequence.
- Hover reveals project details.
- Scene feels stable.

### Feeling

Premium. Built. Usable.

---

## Scene 6: Launch

### Purpose

End with a memorable CTA.

### Visuals

- Final object/logo
- Wide cinematic title
- Minimal CTA
- Calm particles

### Text

> Build what people remember.

### CTA

> Explore the work

### Motion

- Camera pulls back.
- Title locks into frame.
- CTA fades up.
- Background becomes calm.

### Feeling

Resolved. Confident. Memorable.

---

## 3D Design

### Main Object

The main object should be abstract enough to represent an idea, but structured enough to feel like a product system.

Start with primitives:

- sphere
- icosahedron
- torus
- boxes
- lines
- instanced fragments

Avoid relying on complex 3D models too early.

### Object Evolution

```txt
Scene 1: tiny glowing point
Scene 2: orb
Scene 3: fractured crystal
Scene 4: aligned structure
Scene 5: product/system form
Scene 6: final emblem
```

### Lighting

Use cinematic lighting:

- one key light
- one rim light
- subtle ambient light
- scene-based accent light

Avoid fully lit flat scenes.

### Particles

Particles should create depth.

Use them for:

- dust
- signal noise
- motion streaks
- atmosphere

Do not make particles too dense.

---

## UI Components

### Scene Label

Small uppercase label.

Example:

```txt
01 / SIGNAL
```

Style:

- uppercase
- wide tracking
- muted color
- small size

### Headline

Large cinematic headline.

Rules:

- max width around 900px
- line-height tight
- avoid paragraph-length titles
- use mask reveal

### Body Text

Muted supporting text.

Rules:

- max width around 520px
- line-height comfortable
- keep short

### Scroll Progress

Minimal vertical or horizontal line.

Rules:

- fixed position
- subtle
- not distracting
- accent fill based on scroll

### CTA Button

Cinematic magnetic button.

Style:

- transparent or dark surface
- thin border
- soft glow on hover
- rounded pill or sharp rectangle
- large hit area

### Project Card

Project cards should feel like case files or floating panels.

Include:

- project title
- category
- one-line description
- tech tags
- optional year/status

---

## Responsive Design

### Desktop

Desktop should receive the full cinematic experience.

Use:

- full 3D scene
- large typography
- pinned sections
- cursor glow
- richer particles

### Tablet

Reduce intensity.

Use:

- fewer particles
- less aggressive camera movement
- no custom cursor
- adjusted text sizes

### Mobile

Prioritize readability and performance.

Use:

- simplified 3D or static fallback
- reduced particles
- no scroll hijacking
- no custom cursor
- shorter pinned moments
- readable text size

---

## Accessibility

### Required

- Respect `prefers-reduced-motion`.
- Keep text readable.
- Maintain color contrast.
- Ensure CTA is keyboard accessible.
- Do not trap scroll.
- Provide fallback content if WebGL fails.
- Use semantic HTML for main text sections.

### Reduced Motion Mode

In reduced motion mode:

- Disable camera fly-through.
- Disable aggressive parallax.
- Keep simple fades.
- Keep static or slowly rotating object.
- Keep all content visible.

---

## Performance Rules

### Canvas

- Limit DPR to a safe range.
- Avoid too many high-poly models.
- Use instancing for repeated objects.
- Lazy load heavy scene components.
- Avoid unnecessary re-renders.
- Keep materials simple first.
- Add shaders later.

### Scroll

- Do not create one ScrollTrigger per tiny element.
- Use grouped timelines.
- Clean up all triggers.
- Avoid animating layout properties.
- Avoid scroll-jacking.

### Assets

- Compress images.
- Compress GLB models.
- Use SVG for simple graphics.
- Keep initial payload small.
- Use placeholders before final assets.

---

## Final Design Standard

The final website should feel like:

- a short film
- a digital art piece
- a premium portfolio homepage
- a technical creative experiment

It should not feel like:

- a template
- a generic landing page
- a random animation demo
- a heavy 3D toy with no story
