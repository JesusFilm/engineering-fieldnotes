# OAuth PKCE editorial review

Author: **gpt-6-astra**, high reasoning. Retrieved and reviewed **2026-10-19**. Decision: **revise; keep as reference**.

The original mechanics are useful but its mobile example does not establish a reason for an AI-adopting team to study them. This chapter belongs at connector implementation/review time, not ahead of ordinary coding-assistant adoption. The revision uses an explicitly illustrative incident-summary connector, concurrent browser authorizations, a bounded test exercise, and a separate server-side write denial. The placement is editorial judgment, not a standards claim.

## Every original assertion

| Original field/assertion | Assessment and revision | Evidence |
| --- | --- | --- |
| Summary: code bound to an attempt's secret | Keep the mechanism; name the host's transaction ownership | RFC 7636 §§4.1–4.4 |
| Overview: S256 from fresh verifier; compare before tokens | Revise the implication that equality alone issues tokens: validation continues | RFC 7636 §§4.2, 4.6 |
| Why: intercepted code alone should not obtain tokens | Keep with verifier secrecy and correct enforcement as assumptions; no protection claim for a stolen access token | RFC 7636 §1.1; RFC 9700 §2.2 |
| Example: mobile app retains verifier through browser flow | Accurate but too remote from the audience; replace with desktop agent-host example | RFC 8252 §§4, 6; MCP scope/roles |
| Judgment: maintained library, redirects, binding, verifier protection; not authorization policy | Keep and make testable; library maintenance is editorial advice, not a guaranteed property of any named SDK | RFC 9700 §§2.1, 2.1.1; MCP audience validation |
| Next: reject missing/incorrect verifier? | Good negative check, insufficient exercise alone; add concurrency and independent permission test | RFC 7636 §§4.5–4.6; RFC 9700 §2.1.1 |
| Sources and related concepts | Original RFCs are primary and relevant; add native-browser and versioned MCP evidence; retain related IDs | Actual pages opened below |

## Claim/source map

- [RFC 7636](https://www.rfc-editor.org/rfc/rfc7636), §§4.1–4.6: verifier syntax/entropy, S256 transform, code/challenge association, mismatch error, continuing normal processing. Supports overview, walkthrough 2–3, and the video comparison. No literal A/B/C values are protocol examples.
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700), §§2.1, 2.1.1, 2.2: redirect and CSRF handling, public/confidential client recommendations, transaction-specific binding, separate token replay controls. Supports judgment and explicit limits. PKCE advice extends beyond mobile clients. CSRF protection is conditional; the guide does not claim state is always mandatory or always redundant.
- [MCP authorization, 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization), Purpose and Scope, Protocol Requirements, Authorization Code Protection, Token Audience Binding and Validation: HTTP scope, STDIO distinction, capability verification, S256 and audience checks. Supports agent-tool relevance and walkthrough 4. Version is pinned; no assertion that all deployed hosts implement it or that it is the newest possible revision.
- [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252), §§4, 6: native client/browser roles. Supports walkthrough 1 and the accuracy of the original mobile example.

All four pages were retrievable and read on the stated date. RFC URLs may redirect to RFC Editor's info presentation with full text. No vendor marketing, undocumented product feature, secondary summary, or unavailable evidence is relied on.

The concurrent overwrite, recommended test harness, secret-free diagnostics and choice of read-only incident tool are engineering teaching recommendations/inferences. They are not claims that these standards prescribe this exact architecture or that a real product has this defect. Prompts guide behavior; the proposed service enforces permissions.

## Video teaching boundaries

The Astra cut shows two ordinary preparations, a crossed code/verifier submission, rejection, and a fresh correctly paired login. It does not teach browser consent, redirect validation, issuer checks, CSRF defenses, scopes, refresh tokens or MCP discovery. “Hash” abbreviates S256; letters are symbolic. A successful PKCE comparison does not guarantee token issuance. Tokens shown at the end assume other checks pass. Screen clearing is not revocation. This concurrent-transaction bug is distinct from the OAuth issuer mix-up attack.

No baseline or alternative scene was read. No comparative ranking or recommended-cut selection is claimed. The written guide and cut were self-reviewed by the author. A real provider integration, browser page rendering and independent editorial comparison were not tested in this scoped task; shared build/UI/manifest files were deliberately outside ownership.
