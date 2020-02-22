import { Component, OnInit, Injector } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "../user/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "../common/toastr.service";
import { XeService } from "../xe/xe.service";
import { TaixeService } from "../taixe/taixe.service";
import { ChuyenXeService } from "../chuyenxe/chuyenxe.service";
import { KhachHangService } from "../khachhang/khachhang.service";
import { HanghoaService } from "../hanghoa/hanghoa.service";
import { ThuchiService } from "./quanlythuchi.service";
import { Http } from "@angular/http";
import { Alert } from "selenium-webdriver";
@Component({
  selector: "app-quanlythuchi",
  templateUrl: "./quanlythuchi.component.html",
  styleUrls: ["./quanlythuchi.component.css"]
})
export class QuanlythuchiComponent implements OnInit {
  a2eOptions = { format: "DD/MM/YYYY" };
  idxe:string;
  tenxe:any;
  title: string;
  mangchuyenxe: any[];
  router: Router;
  isThemmoi: boolean;
  mangkhachhang: any[];
  tenhanghoa: string;
  tenkh: any;
  mcx: any;
  tinhtrang: string;
  tenthanghoa: string;
  ndhhoa: string;
  tongtien: number;
  cnang: string;
  idcx: string;
  idkh: string;
  tentaixe: any;
  manghanghoa: any[];
  mangtaixe: any[];
  hanghoasua: any;
  tenmcxdt: string;
  ngayxuatphat: number;
  nxptim: Date;
  nbbtc: number;
  idtx: string;
  ntctim: Date;
  tenhang: any;
  idhh: string;
  sotien: number;
  ntc: Date = new Date();
  loaithuchi: string;
  gchu: string;
  mangthuchi: any[];
  ThisObjectThuchi: any;
  objecct: any;
  mangxe:any[];
  userObj:any;

  constructor(
    private xeService: XeService,
    injector: Injector,
    private taixeService: TaixeService,
    private chuyenxeService: ChuyenXeService,
    private khachhangservice: KhachHangService,
    private hanghoaservice: HanghoaService,
    private thuchiservice: ThuchiService,
    private authService:AuthService
  ) {
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.userObj =  this.authService.currentUser;
    
    
    this.getchuyenxe();
    this.getKhachHang();
    this.getTaiXe();
    this.gethanghoa();
    this.getThuChi();
    this.getXe();
    this.objecct = {
      idUser:this.userObj.userid,
      idcx: "",
      idkh: "",
      idtx: "",
      ngaytc: 0
    };
  }
  xoamd(){
    this.objecct={
      idcx:'',
      idkh:'',
      idtx:'',
      ngaytc:0
    }
    this.thuchiservice.tcct(this.objecct).subscribe((data)=>{
      this.mangthuchi=data.data
    })

    this.mcx='';
    this.tenkh='';
    this.tentaixe='';
    this.ntctim=null;
  }

