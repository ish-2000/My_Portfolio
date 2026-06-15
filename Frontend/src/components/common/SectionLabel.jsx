// SectionLabel — placeholder
// Props (future): number ('/01'), label ('Selected Work'), dark (bool)
export default function SectionLabel({ number = '/01', label = 'Section', dark = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`font-body text-[11px] font-medium tracking-[0.1em] uppercase ${dark ? 'text-dark-muted' : 'text-text-muted'}`}>
        {label}
      </span>
      <span className={`font-body text-[11px] font-medium ${dark ? 'text-dark-muted' : 'text-text-muted'}`}>
        {number}
      </span>
    </div>
  )
}
