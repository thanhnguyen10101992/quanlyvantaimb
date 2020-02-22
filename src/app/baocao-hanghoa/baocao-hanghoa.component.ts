import { Component, OnInit, Injector } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "../common/toastr.service";
import { HanghoaService } from "../hanghoa/hanghoa.service";
import { KhachHangService } from "../khachhang/khachhang.service";
import { ChuyenXeService } from "../chuyenxe/chuyenxe.service";
import { AuthService } from "../user/auth.service";
import { Http } from "@angular/http";

@Component({
  selector: "app-baocao-hanghoa",
  templateUrl: "./baocao-hanghoa.component.html",
  styleUrls: ["./baocao-hanghoa.component.css"]
})
export class BaocaoHanghoaComponent implements OnInit {
  isShow: boolean;
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
  nxp: Date;
  tencx: string;
  tenkh: string;
  object: any;
  idcxe: string;
  idcx: string;
  idkh: string;
  userObj:any;
  constructor(
    private hanghoaService: HanghoaService,
    private khachhangService: KhachHangService,
    private chuyenxeService: ChuyenXeService,
    private authService:AuthService,
    injector: Injector
  ) {
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.manghanghoa = [];
    this.mangkhachhang = [];
    this.mangchuyenxe = [];
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
      ngayxph: ""
    };
  }

  gethanghoa() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.hanghoaService.getall(query).subscribe(data => {
      this.manghanghoa = data.data;
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
    });
  }

  selectngayxp(event) {
    let nxphat = new Date(this.nxp);
    let myDateNgayxp = nxphat.setHours(0, 0, 0, 0);

    let ngayxp = {
      nxp: myDateNgayxp
    };
    console.log(ngayxp);
    this.chuyenxeService.postngayxuatphat(ngayxp).subscribe(data => {
      console.log(data.data);
      this.mangxp = data.data;
    });
  }

  selectngayxuatphat() {
    for (let i in this.mangxp) {
      this.idcxe = this.mangxp[i]._id;
      this.object.ngayxph = this.idcxe;
    }
    console.log(this.object);
    this.hanghoaService.postidobject(this.object).subscribe(data => {
      console.log(data.data);
      this.manghanghoa = data.data;
    });
  }

  selectHHCX(hhcx) {
    this.tencx = hhcx.mcx;
    if (hhcx) {
      this.idcx = hhcx._id;
      this.object.idchxe = this.idcx;
    }
    console.log("hhcx", this.object);
    this.hanghoaService.postidobject(this.object).subscribe(data => {
      console.log(data.data);
      this.manghanghoa = data.data;
    });
  }

  selectHHKH(hhkh) {
    this.tenkh = hhkh.tenkh;
    if (hhkh) {
      this.idkh = hhkh._id;
      this.object.idkhachh = this.idkh;
    }
    console.log("hhkh", this.object);
    this.hanghoaService.postidobject(this.object).subscribe(data => {
      console.log(data.data);
      this.manghanghoa = data.data;
    });
  }

  gettencx(event) {
    let tencxe = {
      tencx: event.target.value
    };
    this.chuyenxeService.posttencx(tencxe).subscribe(data => {
      console.log("mangcx", data.data);
      this.mangcx = data.data;
    });
  }

  gettenkh(event) {
    
    let tenkhach = {
      tenkh: event.target.value
    };
    console.log('ok1231',event.target.value)

    if(event.target.value.length==0){
      this.gethanghoa()
    }
    this.khachhangService.posttenkh(tenkhach).subscribe(data => {
      this.mangkh = data.data;
      console.log('ok1231',this.mangkh)
    });
    
  }
}
