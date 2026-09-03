import { Metadata } from "next";
import { PolicyLayout } from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers regarding the use of the Black Frog Labs website and services.",
};

export default function DisclaimerPage() {
  return (
    <PolicyLayout
      title="Disclaimer"
      lastUpdated="September 3, 2026"
      intro="This Disclaimer applies to your use of the Black Frog Labs website, online store, and repair booking services. Please read it alongside our Terms of Service and Privacy Policy."
      sections={[
        {
          heading: "General Information Only",
          body: (
            <p>Content on this website — including product descriptions, repair service information, and blog or FAQ content — is provided for general informational purposes only. While we strive for accuracy, we make no warranties or guarantees, express or implied, about the completeness, reliability, or suitability of this information for any particular purpose.</p>
          ),
        },
        {
          heading: "Product Imagery",
          body: (
            <p>Product visuals on this site are stylised graphic representations rather than photographs, used to indicate product category and colour theme. Actual products may differ in appearance from on-screen graphics. Refer to the written product description, specifications, and features list for accurate detail.</p>
          ),
        },
        {
          heading: "Demo Store Notice",
          body: (
            <p>This website is a demonstration storefront built to showcase e-commerce functionality. Account sign-up, login, and order history are simulated using your browser&apos;s local storage for demonstration purposes and are not connected to a production payment processor or backend database. No real financial transactions are processed through this demo checkout.</p>
          ),
        },
        {
          heading: "Third-Party Links",
          body: (
            <p>Our site may contain links to third-party websites (such as social media or payment providers) that are not owned or controlled by Black Frog Labs. We are not responsible for the content, accuracy, or practices of any third-party sites, and inclusion of a link does not imply endorsement.</p>
          ),
        },
        {
          heading: "Repair Service Disclaimer",
          body: (
            <p>Repairs are performed by trained technicians using industry-standard tools and parts. However, repairing electronic devices carries inherent risk, particularly for devices with prior damage, water exposure, or third-party repairs. We will always inform you of known risks specific to your repair before work begins. We are not liable for pre-existing conditions or issues unrelated to the repair performed.</p>
          ),
        },
        {
          heading: "No Professional Advice",
          body: (
            <p>Nothing on this site constitutes legal, financial, or technical professional advice. Any decisions you make based on information from this site are your own responsibility.</p>
          ),
        },
        {
          heading: "Limitation of Liability",
          body: (
            <p>To the extent permitted by law, Black Frog Labs disclaims liability for any loss or damage arising from your use of, or inability to use, this website, except where such liability cannot be excluded under the Consumer Protection Act, 2008, or other applicable South African law.</p>
          ),
        },
      ]}
    />
  );
}
