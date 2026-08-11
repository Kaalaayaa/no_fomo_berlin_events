"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleSaveEvent } from "@/app/actions/events";
import styles from "./SaveButton.module.css";

interface SaveButtonProps {
  eventId: string;
  initialSaved: boolean;
  onCard?: boolean;
  className?: string;
}

export default function SaveButton({
  eventId,
  initialSaved,
  onCard = false,
  className = "",
}: SaveButtonProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const next = !saved;
    setSaved(next);

    startTransition(async () => {
      const result = await toggleSaveEvent(eventId);
      if (result?.error === "not-authenticated") {
        setSaved(!next);
        router.push("/signin");
        return;
      }
      if (result?.error) {
        setSaved(!next);
      }
    });
  }

  return (
    <button
      type="button"
      className={`${styles.btn} ${saved ? styles.saved : ""} ${onCard ? styles.onCard : ""} ${className}`}
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved events" : "Save event"}
      title={saved ? "Saved — click to remove" : "Save this event"}
    >
      <svg viewBox="0 0 14 16" aria-hidden="true">
        <path d="M1 1h12v14l-6-4.5L1 15z" />
      </svg>
    </button>
  );
}
