import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {HTTPTransport} from './http';
import {apiUrl} from "../constants";

chai.use(sinonChai);

describe('Тестриование HTTP Transport', () => {
    let request: HTTPTransport;

    beforeEach(() => {
        request = new HTTPTransport(`${apiUrl}/auth`);
    });

    it('Метод get вызывается с корректными параметрами', () => {
        const requestSpy = sinon.spy(request, 'request');
        request.get('/user');

        expect(requestSpy).to.have.been.calledWith(`${apiUrl}/auth/user`, {method: 'GET'});
    });

    it('Метод post вызывается с корректными параметрами', () => {
        const requestSpy = sinon.spy(request, 'request');
        request.post('/search');

        expect(requestSpy).to.have.been.calledWith(`${apiUrl}/auth/search`, {method: 'POST'});
    });

    it('Метод put вызывается с корректными параметрами', () => {
        const requestSpy = sinon.spy(request, 'request');
        request.put('/password');

        expect(requestSpy).to.have.been.calledWith(`${apiUrl}/auth/password`, {method: 'PUT'});
    });
});


