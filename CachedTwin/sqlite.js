const sqlite3 = require('sqlite3').verbose();

const dbname = 'chainpm.db';
// 创建并连接一个数据库
const db = new sqlite3.Database(dbname)

// create a table
db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS blockchain_wch
        (id integer primary key,title,content TEXT)
    `;
    // create one table if it is not exist
    db.run(sql);
});

// Records API
class Records {

    static all(cb) {

        db.all('SELECT * FROM blockchain_wch', cb);
    }

    static findById(id, cb) {
        db.get('SELECT * FROM blockchain_wch WHERE id = ?', id,cb);
    }


    static findByDate(Date, cb) {
        db.all('SELECT * FROM blockchain_wch WHERE timestamp = ?', Date,cb);
    }


    static findByUserID(userID, cb) {
        db.all('SELECT * FROM blockchain_wch WHERE userID = ?', userID,cb);
    }


    static findByUUID(UUID, cb) {
        db.all('SELECT * FROM blockchain_wch WHERE UUID = ?', UUID,cb);
    }


    static findByTaskID(taskID, cb) {
        db.all('SELECT * FROM blockchain_wch WHERE taskID = ?', taskID,cb);
    }
    static findLatest(cb) {
        db.get('select last_insert_rowid();', cb);
    }
    // create record
    static create(data, cb) {
        
        const sql = `
                INSERT INTO 
                blockchain_wch(TranID,UUID,UserID,TaskID,ipAddr,Date) 
                VALUES(?,?,?,?,?,?) 
                ;select last_insert_rowid();`;
        db.run(sql, data.TranID, data.UUID,data.UserID,data.TaskID,data.ipAddr,data.Date,cb);
    }
    // Query and update record
    static updateTranID(data, cb) {
        const sql = `
            UPDATE blockchain_wch
            SET tranID=?
            WHERE id=?
        `
        db.run(sql, data.TranID, data.id, cb)
    }

    // Update
    static update(data, cb) {
        const sql = `
            UPDATE blockchain_wch
            SET TranNum=?,TranID=?,UUID=?,UserID=?,TaskID=?,InspectionValue=?,Result=?,Date=?
            WHERE id=?
        `
        db.run(sql, data.TranNum, data.TranID, data.UUID,data.UserID,data.TaskID,data.InspectionValue,data.Result,data.Date, data.id, cb)
    }

}
module.exports.Records = Records;
