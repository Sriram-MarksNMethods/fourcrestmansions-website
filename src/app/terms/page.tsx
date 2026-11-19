import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Terms & conditions" };

export default function Page() {
  return (
    <LegalPage
      title="Terms & conditions"
      updated="19 Nov 2026"
      sections={[
    { heading: "Use of this website", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
    { heading: "Artistic impressions", text: "All images on this website are artistic impressions and may differ from the final product." },
    { heading: "Prices and availability", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
    { heading: "Liability", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
    { heading: "Contact", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
      ]}
    />
  );
}
