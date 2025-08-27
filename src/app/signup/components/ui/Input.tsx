
interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    required?: boolean;
    className?: string;
    error?: string;
}

export function Input({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
    required = false,
    className = "",
    error
}: InputProps) {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-[#121224] mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded p-2"
                required={required}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}