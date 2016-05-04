MySSE
========

Event-Source-driven middleware for event/message pushing from server to browser

Keeps request stream open forever, pads responce for IE, flushes if compression middleware is used, and appends a unique id's for all messages (not to deliver them twice, which can happen in some ocasions).

Usage
========

```javascript
app.get('/events', sse, function(req, res) {
  res.sse('data: im from the server');
```
