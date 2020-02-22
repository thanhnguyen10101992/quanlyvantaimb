import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class ThuchiService {
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
      .post(`http://localhost:3000/dsthuchi`,JSON.stringify(query), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  create(dstc) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    //CHANGE IN DEVELOPMENT MODE TO LOCALHOST !!!!!
    return this.http
      .post("http://localhost:3000/taothuchi", JSON.stringify(dstc), options)
      .catch(this.handleError);
  }

  updatetc(thuchi) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/updatethuchi`,
        JSON.stringify(thuchi),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteTC(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/deletethuchi`,
        JSON.stringify(query),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  tcct(query) {
    console.log("123123", query);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`http://localhost:3000/timdsthuchi`, JSON.stringify(query), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  bcdstc(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/timbcdsthuchi`,
        JSON.stringify(query),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  timtctk(querytk) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/timbctctk`,
        JSON.stringify(querytk),
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
