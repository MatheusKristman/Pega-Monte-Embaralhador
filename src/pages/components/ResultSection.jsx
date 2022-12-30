import React, { useEffect, useState } from 'react';

function ResultSection({ tryAgain, setTryAgain }) {
  const [resultStarted, setResultStarted] = useState(false);
  const [name, setName] = useState('');
  const [savedNames, setSavedNames] = useState([]);

  useEffect(() => {
    function fetchNames() {
      const arr = JSON.parse(localStorage.getItem('names'));

      setSavedNames(arr);
    }

    fetchNames();
  }, []);

  function isArrayEmpty(arr) {
    return arr.length === 0
  }

  function getName() {
    setResultStarted(true);
    const nameArr = [...savedNames];

    if (isArrayEmpty(nameArr)) {
      setName('Clique em Embaralhar Novamente para reiniciar');
      setTryAgain(true);
      return;
    }

    setName(nameArr.shift());
    setSavedNames(nameArr);
    localStorage.setItem('names', JSON.stringify(nameArr));
  }

  return (
    <section className='result wrapper'>
      <div className='result__container'>
        <div className='result-displayer'>
          {resultStarted ? (            
            <h3>{name}</h3>
          ) : (
            <span>Clique no botão para começar</span>
          )}
        </div>
        <button onClick={getName} className={tryAgain ? 'start-btn disabled' : 'start-btn'} disabled={tryAgain}>{resultStarted ? 'Proximo' : 'Começar'}</button>
      </div>
    </section>
  );
}

export default ResultSection;
