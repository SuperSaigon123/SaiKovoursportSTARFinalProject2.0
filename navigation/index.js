import React from 'react';
import { useAuth } from '../utils/hooks/useAuth';
import UserStack from './userStack';
import AuthStack from './authStack';
import TestTabNav from './TestTabNav';

/*
    This component uses the useAuthentication hook to determine whether 
    we have a logged-in user or not, and based on that, it loads one of the 
    two application stacks.
*/

export default function RootNavigation() {
  const { user } = useAuth();

  return user ? <TestTabNav /> : <AuthStack />;
}