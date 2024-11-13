import React, { createContext, useReducer } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import StudentRegistration from "./components/StudentRegistration";
import TeacherRegistration from "./components/TeacherRegistration";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import Protected from "./components/Protected";
import AdminProtected from "./AdminDashboard/AdminProtected";
import AdminLogin from "./AdminDashboard/AdminLogin";
import TeacherProfile from "./components/Teacherprofile";
import TeachersList from "./components/TeachersList";
import StudentsList from "./AdminDashboard/components/Students";
import Teachers from "./AdminDashboard/components/Teachers";
import { Dashboard } from "./AdminDashboard/Dashboard";
import { AdminProfile } from "./AdminDashboard/components/AdminProfile";
import StudentReg from "./AdminDashboard/components/StudentReg";
import TeacherReg from "./AdminDashboard/components/TeacherReg";
import Library from "./AdminDashboard/components/Library";
import { reducerFun, initialState } from "../src/Reducer/UseReducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LibraryPage from "./components/Library/LibraryPage";
import Books from "./components/Library/Books";
import ChartsTotalUser from "./AdminDashboard/ChartsTotalUser";
import AdminRegister from "./AdminDashboard/AdminRegister";
import SingleTeacherProfile from "./components/SingleTeacherProfile";
import { Kanbanboard } from "./modules/Kanbanboard/Kanbanboard";
import TaskMaker from "./modules/Kanbanboard/TaskMaker";
import LineChart from "./modules/charts/LineChart/LineChart";
import BarChartApp from "./modules/charts/barChart/BarChartApp";
import StackedBarChart from "./modules/charts/StackedBarChart/StackedBarChartApp";
import PieChartApp from "./modules/charts/PieChart/PieChartApp";
import AreaChartApp from "./modules/charts/AreaChart/AreaChartApp";
import StackedAreaChart from "./modules/charts/StackedAreaChart/StackedAreaChartApp";
import VideoCallHome from "./pages/VideoCallHome";
import RoomPage from "./pages/Room";
import { SocketProvider } from "./providers/Socket";
import { PeerProvider } from "./providers/Peer";


import Chat from "./pages/Chat";

// Create a ContextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <SocketProvider>
      <PeerProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/teacherregistration"
            element={<TeacherRegistration />}
          />
          <Route
            path="/studentregistration"
            element={<StudentRegistration />}
          />
          <Route path="/teacherprofile" element={<TeacherProfile />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/myprofile" element={<Protected Page={MyProfile} />} />
          <Route
            path="/teacherslist"
            element={<Protected Page={TeachersList} />}
          />
          <Route
            path="/teacherslist/:_id"
            element={<Protected Page={SingleTeacherProfile} />}
          />
          <Route path="/chat" element={<Protected Page={Chat} />} />
          {/* Library Routes */}
          <Route path="/library" element={<Protected Page={LibraryPage} />} />
          <Route
            path="/library/:ClassName"
            element={<Protected Page={Books} />}
          />

          {/* Admin Routers */}
          <Route
            path="/dashboard"
            element={<AdminProtected Page={Dashboard} />}
          />
          <Route
            path="/dashboard/studentslist"
            element={<AdminProtected Page={StudentsList} />}
          />
          <Route
            path="/dashboard/teacherslist"
            element={<AdminProtected Page={Teachers} />}
          />
          <Route
            path="/dashboard/profile"
            element={<AdminProtected Page={AdminProfile} />}
          />
          <Route
            path="/dashboard/student-register"
            element={<AdminProtected Page={StudentReg} />}
          />
          <Route
            path="/dashboard/teacher-register"
            element={<AdminProtected Page={TeacherReg} />}
          />
          <Route
            path="/dashboard/library"
            element={<AdminProtected Page={Library} />}
          />
          <Route
            path="/dashboard/total-user"
            element={<AdminProtected Page={ChartsTotalUser} />}
          />
          <Route
            path="/dashboard/admin-register"
            element={<AdminProtected Page={AdminRegister} />}
          />
          <Route
            path="/admin-login"
            element={<AdminProtected Page={AdminLogin} />}
          />

          {/*Talib Routes */}
          <Route path="/kanbanboard" element={<Kanbanboard />} />
          <Route path="/task_maker" element={<TaskMaker />} />
          <Route
            path="/line-chart"
            element={<AdminProtected Page={LineChart} />}
          />
          <Route
            path="/bar-chart"
            element={<AdminProtected Page={BarChartApp} />}
          />
          <Route
            path="/stackedbar-chart"
            element={<AdminProtected Page={StackedBarChart} />}
          />
          <Route
            path="/pie-chart"
            element={<AdminProtected Page={PieChartApp} />}
          />
          <Route
            path="/area-chart"
            element={<AdminProtected Page={AreaChartApp} />}
          />
          <Route
            path="/stackedarea-chart"
            element={<AdminProtected Page={StackedAreaChart} />}
          />
          <Route path="/home" element={<VideoCallHome />} />
          <Route path="/room/:id" element={<RoomPage />} />
        </Routes>
      </PeerProvider>
    </SocketProvider>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducerFun, initialState);
  // const [dashboardDisable, setDashboardDisable] = useState(false);
  // const [currentURL, setCurrentURL] = useState(window.location.href);

  // const url = window.location.href;
  // useEffect(() => {
  //   const urlArr = url.split("/");
  //   console.log(" urlArr[url.length - 1] : ", urlArr[urlArr.length - 1]);
  //   const isDashboard = urlArr[urlArr.length - 1] === "dashboard";
  //   // console.log("isDashboard : ", isDashboard);
  //   if (isDashboard) {
  //     setDashboardDisable(true)
  //   }
  // }, [currentURL]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        {/* {!dashboardDisable && <Navbar />} */}
        {/* <Navbar /> */}
        <Routing />
        {/* <Footer /> */}
        {/* {!dashboardDisable && <Footer />} */}
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
