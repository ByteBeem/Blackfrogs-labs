import { Metadata } from "next";
import { PolicyLayout } from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Refund & Returns Policy",
  description: "Our returns, exchanges, and refund process for online store orders.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Refund & Returns Policy"
      lastUpdated="September 3, 2026"
      intro="We want you to be genuinely happy with your purchase. This policy explains how returns, exchanges, and refunds work for products bought through the Black Frog Labs online store, in line with the South African Consumer Protection Act, 2008."
      sections={[
        {
          heading: "30-Day Return Window",
          body: (
            <p>You may return most unused, unopened products within 30 days of delivery for a full refund or exchange. Items should be returned in their original packaging with all accessories included, wherever reasonably possible.</p>
          ),
        },
        {
          heading: "Non-Returnable Items",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Earbuds and in-ear audio products that have been opened, for hygiene reasons</li>
              <li>Products marked as “Final Sale” or clearance at the time of purchase</li>
              <li>Gift cards and promotional vouchers</li>
              <li>Products with signs of misuse, physical damage, or liquid damage not present at delivery</li>
            </ul>
          ),
        },
        {
          heading: "Faulty or Defective Products",
          body: (
            <p>If a product arrives faulty, damaged, or not as described, you are entitled to a repair, replacement, or refund at your choice, in accordance with the Consumer Protection Act. Please contact us within a reasonable time of discovering the fault with your order number and a description (and photos, where possible) of the issue.</p>
          ),
        },
        {
          heading: "How to Start a Return",
          body: (
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Contact us via the <a href="/contact" className="underline font-semibold text-black">Contact page</a> or email info@blackfroglabs.co.za with your order number.</li>
              <li>We will confirm eligibility and provide return instructions, including the return address.</li>
              <li>Pack the item securely with proof of purchase and send it back, or arrange collection where available.</li>
              <li>Once received and inspected, we will notify you of the outcome and process your refund or exchange.</li>
            </ol>
          ),
        },
        {
          heading: "Refund Method & Timing",
          body: (
            <p>Approved refunds are issued to your original payment method within 7–10 business days of us receiving and inspecting the returned item. For Cash on Delivery orders, refunds are made via EFT to a bank account you provide. Original delivery fees are non-refundable unless the return is due to our error or a faulty product.</p>
          ),
        },
        {
          heading: "Return Shipping Costs",
          body: (
            <p>If a return is due to a fault, damage, or an error on our part, we cover the return shipping cost. For change-of-mind returns, the customer is responsible for return shipping costs unless otherwise agreed.</p>
          ),
        },
        {
          heading: "Repair Service Refunds",
          body: (
            <p>Deposits paid for repair diagnostics are non-refundable once diagnostic work has begun, but are credited toward the final repair cost if you proceed. If a quoted repair cannot be completed as agreed, any amount paid in advance for that repair will be refunded.</p>
          ),
        },
        {
          heading: "Exchanges",
          body: (
            <p>Prefer a different size, colour, or product entirely? Let us know when you request your return and we will do our best to arrange an exchange, subject to stock availability. Any price difference will be charged or refunded accordingly.</p>
          ),
        },
      ]}
    />
  );
}
