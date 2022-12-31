import React, { useEffect, useState } from 'react';

function ResultSection({ tryAgain, setTryAgain }) {
  const [resultStarted, setResultStarted] = useState(false);
  const [isPrevArrEmpty, setIsPrevArrEmpty] = useState(true);
  const [name, setName] = useState('');
  const [savedNames, setSavedNames] = useState([]);
  const [savedNamesBackup, setSavedNamesBackup] = useState([]);

  useEffect(() => {
    function fetchNames() {
      const arr = JSON.parse(localStorage.getItem('names')) || [];

      setSavedNames(arr);
    }

    fetchNames();
  }, []);

  function isArrayEmpty(arr) {
    return arr.length === 0
  }

  function isPrevArrayAboveOneElement(arr) {
    return arr.length <= 1;
  }

  function getName() {
    setResultStarted(true);
    const nameArr = [...savedNames];
    const nameBackup = [...savedNamesBackup];
    
    if (isArrayEmpty(nameArr)) {
      setName('Clique em Embaralhar Novamente para reiniciar');
      setTryAgain(true);
      return;
    }

    nameBackup.push(nameArr[0]);
    setSavedNamesBackup(nameBackup);
    setName(nameArr.shift());
    setSavedNames(nameArr);
    localStorage.setItem('names', JSON.stringify(nameArr));
  }

  function getPreviousName() {
    const nameArr = [...savedNames];
    const nameBackup = [...savedNamesBackup];
    
    if (isArrayEmpty(nameArr) && tryAgain) {
      setTryAgain(false);
      setName(nameBackup[nameBackup.length - 1]);
      return;
    }
    
    if (!nameArr.includes(nameBackup[nameBackup.length - 1])) {
      console.log("ja tem no array principal")
      setSavedNames([nameBackup.pop() , ...savedNames]);
    }

    setName(nameBackup[nameBackup.length - 1]);
    setSavedNamesBackup(nameBackup);
    localStorage.setItem('names', JSON.stringify(nameArr));
  }

  useEffect(() => {
    function prevArrayAboveWithOneElement() {
      if (isPrevArrayAboveOneElement(savedNamesBackup)) {
        setIsPrevArrEmpty(true);
        console.log('é menor')
        return;
      }
      console.log('pode executar a função')
      setIsPrevArrEmpty(false);
    }

    prevArrayAboveWithOneElement();
  }, [savedNamesBackup])

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
        <button onClick={getPreviousName} className={isPrevArrEmpty ? 'previous-btn disabled' : 'previous-btn'} disabled={isPrevArrEmpty}>Anterior</button>
      </div>
    </section>
  );
}

export default ResultSection;
