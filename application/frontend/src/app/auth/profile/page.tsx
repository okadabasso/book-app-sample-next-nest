"use client"
import React, { useEffect, useState } from 'react';
import ContentHeader from '@/app/admin/books/components/ContentHeader';
import { plainToInstance } from "class-transformer";
import { Profile } from '@/types/Profile';
import ContentFooter from '@/components/ContentFooter';

const ProfilePage = () => {
    const [profile, setProfile] = useState<Profile>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/auth/profile/api');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data: Profile = await response.json();
                const profile = plainToInstance(Profile, data);
                setProfile(profile);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            }
        };

        fetchProfile();
    }
    , []);
    if (error) {
        return <div>Error: {error}</div>
    }
    if (!profile) {
        return <div>Loading...</div>
    }

    return (
        <div className='pb-12'>
            <ContentHeader title='Profile' />
            <dl>
                <dt className='font-bold'>Username</dt>
                <dd>{profile.userName}</dd>
                <dt className='font-bold mt-4'>Email</dt>
                <dd>{profile.email}</dd>
            </dl>
        </div>
    );
};

export default ProfilePage;