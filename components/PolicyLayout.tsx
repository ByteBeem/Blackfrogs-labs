import Link from "next/link";
import { PageHeader } from "./PageHeader";

export function PolicyLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: { heading: string; body: React.ReactNode }[];
}) {
  return (
    <div className="bg-white">
      <PageHeader eyebrow="Policies" title={title} description={`Last updated: ${lastUpdated}`} />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
        {intro && <p className="text-gray-600 leading-relaxed mb-10">{intro}</p>}

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i} id={`section-${i + 1}`}>
              <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
                {i + 1}. {s.heading}
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3 text-sm md:text-base">
                {s.body}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Questions about this policy? Reach out any time via our{" "}
            <Link href="/contact" className="font-semibold text-black hover:underline">
              Contact page
            </Link>{" "}
            or email{" "}
            <a href="mailto:info@blackfroglabs.co.za" className="font-semibold text-black hover:underline">
              info@blackfroglabs.co.za
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
