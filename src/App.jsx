import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './App.css'
import { Header } from './features/Header/Header'
import { GamesList } from './features/Games/GamesList/GamesList'
import { GameDetails } from './features/Games/GameDetails/GameDetails'
import { fetchGamesThunk } from './features/Games/gamesSlice'

function App () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGamesThunk());
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
