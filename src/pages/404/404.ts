import {Button} from '../../components/button/button';
import './404.scss';
import {Block} from '../../utils/block';
import {renderTemplate} from '../../utils/renderTemplate';
import {ErrorTemplate} from '../../components/error/error.tmpl';
import '../../components/error/error.scss';
import {router} from '../../index';

function callback() {
	const button = document.querySelector('button');
	button!.addEventListener('click', () => router().go('/500'))
}

export class Error404 extends Block {
	constructor() {
	super('main', {
		callback
	});
	}

	public render() {
		return renderTemplate(ErrorTemplate, {
			error_num: '404',
			message: 'Данной страницы не существует',
			button: new Button({
				title: 'Назад', className: 'btn__transparent',
			}).render()
		});
	}
}

