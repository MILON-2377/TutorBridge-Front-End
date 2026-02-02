import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Tags,
  UserCircle,
  Users,
} from "lucide-react";

const menuItems = {
  STUDENT: [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Find Tutors", icon: Search, href: "/tutors" },
    { name: "My Bookings", icon: Calendar, href: "/dashboard/bookings" },
    { name: "My Profile", icon: UserCircle, href: "/dashboard/profile" },
  ],
  TUTOR: [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Schedule", icon: Clock, href: "/dashboard/schedule" },
    { name: "My Students", icon: Users, href: "/dashboard/students" },
    { name: "Edit Profile", icon: UserCircle, href: "/dashboard/profile" },
  ],
  ADMIN: [
    { name: "Statistics", icon: BarChart3, href: "/dashboard" },
    { name: "User Management", icon: ShieldCheck, href: "/dashboard/users" },
    { name: "All Bookings", icon: BookOpen, href: "/dashboard/bookings" },
    { name: "Categories", icon: Tags, href: "/dashboard/categories" },
  ],
};

export default menuItems;
