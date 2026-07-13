# Main Screen Features

## Purpose

Defines the first screen shown when entering the game and its flow.

## Components

- Title (PANG, with a gradient shimmer animation)
- "Start" button

## Flow

Since there's currently only one mission, there's no separate game-selection screen — the "Start"
button on the main screen goes straight into gameplay (see `docs/design/phase1_1.md` ~
`phase1_3.md`). If multiple missions are added later, a selection screen will be reintroduced
between the main screen and the play screen.

1. Show the main screen when the game loads
2. Click the "Start" button -> transition directly to the gameplay screen (Mission 1)

The end screen shown after game over/clear and the restart flow are covered in `docs/design/phase1_4.md`.
