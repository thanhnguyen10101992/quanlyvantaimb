const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ThuChiSchema = new Schema({
  idcx: { type: String, ref: "chuyenxe" },
  idkh: { type: String, ref: "khachhang" },
  idhh: { type: String, ref: "hanghoa"},
  idtx: { type: String, ref: "taixe" },
  idxe: { type: String, ref: "xe"},
  idUser:{type: String},
  sotien: { type: Number },
  ngaytc: { type: Number },
  xebo: { type:Number},
  loaithuchi: { type: String },
  createdAt: { type: Date, default: Date.now },
  gchu: { type: String },
  cpps:{type:Number},
  mtcpps:{type:String}
});

ThuChiSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("thuchi", ThuChiSchema, "thuchi");
