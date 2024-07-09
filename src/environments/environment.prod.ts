// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiPath: 'https://backend.easybox-ai.com/',
  client_id:
    '867340997526-h1vnp79tlsob39ha62m2vj0l5jr046ep.apps.googleusercontent.com',
  redirect_uri: 'https://www.easybox-ai.com/profile',
  apiUrl: 'http://localhost:3000/api', // Replace with your actual API URL

  // auth:
  emailAndSSNUniqueUrl:
    'https://backend.easybox-ai.com/api/auth/ssn-email-unique/',
  registerUrl: 'https://backend.easybox-ai.com/api/auth/register/',
  loginUrl: 'https://backend.easybox-ai.com/api/auth/login/',
  check_token: 'https://backend.easybox-ai.com/api/auth/check_token/',
  sendVerificationEmailUrl:
    'https://backend.easybox-ai.com/api/auth/sendVerificationEmail/',
  get_the_vere_code_from_the_user:
    'https://backend.easybox-ai.com/api/auth/get_the_vere_code_from_the_user/',

  update_user_det: 'https://backend.easybox-ai.com/api/update_user_det/',

  check_if_pass_is_currect:
    'https://backend.easybox-ai.com/api/check_if_pass_is_currect/',

  update_password: 'https://backend.easybox-ai.com/api/update_password/',
};
