import { Outlet } from "react-router";
import NavigationBar from "../navigation-bar/NavigationBar";
import { ReactElement } from "react";

const Root = (): ReactElement =>
    <>
        <NavigationBar />
        <main>
            <Outlet />
        </main>
    </>

export default Root