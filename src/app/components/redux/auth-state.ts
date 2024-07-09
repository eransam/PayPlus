import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

class CustomHttpHandler implements HttpHandler {
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    // Implement handle method as needed
    return null; // Placeholder, replace with actual implementation
  }
}

export class AuthState {
  user: any = null;
  token: any = null;

  constructor(private http: HttpClient) {
    // const usermail = localStorage.getItem('current_username');
    // const send_token_to_db_by_mail: any = firstValueFrom(
    //   this.http.post<any>(
    //     `${environment.apiPath}api/auth/get_user_details_by_mail`,
    //     { mail: usermail }
    //   )
    // );
    // this.token = send_token_to_db_by_mail.current_token;
    // if (this.token) {
    //   const encodedObject: any = jwtDecode(this.token);
    //   this.user = encodedObject.user;
    // }
  }
}

//Action type
export enum AuthActionType {
  Register = 'Register',
  Login = 'Login',
  Logout = 'Logout',
  send_user_and_token_from_gaurd = 'send_user_and_token_from_gaurd',
}
//Action you send with dispatch
export interface AuthAction {
  type: AuthActionType;
  payload?: string;
}

export function send_user_and_token_from_gaurd(token: any): AuthAction {
  return {
    type: AuthActionType.send_user_and_token_from_gaurd,
    payload: token,
  };
}

//Action Creators
export function registerAuthAction(token: string): AuthAction {
  return { type: AuthActionType.Register, payload: token };
}
export function loginAuthAction(token: any): AuthAction {
  return { type: AuthActionType.Login, payload: token };
}

export function logoutAuthAction(): AuthAction {
  return { type: AuthActionType.Logout };
}

export function authReducer(
  currentState = new AuthState(null), // Pass an instance of HttpClient here
  action: AuthAction
): any {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.Register:
    case AuthActionType.Login:
      newState.token = action.payload;
      const encodedObject2: any = jwtDecode(newState.token);
      newState.user = encodedObject2.user;
      //   localStorage.setItem('token', newState.token);
      break;
    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      //   localStorage.removeItem('token');
      break;
    case AuthActionType.send_user_and_token_from_gaurd:
      newState.token = action.payload;
      const encodedObject: any = jwtDecode(newState.token);
      newState.user = encodedObject.user;
      //   localStorage.setItem('token', newState.token);
      break;
  }

  return newState;
}
