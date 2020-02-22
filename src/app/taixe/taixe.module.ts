import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaixeComponent } from "./taixe.component";
import { TaixeService } from "./taixe.service";
import { A2Edatetimepicker } from "ng2-eonasdan-datetimepicker";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2Edatetimepicker,
    RouterModule.forChild([{ path: "taixe", component: TaixeComponent }])
  ],
  declarations: [TaixeComponent],
  providers: [TaixeService]
})
export class TaixeModule {}
