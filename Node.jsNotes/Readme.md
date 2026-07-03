## What is Node.js?

Node.js is a **JavaScript runtime environment** that allows you to run JavaScript **outside the browser** — on the server side.

> Simple Definition: Before Node.js, JavaScript could only run inside a browser. Node.js broke that limitation — now JavaScript can run on a server, read files, connect to databases, and build backend APIs.

---

## Why Was Node.js Created?

- Before Node.js → Frontend = JavaScript, Backend = PHP / Java / Python
- Problem: Developers had to learn two different languages
- **Ryan Dahl created Node.js in 2009** to solve this — so JavaScript could work on both frontend AND backend
- This gave birth to full-stack JavaScript (MERN stack)

---

## Node.js is NOT a Framework or Language

This is a common misconception:

| Misconception                     | Reality                            |
| --------------------------------- | ---------------------------------- |
| Node.js is a programming language | Wrong — JavaScript is the language |
| Node.js is a framework            | Wrong — it's a runtime environment |
| Node.js runs inside a browser     | Wrong — it runs on the server      |

Node.js is a **runtime** that lets JavaScript run on the server using Chrome's V8 engine.

---

## What is a Runtime Environment?

Think of it like this:

- A **language** is English
- A **runtime** is the mouth that speaks it
- Without a runtime, code is just text — nothing executes

Browser = runtime for frontend JavaScript  
Node.js = runtime for backend JavaScript

---

## Where is Node.js Used?

| Use Case           | Example                                          |
| ------------------ | ------------------------------------------------ |
| REST APIs          | Backend for a React/Vue frontend (like MERN CRM) |
| Real-time apps     | Chat apps, live notifications                    |
| Streaming          | Video/audio streaming servers                    |
| Command line tools | npm, git tools built with Node                   |
| Microservices      | Breaking large apps into small services          |

---

## Node.js vs Browser JavaScript — Key Differences

| Feature              | Browser JS            | Node.js                            |
| -------------------- | --------------------- | ---------------------------------- |
| Runs in              | Browser               | Server / Terminal                  |
| Can access DOM       | Yes                   | No (no browser, no DOM)            |
| Can read/write files | No                    | Yes (using `fs` module)            |
| Can access HTTP      | Limited               | Full control                       |
| Global object        | `window`              | `global`                           |
| Module system        | ES Modules (`import`) | CommonJS (`require`) or ES Modules |

---

## How to Check if Node.js is Installed

```bash
node --version    # check Node version e.g. v18.0.0
npm --version     # check NPM version
```

## How to Run a Node.js File

```bash
node filename.js
```

Example:

```javascript
// hello.js
console.log("Hello from Node.js!");
```

```bash
node hello.js
# Output: Hello from Node.js!
```

# Sync vs Async | Blocking vs Non-Blocking | Event Loop

---

## The Flow (memorize this picture)

```
JS Code → Call Stack (Main Thread, 1 worker)
              ↓ (slow task? hand it off)
        Node APIs → libuv Thread Pool (4 background workers)
              ↓ (task done)
        Callback Queue (waits in line)
              ↓
        Event Loop ("Is Call Stack empty? Push next callback")
              ↓
        Back to Call Stack → runs → done
```

---

## Quick Definitions

| Term               | One-liner                                              |
| ------------------ | ------------------------------------------------------ |
| **Main Thread**    | The single thread running your JS, one line at a time  |
| **Call Stack**     | Where current code executes, top to bottom             |
| **Synchronous**    | Waits for each line to finish before next runs         |
| **Asynchronous**   | Starts task, moves on immediately, comes back later    |
| **Blocking**       | Main thread frozen until task finishes (bad)           |
| **Non-Blocking**   | Main thread free while slow task runs elsewhere (good) |
| **libuv**          | C++ library, runs slow tasks in background threads     |
| **Thread Pool**    | 4 background threads (default) doing the slow work     |
| **Callback Queue** | Finished async tasks wait here for their turn          |
| **Event Loop**     | Loop that checks: stack empty? → push next callback    |

