import DashboardShell from '@/components/dashboard-shell';
export default function Layout({ children }: LayoutProps<'/dashboard'>) {
    return <DashboardShell>{children}</DashboardShell>;
}
