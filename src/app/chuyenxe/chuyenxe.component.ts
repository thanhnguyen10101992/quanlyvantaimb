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
import { XeService } from "../xe/xe.service";
import { TaixeService } from "../taixe/taixe.service";
import { AuthService } from "../user/auth.service";
import { ChuyenXeService } from "./chuyenxe.service";
import { Http } from "@angular/http";

@Component({
  selector: "app-chuyenxe",
  templateUrl: "./chuyenxe.component.html",
  styleUrls: ["./chuyenxe.component.css"]
})
export class ChuyenxeComponent implements OnInit {
  a2eOptions = { format: "DD/MM/YYYY" };
  countp:number;
  title: string;
  tenchuyenxe:string;
  mangchuaxe: any[];
  mangchuatenxe: any[];
  mangchuatentaixe: any[];
  mangchuataixe: any[];
  mangchuyenxe: any[];
  mangtx: any[];
  mangxeb:any[];
  mangtxeb:any[];
  router: Router;
  tenxe: any;
  chieuchay: string;
  tinhtrang: string;
  route: ActivatedRoute;
  isThemmoi: boolean;
  currentChinhSuachuyenxe: any;
  tentaixe: any;
  tentaixe2: any;
  machuyenxe: string;
  idxe: string;
  idtx: string;
  nxp: Date;
  nxptim: Date;
  bienso: string;
  idx: string;
  idtxe: string;
  idtxe2: string;
  userObj:any;
  constructor(
    private xeService: XeService,
    injector: Injector,
    private taixeService: TaixeService,
    private chuyenxeService: ChuyenXeService,
    private authService:AuthService,
  ) {
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.getXe();
    this.getTaiXe();
    this.getchuyenxe();
    this.mangtx = [];
    this.getTaiXeB();
    this.countp=0;
  }
  doSomething(event) {
    let a = new Date(this.nxptim);
    this.userObj =  this.authService.currentUser;
    let nnb = a.setHours(0, 0, 0, 0);
    for (var i in this.mangchuataixe) {
      if (this.tentaixe === this.mangchuataixe[i].tentaixe) {
        this.idtx = this.mangchuataixe[i]._id;
      }
      
    }

    let query = {
      idtx: this.idtx,
      nnb: nnb,
      idUser:this.userObj.userid
    };

    // ngayxuatkho: { $gte: ngaybatdau, $lte: ngayketthuc }
    this.chuyenxeService.scxtt(query).subscribe(data => {
      this.mangchuyenxe = data.data;
    });
  }

