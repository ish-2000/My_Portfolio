// GlassCard — placeholder
// Base: backdrop-blur-md bg-white/70 border border-white/30 rounded-card shadow-sm
// On dark sections: bg-white/5 border-white/10
export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`backdrop-blur-md bg-white/70 border border-white/30 rounded-card shadow-sm ${className}`}>
      {children}
    </div>
  )
}
