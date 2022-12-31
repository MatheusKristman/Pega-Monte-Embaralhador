import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Container() {
  const [nameAdded, setNameAdded] = useState([]);

  const input = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    function fetchNames() {
      let ArrBackup = JSON.parse(localStorage.getItem('names')) || [];

      setNameAdded(ArrBackup);
    }

    fetchNames();
  }, []);

  function alreadyHasText(arr, text) {
    return arr.includes(text.toLowerCase());
  }

  function addTextToArray() {
    if (input.current.value === '') {
      return;
    }

    const arr = [...nameAdded];

    if(alreadyHasText(arr, input.current.value)) {
      alert('Nome já esta na lista!')
      input.current.value = '';
      return;
    }

    arr.push(input.current.value.toLowerCase());
    setNameAdded(arr);
    localStorage.setItem('names', JSON.stringify(arr));
    input.current.value = '';
  }

  function addTextToArrayOnEnter(e) {
    if (e.key === 'Enter') {
      addTextToArray();
    }
  }

  function noNamesToShuffle() {
    return nameAdded.length === 0;    
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function navigateToResultPage() {
    navigate('/result');
  }

  function saveShuffledArr() {
    if (noNamesToShuffle()) {
      return;
    }

    const arr = JSON.parse(localStorage.getItem('names'));

    shuffle(arr);

    localStorage.setItem('names', JSON.stringify(arr));

    navigateToResultPage();
  }

  function resetNames() {
    setNameAdded([]);
    localStorage.setItem('names', JSON.stringify([]));
  }

  function deleteNames(index) {
    const arr = [...nameAdded];

    arr.splice(index, 1);

    setNameAdded(arr);
    localStorage.setItem('names', JSON.stringify(arr));
  }

  return (
    <section className='hero wrapper'>
      <div className='hero__container'>
        <div className='input-wrapper'>
          <input onKeyDown={addTextToArrayOnEnter} ref={input} type='text' className='hero-input' />
          <button onClick={addTextToArray} type='submit' className='hero-button'>
            Adicionar
          </button>
        </div>

        <div className='hero-displayer-test'>
          {nameAdded.map((name, index) => (
            <div className="hero-name-added" key={index}>
              <span className="hero-name-added__text">{name}</span>
              <button onClick={() => deleteNames(index)} className="hero-name-added__btn">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </div>

        <button onClick={saveShuffledArr} type='button' className='shuffle-btn'>
          Embaralhar
        </button>
        <button onClick={resetNames} type='button' className="reset-btn">Reset</button>
      </div>
    </section>
  );
}

export default Container;
