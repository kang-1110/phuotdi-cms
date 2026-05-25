import type { MediaAssetOwnerType } from "./common.enum";

export type Modify<T, R> = Omit<T, keyof R> & R;

export interface ListQueryParamBase {
    page?: number;
    pageSize?: number;
    isGetAll?: boolean;
}

export interface ListBaseResponse<T> extends BaseResponse {
    totalCount: number;
    data: T[];
}

export interface DataResponse<T> extends BaseResponse {
    data: T;
}

export interface BaseResponse {
    success: boolean;
    message: string;
}

export interface UploadRequestPayload {
    fileName: string;
    fileType: string;
    fileSizeBytes: number;
    thumbnailType?: string;
    thumbnailSizeBytes?: number;
}

export interface UploadRequestResponse {
    uploadUrl: string;
    assetKey: string;
    thumbnailUrl: string;
    thumbnailKey: string;
}

export interface MediaAsset {
    id?: string;
    profileId?: string;
    spaceId?: string;
    postId?: string;
    blogId?: string;
    challengeId?: string;
    mobileAppSettingId?: string;
    fileKey: string;
    fileName: string;
    fileType: string;
    fileSizeBytes: number;
    url?: string;
    mediaAssetOwnerType?: MediaAssetOwnerType;
    thumbnailUrl?: string;
    thumbnailKey?: string;
    thumbnailType?: string;
    thumbnailSizeBytes?: number;
}

export interface ShortListData {
    displayName: string;
    value: string;
    id?: string;
}

export type EnumMapConfig = {
    label: string;
    color: string;
    hex?: string;
    columnName?: string;
};