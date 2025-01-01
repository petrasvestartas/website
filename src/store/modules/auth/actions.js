let timer;

export default {
    async login(context, payload) {

        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    // AIzaSyDHebBy3OIgDl5p5h0skKgXKoVSc_Jz9Z8
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },

    async auth(context, payload) {
            const mode = payload.mode;
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHebBy3OIgDl5p5h0skKgXKoVSc_Jz9Z8';
            if (mode === 'signup') {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHebBy3OIgDl5p5h0skKgXKoVSc_Jz9Z8';
            }
            const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });


        let responseData;
        try {
            console.log('Response:', response);
            responseData = await response.json();
        } catch (error) {
            console.error('Failed to parse response data:', error);
            throw new Error('Failed to parse response data.');
        }

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
            throw error;
        }

        const expiresIn = +responseData.expiresIn * 1000;
        // const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn; 

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);



        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        });

      
    },

    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
            });
        }
    },


    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        });
    },

    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};