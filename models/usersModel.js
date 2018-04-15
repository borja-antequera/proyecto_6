let conn= require ('.././connections/mysqlconnection');
let hash= require('bcrypt-nodejs');
let Users= {};

Users.signUp = (usuario,cb)=>{
    let comprobacion = [1,2,3];
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query("SELECT * FROM cliente WHERE nombre=?",usuario.nombre,function (err1,res1) {
        if (err1) return cb(err1);
        if (res1 != ''){
            return cb(null,comprobacion[0]);
        } else {
            conn.query('SELECT * FROM cliente where email=?',usuario.email,function (err2,res2) {
                if (err2) return cb(err2);
                if (res2 != '' ){
                    return cb(null,comprobacion[1]);
                }else {
                    conn.query('INSERT INTO cliente SET ?',usuario,function (err3,res3) {
                        if(err3) return cb(err3);
                        return cb(null,comprobacion[2]);
                    })
                }
            })
        }
    })
};

Users.login = (usuario,cb)=>{
    let comprobacion = [1,2,3];
    if (!conn) return cb("No se ha podido crear la conexion")
    conn.query('SELECT * FROM cliente WHERE email=?',[usuario.email],function (err,rows) {
        if (err) return cb(error);
        if (rows == ''){
            return cb(null,comprobacion[0]);
        } else {
            hash.compare(usuario.password, rows[0].hash, function(err, coincide) {
                console.log(coincide);
                if (!coincide){
                    return cb(null,comprobacion[1]);
                }else{
                    return cb(null,comprobacion[2],rows[0]);
                }
            });
        }
    })
};


    Users.getAllUsers = (cb)=>{
        if (!conn) return cb("No se ha podido crear la conexion");
        conn.query('SELECT * FROM cliente',function (err,users) {
            if (err) return cb(err);
            return cb(err,users);
        })
    };

    Users.darPermisos = (id,cb)=>{
        if (!conn) return cb("No se ha podido crear la conexion");
        conn.query('SELECT * FROM cliente WHERE id=?',id, function (err, resultado) {
            if (err) return cb(err);
            else{
                let admin =resultado[0].isAdmin;
                if(admin==1)
                    admin=0;
                else
                    admin=1;
                conn.query('UPDATE cliente set isAdmin='+admin+' WHERE id=?',id, function (err, resultado) {
                    if(error)
                        return cb(error);
                    return cb(null, resultado);
                })
            }
        })
    }

Users.activar = (id,cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('SELECT * FROM cliente WHERE id=?',id, function (err, resultado) {
        if (err) return cb(err);
        else{
            let activo =resultado[0].active;
            if(activo==1)
                activo=0;
            else
                activo=1;
            conn.query('UPDATE cliente set active='+activo+' WHERE id=?',id, function (err, resultado) {
                if(error)
                    return cb(error);
                return cb(null, resultado);
            })
        }
    })
}
Users.deleteUser = (id, cb)=>{
        if (!conn)
            return cb("No se ha podido crear la conexión");
        conn.query('DELETE FROM cliente WHERE id=?', id, function(err, res){
            if(err) return cb(err);
            return cb(err,res);
        })
}

Users.checkEmail = (email, cb)=>{
        if (!conn)
            return cb("No se ha podido crear la conexión");
        conn.query('SELECT * FROM cliente WHERE email=?', email, function (err, res) {
            if(err) return cb(err);
            return cb(null, res);
        })
}
Users.checkHash = (hash, cb)=>{
        if(!conn)
            return cb("No se ha podido crear la conexión");
        conn.query('SELECT * FROM cliente WHERE hash=?', hash, function (err, res) {
            return cb(null, res);
        })
}

module.exports = Users;


