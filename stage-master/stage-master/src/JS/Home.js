import Footer from "./Footer";
import HomeBody from "./HomeBody";
import Header from "./Header";
function Home(){ 
    return(
    <div class ="container-fuid" className="App">
        <div class="row">
            <Header />
        </div>
        <div class="row">
            <HomeBody />
        </div>
        <div class="row ">
            <Footer/>
        </div>
    </div>
    );
}

export default Home 
