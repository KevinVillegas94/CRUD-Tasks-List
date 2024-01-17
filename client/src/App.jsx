import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TasksPage } from './pages/TasksPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { Navigation } from './components/Navigation';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Navigate to="/tasks" />} />
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/tasks-crate' element={<TaskFormPage />} />
          <Route path='/tasks/:id' element={<TaskFormPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );

}

export default App