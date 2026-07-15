import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatedBackground } from './components/layout/AnimatedBackground'
import { CursorEffect } from './components/layout/CursorEffect'
import { LoadingScreen } from './components/sections/LoadingScreen'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'

export default function App() {
  const [loading, setLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <BrowserRouter>
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <AnimatedBackground />
      <CursorEffect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
