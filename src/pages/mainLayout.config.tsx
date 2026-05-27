import { UserOutlined, AreaChartOutlined, ProfileOutlined, CustomerServiceOutlined, SettingOutlined } from "@ant-design/icons";
import type { AntdIconProps } from "@ant-design/icons/es/components/AntdIcon";

interface PageData {
    key?: string;
    label: string;
    route: string;
    icon: React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
    isDisplay: boolean;
}

export const LAYOUT_PAGE_DATA: PageData[] = [
    {
        key: "dashboard",
        label: "Dashboard",
        route: "/dashboard",
        icon: AreaChartOutlined,
        isDisplay: true
    },
    {
        key: "location-blogs",
        label: "Bài viết",
        route: "/location-blogs",
        icon: ProfileOutlined,
        isDisplay: true
    },
    {
        key: "customers",
        label: "Khách hàng",
        route: "/customers",
        icon: CustomerServiceOutlined,
        isDisplay: true
    },
    {
        key: "staffs",
        label: "Nhân viên",
        route: "/staffs",
        icon: UserOutlined,
        isDisplay: true
    },
    {
        key: "system",
        label: "Hệ thống",
        route: "/system",
        icon: SettingOutlined,
        isDisplay: true
    }
];