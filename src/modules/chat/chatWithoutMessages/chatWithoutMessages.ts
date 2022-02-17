import {ChatWithoutMessagesTemplate} from './chatWithoutMessages.tmpl';
import './chatWithoutMessages.scss';
import {renderTemplate} from '../../../utils/renderTemplate';
import {Block} from '../../../utils/block';
import {IChatWithoutMessagesProps} from './types';

export class ChatWithoutMessages extends Block {
	constructor(props: IChatWithoutMessagesProps) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(ChatWithoutMessagesTemplate, this.props);
	}
}
