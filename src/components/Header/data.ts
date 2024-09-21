import { faBriefcase, faCommentDots, faHandHoldingHeart, faHouse, faPeopleRoof } from "@fortawesome/free-solid-svg-icons";

export const navMenuItems = [
    {
        icon: faHouse,
        label: 'Home',
        href: '/',
    },
    {
        icon: faPeopleRoof,
        label: 'Group',
        href: '/group',
    },
    {
        icon: faCommentDots,
        label: 'Messages',
        href: '/messages',
    },
    {
        icon: faHandHoldingHeart,
        label: 'Contribution',
        href: '/contribution',
    },
    {
        icon: faBriefcase,
        label: 'Jobs',
        href: '/job',
    },
]