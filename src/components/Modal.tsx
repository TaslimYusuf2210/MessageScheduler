import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    width?: string
    height?: string
}

function Modal({isOpen, onClose, children, width = "w-[80%]", height = "h-auto"}: ModalProps) {
    if (!isOpen) {
        return
    }
    return ( 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`bg-white rounded-lg shadow-lg relative ${width} ${height} max-h-[90vh] overflow-auto`}>
                <IoMdClose  
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"/>
                <div>{children}</div>
            </div>
        </div>
     );
}

export default Modal;