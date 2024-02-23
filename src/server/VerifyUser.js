import axios from "axios";

const API_URL = "http://localhost:3001";

export class VerifyUser {

    constructor(username) {

        this.username = username;
    }

    async checkPassword() {

        try {

            const response = await axios.get(`${API_URL}/api/verifyUser`, {
                params: {
                    user_name: this.username,
                }
            });

            const userData = response.data;
            if (userData.length > 0) {

                console.log(userData);
            }


        } catch (error) {

            console.log("Błąd podczas logowania", error);
        }
    }
}