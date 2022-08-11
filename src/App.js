import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DashBoardPage from './pages/dashboard';

 
function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={DashBoardPage} exact={true} />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
