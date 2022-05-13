import React, { useEffect, Suspense, ReactElement } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

/**
 * Redirect
 * 组件实现跳转
 * @param {string} to 跳转的路径
 */
export const Redirect: React.FC<{ to: string }> = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => navigate(to, { replace: true }));
  return null;
};
export interface RouteItem {
  name: string;
  path?: string;
  component?: React.FC;
  index?: boolean;
  redirect?: string;
  auth?: boolean;
  children?: RouteItem[];
}

/**
 * DynamicRoutes
 *
 * @param {object} props routers
 * @returns react
 */
export const DynamicRoutes: React.FC<{
  routes: RouteItem[];
  auth?: React.FC<{ children?: ReactElement }>;
  children: React.ReactNode;
}> = (props) => {
  const { routes } = props;
  // 递归生成路由
  const generateRoute = (routes: RouteItem[]) => {
    return routes.map((i) =>
      i.redirect ? (
        i.index ? (
          <Route key={i.name} index element={<Redirect to={i.redirect} />} />
        ) : (
          <Route
            key={i.name}
            path={i.path}
            element={<Redirect to={i.redirect} />}
          />
        )
      ) : (
        <Route
          path={i.path}
          key={i.name}
          element={
            i.auth && props.auth ? (
              <props.auth>{i.component && <i.component />}</props.auth>
            ) : (
              i.component && <i.component />
            )
          }
        >
          {i.children && generateRoute(i.children)}
        </Route>
      )
    );
  };
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {generateRoute(routes)}
        {props.children}
      </Routes>
    </Suspense>
  );
};

export default DynamicRoutes;
