import type { PasswordType } from "./common.enum";
import type { BaseResponse, ListQueryParamBase, MediaAsset } from "./common.type";

export type AdminUserRole = "SuperAdmin" | "Admin" | "Accountant" | "CustomerCare";

export type AdminUserTabIndex = "AccessGranted" | "All";

export interface AdminUserRoleData {
    id: string;
    name: string;
    adminRoleEnum: AdminUserRole;
}

export interface AdminUserData {
    id: string;
    email: string;
    fullName: string;
    nickName: string | null;
    phoneNumber: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    avatarId: string | null;
    avatar: string | null;
    roles: AdminUserRoleData[];
    hasExtendedAccess?: boolean;
}

export interface ListAdminUserBaseResponse<T> extends BaseResponse {
    totalCount: number;
    hasExtendAccessCount: number;
    data: T[];
}

export interface AdminUserListData extends Omit<AdminUserData, "avatar"> {
    url?: string;
}

export interface AdminUserCreatePayload {
    phoneNumber: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    fullName: string;
    nickName?: string;
    avatar?: MediaAsset | null;
    avatarFile?: File[];
}

export interface AdminUserListQueryParam extends ListQueryParamBase {
    text?: string;
    roles?: string[];
    isActive?: boolean | null;
    hasExtendAccess?: boolean | null;
}

export interface ForgotPasswordResponse {
    validAt: string;
}

export interface ValidateOtpPayload {
    identifier: string;
    code: string;
    isResetPassword: boolean;
}

export interface ResetPasswordPayload {
    email: string;
    password: string;
    confirmPassword: string;
    type: PasswordType;
}

export interface UpdatePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    type?: PasswordType;
}

export interface UpdateExtendAccessPayload {
    adminUserId: string;
    hasExtendAccess: boolean;
}

export type AdminUserExtendAccessForm = {
    adminUserId: string;
    hasExtendAccess: boolean;
};