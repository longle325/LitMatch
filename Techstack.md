

**1\. System Architecture Overview:** 

- **Mobile Client (Frontend):** React Native built with Expo and TypeScript. Handles complex swipe gestures and real-time Server-Sent Events (SSE) for the chat interface.  
- **API Gateway & AI Orchestrator (Backend):** FastAPI (Python). Provides asynchronous endpoints, manages user state, and orchestrates the Hybrid RAG pipeline.  
- **Data & Knowledge Layer:** **Relational DB:** PostgreSQL for user states, leaderboards, and matches.  
* **Graph DB:** Neo4j for mapping precise literary entities and relationships (GraphRAG).  
* **Vector Store:** Supabase pgvector (or Pinecone) for semantic similarity fallback.

## **2\. Data Layer & Schema Design:** 

### **2.1. Relational Data (PostgreSQL)**

Manages the application's state and gamification loops.

* **users:** id (UUID), username, total\_score, created\_at.  
* **characters:** id, name, author, work\_title, short\_bio, avatar\_url, difficulty\_level.  
* **matches:** user\_id, character\_id, status (Enum: SWIPED\_RIGHT, CHAT\_UNLOCKED, CHALLENGE\_PASSED).  
* **challenges:** character\_id, questions (JSONB array containing 5 multiple-choice questions ).

### **2.2. The Hybrid Knowledge Base (Neo4j \+ Vector Store)**

To ensure the chatbot stays grounded in source text and does not invent major plot details, we utilize a dual-retrieval system.

* **Primary: Neo4j (GraphRAG):** Maps deterministic relationships to prevent hallucination.  
  * *Nodes:* (Character), (Trait), (Quote), (Event).  
  * *Edges:* \[:EXHIBITS\], \[:SPOKE\], \[:PARTICIPATED\_IN\].  
* **Fallback: Vector Store:** Chunks of the original literary text, author notes, and historical context embedded using `text-embedding-3-small`. This catches broad, semantic queries that fail to hit specific graph nodes.

## **3\. Backend Implementation (FastAPI)**

FastAPI handles the concurrent connections required for streaming LLM responses and manages the routing logic.

### **Directory Structure**

