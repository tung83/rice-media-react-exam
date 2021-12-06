import { FC, useEffect, Suspense } from 'react';
import { Layout } from 'antd';
import './index.less';
import HeaderComponent from './header';
import SuspendFallbackLoading from './suspendFallbackLoading';
import { Outlet, useLocation, useNavigate } from 'react-router';

const { Content } = Layout;

const LayoutPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  return (
    <Layout className="layout-page">
      <HeaderComponent />
      <Layout>
        <Content className="layout-page-content">
          <Suspense
            fallback={
              <SuspendFallbackLoading
                message="Alert message title"
                description="Further details about the context of this alert."
              />
            }>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
