export default function Button({ icon, clsName = '', children, onClick }) {
  const mergedCSSClasses = clsName + ' ' + (icon ? 'button-with-icon' : '');

  return (
    <button onClick={onClick} className={mergedCSSClasses}>
      {icon && icon}
      <span className="icon-container">{children}</span>
    </button>
  );
}
