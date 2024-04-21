export const COGNITO_BASE_URL = `https://spades.auth.us-east-1.amazoncognito.com/`;
export const GATEWAY_BASE_URL = `https://kpkxx6puy7h4st72awjuaxm2di0xlbnq.lambda-url.us-east-1.on.aws`;
export const HTTP_BASE_URL = `http://54.163.243.174`;

const AMPLIFY_BASE_URL = `https://dev.dzym427ke4wx7.amplifyapp.com`;
const LOCALHOST_BASE_URL = `http://localhost:3000`;
const WEB_ENVIRONMENT = LOCALHOST_BASE_URL;

export const LOGOUT_URL = `https://spades.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=4l27f32rcgmkkh51eu23g7ormr&logout_uri=${WEB_ENVIRONMENT}/logout`;
export const REDIRECT_URI = `${WEB_ENVIRONMENT}/dashboard`;
export const SIGNIN_URL = `https://spades.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=4l27f32rcgmkkh51eu23g7ormr&redirect_uri=${WEB_ENVIRONMENT}/dashboard`;



export const CLIENT_ID = `4l27f32rcgmkkh51eu23g7ormr`;
export const CLIENT_SECRET = `9mqr5b18ri5513eh1bmjqjj8qcqs9gje22hv2d8058uudd6ok59`;

