export default function StatsCards({ stats = {} }) {
  const cards = [
    { label: 'Active brands', value: stats.brands ?? 0,    hint: '↑ this month',         tone: 'pos' },
    { label: 'Open tasks',    value: stats.tasks ?? 0,     hint: 'In progress',          tone: 'warn' },
    { label: 'In review',     value: stats.review ?? 0,    hint: 'Awaiting approval',    tone: 'info' },
    { label: 'Approvals',     value: stats.approvals ?? 0, hint: 'Pending your action',  tone: 'neu' },
  ]
  const toneColor = { pos: 'var(--green)', warn: 'var(--amber)', info: 'var(--blue)', neu: 'var(--text3)' }
  return (
    <div className="stats-row">
      {cards.map((c) => (
        <div className="sc" key={c.label}>
          <div className="sl">{c.label}</div>
          <div className="sv">{c.value}</div>
          <div className="sch" style={{ color: toneColor[c.tone] }}>{c.hint}</div>
        </div>
      ))}
    </div>
  )
}
