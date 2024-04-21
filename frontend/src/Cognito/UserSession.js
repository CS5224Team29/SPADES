
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { COGNITO_BASE_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../Utils/Parameter";

const axiosInstance = axios.create({
    baseURL: COGNITO_BASE_URL,
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
            client_secret: CLIENT_SECRET,
        });

        const response = await axiosInstance.post(`oauth2/token`, params.toString());


        const idToken = response.data.id_token;
        const decodedToken = jwtDecode(idToken);



        return decodedToken && decodedToken.sub;
    } catch (error) {
        return null;

    }

}




