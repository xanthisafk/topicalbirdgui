import "@styles/components/ui/button.css";

const Button = ({
    variant = 'primary',
    isIcon = false,
    className = '',
    children,
    ...props
}) => {
    const getVariantClass = () => {
        if (isIcon) return styles['btn-icon'];
        
        switch (variant) {
            case 'secondary':
                return 'btn-secondary';
            case 'danger':
                return 'btn-danger';
            case 'outlined':
                return 'btn-outlined';
            case 'primary':
            default:
                return 'btn-primary'; 
        }
    };

    const buttonClassName = [
        'btn',
        getVariantClass(),
        className
    ].join(' ');

    return (
        <button
            className={buttonClassName}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;