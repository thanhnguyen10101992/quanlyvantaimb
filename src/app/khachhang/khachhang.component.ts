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
import { KhachHangService } from "./khachhang.service";
import { Http } from "@angular/http";

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachhangComponent implements OnInit {
  isShowmd:boolean;
  isThemmoi: boolean;
  tenkhtim:string;
  router: Router;
  tenkh:string;
  dc:string;
  gchu:string;
  sdt:string;
  title:string;
  mangkhachhang:any[];
  khcrud:any;
  constructor(
    injector: Injector,
    private khachhangservice:KhachHangService
  ) { 
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.getKhachHang();

  }

  getKhachHang() {
    this.khachhangservice.getall().subscribe(data => {
      
      this.mangkhachhang = data.data;
      console.log(data.data);
    });
  }

  goToEdit(khachhang) {
    this.khcrud=khachhang;
    if (khachhang) {
      this.title = "Chỉnh sữa";
      this.isThemmoi = false;
      this.isShowmd = true;
      console.log("ok",khachhang);
      this.tenkh=khachhang.tenkh;
      this.dc=khachhang.diachi;
      this.sdt=khachhang.dienthoai;
      this.gchu=khachhang.ghichu;
    } else {
      this.title = "Thêm mới";
      this.isThemmoi = true;
      this.isShowmd = true;
    }
  }

  themmoi() {
    let dskh = {
      tenkh: this.tenkh,
      dc: this.dc,
      sdt: this.sdt,
      gchu: this.gchu
    };
    this.khachhangservice.create(dskh).subscribe(data => {
      console.log(data);
      alert("Thêm Khách Hàng Thành Công");
    });
    this.tenkh = "";
    this.dc = "";
    this.sdt = '';
    this.gchu = "";
    this.getKhachHang();
  }

  chinhsua(){
    let query={
      id:this.khcrud._id,
      tenkh:this.tenkh,
      diachi:this.dc,
      dienthoai:this.sdt,
      ghichu:this.gchu
    }

    console.log('1231',query);
    this.khachhangservice.updateKhachHang(query).subscribe(data => {
      alert("Cập Nhật Thành Công");
      this.getKhachHang();
    });

    
  }
  Xoa(kh){
    let query={
      id:kh._id
    }
    var r = confirm("Bạn Chắc Chắn Muốn Xóa");
    if (r == true) {
      this.khachhangservice.deleteKhachHang(query).subscribe(data => {
        this.isShowmd = false;
        this.getKhachHang();
      });
    } else {
      this.isShowmd = true;
      this.getKhachHang();
    }
    
  }

  gettenkhtim(event) {
    let tenkhach = {
      tenkh: event.target.value
    };
    console.log('ok123',event.target.value)
    this.khachhangservice.posttenkh(tenkhach).subscribe(data => {
      this.mangkhachhang = data.data;
      
    });
  }

}
