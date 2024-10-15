import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './App.css'
import { Header } from './features/Header/Header'
import { GamesList } from './features/Games/GamesList/GamesList'
import { GameDetails } from './features/Games/GameDetails/GameDetails'
import { setGames } from './features/Games/gamesSlice'
import { gameData } from './api/gameData'

function App () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGames(gameData));
  }, [dispatch])
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
    </Router>
  );
}

export default App;
