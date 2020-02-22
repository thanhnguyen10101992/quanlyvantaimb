import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { KhachhangComponent } from "./khachhang.component";
import { KhachHangService } from "./khachhang.service";
import { A2Edatetimepicker } from "ng2-eonasdan-datetimepicker";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2Edatetimepicker,
    RouterModule.forChild([{ path: "khachhang", component: KhachhangComponent }])
  ],
  declarations: [KhachhangComponent],
  providers: [KhachHangService]
})
export class KhachhangModule {}
