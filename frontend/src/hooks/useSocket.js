import { useEffect, useRef, useState } from 'react';
import { socketService } from '../services/socketService';

export const useSocket = (token) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (token) {
      socketRef.current = socketService.connect(token);
      
      const handleConnect = () => {
        setIsConnected(true);
        setError(null);
      };

      const handleDisconnect = () => {
        setIsConnected(false);
      };

      const handleError = (error) => {
        setError(error.message);
      };

      socketRef.current.on('connect', handleConnect);
      socketRef.current.on('disconnect', handleDisconnect);
      socketRef.current.on('connect_error', handleError);

      return () => {
        if (socketRef.current) {
          socketRef.current.off('connect', handleConnect);
          socketRef.current.off('disconnect', handleDisconnect);
          socketRef.current.off('connect_error', handleError);
          socketService.disconnect();
        }
      };
    }
  }, [token]);

  const emit = (event, data) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const off = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  };

  return {
    isConnected,
    error,
    emit,
    on,
    off
  };
};
