import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Container() {
  const [nameAdded, setNameAdded] = useState([]);

  const input = useRef();
  const textarea = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    function fetchTextareaNames(arr) {
      if (textarea.current.value === '') {
        arr.forEach((name) => (textarea.current.value += name + '\n'));
      }
    }

    function fetchNames() {
      let ArrBackup = JSON.parse(localStorage.getItem('names')) || [];

      setNameAdded(ArrBackup);
      fetchTextareaNames(ArrBackup);
    }

    fetchNames();
  }, []);

  function setTextInTextarea(arr) {
    if (arr.length === 0) {
      return;
    }

    textarea.current.value += arr[arr.length - 1] + '\n';
  }

  function addTextToArray() {
    if (input.current.value === '') {
      return;
    }

    const arr = [...nameAdded];
    arr.push(input.current.value);
    setNameAdded(arr);
    localStorage.setItem('names', JSON.stringify(arr));
    setTextInTextarea(arr);
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
    textarea.current.value = '';
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

        <textarea ref={textarea} readOnly className='hero-displayer' />

        <button onClick={saveShuffledArr} type='button' className='shuffle-btn'>
          Embaralhar
        </button>
        <button onClick={resetNames} type='button' className="reset-btn">Reset</button>
      </div>
    </section>
  );
}

export default Container;
