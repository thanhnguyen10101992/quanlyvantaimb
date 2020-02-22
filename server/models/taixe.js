const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TaixeSchema = new Schema({
  tentaixe: { type: String },
  diachi: { type: String },
  ngaysinh: { type: Number },
  dienthoai: { type: Number },
  cmnd: { type: Number },
  tinhtrang: { type: String }
});

TaixeSchema;
module.exports = mongoose.model("taixe", TaixeSchema, "taixe");
