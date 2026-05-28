export enum Status {
    Draft,
    AwaitingApproval,
    Approved,
    Hidden
}

export const STATUS_DISPLAY = [
    "Lưu nháp",
    "Chờ duyệt",
    "Đã duyệt",
    "Tạm ẩn"
];

export const STATUS_COLORS = [
    "#bfbfbd",
    "#ff9f19",
    "#52c41a",
    "#f5222d"
];

export enum UserStatus {
    UnActivated,
    Activated,
    Locked,
    Deleted
}

export const USER_STATUS_DISPLAY = [
    "Chưa kích hoạt",
    "Đã kích hoạt",
    "Bị khóa",
    "Đã xóa"
];

export const USER_STATUS_COLORS = [
    "#bfbfbd",
    "#52c41a",
    "#ff9f19",
    "#f5222d"
];