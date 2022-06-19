import { CognitoUserPool } from "amazon-cognito-identity-js";

const userpoolData = {
  UserPoolId: process.env.NEXT_PUBLIC_AMPLIFY_USERPOOL_ID,
  ClientId: process.env.NEXT_PUBLIC_AMPLIFY_WEBCLIENT_ID,
};

export default new CognitoUserPool(userpoolData);
