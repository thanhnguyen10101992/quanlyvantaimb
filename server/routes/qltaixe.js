var mongoose = require("mongoose");
var TaiXe = require("../models/taixe");
var jwt = require("jsonwebtoken");
var config = require("../config");

exports.create = function(req, res, next) {
  const ttx = req.body.tentxe;
  const dc = req.body.diachi;
  const ns = req.body.ngaysinh;
  const dt = req.body.dienthoai;
  const cmnd = req.body.cmnd;
  const tt = req.body.tinhtrang;

  let taixe = new TaiXe({
    tentaixe: ttx,
    diachi: dc,
    ngaysinh: ns,
    dienthoai: dt,
    cmnd: cmnd,
    tinhtrang: tt
  });

  taixe.save(function(err, taixe) {
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

exports.getDanhsachTXE = function(req, res, next) {
  TaiXe.find()
    .skip(req.body.skip)
    .exec(function(err, dstxe) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dstxe
        });
      }
    });
};
exports.getUpdateTXE = function(req, res, next) {
  const tentaixe = req.body.tentxe;
  const diachi = req.body.dc;
  const ngaysinh = req.body.ns;
  const dienthoai = req.body.sdt;
  const cmnd = req.body.cmnd;
  const tinhtrang = req.body.tinhtrang;
  const txeid = req.body._id;
  TaiXe.findById(txeid).exec(function(err, dstxe) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }
    if (dstxe) {
      dstxe.tentaixe = tentaixe;
      dstxe.diachi = diachi;
      dstxe.ngaysinh = ngaysinh;
      dstxe.dienthoai = dienthoai;
      dstxe.cmnd = cmnd;
      dstxe.tinhtrang = tinhtrang;
    }
    dstxe.save(function(err) {
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

exports.getDeleteTXE = function(req, res, next) {
  const txeid = req.body._id;
  TaiXe.findById(txeid)
    .remove()
    .exec(function(err, dstxe) {
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

exports.getTenTaiXe = function(req, res, next) {
  const ttaixe = req.body.ttx;
  const query = {};
  query.tentaixe = { $regex: new RegExp(ttaixe), $options: "-i" };
  TaiXe.find(query).exec(function(err, danhsachttxe) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachttxe
      });
    }
  });
};

exports.getDanhsachTXEB = function(req, res, next) {
  const tt = "Rảnh";
  const query = {};
  query.tinhtrang = tt;
  TaiXe.find(query).exec(function(err, danhsachttxe) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachttxe
      });
    }
  });
};
