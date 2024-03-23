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

    async findUsername(userID) {

        try {

            const response = await axios.get(`${this.API_URL}/api/getId`, {
                params: {
                    user_name: this.username,
                }
            });

            const [userData] = response.data;
            //console.log(response.data.length);

            if (response.data.length > 0 && userData.user_id != userID) {

                return true;
            }
            else {
                return false;
            }
        } catch (error) {

            console.log("Błąd podczas wykonywania zapytania", error);

        }
    };

    async findEmail(userID) {

        try {

            const response = await axios.get(`${this.API_URL}/api/findEmail`, {
                params: {
                    user_email: this.userEmail,
                }
            });
            const [userData] = response.data;

            //console.log(userData.user_id);

            if (response.data.length > 0 && userData.user_id != userID) {
                return true;
            } else
                return false;

        } catch (error) {
            console.log("Błąd podczas wykonywania zapytania", error);
        }
    };

    async areAllFieldsFilled() {

        if (this.username === "" || this.userEmail === "" || this.userPassword === "") {

            return false;
        } else
            return true;
    };

    async isPasswordToShort() {

        if (this.userPassword.length < 8) {
            return true;
        } else
            return false;
    };

    async checkDataFromUser(userID) {

        //let isUserDataValid = true;

        const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
        const checkEmail = reg.test(this.userEmail);

        if (this.username.length < 4) {
            return {
                isUserDataValid: false,
                className: "alertMessage",
                message: "Nazwa użytkownika musi mieć conajmniej 4 znaki"
            }

        };

        let result = await this.findUsername(userID);
        if (result) {
            return {
                isUserDataValid: false,
                className: "alertMessage",
                message: "Nazwa użytkownika jest już zajęta"
            }
        };

        if (!checkEmail) {
            return {
                isUserDataValid: false,
                className: "alertMessage",
                message: "Błędny adres email"
            }
        };

        result = await this.findEmail(userID);
        if (result) {

            return {
                isUserDataValid: false,
                className: "alertMessage",
                message: "Adres email już istnieje"
            }
        };

        return { isUserDataValid: true };

    };

    // async checkEmail(userID) {

    //     const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    //     const checkEmail = reg.test(this.userEmail);

    //     if (!checkEmail) {
    //         return {
    //             isUserDataValid: false,
    //             className: "alertMessage",
    //             message: "Błędny adres email"
    //         }
    //     };

    //     const result = await this.findEmail(userID);
    //     if (result) {

    //         return {
    //             isUserDataValid: false,
    //             className: "alertMessage",
    //             message: "Adres email już istnieje"
    //         }
    //     };

    //     return { isUserDataValid: true };

    // }


}