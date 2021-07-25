import './App.css';
import MovieList from '../MovieList/MovieList';
import AddMovie from '../AddMovie/AddMovie';

function App() {

  return (
    <div className="App">
      <h1 style={{color: "white"}}>The Movies Saga!</h1>
          <AddMovie />
        <MovieList />
    </div>
  );
};

export default App;