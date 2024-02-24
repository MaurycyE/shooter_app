import axios from "axios";
import bcrypt from "bcryptjs";
import { config } from "./config.js";

//const API_URL = "http://localhost:3001";

export class VerifyUser extends config {

    constructor(username, password, API_URL) {

        super(API_URL);
        this.username = username;
        this.password = password;
    }

    async checkPassword() {

        try {

            const response = await axios.get(`${this.API_URL}/api/verifyUser`, {
                params: {
                    user_name: this.username,
                    user_password: this.password,
                }
            });

            const userData = response.data;
            if (userData.length > 0) {

                const [passwordFromDatabase] = userData;
                let arePasswordTheSame = false

                //console.log(passwordFromDatabase.user_password);
                //console.log(this.password);

                arePasswordTheSame = this.checkCryptedPassword(passwordFromDatabase.user_password).then((result) => {
                    return result;
                });

                return arePasswordTheSame;

            } else {

                console.log("nie znaleziono użytkownika");
                return false;
            }


        } catch (error) {

            console.log("Błąd podczas logowania", error);

        }
    }

    async checkCryptedPassword(passwordFromDatabase) {

        try {
            const result = await bcrypt.compare(this.password, passwordFromDatabase);
            return result;
        } catch (error) {

            console.error("błąd podczas sprawdzania hasła", error);
            return false;
        }
    };
}