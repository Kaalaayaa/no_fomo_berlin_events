import Link from "next/link";
import { requireUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import EventCard from "@/components/EventCard";
import styles from "./page.module.css";

function formatDate(date: Date) {
  const day = date.toLocaleDateString("en-GB", { weekday: "short" });
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day} ${d}.${m}`;
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

function statusClass(status: string) {
  if (status === "approved") return styles.badgeApproved;
  if (status === "rejected") return styles.badgeRejected;
  return styles.badgePending;
}

export default async function MyEventsPage() {
  const user = await requireUser("/my-events");

  const [savedEvents, submissions] = await Promise.all([
    prisma.savedEvent.findMany({
      where: { userId: user.id },
      include: { event: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.event.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.label}>— Members</div>
          <h1 className={styles.title}>
            My <em>Events.</em>
          </h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.label} style={{ marginBottom: "2rem" }}>— Saved</div>

          {savedEvents.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>
                Nothing saved yet — go find something exciting.
              </p>
              <Link href="/" className={styles.emptyBtn}>
                Browse events →
              </Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {savedEvents.map(({ event }) => (
                <EventCard key={event.id} event={event} size="large" savedByMe />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.label} style={{ marginBottom: "2rem" }}>— My Submissions</div>

          {submissions.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>
                You haven&apos;t submitted anything yet.
              </p>
              <Link href="/submit" className={styles.emptyBtn}>
                Submit an event →
              </Link>
            </div>
          ) : (
            <div className={styles.subsList}>
              {submissions.map((event) => (
                <div className={styles.subRow} key={event.id}>
                  <div>
                    <div className={styles.subTitle}>{event.title}</div>
                    <div className={styles.subMeta}>
                      {formatDate(event.date)} · {event.venue}
                    </div>
                  </div>
                  <span className={statusClass(event.status)}>
                    {STATUS_LABEL[event.status] ?? event.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
