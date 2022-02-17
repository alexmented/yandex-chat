import './chatModal.scss';
import {renderTemplate} from '../../../utils/renderTemplate';
import {Block} from '../../../utils/block';
import {ChatModalTemplate} from './chatModal.tmpl';
import {IChatModalProps} from './types';

export class ChatModal extends Block {
    constructor(props: IChatModalProps) {
        super('div', props);
    }

    public render() {
        return renderTemplate(ChatModalTemplate, this.props);
    }
}
