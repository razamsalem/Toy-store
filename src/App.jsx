import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/css/main.css'

import { Home } from './views/Home'
import { AppHeader } from './cmps/AppHeader'
import { store } from './store/store'
import { ToyDetails } from './views/ToyDetails'
import { ToyEdit } from './views/ToyEdit'
import { ToyIndex } from './views/ToyIndex'
import { About } from './views/About'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/toy" element={<ToyIndex />} />
            <Route path="/toy/:toyId" element={<ToyDetails />} />
            <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
            <Route path="/toy/edit/" element={<ToyEdit />} />

          </Routes>
        </section>
      </Router>
    </Provider>
  )
}
