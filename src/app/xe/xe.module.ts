import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XeComponent } from "./xe.component";
import { XeService } from "./xe.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: "xe", component: XeComponent }])
  ],
  declarations: [XeComponent],
  providers: [XeService]
})
export class XeModule {}
