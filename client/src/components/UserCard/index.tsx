import { User } from '@/state/api';
import React from 'react';
import Image from 'next/image';

type UserCardProps = {
    user: User;
};

const UserCard = ({ user }: UserCardProps) => {

    return (
        <div
            className={`flex items-center rounded border p-4 mt-3 shadow`}
        >
            { user.profilePictureUrl && (
                <Image
                    src={`https://pm-s3-images-memo.s3.us-east-1.amazonaws.com/p1.jpeg`}
                    alt="image profil"
                    width={ 32 }
                    height={ 32 }
                    className='rounded-full mr-8'
                />
            ) }
            <div>
                <h3>{ user.username }</h3>
            </div>            
        </div>
    );
}

export default UserCard;