import "@/styles/components/ui/button.css";

const Button = ({
    variant = 'primary',
    isIcon = false,
    className = '',
    onkeydown = null,
    children,
    ...props
}) => {
    const getVariantClass = () => {
        if (isIcon) return "btn-icon";
        
        switch (variant) {
            case 'secondary':
                return 'btn-secondary';
            case 'danger':
                return 'btn-danger';
            case 'outlined':
                return 'btn-outlined';
            case 'glass':
                return 'btn-glass';
            case 'primary':
            default:
                return 'btn-primary';  
        }
    };

    const buttonClassName = [
        'btn',
        getVariantClass(),
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            onKeyDown={onkeydown}
            className={buttonClassName}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;