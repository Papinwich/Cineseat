import { currentAdmin } from '@/api/auth';
import useStore from '@/store/Store';
import React, { useEffect, useState } from 'react';
import LoadingRedirect from './LoadingRedirect';

const ProtectAdmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);
  //   console.log(user, token);

  useEffect(() => {
    if (user && token) {
      //send to back
      currentAdmin(token)
        .then((res) => setOk(true))
        .catch((err) => setOk(false));
    }
  }, []);

  return ok ? element : <LoadingRedirect />;
};

export default ProtectAdmin;
