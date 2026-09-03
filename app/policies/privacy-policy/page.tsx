import { Metadata } from "next";
import { PolicyLayout } from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Black Frog Labs collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      lastUpdated="September 3, 2026"
      intro="Black Frog Labs (“we”, “us”, “our”) respects your privacy and is committed to protecting the personal information you share with us when you shop with us or book a repair. This policy explains what we collect, why, and the choices you have."
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <>
              <p>We collect information you provide directly, such as when you create an account, place an order, book a repair, or contact support. This may include your name, email address, phone number, delivery address, and order details.</p>
              <p>We also automatically collect limited technical information, such as browser type, device type, and general usage data, to help us improve the site and diagnose issues.</p>
              <p>We do not collect or store full payment card numbers on our servers; card payments are processed through PCI-compliant third-party payment providers.</p>
            </>
          ),
        },
        {
          heading: "How We Use Your Information",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To process and deliver orders and repair bookings</li>
              <li>To communicate order updates, repair status, and customer support responses</li>
              <li>To send marketing communications where you have opted in (you may unsubscribe at any time)</li>
              <li>To improve our products, services, and website experience</li>
              <li>To detect, prevent, and address fraud, abuse, or security issues</li>
              <li>To comply with legal and regulatory obligations</li>
            </ul>
          ),
        },
        {
          heading: "How We Share Information",
          body: (
            <p>We do not sell your personal information. We may share it with trusted service providers who help us operate our business — such as couriers for delivery, payment processors for transactions, and hosting providers — solely for the purpose of providing our services. We may also disclose information where required by law.</p>
          ),
        },
        {
          heading: "Cookies & Tracking",
          body: (
            <p>We use cookies and similar technologies to keep you logged in, remember your cart, and understand how our site is used. You can control cookies through your browser settings, though disabling them may affect site functionality.</p>
          ),
        },
        {
          heading: "Data Retention",
          body: (
            <p>We retain personal information for as long as necessary to fulfil the purposes described in this policy, including to meet legal, accounting, or reporting requirements. Order records are typically retained for the period required by South African tax and consumer protection law.</p>
          ),
        },
        {
          heading: "Your Rights",
          body: (
            <p>You have the right to access, correct, or request deletion of your personal information, and to object to or restrict certain processing. To exercise these rights, contact us using the details below. We will respond within a reasonable timeframe in accordance with the Protection of Personal Information Act (POPIA).</p>
          ),
        },
        {
          heading: "Data Security",
          body: (
            <p>We take reasonable technical and organisational measures to protect your information against loss, misuse, and unauthorised access. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>
          ),
        },
        {
          heading: "Children's Privacy",
          body: (
            <p>Our services are not directed at children under 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.</p>
          ),
        },
        {
          heading: "Changes to This Policy",
          body: (
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The “Last updated” date at the top of this page indicates when the policy was last revised. Continued use of our site after changes constitutes acceptance of the updated policy.</p>
          ),
        },
      ]}
    />
  );
}
