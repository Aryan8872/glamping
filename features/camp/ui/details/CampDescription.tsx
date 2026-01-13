export default function CampDescription({
  description,
}: {
  description?: string;
}) {
  return (
    <div className="text-gray-600 leading-relaxed text-lg">{description}</div>
  );
}
