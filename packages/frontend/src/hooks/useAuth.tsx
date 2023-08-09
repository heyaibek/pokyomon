import firebase from 'firebase';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useMount } from 'react-use';
import useApi from './useApi';

type User = firebase.User | null;

export const AuthContext = createContext<{ user: User }>({
  user: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>(null);
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  const { url } = useApi();

  useMount(() => {
    setIsMounted(true);
  });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(result => {
      if (result) {
        setUser(result);
      } else {
        setShowLoginPopup(true);
      }
    });
  }, []);

  if (!isMounted) {
    return <div />;
  }

  if (!user && !showLoginPopup) {
    return <div>Authenticating...</div>;
  }

  if (showLoginPopup) {
    return (
      <div>
        <h1>Welcome to Pokyomon!</h1>
        <p>To play the game you need authenticate yourself.</p>
        <button
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase
              .auth()
              .signInWithPopup(provider)
              .then(result => {
                setShowLoginPopup(false);

                if (result && result.user) {
                  fetch(url + '/save-user', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: result.user.displayName,
                      email: result.user.email,
                    }),
                  });
                }

                return setUser(result.user);
              })
              .catch(err => {
                console.log(`Auth failed. Reason: ${err}`);
              });
          }}
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
