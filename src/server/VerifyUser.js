import axios from "axios";
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

                //console.log(passwordFromDatabase.user_password);

                if (passwordFromDatabase.user_password === this.password) {

                    console.log("hasło prawidłowe");
                    return true;

                } else {

                    console.log("nieprawidłowe hasło");
                    return false;
                }

            } else {

                console.log("nie znaleziono użytkownika");
                return false;
            }


        } catch (error) {

            console.log("Błąd podczas logowania", error);

        }
    }
}