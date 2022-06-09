import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { LoginAPIBody } from "../../../types/api/auth";
import userPool from "../../../src/userPool";

// eslint-disable-next-line consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  //* 계정 생성하기
  if (req.method === "POST") {
    try {
      //* 값을 받았는지 확인
      const {
        body,
      }: {
        body: LoginAPIBody;
      } = req;
      const { email, password } = body;

      if (email) {
        const congnitoUser = new CognitoUser({
          Username: email,
          Pool: userPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        congnitoUser.authenticateUser(authDetails, {
          //성공시
          onSuccess(result: any) {
            //result.idToken.payload에 가입한 회원의 정보가 들어있음
            res.setHeader(
              "Set-Cookie",
              `email=${
                result.idToken.payload.email
              }; path=/; expires=${new Date(
                Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
              ).toUTCString()}; httponly`
            );
            res.statusCode = 200;
            return res.send(result.idToken.payload.email);
          },

          //실패시
          onFailure(err) {
            console.log(err);
            res.statusCode = 400;
            return res.end();
          },
        });
      }
    } catch (e) {
      console.log(e);
      return res.end();
    }
  }
};
