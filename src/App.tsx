import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import Plan from './pages/plan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}`} element={<Main />} />
        <Route path='/plan' element={<Plan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
