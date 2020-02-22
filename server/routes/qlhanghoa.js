var mongoose = require("mongoose");
var HangHoa = require("../models/hanghoa");
var jwt = require("jsonwebtoken");
var config = require("../config");
var ThuChi = require("../models/thuchi");
var async = require("async");

exports.create = function(req, res, next) {
  const idcx = req.body.idcx;
  const idkh = req.body.idkh;
  const idxe = req.body.idxe;
  const tt = req.body.tinhtrang;
  const a=new Date();
  const anb=a.getTime();
  const ids = req.body.mangchuahhcon;
  const cppsc=req.body.cpps/req.body.mangchuahhcon.length;
  console.log('1231',cppsc,req.body.mangchuahhcon.length)
  async.mapSeries(ids, function(id, callback) {
    let hanghoa = new HangHoa({
      idxe:idxe,
      idcx: idcx,
      idkh: idkh,
      tenhang: id.tenhh,
      noidunghh: id.ndhh,
      ktcn: id.ktcn,
      giaphi: id.gp,
      tongtien: id.ttien,
      xebo:id.xebo,
      tinhtrang: tt,
      chieuchay:req.body.chieuchay,
      cpps:cppsc,
      mtcpps:req.body.mtcpps,
      idUser:req.body.idUser
    });
    

    hanghoa.save(function(err, hh){
      if(hh.tinhtrang==true){
        let thuchi = new ThuChi({
          idxe: idxe,
          idcx: hh.idcx,
          idkh: hh.idkh,
          idhh: hh._id,
          idtx:req.body.idtx,
          ngaytc: req.body.ntchh,
          sotien: hh.tongtien,
          xebo:hh.xebo,
          cpps:hh.cpps,
          mtcpps:req.body.mtcpps,
          loaithuchi: 'Thu',
          gchu:'Thu từ hàng hóa',
          idUser:req.body.idUser
        });
      
        thuchi.save(function(err, thuchi) {
          if (err) callback(err);
          else callback(null, hh);
        });
      } else{
        if (err) callback(err);
        else callback(null, hh);
      }
      
    })

    
    

    }, function(err, results) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      }
      
      res.status(201).json({
        success: true,
        message: "tao thanh cong"
      });
    });

  

  
};

exports.getdshanghoa = function(req, res, next) {
  let query={
    idUser:req.body.idUser
  }
  HangHoa.find(query)
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .populate("idxe")
    .exec(function(err, dshanghoa) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dshanghoa
        });
      }
    });
};

exports.dshhcongno = function(req, res, next) {
  let query={
    tinhtrang:false,
    idUser:req.body.idUser
  }
  console.log('quẻy1123',req.body)
  HangHoa.find(query)
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .populate("idxe")
    .exec(function(err, dshanghoa) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: dshanghoa
        });
      }
    });
};
exports.getUpdateHH = function(req, res, next) {
  const idcxe = req.body.idcx;
  const idkhach = req.body.idkh;
  const thang = req.body.tenhang;
  const ndhang = req.body.noidunghh;
  const kt = req.body.ktcn;
  const gphi = req.body.giaphi;
  const ttien = req.body.tongtien;
  const xebo = req.body.xebo;
  const tt = req.body.tinhtrang;
  const hhid = req.body._id;
  const idxe=req.body.idxe;
  const idUser=req.body.idUser;

  // console.log(req.body);
  HangHoa.findById(hhid).exec(function(err, dshh) {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }

    let isDoiTT = false;
    if (dshh) {
      dshh.idcx = idcxe;
      dshh.idkh = idkhach;
      dshh.tenhang = thang;
      dshh.noidunghh = ndhang;
      dshh.ktcn = kt;
      dshh.giaphi = gphi;
      dshh.xebo = xebo;
      dshh.tongtien = ttien;
      dshh.cpps=req.body.cpps;
      dshh.mtcpps=req.body.mtcpps;
      dshh.idUser=idUser;
      if (dshh.tinhtrang!= tt) {
        dshh.tinhtrang= tt;
        isDoiTT = true;
      }
       
    }
    dshh.save(function(err) {
      if (err) {
        res.status(400).json({
          success: false,
          message: "Error processing request " + err
        });
      } else {
        if(isDoiTT&&tt==false){
          
         
          let query = {
            idhh: hhid
          };
          console.log('1')
          ThuChi.remove(query, function(err) {
            if (err) {
              res
                .status(400)
                .json({ success: false, message: "Error processing request " + err });
            } else {
              res.status(201).json({
                success: true,
                message: "updated successfully"
              });
            }
          });
          
        }else if(isDoiTT&&tt==true){
          console.log('1')
          let thuchi = new ThuChi({
            idxe: req.body.idxe,
            idcx: req.body.idcx,
            idkh: req.body.idkh,
            idhh: req.body._id,
            idtx:req.body.idtx,
            ngaytc: req.body.ntchhs,
            xebo:req.body.xebo,
            sotien: req.body.tongtien,
            cpps:req.body.cpps,
            mtcpps:req.body.mtcpps,
            loaithuchi: 'Thu',
            gchu:'Thu từ hàng hóa',
            idUser:idUser
          });
        
          thuchi.save(function(err, thuchi) {
            if (err) {
              res
                .status(400)
                .json({ success: false, message: "Error processing request " + err });
            } else {
              res.status(201).json({
                success: true,
                message: "updated successfully"
              });
            }
          });
        } else  if(tt==true){
          console.log('3' ,hhid)
          let query={
            idhh:hhid
          } 
          ThuChi.findOne(query).exec((err,dstc)=>{
            
            if (dstc) {
              dstc.idcx = req.body.idcx;
              dstc.idkh = req.body.idkh;
              dstc.idtx = req.body.idtx;
              dstc.idhh = req.body._id;
              dstc.xebo = req.body.xebo;
              dstc.sotien = req.body.tongtien;
              dstc.ngaytc = req.body.ntchhs;
              dstc.cpps =req.body.cpps;
              dstc.mtcpps=req.body.mtcpps;
              // console.log(dstc.idtx)
            }
            console.log('dstc',dstc);
            console.log('req.body',req.body)

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
          })

        }
      }
      
    });
  });

  
};


