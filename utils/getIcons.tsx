import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io5"; 
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

const iconSets: Record<string, Record<string, React.ComponentType<any>>> = {
  Md: MdIcons,
  Fa: FaIcons,
  Gi: GiIcons,
  Io: IoIcons,
  Bi: BiIcons,
  Ai: AiIcons,
  Bs: BsIcons,
};

export const getIconComponent = (iconName: string): React.ComponentType<any> | null => {
  if (!iconName) return null;

  const prefix = iconName.slice(0, 2); // e.g., "Md", "Fa"
  const IconSet = iconSets[prefix];
  return IconSet ? IconSet[iconName] : null;
};
