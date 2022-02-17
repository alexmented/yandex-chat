export function ChatSearchTemplate() {
	return `
    <div class='search__wrapper {{className}}'>
        <div class='search__top'>
            {{{topElement}}}
        </div>
        <div class='search__bottom'>
            {{{bottomElement}}}
        </div>
        <div class='create__chat'>
        	{{{createChatButton}}}
		</div>
    </div>
`;
}
