import { Component, OnInit, Injector } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'; 
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "../common/toastr.service";
import { XeService } from "../xe/xe.service";
import { TaixeService } from "../taixe/taixe.service";
import { ChuyenXeService } from "../chuyenxe/chuyenxe.service";
import { KhachHangService } from "../khachhang/khachhang.service";
import { HanghoaService } from "../hanghoa/hanghoa.service";
import { ThuchiService } from "../quanlythuchi/quanlythuchi.service";
import { AuthService } from "../user/auth.service";
import { Http } from "@angular/http";
import { Alert } from "selenium-webdriver";
@Component({
  selector: "app-baocao-thuchi",
  templateUrl: "./baocao-thuchi.component.html",
  styleUrls: ["./baocao-thuchi.component.css"]
})
export class BaocaoThuchiComponent implements OnInit {
  a2eOptions = { format: "DD/MM/YYYY" };
  title: string;
  tenxe: string;
  nbdnb:number;
  tongtienps:number;
  nktnb:number;
  tongtiencl:number;
  mangchuyenxe: any[];
  manghanghoa: any[];
  mangthuchi: any[];
  router: Router;
  mangkhachhang: any[];
  isShow: boolean;
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
  hanghoasua: any;
  tenmcxdt: string;
  ngayxuatphat: number;
  nxptim: Date;
  nbdtim: Date;
  nkttim: Date;
  nbbtc: number;
  idtx: string;
  ntctim: Date;
  tenhang: any;
  idhh: string;
  sotien: number;
  ntc: Date = new Date();
  ishowttx:boolean;
  loaithuchi: string;
  gchu: string;
  ltc: string;
  tongtientc: number;
  tongtienxebo:number;
  tongtientt: number;
  objecct: any;
  mangchuathuchibd:any[];
  mangtaixe:any[];
  mangxe:any[];
  idxe:string;
  userObj:any;
  mangchuacoidxe:any[];
  constructor(
    private xeService: XeService,
    injector: Injector,
    private chuyenxeService: ChuyenXeService,
    private khachhangservice: KhachHangService,
    private hanghoaservice: HanghoaService,
    private thuchiservice: ThuchiService,
    private taixeService:TaixeService,
    private authService:AuthService
  ) {
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.ishowttx=false;
    this.getchuyenxe();
    this.getKhachHang();
    this.gethanghoa();
    this.getThuChi();
    this.getTaiXe();
    this.getXe();
    this.userObj =  this.authService.currentUser;
    this.mangthuchi = [];
    this.objecct = {
      idUser:this.userObj.userid,
      idcx: "",
      idkh: "",
      idtx: "",
      nbdtim: 0,
      nkttim:0,
      ltc: "",
      idxe:""
    };
    this.tongtientt = 0;
    this.tongtientc = 0;
    this.tongtienxebo=0;
    this.tongtienps=0;
    this.tongtiencl=0;
  }
  getXe() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.xeService.getall(query).subscribe(data => {
      console.log(data);
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
  getThuChi() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.thuchiservice.getall(query).subscribe(data => {
      this.mangthuchi = data.data;
      this.mangchuathuchibd = data.data;
      this.tongtientc = 0;
      this.tongtienxebo=0;
      this.tongtientt = 0;
      this.tongtiencl = 0;
      this.tongtienps=0;
      this.thuchiservice.bcdstc(this.objecct).subscribe(data => {
        this.mangthuchi = data.data;
        for (let i in this.mangthuchi) {
          if (this.mangthuchi[i].loaithuchi == "Chi" || this.mangthuchi[i].loaithuchi=="Chi Tài Xế") {
            this.tongtientc += this.mangthuchi[i].sotien;
          }
          if (this.mangthuchi[i].loaithuchi == "Thu") {
            this.tongtientt += this.mangthuchi[i].sotien;
          }
          if(this.mangthuchi[i].cpps){
            this.tongtienps=this.tongtienps+this.mangthuchi[i].cpps
          }
          if(this.mangthuchi[i].xebo){
            this.tongtienxebo=this.tongtienxebo+this.mangthuchi[i].xebo;
          }
        }
        this.tongtiencl=this.tongtientt-this.tongtientc-this.tongtienps-this.tongtienxebo;
      });
    });
  }
  getdsxetc(event){
    this.tongtientc = 0;
    this.tongtientt = 0;
    this.tongtiencl = 0;
    this.tongtienps=0;
    if (event) {
      this.idxe = event._id;
      this.objecct.idxe = this.idxe;
    }
    this.thuchiservice.bcdstc(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
      for (let i in this.mangthuchi) {
        if (this.mangthuchi[i].loaithuchi == "Chi" || this.mangthuchi[i].loaithuchi=="Chi Tài Xế") {
          this.tongtientc += this.mangthuchi[i].sotien;
        }
        if (this.mangthuchi[i].loaithuchi == "Thu") {
          this.tongtientt += this.mangthuchi[i].sotien;
        }
        if(this.mangthuchi[i].cpps){
          this.tongtienps=this.tongtienps+this.mangthuchi[i].cpps
        }
      }
      this.tongtiencl=this.tongtientt-this.tongtientc-this.tongtienps
    });
  }

  
  getdlsl1(gtnd) {
    this.isShow = true;
    this.tongtientc = 0;
    this.tongtientt = 0;
    this.tongtiencl = 0;
    this.tongtienps=0;
    if (gtnd) {
      this.idcx = gtnd._id;
      this.objecct.idcx = this.idcx;
    }
    this.thuchiservice.bcdstc(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
      for (let i in this.mangthuchi) {
        if (this.mangthuchi[i].loaithuchi == "Chi" || this.mangthuchi[i].loaithuchi=="Chi Tài Xế") {
          this.tongtientc += this.mangthuchi[i].sotien;
        }
        if (this.mangthuchi[i].loaithuchi == "Thu") {
          this.tongtientt += this.mangthuchi[i].sotien;
        }
        if(this.mangthuchi[i].cpps){
          this.tongtienps=this.tongtienps+this.mangthuchi[i].cpps
        }
      }
      this.tongtiencl=this.tongtientt-this.tongtientc-this.tongtienps
    });
  }
  getdlsl2(gtnd) {
    this.isShow = true;
    this.tongtientc = 0;
    this.tongtientt = 0;
    this.tongtiencl = 0;
    this.tongtienps =0;
    if (gtnd) {
      (this.idkh = gtnd._id), (this.objecct.idkh = this.idkh);
    }

    this.thuchiservice.bcdstc(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
      for (let i in this.mangthuchi) {
        if (this.mangthuchi[i].loaithuchi == "Chi" || this.mangthuchi[i].loaithuchi=="Chi Tài Xế") {
          this.tongtientc += this.mangthuchi[i].sotien;
        }
        if (this.mangthuchi[i].loaithuchi == "Thu") {
          this.tongtientt += this.mangthuchi[i].sotien;
        }
        if(this.mangthuchi[i].cpps){
          this.tongtienps=this.tongtienps+this.mangthuchi[i].cpps
        }
      }
      this.tongtiencl=this.tongtientt-this.tongtientc-this.tongtienps
    });
  }


  getdlsl3(gtnd) {
    this.tongtientc = 0;
    this.tongtientt = 0;
    this.tongtiencl = 0;
    this.tongtienps =0;
    if (gtnd) {
      this.idtx = gtnd._id;
      this.objecct.idtx = this.idtx;
    }

    console.log("3", this.objecct);
    this.thuchiservice.bcdstc(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
      for (let i in this.mangthuchi) {
        if (this.mangthuchi[i].loaithuchi == "Chi" || this.mangthuchi[i].loaithuchi=="Chi Tài Xế") {
          this.tongtientc += this.mangthuchi[i].sotien;
        }
        if (this.mangthuchi[i].loaithuchi == "Thu") {
          this.tongtientt += this.mangthuchi[i].sotien;
        }
        if(this.mangthuchi[i].cpps){
          this.tongtienps=this.tongtienps+this.mangthuchi[i].cpps
        }
      }
      this.tongtiencl=this.tongtientt-this.tongtientc-this.tongtienps
    });
  }  
  getdlsl4(gtnd) {
    this.isShow = true;
    console.log('gtnd',gtnd)
    if(gtnd=="Chi Tài Xế"){
      this.ishowttx=true;
    }else{
      this.ishowttx=false;
    }
    this.tongtientc = 0;
    this.tongtientt = 0;
    this.tongtiencl = 0;
    this.tongtienps =0;
    if (gtnd) {
      this.ltc = gtnd;
      this.objecct.ltc = this.ltc;
    }
    
    this.thuchiservice.bcdstc(this.objecct).subscribe(data => {
      this.mangthuchi = data.data;
      console.log(this.mangthuchi);
      for (let i in this.mangthuchi) {
        if (this.mangthuchi[i].loaithuchi == "Chi" || this.mangthuchi[i].loaithuchi=="Chi Tài Xế") {
          this.tongtientc += this.mangthuchi[i].sotien;
        }
        if (this.mangthuchi[i].loaithuchi == "Thu") {
          this.tongtientt += this.mangthuchi[i].sotien;
        }
        if(this.mangthuchi[i].cpps){
          this.tongtienps=this.tongtienps+this.mangthuchi[i].cpps
        }
      }
      this.tongtiencl=this.tongtientt-this.tongtientc-this.tongtienps
    });
  }

  changemodelkt(event){
    this.tongtientc = 0;
    this.tongtientt = 0;
    this.tongtiencl = 0;
    this.tongtienps =0;
    let a = new Date(this.nbdtim);
    let b = new Date(this.nkttim)
    this.nbdnb =a.setHours(0, 0, 0, 0);
    this.nktnb = b.setHours(0, 0, 0, 0)+24*60*60*1000-1
    let qrtknb={
      nbd:this.nbdnb,
      nkt:this.nktnb
    }
    this.objecct.nbdtim = this.nbdnb;
    this.objecct.nkttim = this.nktnb
    if(qrtknb.nbd || qrtknb.nbd){ 
      this.thuchiservice.bcdstc(this.objecct).subscribe((data) => {
        this.mangthuchi = data.data;
       console.log('tntk',this.mangthuchi)
        if( this.mangthuchi){
          for (let i in this.mangthuchi) {
            if (this.mangthuchi[i].loaithuchi == "Chi" || this.mangthuchi[i].loaithuchi=="Chi Tài Xế") {
              this.tongtientc += this.mangthuchi[i].sotien;
              console.log('this.Chi',this.tongtientc);
            }
            if (this.mangthuchi[i].loaithuchi == "Thu") {
              this.tongtientt += this.mangthuchi[i].sotien;
              console.log('this.tongtientt',this.tongtientt)
            }
            if(this.mangthuchi[i].cpps){
              this.tongtienps=this.tongtienps+this.mangthuchi[i].cpps
            }
          }
          this.tongtiencl=this.tongtientt-this.tongtientc-this.tongtienps
        }
        
        
      });
    }
  }
  public inhoadonhh(){
    var data = document.getElementById('contenthh'); 
     
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      console.log('imgHeight',imgHeight)
     

      let pdf = new jsPDF('p', 'pt', 'letter'); // A4 size page of PDF  
      var position = 0;  
      // for(let i=0;i<=data.clientHeight/980; i++){
      //   const contentDataURL = canvas.toDataURL('image/png')  
      //   if (i > 0) {
      //     pdf.addPage(); //8.5" x 11" in pts (in*72)
      //   }
      //   pdf.setPage(i+1);
      //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      // }
      const contentDataURL = canvas.toDataURL('image/png')  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
      console.log('1231',pdf)
    }); 

   
    
  }
  
}
