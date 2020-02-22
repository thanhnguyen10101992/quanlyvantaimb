import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class TaixeService {
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
      .get(`http://localhost:3000/dstaixe`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getalltxban() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(`http://localhost:3000/dstaixeban`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  create(dstxe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    //CHANGE IN DEVELOPMENT MODE TO LOCALHOST !!!!!
    return this.http
      .post("http://localhost:3000/taotaixe", JSON.stringify(dstxe), options)
      .catch(this.handleError);
  }

  updateTXe(txe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/updatetxe/`,
        JSON.stringify(txe),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteTXe(dtxe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/deletetxe/`,
        JSON.stringify(dtxe),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTenTaiXe(ttxe) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/gettentxe/`,
        JSON.stringify(ttxe),
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
