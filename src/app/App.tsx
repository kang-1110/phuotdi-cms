import { useGetAdminUserInfo } from "@/api/admin-user.service";
// import { useGetAssetURL } from "@/api/media-asset.service";
import { useAppStore } from "@/stores/useAppStore";
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import router from "./router/router";

export default function App() {
    const appStore = useAppStore();
    const userInfo = useGetAdminUserInfo(appStore.isAuthenticated);
    // const { data: assetUrl } = useGetAssetURL();
    // useEffect(() => {
    //     if (assetUrl) {
    //         appStore.setAssetUrl(assetUrl);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [assetUrl]);
    console.log(appStore)
    useEffect(() => {
        if (userInfo.data && userInfo.data !== appStore.userInfo) {
            appStore.setUserInfo(userInfo.data);
        }
    }, [userInfo.data, appStore]);

    return <RouterProvider router={router} />;
}