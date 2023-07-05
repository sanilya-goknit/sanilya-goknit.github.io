const awsConfig = {
    Auth: {
        mandatorySignIn: true,

        /*
         * Region: 'ap-south-1',
         * userPoolId: 'ap-south-1_EXaJZlMxR',
         * userPoolWebClientId: '7s6q70j76nafkk478i25mskfpe',
         */

        region: 'us-east-1',
        userPoolId: 'us-east-1_ISM7nmxX9',
        userPoolWebClientId: '7n1oqrvclhv6n7bp6efk2lbh7s',
        // identityPoolId: 'us-east-1:aec1ad0a-070a-4116-b794-2f60ba7ff1cd',
        // authenticationFlowType: 'USER_PASSWORD_AUTH',
        oauth: {
            domain: 'knitdev.auth.us-east-1.amazoncognito.com',
            scope: ['email', 'openid', 'profile'],
            redirectSignIn: 'http://localhost:3000/redirectURL',
            redirectSignOut: 'http://localhost:3000',
            responseType: 'token',
        },
    },
};

export default awsConfig;
