import './App.css';
import '../common/common.css';

import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';

import TablePage from '../features/resources/components/TablePage';
import TableWithSourcePage from '../features/resources/components/TablePage/TableWithSourcePage';
import DetailsPage from '../features/resources/components/DetailsPage';
import ResourceTypeGuard from '../features/resources/components/ResourceTypeGuard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/details/:type/:id">
          <ResourceTypeGuard>
            <DetailsPage/>
          </ResourceTypeGuard>
        </Route>
        <Route path="/table/:type/source/:sourceType/:sourceId/:sourceField">
          <ResourceTypeGuard>
            <TableWithSourcePage/>
          </ResourceTypeGuard>
        </Route>
        <Route path="/table/:type/page/:page">
          <ResourceTypeGuard>
            <TablePage/>
          </ResourceTypeGuard>
        </Route>
        <Route path="/table/:type">
          <ResourceTypeGuard>
            <TablePage/>
          </ResourceTypeGuard>
        </Route>
        <Route path="/">
          <Redirect to="/table/planets"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
