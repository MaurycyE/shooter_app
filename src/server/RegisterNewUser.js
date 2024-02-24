import axios from "axios";
import bcrypt, { hash } from "bcryptjs";
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

    checkCryptedPassword(cryptedPassword) {

        bcrypt.compare(this.newUserPassword, cryptedPassword, (err, result) => {

            if (err) {
                console.error(err);
                return;
            }
            if (result) {
                console.log("hasła się zgadzają");
            } else {
                console.log("hasła niezgodne");
            }
        });
    }

}