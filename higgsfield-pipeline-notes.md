# Higgsfield Cinema Studio Pro — Working Notes
Distilled from the Academy course (Hell Grind team) + the Leera skill file. Source: higgsfield.ai/academy/courses/cinema-studio-pro

## 1. The pipeline (4 stages, fixed order)
**Think → Setup → Generation → Review (Seedance test)**
- A stage is done only when it leaves a concrete input the next stage can trust.
- Skipping to "generate" is the #1 cause of stalled projects.
- Handoffs:
  - Brief → Setup: agreed brief (shot, world, cast, props, constraints)
  - Setup → Generation: project, folders, one naming contract
  - Generation → Seedance: proofed, named location/character/prop elements
  - Seedance → Review: a motion test + a diagnosis, not just a video
- Build the location BEFORE judging characters on it — the place is foundation + test bed.
- Review routes fixes to the EARLIEST broken handoff: geography melts → fix location; identity drifts → fix character sheet; action wrong → revise Seedance direction; wrong idea → reopen brief.

## 2. Working in Claude (Cowork mode)
- Use Cowork (persistent memory + local files), memory ON. Desktop app for file access.
- Three file types: `.md` notes/instructions, `SKILL.md` (skill folder of rules Claude loads), `.jsx` shotlist (structured shot data: numbers, descriptions, timings, prompts).
- Approved assets saved in two places: local Claude project folder + normal project folder.

### The handoff package (what Claude needs before writing a shot prompt)
1. Scene brief `.md` — story beat and shot intent
2. Approved references with exact `@` Element names — character/location/prop identity
3. Relevant `SKILL.md` — rules for this kind of prompt
4. Current `.jsx` shotlist — shot number, timing, continuity

### Shot record structure (Claude returns exactly this, no preamble)
```
{
  shot: "[number]",
  description: "[one-sentence action and framing]",
  duration: "[seconds]",
  elements: ["[@name]", "[@name]"],
  prompt: "[one complete, standalone Cinema Studio prompt]"
}
```
- Paste `prompt` into Cinema Studio Prompt Box; select every `elements` entry via `@` picker; carry `duration` for video. Visible `@` tags must match the record exactly before generating.

