"use client";

import { useActionState, useEffect, useState } from "react";
import { updateProfile } from "@/app/actions/account";
import styles from "@/app/account/page.module.css";

interface ProfileFormProps {
  name: string;
  email: string;
}

export default function ProfileForm({ name, email }: ProfileFormProps) {
  const [state, action, pending] = useActionState(updateProfile, undefined);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!state?.success) {
      return;
    }
    setShowSaved(true);
    const timer = window.setTimeout(() => setShowSaved(false), 1800);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <form className={styles.profileForm} action={action}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.fieldLabel}>Name</label>
        <input
          id="name"
          name="name"
          className={styles.input}
          type="text"
          placeholder="Name"
          disabled={pending}
          defaultValue={name}
        />
        {state?.errors?.name && (
          <p className={styles.fieldError}>{state.errors.name[0]}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.fieldLabel}>Email</label>
        <input
          id="email"
          name="email"
          className={styles.input}
          type="email"
          placeholder="Email"
          disabled={pending}
          defaultValue={email}
        />
        {state?.errors?.email && (
          <p className={styles.fieldError}>{state.errors.email[0]}</p>
        )}
      </div>

      {state?.message && <p className={styles.formError}>{state.message}</p>}

      <div className={styles.profileActions}>
        <button type="submit" className={styles.saveBtn} disabled={pending}>
          {pending ? "Saving..." : "Save changes"}
        </button>
        {showSaved && <span className={styles.savedLabel}>✓ Saved</span>}
      </div>
    </form>
  );
}
