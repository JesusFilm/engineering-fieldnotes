# Evidence for the Fable human-in-the-loop cut

The author retrieved the LangGraph documentation on 19 October 2026. These notes paraphrase the source rather than reproduce its text.

## Primary source

[LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)

Interrupts require a checkpointer and thread identity. They pause execution and allow a later resume value to become the interrupt call’s return value. On resume, the interrupted node starts again from its beginning, so code before the interrupt runs again. A non-idempotent side effect in that position can therefore be repeated.

The documentation discusses idempotent operations, moving effects after the interrupt, and separating effects into nodes as ways to structure this work. The video illustrates moving a notification after the pause. That placement addresses the depicted replay; it does not guarantee exactly-once effects under every retry or crash.

## Library judgement and limits

The deployment node and operations-channel notices are invented examples. The checkpoint is a visual shorthand for persistence and resume, not a prescribed separate approval store or a security control. The resume answer must be supplied through the runtime’s actual interface.

The baseline teaches rechecking approval when production prerequisites change. This alternative teaches LangGraph’s restart behavior; other runtimes may differ. See the fresh comparative review and current transcript for corrections to the final encoded sequence.
