import { mockProperties, mockUser } from '../data/mockData';

class Backend {
    private static baseUrl: string =
        window.location.hostname === "localhost"
            ? "http://localhost:8081/api/v1"
            :"https://api.keyhome24.com/api/v1";

    private static async fetchWithFallback(endpoint: string, options: RequestInit) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                mode: 'cors',
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn('API call failed, using mock data:', error);
            // Return mock data based on endpoint
            switch (endpoint) {
                case '/annonces':
                    return mockProperties;
                case '/auth/me':
                    return mockUser;
                case '/auth/login':
                    return {
                        token: 'mock-token',
                        user: mockUser
                    };
                default:
                    if (endpoint.startsWith('/annonces/')) {
                        const id = endpoint.split('/').pop();
                        return mockProperties.find(p => p.id === id) || null;
                    }
                    return null;
            }
        }
    }

    static async get(endpoint: string) {
        return this.fetchWithFallback(endpoint, {
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
        return this.fetchWithFallback(endpoint, {
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
        return this.fetchWithFallback(endpoint, {
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
        return this.fetchWithFallback(endpoint, {
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
        return this.fetchWithFallback(endpoint, {
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
