import {useContext} from "react";
import {ToastContext} from "../components/Toast/Toast";

export default function useToastContext() {
        const ctx = useContext(ToastContext);
        if (!ctx) throw new Error('useToast must be used within ToastProvider');
        return ctx;
}