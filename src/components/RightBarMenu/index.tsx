'use client';

import { usePathname } from "next/navigation";
import ProjectsRightBar from "../Content/projects/right-bar";

const RightBarMenu: React.FC = () => {
  const path = usePathname();
  
  const WhichLayout = () => {
    switch (path) {
      case '/projects':
        return <ProjectsRightBar />;
      case '/community':
        return 'Community';
      case '/group':
        return 'Group';
      default:
        break;
    }
  }

  return (
    <div>
        <WhichLayout />
    </div>
  )
}

export default RightBarMenu;
