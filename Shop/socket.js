let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer)
        return io;
    },
    getIO: () => {
        if(!io) console.log('Socket.io is not initialized!')
        else return io;
    }
}