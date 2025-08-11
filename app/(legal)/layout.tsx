import { ReactNode } from 'react';

interface LegalLayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
