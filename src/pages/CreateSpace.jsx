import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useMockData } from '../contexts/MockContext';
import myHomeImg from '../assets/icon/ChucNangWeb/image (2).png';
import officeImg from '../assets/icon/ChucNangWeb/office.jfif';
import happyImg from '../assets/icon/ChucNangWeb/happy.jfif';

export default function CreateSpace() {
    const navigate = useNavigate();
    const { spaces } = useMockData();
    const [houseName, setHouseName] = useState('My Home');
    const [bgImage, setBgImage] = useState(myHomeImg);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const name = houseName.toLowerCase().trim();
        if (name === 'office') {
            setBgImage(officeImg);
        } else if (name === 'my happy place') {
            setBgImage(happyImg);
        } else {
            setBgImage(myHomeImg);
        }
    }, [houseName]);

    const handleContinue = async () => {
        if (!houseName.trim()) {
            setError('Please enter a name for your space');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // For now, just navigate. You can add space creation logic later
            // await addSpace({ name: houseName });
            navigate('/space-builder', { state: { houseName, bgImage } });
        } catch (err) {
            setError(err.message || 'Failed to create space');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="flex flex-col h-screen overflow-hidden bg-gray-50 relative">
            {/* Header - Matched with SpaceBuilder style */}
            <div className="bg-[#1e293b] text-white pt-10 pb-24 px-10 rounded-b-[40px] relative shrink-0 z-0">
                <div className="flex justify-between items-start max-w-5xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-1">Create a new space</h2>
                        <p className="text-gray-400 text-sm">Add the first details</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Step</p>
                        <p className="text-xl font-bold">1 <span className="text-gray-500 font-normal">| 7</span></p>
                    </div>
                </div>
            </div>

            {/* Content - No Scroll, Centered */}
            <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 -mt-20">
                <div className="w-full max-w-2xl px-4 flex flex-col items-center">

                    {/* House Image Card - High Z-index to overlap header */}
                    <div className="relative w-full max-w-lg aspect-[16/9] mb-8 rounded-3xl overflow-hidden shadow-2xl group border-[6px] border-white z-20">
                        <img
                            src={bgImage}
                            alt="House"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Input Section */}
                    <div className="w-full max-w-md text-center space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 font-medium mb-3">
                                What's your house name?
                            </label>
                            <input
                                type="text"
                                value={houseName}
                                onChange={(e) => setHouseName(e.target.value)}
                                className="w-full px-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-center text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                placeholder="e.g. My Castle"
                            />
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm mb-3">
                                No inspiration? Try one of these names.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {['Home', 'Office', 'My happy place'].map((name) => (
                                    <button
                                        key={name}
                                        onClick={() => setHouseName(name)}
                                        className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm font-medium transition-colors"
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-100 px-8 py-6 flex items-center justify-between shrink-0 z-20">
                <p className="text-gray-400 text-sm font-medium">Name your new space</p>
                <button
                    onClick={handleContinue}
                    disabled={loading}
                    className="px-10 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creating...' : 'Continue'}
                </button>
            </div>
        </div>
    );
}
