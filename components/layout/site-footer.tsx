import Link from "next/link";

const footerLinks = [
  { href: "/search?q=thriller", label: "Thrillers" },
  { href: "/search?q=romance", label: "Romance" },
  { href: "/search?q=japan", label: "Japanese" },
  { href: "/search?q=korean", label: "Korean" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black/20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-10 text-sm text-white/55 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-3">
            <span className="block text-[0.72rem] uppercase tracking-[0.45em] text-white/35">
              YugenTV Frontend Foundation
            </span>
            <h2 className="font-display text-2xl text-white">
              Built for premium Asian movies and series discovery.
            </h2>
            <p>
              This first pass focuses on the consumer-facing streaming shell:
              browse, search, series detail, and watch layouts powered by
              reusable mock content.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full bg-white/3 px-4 py-2 text-white/75 transition hover:bg-white/8 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            YugenTV prototype. Frontend only. No backend, auth, or admin flows
            in this pass.
          </p>
          <p>
            Inspired by premium streaming layouts while keeping the component
            system app-ready.
          </p>
        </div>
      </div>
    </footer>
  );
}
