const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const XeSchema = new Schema({
  idUser:{ type: String},
  tenxe: { type: String },
  bienso: { type: String },
  taitrong: { type: String },
  tinhtrang: { type: String }
});

XeSchema;
module.exports = mongoose.model("xe", XeSchema, "xe");
