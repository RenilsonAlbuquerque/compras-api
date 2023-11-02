"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var DatabaseConnection = /** @class */ (function () {
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    function DatabaseConnection() {
        this.initializePool();
        //this.connect();
    }
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    DatabaseConnection.getInstance = function () {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            //Object.freeze(DatabaseConnection.instance)
        }
        return DatabaseConnection.instance;
    };
    DatabaseConnection.prototype.initializePool = function () {
        var mysql = require('mysql2');
        this.pool = mysql.createPool({
            host: 'us-cdbr-east-03.cleardb.com',
            user: 'bd152fa79e96f6',
            password: 'e4c3a51f5959e49',
            database: 'heroku_4347727c70c08ae',
            waitForConnections: true,
            connectionLimit: 200,
            queueLimit: 0,
            setTimeout: 3000
        });
    };
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
    DatabaseConnection.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mysql, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mysql = require("mysql2/promise");
                        return [4 /*yield*/, mysql.createConnection(DatabaseConnection.herokuConnectionString)];
                    case 1:
                        connection = _a.sent();
                        console.log("Conectou no MySQL!");
                        this.connection = connection;
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseConnection.prototype.getConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.pool.promise()];
            });
        });
    };
    // public async getConnection(){
    //     if(!this.connection){
    //         await this.connect();
    //     }
    //     return this.connection;
    // }
    DatabaseConnection.prototype.getPool = function () {
        return this.pool;
    };
    DatabaseConnection.localhostConnectionString = "mysql://root:W3@r30n3@localhost:3306/comprasdb";
    DatabaseConnection.herokuConnectionString = "mysql://bd152fa79e96f6:e4c3a51f5959e49@us-cdbr-east-03.cleardb.com/heroku_4347727c70c08ae?reconnect=true";
    return DatabaseConnection;
}());
exports.DatabaseConnection = DatabaseConnection;
