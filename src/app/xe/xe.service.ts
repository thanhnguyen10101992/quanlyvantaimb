import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class XeService {
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
      .post("http://85.187.132.174:4200/dsxe", JSON.stringify(query), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  getallxban() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(`http://85.187.132.174:4200/dsxeban`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  create(dsxe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    //CHANGE IN DEVELOPMENT MODE TO LOCALHOST !!!!!
    return this.http
      .post("http://85.187.132.174:4200/taoxe", JSON.stringify(dsxe), options)
      .catch(this.handleError);
  }

  updateXe(xe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`http://85.187.132.174:4200/api/updatexe/`, JSON.stringify(xe), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteXe(dxe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`http://85.187.132.174:4200/api/deletexe/`, JSON.stringify(dxe), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTenXe(txe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`http://85.187.132.174:4200/api/gettenxe/`, JSON.stringify(txe), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }
}
