const AWS = require('aws-sdk');
const { secretHashGenerator } = require('./SecretHash');

AWS.config.update({ region: 'us-east-1' });

const cognito = new AWS.CognitoIdentityServiceProvider();



export const signUp = async (username, email, password) => {

    const secretHash = await secretHashGenerator(username);

    const params = {
        ClientId: '40goo00692fvor13eimhfhslhp',
        SecretHash: secretHash,
        Username: username,
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
            },
        ],
    };

    try {
        const signUpResponse = await cognito.signUp(params).promise();

        return signUpResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const signIn = async (email, password) => {
    const secretHash = await secretHashGenerator(email);

    const params = {
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        ClientId: '40goo00692fvor13eimhfhslhp',
        UserPoolId: 'us-east-1_slH9JAFDG',
        AuthParameters: {
            USERNAME: email,
            SECRET_HASH: secretHash,
            PASSWORD: password
        },
    };



    try {
        const authResult = await cognito.adminInitiateAuth(params).promise();

        return authResult;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
