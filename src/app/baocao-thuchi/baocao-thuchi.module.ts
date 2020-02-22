import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BaocaoThuchiComponent } from "./baocao-thuchi.component";
import { BaocaoThuchiService } from "./baocao-thuchi.service";
import { A2Edatetimepicker } from "ng2-eonasdan-datetimepicker";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2Edatetimepicker,
    RouterModule.forChild([
      { path: "baocaothuchi", component: BaocaoThuchiComponent }
    ])
  ],
  declarations: [BaocaoThuchiComponent],
  providers: [BaocaoThuchiService]
})
export class BaocaoThuchiModule {}
