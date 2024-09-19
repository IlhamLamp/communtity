import { role } from "@/lib/data";
import { menuItems } from "./data";
import Link from "next/link";
import Image from "next/image";

const Menu: React.FC = () => {
    return (
        <div className="text-sm">
            {menuItems.map((i) => (
            <div className="flex flex-col gap-2" key={i.title}>
                <span className="hidden lg:block text-gray-400 font-light my-4">
                {i.title}
                </span>
                {i.items.map((item) => {
                if (item.visible.includes(role)) {
                    return (
                    <Link
                        href={item.href}
                        key={item.label}
                        className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-PurpleLight hover:text-Navy"
                    >
                        <Image src={item.icon} alt="" width={20} height={20} />
                        <span className="hidden lg:block">{item.label}</span>
                    </Link>
                    );
                }
                })}
            </div>
            ))}
        </div>
    )
}

export default Menu;