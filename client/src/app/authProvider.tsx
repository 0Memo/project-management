/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || ""
        }
    }
});

const formFields = {
    signUp : {
        preferred_username: {
            order: 1,
            placeholder: "Choisir un nom d'utilisateur",
            label: "Nom d'utilisateur",
            required: true
        },
        email: {
            order: 2,
            placeholder: "Votre e-mail",
            label: "E-mail",
            type: "email",
            required: true
        },
        password: {
            order: 3,
            placeholder: "Votre mot de passe",
            label: "Mot de passe",
            type:"password",
            required: true
        },
        confirm_password: {
            order: 4,
            placeholder: "Confirmez votre mot de passe",
            label: "Confirmation mot de passe",
            type:"password",
            required: true
        },
    }
}

const AuthProvider = ({ children }: any) => {

    return (
        <div className="mt-5">
            <Authenticator formFields={ formFields }>
                {({ user }: any) => 
                    user ? (
                        <div>{ children }</div>
                    ) : (
                        <div className="p-8">
                            <h1>Merci de souscrire ci-dessous:</h1>
                        </div>
                    )
                }
            </Authenticator>
        </div>
    )
}

export default AuthProvider