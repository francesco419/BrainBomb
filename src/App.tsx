import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import Main from './pages/main/main';
import Plan from './pages/plan';
import IntroPage from './pages/main/intro/intropage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}`} element={<IntroPage />} />
        <Route path='/map' element={<Main />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
