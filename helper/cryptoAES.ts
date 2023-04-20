const config = require("../config");
const CryptoJS = require("crypto-js");

export default class CryptoAES {

  constructor() { }

  public async Encrypt(value: string): Promise<string> {
    return CryptoJS.AES.encrypt(value, config.keyAES).toString();
  }

  public async Decrypt(value: string): Promise<string> {
    return CryptoJS.AES.decrypt(value, config.keyAES).toString(CryptoJS.enc.Utf8)
  }
}