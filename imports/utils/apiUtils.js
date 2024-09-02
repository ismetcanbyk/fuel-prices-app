import axios from 'axios';


const API_BASE_URL = Meteor.settings.public.API_BASE_URL;
const API_TOKEN = Meteor.settings.private.API_TOKEN;

export const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await axios({
            url: `${API_BASE_URL}${endpoint}`,
            method: 'GET', // Varsayılan method olarak GET kullanıyoruz
            headers: {
                'Authorization': `apiKey ${API_TOKEN}`,
                'Content-Type': 'application/json',
                ...options.headers, // Eğer ekstra header'lar varsa ekleniyor
            },
            ...options, // Diğer axios seçenekleri
        });

        return response.data; // Başarılı yanıtı geri döndür
    } catch (error) {
        let errorMessage = `Error: ${error.response?.statusText} (Status Code: ${error.response?.status})`;

        if (error.response?.status === 401) {
            // Yetkilendirme hatası
            errorMessage = 'Unauthorized access - maybe invalid API token.';
        } else if (error.response?.status === 403) {
            // Erişim engellendi
            errorMessage = 'Forbidden access - you do not have permission to access this resource.';
        } else if (error.response?.status === 404) {
            // Kaynak bulunamadı
            errorMessage = 'Resource not found - the endpoint may be incorrect.';
        } else if (error.response?.status >= 500) {
            // Sunucu hatası
            errorMessage = 'Server error - try again later or contact support.';
        }

        // Hata mesajını fırlat
        throw new Meteor.Error('api-request-failed', `API request failed: ${errorMessage}`);
    }
};