---

## The ONE Rule to Remember

> **Event Loop NEVER runs a callback while Call Stack still has code running — no matter how small the delay (even `setTimeout(fn, 0)`).**

---

## Code Proof

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");

// Output: 1, 3, 2
// "2" always waits, even with 0ms delay
```

```javascript
console.log("Start");
setTimeout(() => console.log("Done"), 5000);
console.log("End");

// Output: Start → End → Done
// Doesn't wait 5 sec before moving to "End"
```

---

## The Waiter Analogy

- **Blocking** = 1 waiter stands at your table until your food is cooked (others wait)
- **Non-Blocking** = 1 waiter takes your order, serves other tables, comes back when food's ready

---

> "Node.js runs JS on a single main thread. For slow tasks like file reads or DB queries, it hands them to libuv's background thread pool instead of blocking. When done, the callback goes to the callback queue. The Event Loop checks if the call stack is empty, then pushes the next callback to run. This lets Node handle thousands of requests with just one main thread."

---

# 04 — HTTP Methods

---

## What is an HTTP Method?

An HTTP method tells the server **what action** the client wants to perform on a resource. The URL says _what_ resource, the method says _what to do_ with it.

---

## The 5 Main HTTP Methods

### GET

Used to **read/fetch** data from the server. Does not modify anything.

```
GET /customers       → fetch all customers
GET /customers/5     → fetch customer with id 5
```

### POST

Used to **create** a new resource on the server.

```
POST /customers
Body: { "name": "Ali", "email": "ali@email.com" }
→ creates a new customer
```

### PUT

Used to **update** a resource by **replacing it entirely**. All fields must be sent — any field left out gets overwritten/removed.

```
PUT /customers/5
Body: { "name": "Ali Khan", "email": "ali@email.com", "phone": "0300..." }
→ replaces the ENTIRE customer record with this data
```

### PATCH

Used to **update** a resource **partially**. Only the fields sent are changed; everything else stays as it was.

```
PATCH /customers/5
Body: { "phone": "0300..." }
→ only updates the phone number, nothing else changes
```

### DELETE

Used to **remove** a resource from the server.

```
DELETE /customers/5
→ deletes customer with id 5
```

---

## PUT vs PATCH — Key Difference

|                | PUT                   | PATCH                 |
| -------------- | --------------------- | --------------------- |
| Updates        | Entire resource       | Only specified fields |
| Missing fields | Get wiped/overwritten | Stay untouched        |
| Use case       | Full replace          | Small/partial update  |

---

## HTTP Status Codes (sent back in the response)

| Code | Meaning               | Typically used with           |
| ---- | --------------------- | ----------------------------- |
| 200  | OK                    | Successful GET, PUT, PATCH    |
| 201  | Created               | Successful POST               |
| 204  | No Content            | Successful DELETE             |
| 400  | Bad Request           | Invalid data from client      |
| 401  | Unauthorized          | User not logged in            |
| 403  | Forbidden             | Logged in but not allowed     |
| 404  | Not Found             | Resource/route doesn't exist  |
| 500  | Internal Server Error | Something broke on the server |

---

## REST Pattern — Same URL, Different Method = Different Action

```
GET    /customers       → get all customers
GET    /customers/5     → get one customer
POST   /customers       → create a customer
PUT    /customers/5     → replace a customer
PATCH  /customers/5     → partially update a customer
DELETE /customers/5     → delete a customer
```

This pattern — same endpoint, different method for different actions — is the foundation of REST APIs.

---

# 05 — REST API

---

## What is an API?

API stands for **Application Programming Interface**. It's a way for two systems (e.g. a frontend and a backend, or two different applications) to communicate with each other by sending requests and receiving responses.

---

## What is REST?

REST stands for **Representational State Transfer**. It's a set of rules/conventions for designing APIs in a clean, predictable, and organized way.

An API that follows these rules is called a **RESTful API**.

---

## Core Principles of REST

### 1. Resource-Based URLs

Everything is treated as a "resource" (a noun), and the URL represents that resource — not an action.

```
✅ Good:  /customers
❌ Bad:   /getAllCustomers
```

The **action** (get, create, update, delete) is decided by the HTTP method, not the URL itself.

### 2. Use HTTP Methods Correctly

```
GET    /customers      → read
POST   /customers      → create
PUT    /customers/5    → replace
PATCH  /customers/5    → partial update
DELETE /customers/5    → delete
```

### 3. Stateless

Each request must contain all the information the server needs to understand it. The server does **not** remember anything about previous requests — every request is treated independently.

### 4. Client-Server Separation

The frontend (client) and backend (server) are independent of each other. The frontend doesn't need to know how the backend works internally, it just needs to know the API's request/response format.

### 5. Data Format — Usually JSON

REST APIs typically send and receive data as **JSON** (JavaScript Object Notation), since it's lightweight and easy to parse.

```json
{
  "id": 1,
  "name": "Ali Khan",
  "email": "ali@email.com"
}
```

---

## Example REST API Structure (Customers Resource)

```
GET    /api/customers         → get all customers
GET    /api/customers/:id     → get a single customer
POST   /api/customers         → create a new customer
PUT    /api/customers/:id     → replace a customer entirely
PATCH  /api/customers/:id     → update part of a customer
DELETE /api/customers/:id     → delete a customer
```

This is called **CRUD** — Create, Read, Update, Delete — the 4 basic operations almost every resource needs.

---

## Anatomy of a REST API Request/Response

**Request:**

```
Method: POST
URL: /api/customers
Headers: { "Content-Type": "application/json" }
Body: { "name": "Ali", "email": "ali@email.com" }
```

**Response:**

```
Status Code: 201 Created
Body: { "id": 5, "name": "Ali", "email": "ali@email.com" }
```

---

## Why REST is Popular

- Simple and predictable — anyone reading the URL + method understands what it does
- Works with standard HTTP — no special protocol needed
- Stateless — easy to scale across multiple servers
- Language-independent — frontend in React, backend in Node, mobile app in Flutter — all can talk to the same REST API

---
# — Status Codes & Headers


## Status Codes

A status code is a **3-digit number** sent back in every HTTP response. It tells the client what happened with their request.

### 2xx — Success
| Code | Meaning | When to use |
|---|---|---|
| 200 | OK | Successful GET, PATCH, PUT |
| 201 | Created | Successful POST (new resource created) |
| 204 | No Content | Successful DELETE (nothing to return) |

### 3xx — Redirection
| Code | Meaning | When to use |
|---|---|---|
| 301 | Moved Permanently | URL changed forever |
| 302 | Found | Temporary redirect |

### 4xx — Client Errors (user/request did something wrong)
| Code | Meaning | When to use |
|---|---|---|
| 400 | Bad Request | Invalid or missing data in request |
| 401 | Unauthorized | User not logged in |
| 403 | Forbidden | Logged in but not allowed |
| 404 | Not Found | Resource or route doesn't exist |
| 409 | Conflict | Duplicate data (e.g. email already exists) |
| 422 | Unprocessable | Validation failed |

### 5xx — Server Errors (something broke on the backend)
| Code | Meaning | When to use |
|---|---|---|
| 500 | Internal Server Error | Unexpected server crash |
| 503 | Service Unavailable | Server is down or overloaded |

### How to send status code in Express:
```javascript
res.status(404).json({ message: "User not found" });
res.status(201).json({ status: "success" });
res.status(500).json({ status: "error" });
```

---

## Headers

Headers are **key-value pairs** sent with every HTTP request and response. They carry extra information about the request or response — like what format the data is in, who is sending it, or authentication tokens.

### Request Headers (client → server)
| Header | Purpose |
|---|---|
| `Content-Type` | Format of the data being sent |
| `Authorization` | Token/credentials for authentication |
| `Accept` | Format the client wants back |

### Response Headers (server → client)
| Header | Purpose |
|---|---|
| `Content-Type` | Format of the data being returned |
| `Content-Length` | Size of the response body |

### Common Content-Type Values
| Value | Meaning |
|---|---|
| `application/json` | JSON data |
| `text/html` | HTML page |
| `multipart/form-data` | File uploads |
| `application/x-www-form-urlencoded` | HTML form data |

### How to set headers in Express:
```javascript
// Set a single header
res.setHeader("Content-Type", "application/json");

