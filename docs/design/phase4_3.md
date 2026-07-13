# Phase 4-3. Ranking

## Goal

- Show a rank/ranking based on local records (server-based ranking is excluded per the PRD non-goals; use local storage records only)

## Design

- On the end screen, show this run's rank (e.g. "All-time #3") computed from the record array in `docs/design/phase4_2.md`
- Also show the stage this run reached (e.g. "Ended at stage 3" or "Fully cleared" if it was a clear)
- Also show this run's timestamp (YYYY-MM-DD HH:MM)
- (Optional) A short list of the top ~5 local records can be shown on the end screen, with each entry's name alongside its score
- The end screen includes an editable name field (pre-filled with the last-used name, "Player" by default). Changing it updates `pang_player_name` for future runs and renames the just-recorded entry for this run
- Note: this is a local-only leaderboard (per browser/device), not a shared leaderboard across different users — that would require a real backend, which is out of scope per the PRD non-goals (no server-based accounts/ranking)
