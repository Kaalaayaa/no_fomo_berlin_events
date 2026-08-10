"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

export default function SignInPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitTimer = useRef<number | null>(null);
  const redirectTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimer.current !== null) {
        window.clearTimeout(submitTimer.current);
      }

      if (redirectTimer.current !== null) {
        window.clearTimeout(redirectTimer.current);
      }
    };
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    submitTimer.current = window.setTimeout(() => {
      setSubmitted(true);
      setLoading(false);

      redirectTimer.current = window.setTimeout(() => {
        router.push("/");
      }, 1200);
    }, 800);
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.label}>— Sign in</div>

        <h1 className={styles.title}>
          Welcome <em>back.</em>
        </h1>

        <p className={styles.subtitle}>Sign in with your email and password.</p>

        {!submitted ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.fieldLabel}>
                Email
              </label>
              <input
                id="email"
                className={styles.input}
                type="email"
                autoComplete="email"
                placeholder="you@queer.berlin"
                required
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.fieldLabel}>
                Password
              </label>
              <input
                id="password"
                className={styles.input}
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                disabled={loading}
              />
            </div>

            <div className={styles.actions}>
              <Link
                href="mailto:hello@nofomo.berlin?subject=Password%20reset"
                className={styles.forgotLink}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>
        ) : (
          <div className={styles.signInSuccess}>
            <div className={styles.successLabel}>✓ You&apos;re in.</div>
            <p className={styles.successText}>Redirecting you home...</p>
          </div>
        )}

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
