class Backend {
    private static baseUrl: string =
        window.location.hostname === "localhost"
            ? "http://localhost:8081/api/v1"
            : "https://137.184.83.246/api/v1";//"https://api.keyhome24.com/api/v1";

    private static async fetchHandler(endpoint: string, options: RequestInit) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, options);
        return response.json();
    }

    static async get(endpoint: string) {
        return this.fetchHandler(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token") as string)
                    : "",
            },
        });
    }

    static async post(endpoint: string, data: any) {
        return this.fetchHandler(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token") as string)
                    : "",
            },
            body: JSON.stringify(data),
        });
    }

    static async delete(endpoint: string) {
        return this.fetchHandler(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token") as string)
                    : "",
            },
        });
    }

    static async patch(endpoint: string, data: any) {
        return this.fetchHandler(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token") as string)
                    : "",
            },
            body: JSON.stringify(data),
        });
    }

    static async put(endpoint: string, data: any) {
        return this.fetchHandler(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token") as string)
                    : "",
            },
            body: JSON.stringify(data),
        });
    }
}

export default Backend;
