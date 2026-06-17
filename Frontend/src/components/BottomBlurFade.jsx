export default function BottomBlurFade() {
  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 w-full z-40"
      style={{
        height: '45px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
    
      }}
    />
  )
}