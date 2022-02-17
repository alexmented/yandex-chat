import {Block, renderBlock} from './block';

import {expect} from 'chai';
import jsdom from 'jsdom-global';

const index = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Index</title>
</head>
<body>
<div class="app"></div>
</body>
</html>`;

class myBlock extends Block {
    render() {
        return 'testik';
    }
}

describe('Block', () => {
    before(function () {
        this.jsdom = jsdom(index, {url: 'http:localhost'});
    })

    it('renderBlock возвращает html', () => {
        const expectedResult = `<div>testik</div>`;
        renderBlock('.app', new myBlock('div', {}))
        expect(document.querySelector('.app')!.innerHTML).to.be.equal(expectedResult);
    });
})
