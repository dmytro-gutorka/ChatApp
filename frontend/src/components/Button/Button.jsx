export default function Button({ hasIcon = false, icon, clsName = '', children, onClick }) {


    const mergedCSSClasses = clsName + ' ' + (hasIcon ? 'button-with-icon' : '')

    return (
        <button onClick={onClick} className={mergedCSSClasses}>
            {hasIcon && icon}
            <span className="icon-container">{children}</span>
        </button>
    )
}