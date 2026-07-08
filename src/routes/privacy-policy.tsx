import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AstroVaanii" },
      {
        name: "description",
        content:
          "Privacy Policy for AstroVaanii — learn how we collect, use, and protect your personal data.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background grain">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-primary hover:text-primary/80 mb-8 inline-block text-sm font-medium"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-primary mb-8 text-4xl font-bold">Privacy Policy</h1>

        <div className="prose-custom space-y-6 text-sm leading-relaxed text-foreground/80">
          <p>
            This Privacy Policy explains how AstroVaanii ("we," "our," or "us")
            collects, uses, discloses, and safeguards your personal information
            when you visit our website or use our services. We are committed to
            protecting your privacy and ensuring the security of your data.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Information We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide to us,
            including your name, email address, date of birth, time of birth,
            place of birth, and billing information when you create an account
            or make a purchase. We also collect usage data such as your IP
            address, browser type, device information, and browsing patterns
            through cookies and similar technologies.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            How We Use Your Information
          </h2>
          <p>
            We use the collected information to generate accurate astrological
            readings, process transactions, improve our services, send
            personalized content and recommendations, respond to your inquiries,
            and comply with legal obligations. We may also use anonymized
            aggregate data for analytical and product improvement purposes.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Data Storage and Security
          </h2>
          <p>
            Your personal data is stored securely using industry-standard
            encryption and access controls. We use Firebase and secure cloud
            infrastructure to host your data. While we implement robust security
            measures, no method of electronic storage or transmission is
            completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Sharing of Information
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your data with trusted service providers who
            assist us in operating our website and conducting our business,
            provided they agree to keep your information confidential. We may
            also disclose information when required by law or to protect our
            legal rights.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Your Rights
          </h2>
          <p>
            You have the right to access, update, correct, or delete your
            personal information at any time. You can manage your account
            settings or contact us to exercise these rights. You may also opt
            out of marketing communications by following the unsubscribe
            instructions in our emails.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Cookies
          </h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            browsing experience, analyze website traffic, and understand where
            our visitors come from. You can control cookie preferences through
            your browser settings.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Children's Privacy
          </h2>
          <p>
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            we become aware that a child has provided us with personal data, we
            will take steps to delete it promptly.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will
            be posted on this page with an updated revision date. We encourage
            you to review this policy periodically.
          </p>

          <p className="text-muted-foreground">
            Last updated: July 2026
          </p>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="text-muted-foreground/50">Privacy Policy</span>
            <Link to="/terms-and-conditions" className="hover:text-foreground">Terms &amp; Conditions</Link>
            <Link to="/refund-policy" className="hover:text-foreground">Refund Policy</Link>
            <Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground/50">&copy; {new Date().getFullYear()} AstroVaanii</p>
        </div>
      </div>
    </main>
  );
}
