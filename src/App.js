import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Authors, Books, Signup, SignIn, SingleAuthor, SingleBooks } from "./pages"





function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/books" element={<Books/>} />
          <Route path="/authors" element={<Authors/>} />
          <Route path="/books/:id" element={<SingleBooks/>} />
          <Route path="/authors/:id" element={<SingleAuthor/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
