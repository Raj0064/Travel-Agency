import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Explore from "./components/Explore"
import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"
import PackagesPage from "./components/admin/PackagesPage"
import CreatePackage from "./components/admin/CreatePackage"
import { ThemeProvider } from "@/components/theme-provider"
import BookingForm from "./components/BookingForm"
import UpdatePackage from "./components/admin/UpdatePackage"
import ViewAllBookings from "./components/admin/ViewAllBookings"


function App() {
  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path: "/explore",
      element: <Explore />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <SignUp />
    },
    {
      path: "/packages",
      element: <PackagesPage />
    },
    {
      path: "/packages/create",
      element: <CreatePackage />
    },
    {
      path: "/packages/update/:id",
      element: <UpdatePackage />
    },
    {
      path: "/packages/:id/bookings",
      element: <ViewAllBookings/>
    },
    {
      path: "/book/:id",
      element: <BookingForm />
    },
  ])
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={appRouter} />
      </ThemeProvider>
    </>
  )
}

export default App
