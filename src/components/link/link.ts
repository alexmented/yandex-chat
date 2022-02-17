import {LinkTemplate} from './link.tmpl';
import {renderTemplate} from '../../utils/renderTemplate';
import {Block} from '../../utils/block';
import {ILinkProps} from './types';
import './link.scss';

export class Link extends Block {
    constructor(props: ILinkProps) {
        super('div', props);
        this.props = props;
    }

    render() {
        return renderTemplate(LinkTemplate, this.props);
    }
}