import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SettingsProvider } from './hooks/SettingsContext'
import { Layout } from './components/Layout'
import { BrowsePage } from './pages/BrowsePage'
import { FavouritesPage } from './pages/FavouritesPage'
import { ProgramDetailsPage } from './pages/ProgramDetailsPage'
import { ActiveWorkoutPage } from './pages/workout/ActiveWorkoutPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { HistoryPage } from './pages/history/HistoryPage'
import { HistoryDetailPage } from './pages/history/HistoryDetailPage'
import { SettingsPage } from './pages/SettingsPage'
import { CreateChoicePage } from './pages/create/CreateChoicePage'
import { CustomizePickerPage } from './pages/create/CustomizePickerPage'
import { CustomizeProgramPage, NewProgramPage } from './pages/create/ProgramEditorPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <BrowsePage /> },
      { path: 'favourites', element: <FavouritesPage /> },
      { path: 'programs/:id', element: <ProgramDetailsPage /> },
      { path: 'create', element: <CreateChoicePage /> },
      { path: 'create/new', element: <NewProgramPage /> },
      { path: 'create/customize', element: <CustomizePickerPage /> },
      { path: 'create/customize/:id', element: <CustomizeProgramPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'history/:id', element: <HistoryDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // Full-screen, outside the nav layout.
  { path: 'workout/:id', element: <ActiveWorkoutPage /> },
])

export default function App() {
  return (
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  )
}
