import {Input} from '../../components/input/input';
import {Button} from '../../components/button/button';
import {formValidate} from '../../utils/formValidate';
import {inputFields} from './mocks/mocks';
import {Block} from '../../utils/block';
import '../../components/frame/frame.scss';
import {renderTemplate} from '../../utils/renderTemplate'
import {FrameTemplate} from '../../components/frame/frame.tmpl';
import {router} from '../../index';
import {auth} from '../../api/authApi';
import {IFrameProps} from '../../components/frame/types';

const action = (data:IFrameProps) => {
	auth.signIn({data}).then((res: XMLHttpRequest) => {
		if (res.responseText === 'OK') {
			router().go('/messages')
		}
		else {
			throw new Error('Неверные данные')
		}
	}).catch(console.log)
}

const callback = () => {
	const button = document.querySelector('.btn__register');
	if (button) {
		button.addEventListener('click', () => router().go('/sign_up'))
	}
	formValidate(action);
}

const buttons = () => [
	new Button({title: 'Регистрация', type: 'button', className: 'btn__register'}).render(),
	new Button({title: 'Войти', type: 'submit'}).render(),
].join('');

export class LogIn extends Block {
	constructor() {
		super('main', {
			callback
		});
	}

	public render() {
		return renderTemplate(FrameTemplate, {
			frameHeader: '<h1>Вход</h1>',
			inputFields: new Input(inputFields).render(),
			buttons: buttons(),
		});
	}
}

