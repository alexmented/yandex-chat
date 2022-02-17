import {Router} from './utils/router';
import {Error404} from './pages/404/404';
import {Error500} from './pages/500/500';
import {LogIn} from './pages/login/login';
import {Register} from './pages/register/register';
import {Chats} from './pages/chats/chats';
import {Profile} from './pages/profile/profile';
import {ProfileEdit} from './pages/profileEdit/profileEdit';
import {PasswordEdit} from './pages/profile/passwordEdit/passwordEdit';
import 'regenerator-runtime/runtime';
import './styles/style.scss';

export function router() {
	let _router: Router | null = null;
	_router = new Router('.root');
	_router
		.use('/settings', Profile)
		.use('/404', Error404)
		.use('/500', Error500)
		.use('/', LogIn)
		.use('/sign_up', Register)
		.use('/messages', Chats)
		.use('/profileEdit', ProfileEdit)
		.use('/passwordEdit', PasswordEdit)
		.start();
	return _router;
}

router();
