export function ChatAddCardTemplate() {
    return `
    <div class='chatadd__wrapper'>
    <div class='chatadd__item chatadd__add-user'>
        {{{addUserButton}}}
    </div>
    <div class='chatadd__item chatadd__remove-user'>
        {{{deleteUserButton}}}
    </div>
    </div>
`;
}
