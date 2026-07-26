### app/(shop)/layout.js
- Classification: Server Component
- Reason: Provides shared server-rendered shop navigation and footer structure.
- Reason: Does not use React hooks, state, effects, or browser-only APIs.

### app/(shop)/page.js
- Classification: Server Component
- Reason: Fetches posts and renders static content with a client Counter child.
- Reason: Does not use React hooks or event handlers directly.

### app/(shop)/products/page.js
- Classification: Server Component
- Reason: Fetches products from Postgres and renders the product grid.
- Reason: Does not use React hooks or event handlers.

### app/(shop)/products/[slug]/page.js
- Classification: Server Component
- Reason: Fetches one product and generates metadata/server-rendered detail content.
- Reason: Does not use React hooks or event handlers.

### app/(shop)/products/[slug]/not-found.js
- Classification: Server Component
- Reason: Renders a static not-found message.
- Reason: Does not use React hooks or event handlers.

### app/(shop)/about/page.js
- Classification: Server Component
- Reason: Renders static content only.
- Reason: Does not use React hooks or event handlers.

### app/(shop)/cart/page.js
- Classification: Client Component
- Reason: Uses CartContext to dispatch reducer actions and render interactive cart UI.
- Reason: Includes event handlers for removing items, clearing, and checkout navigation.

### app/cart/cartReducer.js
- Classification: Utility (Client-Reachable)
- Reason: Pure reducer consumed by useReducer inside CartProvider.
- Reason: Contains no React hooks itself.

### app/cart/CartContext.jsx
- Classification: Client Component
- Reason: Creates context and uses useReducer with localStorage persistence.
- Reason: Wraps child components with provider value.

### app/cart/AddToCartButton.jsx
- Classification: Client Component
- Reason: Uses the `use client` directive.
- Reason: Dispatches cart reducer actions on click.

### app/cart/CartBadge.jsx
- Classification: Client Component
- Reason: Uses the `use client` directive.
- Reason: Reads cart state from context and renders a linked badge.

### app/sitemap.js
- Classification: Server Route Handler
- Reason: Fetches products from Postgres and returns sitemap XML data.
- Reason: Does not render interactive UI.

### app/layout.js
- Classification: Server Component
- Reason: Provides root HTML/body structure and imports global CSS.
- Reason: Does not use React hooks, state, effects, or browser-only APIs.

### app/leads/page.js
- Classification: Server Component
- Reason: Renders static content only.
- Reason: Does not use React hooks or event handlers.

### app/leads/[id]/page.js
- Classification: Server Component
- Reason: Fetches a lead from Postgres and renders detail content.
- Reason: Does not use React hooks or event handlers.

### app/components/Counter.jsx
- Classification: Client Component
- Reason: Uses the `use client` directive.
- Reason: Uses `useState` and an `onClick` handler.

### app/admin/layout.js
- Classification: Server Component
- Reason: Reads auth cookie and verifies JWT on the server before rendering admin children.
- Reason: Uses `next/navigation` redirect and `jsonwebtoken` verification.

### app/admin/orders/page.js
- Classification: Server Component
- Reason: Queries Postgres for orders and renders server-side filtered list.
- Reason: Reads `searchParams` for status filtering without client-side state.

### app/admin/orders/[id]/page.js
- Classification: Server Component
- Reason: Fetches single order and items from Postgres.
- Reason: Delegates status mutation to a Server Action via form submission.

### app/admin/orders/[id]/updateStatus.js
- Classification: Server Action
- Reason: Mutates order status in Postgres and triggers revalidation.
- Reason: Runs exclusively on the server.

### app/login/page.js
- Classification: Server Component
- Reason: Renders login form and delegates authentication to a Server Action.
- Reason: Does not use browser-only APIs or client state.

### app/login/actions.js
- Classification: Server Action
- Reason: Validates credentials against Postgres, issues JWT, and sets HTTP-only cookie.
- Reason: Runs exclusively on the server.