// Express shortcut — res.json() sets Content-Type automatically
res.json({ message: "Hello" });

// Set custom header
res.setHeader("X-Custom-Header", "MyValue");
```

### How to read request headers in Express:
```javascript
const contentType = req.headers["content-type"];
const token = req.headers["authorization"];
```
---
# 08 — Authentication | Stateful vs Stateless
---

## What is Authentication?

Authentication is the process of **verifying who a user is**.

- User sends credentials (email + password)
- Server checks if they are correct
- If correct → user is allowed in
- If wrong → access denied

> Authentication = "Who are you?"
> Authorization = "What are you allowed to do?" 

---

## Two Ways to Handle Authentication

---

## 1. Stateful Authentication (Session-Based)

The server **remembers** the user after login by storing their session.

### How it works:
```
1. User logs in with email + password
2. Server verifies credentials
3. Server creates a SESSION and stores it (in memory or database)
4. Server sends back a SESSION ID to the client (stored in a cookie)
5. On every next request, client sends that cookie
6. Server looks up the session ID → finds the user → allows access
```

### Diagram:
```
Client                        Server
  |                              |
  |--- POST /login ------------->|
  |    { email, password }       |
  |                              | creates session, stores in DB
  |<-- Set-Cookie: sessionId=abc-|
  |                              |
  |--- GET /dashboard ---------->|
  |    Cookie: sessionId=abc     |
  |                              | looks up sessionId in DB → found
  |<-- 200 OK (dashboard data) --|
