export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-xl w-full h-full"></div>
    </div>
  );
}

export function SkeletonText({
  className = "",
  width = "w-full",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={`h-4 bg-gray-200 rounded animate-pulse ${width} ${className}`}
    ></div>
  );
}

export function SkeletonCircle({ size = "w-12 h-12" }: { size?: string }) {
  return (
    <div className={`${size} bg-gray-200 rounded-full animate-pulse`}></div>
  );
}
