import './chatAddCard.scss';
import {renderTemplate} from '../../../utils/renderTemplate';
import {Block} from '../../../utils/block';
import {IChatAddCardProps} from './types';
import {ChatAddCardTemplate} from './chatAddCard.tmpl';

export class ChatAddCard extends Block {
    constructor(props: IChatAddCardProps) {
        super('div', props);
    }

    public render() {
        return renderTemplate(ChatAddCardTemplate, this.props);
    }
}
