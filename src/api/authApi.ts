import {HTTPTransport, Options} from '../utils/http';
import {apiUrl} from '../constants';

const authAPIInstance = new HTTPTransport(`${apiUrl}/auth`);

class AuthAPI{
    userProfile() {
        return authAPIInstance.get('/user');
    }

    signUp(options: Options) {
        return authAPIInstance.post('/signup', options);
    }

    signIn(options: Options) {
        return authAPIInstance.post('/signin', options);
    }

    logout() {
        return authAPIInstance.post('/logout');
    }
}

export const auth = new AuthAPI();
