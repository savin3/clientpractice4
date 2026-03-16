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
            .then(response => response.json())
            .then(result => resolve(result.data.user_token))
            .catch((error) => {
                reject(error);
            });
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