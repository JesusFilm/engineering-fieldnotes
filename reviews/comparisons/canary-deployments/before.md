# Canary deployments — fresh blind comparison

Reviewer: GPT-6.1 Sol. Recorded 2026-10-19 before opening any author scenes, provenance, transcripts, scores, prior review, or partial repair notes. Cut names below identify files only. The intended lesson was read from `content/concepts/canary-deployments.json`; this is independence from author commentary, not ignorance of the guide. The interrupted review remains in `interrupted-before.md` and is not this review's first evidence.

Evidence: newly decoded one-second contact sheets covering all 26/30/28 seconds in `fresh-scratch/`; individual 1080×1920 frames at each causal beat and the busy failure/decision/recovery states; the same beat frames resized to exactly 350px wide. Times below are approximate playback seconds (contact-sheet samples near half-seconds). No audio has been heard. Fine event boundaries, codec/loop checks and sound analytics remain to be checked after this record.

## Baseline — limited exposure, latency, rollback

- **0–5s:** The production caller, router, empty candidate and 100/0 share establish the control before intervention. The caller icon costs vertical space, but this is the easiest topology to understand without reading a dashboard.
- **5–9s:** The bar changes to 80/20 and packets enter both versions. A minority route is visible, rather than merely asserted in text. Candidate latency initially remains absent, which correctly avoids assuming unobserved health.
- **9–15s:** The candidate takes longer and reports p95 900ms against 120ms control. Repeated traffic provides a useful normal/slow contrast, but the middle feels long for one unchanged outcome. A few drawn requests cannot establish a p95; this must remain an illustrative measured summary, with sample/window policy in the guide.
- **15–18s:** The candidate metric becomes red and `900 / 120 = 7.5×` precedes rollback. Arithmetic is right. The threshold and a separate analysis component are implicit, so the lesson is observable regression followed by withdrawal, not a reproducible statistical gate.
- **18–24s:** 100/0 returns and fresh stable traffic succeeds while the candidate's bad metric remains. That is a better ending than repainting the failed candidate green. The old number lacks a historical-window label, though its inactive route makes the intended interpretation reasonable.
- **24–26s:** Stage fades; title remains. Need exact encoded boundary comparison before declaring a seamless loop.
- **Phone/busy frame:** No observed clipping or label collision. Version names and the arithmetic badge are materially smaller than either alternative; p95 values remain readable but require attention. This cut is useful as a first visual explanation of routing and withdrawal, less useful as the chapter's main evidence lesson.

## Astra — pooled health hides an operation regression

- **0–6s:** 0/10,000 belongs explicitly to a PRIOR WINDOW with no candidate traffic. Clear evidence scoping avoids reusing a healthy old window as candidate approval. The nearly five-second establishment is slow for an experienced audience.
- **6–13s:** 90/10 exposure begins and the metric switches to COLLECTING / New window. Traffic motion and a blank metric distinguish waiting for evidence from passing. Packet counts are representative; the exact 10% cannot be inferred from a single short burst.
- **13–17s:** 40/10,000 = 0.4% appears green while promotion stays pending. Strong contrast: apparent pooled health does not authorize rollout. The green aggregate needs the following reveal to avoid implying that 0.4% is universally acceptable.
- **17–20s:** The wide metric becomes two operation/version cards: 0/900 vs 40/100 exports in the SAME WINDOW. This is the most decision-changing lesson of the three cuts and directly supports the guide's denominator exercise. Both rates are correct. The transition substitutes panels rather than visually decomposing the pooled population, so a viewer must read the labels to understand the denominator change.
- **20–23s:** Promotion blocks before the share returns to 100/0. The evidence causes the decision in a clear order, though the policy itself remains implicit and motion is mostly pulses/cards rather than a visible evidence wire into a gate.
- **23–29s:** FAILED WINDOW preserves the 40% candidate result while fresh requests return to v1. Strongest evidence retention of the three. The final steady hold is generous and could be shorter without losing the conclusion.
- **29–30s:** Full fade appears to close the changed state honestly; exact endpoints still need checking.
- **Phone/busy frame:** Large rates, explicit denominators and wide cards remain readable at 350px. No observed collision, offstage content or title overlap. More reading than baseline, but it uses the space for useful measurements.

## Sol — transport success versus task success for a prompt release

- **0–5s:** PR draft sessions use Prompt v1; HTTP 200 is followed by Required PR tests PASS. This establishes that service delivery and artifact correctness are separate checks.
- **5–11s:** Prompt v2 receives a 10% session cohort while control continues. Session routing is a useful agent-specific choice because a workflow should not casually switch prompt versions mid-session. The candidate's result remains unknown until it receives work. Several repeated control arrivals make this stretch slower than necessary.
- **11–16s:** Candidate HTTP 200 becomes green, then Required PR tests FAIL becomes red. Strongest agentic contrast: an available endpoint can generate a failing deliverable. This is narrower than complete task quality, and no sample count or failure rate is shown; it should be read as an illustrative mandatory test failure, not a measured success-rate comparison.
- **16–19s:** Failure travels to STOP and the gate feeds back to the router. This is the clearest depicted enforcement path of the three. It shows that observing a failed test changes routing, rather than leaving the decision as an unexplained title.
- **19–26s:** Router becomes Prompt v1 only, share becomes 100/0, control receives new work and Canary withdrawn resolves the story. Candidate HTTP 200 / FAIL remains visible; failure evidence survives but has no explicit historical-window caption. The red feedback path is visually busy yet stays clear of labels.
- **26–28s:** Full fade. Endpoints require exact verification.
- **Phone/busy frame:** Labels are larger than baseline, with failure symbols as well as color. All primary states read at 350px. Two pairs of test cards and the long feedback path demand more scanning than Astra's rate reveal, but do not collide.

## Provisional comparative decision

Prefer **Astra** as the main entry: it most clearly changes the team's release decision by exposing a serious regression hidden in a benign pooled number, and matches the chapter exercise. Retain baseline for routing/latency intuition and Sol for applying rollout gates to agent-generated artifacts. None of the observed omissions alone justifies replacing a complementary mechanism with another copy of the same lesson. The strongest remaining caveat across all three is that sample sufficiency, explicit acceptance policy and irreversible side effects live in the written guide, not the short animations. Final scores and verification await metadata/source reconciliation and encoded checks.
