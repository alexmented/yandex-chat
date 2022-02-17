import {expect} from 'chai';
import jsdom from 'jsdom-global';
import {Router} from './router';
import {Block} from './block';
import {renderTemplate} from './renderTemplate';

const index = `<!DOCTYPE HTML>
<html lang='ru'>
<head>
    <meta charset='utf8'>
    <title>Вход</title>
</head>
<body>
<main class='root'></main>
<script src='./index.ts'></script>
</body>
</html>`;

describe('Проверяем переходы у Роута', () => {
    let _router: Router | null = null;
    class FB extends Block {
        constructor() {
            super('main', {});
        }

        public render() {
            return renderTemplate(() => '<div>1</div>', this.props);
        }
    }
    beforeEach(() => {
        jsdom(index, {url: 'http://localhost'});
        _router = new Router('.root');
        _router
            .use('/404', FB)
            .use('/500', FB)
            .start();
    })

    afterEach(() => {
        _router = null;
    })


    it('Метод go выполняет переход на другую страницу', () => {
        const expectedResult = 'http://localhost/500';
        _router!.go('/500')
        expect(window.location.href).be.equal(expectedResult);
    });

    it('Метод back возвращает на предыдущую страницу', () => {
        const expectedResult = 'http://localhost/';
        _router!.go('/500')
        _router!.back()
        expect(window.location.href).be.equal(expectedResult);
    });
});