  getXe() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.xeService.getall(query).subscribe(data => {
      this.mangxe = data.data;
    });
  }
  getTaiXe() {
    this.taixeService.getall().subscribe(data => {
      this.mangtaixe = data.data;
    });
  }
  getchuyenxe() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.chuyenxeService.getall(query).subscribe(data => {
      this.mangchuyenxe = data.data;
      console.log(this.mangchuyenxe[0].mcx);
    });
  }
  getKhachHang() {
    this.khachhangservice.getall().subscribe(data => {
      this.mangkhachhang = data.data;
    });
  }

  gethanghoa() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.hanghoaservice.getall(query).subscribe(data => {
      this.manghanghoa = data.data;
    });
  }
  gettenxetc(event){
    if(event){
      this.idxe=event._id
    }
    console.log(event)
  }

  goToEdit(thuchi) {
    this.ThisObjectThuchi = thuchi;
    console.log('123',thuchi)
    if (thuchi) {
      this.title = "Chỉnh sữa";
      this.isThemmoi = false;
      this.tenxe = thuchi.idxe;
      this.mcx = thuchi.idcx;
      this.tenkh = thuchi.idkh;
      this.tentaixe = thuchi.idtx;
      this.tenhang = thuchi.idhh;
      this.sotien = thuchi.sotien;
      this.ntc = new Date(thuchi.ngaytc);
      this.loaithuchi = thuchi.loaithuchi;
      this.gchu = thuchi.gchu;

      for (let i in this.mangxe){
        if(this.tenxe){
          if (this.mangxe[i]._id == this.tenxe._id) {
            this.tenxe = this.mangxe[i];
            break;
          }
        }
      }
      for (var i in this.mangchuyenxe) {
        if(this.mcx){
          if (this.mangchuyenxe[i]._id == this.mcx._id) {
            this.mcx = this.mangchuyenxe[i];
            break;
          }
        }
        
      }

      for (var i in this.mangkhachhang) {
        if(this.tenkh){
          if (this.mangkhachhang[i]._id == this.tenkh._id) {
            this.tenkh = this.mangkhachhang[i];
          }
        }
        
      }

      for (var i in this.mangtaixe) {
        if(this.tentaixe){
          if (this.mangtaixe[i]._id == this.tentaixe._id) {
            this.tentaixe = this.mangtaixe[i];
          }
        }
        
      }

      for (var i in this.manghanghoa) {
        if(this.tenhang){
          if (this.manghanghoa[i]._id == this.tenhang._id) {
            this.tenhang = this.manghanghoa[i];
          }
        }
        
      }
    } else {
      this.title = "Thêm mới";
      this.isThemmoi = true;
      this.mcx = "";
      this.tenkh = "";
      this.tentaixe = "";
      this.tenhang = "";
      this.sotien = 0;
      this.loaithuchi = "";
      this.gchu = "";
    }
  }

  changemodel(event) {
    let a = new Date(this.ntctim);

    this.nbbtc = a.setHours(0, 0, 0, 0);
    this.objecct.ngaytc = this.nbbtc;
    console.log("5", this.objecct);

    this.thuchiservice.tcct(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
    });
  }
  getdlsl1(gtnd) {
    if (gtnd) {
      this.idcx = gtnd._id;
      this.objecct.idcx = this.idcx;
      this.idxe=gtnd.idxe._id
    }

    this.thuchiservice.tcct(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
    });
  }
  getdlsl2(gtnd) {
    if (gtnd) {
      (this.idkh = gtnd._id), (this.objecct.idkh = this.idkh);
    }

    this.thuchiservice.tcct(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
    });
    console.log("2", this.objecct);
  }
  getdlsl3(gtnd) {
    if (gtnd) {
      this.idtx = gtnd._id;
      this.objecct.idtx = this.idtx;
    }

    console.log("3", this.objecct);
    this.thuchiservice.tcct(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
    });
  }
  getdlsl4(gtnd) {
    if (gtnd) {
      this.idhh = gtnd._id;
    }
  }

  getThuChi() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.thuchiservice.getall(query).subscribe(data => {
      console.log('thuchi',data.data);
      this.mangthuchi = data.data;
    });
  }
  themmoi() {
    this.userObj =  this.authService.currentUser;
    
    
      
   
    let mydate = new Date(this.ntc);
    let mydatenb = mydate.getTime();
    let query = {
      idUser:this.userObj.userid,
      idxe: this.idxe,
      idcx: this.idcx,
      idkh: this.idkh,
      idtx: this.idtx,
      idhh: this.idhh,
      ngaytc: mydatenb,
      sotien: this.sotien,
      loaithuchi: this.loaithuchi,
      gchu: this.gchu
    };
    console.log("this.giatrihtt", query);
    this.thuchiservice.create(query).subscribe(data => {
      alert("Tạo Thành Công");
      this.getThuChi();
    });
    this.mcx = "";
    this.tenkh = "";
    this.tentaixe = "";
    this.tenhang = "";
    this.sotien = 0;
    this.loaithuchi = "";
    this.gchu = "";
  }

  chinhsua() {
    let mydate = new Date(this.ntc);
    let mydatenb = mydate.getTime();

    let query = {
      id: this.ThisObjectThuchi._id,
      idcx: "",
      idkh: "",
      idtx: "",
      idhh: "",
      sotien: this.sotien,
      ngaytc: mydatenb,
      loaithuchi: this.loaithuchi,
      gchu: this.gchu
    };
    console.log("this.idcx", this.idcx, this.idkh);
    if (!this.idcx && this.ThisObjectThuchi.idcx) {
      query.idcx = this.ThisObjectThuchi.idcx._id;
    } else {
      query.idcx = this.idcx;
    }

    if (!this.idkh && this.ThisObjectThuchi.idkh) {
      query.idkh = this.ThisObjectThuchi.idkh._id;
    } else {
      query.idkh = this.idkh;
    }

    if (!this.idtx && this.ThisObjectThuchi.idtx)  {
      query.idtx = this.ThisObjectThuchi.idtx._id;
    } else {
      query.idtx = this.idtx;
    }

    if (!this.idhh && this.ThisObjectThuchi.idhh) {
      query.idhh = this.ThisObjectThuchi.idhh._id;
    } else {
      query.idhh = this.idhh;
    }

    console.log("12312", query);
    this.thuchiservice.updatetc(query).subscribe(data => {
      alert("Cập nhật thành công");
      this.getThuChi();
    });
  }

  Xoa(tc,i) {
    let query = {
      id: tc._id
    };
    let r = confirm("Bạn Chắc Chắn Muốn Xóa");
    if (r == true) {
      this.thuchiservice.deleteTC(query).subscribe(data => {
        alert("Xóa Thành Công");
        this.mangthuchi.splice(i,1);
      });
    }
  }

  getdlslall(td) {
    console.log(td);
    let query = {};
    console.log("timdc", query);
  }
}
