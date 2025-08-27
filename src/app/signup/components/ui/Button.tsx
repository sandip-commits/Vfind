
interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    selected?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Button({ 
    children, 
    onClick, 
    selected = false, 
    disabled = false, 
    // variant = 'primary',
    size = 'md',
    className = '' 
}: ButtonProps) {
    const baseClasses = "inline-flex w-fit rounded-full border transition-colors font-bold";
    
    const sizeClasses = {
        sm: "px-3 py-1 text-[12px]",
        md: "px-4 py-2 text-[14px]",
        lg: "px-6 py-3 text-[16px]"
    };
    
    const variantClasses = selected
        ? "bg-blue-700 text-white"
        : "bg-[#ECEFFD] text-[#2142B9] hover:bg-blue-300 hover:text-white";
    
    const disabledClasses = disabled
        ? "bg-gray-400 cursor-not-allowed text-gray-600"
        : "";

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${sizeClasses[size]} ${disabled ? disabledClasses : variantClasses} ${className}`}
        >
            {children}
        </button>
    );
}