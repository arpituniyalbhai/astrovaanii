import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — AstroVaanii" },
      {
        name: "description",
        content:
          "Terms and Conditions for using AstroVaanii — please read these rules governing your use of our website and services.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-background grain">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-primary hover:text-primary/80 mb-8 inline-block text-sm font-medium"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-primary mb-8 text-4xl font-bold">
          Terms and Conditions
        </h1>

        <div className="prose-custom space-y-6 text-sm leading-relaxed text-foreground/80">
          <p>
            Welcome to AstroVaanii. By accessing or using our website and
            services, you agree to be bound by these Terms and Conditions.
            Please read them carefully. If you do not agree with any part of
            these terms, you must not use our services.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Acceptance of Terms
          </h2>
          <p>
            By creating an account, making a purchase, or simply browsing our
            website, you acknowledge that you have read, understood, and agree
            to be bound by these Terms and Conditions, including any additional
            policies referenced herein. These terms apply to all users,
            visitors, and customers of AstroVaanii.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            User Accounts
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. You agree to provide accurate, current, and complete
            information during the registration process and to update your
            information as needed. You must notify us immediately of any
            unauthorized use of your account.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Use of Services
          </h2>
          <p>
            Our services are provided for personal, non-commercial use only.
            You agree not to misuse the platform, including but not limited to
            attempting to access restricted areas, reverse engineering our AI
            systems, scraping content, or using automated tools to interact
            with the service. We reserve the right to suspend or terminate
            accounts that violate these terms.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Payments and Billing
          </h2>
          <p>
            All payments are processed securely through our payment partner
            Razorpay. By making a purchase, you agree to pay the applicable
            fees and taxes. Subscription plans renew automatically unless
            cancelled before the renewal date. Prices are subject to change
            with prior notice to existing subscribers.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Intellectual Property
          </h2>
          <p>
            All content on AstroVaanii, including astrological interpretations,
            software, graphics, logos, and text, is the intellectual property
            of AstroVaanii or its licensors. You may not reproduce,
            distribute, modify, or create derivative works without our express
            written consent. Your personal birth chart data remains your
            property.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Limitation of Liability
          </h2>
          <p>
            AstroVaanii and its operators shall not be liable for any direct,
            indirect, incidental, consequential, or punitive damages arising
            from your use of the service. The astrological content provided is
            for entertainment and self-reflection purposes only and should not
            be used as a basis for significant life decisions.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your access to our
            services at any time, without prior notice, for conduct that we
            believe violates these terms or is harmful to other users, third
            parties, or our business interests. Upon termination, your right to
            use the services ceases immediately.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Governing Law
          </h2>
          <p>
            These terms shall be governed by and construed in accordance with
            the laws of India. Any disputes arising under these terms shall be
            subject to the exclusive jurisdiction of the courts in India.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Changes to Terms
          </h2>
          <p>
            We may revise these terms at any time by updating this page. Your
            continued use of the service after changes are posted constitutes
            your acceptance of the new terms. We encourage you to review this
            page periodically.
          </p>

          <p className="text-muted-foreground">
            Last updated: July 2026
          </p>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
            <span className="text-muted-foreground/50">Terms &amp; Conditions</span>
            <Link to="/refund-policy" className="hover:text-foreground">Refund Policy</Link>
            <Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground/50">&copy; {new Date().getFullYear()} AstroVaanii</p>
        </div>
      </div>
    </main>
  );
}
