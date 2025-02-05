

export default function UserProfilePage({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{params.id}</h1>
            <p className="text-lg text-gray-700">Welcome to your profile!</p>
        </div>
    );
};
