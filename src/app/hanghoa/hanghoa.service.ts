import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class HanghoaService {
  public jwtToken: string;

  constructor(private http: Http) {
    const theUser: any = JSON.parse(localStorage.getItem("currentUser"));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
  }
  // http://localhost:3000
  getall(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`http://localhost:3000/dshanghoa`, JSON.stringify(query), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getallcn(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`http://localhost:3000/dshhcongno`,JSON.stringify(query), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  create(dshh) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    //CHANGE IN DEVELOPMENT MODE TO LOCALHOST !!!!!
    return this.http
      .post("http://localhost:3000/taohanghoa", JSON.stringify(dshh), options)
      .catch(this.handleError);
  }

  updateHH(hh) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`http://localhost:3000/api/updatehh/`, JSON.stringify(hh), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  postmangctt(hh) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`http://localhost:3000/postmangctt`, JSON.stringify(hh), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteHH(dhh) {
    console.log('ok12321',dhh)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`http://localhost:3000/api/deletehh/`, JSON.stringify(dhh), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  postidcx(idcx) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/api/gettencxe/`,
        JSON.stringify(idcx),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  postidkh(idkh) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/api/gettenkhach/`,
        JSON.stringify(idkh),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  postidcxlenhh(idcx) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/gethhcxtn`,
        JSON.stringify(idcx),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  timchieuchay(qr) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/timchieuchay`,
        JSON.stringify(qr),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  postidkhctt(idkhctt) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/api/gettenkhachctt/`,
        JSON.stringify(idkhctt),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  postidcxcn(idcx) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/getidmcxcn`,
        JSON.stringify(idcx),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  getmanghhcnkh(idkh) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        `http://localhost:3000/getdskhcn`,
        JSON.stringify(idkh),
        options
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  postidobject(query) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        `http://localhost:3000/api/timidobject`,
        JSON.stringify(query),
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
