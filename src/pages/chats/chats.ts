import {ChatList} from '../../modules/chat/chatList/chatList';
import {ChatWithoutMessages} from '../../modules/chat/chatWithoutMessages/chatWithoutMessages';
import {ChatSearch} from '../../modules/chat/chatSearch/chatSearch';
import {Button} from '../../components/button/button';
import {Input} from '../../components/input/input';
import {inputField, inputFieldSender} from './mocks/mocks';
import {Block} from '../../utils/block';
import {renderTemplate} from '../../utils/renderTemplate';
import {ChatStructureTemplate} from '../../modules/chat/chatStructure/chatStructure.tmpl';
import '../../modules/chat/chatStructure/chatStructure.scss';
import {chats} from '../../api/chatsApi';
import {ChatSender} from '../../modules/chat/chatSender/chatSender';
import {router} from '../../index';
import {ChatAddCard} from '../../modules/chat/chatAddCard/chatAddCard';
import {ChatModal} from '../../modules/chat/chatModal/chatModal';
import {user} from '../../api/userApi';
import {auth} from '../../api/authApi';
import {apiUrlWS} from "../../constants";
import {IChatProps, IUserProps} from "./types";

function callback(self: Chats) {
	console.log(self)
	const createChatBtn:HTMLButtonElement | null = document.querySelector('.btn__create-chat');
	const createChatInput: HTMLInputElement | null = document.querySelector('.inp__create-chats');
	const chatListElements = document.querySelectorAll('.chatlist__element');
	const btnToProfile = document.querySelector('.btn__toprofile');
	const btnOptions = document.querySelector('.btn__options');
	const btnModal = document.querySelector('.btn__modal');
	const addUserButton = document.querySelector('.btn__add-user');
	const deleteUserButton = document.querySelector('.btn__delete-user');
	const modalWrapper = document.querySelector('.modal__wrapper');
	const modalInput:HTMLInputElement | null = document.querySelector('.modal__inp');
	const chatSenderInput:HTMLInputElement | null = document.querySelector('.chatsender__inp');
	const chatSenderBtn = document.querySelector('.chatsender__btn');
	if (chatListElements.length) {
		Array.from(chatListElements).forEach(list => {
			list.addEventListener('click', (e) => {self.setProps({...self.props, active: (<HTMLElement>e.currentTarget).dataset.chatid})})
		})
	}
	if (createChatBtn && createChatInput) {
		createChatBtn!.onclick = () => chats.createChat({ data: {title: createChatInput.value } }).then(() => router().go('/messages'))
	}

	if (btnToProfile) {
		btnToProfile.addEventListener('click',() => {
			router().go('/settings')
		})
	}

	if (btnOptions) {
		btnOptions.addEventListener('click',() => {
			self.setProps({...self.props, showAddCard: !self.props.showAddCard})
		})
	}

	if (addUserButton) {
		addUserButton.addEventListener('click',() => {
			self.setProps({...self.props, showModal: !self.props.showModal, modalStatus: 'add'})
		})
	}

	if (deleteUserButton) {
		deleteUserButton.addEventListener('click',() => {
			self.setProps({...self.props, showModal: !self.props.showModal, modalStatus: 'delete'})
		})
	}

	if (modalWrapper) {
		modalWrapper.addEventListener('click', (e) => {
			if ((<HTMLElement>e.target).classList.contains('modal__wrapper')) {
				self.setProps({...self.props, showModal: !self.props.showModal, modalStatus: ''})
			}
		})
	}

	if (chatSenderBtn) {
		chatSenderBtn.addEventListener('click', () => {
			if (chatSenderInput!.value) {
				chatConnect(self, {
					content: chatSenderInput!.value,
					type: 'message',
				})
			}
		})
	}

	if (btnModal) {
		btnModal.addEventListener('click',(e) => {
			e.preventDefault();
			if (self.props.modalStatus === 'add') {
				user.search({data: { login: modalInput!.value}}).then((res: XMLHttpRequest) => {const response = JSON.parse(res.response); return response})
					.then((users: IUserProps[]) => users.filter(user => user.login === modalInput!.value)[0])
					.then((user) => {
						chats.addUsers({data: {users: [user.id], chatId: Number(self.props.active)}})
					})
					.then(() => self.setProps({...self.props, showModal: !self.props.showModal, modalStatus: ''}))

			}
			else {
				user.search({data: { login: modalInput!.value}}).then((res: XMLHttpRequest) => {const response = JSON.parse(res.response); return response})
					.then((users: IUserProps[]) => users.filter(user => user.login === modalInput!.value)[0])
					.then((user) => {
						chats.deleteUsers({data: {users: [user.id], chatId: Number(self.props.active)}})
					})
					.then(() => self.setProps({...self.props, showModal: !self.props.showModal, modalStatus: ''}))
			}
		})
	}
}