```

### Key Points:
- Server stores session → server has to **remember** the user
- Session stored in server memory or database
- Cookie carries only the session ID (not the actual user data)
- If server restarts → sessions can be lost
- Hard to scale — if you have multiple servers, they need to share session storage

---

## 2. Stateless Authentication (Token-Based / JWT)

The server **does not remember** anything. Instead, it gives the user a **token** that contains all the user's information. The user sends this token with every request.

### How it works:
```
1. User logs in with email + password
2. Server verifies credentials
3. Server creates a TOKEN (JWT) containing user info, signs it, sends it back
4. Client stores token (in localStorage or memory)
5. On every next request, client sends the token in the Authorization header
6. Server verifies the token signature → no DB lookup needed → allows access
```

### Diagram:
```
Client                        Server
  |                              |
  |--- POST /login ------------->|
  |    { email, password }       |
  |                              | creates JWT token, does NOT store it
  |<-- { token: "eyJ..." } ------|
  |                              |
  |--- GET /dashboard ---------->|
  |    Authorization: Bearer eyJ |
  |                              | verifies token signature → valid
  |<-- 200 OK (dashboard data) --|
```

### Key Points:
- Server stores NOTHING → completely stateless
- All user info is inside the token itself
- Token is signed (not encrypted) — server can verify it without DB lookup
- If token is stolen → attacker has access until token expires
- Easy to scale — any server can verify the token (no shared storage needed)

---

## What is JWT?

JWT = **JSON Web Token**

A JWT has 3 parts separated by dots:
```
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.abc123signature
      HEADER              PAYLOAD        SIGNATURE
