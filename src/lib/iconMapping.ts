import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const iconMapping: Record<string, IconDefinition> = {
  Linkedin: faLinkedin,
  Github: faGithub,
  Instagram: faInstagram,
  Facebook: faFacebook,
  Discord: faDiscord,
  Telegram: faTelegram,
  Twitter: faTwitter,
  Youtube: faYoutube,
  Web: faGlobe,
};
