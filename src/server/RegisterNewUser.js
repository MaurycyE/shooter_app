import axios from "axios";
import bcrypt from "bcryptjs";
import { config } from "./config.js";

export class RegisterNewUser extends config {

    constructor(newUsername, newUserEmail, newUserPassword, API_URL) {

        super(API_URL);
        this.newUsername = newUsername;
        this.newUserEmail = newUserEmail;
        this.newUserPassword = newUserPassword;
    }

    cryptPassword() {

        const hashedPassword = bcrypt.hash(this.newUserPassword, 10);
        return hashedPassword;
        //console.log(hashedPassword);
    }

    async addUserToDatabase() {

        const hashedPassword = await this.cryptPassword();
        try {

            const response = await axios.post(`${this.API_URL}/api/registerUser`, {

                user_name: this.newUsername,
                user_email: this.newUserEmail,
                user_password: hashedPassword,

            });
            console.log("udana Rejestracja");

        } catch (error) {
            console.log("Błąd podczas rejestracji", error);
        }
    };

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

            console.log("Błąd podczas rejestracji", error);

        }
    };

}