import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlist from "./pages/Watchlist";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Category from "./pages/category";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResult";
import NotFound from "./pages/NotFound";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import GenrePage from "./pages/GenrePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
