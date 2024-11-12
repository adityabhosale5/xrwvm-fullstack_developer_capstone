import LoginPanel from "./components/Login/Login"
import Registration from "./components/Register/Register"
import Dealers from './components/Dealers/Dealers';
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/Dealers/PostReview";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPanel />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dealers" element={<Dealers/>} />
        <Route path="/dealer/:dealer_id" element={<Dealer/>} />
        <Route path="/postreview/:dealer_id" element={<PostReview/>} />
    </Routes>
  );
}
export default App;
