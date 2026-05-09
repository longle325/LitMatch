# LitMatch Backend API Spec

This document is the contract between the LitMatch frontend and the backend service. The frontend currently talks to a mock client that implements this exact shape (`src/api/client.ts`). When the backend is ready, the only frontend change is swapping the mock implementation for an HTTP one — no route or component code should need to change.

> **Source of truth:** This doc. If anything here conflicts with the mock client, treat this doc as authoritative and update the mock to match.

## 1. Conventions

- **Base URL:** TBD by backend team. The frontend will read it from a `VITE_API_BASE_URL` env var (defaulting to a relative path).
- **Content type:** `application/json; charset=utf-8` for all request and response bodies, except `POST /chat` which streams (see §4).
- **Encoding:** All text is UTF-8. Vietnamese diacritics must be preserved exactly.
- **Auth (MVP):** None. Identity is whatever username the user typed during onboarding. A future iteration will add session auth — this spec does not block it.
- **Idempotency:** `POST /match` and `POST /characters/:id/challenge/submit` should be safe to retry. `submit` may either return the previously stored result or accept the latest answers — frontend treats the response as the source of truth.
- **Time:** All timestamps are ISO 8601 in UTC (`2026-05-08T12:34:56Z`).
- **IDs:** Character IDs are stable kebab-case strings (e.g. `chi-pheo`, `thuy-kieu`). They match the seed in `src/data/characters.ts`.

## 2. Error format

