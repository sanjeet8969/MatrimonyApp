// // import React, { createContext, useContext, useReducer, useEffect } from 'react';
// // import { authService } from '../services/authService';
// // import toast from 'react-hot-toast';

// // const AuthContext = createContext();

// // const initialState = {
// //   user: null,
// //   token: localStorage.getItem('token'),
// //   isAuthenticated: false,
// //   loading: true,
// //   error: null
// // };

// // const authReducer = (state, action) => {
// //   switch (action.type) {
// //     case 'USER_LOADED':
// //       return {
// //         ...state,
// //         isAuthenticated: true,
// //         loading: false,
// //         user: action.payload,
// //         error: null
// //       };
// //     case 'AUTH_SUCCESS':
// //       localStorage.setItem('token', action.payload.token);
// //       return {
// //         ...state,
// //         token: action.payload.token,
// //         user: action.payload.user,
// //         isAuthenticated: true,
// //         loading: false,
// //         error: null
// //       };
// //     case 'AUTH_ERROR':
// //     case 'LOGOUT':
// //       localStorage.removeItem('token');
// //       return {
// //         ...state,
// //         token: null,
// //         user: null,
// //         isAuthenticated: false,
// //         loading: false,
// //         error: action.payload
// //       };
// //     case 'CLEAR_ERROR':
// //       return {
// //         ...state,
// //         error: null
// //       };
// //     case 'SET_LOADING':
// //       return {
// //         ...state,
// //         loading: action.payload
// //       };
// //     default:
// //       return state;
// //   }
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [state, dispatch] = useReducer(authReducer, initialState);

// //   // Load user on app start
// //   useEffect(() => {
// //     const loadUser = async () => {
// //       if (state.token) {
// //         try {
// //           const response = await authService.getMe();
// //           dispatch({
// //             type: 'USER_LOADED',
// //             payload: response.data.user
// //           });
// //         } catch (error) {
// //           dispatch({
// //             type: 'AUTH_ERROR',
// //             payload: error.response?.data?.message || 'Failed to load user'
// //           });
// //         }
// //       } else {
// //         dispatch({ type: 'SET_LOADING', payload: false });
// //       }
// //     };

// //     loadUser();
// //   }, [state.token]);

// //   // Login user
// //   const login = async (email, password) => {
// //     try {
// //       dispatch({ type: 'SET_LOADING', payload: true });
// //       const response = await authService.login(email, password);
      
// //       dispatch({
// //         type: 'AUTH_SUCCESS',
// //         payload: {
// //           token: response.data.token,
// //           user: response.data.user
// //         }
// //       });
      
// //       toast.success('Login successful!');
// //       return { success: true };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 'Login failed';
// //       dispatch({
// //         type: 'AUTH_ERROR',
// //         payload: message
// //       });
// //       toast.error(message);
// //       return { success: false, error: message };
// //     }
// //   };

// //   // Register user
// //   const register = async (email, password) => {
// //     try {
// //       dispatch({ type: 'SET_LOADING', payload: true });
// //       const response = await authService.register(email, password);
      
// //       dispatch({
// //         type: 'AUTH_SUCCESS',
// //         payload: {
// //           token: response.data.token,
// //           user: response.data.user
// //         }
// //       });
      
// //       toast.success('Registration successful!');
// //       return { success: true };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 'Registration failed';
// //       dispatch({
// //         type: 'AUTH_ERROR',
// //         payload: message
// //       });
// //       toast.error(message);
// //       return { success: false, error: message };
// //     }
// //   };

// //   // Logout user
// //   const logout = () => {
// //     dispatch({ type: 'LOGOUT' });
// //     toast.success('Logged out successfully');
// //   };

// //   // Clear errors
// //   const clearError = () => {
// //     dispatch({ type: 'CLEAR_ERROR' });
// //   };

// //   const value = {
// //     ...state,
// //     login,
// //     register,
// //     logout,
// //     clearError
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };

// // export default AuthContext;
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check for existing auth token
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       // Validate token and set user
//       setIsAuthenticated(true);
//     }
//     setLoading(false);
//   }, []);

//   const login = async (credentials) => {
//     // Login logic here
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('auth_token');
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   const value = {
//     user,
//     loading,
//     isAuthenticated,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null
      };
    case 'AUTH_SUCCESS':
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
      }
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload || null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const response = await authService.getMe();
          dispatch({
            type: 'USER_LOADED',
            payload: response.data?.user || response.user
          });
        } catch (error) {
          console.error('Failed to load user:', error);
          dispatch({
            type: 'AUTH_ERROR',
            payload: error.response?.data?.message || 'Failed to load user'
          });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, [state.token]);

  // Login user
  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Handle both object and separate email/password parameters
      const loginData = typeof credentials === 'object' 
        ? credentials 
        : { email: credentials, password: arguments[1] };
      
      const response = await authService.login(loginData);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          token: response.data?.token || response.token,
          user: response.data?.user || response.user
        }
      });
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      dispatch({
        type: 'AUTH_ERROR',
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Handle both object and separate email/password parameters
      const registrationData = typeof userData === 'object' 
        ? userData 
        : { email: userData, password: arguments[1] };
      
      const response = await authService.register(registrationData);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          token: response.data?.token || response.token,
          user: response.data?.user || response.user
        }
      });
      
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      dispatch({
        type: 'AUTH_ERROR',
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  // Update user data
  const updateUser = (userData) => {
    dispatch({
      type: 'USER_LOADED',
      payload: { ...state.user, ...userData }
    });
  };

  // Clear errors
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    updateUser,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
