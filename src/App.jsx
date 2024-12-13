import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './App.css'
import { fetchGamesThunk } from './features/Games/gamesSlice'
import { Header } from './features/Header/Header'
import { GamesList } from './features/Games/GamesList/GamesList'
import { GameDetails } from './features/Games/GameDetails/GameDetails'
import { Footer } from './features/Footer/Footer'

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchGamesThunk(1, {}));
  }, [dispatch]);
  
  if(state.games.error) { // Use state.games.error instead of console.error
    return (
      <div className='error'>
        <div className='error-header'>
          <h1>Game Over</h1>
          <h2>Error:{state.games.error}</h2>
        </div>
      </div>
    );
  }


  return (
    <Router>
      <Header />
      <main>
        <section className='game-view'>
          <Routes>
            <Route path='/games/:id' element={<GameDetails />} />
            <Route path='/' element={<GamesList />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
