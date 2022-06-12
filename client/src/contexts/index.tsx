import { ReactNode } from 'react';
import { SocketProvider } from './Socket';

const AppContextProviders = ({ children }: { children: ReactNode }) => (
  <SocketProvider>{children}</SocketProvider>
);

export default AppContextProviders;