## 3. Naming contract
`@<type>_<PROJECT>_<description>` — underscores only, no spaces/hyphens.
- `@loc_` locations (e.g. `@loc_HG_museum_front`)
- `@char_` characters (e.g. `@char_HG_jaxx`)
- `@prop_` props (e.g. `@prop_HG_phone`)
- Project prefix = short code agreed at kickoff (HG = Hell's Grind). Keeps names collision-free.

## 4. Six-slot prompt method (Turning thoughts into a prompt)
Separate **subject, action, setting, light, camera/motion, constraints** → assemble into one paragraph. Every clause has a job. If Claude adds an unchosen prop/style/weather/camera move, ask what ambiguity it resolves — approve, replace, or remove. Iterations rewrite the FULL prompt.

## 5. Leera (location prompt skill) — 4-D method
1. **DECONSTRUCT** — quote brief words → six slots (subject, action, setting, light, camera/framing, constraints; + camera motion for video). Mark explicit / implied / missing.
2. **DIAGNOSE** — audit gaps; check logic (one sun, believable doors/windows, shadows away from stated light). Ask or label defaults. Never silently add weather, props, style, camera movement.
3. **DEVELOP** — one subject+action, setting, named ANCHOR object (sofa, doorway, banner) for character placement, explicit light (soft sources for interiors; hard visible rays usually slop), tonal palette with smooth falloff, no crushed shadows, declared 3/4-view default when no angle given, motion only for video, continuity constraints. Concrete nouns ("weathered wood siding"), never quality words ("beautiful").
4. **DELIVER** — one English paragraph + decision log (source/default → decision → what it resolves).
- Modes: DETAIL (default; 2–3 clarifying questions first) / BASIC (skip questions, labelled defaults only).
- Iteration rule: full-prompt rewrite, never a diff.
- Response format: "Your optimized prompt:" / "Decision log:" / "Open questions:"

## 6. Location rules (Generating locations)
- A useful location: actors can be blocked in it, one light logic, camera sees depth, later views repeat the same geography.
- Geography before style: name entrances, playable routes, three depth planes (foreground/mid/background) before style.
- One motivated light source, direction, falloff. Contradictory sources → conflicting shadows/crushed regions.
- Shoot the master at 3/4 view (exposes side geometry, separates depth planes). Dead-frontal flattens into a backdrop and leaves side geometry unconstrained.
- Reverse angle = separate generation + continuity test: anchor, openings, light side, materials, palette must match before calling it the same location.
- Anchor every blocking action to one fixed object ("between the sofa's hall-side arm and the window"), never "screen left".
- One master wide is enough ONLY for b-roll/montage/action coverage where off-frame invention can't break a cut.
- Atmospheric haze = distance cue; killing it makes everything flat/slop. Oversharpened oily surfaces smear in motion.
- Approve by locks: proceed only when every named lock (geography, light, anchor, depth, continuity) is visible in master AND reverse.

## 7. Model choice
Generation:
- **Soul Cinema** — first choice for generating characters; strong cinematic locations
- **Seedream 4.5** — also works; run in parallel batches (rarely slops, may miss the ask — fire more tries)
- **AI Cast** (Cinema Studio) — casting tool, worth exploring
- **GPT Image 2** — creatures + precise add-ons; NOT human skin (oversharp slop)
Editing (run in parallel, take best per change):
- **GPT Image 2** — text, mathematically precise detail on complex objects
- **Nano Banana Pro** — most edits that don't need GPT-level precision; editing finished character sheets ONLY (never generating them)
- **Seedream 4.5** — parallel batches
- Rule: never trust model reputation — judge pixels only (proof, not promises).

## 8. Editing rules
- Every edit re-renders the whole frame → composite each changed patch onto the ORIGINAL in Photoshop. Never re-edit an edited image; never stack edits.

## 9. Spot the slop — 4 universal tells
1. Light with no transitions (flat-black pits, no shadow ramp)
2. Broken-but-plausible objects (almost-readable crates/railings/hardware → mush in motion)
3. Local logic breaks (effect in only part of frame, e.g. rain in one corner)
4. Oily/soapy textures (no material, crawling reflections)
Model fingerprints:
- **Nano Banana Pro slop**: ruler-straight symmetry, everything parallel/set-square, flat light/color, stock-photo lifelessness, 3D-render textures, hyperbolizes edits (ask graffiti → whole location tagged)
- **GPT Image 2 slop**: cranked sharpness/microcontrast, hard halos, no depth/bokeh, warm yellow pull, plastic licked-smooth materials, squeezed dynamic range, ONE sickly texture across the whole frame
- A visible still-frame defect is already a stop; Seedance multiplies it.

## 10. Character sheet rules (for Seedance)
- Template: deep neutral grey (#3a3a3c) seamless background, columns layout, dominant portrait (25–30% of sheet), full front + full back; identical identity/light/grade across panels.
- Portrait slightly off-frontal (or add separate 3/4 portrait); iris color must read (never black eyes); catchlights required; break mirror symmetry; no 3D-game-render look.
- Grey wins: white bleeds into video, black eats detail.
- Crop heads off full-body panels → forces Seedance to read the face from the portrait panel only.
- Pipeline: Generate → Inspect → Edit masked onto original → Test in Seedance (the test is the finish line).
- Slop sheet rejects: dirty/mottled plate (stacked re-gens), mismatched faces between panels, baked rim light, too-small portrait, soapy skin, mirror symmetry.

## 10b. Project asset — male character sheet prompt (user's, received 2026-07-25)
User's working template: course character-sheet prompt adapted female → male.
- Layout unchanged: grey #3a3a3c seamless bg, 3 columns (dominant chest-up portrait / full front A-pose / full back), landscape, identical identity+light+grade across panels.
- CHARACTER: man, mid-20s, ~175cm, oval face, high cheekbones, soft jawline, straight nose, full lips, light freckles, fair skin w/ natural texture, grey-green eyes, auburn center-parted hair just past shoulders, neutral calm expression.
- LIGHTING & RENDER: soft diffused key + gentle fill, no harsh highlights, true skin tones, neutral WB, 85mm look, controlled shallow DoF, HDR, 8k.
- Note: CHARACTER block is the course's female-template wording with sex swapped — features (freckles, auburn shoulder-length hair, grey-green eyes) are deliberate identity anchors; keep word-locked across generations.
- Post-gen steps per course: inspect (symmetry, soapy skin, matching faces, baked rim light) → mask fixes onto original → crop heads off Columns 2–3 → test in Seedance on a proven location plate.

## 10c. Project asset — prop approval evidence: boombox (user's, received 2026-07-25)
Approval review ("Evidence and fit") for a prop — a stickered boombox (cassette deck, AM/FM tuning dial, handle, antenna, brass corner guards).
Verdict: PASSES the reverse-angle test across three views (3/4 front, side, 3/4 back).
- Body geometry, handle, and antenna bend consistent across views
- Stickers/labels legible and consistently placed: "89", skull icon, lightning bolts, red star, torn photo collage
- Mechanical details hold shape/scale/proportion: cassette deck with visible tape, tuning dial with AM/FM scale, buttons, knobs
- Material wear convincing and consistent: scuffs, brass corner-guard patina, duct-tape wrap on handle, dust/grime
- 3/4 perspective gave real depth cues (visible top panel, side vents) — confirmed 3D consistency, not just flat front/back match
- This is the course's "proof, not promises" pattern applied to a prop: approved on visible evidence (geometry, labels, mechanics, wear, depth), not on model name.
- Naming: candidate for `@prop_<PROJECT>_boombox` once the project prefix is set; upload approved views to create the Element.

## 10d. Project asset — model evidence tests (user's, received 2026-07-25)

### GPT Image 2 — boombox prop test (the "Evidence and fit" + first "rule it out" list)
Verdict: strong on prop consistency (3-view pass logged in 10c). Open risks:
- No lighting variants shown — golden hour / blue hour / harsh contrast untested
- No macro close-up — speaker mesh weave, cassette label text, tape texture unproven under tight framing
- Side-view collage photo (people) slightly soft/artifacted vs surrounding metal/plastic
- Antenna extension differs between front and back views (minor)
- No reference-guided edit test performed

### Seedream (4.5) — character texture test
Evidence:
+ Etched armor scrollwork and cape drape consistent front/back
+ Freckles, pores, eye detail survive in face close-up
+ Accepts a finished character sheet; avoids banana/oversharpened texture
Risks:
- After-only view can't prove pose/proportions locked — must compare with source
- Edits can shift pose/angle → longer mask-and-composite pass
- Can preserve texture yet miss part of the requested change
Use for: when clean character texture is hardest to repair; compare against Nano Banana Pro when landing every requested change is the bigger risk.

### Nano Banana Pro — bold edit test
Evidence:
+ Armor language holds across full-body views — broad re-dress landed coherently
+ Helmet/horn detail coherent in close-up
+ Accepts a finished image for broad re-dressing or object edits; also fits monsters/creatures
Risks:
- Visor hid original face cues → after-only sheet can't prove identity preservation
- Edits can tint whole image and damage gradients → mask only the changed region onto the original
- Uncovered faces can become symmetric and lifeless
- From-scratch locations look centered, staged, stock-like
Use for: bold wardrobe/face/object edits when landing the change matters more than pristine tones or face texture. Never start a location or hero character from zero with it.

### The decision rule (project standard)
Before every location or character pass, name ONE must-preserve requirement. Inspect output at its intended crop: atmosphere, material texture, anchor objects (location); identity, skin, pose, gradients (character). Choose the model that proves the must-preserve requirement and leaves only failures affordable to rerun or mask-repair. If the roster changes, re-run the evidence test on the shot — never carry today's ranking forward.

## 10e. Lesson text — "Proof, not promises" (user-shared, received 2026-07-25)
Core doctrine: approve on what you can see — what changed, what stayed, what's broken. A model's reputation tells you what to try; only the image tells you if it worked. Three worked case studies:
1. **Nano Banana Pro one-pass re-dress (horned creature)** — verdict is downstream-dependent: PROCEED if you only need an armor design; HOLD if the face must carry into Seedance (face no longer visible under visor). Same image, two answers.
2. **Blade-arms edit, same source** — a pass on the previous edit proves nothing about this one; check fresh. Face/body hold, blade-arms appear in both views, but dark edges blend into the black background → fix before animation.
3. **Seedream 4.5 wings + blood** — ignore the note's word "cleanly" (claim, not fact); check every part of the sheet. Verdict: HOLD — wings/blood good but unrequested layout shifts. A strong model name doesn't excuse skipping the check.
Operating rules extracted: (a) verdicts are per-edit, per-downstream-use; (b) always diff against the source for unrequested changes; (c) "hold" is a valid verdict even when the headline change succeeded.

## 10f. Section test answers — studio & models (user-shared, received 2026-07-25)
The course's section-test answer key, five rulings:
1. **Setup completeness** — a project is ready only when `locations`, `characters`, AND `props` folders are all visible in the project rail; each asset type needs a home before generation.
2. **Prop sheet with readable panel labels + exact crystalline edges at intended crop → GPT Image 2** — it has direct evidence for both (labels readable, crystal facets intact in macro). Evidence must match the specific requirement.
3. **Bold jacket change on a finished character, tones repairable by mask → Nano Banana Pro** — landing the requested change matters more than pristine tones; mask the changed region onto the original.
4. **Armored demon: silhouette/armor hold but helmet hides the only face close-up, next handoff is a Seedance identity sheet → HOLD** — armor passes as design evidence, but an identity sheet still needs a visible face and readable edge separation.
5. **Vampire edit: requested wings+blood landed but pose/layout shifted → composite the requested regions onto the original** (donor-material pattern), then re-inspect face, pose, layout before Seedance.

## 12. Capstone lessons (user-shared, received 2026-07-25)

### Lesson 21 — Dress the scene (prop)
- Step 1: create one story-critical prop — the object the scene cannot work without. Refine until one image clearly shows intended shape, material, wear, and story detail. Approve only a result you would reuse in the final video.
- Step 2: save as Element (Create/Save as Element → production-ready name → type Prop). Success = prop appears in Elements and is selectable by @name in a prompt.
- Server check: at least one prop Element created after course start. Generating without saving doesn't count; duplicating someone's Element doesn't count.

### Lesson 22 — Shoot the scene (final Seedance shot)
- In Seedance 2.0: one clear story beat + all three saved Elements (character, location, prop) attached as real references. Generate, wait for completion.
- Mind the free course balance: keep resolution and duration inside the listed caps so the shot stays free. A short shot is a scene, not a limitation — spend seconds on one moment done properly.
- Server check: a completed Seedance 2.0 job whose recorded references include ≥1 Element created after course start. It checks server activity, not prompt text or pixels — and does NOT prove all three Element types were attached, so attaching all three is on you.
- When the checklist closes, the free course certificate is claimable.

### Capstone chain (full picture, lessons 18–22)
18 Set up production → 19 Cast characters → 20 Build location → 21 Dress scene (prop) → 22 Shoot scene (Seedance 2.0 with all three Elements).
User's boombox (10c/10d) maps to lesson 21's prop step; male character sheet (10b) maps to lesson 19.

## 11. Seedance testing
- A still is only a hypothesis. Baseline: test characters on a plate that already holds geometry/depth/materials/light.
- Change ONE variable at a time.
- Diagnosis table:
  - Defect in source, or stays tied to same feature when direction changes → source asset problem
  - Source clean + defect changes only with the suspect motion clause → motion direction problem
  - Controls conflict / failure follows neither → inconclusive, narrow the test
- A percentage cannot approve a shot — named sources, required motion, visible result are the evidence.
