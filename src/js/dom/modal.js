const renderModal = () => {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'modal';
    modal.onclick = () => {
        removeModal();
    }

    document.body.appendChild(modal);
}

const removeModal = () => {
    let modal = document.querySelector('#modal');
    modal.remove();
}

export { renderModal, removeModal };