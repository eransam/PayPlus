// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiPath: 'http://localhost:3001/',
  client_id:
    '867340997526-6fjqppgfbqb63im6imqnmgc158tll7rs.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:4200/profile',
  // auth:
  emailAndSSNUniqueUrl: 'http://localhost:3001/api/auth/ssn-email-unique/',
  registerUrl: 'http://localhost:3001/api/auth/register/',
  loginUrl: 'http://localhost:3001/api/auth/login/',
  check_token: 'http://localhost:3001/api/auth/check_token/',
  sendVerificationEmailUrl:
    'http://localhost:3001/api/auth/sendVerificationEmail/',

  get_the_vere_code_from_the_user:
    'http://localhost:3001/api/auth/get_the_vere_code_from_the_user/',
  update_user_det: 'http://localhost:3001/api/update_user_det/',

  check_if_pass_is_currect:
    'http://localhost:3001/api/check_if_pass_is_currect/',

    update_password:
    'http://localhost:3001/api/update_password/',
};
