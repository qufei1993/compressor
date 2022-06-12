import './1i8n';
import { ConfigProvider } from 'antd';
import ErrorBoundary from './components/error-boundary';

import './styles/antd-light.css';
import './styles/antd-dark.css';
import './styles/global.css';

import Routes from './routes';
import { useAppSelector } from './hooks';

const App = () => {
  const theme = useAppSelector((store) => store.theme);
  return (
    <ConfigProvider prefixCls={`antd-${theme.name}`}>
      <div id="app" className={`antd-${theme.name} ${theme.customTheme}`}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </div>
    </ConfigProvider>
  );
};

export default App;
