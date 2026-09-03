export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-black text-white pt-28 md:pt-32 pb-14 md:pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {eyebrow && (
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white text-black px-3.5 py-1.5 rounded-full mb-5">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-3xl md:text-5xl font-bold text-balance mb-4">{title}</h1>
        {description && (
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
