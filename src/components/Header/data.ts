import { faBriefcase, faGift, faHouse, faStreetView, faUsers } from "@fortawesome/free-solid-svg-icons";

export const navMenuItems = [
    {
        icon: faHouse,
        label: 'Home',
        href: '/',
    },
    {
        icon: faUsers,
        label: 'Group',
        href: '/group',
    },
    {
        icon: faStreetView,
        label: 'Nearest',
        href: '/nearest',
    },
    {
        icon: faGift,
        label: 'Gift',
        href: '/gift',
    },
    {
        icon: faBriefcase,
        label: 'Jobs',
        href: '/job',
    },
]