```

| Part | Contains |
|---|---|
| Header | Algorithm used to sign the token |
| Payload | User data (id, email, role) — NOT secret, just encoded |
| Signature | Proof the token hasn't been tampered with |

### Creating a JWT (example):
```javascript
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: user.id, email: user.email },  // payload
  "mySecretKey",                        // secret key
  { expiresIn: "1d" }                  // expires in 1 day
);
```

### Verifying a JWT:
```javascript
const decoded = jwt.verify(token, "mySecretKey");
console.log(decoded); // { id: 1, email: "ali@email.com" }
```

---

## Stateful vs Stateless — Side by Side

| | Stateful (Session) | Stateless (JWT) |
|---|---|---|
| Server stores data? | ✅ Yes (session in DB) | ❌ No |
| What client stores | Session ID (cookie) | Token (localStorage) |
| Logout mechanism | Delete session from DB | Token just expires |
| Scaling | Hard (shared session needed) | Easy (any server can verify) |
| Performance | Slower (DB lookup every request) | Faster (no DB lookup) |
| Used in | Traditional web apps | REST APIs, MERN apps |

---

## Which One Does MERN Use?

**MERN uses Stateless (JWT)** — because:
- React frontend and Node backend are separate
- Cookies are harder to manage across different origins
- JWT works perfectly with REST APIs
- Stateless = easy to scale

---
# 09 — Cookies
> 📺 Master NodeJS by Piyush Garg

---

## What is a Cookie?

A cookie is a **small piece of data** that the server sends to the browser, and the browser **automatically stores it and sends it back** with every request to that server.

> Think of a cookie like a stamp on your hand at an event — the server stamps you once, and you show that stamp every time you enter.

---

## Why Are Cookies Used?

HTTP is stateless — it doesn't remember who you are between requests. Cookies solve this by storing small pieces of information on the client side that get sent automatically with every request.

Common uses:
- Keeping users logged in (session ID)
- Remembering user preferences
- Tracking (analytics)

---

## How Cookies Work — Step by Step

```
1. Client sends a request (e.g. login)
2. Server verifies and creates a cookie
3. Server sends response with: Set-Cookie: token=abc123
4. Browser stores the cookie automatically
5. On EVERY next request to that server, browser sends: Cookie: token=abc123
6. Server reads the cookie and identifies the user
```

### Diagram:
```
Client                          Server
  |                                |
  |--- POST /login --------------->|
  |                                | sets cookie
  |<-- Set-Cookie: token=abc123 ---|
  |    (browser stores it)         |
  |                                |
  |--- GET /dashboard ------------>|
  |    Cookie: token=abc123        | reads cookie → identifies user
  |<-- 200 OK ---------------------|
```

---

## Setting Up Cookies in Express

### Install cookie-parser:
```bash
npm install cookie-parser
```

### Setup:
```javascript
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser()); // middleware to read cookies
```

---

## Setting a Cookie (Server → Client)

```javascript
app.post("/login", (req, res) => {
  // after verifying user...
  res.cookie("token", "abc123", {
    httpOnly: true,   // cannot be accessed by JavaScript in browser
    secure: true,     // only sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000, // expires in 1 day (in milliseconds)
  });
  return res.json({ status: "success", message: "Logged in" });
});
```

---

## Reading a Cookie (on next request)

```javascript
app.get("/dashboard", (req, res) => {
  const token = req.cookies.token; // read cookie by name
  console.log(token); // "abc123"

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }
  return res.json({ message: "Welcome to dashboard" });
});
```

---

## Deleting a Cookie (Logout)

```javascript
app.post("/logout", (req, res) => {
  res.clearCookie("token"); // removes the cookie
  return res.json({ status: "success", message: "Logged out" });
});
```

---

## Cookie Options Explained

| Option | Meaning |
|---|---|
| `httpOnly: true` | Cookie cannot be read by JavaScript in browser — protects from XSS attacks |
| `secure: true` | Cookie only sent over HTTPS — never over HTTP |
| `maxAge` | How long cookie lives in milliseconds |
| `expires` | Exact date/time cookie expires |
| `sameSite` | Controls if cookie is sent with cross-site requests |
| `signed: true` | Cookie is signed — server can verify it wasn't tampered with |

---

## Signed Cookies — Extra Security

A signed cookie has a signature attached, so if someone tries to modify it, the server detects it.

```javascript
// setup — pass a secret key to cookieParser
app.use(cookieParser("mySecretKey"));

