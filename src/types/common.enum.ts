export enum MediaAssetOwnerType {
    Admin,
    User,
    Avatar,
    Background,
    Transaction, // Dùng khi user hoặc admin upload chứng từ chuyển khoản liên quan đến giao dịch
    Thumbnail,
    CoverImage,
    ImagesInContent,
    None
}

export enum PasswordType {
    SpecialCharacter,
    Alphanumeric,
    NumericOnly
}

export enum DeviceType {
    Android = 1,
    Ios = 2,
    Web = 3
}