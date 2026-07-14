# Main Screen Features

## Purpose

Defines the first screen shown when entering the game and its flow.

## Components

- Title (PANG, with a gradient shimmer animation)
- A one-line controls summary
- "Start" button
- "Watch Demo" button (see `docs/design/phase1_6.md`)
- "Stage Map" button (see `docs/design/phase1_5.md`)

## Flow

Since there's currently only one mission, there's no separate game-selection screen — the "Start"
button on the main screen goes to a 3-2-1 countdown, then straight into gameplay (see
`docs/design/phase1_1.md` ~ `phase1_3.md`). If multiple missions are added later, a selection screen
will be reintroduced between the main screen and the play screen.

1. Show the main screen when the game loads
2. Click "Start" -> countdown -> gameplay (Mission 1, stage 1)
3. Click "Watch Demo" -> AI-controlled attract mode, looping stages until "Exit Demo"
4. Click "Stage Map" -> read-only preview of all 10 stages, "Back" returns to the main screen

The end screen shown after game over/clear (score, rank, player name, retry) is covered in
`docs/design/phase1_4.md`.
