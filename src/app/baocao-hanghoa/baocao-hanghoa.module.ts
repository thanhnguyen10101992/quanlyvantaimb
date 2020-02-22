import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BaocaoHanghoaComponent } from "./baocao-hanghoa.component";
import { BaocaoHanghoaService } from "./baocao-hanghoa.service";
import { A2Edatetimepicker } from "ng2-eonasdan-datetimepicker";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2Edatetimepicker,
    RouterModule.forChild([
      { path: "baocaohanghoa", component: BaocaoHanghoaComponent }
    ])
  ],
  declarations: [BaocaoHanghoaComponent],
  providers: [BaocaoHanghoaService]
})
export class BaocaoHanghoaModule {}
