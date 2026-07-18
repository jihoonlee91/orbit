# Phase 3-2. Difficulty Curve

> This is a draft. Details will be finalized after discussion.

## Goal

- Build the difficulty escalation curve across stage progression

## Design

- Speed multiplier for stage n (0-indexed) = 1 + n * 0.15
- Mission 1 (Stage 1) serves as a tutorial, with 1 ball and slow speed
- Time budget for stage n (0-indexed) = `STAGE_TIME_SECONDS - n`, floored at
  12 seconds (`getStageTimeSeconds`, `constants.ts`) — added when `STAGE_COUNT`
  grew past 90, since the unfloored formula went to zero/negative and ended
  the run the instant it started for every stage from 91 onward.
