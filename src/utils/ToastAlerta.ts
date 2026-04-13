import { toast } from 'react-toastify';

const toastConfig = {
    position: 'top-right' as const,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    style: {
        backgroundColor: "#ffffff",
        border: "0.5px solid #e2e8f0",
        borderRadius: "0.75rem",
        color: "#1e1b4b",
        fontSize: "13px",
    }
}

export function ToastAlerta(mensagem: string, tipo: string) {
    switch (tipo) {
        case 'sucesso':
            toast.success(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #3730a3",
                }
            });
            break;

        case 'erro':
            toast.error(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #f87171",
                }
            });
            break;

        case 'info':
        default:
            toast.info(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #60a5fa",
                }
            });
            break;
    }
}