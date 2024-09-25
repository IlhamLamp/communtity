'use client';
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
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

  if (!currentCard) return null;

  return (
    <div 
      className={`relative text-white shadow-md rounded-xl p-4 flex items-center justify-between space-x-4 w-full transition-all duration-500 ${currentCard.shadow}`}
      style={{
        backgroundImage: `url(${currentCard.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <div className="bg-blue-400 rounded-full px-3 py-1 text-xs font-semibold mb-2">
          {currentCard.items[currentIndex].label}
        </div>
        <h2 className="text-2xl font-bold">{currentCard.items[currentIndex].title}</h2>
      </div>
      <div className="relative w-24 h-24 justify-center items-center">
        <Link href={currentCard.items[currentIndex].link} className="p-2 bg-white">SAD</Link>
      </div>
      <div className="absolute bottom-4 left-6 w-20 flex justify-between">
        {currentCard.items.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => changeCard(index)}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroIntroCard;
