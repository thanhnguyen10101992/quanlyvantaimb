var mongoose = require("mongoose");
var Xe = require("../models/xe");
var jwt = require("jsonwebtoken");
var config = require("../config");

exports.create = function(req, res, next) {
  const tx = req.body.tenxe;
  const bs = req.body.bienso;
  const tait = req.body.taitrong;
  const tt = req.body.tinhtrang;
  const idUser= req.body.idUser;

  let xe = new Xe({
    tenxe: tx,
    bienso: bs,
    taitrong: tait,
    tinhtrang: tt,
    idUser:idUser
  });

  xe.save(function(err, xe) {
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

exports.getDanhsachXE = function(req, res, next) {
  let query={
    idUser:req.body.idUser
  }
  console.log('userid',query)

  Xe.find(query)
    .exec(function(err, dsxe) {
      console.log('dsxe',dsxe)
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dsxe
        });
      }
    });
};
exports.getUpdateXE = function(req, res, next) {
  const tenxe = req.body.tenxe;
  const bienso = req.body.bienso;
  const taitrong = req.body.taitrong;
  const tinhtrang = req.body.tinhtrang;
  const xeid = req.body._id;
  console.log(req.body);
  Xe.findById(xeid).exec(function(err, dsxe) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }
    if (dsxe) {
      dsxe.tenxe = tenxe;
      dsxe.bienso = bienso;
      dsxe.taitrong = taitrong;
      dsxe.tinhtrang = tinhtrang;
    }
    dsxe.save(function(err) {
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

exports.getDeleteXE = function(req, res, next) {
  const xeid = req.body._id;
  Xe.findById(xeid)
    .remove()
    .exec(function(err) {
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

exports.getTenXe = function(req, res, next) {
  const txe = req.body.tx;
  const query = {};
  query.tenxe = { $regex: new RegExp(txe), $options: "-i" };
  Xe.find(query).exec(function(err, danhsachtxe) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachtxe
      });
    }
  });
};

exports.getDanhsachXEB = function(req, res, next) {
  const tt = "Rảnh";
  const query = {};
  query.tinhtrang = tt;
  Xe.find(query).exec(function(err, danhsachxe) {
    console.log('dsxeban',danhsachxe)
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachxe
      });
    }
  });
};
