import { Component, OnInit, Injector, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'; 
import { AuthService } from "../user/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "../common/toastr.service";
import { HanghoaService } from "./hanghoa.service";
import { KhachHangService } from "../khachhang/khachhang.service";
import { ChuyenXeService } from "../chuyenxe/chuyenxe.service";
import { ThuchiService } from '../quanlythuchi/quanlythuchi.service'
import { Http } from "@angular/http";
 

@Component({
  selector: "app-hanghoa",
  templateUrl: "./hanghoa.component.html",
  styleUrls: ["./hanghoa.component.css"]
})
export class HanghoaComponent implements OnInit {
  a2eOptions = { format: "DD/MM/YYYY" };
  ishowsuacxhh:boolean;
  idxe:string;
  title: string;
  ishowminus:boolean;
  mangchuaiphh:any=[];
  cpps:number;
  mtcpps:string;
  tongtiendtt:number;
  tongtienctt:number;
  tongtienttct:number;
  ntchhs:number
  tenkhtim:string;
  chieuchay:string;
  manghanghoa: any[];
  mangchuyenxe: any[];
  mangkhachhang: any[];
  mangcx: any[];
  mangkh: any[];
  mangxp: any[];
  router: Router;
  cxe: string;
  tenkh: string;
  tenhh: string;
  ndhh: string;
  ktcn: number;
  gp: number;
  ttien: number;
  thanhtoan: any;
  route: ActivatedRoute;
  isThemmoi: boolean;
  nxp: Date;
  idcxe: string;
  idkhack: string;
  tencx: string;
  currentChinhSuaHH: any;
  idcx: string;
  selectedtest: string;
  selectedtestid: string;
  tcx: any;
  idtx:string;
  ntchh:number;
  object: any;
  idkh: string;
  tenkhmd:string;
  mangchuatimdc:any[];
  chieuchaytim:string;
  ishowaddhh:boolean;
  userObj:any;
  constructor(
    private hanghoaService: HanghoaService,
    private khachhangService: KhachHangService,
    private chuyenxeService: ChuyenXeService,
    private thuchiservice :ThuchiService,
    private authService:AuthService,
    injector: Injector
  ) {
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.ishowsuacxhh=true;
    this.ishowminus=false;
    this.manghanghoa = [];
    this.mangkhachhang = [];
    this.mangchuyenxe = [];
    this.mangchuaiphh=[{
      tenhh:'',
      ndhh:'',
      ktcn:0,
      gp:0,
      ttien:0,
      xebo:0

    }];
    this.mangcx = [];
    this.mangkh = [];
    this.mangxp = [];
    this.tcx = {};
    this.getKhachHang();
    this.getchuyenxe();
    this.gethanghoa();
    this.object = {
      idchxe: "",
      idkhachh: "",
      chieuchay: ""
    };
  }
  @ViewChild('contenthh') content:ElementRef;
  public inhoadonhh(){
    var data = document.getElementById('contenthh'); 
     
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    }); 
  }

  timchieuchay(event){
    this.tongtiendtt=0;
    this.tongtienctt=0;
    this.tongtienttct=0;
    console.log('123',this.chieuchaytim);
    this.object.chieuchay=this.chieuchaytim
    
    this.hanghoaService.postidobject(this.object).subscribe(data => {
      console.log(data.data);
      this.manghanghoa = data.data;
      for(let i in this.manghanghoa){
        if(this.manghanghoa[i].tinhtrang==true){
          this.tongtiendtt=this.tongtiendtt+this.manghanghoa[i].tongtien
        }
        if(this.manghanghoa[i].tinhtrang==false){
          this.tongtienctt=this.tongtienctt+this.manghanghoa[i].tongtien
        }
        this.tongtienttct=this.tongtienttct+this.manghanghoa[i].tongtien
      }
    });
  }

  gethanghoa() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.tongtiendtt=0;
    this.tongtienctt=0;
    this.tongtienttct=0;
    this.hanghoaService.getall(query).subscribe((data) => {
      this.manghanghoa = data.data;
      for(let i in this.manghanghoa){
        if(this.manghanghoa[i].tinhtrang==true){
          this.tongtiendtt=this.tongtiendtt+this.manghanghoa[i].tongtien
        }
        if(this.manghanghoa[i].tinhtrang==false){
          this.tongtienctt=this.tongtienctt+this.manghanghoa[i].tongtien
        }
        this.tongtienttct=this.tongtienttct+this.manghanghoa[i].tongtien
      }
    });
  }

  getKhachHang() {
    this.khachhangService.getall().subscribe(data => {
      this.mangkhachhang = data.data;
    });
  }

  getchuyenxe() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.chuyenxeService.getall(query).subscribe(data => {
      this.mangchuyenxe = data.data;
      console.log('mangchuyenxe',this.mangchuyenxe)
    });
  }



  selectHHCX(hhcx) {
    this.tongtiendtt=0;
    this.tongtienctt=0;
    this.tongtienttct=0;
    this.tencx = hhcx.mcx;
    if (hhcx) {
      this.idcx = hhcx._id;
      this.object.idchxe = this.idcx;
    }
    console.log("hhcx", this.object);
    this.hanghoaService.postidobject(this.object).subscribe(data => {
      console.log(data.data);
      this.manghanghoa = data.data;
      for(let i in this.manghanghoa){
        if(this.manghanghoa[i].tinhtrang==true){
          this.tongtiendtt=this.tongtiendtt+this.manghanghoa[i].tongtien
        }
        if(this.manghanghoa[i].tinhtrang==false){
          this.tongtienctt=this.tongtienctt+this.manghanghoa[i].tongtien
        }
        this.tongtienttct=this.tongtienttct+this.manghanghoa[i].tongtien
      }
    });
  }

  selectHHKH(hhkh) {
    this.tenkh = hhkh.tenkh;
    if (hhkh) {
      this.idkh = hhkh._id;
      this.object.idkhachh = this.idkh;
    }
    console.log("hhkh", this.object);
    
  }
  selectHHKHT(hhkh) {
    this.tongtiendtt=0;
    this.tongtienctt=0;
    this.tongtienttct=0;
    this.tenkhtim = hhkh.tenkh;
    if (hhkh) {
      this.idkh = hhkh._id;
      this.object.idkhachh = this.idkh;
    }
    console.log("hhkh", this.object);
    this.hanghoaService.postidobject(this.object).subscribe(data => {
      console.log(data.data);
      this.manghanghoa = data.data;
      for(let i in this.manghanghoa){
        if(this.manghanghoa[i].tinhtrang==true){
          this.tongtiendtt=this.tongtiendtt+this.manghanghoa[i].tongtien
        }
        if(this.manghanghoa[i].tinhtrang==false){
          this.tongtienctt=this.tongtienctt+this.manghanghoa[i].tongtien
        }
        this.tongtienttct=this.tongtienttct+this.manghanghoa[i].tongtien
      }
    });
  }

  gettencx(event) {
    this.tongtiendtt=0;
    this.tongtienctt=0;
    this.tongtienttct=0;
    let tencxe = {
      tencx: event.target.value
    };
    this.chuyenxeService.posttencx(tencxe).subscribe(data => {
      console.log("mangcx", data.data);
      this.mangcx = data.data;
      for(let i in this.manghanghoa){
        if(this.manghanghoa[i].tinhtrang==true){
          this.tongtiendtt=this.tongtiendtt+this.manghanghoa[i].tongtien
        }
        if(this.manghanghoa[i].tinhtrang==false){
          this.tongtienctt=this.tongtienctt+this.manghanghoa[i].tongtien
        }
        this.tongtienttct=this.tongtienttct+this.manghanghoa[i].tongtien
      }
    });
  }

  laygttt(i,event){
    console.log(i)
    this.mangchuaiphh[i].ttien=this.mangchuaiphh[i].gp*this.mangchuaiphh[i].ktcn
    // console.log('1231',this.mangchuaiphh[i].gp,this.mangchuaiphh[i].ktcn)

  }

  gettenkh(event) {
    this.tongtiendtt=0;
    this.tongtienctt=0;
    this.tongtienttct=0;
    let tenkhach = {
      tenkh: event.target.value
    };
    console.log('ok123',event.target.value)
    this.khachhangService.posttenkh(tenkhach).subscribe(data => {
      this.mangkh = data.data;
      for(let i in this.manghanghoa){
        if(this.manghanghoa[i].tinhtrang==true){
          this.tongtiendtt=this.tongtiendtt+this.manghanghoa[i].tongtien
        }
        if(this.manghanghoa[i].tinhtrang==false){
          this.tongtienctt=this.tongtienctt+this.manghanghoa[i].tongtien
        }
        this.tongtienttct=this.tongtienttct+this.manghanghoa[i].tongtien
      }
    });
  }
  gettenkhtim(event) {
    this.tongtiendtt=0;
    this.tongtienctt=0;
    this.tongtienttct=0;
    let tenkhach = {
      tenkh: event.target.value
    };
    console.log('ok123',event.target.value)
    this.khachhangService.posttenkh(tenkhach).subscribe(data => {
      this.mangkh = data.data;
      for(let i in this.manghanghoa){
        if(this.manghanghoa[i].tinhtrang==true){
          this.tongtiendtt=this.tongtiendtt+this.manghanghoa[i].tongtien
        }
        if(this.manghanghoa[i].tinhtrang==false){
          this.tongtienctt=this.tongtienctt+this.manghanghoa[i].tongtien
        }
        this.tongtienttct=this.tongtienttct+this.manghanghoa[i].tongtien
      }
    });
  }

  onItemChange() {}

  themmoi() {
    this.userObj =  this.authService.currentUser;
    

    for (let i in this.mangkhachhang) {
      if (this.tenkh === this.mangkhachhang[i].tenkh) {
        this.idkhack = this.mangkhachhang[i]._id;
      }
    }
    for (let i in this.mangchuyenxe) {
      if (this.cxe === this.mangchuyenxe[i].mcx) {
        this.idxe=this.mangchuyenxe[i].idxe;
        this.idcxe = this.mangchuyenxe[i]._id;
        this.idtx=this.mangchuyenxe[i].idtx;
        this.ntchh=this.mangchuyenxe[i].ngayxuatphat
      }
    }
    let dshh = {
      idUser:this.userObj.userid,
      idxe:this.idxe,
      idcx: this.idcxe,
      idkh: this.idkhack,
      mangchuahhcon:this.mangchuaiphh,
      tinhtrang: this.thanhtoan,
      idtx:this.idtx,
      ntchh:this.ntchh,
      chieuchay:this.chieuchay,
      cpps:this.cpps,
      mtcpps:this.mtcpps
    }

   
   
    
    this.hanghoaService.create(dshh).subscribe(data => {
      alert("Thêm Hàng Thành Công");
      this.gethanghoa();
    });
    for (let i in this.mangchuaiphh){
      this.mangchuaiphh[i].tenhh='';
      this.mangchuaiphh[i].ndhh='';
      this.mangchuaiphh[i].ktcn=0;
      this.mangchuaiphh[i].gp=0;
      this.mangchuaiphh[i].ttien = 0;
      this.mangchuaiphh[i].xebo =0;
    }
    
    this.cpps=0;
    this.mtcpps='';
    
  }

  goToEdit(hh) {
    if (hh) {
      
      this.currentChinhSuaHH = hh;
      console.log('hh112',hh)
      this.mangchuaiphh=[{
        tenhh:hh.tenhang,
        ndhh:hh.noidunghh,
        ktcn:hh.ktcn,
        gp:hh.giaphi,
        ttien:hh.tongtien,
        xebo:hh.xebo

      }]
      this.title = "Chỉnh sữa";
      this.ishowsuacxhh=false;
      this.isThemmoi = false;
      this.ishowaddhh = false;
      this.idxe=hh.idcx.idxe;
      this.cxe = hh.idcx.mcx;
      this.tenkh = hh.idkh.tenkh;
      this.thanhtoan = hh.tinhtrang;
      this.ntchhs=hh.idcx.ngayxuatphat;
      this.idtx=hh.idcx.idtx
      this.chieuchay=hh.chieuchay,
      this.cpps=hh.cpps,
      this.mtcpps=hh.mtcpps
    } else {
      this.title = "Thêm mới";
      this.isThemmoi = true;
      this.ishowaddhh = true;
      this.cxe = "";
      this.tenkh = "";
      for (let i in this.mangchuaiphh){
        this.mangchuaiphh[i].tenhh='';
        this.mangchuaiphh[i].ndhh='';
        this.mangchuaiphh[i].ktcn=0;
        this.mangchuaiphh[i].gp=0;
        this.mangchuaiphh[i].xebo=0;

      }
      this.cpps=0;
      this.mtcpps='';
    }
  }

  chinhsua() {
    this.userObj =  this.authService.currentUser;
    for (let i in this.mangkhachhang) {
      if (this.tenkh === this.mangkhachhang[i].tenkh) {
        this.idkhack = this.mangkhachhang[i]._id;
      }
    }
    for (let i in this.mangchuyenxe) {
      if (this.cxe === this.mangchuyenxe[i].mcx) {
        this.idcxe = this.mangchuyenxe[i]._id;
      }
    }
    
    this.currentChinhSuaHH.idcx = this.idcxe;
    this.currentChinhSuaHH.idxe = this.idxe;
    this.currentChinhSuaHH.idkh = this.idkhack;
    this.currentChinhSuaHH.tenhang = this.mangchuaiphh[0].tenhh;
    this.currentChinhSuaHH.noidunghh = this.mangchuaiphh[0].ndhh;
    this.currentChinhSuaHH.ktcn = this.mangchuaiphh[0].ktcn;
    this.currentChinhSuaHH.giaphi = this.mangchuaiphh[0].gp;
    this.currentChinhSuaHH.xebo = this.mangchuaiphh[0].xebo;
    this.currentChinhSuaHH.tongtien = this.mangchuaiphh[0].ttien;
    this.currentChinhSuaHH.tinhtrang = this.thanhtoan;
    this.currentChinhSuaHH.ntchhs =this.ntchhs;
    this.currentChinhSuaHH.idtx =this.idtx;
    this.currentChinhSuaHH.cpps=this.cpps;
    this.currentChinhSuaHH.mtcpps=this.mtcpps;
    this.currentChinhSuaHH.idUser=this.userObj.userid
    console.log(this.currentChinhSuaHH)
    this.hanghoaService.updateHH(this.currentChinhSuaHH).subscribe(data => {
      alert("Cập Nhật Thành Công");
      // this.gethanghoa();
    });
  }

  xoa(hh,i) {
    let c = confirm("Bạn chắc chắn muốn xóa?");
    if (c) {
      this.hanghoaService.deleteHH(hh).subscribe(data => {
        alert("Xóa Thành Công");
        this.manghanghoa.splice(i,1);
      });
    }
    
   
  }

  themhhonekh(){
    this.ishowminus=true;
    this.mangchuaiphh.push({
      tenhh:'',
      ndhh:'',
      ktcn:0,
      gp:0,
      ttien:0,
      xebo:0,
    })
  }
  bothhonekh(){
    console.log(this.mangchuaiphh)
    let a =this.mangchuaiphh.length
    this.mangchuaiphh.splice(a-1, 1);
  }
}
