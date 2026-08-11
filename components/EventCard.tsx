import Link from "next/link";
import Image from "next/image";
import SaveButton from "./SaveButton";
import styles from "./EventCard.module.css";

interface Event {
  id: string;
  title: string;
  tagline: string;
  date: string | Date;
  venue: string;
  category: string;
  audience: string;
  imageUrl: string | null;
  priceMin: number | null;
  priceMax: number | null;
  pricingModel: string | null;
}

interface EventCardProps {
  event: Event;
  size?: "default" | "large";
  /** Pass a boolean to show the save/bookmark button; omit to hide it (e.g. logged-out viewers). */
  savedByMe?: boolean;
}

function formatDate(dateInput: string | Date) {
  const date = new Date(dateInput);
  const day = date.toLocaleDateString("en-GB", { weekday: "short" });
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const h = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${d}.${m} · ${h}:${min}`;
}

function formatPrice(
  min: number | null,
  max: number | null,
  model: string | null,
) {
  if (model === "Free") return "Free";
  if (model === "PWYC") return "PWYC";
  if (model === "Donation") return "Donation";
  if (min !== null && max !== null && min !== max) return `${min}–${max} €`;
  if (min !== null) return `${min} €`;
  return "";
}

export default function EventCard({ event, size = "default", savedByMe }: EventCardProps) {
  const isAccentAudience =
    event.audience === "FLINTA*" || event.audience === "Queer";
  const price = formatPrice(event.priceMin, event.priceMax, event.pricingModel);

  return (
    <Link href={`/events/${event.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--paper-soft)",
            }}
          />
        )}
        {savedByMe !== undefined && (
          <SaveButton eventId={event.id} initialSaved={savedByMe} onCard />
        )}
      </div>

      <div className={styles.meta}>
        <span>
          {formatDate(event.date)} · {event.venue}
          {price ? ` · ${price}` : ""}
        </span>
      </div>

      <h3
        className={styles.title}
        style={{ fontSize: size === "large" ? "26px" : "22px" }}
      >
        {event.title}
      </h3>

      <div className={styles.tags}>
        <span className={styles.chip}>{event.category}</span>
        <span className={isAccentAudience ? styles.chipAccent : styles.chip}>
          {event.audience}
        </span>
      </div>
    </Link>
  );
}
