import { faBriefcase, faCommentDots, faHandHoldingHeart, faHouse, faPeopleRoof } from "@fortawesome/free-solid-svg-icons";

export const navMenuItems = [
    {
        icon: faHouse,
        label: 'Home',
        href: '/',
    },
    {
        icon: faBriefcase,
        label: 'Projects',
        href: '/projects',
    },
    {
        icon: faPeopleRoof,
        label: 'Group',
        href: '/group',
    },
    // {
    //     icon: faCommentDots,
    //     label: 'Messages',
    //     href: '/messages',
    // },
    {
        icon: faHandHoldingHeart,
        label: 'Events',
        href: '/events',
    },
]