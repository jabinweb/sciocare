'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Password reset link sent to your email.' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to send reset email' });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Forgot Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we&apos;ll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ForgotPassword;
