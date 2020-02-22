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
import { XeService } from "./xe.service";
import { AuthService } from "../user/auth.service";
import { Http } from "@angular/http";

@Component({
  selector: "app-xe",
  templateUrl: "./xe.component.html",
  styleUrls: ["./xe.component.css"]
})
export class XeComponent implements OnInit {
  title: string;
  tx:string;
  mangxe: any[];
  router: Router;
  tenxe: string;
  bienso: string;
  taitrong: string;
  tinhtrang: string;
  route: ActivatedRoute;
  isThemmoi: boolean;
  currentChinhSuaXE: any;
  userObj: any;
  userid:any;

  constructor(
    private xeService: XeService, 
    private authService:AuthService,
    injector: Injector) {
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.mangxe = [];
    this.getXe();
    if(!this.isLoggedIn()){
      this.router.navigate(["login"]);
    }else{
      this.userObj =  this.authService.currentUser;
      
    }
    
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

  gettx(event) {
    let tenx = {
      tx: event.target.value
    };
    this.xeService.getTenXe(tenx).subscribe(data => {
      console.log(data);
      this.mangxe = data.data;
    });
  }

  themmoi() {
    this.userObj =  this.authService.currentUser;
    let dslp = {
      idUser: this.userObj.userid,
      tenxe: this.tenxe,
      bienso: this.bienso,
      taitrong: this.taitrong,
      tinhtrang: this.tinhtrang
    };
    this.xeService.create(dslp).subscribe(data => {
      alert("Thêm Xe Thành Công");
    });
    this.tenxe = "";
    this.bienso = "";
    this.taitrong = "";
    this.tinhtrang = "";
    this.getXe();
  }

  goToEdit(xe) {
    this.currentChinhSuaXE = xe;
    if (xe) {
      console.log("ok");
      this.title = "Chỉnh sữa";
      this.isThemmoi = false;
      this.tenxe = xe.tenxe;
      this.bienso = xe.bienso;
      this.taitrong = xe.taitrong;
      this.tinhtrang = xe.tinhtrang;
    } else {
      this.title = "Thêm mới";
      this.isThemmoi = true;
      this.tenxe = "";
      this.bienso = "";
      this.taitrong = "";
      this.tinhtrang = "";
    }
  }
  chinhsua() {
    this.currentChinhSuaXE.tenxe = this.tenxe;
    this.currentChinhSuaXE.bienso = this.bienso;
    this.currentChinhSuaXE.taitrong = this.taitrong;
    this.currentChinhSuaXE.tinhtrang = this.tinhtrang;

    this.xeService.updateXe(this.currentChinhSuaXE).subscribe(data => {
      alert("Cập Nhật Thành Công");
    });
  }
  xoa(xe) {
    console.log(xe);
    let c = confirm("Bạn chắc chắn muốn xóa?");
    if (c) {
      this.xeService.deleteXe(xe).subscribe(data => {
        alert("Xóa Thành Công");
        this.getXe();
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
