import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuanlythuchiComponent } from "./quanlythuchi.component"
import { ThuchiService } from "./quanlythuchi.service";
import { A2Edatetimepicker } from "ng2-eonasdan-datetimepicker";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2Edatetimepicker,
    RouterModule.forChild([{ path: "thuchi", component: QuanlythuchiComponent }])
  ],
  declarations: [QuanlythuchiComponent],
  providers: [ThuchiService]
})
export class ThuchiModule {}
