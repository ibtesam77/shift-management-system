import Link from "next/link";

interface SidebarItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const SidebarItem = (props: SidebarItemProps) => {
  const { to, label, icon } = props;

  return (
    <Link
      href={to}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      {icon}
      <span className="ms-3">{label}</span>
    </Link>
  );
};

export default SidebarItem;
