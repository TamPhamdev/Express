const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync('db.json');
const db = low(adapter);
// tạo db mặc định rỗng
db.defaults({
    users: [],
    sessions: []
  })
  .write()

module.exports = db;