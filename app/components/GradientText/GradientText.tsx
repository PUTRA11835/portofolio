import React, { ReactNode } from 'react';

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

export default function GradientText({
    children,
    className = "",
    colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
    animationSpeed = 8,
    showBorder = false,
}: GradientTextProps) {
    const gradientBackgroundStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <div
            className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium transition-shadow duration-500 overflow-hidden cursor-pointer
                bg-transparent backdrop-filter-none py-2
            ${className}`}
        >
            {showBorder && (
                <div
                    className="gradient-overlay"
                    style={{
                        ...gradientBackgroundStyle,
                    }}
                >
                </div>
            )}
            <div
                className="text-content"
                style={{
                    ...gradientBackgroundStyle,
                }}
            >
                {children}
            </div>
        </div>
    );
}