import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_slH9JAFDG',
    ClientId: '40goo00692fvor13eimhfhslhp'
};

const userPool = new CognitoUserPool(poolData);


export const signIn = (email, password) => {
    const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
                console.log('Authentication successful', session);
                resolve(session);
            },
            onFailure: (err) => {

                reject(err);
            },
        });
    });
};



export const signUp = (email, password) => {
    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, [], null, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result.user);
        });
    });
};
