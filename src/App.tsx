import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "@/pages/Landing";
import StudentLayout from "@/pages/student/StudentLayout";
import StudentHome from "@/pages/student/Home";
import Quiz from "@/pages/student/Quiz";
import DeepQuiz from "@/pages/student/DeepQuiz";
import Match from "@/pages/student/Match";
import Discover from "@/pages/student/Discover";
import ClubDetail from "@/pages/student/ClubDetail";
import Profile from "@/pages/student/Profile";
import Applications from "@/pages/student/Applications";
import Compare from "@/pages/student/Compare";
import Messages from "@/pages/student/Messages";
import ClubLayout from "@/pages/club/ClubLayout";
import ClubDashboard from "@/pages/club/Dashboard";
import ClubApplications from "@/pages/club/ClubApplications";
import SchoolLayout from "@/pages/school/SchoolLayout";
import SchoolDashboard from "@/pages/school/Dashboard";
import SchoolComplaints from "@/pages/school/Complaints";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<StudentHome />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="quiz/deep" element={<DeepQuiz />} />
        <Route path="match" element={<Match />} />
        <Route path="discover" element={<Discover />} />
        <Route path="club/:id" element={<ClubDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="compare" element={<Compare />} />
        <Route path="messages" element={<Messages />} />
      </Route>
      <Route path="/club" element={<ClubLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ClubDashboard />} />
        <Route path="applications" element={<ClubApplications />} />
      </Route>
      <Route path="/school" element={<SchoolLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SchoolDashboard />} />
        <Route path="complaints" element={<SchoolComplaints />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
