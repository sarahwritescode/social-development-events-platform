"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";

export default function ProfilePage() {
  const { user, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, router, user]);

  if (isPending || !user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f8f4] px-5 dark:bg-[#14271f]">
        <p className="text-sm font-medium text-[#526157] dark:text-[#c3d0c5]">
          {isPending ? "Loading your profile..." : "Redirecting to login..."}
        </p>
      </main>
    );
  }

  const avatarLetter = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-[70vh] bg-[#f7f8f4] px-5 py-12 dark:bg-[#14271f]">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#245c45] transition hover:bg-[#e8eee5] dark:text-[#c3d0c5] dark:hover:bg-[#30483d]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <section className="mt-8 rounded-2xl border border-[#e5e9e1] bg-white p-6 shadow-sm dark:border-[#30483d] dark:bg-[#18372a] sm:p-9">
          <h1 className="text-2xl font-bold text-[#183d32] dark:text-white">
            My Profile
          </h1>

          <div className="mt-8 flex flex-col items-center gap-5 border-b border-[#e5e9e1] pb-8 dark:border-[#30483d] sm:flex-row">
            {user.image ? (
              <img
                src={user.image}
                alt={`${user.name || "User"} profile`}
                className="h-24 w-24 rounded-full border-2 border-[#245c45] object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#245c45] bg-[#e8eee5] text-3xl font-bold text-[#245c45] dark:bg-[#30483d] dark:text-white">
                {avatarLetter}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-[#183d32] dark:text-white">
                {user.name}
              </h2>
              <p className="mt-1 text-sm text-[#68766c] dark:text-[#bdcabe]">
                Kindora member
              </p>
            </div>
          </div>

          <dl className="divide-y divide-[#e5e9e1] dark:divide-[#30483d]">
            <div className="flex items-center gap-4 py-5">
              <UserRound
                size={19}
                className="shrink-0 text-[#47815c]"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#68766c] dark:text-[#bdcabe]">
                  Name
                </dt>
                <dd className="mt-1 text-sm font-medium text-[#183d32] dark:text-white">
                  {user.name}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-4 py-5">
              <Mail
                size={19}
                className="shrink-0 text-[#47815c]"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#68766c] dark:text-[#bdcabe]">
                  Email
                </dt>
                <dd className="mt-1 break-all text-sm font-medium text-[#183d32] dark:text-white">
                  {user.email}
                </dd>
              </div>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
