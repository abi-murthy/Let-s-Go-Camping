import React, {useEffect} from 'react';

function Modal({ isOpen, onClose, content }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to reset the overflow when the component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg max-h-[80vh] w-[90vw] md:w-[60vw] lg:w-[40vw] overflow-auto">
                <button onClick={onClose} className="float-right font-bold">X</button>
                <div>{content}</div>
            </div>
        </div>
    );
}

export default Modal;
