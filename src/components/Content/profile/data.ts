import { faLinkedin, faGithub, faInstagram, faFacebook, faDiscord, faTelegram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export const profileData = {
    data: {
        _id: "e7126500-528b-4080-8591-a94513394899",
        user_id: 98,
        first_name: 'Kamisato',
        last_name: 'Ayaka',
        username: 'Kamisato',
        phone: 838121323,
        address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip_code: 1001
        },
        profile_picture: "test",
        profile_cover: "testcover",
        role: "DevOps Engineer",
        about: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore similique fugiat dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic eligendi vitae animi nam in, est earum culpa illum aliquam. Atque aperiam et voluptatum voluptate distinctio, nostrum hic voluptatibus nisi. Eligendi voluptatibus numquam maxime voluptatem labore similique qui illo est magnam adipisci autem quisquam, quia incidunt excepturi, possimus odit praesentium?",
        social_links: [
            {
                id: 1,
                icon: faLinkedin,
                link: 'https://linkedin.com',
                is_exist: true,
            },
            {
                id: 2,
                icon: faGithub,
                link: 'https://github.com',
                is_exist: false,
            },
            {
                id: 3,
                icon: faInstagram,
                link: 'https://instagram.com',
                is_exist: true,
            },
            {
                id: 4,
                icon: faFacebook,
                link: 'https://facebook.com',
                is_exist: true,
            },
            {
                id: 5,
                icon: faDiscord,
                link: 'https://discord.com',
                is_exist: false,
            },
            {
                id: 6,
                icon: faTelegram,
                link: 'https://telegram.org',
                is_exist: true,
            },
            {
                id: 7,
                icon: faTwitter,
                link: 'https://twitter.com',
                is_exist: false,
            },
            {
                id: 8,
                icon: faYoutube,
                link: 'https://youtube.com',
                is_exist: true,
            },
            {
                id: 9,
                icon: faGlobe,
                link: 'https://example.com',
                is_exist: true,
            }
        ],
        is_active: true,
        created_at: "2024-09-23T14:12:09Z",
        updated_at: "2024-09-23T14:12:09Z",
    },
};