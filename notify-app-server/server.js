const http = require('http');
const server = http.createServer();
const cors = require('cors');
const connectedUsers = {}; // Objeto para armazenar os sockets conectados

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true
	}
});

io.on('connection', (socket) => {
  
  	// Verifica se já existe um socket com o mesmo id da query
	if (socket.handshake.query.id && connectedUsers[socket.handshake.query.id]) {

		// Atualiza as informações do socket existente
		let existingSocket = connectedUsers[socket.handshake.query.id];
		existingSocket.socketId = socket.id;
		existingSocket.userId = socket.handshake.query.userId;

	} else {

		// Adiciona o novo socket ao objeto connectedUsers
		connectedUsers[socket.handshake.query.id] = {
 			socketId: socket.id,
	 		userId: socket.handshake.query.userId
		};
	}

  	socket.on('notify', (data) => {

  		let id = data['id'];

  		if(connectedUsers[id]){
  			let targetSocket = io.sockets.sockets.get(connectedUsers[id].socketId);
  			io.to(targetSocket.id).emit('newMessage', data);

  			console.log("emitted new message");
  		}
 	});
});

server.listen(3002, () => {
	console.log('listening on *:3002');
});
