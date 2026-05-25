import type { AdminUserCreatePayload, AdminUserData, AdminUserListData, AdminUserListQueryParam, ListAdminUserBaseResponse, UpdatePasswordPayload } from "@/types/admin-user-type";
import type { BaseResponse, DataResponse } from "@/types/common.type";
// import type { UserDataCombobox, UserListQueryParam, UserResetPasswordPayload } from "@/types/user.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "./api-client";

export const API_PATH_ADMIN_USER = "admin/v1/AdminUser";

export function useGetAdminUsers(params?: AdminUserListQueryParam) {
    return useQuery({
        queryKey: ["AdminUserList", params],
        queryFn: async () => {
            const { data } = await apiClient.get<ListAdminUserBaseResponse<AdminUserListData>>(API_PATH_ADMIN_USER, { params });
            return data;
        },
    });
}

export function useCreateAdminUser() {
    return useMutation({
        mutationFn: async (payload: AdminUserCreatePayload) => {
            const { data } = await apiClient.post<BaseResponse>(API_PATH_ADMIN_USER, payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Tạo nhân viên thành công");
        }
    });
}

export function useUpdateAdminUser(id?: string) {
    return useMutation({
        mutationFn: async (payload: AdminUserCreatePayload) => {
            const { data } = await apiClient.put<BaseResponse>(`${API_PATH_ADMIN_USER}/${id}`, payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Cập nhật nhân viên thành công");
        }
    });
}

export function useAdminUserDetail(id?: string | null) {
    return useQuery({
        queryKey: ["AdminUserDetail", id],
        queryFn: async () => {
            const { data } = await apiClient.get<DataResponse<AdminUserData>>(`${API_PATH_ADMIN_USER}/${id}`);
            return data.data;
        },
        enabled: !!id
    });
}


export function useDeleteAdminUser() {
    return useMutation({
        mutationFn: async (adminUserId: string) => {
            const { data } = await apiClient.delete<BaseResponse>(`${API_PATH_ADMIN_USER}/${adminUserId}`);
            return data;
        },
        onSuccess: () => {
            toast.success("Xóa nhân viên thành công");
        }
    });
}

export function useGetAdminUserInfo(enabled = true) {
    return useQuery({
        queryKey: ["AdminUserInfo"],
        queryFn: async () => {
            const { data } = await apiClient.get<DataResponse<AdminUserData>>(`${API_PATH_ADMIN_USER}/user-info`);
            return data.data;
        },
        enabled: enabled,
        staleTime: 0
    });
}

export function useUpdateProfile() {
    return useMutation({
        mutationFn: async (payload: AdminUserCreatePayload) => {
            const { data } = await apiClient.put<BaseResponse>(`${API_PATH_ADMIN_USER}/profile`, payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Cập nhật tài khoản thành công");
        }
    });
}

// update current user's password
export function useUpdatePassword() {
    return useMutation({
        mutationFn: async (payload: UpdatePasswordPayload) => {
            const { data } = await apiClient.put<BaseResponse>(`${API_PATH_ADMIN_USER}/change-password`, payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Cập nhật mật khẩu thành công");
        }
    });
}

