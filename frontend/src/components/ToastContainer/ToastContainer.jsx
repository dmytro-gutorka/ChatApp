import './toast.css';

export default function ToastContainer({ toasts, onClose }) {
  return (
    <div className="toast-stack" role="region" aria-live="polite" aria-atomic="false">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
          <span className="toast-text">{toast.text}</span>
          <button className="toast-close" aria-label="close" onClick={() => onClose(toast.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
