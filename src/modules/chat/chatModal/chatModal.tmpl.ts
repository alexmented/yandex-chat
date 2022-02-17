export function ChatModalTemplate() {
    return `
        <div class='modal__wrapper'>
            <form class='modal__form'>
                        <h2>{{modalHeader}}</h2>
                <label>Ввведите логин
                <input class='modal__inp' type='text'/>
                </label>
            {{{submitButton}}}
            </form>
        </div>
`;
}

