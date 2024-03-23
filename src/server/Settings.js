import axios from "axios";
//import bcrypt from "bcryptjs";
import { config } from "./config.js";
import { VerifyUser } from "./VerifyUser.js";
import { RegisterNewUser } from "./RegisterNewUser.js";

export class Settings extends config {

    constructor(user_id, API_URL) {
        super(API_URL);
        this.userId = user_id;
    }

    async getUsernameAndEmail() {

        try {

            //console.log(this.userId);
            const response = await axios.get(`${this.API_URL}/api/user`, {
                params: {
                    user_id: this.userId,
                }
            });

            const userData = response.data;
            return userData;
            //console.log(userData);


        } catch (error) {

            console.log("Nie znaleziono użytkownika", error);
            return null;
        }
    }

    async saveNewUserData(newUsername, newUserEmail) {

        this.checkUserNewData(newUsername, newUserEmail);
        try {

            const response = await axios.put(`${this.API_URL}/api/update`, {

                user_name: newUsername,
                user_email: newUserEmail,
                user_id: this.userId

            });
            console.log("Wprowadzono zmiany", response.data);
            return {
                className: "successMessage",
                message: "Zmiany zapisane!"
            }

        } catch (error) {

            console.error("nie udało się wprowadzić zmian", error);
            return {
                className: "alertMessage",
                message: "Błąd serwera!"
            }
        }
    }

    async checkUserNewData(userName, newUserEmail) {

        let isDataValid = true;

        const checkUserData = new RegisterNewUser(userName, newUserEmail, "");

        const result = await checkUserData.findUsername();

        console.log(result);


    }

};

