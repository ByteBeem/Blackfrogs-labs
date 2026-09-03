import { Metadata } from "next";
import { PolicyLayout } from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing use of the Black Frog Labs website and services.",
};

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms of Service"
      lastUpdated="September 3, 2026"
      intro="These Terms of Service (“Terms”) govern your use of the Black Frog Labs website, the purchase of products through our online store, and the booking of repair services. By using our site or placing an order, you agree to these Terms."
      sections={[
        {
          heading: "About Us",
          body: (
            <p>Black Frog Labs is a mobile accessories retailer and device repair service based in Lydenburg, Mpumalanga, South Africa. All references to “we”, “us”, or “our” refer to Black Frog Labs.</p>
          ),
        },
        {
          heading: "Eligibility & Accounts",
          body: (
            <>
              <p>You must be at least 18 years old, or have the consent of a parent or guardian, to place an order or create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</p>
              <p>You agree to provide accurate, current, and complete information when creating an account or placing an order.</p>
            </>
          ),
        },
        {
          heading: "Products & Pricing",
          body: (
            <>
              <p>All prices are listed in South African Rand (ZAR) and include VAT unless stated otherwise. We make reasonable efforts to ensure prices and product descriptions are accurate, but errors may occasionally occur. If we discover a pricing error after you place an order, we will contact you before processing the order and you may choose to proceed at the correct price or cancel.</p>
              <p>Product images on this site are illustrative graphics rather than photographs and are intended to represent the general category of the product.</p>
              <p>We reserve the right to limit quantities, refuse orders, or discontinue products at our discretion.</p>
            </>
          ),
        },
        {
          heading: "Orders & Payment",
          body: (
            <p>An order is only confirmed once payment has been successfully processed (or, for Cash on Delivery orders, once accepted by us). We reserve the right to cancel or refuse any order, including in cases of suspected fraud, pricing errors, or stock unavailability, in which case any payment received will be refunded.</p>
          ),
        },
        {
          heading: "Repair Services",
          body: (
            <>
              <p>Repair bookings are subject to diagnostic assessment. Quoted prices are estimates until the device has been inspected; you will be notified of any change in cost before work proceeds.</p>
              <p>We are not responsible for data loss during a repair. We strongly recommend backing up your device before booking a repair. Devices left uncollected for more than 60 days after being notified as ready may be subject to a storage fee or disposal in accordance with applicable law.</p>
            </>
          ),
        },
        {
          heading: "Shipping & Delivery",
          body: (
            <p>Shipping timeframes and fees are described in our <a href="/policies/shipping-policy" className="underline font-semibold text-black">Shipping Policy</a>. Risk of loss and title for products pass to you upon delivery to the carrier, though we will assist with claims for items lost or damaged in transit.</p>
          ),
        },
        {
          heading: "Returns & Refunds",
          body: (
            <p>Our approach to returns, exchanges, and refunds is described in our <a href="/policies/refund-policy" className="underline font-semibold text-black">Refund Policy</a>, which forms part of these Terms.</p>
          ),
        },
        {
          heading: "Acceptable Use",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use the site for any unlawful purpose or in violation of these Terms</li>
              <li>Attempt to gain unauthorised access to our systems or another user&apos;s account</li>
              <li>Interfere with the operation or security of the website</li>
              <li>Submit false information when placing an order or creating an account</li>
            </ul>
          ),
        },
        {
          heading: "Intellectual Property",
          body: (
            <p>All content on this site, including text, graphics, logos, and design, is owned by or licensed to Black Frog Labs and is protected by South African and international intellectual property law. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
          ),
        },
        {
          heading: "Limitation of Liability",
          body: (
            <p>To the maximum extent permitted by law, Black Frog Labs will not be liable for any indirect, incidental, or consequential damages arising from your use of our site or services. Nothing in these Terms limits any right you have under the Consumer Protection Act, 2008, that cannot lawfully be excluded.</p>
          ),
        },
        {
          heading: "Governing Law",
          body: (
            <p>These Terms are governed by the laws of the Republic of South Africa. Any disputes will be subject to the non-exclusive jurisdiction of the South African courts.</p>
          ),
        },
        {
          heading: "Changes to These Terms",
          body: (
            <p>We may revise these Terms from time to time. Updates will be posted on this page with a new “Last updated” date. Your continued use of the site after changes take effect constitutes acceptance of the revised Terms.</p>
          ),
        },
      ]}
    />
  );
}
