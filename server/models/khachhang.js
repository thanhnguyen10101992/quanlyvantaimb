const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const KhachhangSchema = new Schema({
  tenkh: { type: String },
  diachi: { type: String },
  dienthoai: { type: String },
  ghichu: { type: String }
});

KhachhangSchema;
module.exports = mongoose.model("khachhang", KhachhangSchema, "khachhang");
