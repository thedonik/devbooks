import Banner from "../components/Banner";
import Header from "../components/Header";
import Search from "../components/Search";
import './books.scss';


export default function Books() {
  return (
    <div className="container books">
      <Header/>
      <Banner/>
      <Search/>
    </div>
  )
}
