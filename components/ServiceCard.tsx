export function ServiceCard({ title }: { title: string }) {
  return (
    <div className="bg-neutral-900 rounded-2xl p-5 shadow-lg">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">
        Professional diagnostics and fast turnaround.
      </p>
    </div>
  );
}
