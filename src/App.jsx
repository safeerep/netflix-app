import './App.css'
import Row from './components/Rows/Rows'
import Main from './components/Main/Main'
import Navbar from './components/NavBar/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Main />
      <Row title='Netflix Originals' firstRow/>
      <Row title='Trending' />
    </>
  )
}

export default App
