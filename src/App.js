import './App.css';
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsDetails from './components/cardsDetails';
import Cards from './components/cards';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Header/>
       <Routes>
         <Route path="/" element={<Cards/>} />
         <Route path="/cart/:id" element={<CardsDetails/>} />

       </Routes>
    </>
  );
}

export default App;
