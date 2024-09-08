"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPen,
  faInfoCircle,
  faShoppingCart,
  faTag,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [saveStats, setSaveStats] = useState<{
    week: number;
    month: number;
    allTime: number;
  }>({
    week: 0,
    month: 0,
    allTime: 0,
  });
  const [dailySaveData, setDailySaveData] = useState<number[]>([]);
  const router = useRouter();

  // Calculate save statistics
  useEffect(() => {
    const timestamps = JSON.parse(
      localStorage.getItem("copyTimestamps") || "[]"
    );
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const weekCount = timestamps.filter(
      (timestamp: string) => new Date(timestamp) > oneWeekAgo
    ).length;

    const monthCount = timestamps.filter(
      (timestamp: string) => new Date(timestamp) > oneMonthAgo
    ).length;

    const allTimeCount = timestamps.length;

    setSaveStats({
      week: weekCount,
      month: monthCount,
      allTime: allTimeCount,
    });

    // Calculate daily save counts for the past week
    const dailyCounts = Array(7).fill(0); // Array to store daily counts for the past week
    timestamps.forEach((timestamp: string) => {
      const date = new Date(timestamp);
      if (date > oneWeekAgo) {
        const diffDays = Math.floor(
          (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays < 7) {
          dailyCounts[6 - diffDays] += 1;
        }
      }
    });

    setDailySaveData(dailyCounts);
  }, []);

  const handleIconClick = (label: string) => {
    router.push(`/copywriter?type=${encodeURIComponent(label)}`);
  };

  const ClickableIcon = ({
    label,
    icon,
    onClick,
  }: {
    label: string;
    icon: JSX.Element;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] hover:text-white rounded-full p-2"
    >
      <div className="bg-[#1a1a2e] p-3 rounded-full mb-2 flex items-center justify-center transition-all duration-300">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  const SidebarItem = ({
    label,
    icon,
    href,
  }: {
    label: string;
    icon: JSX.Element;
    href: string;
  }) => {
    const router = useRouter();

    return (
      <div
        onClick={() => router.push(href)}
        className="flex items-center px-4 py-2 space-x-2 hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md cursor-pointer transition-all duration-300 whitespace-nowrap z-10"
      >
        <div className="flex items-center justify-center w-6 h-12">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    );
  };

  // Data for the graph
  const activityData = {
    labels: [
      "6 Days Ago",
      "5 Days Ago",
      "4 Days Ago",
      "3 Days Ago",
      "2 Days Ago",
      "1 Day Ago",
      "Today",
    ],
    datasets: [
      {
        label: "Saves This Week",
        data: dailySaveData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const activityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.raw} saves`,
        },
      },
    },
  };

  return (
    <div className="relative h-screen overflow-hidden flex overflow-y-auto">
      <StarsBackground />
      <ShootingStars />
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-60 h-full bg-[#1a1a2e] p-4 shadow-lg z-20">
        <div className="flex items-center mb-5">
          <Image
            src="/NovaCopy_white.png"
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3 mt-5 text-white">
            <h2 className="text-xl font-semibold">NovaCopy AI</h2>
            <button className="text-[#00b4d8] hover mt-4">
              Upgrade your plan
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <SidebarItem
            label="Create Custom Copy"
            icon={<svg />}
            href="/copywriter"
          />
          <SidebarItem
            label="Previous Copies"
            icon={<svg />}
            href="/previous-copies"
          />
          <SidebarItem label="Settings" icon={<svg />} href="/settings" />
          <SidebarItem label="Feedback" icon={<svg />} href="/feedback" />
        </div>
        <div className="m-5 mt-10">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md hover:bg-[#0489b1] transition-all duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 ml-60 mt-10 text-white z-10">
        <div className="flex items-center justify-between mb-7">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] bg-clip-text text-transparent">
                Welcome
              </span>{" "}
              back!
            </h1>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 mt-4 border border-gray-700 rounded-lg bg-[#1a1a2e] text-white"
            />
          </div>
          <button
            onClick={() => router.push("/copywriter")}
            className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md flex items-center space-x-2 shadow-lg"
          >
            <span>+</span>
            <span>Create a copy</span>
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            What copy would you like to generate today?
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <ClickableIcon
              label="Email Ad"
              icon={<FontAwesomeIcon icon={faEnvelope} />}
              onClick={() => handleIconClick("Email Ad")}
            />
            <ClickableIcon
              label="Facebook Ad"
              icon={<FontAwesomeIcon icon={faFacebook} />}
              onClick={() => handleIconClick("Facebook Ad")}
            />
            <ClickableIcon
              label="Instagram Ad"
              icon={<FontAwesomeIcon icon={faInstagram} />}
              onClick={() => handleIconClick("Instagram Ad")}
            />
            <ClickableIcon
              label="Social Media Caption"
              icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => handleIconClick("Social Media Caption")}
            />
            <ClickableIcon
              label="About Us Page"
              icon={<FontAwesomeIcon icon={faInfoCircle} />}
              onClick={() => handleIconClick("About Us Page")}
            />
            <ClickableIcon
              label="Sales Page"
              icon={<FontAwesomeIcon icon={faShoppingCart} />}
              onClick={() => handleIconClick("Sales Page")}
            />
            <ClickableIcon
              label="Product Description"
              icon={<FontAwesomeIcon icon={faTag} />}
              onClick={() => handleIconClick("Product Description")}
            />
            <ClickableIcon
              label="Google Ad"
              icon={<FontAwesomeIcon icon={faGoogle} />}
              onClick={() => handleIconClick("Google Ad")}
            />
          </div>
        </div>

        <div className="flex space-x-6 pb-7">
          <div className="flex-1 bg-[#1a1a2e] p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Metrics</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Number of copies generated:
              </h3>
              <p className="mb-3">This week: {saveStats.week}</p>
              <p className="mb-3">This month: {saveStats.month}</p>
              <p className="mb-3">All time: {saveStats.allTime}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Number of copies left:
              </h3>
              <p>-----</p>
            </div>
          </div>
          <div className="flex-1 bg-[#1a1a2e] p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Activity Graph</h2>
            <div className="h-64">
              <Line data={activityData} options={activityOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
