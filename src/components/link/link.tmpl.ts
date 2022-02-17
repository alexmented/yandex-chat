export function LinkTemplate() {
    return `
        <a class='link {{className}}' href='{{href}}' target='{{target}}'>{{{children}}}</a>
`;
}
