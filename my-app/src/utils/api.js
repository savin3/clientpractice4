const API = process.env.VUE_APP_API;

export const loginRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(user),
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    reject(data);
                    return;
                }
                resolve(data.data.user_token);
            })
            .catch((error) => reject(error));
    });
};

export const registerRequest = (userData) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(userData),
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    reject(data);
                    return;
                }
                resolve(data);
            })
            .catch((error) => reject(error));
    });
};

export const logoutRequest = () => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('myAppToken')}`
            }
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    reject(data);
                    return;
                }
                resolve(data);
            })
            .catch((error) => reject(error));
    });
};

export const productsRequest = () => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    reject(data);
                    return;
                }
                resolve(data.data);
            })
            .catch((error) => reject(error));
    });
};