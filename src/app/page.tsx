import LeftSideBar from "./components/LeftSidebar"
import Middlebar from "./components/Middlebar"
import RightSidebar from "./components/RightSidebar"

const Home = () => {

  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-black ">
      <div className="max-w-screen-xl w-full h-full flex relative">
        <LeftSideBar />

        <Middlebar />

        <RightSidebar />

        {/* <main>Home Timeline</main>
        <section>Right section</section> */}
      </div>

    </div>
  )
}

export default Home