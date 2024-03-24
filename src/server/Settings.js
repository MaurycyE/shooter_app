import axios from "axios";
import { config } from "./config.js";
import { CheckUserCredentials } from "./CheckUserCredentials.js";

export class Settings extends config {

    constructor(user_id, API_URL) {
        super(API_URL);
        this.userId = user_id;
    }

    async getUsernameAndEmail() {

        try {

            const response = await axios.get(`${this.API_URL}/api/user`, {
                params: {
                    user_id: this.userId,
                }
            });

            const userData = response.data;
            return userData;

        } catch (error) {

            console.log("Nie znaleziono użytkownika", error);
            return null;
        }
    };

    async saveNewUserData(newUsername, newUserEmail) {

        const isDataFromUserOK = await this.checkUserNewData(newUsername, newUserEmail);

        //console.log(isDataFromUserOK.isUserDataValid);

        if (!isDataFromUserOK.isUserDataValid) {

            return {
                className: isDataFromUserOK.className,
                message: isDataFromUserOK.message
            }
        } else {

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
    };

    async changePassword(oldPassword, newPassword, userName) {

        this.checkActualPassword(oldPassword, userName);
    };

    async checkActualPassword(actualPassword, userName) {

        const checkingMethods = new CheckUserCredentials(userName, "", actualPassword);
        let result = await checkingMethods.checkUserPassword();
        //console.log(result);
    };

    async checkUserNewData(userName, newUserEmail) {

        const checkingMethods = new CheckUserCredentials(userName, newUserEmail, "");

        let result = await checkingMethods.checkDataFromUser(this.userId);

        if (!result.isUserDataValid) {
            return result;
        }
        //console.log(result);

        return { isUserDataValid: true };

    };



};

