export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-noise">
      <video
        src="/media/uiVideo2.mp4"
        muted 
        autoPlay
        loop
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* vignette */}
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,1)_100%)]" />
    </div>
  )
}
