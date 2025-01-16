import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'vendors', title: 'Members', href: paths.dashboard.vendors, icon: 'users' },
  { key: 'convert', title: 'Manual Import', href: paths.dashboard.convert, icon: 'plugs-connected' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'ftp', title: 'FTP', href: paths.dashboard.ftp, icon: 'user' },
  { key: 'automatedconvert', title: 'Automated Import', href: paths.dashboard.automatedconvert, icon: 'plugs-connected' },
  { key: 'schedule', title: 'Schedule', href: paths.dashboard.schedule, icon: 'calendar' },
  { key: 'logout', title: 'Logout', href: paths.dashboard.logout, icon: 'gear-six' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
  // {key : 'vendor', title: 'Vendor', href: paths.dashboard.vendor, icon: 'user'}
] satisfies NavItemConfig[];
 