import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BaocaoCongnoComponent } from "./baocao-congno.component";
import { BaocaoCongnoService } from "./baocao-congno.service";
import { A2Edatetimepicker } from "ng2-eonasdan-datetimepicker";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2Edatetimepicker,
    RouterModule.forChild([
      { path: "baocaocongno", component: BaocaoCongnoComponent }
    ])
  ],
  declarations: [BaocaoCongnoComponent],
  providers: [BaocaoCongnoService]
})
export class BaocaoCongnoModule {}
