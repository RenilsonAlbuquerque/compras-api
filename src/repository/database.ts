export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private static localhostConnectionString:String = "mysql://root:W3@r30n3@localhost:3306/comprasdb";
    private static herokuConnectionString:String ="mysql://bd152fa79e96f6:e4c3a51f5959e49@us-cdbr-east-03.cleardb.com/heroku_4347727c70c08ae?reconnect=true";
    private connection: any;
    private pool:any; 
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
        this.initializePool(); 
        //this.connect();
    }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            //Object.freeze(DatabaseConnection.instance)
        }
        return DatabaseConnection.instance;
    }
    public initializePool(){
        const mysql = require('mysql2');
        this.pool = mysql.createPool({
            host     : 'us-cdbr-east-03.cleardb.com',
            user     : 'bd152fa79e96f6',
            password : 'e4c3a51f5959e49',
            database : 'heroku_4347727c70c08ae',
            waitForConnections: true,
            connectionLimit: 200,
            queueLimit: 0,
            setTimeout: 3000
          });
    }
    // public initializePool(){
    //     const mysql = require('mysql2');
    //     this.pool = mysql.createPool({
    //         host     : 'localhost',
    //         user     : 'root',
    //         password : 'W3@r30n3',
    //         database : 'comprasdb',
    //         waitForConnections: true,
    //         connectionLimit: 200,
    //         queueLimit: 0,
    //         setTimeout: 3000
    //       });
    // }
    public async connect(){
        const mysql = require("mysql2/promise");
        const connection = await mysql.createConnection(DatabaseConnection.herokuConnectionString);
        console.log("Conectou no MySQL!");
        this.connection = connection;
    }

    public async getConnection(){
        return this.pool.promise();
        
    }
    
    // public async getConnection(){
    //     if(!this.connection){
    //         await this.connect();
    //     }
    //     return this.connection;
    // }
    public getPool(){
        return this.pool;
    }
  
}