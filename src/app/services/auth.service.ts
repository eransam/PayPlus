import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription, firstValueFrom, interval } from 'rxjs';
import {
  loginAuthAction,
  logoutAuthAction,
  registerAuthAction,
} from '../redux/auth-state';
import { store } from '../redux/store';
import { log } from 'console';
// import { NotifyService } from './notify.service';
// import { VerifyCodeDialogComponent } from '../components/dialogs/verify-code-dialog/verify-code-dialog.component';
// import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { UserModel } from '../components/models/user.model';
import { CredentialsModel } from '../components/models/credentials.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
//   private timerSubscription: Subscription;
  user: any;
  constructor(
    private http: HttpClient,
    // private notify: NotifyService,
    // private dialog: MatDialog
  ) {}

//   startTokenValidation(token_to_check: string): void {
//     // Start a timer that emits a value every 5 minutes
//     this.timerSubscription = interval(300000 /* 5 minutes */).subscribe(() => {
//       this.validateToken(token_to_check);
//     });
//   }

//   stopTokenValidation(): void {
//     // Stop the timer when no longer needed (e.g., when user logs out)
//     if (this.timerSubscription) {
//       this.timerSubscription.unsubscribe();
//     }
//   }

  private async validateToken(token_to_check: string): Promise<void> {
    try {
      const isValid = await this.check_token(token_to_check);
      if (!isValid) {
        // Token is not valid, display notification and perform logout
        // this.notify.error('Session expired. Please log in again.');
        this.user = store.getState().authState.user;

        this.logout(this.user.mail);
        // Navigate user to home page
        // You may need to inject Router service and navigate to home page
      }
    } catch (error) {
      console.error('Error validating token:', error);
      // Handle error gracefully, if necessary
    }
  }

  async check_token(token_to_check: string): Promise<boolean> {
    try {
      console.log(token_to_check);
      const the_token = await firstValueFrom(
        this.http.post<boolean>(environment.check_token, {
          token: token_to_check,
        },
        { withCredentials: true } )
      );
      return the_token;
    } catch (error) {
      console.error('Error checking token:', error);
      // Return false if an error occurs
      return false;
    }
  }

  async register(user: UserModel): Promise<void> {
    try {
      console.log(user);
      const token = await firstValueFrom(
        this.http.post<string>(environment.registerUrl, user,
            { withCredentials: true } )
      );
      store.dispatch(registerAuthAction(token));
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error gracefully, e.g., show error message to the user
      // You can add error handling logic here
    }
  }

  async login(credentials: CredentialsModel): Promise<any> {
    try {
    //   if (credentials.username !== 'eransam21@gmail.com') {
        // אובייקט המכיל את מייל היוזר
        const verification_obj = {
            id: credentials.id,
        };

        // פונ אשר שולחת למייל היוזר
        // const res_from_sendVerificationEmail: any =
        //   await this.sendVerificationEmail(verification_obj);
        // console.log(res_from_sendVerificationEmail);

        //   במידה והמייל נשלח בהצלחה אנו פותחים פופאפ כדי שהיוזר יוכל להזין את קוד האימות שקיבל
        // if (res_from_sendVerificationEmail.status === 200) {
        //   const dialogRef = this.dialog.open(VerifyCodeDialogComponent, {
        //     width: '300px',
        //     data: { verificationCode: '' },
        //   });

        //   // כך אנו מקבלים את קוד האימות שהזין היוזר בעת סגירת הפופאפ
        //   const enteredCode = await firstValueFrom(dialogRef.afterClosed());

        //   // שליחת הקוד שהזין היוזר לשרת
        //   const check_vari_code = await firstValueFrom(
        //     this.http.post<string>(
        //       environment.get_the_vere_code_from_the_user,
        //       {
        //         enteredCode: enteredCode,
        //       }
        //       ,
        //       { withCredentials: true } )
        //   );

          //true במידה והקוד תקין ולא עברו 5 דק נקבל
        //   if (check_vari_code) {
            // נבצע את לוגיקת הכניסה
            const token = await firstValueFrom(
              this.http.post<string>(environment.loginUrl, credentials,
                { withCredentials: true } )
            );

            const send_token_to_db_by_mail = await firstValueFrom(
              this.http.post<string>(
                `${environment.apiPath}api/auth/send_token_to_db_by_mail`,
                { the_token: token, id: credentials.id },
                { withCredentials: true } 
              )
            );

            console.log(send_token_to_db_by_mail);

            //   ומעלים את הטוקן לסטור
            store.dispatch(loginAuthAction(token));
        //   } else {
        //     this.notify.error('קוד לא תקין או שעברו 5 דק מרגע שליחת הקוד');
        //     console.error(
        //       'Verification code does not match or more then 5 min.'
        //     );
        //   }
        // } else {
        //   this.notify.error('שגיאה בשליחת המייל');
        //   console.error('Failed to send verification email.');
        // }
    //   } else {
    //     // נבצע את לוגיקת הכניסה
    //     const token = await firstValueFrom(
    //       this.http.post<string>(environment.loginUrl, credentials,
    //         { withCredentials: true } )
    //     );
    //     const send_token_to_db_by_mail = await firstValueFrom(
    //       this.http.post<string>(
    //         `${environment.apiPath}api/auth/send_token_to_db_by_mail`,
    //         { the_token: token, mail: credentials.username }
    //         ,
    //         { withCredentials: true }  )
    //     );

    //     localStorage.setItem('current_username', credentials.username);

    //     console.log(send_token_to_db_by_mail);

    //     //   ומעלים את הטוקן לסטור
    //     // store.dispatch(
    //     //   loginAuthAction({ the_token: token, mail: credentials.username })
    //     // );
    //   }
    } catch (error) {
    //   this.notify.error('שגיאה בכניסה אנא נסה שנית מאוחר יותר');
      console.error('Error logging in:', error);
    }
  }

  private async sendVerificationEmail(verification_obj: any): Promise<void> {
    // Send an HTTP request to your backend to send the email
    // Example: POST request to an endpoint that sends the email

    const response: any = await firstValueFrom(
      this.http.post<any[]>(
        environment.sendVerificationEmailUrl,
        verification_obj,
        { observe: 'response',withCredentials: true }

      )
    );

    return response;
  }

  async verifyEmail(username: string, enteredCode: string): Promise<boolean> {
    // You would typically compare the entered code with the stored verification code
    // For simplicity, this example directly compares the entered code with a generated code
    const generatedCode = Math.random().toString(36).slice(2, 8).toUpperCase(); // Example code generation
    return enteredCode === generatedCode;
  }

  async logout(userMail: any): Promise<void> {
    try {
      const set_current_token_by_email_to_null = await firstValueFrom(
        this.http.post<string>(
          `${environment.apiPath}api/auth/set_current_token_by_email_to_null`,
          { userMail: userMail }
          ,
          { withCredentials: true } )
      );

      console.log(set_current_token_by_email_to_null);

      store.dispatch(logoutAuthAction());
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error gracefully, if necessary
    }
  }
}
