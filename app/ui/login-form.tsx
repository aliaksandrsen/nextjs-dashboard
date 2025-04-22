'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

const authenticateWithCredentials = (
  prevState: string | undefined,
  formData: FormData
) => {
  return authenticate(prevState, formData, 'credentials');
};

const authenticateWithGithub = (
  prevState: string | undefined,
  formData: FormData
) => authenticate(prevState, formData, 'github');

const authenticateWithGoogle = (
  prevState: string | undefined,
  formData: FormData
) => authenticate(prevState, formData, 'google');

const authenticateWithYandex = (
  prevState: string | undefined,
  formData: FormData
) => authenticate(prevState, formData, 'yandex');

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [credentialsErrorMessage, credentialsFormAction, isPending] =
    useActionState(authenticateWithCredentials, undefined);

  const [githubErrorMessage, githubformAction, githubIsPending] =
    useActionState(authenticateWithGithub, undefined);

  const [googleErrorMessage, googleformAction, googleIsPending] =
    useActionState(authenticateWithGoogle, undefined);

  const [yandexErrorMessage, yandexformAction, yandexIsPending] =
    useActionState(authenticateWithYandex, undefined);

  return (
    <>
      <form action={credentialsFormAction} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Please log in to continue.
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <Button className="mt-4 w-full" aria-disabled={isPending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {credentialsErrorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">
                  {credentialsErrorMessage}
                </p>
              </>
            )}
          </div>
        </div>
      </form>
      <form action={githubformAction}>
        <Button
          className="mt-2 w-full bg-gray-700 hover:bg-gray-600"
          aria-disabled={githubIsPending}
        >
          Log in with GitHub
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        {githubErrorMessage && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{githubErrorMessage}</p>
          </div>
        )}
      </form>
      <form action={googleformAction}>
        <Button
          className="mt-2 w-full bg-green-700 hover:bg-green-600"
          aria-disabled={googleIsPending}
        >
          Log in with Google
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        {googleErrorMessage && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{googleErrorMessage}</p>
          </div>
        )}
      </form>
      <form action={yandexformAction}>
        <Button
          className="mt-2 w-full bg-red-600 hover:bg-red-400"
          aria-disabled={yandexIsPending}
        >
          Log in with Yandex
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        {yandexErrorMessage && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{yandexErrorMessage}</p>
          </div>
        )}
      </form>
    </>
  );
}
