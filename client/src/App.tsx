import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllFilesPage from "./pages/AllFilesPage";
import Layout from "./layout";
import { useAuthContext } from "./context/AuthContext";
import SignUpPage from "./pages/SignUpPage";
import FolderContent from "./pages/FolderContent";
import MyFiles from "./pages/MyFiles";

function App() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/files"
            element={
              user ? (
                <Layout>
                  <AllFilesPage></AllFilesPage>
                </Layout>
              ) : (
                <Navigate to={"/signup"}></Navigate>
              )
            }
          ></Route>

          <Route
            path="*"
            element={
              user ? (
                <Navigate to={"/files"}></Navigate>
              ) : (
                <Navigate to={"/signup"}></Navigate>
              )
            }
          ></Route>

          <Route
            path="/my-files"
            element={
              user ? (
                <Layout>
                  <MyFiles></MyFiles>
                </Layout>
              ) : (
                <Navigate to={"/signup"}></Navigate>
              )
            }
          ></Route>

          <Route
            path="/folders/:folderId/:name"
            element={
              user ? (
                <Layout>
                  <FolderContent></FolderContent>
                </Layout>
              ) : (
                <Navigate to={"/signup"}></Navigate>
              )
            }
          ></Route>

          <Route
            path="/signup"
            element={
              !user ? (
                <SignUpPage></SignUpPage>
              ) : (
                <Navigate to={"/files"}></Navigate>
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
