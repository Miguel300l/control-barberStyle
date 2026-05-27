import api from "../axios/axios";

export const cargarCsrf =
    async () => {

        const { data } =
            await api.get(
                "/api/csrf-token",
                {
                    withCredentials: true
                }
            );

        api.defaults.headers.common[
            "X-CSRF-Token"
        ] =
            data.csrfToken;
    };