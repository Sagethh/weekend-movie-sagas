import './App.css';
import MovieList from '../MovieList/MovieList';
import AddMovie from '../AddMovie/AddMovie';
import {HashRouter as Router, Route} from 'react-router-dom';
import Editor from '../Editor/Editor';

function App() {

  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router> 
        <Route path="/" exact>
        <AddMovie />
        <MovieList />
        </Route>
        <Route path="/editor" exact component={Editor}>
          <Editor />
        </Route>
        </Router>
    </div>
  );
};

export default App;