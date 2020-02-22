import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HanghoaComponent } from "./hanghoa.component";
import { HanghoaService } from "./hanghoa.service";
import { A2Edatetimepicker } from "ng2-eonasdan-datetimepicker";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2Edatetimepicker,
    RouterModule.forChild([{ path: "hanghoa", component: HanghoaComponent }])
  ],
  declarations: [HanghoaComponent],
  providers: [HanghoaService]
})
export class HanghoaModule {}
