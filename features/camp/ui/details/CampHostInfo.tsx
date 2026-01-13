export default function CampHostInfo({ host }: { host: any }) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center text-2xl text-white font-bold">
        {host?.fullName?.charAt(0) || "H"}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-600">
          Hosted by {host?.fullName}
        </h3>
        <p className="text-gray-500 text-sm">Joined in 2023</p>
      </div>
    </div>
  );
}
