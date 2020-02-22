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
import { TaixeService } from "./taixe.service";
import { Http } from "@angular/http";

@Component({
  selector: "app-taixe",
  templateUrl: "./taixe.component.html",
  styleUrls: ["./taixe.component.css"]
})
export class TaixeComponent implements OnInit {
  a2eOptions = { format: "DD/MM/YYYY" };
  ttx:string;
  title: string;
  mangtaixe: any[];
  router: Router;
  tentxe: string;
  dc: string;
  sdt: number;
  ns: Date;
  cmnd: number;
  tinhtrang: string;
  route: ActivatedRoute;
  isThemmoi: boolean;
  currentChinhSuaTXE: any;
  constructor(private taixeService: TaixeService, injector: Injector) {
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.mangtaixe = [];
    this.getTaiXe();
  }

  getTaiXe() {
    this.taixeService.getall().subscribe(data => {
      console.log(data);
      this.mangtaixe = data.data;
    });
  }
  getttx(event) {
    let tentx = {
      ttx: event.target.value
    };
    console.log(tentx);
    this.taixeService.getTenTaiXe(tentx).subscribe(data => {
      console.log(data);
      this.mangtaixe = data.data;
    });
  }
  themmoi() {
    let nsinh = new Date(this.ns);
    let myDateNgaysinh = nsinh.getTime();
    let dstx = {
      tentxe: this.tentxe,
      diachi: this.dc,
      dienthoai: this.sdt,
      ngaysinh: myDateNgaysinh,
      cmnd: this.cmnd,
      tinhtrang: this.tinhtrang
    };
    this.taixeService.create(dstx).subscribe(data => {
      console.log(data);
      alert("Thêm Tài Xế Thành Công");
    });
    this.tentxe = "";
    this.dc = "";
    this.sdt = 0;
    this.ns = new Date();
    this.cmnd = 0;
    this.tinhtrang = "";
    this.getTaiXe();
  }

  goToEdit(txe) {
    if (txe) {
      this.currentChinhSuaTXE = txe;
      let nsinh = new Date(txe.ngaysinh);
      this.title = "Chỉnh sữa";
      this.isThemmoi = false;
      this.tentxe = txe.tentaixe;
      this.dc = txe.diachi;
      this.sdt = txe.dienthoai;
      this.ns = nsinh;
      this.cmnd = txe.cmnd;
      this.tinhtrang = txe.tinhtrang;
    } else {
      this.title = "Thêm mới";
      this.isThemmoi = true;
      this.tentxe = "";
      this.dc = "";
      this.sdt = 0;
      this.ns = new Date();
      this.cmnd = 0;
      this.tinhtrang = "";
    }
  }
  chinhsua() {
    let nsinh = new Date(this.ns);
    let myDateNgaysinh = nsinh.getTime();
    this.currentChinhSuaTXE.tentxe = this.tentxe;
    this.currentChinhSuaTXE.dc = this.dc;
    this.currentChinhSuaTXE.sdt = this.sdt;
    this.currentChinhSuaTXE.ns = myDateNgaysinh;
    this.currentChinhSuaTXE.cmnd = this.cmnd;
    this.currentChinhSuaTXE.tinhtrang = this.tinhtrang;

    this.taixeService.updateTXe(this.currentChinhSuaTXE).subscribe(data => {
      alert("Cập Nhật Thành Công");
      this.getTaiXe();
    });
  }

  xoa(tx) {
    let c = confirm("Bạn chắc chắn muốn xóa?");
    if (c) {
      this.taixeService.deleteTXe(tx).subscribe(data => {
        alert("Xóa Thành Công");
        this.getTaiXe();
      });
    }
  }
}
