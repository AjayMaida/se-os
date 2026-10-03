import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" className="font-bold text-3xl text-primary mb-6">
            SE-OS
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
