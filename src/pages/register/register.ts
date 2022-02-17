import {Input} from '../../components/input/input';
import {Button} from '../../components/button/button';
import {inputFields} from './mocks/mocks';
import {Block} from '../../utils/block';
import {renderTemplate} from '../../utils/renderTemplate';
import {FrameTemplate} from '../../components/frame/frame.tmpl';
import {router} from '../../index';
import {formValidate} from '../../utils/formValidate';
import {auth} from '../../api/authApi';
import {IFrameProps} from '../../components/frame/types';


const action = (data:IFrameProps) => {
	auth.signUp({data}).then(() => router().go('/messages')).catch(console.log)
}

const callback = () => {
	const button = document.querySelector('.btn__login');
	button!.addEventListener('click', () => router().go('/'))
	formValidate(action);
}

const buttons = () => [
	new Button({title: 'Зарегистрироваться', type: 'submit', className: 'btn__register'}).render(),
	new Button({title: 'Войти', type: 'button', className: 'btn__login'}).render(),
].join('');

export class Register extends Block {
	constructor() {
		super('main', {
			callback
		});
	}

	public render() {
		return renderTemplate(FrameTemplate, {
			frameHeader: '<h1>Регистрация</h1>',
			inputFields: new Input(inputFields).render(),
			buttons: buttons(),
		});
	}
}
