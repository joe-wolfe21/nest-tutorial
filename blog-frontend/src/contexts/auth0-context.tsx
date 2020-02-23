import React, { Component, createContext, useContext } from 'react';

interface ContextValueType {
    isAuthenticated?: boolean,
    user?: any,
    isLoading?: boolean,
    handleRedirectCallback?: () => void,
    getIdTokenClaims?: (...p: any) => any,
    loginWithRedirect?: (...p: any) => any,
    getTokenSilently?: (...p: any) => any,
    logout?: (...p: any) => any
}

// create the context
export const Auth0Context: any = createContext<ContextValueType | null>(null);

export const useAuth0: any = () => useContext(Auth0Context);

interface IState {
    auth0Client: any,
    isLoading: boolean,
    isAuthenticated: boolean,
    user?: any;
}

export class Auth0Provider extends Component<{}, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: true,
            isAuthenticated: false,
            user: null,
            auth0Client: null,
        };
    }

    config = {
        domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
        client_id: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
        redirect_uri: window.location.origin
    };

    componentDidMount() {
        this.initializeAuth0();     
    }
    
    initializeAuth0 = async () => {
        const auth0Client = null
        this.setState({ auth0Client });
        const user = { name: 'joe' }
        this.setState({ isLoading: false, isAuthenticated: true, user });
    };

    render() {
        const { auth0Client, isLoading, isAuthenticated, user } = this.state;
        const { children } = this.props;
        const configObject = {
            isLoading,
            isAuthenticated,
            user,
            loginWithRedirect: (...p: any) => auth0Client.loginWithRedirect(...p),
            getTokenSilently: (...p: any) => auth0Client.getTokenSilently(...p),
            getIdTokenClaims: (...p: any) => auth0Client.getIdTokenClaims(...p),
            logout: (...p: any) => auth0Client.logout(...p)
        };
        return <Auth0Context.Provider value={configObject}>{children}</Auth0Context.Provider>;
    }
}