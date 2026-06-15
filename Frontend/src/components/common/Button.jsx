// Button — placeholder
// Props (future): variant ('primary'|'secondary'|'outline'), size ('sm'|'md'|'lg'), children, onClick, to
export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-body text-sm font-medium px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors duration-200"
    >
      {children}
    </button>
  )
}
