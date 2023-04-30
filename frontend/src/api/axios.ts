import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import store from "../store";
import authSlice from "../store/slices/auth";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const axiosService = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosService.interceptors.request.use(async (config) => {
    const { accessToken } = store.getState().auth;

    if (accessToken !== null) {
        config.headers.Authorization = "Bearer " + accessToken;
        console.debug(
            "[Request]",
            (config.baseURL ?? "") + config.url,
            JSON.stringify(accessToken)
        );
    }
    return config;
});

axiosService.interceptors.response.use(
    (res) => {
        console.debug(
            "[Response]",
            (res.config.baseURL ?? "") + res.config.url,
            res.status,
            res.data
        );
        return Promise.resolve(res);
    },
    (err) => {
        console.debug(
            "[Response]",
            err.config.baseURL + err.config.url,
            err.response.status,
            err.response.data
        );
        return Promise.reject(err);
    }
);

const refreshAuthLogic = async (failedRequest: any) => {
    const { refreshToken } = store.getState().auth;
    if (refreshToken !== null) {
        return axios
            .post(
                "/auth/refresh/",
                {
                    refresh: refreshToken,
                },
                {
                    baseURL: process.env.REACT_APP_API_URL,
                }
            )
            .then((resp) => {
                const { accessToken, refreshToken } = resp.data;
                failedRequest.response.config.headers.Authorization =
                    "Bearer " + accessToken;
                store.dispatch(
                    authSlice.actions.setAuthTokens({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    })
                );
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(authSlice.actions.setLogout());
                }
            });
    }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export async function fetcher<T = any>(url: string) {
    const res = await axiosService.get<T>(url);
    return res.data;
}

export default axiosService;
