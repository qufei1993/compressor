import React from 'react';
import { Typography } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';

import * as styled from './styled.css';

const { Text, Paragraph } = Typography;
const logErrorToMyService = (error: Error) => {
  console.debug(error);
};

interface TProps extends WithTranslation {
  children: React.ReactNode;
}
interface TState {
  hasError: boolean;
  error: Error | null;
}

// You can also use npm modules: "react-error-boundary"
class ErrorBoundary extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    logErrorToMyService(error);
  }

  render() {
    const { children, t } = this.props;
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <div role="alert" className={styled.errorBoundary}>
          <p>
            <svg
              className="icon"
              style={{ fontSize: '50px', color: '#dad9da' }}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-kulian" />
            </svg>
          </p>
          <p>
            <Text type="danger">Something went wrong:</Text>
          </p>
          {error && (
            <Paragraph className={styled.errorMsg}>
              <pre>{error.message}</pre>
            </Paragraph>
          )}
          <p>{t('errorBoundary.tips')}</p>
        </div>
      );
    }

    return children;
  }
}

export default withTranslation()(ErrorBoundary);