\`\`\`

backend/

├── main.py                 \# FastAPI application factory

├── api/

│   ├── routes.py           \# Endpoint definitions

├── services/

│   ├── hybrid\_agent.py     \# GraphRAG \+ Vector Fallback logic

│   ├── db\_postgres.py      \# Relational queries

│   ├── db\_neo4j.py         \# Cypher queries

├── core/

│   ├── prompt\_templates.py \# System prompts for character voice

├── Dockerfile         

└── requirements.txt

\`\`\`

**GET /api/v1/deck?user\_id={id}**

* *Logic:* Queries Postgres for 6-10 characters the user hasn't swiped on. Returns lightweight profile cards (name, work, quote, image, traits).

**POST /api/v1/interactions/swipe**

* *Logic:* Records a left/right swipe. If right, unlocks the conversation and updates the matches table.

**POST /api/v1/challenges/submit**

* *Logic:* Evaluates the 5-question character challenge. If the user scores \>= 4/5, updates status to fully unlocked and awards points.

**POST /api/v1/chat**

*   Logic: 

  * ### **Step 1: Query Ingestion (The Request)**

    The React Native app sends a POST request to `/api/v1/chat/stream`.  
    * **Payload:** Includes the `user_id`, `character_id`, and the user's `message` (e.g., *"Why do you hate Bá Kiến so much?"*).  
    * **Action:** FastAPI receives this request and keeps the HTTP connection open because it will be sending data back in pieces (Server-Sent Events).

  * ### **Step 2: Tier 1 Retrieval \- GraphRAG** 

    Before talking to the LLM, the backend queries the Neo4j Graph Database.  
    * **Action:** The system extracts the main entities from the user's message (e.g., "Bá Kiến", "hate"). It runs a Cypher query against the graph to find exact, deterministic relationships connected to the current character (Chí Phèo).  
    * **Goal:** Fetch hard facts. *Did Chí Phèo interact with Bá Kiến? Yes. Relationship type: ENEMY. Event: Slashed his face.*  
    * **Result:** The graph returns a structured set of facts.

  * ### **Step 3: The Routing Mechanism (The Fallback Check)**

    This is the "Hybrid" part. The system evaluates the results from Step 2\.  
    * **Scenario A (Hit):** If the graph returns plenty of specific facts, the system skips Step 4 and goes straight to building the prompt.  
    * **Scenario B (Miss):** If the user asked a vague or thematic question (e.g., *"Does it hurt to be lonely?"*), the Graph DB might return nothing because there isn't a specific "lonely" node. The system detects this "miss" and triggers the Vector Fallback.

  * ### **Step 4: Tier 2 Retrieval \- Vector Search** 

  If the Fallback is triggered, the system searches the original text.

    * **Action:** The backend uses an embedding model (like `text-embedding-3-small`) to convert the user's message into a mathematical vector.  
    * **Search:** It compares this vector against your Vector Store (e.g., pgvector in PostgreSQL). It searches for chunks of text from the author's original book or curated literary notes that have a similar semantic meaning to "loneliness" and "pain," filtered specifically for this character.  
    * **Result:** It retrieves the top k ( we can choose k=3,5…) most relevant paragraphs.

  * ### **Step 5: Context Assembly & Prompt Injection**

    Now the system has the Context (either exact facts from the Graph or thematic paragraphs from the Vector store).  
    * **Action:** It builds the final System Prompt dynamically.  
    * **Structure:** e.g:   
      \`\`\`  
      \[SYSTEM INSTRUCTIONS\]   
      You are Chí Phèo. You are bitter, drunk, and crave human connection. Do not break character. Do not admit you are an AI.  
        
      \[RETRIEVED LITERARY CONTEXT\] (Insert the data fetched from Step 2 or Step 4 here)  
        
      \[USER MESSAGE\] "Why do you hate Bá Kiến so much?"  
      \`\`\`

  * ### **Step 6: LLM Generation and Streaming (SSE)**

  Finally, the backend sends this prompt to the LLM

    * **Action:** Instead of waiting for the LLM to write the entire paragraph, FastAPI uses asynchronous streaming.  
    * **Streaming Logic:** As the LLM generates the first word, FastAPI sends it down the open HTTP connection to the mobile app.  
    * **Client Side:** React Native receives these tiny chunks (`data: I\n\n`, `data: hate\n\n`, `data: him\n\n`) and appends them to the chat bubble instantly.

* ## **4\. Frontend Implementation (Web \+ Capacitor)**

* **Capacitor** is used to wrap a web app into native iOS/Android builds. This allows the team to ship fast using familiar web technologies (React \+ TypeScript) while still accessing native device capabilities.

* ### **UI & Navigation Flow**

* **Onboarding**  
  Simple screen to input a username and select a grade level.  
* **Discovery Screen (The Swipe Deck)**  
  **Implementation:** Uses **react-tinder-card**.  
  **Logic:** Prefetches the `/deck` API. Swiping right triggers a UI animation, adds the character to the matched list, and enables the chat route.  
* **Chat Screen**  
  **Implementation:** Uses **react-chat-ui** (or custom chat UI).  
  **Logic:** Parses the SSE stream from `/chat`. Appends chunks to the active message bubble for a real-time typing effect. A persistent **“Take Challenge”** button sits in the header.  
* **Challenge Screen**  
  Renders the 5 questions (multiple choice, quote identification, etc.). Submitting triggers backend validation and shows a scoring modal.  
* **Leaderboard Screen**  
  Fetches and displays the top users based on accumulated points.

### **Core Framework**

| Layer | Technology | Purpose |
| ----- | ----- | ----- |
| Framework | **React** \+ TypeScript | Component UI, strong typing, fast iteration |
| Build Tool | **Vite** | Instant dev server, optimized builds |
| Native Bridge | **Capacitor** | Wraps web app into iOS/Android apps |

---

### **UI & Styling**

| Purpose | Library | Role |
| ----- | ----- | ----- |
| UI components | **Tailwind CSS** | Rapid, consistent styling |
| Component primitives | **Radix UI \-\> Shadcn** | Accessible base components |
| Icons | **Lucide** | Clean icon set |
| Animations | **Framer Motion** | Smooth swipe & chat animations |

---

### **Navigation & State**

| Purpose | Library | Role |
| ----- | ----- | ----- |
| Routing | **React Router** | Screen navigation |
| Server state | **TanStack Query** | API caching, syncing, retries |
| Global state | **Zustand** | Lightweight app state |

---

### **Key Feature Libraries**

| Feature | Library | Role |
| ----- | ----- | ----- |
| Swipe deck | **react-tinder-card** | Character swipe interaction |
| Chat UI | Custom / **react-chat-ui** | Message bubbles |
| SSE handling | Native EventSource API | Stream LLM responses in real time |
| Forms | **React Hook Form** | Challenge answers, onboarding |

---

### **Capacitor Native Plugins**

| Need | Plugin | Purpose |
| ----- | ----- | ----- |
| App container | **Capacitor iOS** / **Capacitor**  **Android** | Native builds |
| HTTP (optional) | Capacitor HTTP | Bypass CORS if needed |
| Storage | Capacitor Preferences | Persist user session |
| Splash/Status bar | Capacitor plugins | Native polish |

## **5\. Deployment and Hosting (GCP)**

GCP provides a managed, scalable setup for containerized FastAPI apps with secure networking and managed databases.

**Database Provisioning:**

1. Create a PostgreSQL instance in **Cloud SQL** and enable pgvector:  
   CREATE EXTENSION IF NOT EXISTS vector;  
* Create a free **Neo4j AuraDB** instance for the GraphRAG layer. \<------

**Backend Containerization:**

* Push the FastAPI project (with Dockerfile) to GitHub.  
* Build and store the container image in **Artifact Registry** using **Cloud Build**.

**Service Deployment:**

* Deploy the container to **Cloud Run** (supports async, SSE, auto-scaling).  
* Attach a **Serverless VPC Access** connector so Cloud Run can privately access Cloud SQL

| Purpose | GCP Service | Role in the System |
| ----- | ----- | ----- |
| Run FastAPI (Docker, SSE, auto-scale) | **Cloud Run** | Hosts the backend API as a serverless container with HTTPS and scaling |
| PostgreSQL \+ pgvector | **Cloud SQL** | Stores users, matches, challenges, and vector embeddings |
| Container image storage | **Artifact Registry** | Stores Docker images built from GitHub |
| CI/CD build from repo | **Cloud Build** | Builds and pushes the Docker image automatically |
| Private DB connectivity | **Serverless VPC Access** | Allows Cloud Run to connect privately to Cloud SQL |
| Secrets & API keys | **Secret Manager** | Stores DATABASE\_URL, NEO4J\_URI, OPENAI\_API\_KEY securely |

## **6\. Local Development & Device Testing Workflow**

To code rapidly without constantly deploying to the cloud:

1. **Run FastAPI Locally:** \* Start the server: `uvicorn main:app --reload` (Runs on `localhost:8081`).  
2. **Establish Network Tunnel:** \* Mobile devices on Wi-Fi cannot hit `localhost`. Use Ngrok to expose the port:  
   * `ngrok http 8081` \-\> Yields a secure URL like `https://xyz.ngrok.app`.  
3. **Configure Mobile App:** \* Set `API_BASE_URL = "https://xyz.ngrok.app"` in the React Native environment config.  
4. **Live Device Testing:** \* Run `npx expo start` in the frontend directory.  
   * Scan the generated QR code using the Expo Go app on an iOS/Android device. The app will hot-reload instantly whenever TS/TSX files are saved, while communicating with local Python backend.
