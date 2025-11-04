import { ResetPassword } from '@/components/auth/reset-password';
import { Suspense } from 'react';

function ResetPasswordContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ResetPassword />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
