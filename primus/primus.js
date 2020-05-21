const Primus = require("primus")

let go = (server) => {
    let primus = new Primus(server, {/* options */});
    primus.on('connection', (spark) => {
        console.log('🔥');
    })
}

module.exports.go = go;