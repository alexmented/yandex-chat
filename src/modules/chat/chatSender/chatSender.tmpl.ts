export function ChatSenderTemplate() {
    return `
        <div class='chatsender__wrapper'>
            <header>
                <div class='chatsender__info'>
                    <div class='chatsender__photo'></div>
                    <div class='chatsender__name'>{{name}}</div>
                </div>
                <div class='chatsender__options'>{{{optionsButton}}}</div>
                {{{addCard}}}
            </header>
            <section class='chatsender__messages'>
                {{#each message}}
                <div class='chatsender__message'>
                    <div class='chatsender__message-content'>{{this.content}}</div>
                    <div class='chatsender__message-time'>{{this.time}}</div>
                </div>
                {{/each}}
            </section>
            <section class='chatsender__sending'>
                {{{senderInput}}}
                {{{senderBtn}}}
            </section>
        </div>
`;
}
