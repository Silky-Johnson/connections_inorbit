import { useState } from "react";

interface CardProps {
  //   gCategory: string;
  //   gDifficulty: number;
  gWord: string;
  onSelectCard: (word: string) => boolean;
}

const Card = ({ gWord, onSelectCard }: CardProps) => {
  const [isSelected, toggleIsSelected] = useState(false);

  const selectWord = () => {
    let allowed = onSelectCard(gWord);
    toggleIsSelected(allowed);
  };

  const setClassName = isSelected
    ? "grid-item-content active"
    : "grid-item-content";

  return (
    <div className="grid-item">
      <div className={setClassName} onClick={selectWord}>
        {gWord}
      </div>
    </div>
  );
};

export default Card;
