var mongoose = require("mongoose");
var KhachHang = require("../models/khachhang");
var jwt = require("jsonwebtoken");
var config = require("../config");

exports.create = function(req, res, next) {
  let khachhang = new KhachHang({
    tenkh: req.body.tenkh,
    diachi: req.body.dc,
    dienthoai: req.body.sdt,
    ghichu: req.body.gchu
  });

  khachhang.save(function(err, khachhang) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }
    res.status(201).json({
      success: true,
      message: "Tạo Thành Công"
    });
  });
};

exports.getDSKH = function(req, res, next) {
  KhachHang.find().exec(function(err, dskh) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: dskh
      });
    }
  });
};

exports.getUpdateKH = function(req, res, next) {
  let _id = mongoose.Types.ObjectId(req.body.id);
  KhachHang.findById(_id).exec(function(err, dskh) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }
    console.log("dskh", dskh);
    if (dskh) {
      dskh.tenkh = req.body.tenkh;
      dskh.diachi = req.body.diachi;
      dskh.dienthoai = req.body.dienthoai;
      dskh.ghichu = req.body.ghichu;
    }
    dskh.save(function(err) {
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

exports.deleKH = function(req, res, next) {
  let _id = mongoose.Types.ObjectId(req.body.id);
  let query = {
    _id: _id
  };

  KhachHang.remove(query, function(err) {
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
exports.getmangkhcn = function(req, res, next) {
  const tenkhach = req.body.tenkh;
  const query = {};
  query.tenkh = { $regex: new RegExp(tenkhach), $options: "-i" };
  KhachHang.find(query).exec(function(err, danhsachhhkh) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachhhkh
      });
    }
  });
};
exports.getdanhsachHHKH = function(req, res, next) {
  const tenkhach = req.body.tenkh;
  const query = {};
  query.tenkh = { $regex: new RegExp(tenkhach), $options: "-i" };
  KhachHang.find(query).exec(function(err, danhsachhhkh) {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    } else {
      res.status(201).json({
        success: true,
        data: danhsachhhkh
      });
    }
  });
};
