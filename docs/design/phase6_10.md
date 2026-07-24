# Phase 6-10: Orbit Ranger Character Upgrade

## Goal

Bring the playable character up to the quality of the illustrated stage
backgrounds while preserving the existing controls and collision balance.

## Visual identity

- Use one recognizable, compact `Orbit Ranger` silhouette across the campaign.
- Build the avatar from layered Canvas 2D shapes: ground shadow, boots, legs,
  torso armor, backpack, arms, helmet, visor, and harpoon launcher.
- Keep the red-orange explorer suit as the base identity, but select equipment
  from the stage chapter instead of from an arbitrary early-stage range.
- World-tour chapters use a travel jacket, fluttering scarf, utility pack, and
  rugged boots; The Trench uses a sealed diving suit with twin air tanks and a
  reinforced viewport; space chapters use a white EVA suit with life-support
  pack, hose, and maneuvering jets.
- Extreme chapters receive equally readable specialist variants: heat armor
  for Hell/Molten Maelstrom, a sealed hazard suit for Toxic Marsh, a fur-lined
  climbing suit for Frozen Summit, dimensional tech armor for rift chapters,
  and an eclipse suit for the hidden finale.
- Keep the suit mapping deterministic from the stage title/chapter so every
  replay of a stage uses the same outfit and future stage-order changes do not
  silently assign the wrong environment gear.
- Use crisp dark outlines and bright material highlights so the character
  remains readable over all 201 backgrounds.

## Animation

- Add a restrained breathing/idle motion when stationary.
- Alternate legs, boots, arms, and body bob while moving.
- Turn the visor and equipment toward the last movement direction.
- Compress the upper body and flash the launcher briefly after firing.
- Preserve the current invulnerability glow and power-up aura layers.

## Weapon rendering

- Mount a clearly readable harpoon launcher above the character's shoulder line
  with a metallic barrel, illuminated chamber, cable reel, and muzzle ring.
- Add a short recoil, expanding muzzle flash, and vent sparks on each shot.
- Render deployed harpoons as an outlined cable plus moving energy tracer and a
  broad, beveled, barbed metal head.
- Give Normal, Power Wire, Vulcan, and Piercer distinct silhouettes, materials,
  glow colors, cable behavior, and motion accents rather than recoloring one
  identical projectile.

## Gameplay constraints

- Do not change `PLAYER_WIDTH`, `PLAYER_HEIGHT`, movement speed, collision
  checks, input behavior, or stage balance.
- Decorative parts above the collision body must not affect physics.
- Keep the drawing procedural and resolution independent for responsive canvas
  scaling.
