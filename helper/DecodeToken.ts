import { Buffer } from 'buffer';

export default function DecodeToken(tokenUser: string) {
  const token = tokenUser.split(" ")[1]

  const resultDecode = JSON.parse(Buffer.from(token.split(".")[1], 'base64').toString("utf-8"));

  let tokenData = {
    ID_USER: resultDecode.ID_USER,
    PSEUDONYM: resultDecode.PSEUDONYM,
    IS_MODERATOR: resultDecode.IS_MODERATOR,
    IS_ADMINISTRATOR: resultDecode.IS_ADMINISTRATOR,
    IS_SUPER_ADMINISTRATOR: resultDecode.IS_SUPER_ADMINISTRATOR
  }

  return tokenData;
}