export function decodeJwt(token) {
    try {
        // Decodifica el token JWT (segunda parte del payload, base64)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload); // Devuelve el objeto JSON decodificado
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}