exports.postmangctt = function(req, res, next) {
  const ids = req.body;
  const cppss=req.body[0].ttcpps/req.body.length;
  const idUser=req.body.idUser;
  console.log('dshhctt',ids)
  async.mapSeries(ids, function(id, callback) {
    HangHoa.findById(id._id).exec(function(err, dshh){
      if (dshh) {
        dshh.tinhtrang=true;
        dshh.cpps=id.cpps+cppss;
        dshh.mtcpps=id.mtcppsc
         
      }
      dshh.save(function(err) {
        console.log(id);
        if(dshh.tinhtrang==true){
          let thuchi = new ThuChi({
            idxe: id.idxe._id,
            idcx: id.idcx._id,
            idkh: id.idkh._id,
            idhh: id._id,
            idtx:id.idcx.idtx,
            ngaytc: id.idcx.ngayxuatphat,
            sotien: id.tongtien,
            cpps:id.cpps+cppss,
            mtcpps:id.mtcppsc,
            loaithuchi: 'Thu',
            idUser:id.idUser,
            xebo:id.xebo,
            mtcpps:id.mtcpps,
            gchu:'Thu từ hàng hóa'
          }); 
          console.log('12321',thuchi)
          thuchi.save(function(err, thuchi) {
            if (err) callback(err);
            else callback(null, thuchi);
          });
        }
        else{
          if (err) callback(err);
          else callback(null, dshh);
        }
        
        
        
      });
      
    })

  },
  function(err, results) {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "Error processing request " + err });
    }
    
    res.status(201).json({
      success: true,
      message: "update thanh cong"
    });
  });
  
};

exports.getDeleteHH = function(req, res, next) {
  const hhid = req.body._id;
  HangHoa.findById(hhid)
    .remove()
    .exec(function(err, dshh) {
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

    let query = {
      idhh: hhid
    };
  
    ThuChi.remove(query, function(err) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      }
    });  
};

exports.getTenChuyenXe = function(req, res, next) {
  const idcxe = req.body.idcx;
  const query = {};
  query.idcx = { $regex: new RegExp(idcxe), $options: "-i" };
  HangHoa.find(query)
    .populate("idcx")
    .populate("idkh")
    .exec(function(err, danhsachcx) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: danhsachcx
        });
      }
    });
};

exports.timchieuchay = function(req, res, next) {
  const chieuchay = req.body.chieuchay;
  const query = {};
  query.chieuchay = chieuchay
  HangHoa.find(query)
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .exec(function(err, dshh) {
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

exports.getTenKhach = function(req, res, next) {
  const idkhach = req.body.idkh;
  const query = {};
  query.idkh = { $regex: new RegExp(idkhach), $options: "-i" };
  HangHoa.find(query)
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .exec(function(err, danhsachkh) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: danhsachkh
        });
      }
    });
};

exports.getTenKhachCTT = function(req, res, next) {
  const idkhach = req.body.idkh;
  const tinhtrang = "false";
  HangHoa.find({
    tinhtrang: tinhtrang,
    idkh: idkhach
  })
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .exec(function(err, danhsachkh) {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "Error processing request " + err });
      } else {
        res.status(201).json({
          success: true,
          data: danhsachkh
        });
      }
    });
};

exports.gethhcxtn = function(req, res, next) {
  const idcx = req.body.idcx;
  console.log('idcx',idcx)
  HangHoa.find({
    idcx: idcx
  })
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .exec(function(err, dshh) {
      console.log('dshh',dshh)
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

exports.getdskhcn = function(req, res, next) {
  const idkh = req.body.idkh;
  console.log('idcx',idkh)
  HangHoa.find({
    idkh: idkh,
    tinhtrang:false
  })
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .populate("idxe")
    .exec(function(err, dshh) {
      console.log('dshh',dshh)
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
exports.getidmcxcn = function(req, res, next) {
  let query={

  }
  const idUser=req.body.idUser;
  const idcx = req.body.idcx;
  const idkh = req.body.idkh;
  const idxe = req.body.idxe;
  console.log('idcx',idcx)
  if(idUser){
    query.idUser=idUser;
    query.tinhtrang=false;
  }

  if(idcx){
    query.idcx=idcx;
    query.tinhtrang=false;
  }
  if(idxe){
    query.idxe=idxe;
    query.tinhtrang=false;
  }
  if(idkh){
    query.idkh=idkh;
    query.tinhtrang=false
  }
  HangHoa.find(query)
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
    .populate("idxe")
    .exec(function(err, dshh) {
      console.log('dshh',dshh)
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

exports.getDSidobject = function(req, res, next) {
  let query = {};
  console.log(req.body);
  let idchxe = req.body.idchxe;
  let idkhachh = req.body.idkhachh;
  let chieuchay = req.body.chieuchay;
  if (idchxe) {
    query.idcx = idchxe;
  }
  if (idkhachh) {
    query.idkh = idkhachh;
  }
  if (chieuchay) {
    query.chieuchay = chieuchay;
  }
  console.log("query", query);
  HangHoa.find(query)
    .populate("idcx")
    .sort( { "createdAt": -1 } )
    .populate("idkh")
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
