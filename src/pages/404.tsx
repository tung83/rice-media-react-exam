import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Page Not Found"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }></Result>
  );
};

export default NotFoundPage;
