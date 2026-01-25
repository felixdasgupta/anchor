import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6">
        <h1 className="text-xl font-semibold">Anchor</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Sign in to view your dashboard.
        </p>
        <Link
          href="/api/auth/login"
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Continue with Auth0
        </Link>
      </div>
    </main>
  );
}
