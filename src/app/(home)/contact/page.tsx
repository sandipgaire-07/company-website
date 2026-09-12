import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main>
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
              Contact Us
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0F1729] sm:text-5xl">
              Let&apos;s build something great together.
            </h1>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
            <p className="mt-5 text-base leading-7 text-[#676F7E] sm:text-lg">
              Tell us what you need and our team will help turn your idea into
              a practical digital solution.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
            <ContactDetails />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
