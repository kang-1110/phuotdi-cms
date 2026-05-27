import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

interface Props {
    id: string;
    name: string;
    avatarUrl: string;
    email?: string;
    onClickAvatar?: () => void;
    onLogout?: () => void;
}
export default function UserCardItem({
    id,
    name,
    avatarUrl,
    email,
    onClickAvatar,
    onLogout,
}: Props) {
    return (
        <div className="flex items-center gap-2" key={id}>
            <Avatar className="cursor-pointer" src={avatarUrl} size={48} icon={<UserOutlined />} onClick={onClickAvatar} />
            <div className="flex flex-col">
                <span className="text-sm text-gray-900">{name}</span>
                {email && <span className="text-xs text-gray-500 font-medium">{email}</span>}
                {onLogout && <a className="text-xs text-red-500 font-medium" onClick={onLogout}>Đăng xuất</a>}
            </div>
        </div>
    );
}
