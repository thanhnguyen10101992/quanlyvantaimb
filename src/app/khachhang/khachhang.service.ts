import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class KhachHangService {
  public jwtToken: string;

  constructor(private http: Http) {
    const theUser: any = JSON.parse(localStorage.getItem("currentUser"));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
  }

  getall() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(`http://localhost:3000/dskhachhang`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  create(dskh) {
    console.log("dskh", dskh);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    //CHANGE IN DEVELOPMENT MODE TO LOCALHOST !!!!!
    return this.http
      .post("http://localhost:3000/taokh", JSON.stringify(dskh), options)
      .catch(this.handleError);
  }

  updateKhachHang(kh) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/updatetkhachhang`,
        JSON.stringify(kh),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteKhachHang(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/deletekhachhang`,
        JSON.stringify(query),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  posttenkh(tkh) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`http://localhost:3000/api/posttenkh`, JSON.stringify(tkh), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getmkhcn(tkh) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`http://localhost:3000/getmangkhcn`, JSON.stringify(tkh), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }
}
