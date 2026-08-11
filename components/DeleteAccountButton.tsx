"use client";

import { deleteAccount } from "@/app/actions/account";
import styles from "@/app/account/page.module.css";

export default function DeleteAccountButton() {
  return (
    <form
      action={deleteAccount}
      onSubmit={(e) => {
        if (
          !confirm(
            "Delete your account? This can't be undone — your saved events and submissions will be lost."
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className={styles.deleteBtn}>
        Delete account
      </button>
    </form>
  );
}
