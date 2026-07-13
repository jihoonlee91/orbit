# Phase 3-1. Stage Balance

> This is a draft. Details will be finalized after discussion.

## Goal

- Design ball count/size/speed per stage

## Design

- 10 stages total
- For each stage n (0-indexed), starting ball count = min(n + 1, 8), all starting at the largest size (level 2) — capped at 8 so the later stages stay hard but not absurdly overcrowded
- Ball speed multiplier increases with each stage, uncapped (see 3-2 below)
- The 5 world-tour background themes (`phase3_3.md`) repeat in the same order for stages 6-10, so each theme appears twice across the run, the second time at a higher difficulty
- The hint panel shows the full list of all 10 stages (theme names) along with the current progress position and clear status, so the player can see the overall composition
