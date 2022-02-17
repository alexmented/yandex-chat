import {HTTPTransport, Options} from '../utils/http';
import {apiUrl} from '../constants';

const chatAPIInstance = new HTTPTransport(`${apiUrl}/chats`);

class ChatsAPI {
    createChat(options: Options) {
        return chatAPIInstance.post('/', options);
    }

    getChats() {
        return chatAPIInstance.get('/');
    }

    addUsers(options: Options) {
        return chatAPIInstance.put('/users', options);
    }

    deleteUsers(options: Options) {
        return chatAPIInstance.delete('/users', options);
    }

    getChatToken(id: string) {
        return chatAPIInstance.post(`/token/${id}`);
    }
}

export const chats = new ChatsAPI();
