"use client"
import { useEffect, useState } from 'react';
import ContentHeader from '@/components/ContentHeader';
import { plainToInstance } from "class-transformer";
import { Profile } from '@/types/Profile';
import { api } from '@/shared/apiClient';

const ProfilePage = () => {
    const [profile, setProfile] = useState<Profile>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/api/auth/profile', { local: true });
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
        return <div>{error}</div>
    }
    if (!profile) {
        return <div>Loading...</div>
    }

    return (
        <div>
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