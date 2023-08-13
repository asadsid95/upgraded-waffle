import LeftSideBar from "./components/LeftSidebar"
import Middlebar from "./components/Middlebar"
import RightSidebar from "./components/RightSidebar"

const Home = () => {

  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
      <div className="max-w-screen-xl w-full h-full flex relative">
        <LeftSideBar />

        <Middlebar />

        <RightSidebar />

      </div>

    </div>
  )
}

export default Home