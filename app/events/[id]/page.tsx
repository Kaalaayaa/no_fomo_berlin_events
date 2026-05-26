import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import EventCard from "@/components/EventCard";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

function formatFullDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-GB", { weekday: "short" });
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day} ${d}.${m}`;
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  const h = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${min}`;
}

function formatPrice(
  min: number | null,
  max: number | null,
  model: string | null,
) {
  if (model === "Free") return "Free";
  if (model === "PWYC") return "PWYC";
  if (min !== null && max !== null && min !== max) return `${min} → ${max} €`;
  if (min !== null) return `${min} €`;
  return "—";
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  // Fetch related events — same category or audience, exclude current
  const related = await prisma.event.findMany({
    where: {
      status: "approved",
      id: { not: id },
      OR: [{ category: event.category }, { audience: event.audience }],
    },
    take: 4,
    orderBy: { date: "asc" },
  });

  const isAccent = event.audience === "FLINTA*" || event.audience === "Queer";

  return (
    <main>
      {/* BREADCRUMB */}
      <section className={styles.breadcrumb}>
        <div className={styles.inner}>
          <Link href="/" className={styles.back}>
            ← All events
          </Link>
          <span className={styles.sep}>/</span>
          <span>{event.category}</span>
          <span className={styles.sep}>/</span>
          <span className={isAccent ? styles.accent : ""}>
            {event.audience}
          </span>
          <span className={styles.sep}>/</span>
          <span>{event.title}</span>
        </div>
      </section>

      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroImage}>
              <div className={styles.imageWrap}>
                {event.imageUrl && (
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    style={{
                      objectFit: "cover",
                      filter: "contrast(1.02) saturate(0.9)",
                    }}
                  />
                )}
              </div>
            </div>
            <div className={styles.heroMeta}>
              <div className={styles.tags}>
                <span className={styles.chip}>{event.category}</span>
                <span className={isAccent ? styles.chipAccent : styles.chip}>
                  {event.audience}
                </span>
              </div>
              <h1 className={styles.title}>{event.title}</h1>
              <p className={styles.tagline}>{event.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BODY */}
      <section>
        <div className={styles.bodyInner}>
          <div className={styles.left}>
            {/* Quick facts */}
            <div className={styles.facts}>
              <div className={styles.fact}>
                <div className={styles.factLabel}>Date</div>
                <div className={styles.factValue}>
                  {formatFullDate(event.date.toISOString())}
                </div>
                <div className={styles.factSub}>
                  {new Date(event.date).getFullYear()}
                </div>
              </div>
              <div className={styles.fact}>
                <div className={styles.factLabel}>Doors</div>
                <div className={styles.factValue}>
                  {formatTime(event.date.toISOString())}
                </div>
              </div>
              <div className={styles.fact}>
                <div className={styles.factLabel}>Venue</div>
                <div className={styles.factValue}>{event.venue}</div>
                {event.address && (
                  <div className={styles.factSub}>{event.address}</div>
                )}
              </div>
              <div className={styles.fact}>
                <div className={styles.factLabel}>Door</div>
                <div className={styles.factValue}>
                  {formatPrice(
                    event.priceMin,
                    event.priceMax,
                    event.pricingModel,
                  )}
                </div>
                {event.pricingModel && (
                  <div className={styles.factSub}>{event.pricingModel}</div>
                )}
              </div>
            </div>

            {/* About */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}>— About</div>
              <p className={styles.descriptionLarge}>{event.description}</p>
            </div>

            {/* Lineup */}
            {event.lineup && (
              <div className={styles.section}>
                <div className={styles.sectionLabel}>— Line-up</div>
                <div className={styles.lineup}>
                  {(event.lineup as string).split('\n').map((line: string, i) => {
                    const [time, ...rest] = line.split("—");
                    return (
                      <div key={i} className={styles.lineupRow}>
                        <span className={styles.lineupTime}>
                          {time?.trim()}
                        </span>
                        <span className={styles.lineupName}>
                          {rest.join("—").trim()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Venue */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}>— Venue</div>
              <div className={styles.venueBox}>
                <div className={styles.venueInfo}>
                  <h3 className={styles.venueName}>{event.venue}</h3>
                  {event.address && (
                    <div className={styles.venueAddress}>{event.address}</div>
                  )}
                  <div className={styles.venueActions}>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.address || event.venue)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.chip}
                    >
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <div className={styles.ticketBox}>
                <div className={styles.ticketHeader}>
                  <span className={styles.factLabel}>Tickets</span>
                </div>
                <div className={styles.ticketPrice}>
                  {formatPrice(
                    event.priceMin,
                    event.priceMax,
                    event.pricingModel,
                  )}
                </div>
                {event.pricingModel && (
                  <div className={styles.ticketModel}>{event.pricingModel}</div>
                )}
                {event.ticketUrl ? (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaBtn}
                  >
                    Get tickets →
                  </a>
                ) : (
                  <div
                    className={styles.ctaBtn}
                    style={{ opacity: 0.5, cursor: "default" }}
                  >
                    Tickets at the door
                  </div>
                )}
              </div>

              <div className={styles.shareBox}>
                <div
                  className={styles.factLabel}
                  style={{ marginBottom: "0.75rem" }}
                >
                  Add to —
                </div>
                <div className={styles.shareLinks}>
                  <a href="#" className={styles.shareLink}>
                    Google Calendar
                  </a>
                  <a href="#" className={styles.shareLink}>
                    Apple Calendar
                  </a>
                  <a href="#" className={styles.shareLink}>
                    Copy link
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED EVENTS */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <div className={styles.relatedHeader}>
              <div>
                <div className={styles.sectionLabel}>— Similar events</div>
                <h2 className={styles.relatedTitle}>You might also like</h2>
              </div>
              <Link href="/" className={styles.allEventsBtn}>
                All events →
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((e) => (
                <EventCard key={e.id} event={e} size="large" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
