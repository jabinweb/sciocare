"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LoginDialogProps {
  defaultOpen?: boolean;
  onClose?: () => void;
  callbackUrl?: string;
}

// Custom SignIn content component for dialog use
function SignInContent({ callbackUrl = '/dashboard', onNavigateAway }: { callbackUrl?: string; onNavigateAway?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl });
    } catch (error: unknown) {
      console.error('Google Sign-in Error:', error);
      setError('Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle Sign Up
    if (isSignUp) {
      try {
        setIsLoading(true);
        setError(null);
        
        // Create account
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.error || 'Failed to create account');
          return;
        }
        
        // Auto sign in after registration
        const result = await signIn('credentials', { 
          email,
          password,
          callbackUrl,
          redirect: false
        });
        
        if (result?.error) {
          setError('Account created but sign-in failed. Please try signing in manually.');
        } else if (result?.ok) {
          window.location.href = callbackUrl;
        }
      } catch (error: unknown) {
        console.error('Registration Error:', error);
        setError('Failed to create account. Please try again.');
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    // Handle Sign In
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await signIn('credentials', { 
        email,
        password,
        callbackUrl,
        redirect: false
      });
      
      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else if (result?.ok) {
        // Successful sign-in, redirect will happen automatically
        window.location.href = callbackUrl;
      }
    } catch (error: unknown) {
      console.error('Credentials Sign-in Error:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
      >
        <div className="relative w-5 h-5 mr-2">
          <Image 
            src="/google.svg" 
            alt="Google"
            fill
            className="object-contain"
            priority
          />
        </div>
        Sign in with Google
      </Button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleCredentialsSignIn} className="space-y-4">
        {isSignUp && (
          <div>
            <Input
              type="text"
              placeholder="Enter your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={isSignUp ? "Create a password (min 6 characters)" : "Enter your password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={isSignUp ? 6 : undefined}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {!isSignUp && (
          <div className="flex justify-end">
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-blue-600 hover:underline"
              onClick={onNavigateAway}
            >
              Forgot Password?
            </Link>
          </div>
        )}
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {isSignUp ? 'Create Account' : 'Sign in'}
        </Button>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
        
        <p className="text-xs text-gray-600 text-center">
          {isSignUp 
            ? 'Or sign in with Google for instant access' 
            : 'New user? Sign in with Google to create an account automatically'}
        </p>
      </form>
    </div>
  );
}

export function LoginDialog({ defaultOpen = false, onClose, callbackUrl = '/dashboard' }: LoginDialogProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { data: session } = useSession();
  const router = useRouter();

  // When the user is already logged in, don't show dialog and redirect
  useEffect(() => {
    if (session?.user && defaultOpen) {
      setOpen(false);
      router.push(callbackUrl);
    }
  }, [session, defaultOpen, router, callbackUrl]);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent dialog from opening
    if (session?.user) {
      router.push(callbackUrl);
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open && !session?.user} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-full"
          onClick={handleButtonClick}
        >
          {session?.user ? 'Dashboard' : 'Sign In'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl text-center">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to continue to your dashboard
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Custom SignIn implementation without Card wrapper */}
          <SignInContent callbackUrl={callbackUrl} onNavigateAway={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}