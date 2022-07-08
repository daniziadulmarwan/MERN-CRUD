import { Provider } from 'react-redux'
import store from './configs/redux'
import Router from './router'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
