const Primus = require("primus")

let go = (server) => {
    let primus = new Primus(server, {/* options */});
    primus.on('connection', (spark) => {

        spark.on('data', (data) => {
            primus.write(data);
        });
    })
}

module.exports.go = go;