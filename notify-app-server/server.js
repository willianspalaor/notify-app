const http = require('http');
const server = http.createServer();
const cors = require('cors');

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true
	}
});

io.on('connection', (socket) => {
  	socket.on('notify', (data) => {
		io.emit('newMessage', data);
 	});
});

server.listen(3002, () => {
	console.log('listening on *:3002');
});
