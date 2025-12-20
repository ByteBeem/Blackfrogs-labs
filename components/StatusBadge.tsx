export default function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Received: "bg-gray-600",
    "In Repair": "bg-yellow-500",
    "Ready for Pickup": "bg-blue-500",
    Completed: "bg-green-500",
  };

  return (
    <div className={`px-4 py-2 rounded-full text-black inline-block ${styles[status]}`}>
      {status}
    </div>
  );
}
