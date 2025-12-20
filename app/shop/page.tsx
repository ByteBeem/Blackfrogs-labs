export default function Shop() {
  const products = [
    "Phone Covers",
    "Fast Chargers",
    "USB Cables",
    "Screen Protectors",
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((item) => (
        <div
          key={item}
          className="bg-neutral-900 rounded-xl p-4"
        >
          <div className="h-24 bg-neutral-800 rounded mb-3" />
          <p className="font-medium">{item}</p>
        </div>
      ))}
    </div>
  );
}
