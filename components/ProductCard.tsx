export function ProductCard({ name }: { name: string }) {
  return (
    <div className="bg-neutral-900 rounded-xl p-4">
      <div className="h-24 bg-neutral-800 rounded mb-3" />
      <p className="font-medium">{name}</p>
    </div>
  );
}
