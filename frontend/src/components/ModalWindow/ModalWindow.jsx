import './modal.css'
import { useState } from 'react';
import Button from "../Button";


export default function ModalWindow({ openButtonTitle, children, header = 'Header', onSubmit, formId}) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSubmit() {
        // onSubmit()
        setIsOpen(false)
    }


    return (
        <>
            <Button clsName="aside_new-chat-button" onClick={() => setIsOpen(true)}>{openButtonTitle}</Button>

            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-button" onClick={() => setIsOpen(false)}>
                            ×
                        </button>

                        <h2 className="modal-title">{header}</h2>
                        {children &&           <div>
                            {children}
                        </div>}

                        {/*<div className="modal-actions">*/}
                        {/*    <button className="modal-cancel" onClick={() => setIsOpen(false)}>*/}
                        {/*        Cancel*/}
                        {/*    </button>*/}
                        {/*    <button type="submit" className="modal-ok" onClick={handleSubmit} form={formId}>*/}
                        {/*        Submit*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            )}
        </>
    );
}
