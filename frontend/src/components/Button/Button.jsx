export default function Button({ hasIcon = false, icon, clsName = '', children }) {


    const mergedCSSClasses = clsName + ' ' + (hasIcon ? 'button-with-icon' : '')

    return (
        <button className={mergedCSSClasses}>
            {hasIcon && icon}
            <span>{children}</span>
        </button>
    )
}