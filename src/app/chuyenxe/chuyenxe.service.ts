import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
@Injectable()
export class ChuyenXeService {
  public jwtToken: string;

  constructor(private http: Http) {
    const theUser: any = JSON.parse(localStorage.getItem("currentUser"));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
  }

  getall(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`http://localhost:3000/dschuyenxe`,JSON.stringify(query), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  create(dscx) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    //CHANGE IN DEVELOPMENT MODE TO LOCALHOST !!!!!
    return this.http
      .post("http://localhost:3000/taochuyenxe", JSON.stringify(dscx), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateChuyenXe(chuyenxe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/updatechuyenxe`,
        JSON.stringify(chuyenxe),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteCX(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/deletechuyenxe`,
        JSON.stringify(query),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  scxtt(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`http://localhost:3000/timcxtt`, JSON.stringify(query), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  posttencx(tcx) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`http://localhost:3000/api/posttencx`, JSON.stringify(tcx), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  postngayxuatphat(nxp) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/api/postngayxp`,
        JSON.stringify(nxp),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getmcxcn(qr) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/getmcxcn`,
        JSON.stringify(qr),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }
}
