import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  businesses: string[];
  handleAddBusiness: () => void;
}

export default function Sidebar({ businesses, handleAddBusiness }: SidebarProps) {
  return (
    <aside className="w-1/6 bg-gray-800 text-white p-4">
      <div className="flex justify-center mb-4">
        <Link href="/">
          <Image
            src="/NovaCopy_white_transparent.png"
            alt="NovaCopy Logo"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <ul>
        <li>Dashboard</li>
        <li>Copy Generator</li>
        <li>Menu Item 3</li>
      </ul>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">ビジネスの切り替え</h2>
        {businesses.map((business, index) => (
          <button
            key={index}
            className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {business}
          </button>
        ))}
        {businesses.length === 1 && (
          <button
            onClick={handleAddBusiness}
            className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            ビジネスを追加
          </button>
        )}
      </div>
    </aside>
  );
}
