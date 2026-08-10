"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

export default function SignUpPage() {
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
      }, 900);
    }, 800);
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.label}>— Become a member</div>

        <h1 className={styles.title}>
          Create an account
        </h1>

        {!submitted ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.fieldLabel}>
                Name
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                autoComplete="given-name"
                placeholder="First name or alias"
                required
                disabled={loading}
              />
            </div>

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
                autoComplete="new-password"
                placeholder="Choose a password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account →"}
            </button>
          </form>
        ) : (
          <div className={styles.signInSuccess}>
            <div className={styles.successLabel}>✓ Welcome.</div>
            <p className={styles.successText}>Sending you home...</p>
          </div>
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
