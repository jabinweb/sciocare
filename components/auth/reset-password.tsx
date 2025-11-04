'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage({ type: 'error', text: 'Invalid or missing reset token' });
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (!token) {
      setMessage({ type: 'error', text: 'Invalid reset token' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password reset successfully!' });
        setIsSuccess(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to reset password' });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-center">Password Reset Successful!</CardTitle>
          <CardDescription className="text-center">
            Your password has been reset successfully. Redirecting to sign in...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/auth/login">
            <Button className="w-full">
              Go to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading || !token}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading || !token}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p>Password must:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li className={password.length >= 6 ? 'text-green-600' : ''}>
                Be at least 6 characters long
              </li>
              <li className={password && confirmPassword && password === confirmPassword ? 'text-green-600' : ''}>
                Match confirmation password
              </li>
            </ul>
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading || !token}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ResetPassword;
