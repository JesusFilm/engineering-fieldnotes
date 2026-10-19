# Evidence for the fable variant

Source-to-claim mapping, paraphrased for publication by **gpt-6-astra comparative review**, 2026-10-19. Original video authorship is unchanged. The primary article was opened during both the author review and the comparative review.

| Source guidance | What the video illustrates |
| --- | --- |
| [Anthropic: meaningful context](https://www.anthropic.com/engineering/writing-tools-for-agents) recommends selecting relevant response fields and useful identifiers. | The successful search returns three lines and `INC-42`, preserving an identifier for follow-up. |
| [Anthropic: token efficiency](https://www.anthropic.com/engineering/writing-tools-for-agents) recommends defaults and controls such as filtering, range selection, pagination and truncation. | `search_logs` exposes `service`, `window` and `limit`; its implementation bounds the response. Pagination is not animated. |
| [Anthropic: choosing tools](https://www.anthropic.com/engineering/writing-tools-for-agents) contrasts indiscriminate log retrieval with targeted search that retains relevant surrounding context. | The redesign changes `read_logs` into `search_logs`. These names follow the article's example. |
| [Anthropic: token efficiency](https://www.anthropic.com/engineering/writing-tools-for-agents) describes harness-specific response truncation. | The red `TRUNCATED` badge and dropped `INC-42` illustrate lost evidence. Counts and the cutoff are scripted, not measurements or universal thresholds. |
| [Anthropic: tool design](https://www.anthropic.com/engineering/writing-tools-for-agents) recommends moving suitable selection and processing into tools. | The `filter` request and longer Logs spinner show the backend doing selection before results enter the model's context. |

The [concept guide](../../../content/concepts/tool-design.json) supplies the broader contract: preserve outcomes and expose coverage and continuation information. Fable complements the baseline and Astra cuts, which distinguish a completed empty lookup from a failed lookup and illustrate one retry.

The animation does not establish that an agent always answers `?` after truncation: a real agent might answer confidently and incorrectly. Bounded search does not guarantee that the incident is found. Limits require executable enforcement; describing a limit in a prompt or tool description is insufficient. A record-count limit alone also does not bound bytes or tokens when records are unbounded. The opening receipt reports only the received line count, not incident absence.
