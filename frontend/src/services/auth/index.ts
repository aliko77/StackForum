import axios from "../../api/axios";

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post("/auth/login/", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        return false;
    }
};
