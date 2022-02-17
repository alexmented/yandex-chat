export interface IChatSenderProps {
    name: string;
    senderBtn: string;
    senderInput: string;
    optionsButton: string;
    addCard: string;
    message: IMessage[];
}

interface IMessage {
    time: string;
    content: string;
}
