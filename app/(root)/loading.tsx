export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-green"></div>
        {/* Optional: Add text if desired <p className="text-gray-500 font-medium animate-pulse">Loading...</p> */}
      </div>
    </div>
  );
}
