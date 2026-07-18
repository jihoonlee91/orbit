# Phase 3-4. Power-ups

## Goal

- Review and introduce power-up/item elements

## Design

- (Reference) Items from the original Pang: Vulcan missile, double wire, power wire, clock (stop), hourglass (slow), barrier (single-use defense), dynamite (a hazard that splits all balls to their smallest size), 1UP
- The scope of this implementation (the 4 core items plus 1UP/dynamite) is simplified into an "apply an effect" model rather than weapon swapping
  - Double wire: allows keeping 2 harpoons active at once for 12 seconds (`DOUBLE_WIRE_DURATION_MS`)
  - Clock: stops all balls' movement for 6 seconds (no damage even if touched) (`CLOCK_DURATION_MS`)
  - Hourglass: slows all balls' speed to 0.4x for 8 seconds (`HOURGLASS_DURATION_MS`, `HOURGLASS_SLOW_FACTOR`)
  - Barrier: negates the next hit once (consumed on use; stacks as a count if multiple are held)
  - 1UP: immediately restores 1 HP (the original grants an extra life, but since this project has no lives concept, it's replaced with an HP restore, capped at MAX_HP)
  - Dynamite: a hazard — on pickup, all balls on screen recursively split down to the smallest size (level 0) instantly (`explodeToSmallest`), and awards no score
- Items have a small chance of dropping randomly when a ball is split/removed by a hit (`ITEM_DROP_CHANCE` = 14%), then fall under gravity and despawn if they go off-screen. Touching one as the player applies its effect immediately and plays a sound effect
- The dropped item's type is decided via a weighted draw (`ITEM_WEIGHTS`): double wire/clock/hourglass/barrier appear relatively often (20-22 each), while 1UP and dynamite appear rarely (9 each)
- The Vulcan missile/power wire (weapon-swap types) are excluded from this scope
- When an item is picked up, a short-lived popup announces which effect just triggered (e.g. "Double Wire!", "Barrier!") at the pickup location, using the same popup mechanism as score-gain text (`phase4_1.md`), so the effect is never a mystery to the player

## Late-stage item: Stabilizer

- Stages 41-70 (The Trench / Stellar Forge / Cosmic Frontier, see `phase5_1.md`/`phase5_2.md`/`phase5_6.md`) and stages 71-80 (Vortex Frontier, see `phase5_5.md`) introduce their own hazard on top of gravity — a lateral current, a gravity well, a nebula field (two weaker wells), or a spinning vortex well. Stabilizer briefly neutralizes whichever is active for 8 seconds (`STABILIZER_DURATION_MS`), giving the player a clean breather from the extra push/pull without touching the base physics.
- Only rolled into the item pool from stage 41 onward (`getItemWeights`, `STABILIZER_START_STAGE`) — it would do nothing in earlier stages, so it never appears there.
- Weight 12 among that pool's items (same tier as clock/hourglass/barrier).
- Does not neutralize the Hell (`phase5_7.md`) fire zones or Void (`phase5_8.md`) low gravity — those aren't a push-toward-a-point hazard to cancel, they're a direct damage mechanic and a baseline physics change respectively.

## Cosmic Frontier item: Nova Surge

- Rolled into the item pool from stage 61 onward (`NOVA_SURGE_START_STAGE`), staying in the pool for every later stage, same pattern as Stabilizer.
- Doubles the score gained from hitting balls for 10 seconds (`NOVA_SURGE_DURATION_MS`, `NOVA_SURGE_MULTIPLIER`) — does not affect scoreBonus/timePlus or other flat bonuses.
- Weight 9 among that pool's items (same tier as oneUp/dynamite).
