var mongoose = require("mongoose");
var ChuyenXe = require("../models/chuyenxe");
var TaiXe = require("../models/taixe");
var Xe = require("../models/xe");
var jwt = require("jsonwebtoken");
var config = require("../config");

exports.create = function(req, res, next) {
  let chuyenxe = new ChuyenXe({
    mcx: req.body.mcx,
    idtx: req.body.idtx,
    idtx2: req.body.idtx2,
    idxe: req.body.idxe,
    ngayxuatphat: req.body.ngayxuatphat,
    chieuchay: req.body.chieuchay,
    tinhtrang: req.body.tinhtrang,
    idUser: req.body.idUser,
  });
  
  let query={
    idUser:req.body.idUser
  }

  ChuyenXe.find(query)
    .exec(function(err, dschuyenxe) {
      let isTrung = false;
      for(var i in dschuyenxe){
        if(dschuyenxe[i].ngayxuatphat==req.body.ngayxuatphat && req.body.idxe==dschuyenxe[i].idxe) {
          isTrung = true;
          break;
        }
      }
      if(isTrung){
        res.status(201).json({
          success:false,
          message:"Không thể  tạo vì trùng ngày xuất phát"
        })
      }else{
        chuyenxe.save(function(err, chuyenxe) {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "Error processing request " + err });
          } else{
            res.status(201).json({
              success: true,
              message: "Tạo Chuyến Xe Thành Công"
            });
          }
          
        });
      }
      
    });
  
};

exports.getdschuyenxe = function(req, res, next) {
  let query={
    idUser:req.body.idUser
  }
  console.log('query2131',query)
  ChuyenXe.find(query)
    .populate("idxe")
    .populate("idtx")
    .populate("idtx2")
    .sort( { "createdAt": -1 } )
    .exec(function(err, dschuyenxe) {
      console.log('dschuyenxe',dschuyenxe)
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dschuyenxe
        });
      }
    });
};

exports.getUpdateCX = function(req, res, next) {
  let _id = mongoose.Types.ObjectId(req.body.id);
  console.log(req.body);
  ChuyenXe.findById(_id).exec(function(err, dscx) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }

    if (dscx) {
      dscx.mcx = req.body.mcx;
      dscx.idxe = req.body.idxe;
      dscx.idtx = req.body.idtx;
      dscx.idtx2= req.body.idtx2;
      dscx.ngayxuatphat = req.body.ngayxuatphat;
      dscx.chieuchay = req.body.chieuchay;
      dscx.tinhtrang = req.body.tinhtrang;
    }
    dscx.save(function(err) {
      if (err) {
        res.status(400).json({
          success: false,
          message: "Error processing request " + err
        });
      }
      res.status(201).json({
        success: true,
        message: "updated successfully"
      });
    });
  });
};
exports.DeleteCX = function(req, res, next) {
  const cxid = req.body._id;
  console.log('cxid',cxid)
  ChuyenXe.findById(cxid)
    .remove()
    .exec(function(err, dscxe) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      }
      res.status(201).json({
        success: true,
        message: "xóa thành công"
      });
    });
};

exports.timcxtt = function(req, res, next) {
  let query = {};
  let idtx = req.body.idtx;
  let nbd = req.body.nnb;
  if(req.body.idUser){
    query.idUser=req.body.idUser
  }
  if (idtx) {
    query.idtx = idtx;
  }
  if (nbd) {
    query.ngayxuatphat = { $gte: nbd, $lte: nbd + 86399999 };
  }
  console.log('okk chay o dy')
  ChuyenXe.find(query)
    .sort( { "createdAt": -1 } )
    .populate("idxe")
    .populate("idtx")
    .populate("idtx2")
    .exec(function(err, dscx) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dscx
        });
      }
    });
};

exports.getdanhsachHHCX = function(req, res, next) {
  const tencxe = req.body.tencx;
  const query = {};
  query.mcx = { $regex: new RegExp(tencxe), $options: "-i" };
  ChuyenXe.find(query).exec(function(err, danhsachhhcx) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachhhcx
      });
    }
  });
};

exports.getmcxcn = function(req, res, next) {
  const tencxe = req.body.mcx;
  const query = {};
  query.idUser=req.body.idUser;
  query.mcx = { $regex: new RegExp(tencxe), $options: "-i" };
  
  ChuyenXe.find(query).exec(function(err, danhsachhhcx) {
   
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachhhcx
      });
    }
  });
};

exports.getdanhsachNXP = function(req, res, next) {
  const ngayxp = req.body.nxp;
  const query = {};
  if (ngayxp) {
    query.ngayxuatphat = { $gte: ngayxp, $lte: ngayxp + 86399999 };
  }
  ChuyenXe.find(query).exec(function(err, danhsachnxp) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachnxp
      });
    }
  });
};
