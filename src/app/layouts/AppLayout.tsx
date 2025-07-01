import { Outlet } from "react-router";

import { Header } from "../Header";

export const AppLayout = () => (
  <>
    <Header />
    <main className='container'>
      <Outlet />
    </main>
  </>
);