// set a signed cookie
res.cookie("token", "abc123", { signed: true });

// read a signed cookie
const token = req.signedCookies.token; // note: signedCookies not cookies
```

---

## Cookie vs localStorage vs sessionStorage

| | Cookie | localStorage | sessionStorage |
|---|---|---|---|
| Sent with requests? | ✅ Automatically | ❌ Manual | ❌ Manual |
| Accessible in JS? | Only if httpOnly is false | ✅ Yes | ✅ Yes |
| Expires | Set by server | Never (manual clear) | When tab closes |
| Size limit | ~4KB | ~5MB | ~5MB |
| Used for | Auth sessions | JWT tokens | Temporary data |

---

## Cookie vs JWT — When to Use Which

| | Cookie | JWT in Header |
|---|---|---|
| Storage | Browser (automatic) | localStorage (manual) |
| Sent automatically? | ✅ Yes | ❌ Must add to header manually |
| Works cross-origin? | Needs configuration | ✅ Easy |
| CSRF risk? | ✅ Yes (needs protection) | ❌ No |
| XSS risk? | Low (httpOnly) | Higher (in localStorage) |
| Best for | Traditional web apps | REST APIs / MERN |

---

## Full Example — Login, Read, Logout

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// LOGIN — set cookie
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // assume credentials are correct...
  res.cookie("userId", "123", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  return res.json({ message: "Logged in successfully" });
});

// PROTECTED ROUTE — read cookie
app.get("/profile", (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ message: "Please login first" });
  }
  return res.json({ message: `Welcome user ${userId}` });
});

// LOGOUT — clear cookie
app.post("/logout", (req, res) => {
  res.clearCookie("userId");
  return res.json({ message: "Logged out successfully" });
});

app.listen(5000, () => console.log("Server running"));
```
---
# 10 — Authorization
> 📺 Master NodeJS by Piyush Garg

---

## Authentication vs Authorization — The Core Difference

These two words are often confused. They are completely different things.

```
Authentication = WHO are you?     (proving your identity — login)
Authorization  = WHAT can you do? (checking your permissions — access control)
```

### Real Life Analogy:
```
You go to a hospital:

Authentication → Show your ID card at the front desk
                 "Yes, you are Ali Khan" ✅

Authorization  → Ali Khan is a patient, not a doctor
                 "You can see your own records, but NOT other patients records"
                 "You CANNOT enter the surgery room" ❌
```

### In a CRM Example:
```
Authentication → You log in with email + password
                 Server confirms: "Yes, this is Laiba" ✅

Authorization  → Laiba has role: "sales_agent"
                 ✅ Can view customer list
                 ✅ Can create new deals
                 ❌ Cannot delete users
                 ❌ Cannot access admin dashboard
```

---

## Simple Breakdown

| | Authentication | Authorization |
|---|---|---|
| Question | Who are you? | What can you do? |
| When | At login | After login, on every request |
| Uses | Email + password, JWT | Roles, permissions |
| Fails with | 401 Unauthorized | 403 Forbidden |
| Example | Login with correct password | Admin-only route access |

> 401 = "I don't know who you are — please login"
> 403 = "I know who you are — but you're not allowed here"

---

## How Authorization Works in Node.js

Authorization is usually handled using **Middleware** — a function that runs before the route handler and checks if the user has permission.

## The Flow Visualized

```
Request comes in
      ↓
authenticate() middleware
      ↓
Is token valid?
  NO  → 401 Unauthorized (not logged in)
  YES → attach user to req.user → continue
      ↓
authorize("admin") middleware
      ↓
Is role correct?
  NO  → 403 Forbidden (logged in but not allowed)
  YES → continue to route handler
      ↓
Route handler runs → sends response
```

---
