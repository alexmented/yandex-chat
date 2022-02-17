export function ChatListTemplate() {
	return `
        <div class='chatlist__wrapper'>
            {{#each element}}
                <div class='chatlist__element' data-chatid='{{this.id}}'>
                    <div class='chatlist__element-photo'></div>
                    <div class='chatlist__inner'>
                        <div class='chatlist__element-from'>
                            <div class='chatlist__element-from__name'>{{this.title}}</div>
                            <div class='chatlist__element-from__message'>{{this.last_message.content}}</div>
                        </div>
                        <div class='chatlist__element-info'>
                            <div class='chatlist__element-info__time'></div>
                            {{#if this.count}}<div class='chatlist__element-info__count'>{{this.unread_count}}</div>{{/if}}
                        </div>
                    </div>
                </div>
            {{/each}}
        </div>
`;
}
