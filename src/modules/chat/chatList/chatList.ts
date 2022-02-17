import './chatList.scss';
import {renderTemplate} from '../../../utils/renderTemplate';
import {Block} from '../../../utils/block';
import {IChatListProps} from './types';
import {ChatListTemplate} from './chatList.tmpl';

export class ChatList extends Block {
	constructor(props: IChatListProps) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(ChatListTemplate, this.props);
	}
}
