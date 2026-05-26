export default function Navbar() {
  return (
    <header
      style={{ borderBottom: '1px solid var(--rule)' }}
      className="sticky top-0 z-50"
      aria-label="Site header"
    >
      <nav
        className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
        aria-label="Main navigation"
      >
        <a
          href="/"
          className="font-display text-2xl font-bold"
          style={{ color: 'var(--ink)' }}
          aria-label="No Fomo home"
        >
          NO FOMO
        </a>

        <ul className="flex items-center gap-8 list-none" role="list">
          <li>
            <a
              href="/"
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--ink-soft)' }}
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--ink-soft)' }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/submit"
              className="font-mono text-xs uppercase tracking-widest px-4 py-2"
              style={{
                border: '1px solid var(--rule-strong)',
                color: 'var(--ink)',
              }}
            >
              Submit event
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}