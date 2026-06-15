import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WebLayout from '../components/layout/WebLayout'
import Home from '../pages/Home'
import LetsTalk from '../pages/LetsTalk'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <WebLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lets-talk" element={<LetsTalk />} />
        </Routes>
      </WebLayout>
    </BrowserRouter>
  )
}
