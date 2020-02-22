var mongoose = require("mongoose");
var ThuChi = require("../models/thuchi");
var jwt = require("jsonwebtoken");
var config = require("../config");

exports.create = function(req, res, next) {
  let thuchi = new ThuChi({
    idUser:req.body.idUser,
    idxe: req.body.idxe,
    idcx: req.body.idcx,
    idkh: req.body.idkh,
    idhh: req.body.idhh,
    idtx: req.body.idtx,
    ngaytc: req.body.ngaytc,
    sotien: req.body.sotien,
    loaithuchi: req.body.loaithuchi,
    gchu: req.body.gchu
  });

  thuchi.save(function(err, chuyenxe) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }
    res.status(201).json({
      success: true,
      message: "tao thanh cong"
    });
  });
};

exports.getDSTC = function(req, res, next) {
  let query={
    idUser:req.body.idUser
  }
  ThuChi.find(query)
    .populate({ path: "idcx" })
    .sort( { "createdAt": -1 } )
    .populate("idxe")
    .populate("idkh")
    .populate("idtx")
    .populate("idhh")
    .exec(function(err, dsthuchi) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dsthuchi
        });
      }
    });
};

exports.getUpdateTC = function(req, res, next) {
  let _id = mongoose.Types.ObjectId(req.body.id);
  ThuChi.findById(_id).exec(function(err, dstc) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }

    if (dstc) {
      dstc.idcx = req.body.idcx;
      dstc.idkh = req.body.idkh;
      dstc.idtx = req.body.idtx;
      dstc.idhh = req.body.idhh;
      dstc.sotien = req.body.sotien;
      dstc.ngaytc = req.body.ngaytc;
      dstc.loaithuchi = req.body.loaithuchi;
      dstc.gchu = req.body.gchu;
    }
    dstc.save(function(err) {
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

exports.deleTC = function(req, res, next) {
  let _id = mongoose.Types.ObjectId(req.body.id);
  let query = {
    _id: _id
  };

  ThuChi.remove(query, function(err) {
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

exports.timdsTC = function(req, res, next) {
  let query = {};
  console.log(req.body);
  let idcx = req.body.idcx;
  let idkh = req.body.idkh;
  let idtx = req.body.idtx;
  let ngaytc = req.body.ngaytc;
  let idUser=req.body.idUser

  if(idUser){
    query.idUser=idUser;
  }
  if (idcx) {
    query.idcx = idcx;
  }

  if (idkh) {
    query.idkh = idkh;
  }

  if (idtx) {
    query.idtx = idtx;
  }

  if (ngaytc) {
    query.ngaytc = { $gte: ngaytc, $lte: ngaytc + 86399999 };
  }
  console.log("query", query);
  ThuChi.find(query)
    .populate({ path: "idcx" })
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .populate("idxe")
    .populate("idtx")
    .populate("idhh")
    .exec(function(err, dshh) {
      console.log(dshh);
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dshh
        });
      }
    });
};

exports.timdsBCTC = function(req, res, next) {
  let query = {};
  console.log(req.body);
  let idcx = req.body.idcx;
  let idkh = req.body.idkh;
  let ngaytc = req.body.ngaytc;
  let loaitc = req.body.ltc;
  let idtx = req.body.idtx;
  let nbdtim = req.body.nbdtim;
  let nkttim = req.body.nkttim;
  let idxe = req.body.idxe;
  let idUser=req.body.idUser;
  if(idUser){
    query.idUser = idUser;
  }
  if (idcx) {
    query.idcx = idcx;
  }
  if(idxe){
    query.idxe = idxe;
  }
  if(idtx){
    query.idtx=idtx
  }

  if (idkh) {
    query.idkh = idkh;
  }
  if (loaitc) {
    query.loaithuchi = loaitc;
  }
  if (nbdtim || nkttim) {
    query.ngaytc = { $gte: nbdtim, $lte: nkttim};
  }
  console.log("query", query);
  ThuChi.find(query)
    .populate({ path: "idcx" })
    .populate("idxe")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .populate("idhh")
    .populate("idtx")
    .exec(function(err, dshh) {
      console.log(dshh);
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dshh
        });
      }
    });
};

exports.timdsBCTCTK = function(req, res, next) {
  let query={

  }
  if(req.body.nbd ||req.body.nbd){
    query={
      ngaytc:{$gte: req.body.nbd, $lte: req.body.nkt}
    }
  }
  
  
  console.log(req.body);
  
  
  console.log("query", query);
  ThuChi.find(query)
    .populate({ path: "idcx" })
    .populate("idxe")
    .populate("idkh")
    .populate("idhh")
    .populate("idtx")
    .exec(function(err, dstc) {
      console.log(dstc);
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dstc
        });
      }
    });
  
};