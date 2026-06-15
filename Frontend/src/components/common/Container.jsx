// Container — placeholder
// Max width wrapper: max-w-[1280px] mx-auto px-20 (desktop) / px-6 (mobile)
export default function Container({ children, className = '' }) {
  return (
    <div className={`max-w-[1280px] mx-auto px-6 lg:px-20 ${className}`}>
      {children}
    </div>
  )
}
