import { useSelector } from 'react-redux'
import './App.css'
import { Header } from './features/Header/Header'
import { GamesList } from './features/Games/GamesList/GamesList'
import { GameDetails } from './features/Games/GameDetails/GameDetails'
import { selectCurrentGame } from './features/Games/gamesSlice'

function App () {
  const selectedGame = useSelector(selectCurrentGame);
  return (
    <div>
      <Header />
      <main>
        <section className='game-view'>
          {selectedGame ? <GameDetails game={selectedGame} /> : <GamesList />}
        </section>
      </main>
    </div>
  );
}

export default App;
