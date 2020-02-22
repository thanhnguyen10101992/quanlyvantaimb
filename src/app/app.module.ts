import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import "rxjs/Rx";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./home/login.component";
import { AboutComponent } from "./home/about.component";

/* Feature Modules */
import { UserModule } from "./user/user.module";
import { ExpenseModule } from "./expense/expense.module";

/* common Modules */
import { ToastrService } from "./common/toastr.service";
import { XeModule } from "./xe/xe.module";
import { TaixeModule } from "./taixe/taixe.module";
import { ChuyenXeModule } from "./chuyenxe/chuyenxe.module";
import { HanghoaModule } from "./hanghoa/hanghoa.module";
import { KhachhangModule } from "./khachhang/khachhang.module";
import { BaocaoHanghoaModule } from "./baocao-hanghoa/baocao-hanghoa.module";
import { BaocaoThuchiModule } from "./baocao-thuchi/baocao-thuchi.module";
import { BaocaoCongnoModule } from "./baocao-congno/baocao-congno.module";
import { ThuchiModule } from './quanlythuchi/quanlythuchi.module';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UserModule,
    ExpenseModule,
    XeModule,
    ChuyenXeModule,
    TaixeModule,
    KhachhangModule,
    HanghoaModule,
    BaocaoHanghoaModule,
    BaocaoThuchiModule,
    BaocaoCongnoModule,
    ThuchiModule,
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      { path: "about", component: AboutComponent },
      { path: "", redirectTo: "xe", pathMatch: "full" },
      { path: "**", redirectTo: "login", pathMatch: "full" }
    ])
  ],
  declarations: [AppComponent, LoginComponent, AboutComponent],
  bootstrap: [AppComponent],
  providers: [ToastrService]
})
export class AppModule {}
