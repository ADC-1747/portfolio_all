import React from "react";

interface SectionContainerProps {
    children: React.ReactNode;
    variant?: "narrow" | "wide" | "full";
    className?: string;
}

const SectionContainer = ({
    children,
    variant = "narrow",
    className = "",
}: SectionContainerProps) => {
    const maxWidths = {
        narrow: "max-w-3xl",
        wide: "max-w-5xl",
        full: "max-w-7xl",
    };

    return (
        <div
            className={`mx-auto w-full px-8 sm:px-16 ${maxWidths[variant]} ${className}`}
        >
            {children}
        </div>
    );
};

export default SectionContainer;
