export let dataBaseConnectionInstance = null;

export async function getSingletonConnection(){
    console.log("Ovahia")
    if(!dataBaseConnectionInstance){
        await connect();
    }
    return dataBaseConnectionInstance;
}


async function connect(){
    try{
        const mysql = require("mysql2/promise");
        const connection = await mysql.createConnection("mysql://root:W3@r30n3@localhost:3306/comprasdb");
        console.log("Conectou no MySQL!");
        //console.log(connection._connection)
        dataBaseConnectionInstance = connection;
    }catch(e){
        console.error(e)
    }
    
}

Object.freeze(getSingletonConnection());