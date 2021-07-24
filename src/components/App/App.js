import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <AddMovie />
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* Details page */}
        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
