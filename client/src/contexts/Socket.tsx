import { createContext, ReactNode, useContext } from 'react';
import io, { Socket } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_WS_URL, {
  transports: ['websocket'],
});

const SocketContext = createContext<Socket>(socket);
SocketContext.displayName = 'SocketContext';

export const SocketProvider = ({ children }: { children: ReactNode }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};
