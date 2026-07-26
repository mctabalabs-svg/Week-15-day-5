# Checkout design notes

A state machine is better than booleans like `isInfoStep` / `isPaymentStep` because the steps form a single, predictable flow with one active state at a time. Booleans let you accidentally represent impossible combinations (e.g. info and payment both true), whereas a `step` string makes the valid transitions explicit and easy to reason about. The reducer centralizes every transition in one place, so adding a new step or guarding a transition is a small, localized change instead of scattered conditionals across the component.

If you refresh mid-checkout, all reducer state in React memory is lost and the user restarts at the `cart` step. To persist it you could serialize the state (with `JSON.stringify`) into `localStorage` and rehydrate it via the `useReducer` initializer, or store it in a session/cookie on the server; the cart contents would similarly need to live in a shared store rather than component memory.

If payment took 30 seconds, I would add an explicit `submitting`/`pending` state and surface real progress instead of a fixed "Processing..." text. I'd drive a progress bar from backend events (polling, websocket, or an SSE stream) or at least a timed animation, disable navigation while pending, and add a timeout/retry path so a stuck request moves to the `error` state instead of hanging.
