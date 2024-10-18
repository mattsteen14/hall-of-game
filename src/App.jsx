import { useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './App.css'
import { Header } from './features/Header/Header'
import { GamesList } from './features/Games/GamesList/GamesList'
import { GameDetails } from './features/Games/GameDetails/GameDetails'
import { setGames } from './features/Games/gamesSlice'
import useGetGamesQuery from './api/igdbApiSlice'

function App () {
  const dispatch = useDispatch();
  const { data: games } = useGetGamesQuery();
  useEffect(() => {
    if (games) {
      dispatch(setGames(games));
    }
  }, [games, dispatch]);
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