  getchuyenxe() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.chuyenxeService.getall(query).subscribe(data => {
      this.mangchuyenxe = data.data;
      console.log(this.mangchuyenxe);
    });
  }
  getXe() {
    this.userObj =  this.authService.currentUser;
    
    let query={
      idUser:this.userObj.userid
    }
    this.xeService.getall(query).subscribe(data => {
      console.log(data);
      this.mangchuaxe = data.data;
    });
  }
  

  getTaiXe() {
    this.taixeService.getall().subscribe(data => {
      this.mangchuataixe = data.data;
    });
  }
  getTaiXeB() {
    this.taixeService.getalltxban().subscribe(data => {
      this.mangtxeb = data.data;
    });
  }

  goToEdit(chuyenxe) {
    this.mangtx=[]
    // console.log('this.countp++;',this.countp++);
    this.currentChinhSuachuyenxe = chuyenxe;
    if (chuyenxe) {
      for (let i in this.mangchuataixe) {
        if (this.mangchuataixe[i]._id != chuyenxe.idtx._id) {
            this.mangtx.push(this.mangchuataixe[i]);
        }
      }
      this.title = "Chỉnh sữa";
      this.isThemmoi = false;
      this.tenxe = chuyenxe.idxe;
      this.tentaixe = chuyenxe.idtx;
      this.tentaixe2 = chuyenxe.idtx2;
      this.nxp = new Date(chuyenxe.ngayxuatphat);
      this.chieuchay = chuyenxe.chieuchay;
      this.tinhtrang = chuyenxe.tinhtrang;

      for (var i in this.mangchuaxe) {
        if (this.mangchuaxe[i]._id == this.tenxe._id) {
          this.tenxe = this.mangchuaxe[i];
          break;
        }
      }
      for (var i in this.mangchuataixe) {
        if (this.mangchuataixe[i]._id == this.tentaixe._id) {
          this.tentaixe = this.mangchuataixe[i];
        }
      }
      for (var i in this.mangchuataixe) {
        if (this.mangchuataixe[i]._id == this.tentaixe2._id) {
          this.tentaixe2 = this.mangchuataixe[i];
        }
      }
    } else {
      this.title = "Thêm mới";
      this.isThemmoi = true;
      this.tenxe = "";
      this.tentaixe = "";
      this.tentaixe2 = "";
      this.nxp = new Date();
      this.tinhtrang = "";
      this.chieuchay = "";
    }
  }

  chinhsua() {
    let myDate = new Date(this.nxp);
    let myDateTimestamp = myDate.getTime();
    this.machuyenxe = "";
    let a;
    console.log(this.tentaixe, this.tenxe);
    let getthang = myDate.getMonth() + 1;
    if (getthang > 9) {
      a = getthang;
    } else {
      a = "0" + getthang;
    }
    let b = myDate.getFullYear().toString();
    let nxpstr = "" + myDate.getDate() + a + b[2] + b[3];
    this.machuyenxe = this.chieuchay + "-" + nxpstr + "-" + this.tenxe.bienso;

    let query = {
      id: this.currentChinhSuachuyenxe._id,
      mcx: this.machuyenxe,
      idxe: this.tenxe,
      idtx: this.tentaixe,
      idtx2: this.tentaixe2,
      ngayxuatphat: myDateTimestamp,
      chieuchay: this.chieuchay,
      tinhtrang: this.tinhtrang
    };
    console.log("query", query);

    this.chuyenxeService.updateChuyenXe(query).subscribe(data => {
      alert("Cập Nhật Thành Công");
      this.getchuyenxe();
    });

    
  }

  gettenxe(tx) {
    this.idx = tx._id;
    this.bienso = tx.bienso;
  }

  gettentaixe(ttx1) {
    this.mangtx=[]
    this.idtxe = ttx1._id;
    for (let i in this.mangchuataixe) {
      if (this.mangchuataixe[i]._id != ttx1._id) {
          this.mangtx.push(this.mangchuataixe[i]);
      }
    }
  }
  gettentaixe2(ttx2) {
    this.idtxe2 = ttx2._id;
  }

  themmoi() {
    this.userObj =  this.authService.currentUser;
    let myDate = new Date(this.nxp);
    let myDateTimestamp = myDate.setHours(0, 0, 0, 0);
    let bdnxp=myDate.setHours(0, 0, 0, 0);
    let a;
    let getthang = myDate.getMonth() + 1;
    if (getthang > 9) {
      a = getthang;
    } else {
      a = "0" + getthang;
    }
    let b = myDate.getFullYear().toString();
    let nxpstr = "" + myDate.getDate() + a + b[2] + b[3];

    this.machuyenxe = this.chieuchay + "-" + this.tenchuyenxe + "-" + this.bienso;

    let query = {
      idUser: this.userObj.userid,
      mcx: this.machuyenxe,
      idxe: this.idx,
      idtx: this.idtxe,
      idtx2: this.idtxe2,
      ngayxuatphat: myDateTimestamp,
      chieuchay: this.chieuchay,
      tinhtrang:this.tinhtrang,
      
    };
    console.log(query);
    this.chuyenxeService.create(query).subscribe(data => {
      console.log('data',data)
      // alert("Thêm Chuyến Xe Thành Công");
      alert(data.message)
      this.getchuyenxe();
    });

    
  }
  Xoa(cx) {
    let c = confirm("Bạn chắc chắn muốn xóa?");
    if (c) {
      this.chuyenxeService.deleteCX(cx).subscribe(data => {
        alert("Xóa Thành Công");
        this.getchuyenxe();
      });
    }
  }
}
