import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';

function Header({ tryAgain, setTryAgain }) {
  function resetTryAgain() {
    setTryAgain(false)
  }

  return (
    <header className='header wrapper'>
      <div className='header__container'>
        <div className='logo'>
          <img src={Logo} alt='Logo' />
        </div>

        { tryAgain && (
            <div className="try-again">
              <Link onClick={resetTryAgain} to="/">Embaralhar novamente</Link>
            </div>
          )
        }
      </div>
    </header>
  );
}

export default Header;
