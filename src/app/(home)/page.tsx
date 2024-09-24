import ContentHome from "@/components/Content/home";
import ContentHeroHome from "@/components/Content/home/hero";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <ContentHeroHome />
      <ContentHome />
    </div>
  );
}
