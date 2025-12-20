export default function Services() {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">Our Services</h2>

      <div className="grid gap-4">
        {[
          "Screen Repair",
          "Battery Replacement",
          "Charging Port Repair",
          "Water Damage Repair",
        ].map((service) => (
          <div
            key={service}
            className="bg-neutral-900 rounded-xl p-5"
          >
            <h3 className="font-semibold">{service}</h3>
            <p className="text-sm text-gray-400 mt-1">
              High-quality parts, expert technicians, fast turnaround.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
