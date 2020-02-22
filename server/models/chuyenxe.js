const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ChuyenxeSchema = new Schema({
  idUser: {type:String},
  mcx: { type: String },
  idxe: { type: String, ref: "xe" },
  idtx: { type: String, ref: "taixe" },
  idtx2: { type: String, ref: "taixe" },
  ngayxuatphat: { type: Number },
  chieuchay: { type: String },
  tinhtrang: { type: String },
  createdAt: { type: Date, default: Date.now },
});

ChuyenxeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("chuyenxe", ChuyenxeSchema, "chuyenxe");
