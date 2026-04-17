import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[1440px] items-center justify-center px-4 py-16 sm:px-6 lg:px-10">
      <div className="max-w-2xl rounded-[36px] bg-white/3 p-8 text-center sm:p-12">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/42">
          404
        </span>
        <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
          This title is not in the current catalog.
        </h1>
        <p className="mt-4 text-base leading-7 text-white/58">
          The route exists, but the mock dataset does not contain the requested
          movie, series, or playable entry yet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-white/90"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
