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
import { HanghoaService } from "../hanghoa/hanghoa.service";
import { KhachHangService } from "../khachhang/khachhang.service";
import { ChuyenXeService } from "../chuyenxe/chuyenxe.service";
import { AuthService } from "../user/auth.service";
import { XeService } from "../xe/xe.service";
import { BaocaoCongnoService } from "./baocao-congno.service";
import { Http } from "@angular/http";

@Component({
  selector: "app-baocao-congno",
  templateUrl: "./baocao-congno.component.html",
  styleUrls: ["./baocao-congno.component.css"]
})
export class BaocaoCongnoComponent implements OnInit {
  mcx:string;
  tcppsctt:number;
  mtcppsc:string;
  tenxe:string;
  route: ActivatedRoute;
  a2eOptions = { format: "DD/MM/YYYY" };
  router: Router;
  manghanghoa: any[];
  mangchuyenxe: any[];
  mangkhachhang: any[];
  mangcx: any[];
  mangkh: any[];
  mangxp: any[];
  tcx: any;
  tongtien: number;
  nxp: Date;
  tencx: string;
  tenkh: string;
  userObj:any;
  tenall:any;
  thisobjectcn:any;
  mangxe:any[];
  idxe:string;
  constructor(
    private hanghoaService: HanghoaService,
    private khachhangService: KhachHangService,
    private chuyenxeService: ChuyenXeService,
    private xeService: XeService,
    private authService:AuthService,
    private bcCongnoService: BaocaoCongnoService,
    injector: Injector
  ) {
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.manghanghoa = [];
    this.tcppsctt=0;
    this.mangkhachhang = [];
    this.mangchuyenxe = [];
    this.mangcx = [];
    this.mangkh = [];
    this.mangxp = [];
    this.tcx = {};
    this.tongtien = 0;
    this.getKhachHang();
    this.gethanghoacn();
    this.getXe();
    this.userObj =  this.authService.currentUser;
    this.thisobjectcn={
      idUser:this.userObj.userid,
      idcx:'',
      idkh:'',
      idxe:''
    }
  }

  public inhoadonhh(){

    let inHoaDon = [];
    inHoaDon.push({"Tổng Tiền": this.tongtien + "VND"});
    for (let i in this.manghanghoa) {
      inHoaDon.push({
        "Chuyến Xe": this.manghanghoa[i].idcx.mcx,
        "Tên Khách Hàng": this.manghanghoa[i].idkh.tenkh,
        "Tên Hàng": this.manghanghoa[i].tenhang,
        "Nội dung": this.manghanghoa[i].noidunghh,
        "Kích thước/Cân Nặng": this.manghanghoa[i].ktcn,
        "Gía/Phí": this.manghanghoa[i].giaphi + "VND",
        "Tổng tiền": this.manghanghoa[i].tongtien + "VND",
        "Tình Trạng": this.manghanghoa[i].tinhtrang ?"Đã Thanh Toán":"Chưa Thanh Toán"
      })
    }
    

    // var data = document.getElementById('contenthh'); 
     
    // html2canvas(data).then(canvas => {  
    //   // Few necessary setting options  
    //   var imgWidth = 208;   
    //   var pageHeight = 295;    
    //   var imgHeight = canvas.height * imgWidth / canvas.width;  
    //   var heightLeft = imgHeight;  
    //   console.log('imgHeight',imgHeight)
     

    //   let pdf = new jsPDF('p', 'pt', 'letter'); // A4 size page of PDF  
    //   var position = 0;  
    //   // for(let i=0;i<=data.clientHeight/980; i++){
    //   //   const contentDataURL = canvas.toDataURL('image/png')  
    //   //   if (i > 0) {
    //   //     pdf.addPage(); //8.5" x 11" in pts (in*72)
    //   //   }
    //   //   pdf.setPage(i+1);
    //   //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    //   // }
    //   const contentDataURL = canvas.toDataURL('image/png')  
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //   pdf.save('MYPdf.pdf'); // Generated PDF   
    //   console.log('1231',pdf)
    // }); 
    this.bcCongnoService.exportAsExcelFile(inHoaDon, 'baocaocongno');
  }

  gethanghoacn() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    console.log('ok11',query)
    this.hanghoaService.getallcn(query).subscribe(data => {
      this.manghanghoa = data.data;
      console.log('ok1',data.data);
      for (let i in this.manghanghoa) {
        this.tongtien += this.manghanghoa[i].tongtien;
      }
    });
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
  getdsxetc(event){
    
    this.tongtien = 0;
    if (event) {
      this.idxe = event._id;
      this.thisobjectcn.idxe = this.idxe;
      
    }
    this.hanghoaService.postidcxcn(this.thisobjectcn).subscribe(data => {
      console.log('ok2',data.data);
      this.manghanghoa = data.data;

      for (let i in this.manghanghoa) {
        this.tongtien += this.manghanghoa[i].tongtien;
      }
    });
  }

  getKhachHang() {
    this.khachhangService.getall().subscribe(data => {
      this.mangkhachhang = data.data;
    });
  }

  selectHHKH(hhkh) {
    
    this.tongtien = 0;
    this.mcx=hhkh.mcx
    let idcx = {
      idcx: hhkh._id
    };
    if(hhkh._id){
      this.thisobjectcn.idcx=hhkh._id
    }
    
    this.hanghoaService.postidcxcn(this.thisobjectcn).subscribe(data => {
      console.log('ok3',data.data);
      this.manghanghoa = data.data;
      for (let i in this.manghanghoa) {
        this.tongtien += this.manghanghoa[i].tongtien;
      }
    });

    
  }
  chonkhmd(hhkh) {
    this.tenkh=hhkh.tenkh
    this.tongtien = 0;  
    let idkh = {
      idkh: hhkh._id
    };
    if(hhkh._id){
      this.thisobjectcn.idkh=hhkh._id
    }
    // this.hanghoaService.getmanghhcnkh(idkh).subscribe(data => {
    //   console.log('timdc',data.data);
    //   this.manghanghoa = data.data;
    //   for (let i in this.manghanghoa) {
    //     this.tongtien += this.manghanghoa[i].tongtien;
    //   }
    // });

    this.hanghoaService.postidcxcn(this.thisobjectcn).subscribe(data => {
      console.log('ok4',data.data);
      this.manghanghoa = data.data;
      for (let i in this.manghanghoa) {
        this.tongtien += this.manghanghoa[i].tongtien;
      }
    });

    
  }

  getmcx(event) {
    
    this.userObj =  this.authService.currentUser;
    
   
    let mcx = {
      mcx: event.target.value,
      idUser:this.userObj.userid
    };
    console.log('123',mcx)
    
    this.chuyenxeService.getmcxcn(mcx).subscribe(data => {
      this.mangcx = data.data;
    });

    
  }


  gettenkh(event) {
    
    
    let tenkh = {
      tenkh: event.target.value
    };

    if(event.target.value.length==0){
      this.gethanghoacn()
    }
    console.log('123',tenkh)
    this.khachhangService.getmkhcn(tenkh).subscribe(data => {
      this.mangkh = data.data;
    });

    
  }

  tongthanhtoan(){
    for( let i in this.manghanghoa){
      this.manghanghoa[i].ttcpps=this.tcppsctt
      this.manghanghoa[i].mtcppsc=this.mtcppsc
    }
    console.log('td', this.manghanghoa)

    this.hanghoaService.postmangctt(this.manghanghoa).subscribe((data)=>{
      alert("Thanh toán thành công")
      this.gethanghoacn()
    })
  }
}
