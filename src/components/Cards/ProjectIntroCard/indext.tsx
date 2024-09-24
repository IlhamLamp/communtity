import { useState } from "react";

const ProjectIntroCard: React.FC<{ cards: any[] }> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const changeCard = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative bg-blue-600 text-white rounded-lg p-6 flex items-center justify-between space-x-4 w-full transition-all duration-500">
      <div>
        <div className="bg-blue-400 rounded-full px-3 py-1 text-xs font-semibold mb-2">
          {cards[currentIndex].label}
        </div>
        <h2 className="text-2xl font-bold">{cards[currentIndex].title}</h2>
      </div>
      <div className="relative">
        <div className="w-24 h-24 bg-white rounded-full overflow-hidden">
          <img src={cards[currentIndex].image} alt="Illustration" className="object-cover w-full h-full" />
        </div>
      </div>
      <div className="absolute bottom-4 left-6 w-20 flex justify-between">
        {cards.map((_: any, index: number) => (
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

export default ProjectIntroCard;