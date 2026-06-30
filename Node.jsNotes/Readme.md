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

| Misconception | Reality |
|---|---|
| Node.js is a programming language |  Wrong — JavaScript is the language |
| Node.js is a framework | Wrong — it's a runtime environment |
| Node.js runs inside a browser | Wrong — it runs on the server |

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

| Use Case | Example |
|---|---|
| REST APIs | Backend for a React/Vue frontend (like MERN CRM) |
| Real-time apps | Chat apps, live notifications |
| Streaming | Video/audio streaming servers |
| Command line tools | npm, git tools built with Node |
| Microservices | Breaking large apps into small services |

---

## Node.js vs Browser JavaScript — Key Differences

| Feature | Browser JS | Node.js |
|---|---|---|
| Runs in | Browser | Server / Terminal |
| Can access DOM | Yes |  No (no browser, no DOM) |
| Can read/write files | No |  Yes (using `fs` module) |
| Can access HTTP | Limited |  Full control |
| Global object | `window` | `global` |
| Module system | ES Modules (`import`) | CommonJS (`require`) or ES Modules |

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
 
| Term | One-liner |
|---|---|
| **Main Thread** | The single thread running your JS, one line at a time |
| **Call Stack** | Where current code executes, top to bottom |
| **Synchronous** | Waits for each line to finish before next runs |
| **Asynchronous** | Starts task, moves on immediately, comes back later |
| **Blocking** | Main thread frozen until task finishes (bad) |
| **Non-Blocking** | Main thread free while slow task runs elsewhere (good) |
| **libuv** | C++ library, runs slow tasks in background threads |
| **Thread Pool** | 4 background threads (default) doing the slow work |
| **Callback Queue** | Finished async tasks wait here for their turn |
| **Event Loop** | Loop that checks: stack empty? → push next callback |
 
---
 
## The ONE Rule to Remember
 
> **Event Loop NEVER runs a callback while Call Stack still has code running — no matter how small the delay (even `setTimeout(fn, 0)`).**
 
---
 
##  Code Proof
 
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
