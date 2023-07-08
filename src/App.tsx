import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import Plan from './pages/plan';
import DesignPage from './pages/main/design/design';
import IntroPage from './pages/main/intro/intropage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}`} element={<Main />} />
        <Route path='/plan' element={<Plan />} />
        <Route path='/design' element={<DesignPage />} />
        <Route path='/intro' element={<IntroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
