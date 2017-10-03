exports = module.exports = function(io) {

    let connected_users = [];

    io.on('connection', function(socket) {


        socket.on('disconnect', (reason) => {
            var i = connected_users.indexOf(socket.user);
            if(i >= 0) {
                socket.broadcast.emit('userDisconnected', socket.user);
                connected_users.splice(i, 1);
            }
        });

        socket.on('userDisconnection', function() {
            var i = connected_users.indexOf(socket.user);
            if(i >= 0) {
                socket.broadcast.emit('userDisconnected', socket.user);
                connected_users.splice(i, 1);
            }
        });

        socket.on('userConnection', function(user) {
            socket.user = user;
            connected_users.push(user);
            socket.emit('connectedUsers', connected_users);
            socket.broadcast.emit('connectedUsers', connected_users);
        });

        // socket.on('joinRoom', function(room) {
        //     if(room && room.cuid) {
        //         socket.join(room.cuid);
        //     }
        // });
        //
        // socket.on('unJoinRoom', function(room) {
        //     if(room && room.cuid) {
        //         socket.leave(room.cuid)
        //     }
        // });


    });
}
