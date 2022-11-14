// node -e "repl.start({ prompt: '> ' })"
/**
 * Composition Pattern with a interface design that fits the needs 
 * of a Extension that wants to provide lsp features.
 */

const repl = await import('node:repl');
const msg = 'Node.js via lsp extension';

// repl.start('> ').context.m = msg;
// Example return internal type from the v8 typeSystem 
// Note the documentation this uses domain so it has no 
// uncoughtErrors and you can not listen for them
// repl.start('> stream.Readable');

// Using: Map to dedupe Messages received as JSON formated Text.
// KEY::MSG_AS_JSON VALUE: CONTENT_JSON_RESULT
const lspMessagesBuffer = [];
const connections = []
const listenPath = './.node-sock'
fs.unlink(listenPath)
// TODO: Unlink before start
net.createServer((socket) => {
  socket.repl = repl.start({
    prompt: '> ',
    input: socket,
    output: socket
  }).on('exit', socket.end).context.socket = socket;
  connections.push({ socket });
}).listen(listenPath); // port numbers also supported see documentation

