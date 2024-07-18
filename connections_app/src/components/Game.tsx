import { useState } from "react";
import { ANSWER_SHEET } from "../lib/data";
import Card from "./Card";
import Button from "./Button";
import Mistake from "./Mistake";
import Lost from "./Modals/Lost";

let selectedAnswers: any[] = [];

const Game = () => {
  const [words, setWords] = useState(ANSWER_SHEET);
  const [cardKey, setCardKey] = useState(0);
  const [mistakes, setMistakes] = useState(4);
  const [isGameOver, setGameOver] = useState(true);
  const [victory, setVictory] = useState(true);

  /* Shuffles the words currently used in game.
   * Moves words from the front half of the array to the
   * back half, giving O(n) time!
   * BIG LEARNING in this function. I'd like to talk about
   * what I learned here!
   */
  const shuffleWords = () => {
    let tempWords = [...words];
    let index = words.length,
      t,
      i;

    while (index) {
      i = Math.floor(Math.random() * index--);

      t = tempWords[index];
      tempWords[index] = tempWords[i];
      tempWords[i] = t;
    }

    setWords(tempWords);
  };

  /*
   * When a word is selected by the user, it will highlight
   * the card, and keep it selected unless clicked again
   * by the user.
   *
   * @param wd The word on the card to be checked whether its' already selected
   * @return True if the word was not selected, and was added to the selectedAnswers array
   */
  const selectWord = (wd: string): boolean => {
    const currentSelected = selectedAnswers.find((word) => wd === word.word);
    if (currentSelected) {
      selectedAnswers = selectedAnswers.filter((item) => item.word !== wd);
      return false;
    }

    const found = words.find((word) => wd === word.word);

    if (selectedAnswers.length < 4 && found) {
      selectedAnswers.push(found);
      return true;
    }

    return false;
  };

  /*
   * Removes the highlighting of the selected cards, and empties
   * the selectedAnswers array.
   */
  const deselectAnswers = () => {
    selectedAnswers = [];
    setCardKey((prevKey) => prevKey + 1);
  };

  /*
   * Submits the answers selected. If there are less than 4 answers
   * selected, the submit function will not run. If the user submits
   * a wrong answer, then they will lose a remaining mistake, as noted
   * but the pips on the screen.
   *
   * TODO: if user selects a correct group of four, a new card is formed
   *       with the information pertaining to the group, and is moved to the
   *       top of the grid.
   */
  const submit = () => {
    if (selectedAnswers.length !== 4) {
      return false;
    }

    const firstCategory = selectedAnswers[0].category;
    const sameCategory = selectedAnswers.every(
      (word) => word.category === firstCategory
    );

    if (sameCategory) {
      console.log("DO WE GET HERE!@?!??!");
    } else {
      setMistakes(mistakes - 1);
    }

    if (mistakes === 0) {
      setGameOver(true);
      setVictory(false);
    }
  };

  return (
    <>
      {isGameOver && victory ? null : <Lost></Lost>}
      <div className="grid-wrapper">
        {words.map((word) => (
          <Card
            gWord={word.word}
            onSelectCard={selectWord}
            key={`${word.word} - ${cardKey}`}
          ></Card>
        ))}
      </div>

      <div className="mistake-wrapper">
        Mistakes Remaining:
        {Array.from({ length: mistakes }, (_, index) => (
          <Mistake key={index} />
        ))}
      </div>

      <div className="button-wrapper">
        <Button onClick={shuffleWords} text="Shuffle" />
        <Button onClick={deselectAnswers} text="Deselect All" />
        <Button onClick={submit} text="Submit" />
      </div>
    </>
  );
};

export default Game;
