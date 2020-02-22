import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChuyenxeComponent } from "./chuyenxe.component";
import { ChuyenXeService } from "./chuyenxe.service";
import { A2Edatetimepicker } from "ng2-eonasdan-datetimepicker";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2Edatetimepicker,
    RouterModule.forChild([{ path: "chuyenxe", component: ChuyenxeComponent }])
  ],
  declarations: [ChuyenxeComponent],
  providers: [ChuyenXeService]
})
export class ChuyenXeModule {}
