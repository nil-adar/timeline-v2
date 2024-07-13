// Import React and utility functions
import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils'; // Adjust the import path based on your project structure

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className={cn("relative flex flex-col h-[100vh] items-center justify-center", className)} {...props}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn("background-animation",
          showRadialGradient && "radial-gradient-style")}>
          {/* Background layers and animations */}
        </div>
      </div>
      {children}
    </main>
  );
};
