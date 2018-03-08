import React              from 'react'
import { Route, Switch }  from 'react-router-dom'

import Header   from "@/app/components/templates/header"
import Main     from "@/app/components/templates/main"
import Footer   from "@/app/components/templates/footer"

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <Header />
  
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        
        <Footer />
      </React.Fragment>
    )
  }
}

export default App