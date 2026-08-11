import Link from "next/link";
import { requireUser } from "@/lib/dal";
import { logout } from "@/app/actions/auth";
import ProfileForm from "@/components/ProfileForm";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import styles from "./page.module.css";

export default async function AccountPage() {
  const user = await requireUser("/account");

  const firstName = (user.name || user.email).split(" ")[0];
  const initial = (user.name || user.email).trim().slice(0, 1).toUpperCase();

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>{initial}</div>
          <div>
            <div className={styles.label}>— Account</div>
            <h1 className={styles.title}>
              Hey, <em>{firstName}.</em>
            </h1>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.label}>— Profile</div>
          <ProfileForm name={user.name} email={user.email} />

          <div className={styles.membership}>
            <div className={styles.label}>— Membership</div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Password</span>
              <Link
                href="mailto:hello@nofomo.berlin?subject=Password%20reset"
                className={styles.rowLink}
              >
                Change →
              </Link>
            </div>
          </div>

          <form action={logout}>
            <button type="submit" className={styles.signOutBtn}>
              Sign out
            </button>
          </form>

          <DeleteAccountButton />
        </div>
      </div>
    </main>
  );
}
