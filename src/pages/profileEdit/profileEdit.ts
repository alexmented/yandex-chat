import {Block} from '../../utils/block';
import {ProfileHeader} from '../profile/profileHeader/profileHeader';
// @ts-ignore
import photo from '../profile/images/photo.png';
import {Input} from '../../components/input/input';
import {inputFields} from '../profile/mocks/mocks';
import {renderTemplate} from '../../utils/renderTemplate';
import {FrameTemplate} from '../../components/frame/frame.tmpl';
import {Button} from '../../components/button/button';
import {user} from '../../api/userApi';
import {router} from '../../index';
import {formValidate} from '../../utils/formValidate';
import {auth} from '../../api/authApi';
import {IFrameProps} from '../../components/frame/types';
import {apiUrl} from "../../constants";


const action = (data:IFrameProps) => {
    user.changeProfile({data}).then(() => router().go('/settings')).catch(console.log)
}

const callback = () => {
    const buttonEdit = document.querySelector('.btn__back');
    if (buttonEdit) {
        buttonEdit!.addEventListener('click', () => router().back())
    }
    const formAvatar: HTMLFormElement | null = document.querySelector('.form__avatar');
    const inputAvatar: HTMLInputElement | null = document.querySelector('.input__file');
    const img: HTMLImageElement | null = document.querySelector('img');
    if (formAvatar && inputAvatar) {
        function handleFiles() {
            const formData: FormData = new FormData();
            formData.append('avatar', this.files[0]);
            img!.src = window.URL.createObjectURL(this.files[0]);
            user.changeAvatar({
                headers: {
                    'accept': 'application/json'
                },
                data: formData
            }).catch(console.log);
        }
        inputAvatar.addEventListener('change', handleFiles)
    }
    formValidate(action);
}
const buttonsEdit = () => [
    new Button({title: 'Сохранить', className: 'btn__save', type: 'submit'}).render(),
    new Button({title: 'Назад', className: 'btn__violet btn__back', type: 'button'}).render(),
].join('');

export class ProfileEdit extends Block {
    userData = {}
    constructor() {
        super('main', {
            userData: {}
        });
    }

    componentDidMount() {
        // @ts-ignore
        auth.userProfile().then(result => this.setProps({...this.props, userData: JSON.parse(result.response)})).then(() => callback())
            .catch(console.log);
    }

    public render() {
        return renderTemplate(FrameTemplate, {frameHeader: new ProfileHeader({
                    link: this.props.userData.avatar ? `${apiUrl}/resources${this.props.userData.avatar}`: photo,
                    name: this.props.userData.first_name
                }).render(),
                inputFields: new Input(inputFields(this.props.userData)).render(),
                buttons: buttonsEdit(),
                className: 'frame__edit'});
    }
}
