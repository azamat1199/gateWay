import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from './routes/routes';
import './style/css/sidebarCabinet.css';
import './style/css/sidebar.css';
import MainEduGate from './containers/web/pages/MainEduGate';
import Home from './containers/consultantBackoffice/univerBackoffice/pages/home';

function App() {
  // const selector = useSelector(state=>state)
  // console.log(selector.user)
  // const {access} = selector.user;
  // const {user} = selector.user;
   return (  
    <div className="container">
      <Switch>
        {routes.public.map((item) => {
          return <Route {...item} />;
        })}
      </Switch>
      <div className="asos_u">
          <Switch>
            {routes.univerOffice.map(item=>{
              return(
                <Route {...item}/>
              )
            })}
          </Switch>
        </div>
      <div className="switchs">
      <Switch>
        {routes.consult.map(item=>{
        return(
        <Route {...item}/>
          )
        })}
    </Switch>
    </div>
      <div className="kabinet">
      <Switch>
        {
          routes.student.map(item=>{
            return(
              <Route {...item}/>
            )
          })
        }
      
      </Switch>
    </div>
      <div className="kabinet">
      <Switch>
        {
          routes.notarius.map(item=>{
            return(
              <Route {...item}/>
            )
          })
        }
      
      </Switch>
    </div>
  </div>

 )
}

export default App;
