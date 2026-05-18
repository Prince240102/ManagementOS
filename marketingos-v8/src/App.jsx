import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import LoginScreen from './components/Auth/LoginScreen'
import SignupScreen from './components/Auth/SignupScreen'
import MainLayout from './components/Layout/MainLayout'
import Dashboard from './components/Dashboard/Dashboard'
import BrandList from './components/Brands/BrandList'
import BrandDetail from './components/Brands/BrandDetail'
import CampaignList from './components/Campaigns/CampaignList'
import CampaignDetail from './components/Campaigns/CampaignDetail'
import TaskList from './components/Tasks/TaskList'
import TaskDetail from './components/Tasks/TaskDetail'
import OwnerDashboard from './components/Owner/OwnerDashboard'
import AssetsTab from './components/Owner/AssetsTab'

export default function App() {
  // initialises auth listener for the entire tree
  useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />

        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/"               element={<Dashboard />} />
          <Route path="/brands"         element={<BrandList />} />
          <Route path="/brands/:id"     element={<BrandDetail />} />
          <Route path="/campaigns"      element={<CampaignList />} />
          <Route path="/campaigns/:id"  element={<CampaignDetail />} />
          <Route path="/tasks"          element={<TaskList />} />
          <Route path="/tasks/:id"      element={<TaskDetail />} />
          <Route path="/assets"         element={<AssetsTab />} />
          <Route path="/owner"          element={<OwnerDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