const chatConnect = async (self: Chats, obj?: object) => {
	chats.getChats().then((result: XMLHttpRequest) => self.setProps({...self.props, chats: JSON.parse(result.response)}))
	let curObj = obj;
	if (obj === undefined) {
		curObj = {
			content: '0',
			type: 'get old',
		}
	}
	const token = <XMLHttpRequest>await chats.getChatToken(self.props.active?.toString());
	const userInfo = <XMLHttpRequest>await auth.userProfile();
	let sock = new WebSocket(`${apiUrlWS}/chats/${JSON.parse(userInfo.response).id}/${self.props.active}/${JSON.parse(token.response).token}`);
	sock.onopen = () => {
		sock.send(JSON.stringify(curObj));
	}
	sock.addEventListener('message',(event) => {
		self.setProps({
			...self.props, messages: event.data
		})
	})
}

const formatDate = (k: string, v: string) => {
	if (k === 'time') {
		const date = new Date(v);
		return date.toLocaleTimeString();
	}
	return v
}

export class Chats extends Block {
	constructor() {
		super('main', {
			chats: [],
			active: null,
			showAddCard: false,
			showModal: false,
			modalStatus: '',
			messages: null,
		});
	}

	async componentDidMount() {
		const result = <XMLHttpRequest>await chats.getChats();
		if (!this.props.chats.length) {
			await this.setProps({...this.props, chats: JSON.parse(result.response)})
		}
		if (this.props.active) {
			chatConnect(this)
		}
		await callback(this);
	}


	public render() {
		// @ts-ignore
		const activeChat: IChatProps = this.props.active ? this.props.chats.filter(el => el.id === Number(this.props.active))[0] : [];
		console.log(this.props.messages)
		return renderTemplate(ChatStructureTemplate, {
			leftElement: [
				new ChatSearch({
					topElement: new Button({title: 'Профиль', className: 'btn__transparent btn__toprofile'}).render(),
					bottomElement: new Input(inputField).render(),
					createChatButton: new Button({title: 'Создать чат', className: 'btn__create-chat'}).render()}).render(),
				new ChatList({ element: this.props.chats }).render(),
			].join(''),
			rightElement: activeChat.title ?
				new ChatSender({message: Array.isArray(JSON.parse(this.props.messages)) ? JSON.parse(this.props.messages, formatDate).reverse() : [],
					addCard: this.props.showAddCard ? new ChatAddCard({addUserButton: new Button({title: 'Добавить пользователя', className: 'btn__add-user'}).render(),
					deleteUserButton: new Button({title: 'Удалить пользователя', className: 'btn__delete-user'}).render() }).render() : '',
					optionsButton: new Button({title: 'Опции', className: 'btn__transparent btn__options'}).render(),
					name: activeChat.title, senderInput: new Input(inputFieldSender).render(),
					senderBtn: new Button({title: 'Отправить', className: 'chatsender__btn'}).render()}).render()
				: new ChatWithoutMessages({text: 'Выберите чат для просмотра истории переписки'}).render(),
				modal: this.props.showModal ? new ChatModal({modalHeader: this.props.modalStatus === 'add' ? 'Добавить пользователя' : 'Удалить пользователя',
				submitButton: new Button({title: 'Сохранить', className: 'btn__transparent btn__modal', type: 'button'}).render()}).render() : ''});
	}
}
