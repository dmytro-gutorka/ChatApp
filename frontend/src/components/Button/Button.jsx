export default function Button({ variant = 'contained', bgColor = 'white', hasIcon = false, clName = '', children }) {
    return (
        <button className={clName}>{children}</button>
    )
}