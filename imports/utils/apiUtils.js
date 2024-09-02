import axios from 'axios';


const API_BASE_URL = Meteor.settings.public.API_BASE_URL;
const API_TOKEN = Meteor.settings.private.API_TOKEN;

export const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await axios({
            url: `${API_BASE_URL}${endpoint}`,
            method: 'GET',
            headers: {
                'Authorization': `apiKey ${API_TOKEN}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        return response.data;
    } catch (error) {
        let errorMessage = `Error: ${error.response?.statusText} (Status Code: ${error.response?.status})`;

        if (error.response?.status === 401) {
            errorMessage = 'Unauthorized access - maybe invalid API token.';
        } else if (error.response?.status === 403) {
            errorMessage = 'Forbidden access - you do not have permission to access this resource.';
        } else if (error.response?.status === 404) {
            errorMessage = 'Resource not found - the endpoint may be incorrect.';
        } else if (error.response?.status >= 500) {
            errorMessage = 'Server error - try again later or contact support.';
        }
        throw new Meteor.Error('api-request-failed', `API request failed: ${errorMessage}`);
    }
};
