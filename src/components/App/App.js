import './App.css';
import MovieList from '../MovieList/MovieList';
import AddMovie from '../AddMovie/AddMovie';
import {HashRouter as Router, Route} from 'react-router-dom';

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