All non-2xx responses return:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Character not found",
    "details": { "id": "unknown-id" }
  }
}
```

Common codes the frontend handles:

| HTTP | `code` | When |
| --- | --- | --- |
| 400 | `INVALID_INPUT` | Malformed body or query params |
| 401 | `UNAUTHENTICATED` | Auth required (post-MVP) |
| 404 | `NOT_FOUND` | Unknown `:id` |
| 409 | `ALREADY_COMPLETED` | Challenge submitted again without retry |
| 429 | `RATE_LIMITED` | Throttling (e.g. chat) |
| 500 | `INTERNAL` | Server error |

## 3. Endpoints

### 3.1 `GET /deck`

Returns the full character deck. The MVP returns all five characters in a stable curator-defined order.

**Response 200**

```json
{
  "characters": [ /* Character[] — see §5.1 */ ]
}
```

### 3.2 `GET /characters/:id`

Returns one character.

**Path params**

| Name | Type | Notes |
| --- | --- | --- |
| `id` | string | Character ID (e.g. `chi-pheo`) |

**Response 200**

```json
{ "character": /* Character */ }
```

**404** if no character with that ID.

### 3.3 `POST /match`

Records that the current user matched (right-swiped) a character. The frontend awards `+10` points client-side immediately for responsiveness; the backend should accept the call and persist it. Server points are authoritative once auth lands.

**Body**

```json
{ "characterId": "chi-pheo" }
```

**Response 200**

```json
{ "ok": true }
```

Idempotent: matching the same character twice should return `{ "ok": true }` without double-counting.

### 3.4 `GET /characters/:id/challenge`

Returns the five challenge questions for a character. **Important:** the response must NOT include the correct-answer index or the explanation — those move to the server in §3.5.

**Response 200**

```json
{
  "questions": [
    {
      "id": "chi-pheo-q1",
      "text": "Nguyên nhân sâu xa nào đẩy Chí Phèo vào con đường lưu manh hóa?",
      "options": [
        "Bản chất Chí vốn ác độc từ nhỏ",
        "Nhà tù thực dân và cường hào làng Vũ Đại đã tha hóa người nông dân",
        "Chí không thích lao động",
        "Thị Nở ruồng bỏ Chí ngay từ đầu"
      ]
    }
  ]
}
```

> Migration note: The current mock returns `answer` and `explanation` inline (see `src/data/characters.ts`). When the backend ships, those fields move server-side and the frontend `ChallengeQuestion` type drops them. Frontend will adapt — answers and explanations only need to be sent back from `/submit`.

### 3.5 `POST /characters/:id/challenge/submit`

Grades a challenge submission and returns the per-question explanation set.

**Body**

```json
{
  "answers": [1, 1, 0, 1, 1]
}
```

`answers[i]` is the option index (0-based) the user picked for question `i`. Length must equal the number of questions.

**Response 200**

```json
{
  "result": {
    "score": 5,
    "passed": true,
    "perfect": true,
    "awarded": 115,
    "answers": [1, 1, 0, 1, 1],
    "questions": [
      {
        "id": "chi-pheo-q1",
        "correctIndex": 1,
        "explanation": "Bi kịch của Chí bắt nguồn từ xã hội phi nhân đạo..."
      }
    ]
  }
}
```

**400** if `answers.length` doesn't match the question count.

#### Scoring rules

Per PRD §6.5:

| Component | Points |
| --- | --- |
| Right-swipe match | +10 (awarded by `/match`) |
| Challenge completion (any score) | +50 |
| Pass bonus (score ≥ 4 / 5) | +40 |

`awarded` is the sum of completion + pass-bonus (i.e. it does NOT include the +10 match bonus). Constants live in `src/lib/scoring.ts`.

### 3.6 `GET /leaderboard`

Returns ranked users. Current user (if authenticated) should be folded in by the backend and flagged.

**Response 200**

```json
{
  "entries": [
    { "name": "Minh Trần", "points": 1450, "unlocked": 5, "isCurrentUser": false },
    { "name": "Lan Ngọc", "points": 1280, "unlocked": 5, "isCurrentUser": false }
  ]
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | Display name |
| `points` | number | Total points |
| `unlocked` | number | Count of fully unlocked characters (challenge passed) |
| `isCurrentUser` | boolean | Optional, defaults `false` |

Sort order: server returns by descending `points`. Frontend will sort defensively but trusts server order.

> Until auth lands, the frontend merges its own client-side score into the response and re-sorts. The backend can ignore current-user merging in MVP.

### 3.7 `POST /chat` (streaming)

Streams a character reply, chunk-by-chunk, in the voice of the matched character. Grounded against the curated knowledge base for that character.

**Headers**

```
Content-Type: application/json
Accept: text/event-stream
```

**Body**

```json
{
  "characterId": "chi-pheo",
  "message": "Bát cháo hành có ý nghĩa gì?",
  "history": [
    { "from": "user", "text": "..." },
    { "from": "bot",  "text": "..." }
  ]
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `characterId` | string | yes | Must be a character the user has matched |
| `message` | string | yes | Trimmed, non-empty, max 1000 chars |
| `history` | `ChatMessage[]` | optional | Prior turns for context. May be omitted; backend should be stateless w.r.t. history. |

**Response: `text/event-stream`** (SSE)

Event types:

```
event: token
data: {"text":"Theo "}

event: token
data: {"text":"giọng "}

event: token
data: {"text":"của "}

event: source
data: {"id":"chi-pheo-s1","title":"Bát cháo hành","snippet":"..."}

event: done
data: {"messageId":"msg_abc123"}
```

| Event | Schema | When |
| --- | --- | --- |
| `token` | `{ "text": string }` | Each chunk of the reply. Frontend appends in order. |
| `source` | `{ "id": string, "title": string, "snippet": string }` | Optional. Sent when retrieval surfaces a snippet so the UI can highlight it. May be sent before, during, or after tokens. |
| `error` | `{ "code": string, "message": string }` | Stream-level error. Frontend stops appending and shows the message. |
| `done` | `{ "messageId": string }` | Final event. Stream closes after this. |

**Behavior contract**

- The full assembled `text` is the concatenation of all `token.text` values, in order.
- Tokens may be a single character, a word, a phrase — frontend doesn't care.
- Refusal/uncertainty behavior (PRD §6.3): if the question is out of scope, the reply should explicitly say so rather than confabulate. The mock client's `composeReply()` shows the expected tone.
- No essay generation: per PRD §12 risk, refuse full canned essays and offer outline/evidence help instead.
- Cancellation: frontend will close the connection if the user navigates away. Backend should abort generation on disconnect.
- Streaming is the only mode. There is no non-streaming `/chat` endpoint.

> **Migration path from mock:** the mock chat (`mockClient.streamChat` in `src/api/client.ts`) is an `AsyncIterable<string>` that yields word-sized chunks. The HTTP client adapter will parse SSE events into the same shape, so the route component (`src/routes/Chat.tsx`) doesn't change.

## 4. Streaming protocol details

We're using SSE (not WebSockets) because the chat is one-shot per user message and HTTP streaming is well-supported by the `EventSource` API and any reverse proxy in front of the backend.

- Set `Cache-Control: no-cache` and `X-Accel-Buffering: no` if behind nginx.
- Keep the connection alive with periodic comments (`: ping\n\n`) if a chunk hasn't arrived in 15s.
- Close the stream after `done` or `error`.
- On HTTP 4xx/5xx (e.g. user not authorized, character not matched), respond with a normal JSON error per §2 — do NOT open the SSE stream.

## 5. Type schemas

The TypeScript source of truth is `src/types/index.ts`. Below is the wire format.

### 5.1 `Character`

```ts
{
  id: string;              // "chi-pheo"
  name: string;            // "Chí Phèo"
  work: string;            // "Chí Phèo"
  author: string;          // "Nam Cao"
  initial: string;         // "C" — for fallback art
  artA: string;            // hex color
  artB: string;            // hex color
  artTitle: string;        // scene name for fallback art
  image?: string;          // hero image URL (large)
  portrait?: string;       // collection-card image URL
  avatar?: string;         // chat avatar image URL
  imageBrief: string;      // text prompt for image generation
  bio: string;
  quote: string;
  personality: string;
  conflict: string;
  context: string;         // social/historical context
  sources: string[];       // 3–5 curated source notes
  voice: string;           // chat voice instructions
}
```

Note: the current frontend ships `challenge` inline on `Character` for the mock. **The HTTP API should NOT include `challenge` on `Character`** — it's served separately via `GET /characters/:id/challenge`. This keeps correct-answer keys off the wire.

### 5.2 `ChallengeQuestion` (server form)

```ts
{
  id: string;              // "chi-pheo-q1"
  text: string;
  options: string[];       // length 4 (always 4 for MVP)
}
```

### 5.3 `ChallengeResult`

```ts
{
  score: number;           // 0..5
  passed: boolean;         // score >= 4
  perfect: boolean;        // score === 5
  awarded: number;         // total points awarded by this submission
  answers: number[];       // echoed back, length 5
  questions: Array<{
    id: string;
    correctIndex: number;
    explanation: string;
  }>;
}
```

### 5.4 `ChatMessage`

```ts
{
  from: "user" | "bot";
  text: string;
}
```

### 5.5 `LeaderboardEntry`

```ts
{
  name: string;
  points: number;
  unlocked: number;
  isCurrentUser?: boolean;
}
```

## 6. Content seed

For the MVP content batch, the backend should seed the same five characters the frontend currently hard-codes:

- `chi-pheo` — Chí Phèo (Nam Cao)
- `mi` — Mị (Tô Hoài, *Vợ chồng A Phủ*)
- `xuan-toc-do` — Xuân Tóc Đỏ (Vũ Trọng Phụng, *Số đỏ*)
- `luc-van-tien` — Lục Vân Tiên (Nguyễn Đình Chiểu)
- `thuy-kieu` — Thúy Kiều (Nguyễn Du, *Truyện Kiều*)

Full content (bio, quote, personality, conflict, context, sources, voice, 5 challenge questions w/ answers + explanations) is in `src/data/characters.ts`. `Content_reference.csv` and `Content for Hackathon game - Sheet1.pdf` are the upstream sources for that data.

## 7. Open questions

1. **Auth model:** PRD §6.1 says "Store user profile locally" for MVP. When does the backend introduce sessions? Affects `POST /match` and leaderboard merging.
2. **Chat retention:** does the backend persist chat history server-side, or is it client-only? Currently client-only via `localStorage`.
3. **Rate limiting on `/chat`:** what's the cap? Frontend doesn't currently throttle.
4. **`source` events on chat:** are we shipping retrieval-driven citations in MVP, or just streaming text? If just text, the `source` event can be omitted.
