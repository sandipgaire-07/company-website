export default function BlogHero() {
  return (
    <section className="px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
          Our blog
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0F1729] sm:text-5xl lg:text-6xl">
          Ideas for building better businesses.
        </h1>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#676F7E] sm:text-lg">
          Practical insights on technology, product design, and the ideas
          helping modern teams work smarter.
        </p>
      </div>
    </section>
  );
}
