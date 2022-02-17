import {Button} from '../../components/button/button';
import {ProfileHeader} from './profileHeader/profileHeader';
// @ts-ignore
import photo from './images/photo.png';
import {ProfileInformation} from '../../modules/profile/profileInformation/profileInformation';
import './profile.scss';
import {formValidate} from '../../utils/formValidate';
import {profileInformation} from './mocks/mocks';
import {Block} from '../../utils/block';
import {renderTemplate} from '../../utils/renderTemplate';
import {FrameTemplate} from '../../components/frame/frame.tmpl';
import {router} from '../../index';
import {auth} from '../../api/authApi';
import {apiUrl} from '../../constants';

function callback() {
	const button = document.querySelector('.btn__change');
	if (button) {
		button!.addEventListener('click', () => router().go('/profileEdit'))
	}
	const buttonPassword = document.querySelector('.btn__password');
	if (buttonPassword) {
		buttonPassword!.addEventListener('click', () => router().go('/passwordEdit'))
	}
	const buttonQuit = document.querySelector('.btn__quit');
	if (buttonQuit) {
		buttonQuit!.addEventListener('click', () => {
			auth.logout().then(() => router().go('/')).catch(console.log)
		})
	}
	const inputAvatar: HTMLInputElement | null = document.querySelector('.input__file');
	if (inputAvatar) {
		inputAvatar.addEventListener('click', (e) => {
			e.preventDefault();
		})
	}
	formValidate(() => {});
}

const buttons = () => [
	new Button({title: 'Изменить данные', className: 'btn__violet btn__change'}).render(),
	new Button({title: 'Изменить пароль', className: 'btn__violet btn__password', type: 'button'}).render(),
	new Button({title: 'Выйти', type: 'button', className: 'btn__quit'}).render(),
].join('');

export class Profile extends Block {
	userData = {}
	constructor() {
		super('main', {
            userData: {},
        });
	}

	componentDidMount() {
		// @ts-ignore
		auth.userProfile().then(result => this.setProps({...this.props, userData: JSON.parse(result.response)})).then(() => callback())
			.catch(console.log);
	}

	public render() {
		console.log(this.props.userData)
		return renderTemplate(FrameTemplate, {
				frameHeader: new ProfileHeader({
					link: this.props.userData.avatar ? `${apiUrl}/resources${this.props.userData.avatar}`: photo,
					name: this.props.userData.first_name
				}).render(),
				inputFields: new ProfileInformation(profileInformation(this.props.userData)).render(),
				buttons: buttons(),
				className: 'frame__wider'
			});
	}
}
