import EventBus from './eventBus';
import {isEqual} from './queryString';

export class Block {
    static EVENTS = {
    	INIT: 'init',
    	FLOW_CDM: 'flow:component-did-mount',
    	FLOW_CDU: 'flow:component-did-update',
    	FLOW_RENDER: 'flow:render',
    };

    _element: HTMLElement | null = null;
	readonly _meta: {
		tagName: string,
		props: Record<string, any>
	}
    eventBus: () => EventBus;
    props: Record<string, any>
	oldProps: { [key: string]: any };

    constructor(tagName = 'div', props:Record<string, any> = {}) {
    	const eventBus = new EventBus();
    	this._meta = {
    		tagName,
    		props,
    	};

    	this.props = this._makePropsProxy(props);
		this.oldProps = {}

    	this.eventBus = () => eventBus;

    	this.registerEvents(eventBus);
    	eventBus.emit(Block.EVENTS.INIT);
    }

    private registerEvents(eventBus:EventBus):void {
    	eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    	eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    	eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    	eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private createResources():void {
    	const {tagName} = this._meta;
		this._element = this._createDocumentElement(tagName);
    }

    init():void {
    	this.createResources();
    	this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount():void {
    	this.componentDidMount();
    	this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() {}

	private _componentDidUpdate(): void {
		const response = this.componentDidUpdate(this.oldProps, this.props);
		if (response) {
			this._componentDidMount();
		}
	}

	componentDidUpdate(oldProps: { [key: string]: any }, newProps: { [key: string]: any }): boolean {
		return !isEqual(oldProps, newProps);
	}

    setProps = (nextProps: { [key: string]: any }) => {
    	if (!nextProps) {
    		return;
    	}

		this.oldProps = {...this.props};

		Object.keys(nextProps).forEach(key => {
			this.props[key] = nextProps[key];
		});
		this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };

    element():HTMLElement | null {
    	return this._element;
    }

    private _render() {
    	const block = this.render();
    	// @ts-ignore
		this._element!.innerHTML! = block;
   }

    render():void {}

    getContent(): HTMLElement | null {
    	return this.element();
    }

	private _makePropsProxy(props: object): ProxyHandler<object> {
		return new Proxy(props, {
			get(target: { [key: string]: any }, prop: string) {
				if (prop.indexOf('_') === 0) {
					throw new Error('Отказано в доступе');
				}

				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: { [key: string]: any }, prop: string, value: any) {
				target[prop] = value;
				return true;
			},
			deleteProperty() {
				throw new Error('Отказано в доступе');
			}
		});
	}

    _createDocumentElement(tagName:string): HTMLElement {
    	return document.createElement(tagName);
    }

    show():void {
    	this.getContent()!.style.display = 'block';
    }

    hide():void {
    	this.getContent()!.style.display = 'none';
    }
}

export function renderBlock(query: string, block: Block) {
	const root = document.querySelector(query);
	root!.innerHTML = ''
	root!.appendChild(block.getContent()!);
	if (block.props.callback) {
		block.props.callback()
	}
}

