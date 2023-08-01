import { useState } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Pagination from "../../utils/Navigation";
import "./home.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={50}
        pageSize={5}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home;
