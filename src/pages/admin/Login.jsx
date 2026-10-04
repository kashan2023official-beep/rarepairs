import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const from = location.state?.from?.pathname || "/admin/dashboard";

  const onSubmit = async (data) => {
    setAuthError(null);
    const { error } = await signIn(data.email, data.password);
    if (error) {
      setAuthError(error.message);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cream dark:bg-navy">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="font-logo text-5xl text-navy dark:text-cream mb-6">RarePairs</h1>
        <h2 className="font-display text-3xl font-bold tracking-tight text-navy dark:text-cream">
          Admin Portal
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-navy-card py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-navy/5 dark:border-cream/5 mx-4 sm:mx-0">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {authError && (
              <div className="p-3 bg-sold/10 dark:bg-sold-dark/10 border border-sold/20 dark:border-sold-dark/20 rounded text-sold dark:text-sold-dark text-sm text-center">
                {authError}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-1">Email</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full bg-transparent border rounded-lg px-4 py-3 text-navy dark:text-cream focus:ring-1 outline-none transition-colors ${errors.email ? 'border-sold dark:border-sold-dark focus:ring-sold' : 'border-navy/20 dark:border-cream/20 focus:ring-navy dark:focus:ring-cream'}`}
                placeholder="admin@rarepais.com"
              />
              {errors.email && <p className="text-sold dark:text-sold-dark text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-1">Password</label>
              <input
                type="password"
                {...register('password')}
                className={`w-full bg-transparent border rounded-lg px-4 py-3 text-navy dark:text-cream focus:ring-1 outline-none transition-colors ${errors.password ? 'border-sold dark:border-sold-dark focus:ring-sold' : 'border-navy/20 dark:border-cream/20 focus:ring-navy dark:focus:ring-cream'}`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-sold dark:text-sold-dark text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[44px] flex justify-center items-center py-4 rounded-full font-bold bg-navy text-cream hover:bg-navy/90 dark:bg-cream dark:text-navy dark:hover:bg-cream/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
