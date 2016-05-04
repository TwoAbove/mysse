module.exports = function sse(req, res, next) {

  req.socket.setKeepAlive(true);
  req.socket.setTimeout(0);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.status(200);

  res.sse = function sse(data) {

    res.write('id: ' + Date.now() + '\n');
    res.write('data: ' + JSON.stringify(data) + '\n\n');

    if (data.match(/\n\n$/) && res.flushHeaders) {
      res.flushHeaders();
    }
  };

  res.write(':' + Array(2049).join(' ') + '\n');
  res.sse('retry: 2000\n\n');

  let keepAlive = setInterval(function() {
    res.sse(':keep-alive\n\n');
  }, 19999);

  res.on('close', function close() {
    clearInterval(keepAlive);
  });
  next();
};
