import Link from "next/link";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.label}>— About no/fomo</div>
          <h1 className={styles.heroTitle}>
            A small list.
            <br />
            <em>Kept by hand.</em>
          </h1>
          <p className={styles.heroSubtitle}>
            no/fomo is a small, hand-edited list of queer & FLINTA* events in
            Berlin. It's a side project — one person, one inbox, one cup of
            coffee a morning.
          </p>
        </div>
      </section>

      {/* THE NOTE */}
      <section className={styles.noteSection}>
        <div className={styles.noteInner}>
          <div className={styles.noteSidebar}>
            <div className={styles.label}>— A note</div>
            <div className={styles.noteMeta}>
              Started · 03.2024
              <br />
              From · Neukölln, mostly
              <br />
              Updated · weekly, Fridays
              <br />
              Reach · ~2,000 readers
            </div>
          </div>
          <div className={styles.noteBody}>
            <p className={styles.noteText}>
              I started this in 2024 because I kept missing the events I cared
              about. Not the big ones — those find you. The small ones: a
              reading in someone's kitchen, a Wednesday milonga, a FLINTA* skate
              session at Tempelhof that nobody posts about.
            </p>
            <p className={styles.noteTextSoft}>
              So I keep a list. Every Friday I go through what people have sent
              me, what I've seen on posters, what friends mention at the bar. I
              check that the event is real, that the door is okay, and that it's
              not the kind of thing that gets ruined by being googled. Then it
              goes on the site.
            </p>
            <p className={styles.noteTextSoft}>
              That's the whole thing. It's not a venue, a label, or a startup.
              It's a directory. If it's useful to you, I'm glad.
            </p>
            <div className={styles.sig}>
              <div className={styles.sigFrom}>— Yours,</div>
              <div className={styles.sigName}>Lou.</div>
              <div className={styles.sigStamp}>no/fomo · Berlin · 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE RULES */}
      <section className={styles.rulesSection}>
        <div className={styles.rulesInner}>
          <div className={styles.label} style={{ marginBottom: "1.5rem" }}>
            — Three things I try to do
          </div>
          <div className={styles.rulesGrid}>
            {[
              {
                num: "01.",
                title: "Read every submission.",
                body: "If I haven't heard back from a venue within a week, it doesn't go on.",
              },
              {
                num: "02.",
                title: "Take no money from venues.",
                body: "No ads, no boosting, no commission. Optional €4/month if you'd like to support me.",
              },
              {
                num: "03.",
                title: "Keep soft parties soft.",
                body: "If a host asks me to keep a door quiet, I do. Some listings only go out to members.",
              },
            ].map((r) => (
              <div key={r.num}>
                <div className={styles.ruleNum}>
                  <em>{r.num}</em>
                </div>
                <div className={styles.ruleTitle}>{r.title}</div>
                <p className={styles.ruleBody}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqSidebar}>
            <div className={styles.label}>— FAQ</div>
          </div>
          <div className={styles.faqBody}>
            {[
              {
                q: "How do you choose what goes on?",
                a: "If it serves a queer / FLINTA* crowd, has a real venue (or location-on-RSVP), and a door I can vouch for, it goes on. If I'm not sure, I ask. If I can't ask, I don't list.",
              },
              {
                q: "Can I submit my event?",
                a: "Yes — head to Submit. It takes a couple of minutes. First-time venues get a short reply from me before going on.",
              },
              {
                q: "Why ask people to sign in?",
                a: "So you can save events you're interested in across devices. That's it. No newsletter spam, no selling. If you don't sign in you can still browse everything.",
              },
              {
                q: "Is this for-profit?",
                a: "No. The €4/month optional membership pays for the server and a slow coffee on Fridays. Anything left over I send to Trans*Inter*Beratungsstelle.",
              },
              {
                q: "Are you hiring?",
                a: "No — but if you want to help (translating, scouting events, proofreading), write to me. I'd love that.",
              },
            ].map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{item.q}</span>
                  <span className={styles.faqSign}>+</span>
                </summary>
                <div className={styles.faqAnswer}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.contactSection}>
        <div className={styles.contactInner}>
          <div className={styles.contactLeft}>
            <div className={styles.label} style={{ marginBottom: "0.75rem" }}>
              — Get in touch
            </div>
            <h2 className={styles.contactTitle}>
              Just write to <em>me.</em>
            </h2>
            <p className={styles.contactSubtitle}>
              One inbox, one person. I read everything within a few days, slower
              on weekends.
            </p>
          </div>
          <div className={styles.contactRight}>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactItemLabel}>Email</span>
                <a
                  href="mailto:hello@nofomo.berlin"
                  className={styles.contactItemValue}
                >
                  hello@nofomo.berlin
                </a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactItemLabel}>Signal</span>
                <span className={styles.contactItemMuted}>on request</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactItemLabel}>Mail</span>
                <span className={styles.contactItemMuted}>Postfach · NK</span>
              </li>
            </ul>
            <div className={styles.contactActions}>
              <Link href="/submit" className={styles.ctaBtnFilled}>
                Submit an event →
              </Link>
              <Link href="/signup" className={styles.ctaBtn}>
                Become a member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
