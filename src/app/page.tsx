import LeftSideBar from "./components/LeftSidebar"
import Middlebar from "./components/Middlebar"
import RightSidebar from "./components/RightSidebar"

const Home = async () => {

  return (
    <div className="w-full h-full flex justify-center items-center relative bg-[#15202B] text-white">

      <div className="xl:max-w-[70vw] w-full h-full flex relative">
        <LeftSideBar />

        <Middlebar />

        <RightSidebar />

      </div>

    </div>
  )
}

export default Home