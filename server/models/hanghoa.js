const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const HanghoaSchema = new Schema({
  idcx: { type: String, ref: "chuyenxe" },
  idkh: { type: String, ref: "khachhang" },
  idxe: { type: String, ref: "xe"},
  tenhang: { type: String },
  idUser:{ type: String},
  noidunghh: { type: String },
  ktcn: { type: Number },
  giaphi: { type: Number },
  tongtien: { type: Number },
  tinhtrang: { type: Boolean },
  xebo: {type: Number},
  chieuchay: {type:String},
  cpps:{type:Number},
  createdAt: { type: Date, default: Date.now },
  mtcpps:{type:String}
});

HanghoaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("hanghoa", HanghoaSchema, "hanghoa");
