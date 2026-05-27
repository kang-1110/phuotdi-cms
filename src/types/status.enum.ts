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