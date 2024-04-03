
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'https://spades.auth.us-east-1.amazoncognito.com/';
const CLIENT_ID = '4l27f32rcgmkkh51eu23g7ormr';
const CLIENT_SECRET = '9mqr5b18ri5513eh1bmjqjj8qcqs9gje22hv2d8058uudd6ok59';

// const CLIENT_ID = process.env.CLIENT_ID; // '4l27f32rcgmkkh51eu23g7ormr'
// const CLIENT_SECRET = process.env.CLIENT_SECRET; // '9mqr5b18ri5513eh1bmjqjj8qcqs9gje22hv2d8058uudd6ok59'
const REDIRECT_URI = 'http://localhost:3000/dashboard';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export async function fetchUserInfo(props) {
    try {
        const { code } = props;
        if (!code) {
            throw new Error("No code provided");
        }

        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            code: encodeURIComponent(code),
            client_secret: CLIENT_SECRET, // Ensure this is server-side before including
        });

        const response = await axiosInstance.post(`oauth2/token`, params.toString());


        const idToken = response.data.id_token;
        const decodedToken = jwtDecode(idToken);



        return decodedToken && decodedToken.sub;
    } catch (error) {
        return null;

    }

}




