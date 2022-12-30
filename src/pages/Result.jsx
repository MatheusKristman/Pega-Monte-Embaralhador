import React, { useState } from 'react';
import Header from './components/Header';
import ResultSection from './components/ResultSection';

function Result() {
  const [isTryAgainDisplayed, setIsTryAgainDisplayed] = useState(false);

  return (
    <>
      <Header tryAgain={isTryAgainDisplayed} setTryAgain={setIsTryAgainDisplayed} />
      <ResultSection tryAgain={isTryAgainDisplayed} setTryAgain={setIsTryAgainDisplayed} />
    </>
  );
}

export default Result;
