import { Metadata } from "next";
import { PolicyLayout } from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Delivery timeframes, fees, and coverage for Black Frog Labs online store orders.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      lastUpdated="September 3, 2026"
      intro="We ship orders across South Africa using trusted courier partners. Here's what to expect from the time you check out to the moment your order arrives."
      sections={[
        {
          heading: "Delivery Areas",
          body: (
            <p>We currently deliver to all major cities and towns across South Africa. Outlying or rural areas may have slightly longer delivery times. Local collection is also available from our Lydenburg location for orders placed with the “Collection” option, where offered.</p>
          ),
        },
        {
          heading: "Processing Time",
          body: (
            <p>Orders placed before 1:00 PM on a business day are typically processed and dispatched the same day. Orders placed after 1:00 PM, or on weekends and public holidays, are processed on the next business day.</p>
          ),
        },
        {
          heading: "Delivery Timeframes",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Major metro areas: 1–2 business days after dispatch</li>
              <li>Regional towns: 2–4 business days after dispatch</li>
              <li>Outlying / rural areas: 3–6 business days after dispatch</li>
            </ul>
          ),
        },
        {
          heading: "Shipping Fees",
          body: (
            <p>Standard delivery is a flat rate of R85, and is free automatically on orders over R1,000. Shipping fees are calculated and displayed at checkout before you complete your order, based on your delivery address and order value.</p>
          ),
        },
        {
          heading: "Order Tracking",
          body: (
            <p>Once your order has been dispatched, you will receive a confirmation email with tracking details where available. You can also view your order status at any time from your <a href="/account?tab=orders" className="underline font-semibold text-black">Account › Order History</a> page.</p>
          ),
        },
        {
          heading: "Delayed or Lost Deliveries",
          body: (
            <p>While we work with reliable courier partners, delays can occasionally occur due to circumstances outside our control (e.g. weather, high demand periods, or courier network issues). If your order hasn&apos;t arrived within the expected timeframe, please contact us and we&apos;ll investigate with the courier on your behalf.</p>
          ),
        },
        {
          heading: "Incorrect Address",
          body: (
            <p>Please double-check your delivery address at checkout. If a parcel is returned to us due to an incorrect or incomplete address provided by the customer, re-delivery may incur an additional shipping fee.</p>
          ),
        },
        {
          heading: "Damaged Parcels",
          body: (
            <p>If your parcel arrives visibly damaged, please note this with the courier at the time of delivery where possible, and contact us within 48 hours with photos so we can arrange a replacement or refund in line with our <a href="/policies/refund-policy" className="underline font-semibold text-black">Refund Policy</a>.</p>
          ),
        },
      ]}
    />
  );
}
