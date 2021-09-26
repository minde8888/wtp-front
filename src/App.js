import Main from './componets/main.jsx'
import './scss/App.scss';

function App(props) {
  return (
    <div className="app-wraper">
      <Main store={props.store} />
    </div>
  );
}

export default App;