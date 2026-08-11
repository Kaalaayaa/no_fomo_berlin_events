"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import styles from "./UserMenu.module.css";

interface UserMenuProps {
  name: string;
}

export default function UserMenu({ name }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const firstName = name.split(" ")[0] || name;

  useEffect(() => {
    if (!open) {
      return;
    }

    function onPointerDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {firstName}
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          <Link
            href="/account"
            className={styles.menuRow}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Account
          </Link>
          <Link
            href="/my-events"
            className={styles.menuRow}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            My Events
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className={`${styles.menuRow} ${styles.danger}`}
              role="menuitem"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
