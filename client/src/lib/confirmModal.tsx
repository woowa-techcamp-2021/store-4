type ConfirmHandler = () => void;

class ConfirmModalHelper {
  show(title: string, content: string, onConfirm: ConfirmHandler) {
    const modalTitle = document.querySelector<HTMLDivElement>('.confirm-modal-title');
    if (modalTitle !== null) {
      modalTitle.innerText = title;
    }

    const modalContent = document.querySelector<HTMLDivElement>('.confirm-modal-content');
    if (modalContent !== null) {
      modalContent.innerText = content;
    }

    const confirmButton = document.querySelector<HTMLButtonElement>(
      '.confirm-modal-confirm-button'
    );
    if (confirmButton !== null) {
      confirmButton.onclick = () => {
        onConfirm();
        modal?.classList.add('hide');
      };
    }

    const modal = document.querySelector<HTMLDivElement>('.confirm-modal');
    if (modal !== null) {
      modal.classList.remove('hide');
      modal.onclick = () => {
        modal?.classList.add('hide');
      };
    }
  }
}

export default new ConfirmModalHelper();
