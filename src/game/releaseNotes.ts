export type ReleaseNote = {
  version: string
  date: string
  notes: string[]
}

// Newest first. Written for players, not developers — keep it short and
// skip internal-only changes (chores, test-only commits). Only the most
// recent releases are kept; older entries can be dropped.
export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: '1.36.0',
    date: '2026-07-26',
    notes: [
      'The secret final stage (201) is now a real boss fight: twice as long, 8 starting balloons instead of 6, and every 9-second phase now STACKS on top of the last (wind, then wells, then fire, then low gravity, then a balloon swarm — all five active together by the end of each cycle) instead of swapping one hazard for another.',
      "Dynamite and Shockwave no longer drop on the final stage — they used to let a lucky pickup clear the whole fight in seconds. If the balloon count ever runs low with more than 20 seconds left, more balloons flood in — the fight can't be cheaply ended early, but it always has a genuine, clearable final stretch.",
    ],
  },
  {
    version: '1.35.2',
    date: '2026-07-26',
    notes: [
      "Fixed the Diagonal Wire only popping a balloon that touched its exact tip — it's a real harpoon on a wire now, so a balloon touching anywhere along the line pops, same as every other harpoon.",
    ],
  },
  {
    version: '1.35.1',
    date: '2026-07-25',
    notes: [
      "Fixed the game being able to freeze completely and silently on an unexpected error, with no way back except reloading the page — it now recovers on its own, and if something still goes seriously wrong you'll get a Reload button instead of a dead blank screen.",
    ],
  },
  {
    version: '1.35.0',
    date: '2026-07-25',
    notes: [
      "New Settings option: Language (English/한국어). The main menu, in-game HUD and pause menu, Settings itself, and every item name/description now switch with it. Stage Map, Glossary, What's New, and the intro tutorial are still English-only for now — more screens will follow.",
    ],
  },
  {
    version: '1.34.0',
    date: '2026-07-25',
    notes: [
      'AI Companion now picks up items too, and shares the effect with you the same way you sharing an effect with it always worked — a genuine helper, not just a second body fighting in parallel.',
    ],
  },
  {
    version: '1.33.0',
    date: '2026-07-25',
    notes: [
      "Fixed the roaming critter being killable in name only — a harpoon's reach was narrower than the critter's own contact range, so you had to already be taking damage to land a shot. You can now shoot one down as it approaches, from safety.",
      'The AI (both Watch AI Play and the Companion) now accounts for the roaming critter, its own invulnerability frames, Spike Armor, Ice Wind drift, and the slick Frozen Summit floor — it no longer walks into critters, dodges when it cannot be hurt, or gets blown off its dodge line.',
    ],
  },
  {
    version: '1.32.0',
    date: '2026-07-25',
    notes: [
      'Eased the difficulty a bit: you now start each stage with 4 HP instead of 3, and power-ups drop a little more often through the tougher late-game stages.',
    ],
  },
  {
    version: '1.31.1',
    date: '2026-07-25',
    notes: [
      'The Diagonal Wire now looks like a real harpoon — a tethered line trailing back to you at an angle — instead of a tetherless dart.',
      'Removed the Star Balloon item: clearing the whole screen in one pickup was too strong, and Shockwave already fills the screen-wide role.',
    ],
  },
  {
    version: '1.31.0',
    date: '2026-07-25',
    notes: [
      'AI Companion is now a full ghost copy of you instead of a lane-locked drone — it roams the whole arena, dodges hazards, and picks targets using the same brain that powers Watch AI Play.',
    ],
  },
  {
    version: '1.30.2',
    date: '2026-07-25',
    notes: [
      "Fixed Chaos Rift's gravity wells resetting to their weakest pull every 10 stages instead of building up across the full finale — they now scale continuously from stage 151 to 200.",
    ],
  },
  {
    version: '1.30.1',
    date: '2026-07-24',
    notes: [
      "Balance pass on the newer mechanics: a platform can no longer be both breakable and drifting at once, and the roaming critter appears less often and moves a bit slower during Frozen Summit's icy floor, where it was previously the toughest stretch in the game.",
    ],
  },
  {
    version: '1.30.0',
    date: '2026-07-24',
    notes: [
      'The roaming critter can now be killed with a harpoon hit instead of only ever being something to dodge forever.',
      'New item: AI Helper. Picking it up spawns the AI Companion drone for 12 seconds even if you have the setting off — a rescue chance for a rough stretch.',
    ],
  },
  {
    version: '1.29.0',
    date: '2026-07-24',
    notes: [
      'Fixed cleared stages showing dim/grayed-out on the Stage Map — they now stay at full brightness with a small green highlight, so completing a stage reads as an achievement instead of looking disabled.',
    ],
  },
  {
    version: '1.28.3',
    date: '2026-07-24',
    notes: [
      'The ladder touch controls are now a proper D-pad cross (Up above, Down below, Left/Right on the sides) instead of a stacked pair, so climbing feels like a natural extension of moving instead of a separate control to hunt for.',
    ],
  },
  {
    version: '1.28.2',
    date: '2026-07-24',
    notes: [
      "Fixed the ladder climb buttons landing in the dead center of the screen (and not responding to taps) in landscape mode — they now sit right next to the move buttons, where they're easy to reach and always tappable.",
    ],
  },
  {
    version: '1.28.0',
    date: '2026-07-24',
    notes: [
      'New Settings toggle: AI Companion. Turn it on and a small drone patrols the right side of the arena, firing its own harpoon at any balloon that drifts into its lane — a helping hand for a lower-pressure run, off by default.',
    ],
  },
  {
    version: '1.27.0',
    date: '2026-07-24',
    notes: [
      "Some platforms now drift back and forth instead of sitting still, so a balloon's bounce point keeps shifting — watch for the platforms marked with a pair of arrows.",
    ],
  },
  {
    version: '1.26.0',
    date: '2026-07-24',
    notes: [
      'A small crawling critter now patrols the ground on some stages — dodge it, wait it out, or use a ladder to get above it.',
    ],
  },
  {
    version: '1.25.0',
    date: '2026-07-24',
    notes: [
      'Some stages now have a climbable ladder — hold Up/Down (or the new on-screen buttons) while standing near one to reach a higher vantage point and fire from up top.',
    ],
  },
  {
    version: '1.24.1',
    date: '2026-07-24',
    notes: [
      "Every stage's not-yet-cleared preview art is now visually unique, instead of a handful of stages in the same chapter sharing one identical scene.",
    ],
  },
  {
    version: '1.24.0',
    date: '2026-07-24',
    notes: [
      'New item: Spike Armor. Wear it and touching a balloon pops it for score instead of costing you HP.',
      'New item: Diagonal Wire. Fires a pair of harpoons out at an angle instead of straight up.',
      'New item: Star Balloon. Instantly pops every balloon on screen for score.',
      'Some platforms from stage 21 on can now be broken open with a harpoon hit.',
      "Frozen Summit's floor is slick — you'll ease into full speed and keep sliding a little after you let go of the stick.",
    ],
  },
  {
    version: '1.23.0',
    date: '2026-07-20',
    notes: [
      'Watch AI Play got a pro-gamer upgrade: it now only fires shots it has verified will land, dodges using every ball’s full flight path (not just where it will drop), knows which power-ups are worth a detour — and which dynamite grabs are suicide — and plays under the real stage time limit, pacing itself against the clock.',
    ],
  },
  {
    version: '1.22.0',
    date: '2026-07-20',
    notes: [
      "What's New now opens on its own the first time you load the game after an update, instead of waiting for you to check Settings.",
      "Every 10th stage's certificate screen now shows how you're tracking against your personal best score.",
    ],
  },
  {
    version: '1.21.5',
    date: '2026-07-20',
    notes: [
      'Drag-to-move now reaches the screen edges reliably — holding your finger near the left/right edge walks the ship all the way there instead of stalling partway.',
    ],
  },
  {
    version: '1.21.4',
    date: '2026-07-20',
    notes: [
      'Fixed drag-to-move outside the game screen sometimes not registering on a single touch — a page-scroll gesture was quietly competing with it.',
    ],
  },
  {
    version: '1.21.3',
    date: '2026-07-20',
    notes: [
      'Firing is now exclusively the Fire button (tapping/dragging to move never fires by accident anymore), and holding Fire no longer interferes with a drag-to-move happening at the same time.',
    ],
  },
  {
    version: '1.21.2',
    date: '2026-07-19',
    notes: [
      'In portrait mode, you can now swipe left/right anywhere below the game screen (not just directly on it) to move your ship — no more reaching for a small letterboxed canvas.',
    ],
  },
  {
    version: '1.21.1',
    date: '2026-07-19',
    notes: [
      'Stage Map now has a "Jump to stage" quick-nav, so finding a specific stage in the now much longer list takes one search instead of a long scroll.',
    ],
  },
]
