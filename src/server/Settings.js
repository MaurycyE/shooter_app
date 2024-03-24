import axios from "axios";
import bcrypt from "bcryptjs";
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


        const arePasswordValid = await this.checkActualPassword(oldPassword, userName);

        console.log(arePasswordValid);

        if (!arePasswordValid) {
            return {
                className: "alertMessage",
                message: "Błędne hasło"
            }
        };

        if (newPassword.length < 8) {
            return {
                className: "alertMessage",
                message: "Nowe hasło musi mieć conajmniej 8 znaków"
            };
        };

        try {

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const response = await axios.put(`${this.API_URL}/api/passUpdate`, {

                user_password: hashedPassword,
                user_id: this.userId

            });

            return {
                className: "successMessage",
                message: "Hasło zostało zmienione!"
            }

        } catch (error) {

            console.error("nie udało się wprowadzić zmian", error);
            return {
                className: "alertMessage",
                message: "Błąd serwera!"
            }
        }

    };

    async checkActualPassword(actualPassword, userName) {

        const checkingMethods = new CheckUserCredentials(userName, "", actualPassword);
        let result = await checkingMethods.checkUserPassword(this.userId);
        //console.log(result);
        return result;
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

