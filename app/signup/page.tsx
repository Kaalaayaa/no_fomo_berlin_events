"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/app/actions/auth";
import styles from "./auth.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const [state, action, pending] = useActionState(signup, undefined);

  useEffect(() => {
    if (!state?.success) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      router.push("/");
    }, 1200);

    return () => window.clearTimeout(redirectTimer);
  }, [state?.success, router]);

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.label}>— Become a member</div>

        <h1 className={styles.title}>
          Create an account
        </h1>

        {state?.success ? (
          <div className={styles.success}>
            <div className={styles.successLabel}>✓ Welcome.</div>
            <p className={styles.successText}>Sending you home...</p>
          </div>
        ) : (
        <form className={styles.form} action={action}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.fieldLabel}>
              Name
            </label>
            <input
              id="name"
              name="name"
              className={styles.input}
              type="text"
              autoComplete="given-name"
              placeholder="First name or alias"
              required
              disabled={pending}
              defaultValue={state?.values?.name ?? ""}
            />
            {state?.errors?.name && (
              <p className={styles.fieldError}>{state.errors.name[0]}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.fieldLabel}>
              Email
            </label>
            <input
              id="email"
              name="email"
              className={styles.input}
              type="email"
              autoComplete="email"
              placeholder="you@queer.berlin"
              required
              disabled={pending}
              defaultValue={state?.values?.email ?? ""}
            />
            {state?.errors?.email && (
              <p className={styles.fieldError}>{state.errors.email[0]}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.fieldLabel}>
              Password
            </label>
            <input
              id="password"
              name="password"
              className={styles.input}
              type="password"
              autoComplete="new-password"
              placeholder="Choose a password"
              required
              disabled={pending}
            />
            {state?.errors?.password && (
              <ul className={styles.fieldError}>
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {state?.message && <p className={styles.formError}>{state.message}</p>}

          <button type="submit" className={styles.submitBtn} disabled={pending}>
            {pending ? "Creating account..." : "Create account →"}
          </button>
        </form>
        )}

        <div className={styles.divider}>
          <span className={styles.dividerText}>Already a member?</span>
          <Link href="/signin" className={styles.dividerLink}>
            Sign in →
          </Link>
        </div>
      </div>
    </main>
  );
}
