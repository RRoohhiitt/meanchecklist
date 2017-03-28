module.exports = {
    port:8080,
    mongo:{
        db:'mongodb://localhost:27017/usersdb',
        dbname:'usersdb'
    },
//    jwt_secret: new Buffer('1a1915a3b64d179f3beb64d1', 'ascii')
    jwt_secret:'1a1915a3b64d179f3beb64d1'
}