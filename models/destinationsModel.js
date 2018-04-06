let conn= require ('.././connections/mysqlconnection');

let destinations= {};

destinations.getAllDestinations = (cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('SELECT * FROM destinos',function (err,destinos) {
        if (err) return cb(err);
        console.log(destinos);
        return cb(err,destinos);
    })
};

destinations.createDestination = (destino,cb) =>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('INSERT INTO destinos SET ?',destino,function (err,res) {
        if (err) return cb(err);
        return cb(err,res);
    })
};

destinations.deleteDestination = (id,cb) =>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('DELETE FROM destinos WHERE id=?',id,function (err,res) {
        if (err) return cb(err);
        return cb(err, res);
    })
}

module.exports= destinations;