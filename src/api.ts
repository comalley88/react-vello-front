export const baseUrl = "http://localhost:1337";

const apiUrls = {
    base: baseUrl,
    register: {
        user: `${baseUrl}/api/auth/local/register`,
    },
    auth: {
        signIn: `${baseUrl}/api/auth/local`,
    },
    listings: {
        all: `${baseUrl}/api/bike-listings`,
    }
}

export default apiUrls;