import {Route, Routes} from "react-router-dom";
import PostList from "./pages/PostList.tsx";
import PostCreate from "./pages/PostCreate.tsx";
import PostEdit from "./pages/PostEdit.tsx";
import PostShow from "./pages/PostShow.tsx";

function App() {


  return (
    <>
      <div>
          <Routes>
              <Route path="/" element={<PostList/>}></Route>
              <Route path="/create" element={<PostCreate/>}></Route>
              <Route path="/edit/:id" element={<PostEdit/>}></Route>
              <Route path="/show/:id" element={<PostShow/>}></Route>
          </Routes>
      </div>
    </>
  )
}

export default App
