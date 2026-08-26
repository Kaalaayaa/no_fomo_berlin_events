"use client";

import { Suspense, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/actions/auth";
import styles from "./auth.module.css";

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.label}>— Sign in</div>

        <h1 className={styles.title}>
          Welcome back
        </h1>

        <p className={styles.subtitle}>Sign in with your email and password.</p>

        <form className={styles.form} action={action}>
          <input type="hidden" name="redirectTo" value={redirectTo} />
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
              autoComplete="current-password"
              placeholder="Password"
              required
              disabled={pending}
            />
            {state?.errors?.password && (
              <p className={styles.fieldError}>{state.errors.password[0]}</p>
            )}
          </div>

          {state?.message && <p className={styles.formError}>{state.message}</p>}

          <div className={styles.actions}>
            <Link
              href="mailto:hello@nofomo.berlin?subject=Password%20reset"
              className={styles.forgotLink}
            >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={pending}>
            {pending ? "Signing in..." : "Sign in →"}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>No account yet?</span>
          <Link href="/signup" className={styles.dividerLink}>
            Become a member →
          </Link>
        </div>
      </div>
    </main>
  );
}
