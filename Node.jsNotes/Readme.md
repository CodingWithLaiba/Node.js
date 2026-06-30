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
