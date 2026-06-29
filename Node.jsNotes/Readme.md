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
| Node.js is a programming language | ❌ Wrong — JavaScript is the language |
| Node.js is a framework | ❌ Wrong — it's a runtime environment |
| Node.js runs inside a browser | ❌ Wrong — it runs on the server |

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
| Can access DOM | ✅ Yes | ❌ No (no browser, no DOM) |
| Can read/write files | ❌ No | ✅ Yes (using `fs` module) |
| Can access HTTP | Limited | ✅ Full control |
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