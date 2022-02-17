import './chatSender.scss';
import {renderTemplate} from '../../../utils/renderTemplate';
import {Block} from '../../../utils/block';
import {IChatSenderProps} from './types';
import {ChatSenderTemplate} from './chatSender.tmpl';

export class ChatSender extends Block {
    constructor(props: IChatSenderProps) {
        super('div', props);
    }

    public render() {
        return renderTemplate(ChatSenderTemplate, this.props);
    }
}
