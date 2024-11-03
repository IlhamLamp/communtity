"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { heroIntroCards } from "./data";
import Link from "next/link";

const HeroIntroCard: React.FC = () => {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<any | null>(null);

  useEffect(() => {
    const matchedCard = heroIntroCards.find((card) => card.path === pathname);
    if (matchedCard) {
      setCurrentCard(matchedCard);
    }
  }, [pathname]);

  const changeCard = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCard) {
        setCurrentIndex((prevIndex) =>
          prevIndex === currentCard.items.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentCard]);

  if (!currentCard) return null;

  return (
    <div
      className={`relative shadow-md rounded-xl p-4 flex items-center justify-between space-x-4 w-full max-w-full transition-all duration-500 ${currentCard.shadow}`}
      style={{
        backgroundImage: `url(${currentCard.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex flex-row justify-between my-4">
        <div>
          <div className="bg-Navy text-white rounded-full px-3 py-1 text-xs font-semibold mb-2">
            {currentCard.items[currentIndex].label}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {currentCard.items[currentIndex].title}
          </h2>
        </div>
        <div className="hidden lg:block">
          <Link
            href={currentCard.items[currentIndex].link}
            className="px-2 py-1 rounded-full bg-white text-sm font-light hover:bg-Gray transition ease-linear duration-100"
          >
            click here
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 left-1 w-20 flex justify-between">
        {currentCard.items.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => changeCard(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroIntroCard;
