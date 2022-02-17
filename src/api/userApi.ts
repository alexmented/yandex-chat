import {HTTPTransport, Options} from '../utils/http';
import {apiUrl} from '../constants';

const usersAPIInstance = new HTTPTransport(`${apiUrl}/user`);

class UserAPI {
    changeProfile(options: Options) {
        return usersAPIInstance.put('/profile', options);
    }

    changePassword(options: Options) {
        return usersAPIInstance.put('/password', options);
    }

    changeAvatar(options: Options) {
        return usersAPIInstance.put('/profile/avatar', options);
    }

    search(options: Options) {
        return usersAPIInstance.post('/search', options);
    }
}

export const user = new UserAPI();
