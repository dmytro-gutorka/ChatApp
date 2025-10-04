import './modal.css'

import {ModalContext, useModalContext} from "./context";
import {useState} from "react";
import Button from "../Button";


export default function ModalRoot({children}) {
    const [isModalOpen, setModalOpen] = useState(false)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    return <ModalContext value={{ isModalOpen, openModal, closeModal}}>{children}</ModalContext>
}

function Container({children}) {
    const { isModalOpen, closeModal } = useModalContext()

    return (
        <>
            {isModalOpen &&
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

function OpenButton({clsName, children}) {
    const { openModal } = useModalContext()

    return (<Button clsName={clsName} onClick={openModal}>{children}</Button>)
}

function Header({children, subHeader}) {
    const { closeModal } = useModalContext()

    return (
        <div className="modal-header-container">
            <button className="modal-close-button" onClick={closeModal}>
                ×
            </button>
            {children && <h2 className="modal-title">{children}</h2>}
            <p>{subHeader}</p>
        </div>
    )
}

function Content({children, }) {
    const { closeModal } = useModalContext()

    return <div >{typeof children === 'function' ? children({ closeModal }) : children}</div>
}


ModalRoot.Container = Container;
ModalRoot.OpenButton = OpenButton;
ModalRoot.Header = Header;
ModalRoot.Content = Content;

