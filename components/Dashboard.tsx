import React, { useEffect, useState } from 'react';
import { supabase } from '../src/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Target, DollarSign, Users } from 'lucide-react';

interface Profile {
    full_name: string | null;
    company_name: string | null;
    website: string | null;
    goal: string | null;
    income: string | null;
    client_count: string | null;
    email?: string;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile>({
        full_name: '',
        company_name: '',
        website: '',
        goal: '',
        income: '',
        client_count: '',
        email: ''
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                // If profile doesn't exist (shouldn't happen with our trigger), we might handle it
                console.error('Error fetching profile:', error);
            }

            if (data) {
                setProfile({
                    full_name: data.full_name,
                    company_name: data.company_name,
                    website: data.website,
                    goal: data.goal || '',
                    income: data.income || '',
                    client_count: data.client_count || '',
                    email: user.email // Get email from auth user object
                });
            }
        } catch (error: any) {
            console.error('Error loading user data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        try {
            setSaving(true);
            setMessage(null);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error('No user logged in');

            const updates = {
                id: user.id,
                full_name: profile.full_name,
                company_name: profile.company_name,
                website: profile.website,
                goal: profile.goal,
                income: profile.income,
                client_count: profile.client_count,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) throw error;
            setMessage({ type: 'success', text: 'Dashboard updated successfully!' });

            // Auto-dismiss success message
            setTimeout(() => setMessage(null), 3000);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-blue selection:text-white pb-20">
            {/* Top Navigation / Header */}
            <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-start">
                <div>
                    <h1 className="text-5xl font-bold mb-2">Dashboard</h1>
                    <p className="text-gray-400 text-lg">
                        Welcome back, <span className="text-lime-400 font-bold">{profile.full_name || 'User'}</span>
                    </p>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-xl hover:bg-white/5 transition-colors text-gray-300 font-medium"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
                {/* Message Alert */}
                {message && (
                    <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} backdrop-blur-sm transition-all`}>
                        {message.text}
                    </div>
                )}

                {/* Profile Info Card */}
                <div className="bg-[#111] border border-white/5 rounded-[30px] p-8 md:p-10 relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Email (Read-only usually) */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                            <div className="text-xl font-bold text-white break-words">{profile.email}</div>
                        </div>

                        {/* Name */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                            <input
                                type="text"
                                value={profile.full_name || ''}
                                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                className="w-full bg-transparent text-xl font-bold text-white focus:outline-none focus:border-b focus:border-lime-400 transition-all p-0"
                            />
                        </div>

                        {/* Website */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Website</label>
                            <input
                                type="text"
                                value={profile.website || ''}
                                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                className="w-full bg-transparent text-xl font-bold text-white focus:outline-none focus:border-b focus:border-lime-400 transition-all p-0"
                            />
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Goal Card */}
                    <div className="bg-[#111] border border-white/5 rounded-[30px] p-8 flex flex-col h-[300px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-lime-400/20 flex items-center justify-center text-lime-400">
                                <Target className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">Goal</span>
                        </div>
                        <textarea
                            value={profile.goal || ''}
                            onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                            className="w-full flex-1 bg-[#1A1A1A] rounded-2xl p-4 text-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-lime-400/50 transition-all placeholder-gray-600"
                            placeholder="What is your main goal?"
                        />
                    </div>

                    {/* Monthly Income Card */}
                    <div className="bg-[#111] border border-white/5 rounded-[30px] p-8 flex flex-col h-[300px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">Monthly Income</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="bg-[#1A1A1A] rounded-2xl p-6">
                                <span className="text-gray-500 text-sm mb-2 block">Current Revenue</span>
                                <input
                                    type="text"
                                    value={profile.income || ''}
                                    onChange={(e) => setProfile({ ...profile, income: e.target.value })}
                                    className="w-full bg-transparent text-4xl font-mono font-bold text-white focus:outline-none placeholder-gray-700"
                                    placeholder="$ 0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Active Clients Card */}
                    <div className="bg-[#111] border border-white/5 rounded-[30px] p-8 flex flex-col h-[300px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">Active Clients</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="bg-[#1A1A1A] rounded-2xl p-6">
                                <span className="text-gray-500 text-sm mb-2 block">Total Clients</span>
                                <input
                                    type="text"
                                    value={profile.client_count || ''}
                                    onChange={(e) => setProfile({ ...profile, client_count: e.target.value })}
                                    className="w-full bg-transparent text-4xl font-mono font-bold text-white focus:outline-none placeholder-gray-700"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Save Button */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={updateProfile}
                        disabled={saving}
                        className="group flex items-center gap-3 px-12 py-5 bg-lime-400 hover:bg-lime-300 text-black font-bold text-lg rounded-2xl transition-all hover:shadow-[0_0_40px_rgba(163,230,53,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {/* Progress Section */}
                <div className="bg-[#111] border border-white/5 rounded-[30px] p-8 mt-12 mb-12">
                    <h3 className="text-xl font-bold mb-8">Progress</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8 md:gap-0">
                        {/* Active Clients */}
                        <div className="flex flex-col items-center">
                            <span className="text-5xl font-black text-lime-400 mb-2">{profile.client_count || '0'}</span>
                            <span className="text-gray-500 text-sm uppercase tracking-widest">Active Clients</span>
                        </div>

                        {/* Monthly Revenue */}
                        <div className="flex flex-col items-center md:border-l border-white/5 md:border-r">
                            <span className="text-5xl font-black text-emerald-400 mb-2">{profile.income || '$0'}</span>
                            <span className="text-gray-500 text-sm uppercase tracking-widest">Monthly Revenue</span>
                        </div>

                        {/* Goal Set */}
                        <div className="flex flex-col items-center">
                            <div className="h-[48px] flex items-center">
                                <span className={`text-5xl font-black mb-2 ${profile.goal ? 'text-fuchsia-400' : 'text-fuchsia-400'}`}>
                                    {profile.goal ? '✓' : '—'}
                                </span>
                            </div>
                            <span className="text-gray-500 text-sm uppercase tracking-widest">Goal Set</span>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Dashboard;
