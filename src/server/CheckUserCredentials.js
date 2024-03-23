import axios from "axios";
import bcrypt from "bcryptjs";
import { config } from "./config.js";

export class CheckUserCredentials extends config {

    constructor(username, userEmail, userPassword, API_URL) {

        super(API_URL);
        this.username = username;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    async findUsername() {

        try {

            const response = await axios.get(`${this.API_URL}/api/verifyUser`, {
                params: {
                    user_name: this.newUsername,
                }
            });

            const userData = response.data;
            if (userData.length > 0) {

                return true;
            }
            else {
                return false;
            }
        } catch (error) {

            console.log("Błąd podczas wykonywania zapytania", error);

        }
    };

    async findEmail() {

        try {

            const response = await axios.get(`${this.API_URL}/api/findEmail`, {
                params: {
                    user_email: this.newUserEmail,
                }
            });
            const userData = response.data;

            if (userData.length > 0) {
                return true;
            } else
                return false;

        } catch (error) {
            console.log("Błąd podczas wykonywania zapytania", error);
        }
    };

    async areAllFieldsFilled() {

        if (this.newUsername === "" || this.newUserEmail === "" || this.newUserPassword === "") {

            return false;
        } else
            return true;
    };

    async isPasswordToShort() {

        if (this.newUserPassword.length < 8) {
            return true;
        } else
            return false;
    };


}