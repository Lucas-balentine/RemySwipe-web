export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-2">Recipe not found</h1>
      <p className="text-white/60 mb-8">This recipe may have been removed or the link is invalid.</p>
      <a href="/" className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors text-sm">
        Back to Remy
      </a>
    </div>
  );
}
