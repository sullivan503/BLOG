import React from 'react';

interface BentoItemProps {
    children?: React.ReactNode;
    className?: string; // For grid spanning e.g., col-span-2
    title?: string;
    label?: string; // New: For the uppercase 'label' like 'Featured Essay'
    description?: string;
    onClick?: () => void;
    variant?: 'default' | 'featured' | 'newsletter';
    date?: string; // Optional Date field
}

const BentoItem: React.FC<BentoItemProps> = ({
    children,
    className = "",
    title,
    label,
    description,
    onClick,
    variant = 'default',
    date
}) => {
    // Base classes
    const baseClasses = "flex flex-col justify-between transition-all duration-300 cursor-pointer group";

    // Variant styles matching disign.html
    const variantClasses = {
        default: "bg-background border border-border p-[35px] hover:border-accent hover:-translate-y-0.5",
        featured: "bg-surface border-none p-[40px] hover:-translate-y-0.5", // Gray box, no border
        newsletter: "bg-background border-2 border-accent p-[35px] hover:bg-red-50"
    };

    return (
        <div
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            <div>
                {/* Header: Label or Date */}
                {(label || date) && (
                    <div className="flex justify-between items-baseline mb-5">
                        {label && (
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent">
                                {label}
                            </span>
                        )}
                        {date && (
                            <span className="font-serif italic text-sm text-secondary">
                                {date}
                            </span>
                        )}
                    </div>
                )}

                {/* Title */}
                {title && (
                    <h3 className="font-display font-bold text-[1.6rem] leading-[1.3] text-primary mb-5 group-hover:text-accent transition-colors">
                        {title}
                    </h3>
                )}

                {/* Description */}
                {description && (
                    <p className="font-serif text-[1rem] leading-relaxed text-secondary mb-6">
                        {description}
                    </p>
                )}

                {/* Custom Body Content */}
                {children}
            </div>

            {/* Footer / Meta (Optional, can be passed as children or part of variants) */}
        </div>
    );
};

export default BentoItem;
