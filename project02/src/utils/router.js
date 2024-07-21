import Home from "../pages/index";

export const routerInfo = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "seoul",
        element: <div className="layout-detail">Seoul</div>,
      },
      {
        path: "newyork",
        element: <div className="layout-detail">new york</div>,
      },
      {
        path: "hochiminhcity",
        element: <div className="layout-detail">Ho Chi Minh City</div>,
      },
      {
        path: "osaka",
        element: <div className="layout-detail">Osaka</div>,
      },
      {
        path: "losangeles",
        element: <div className="layout-detail">Los Angeles</div>,
      },
    ],
  },
];
