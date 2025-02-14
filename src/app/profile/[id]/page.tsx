interface UserProfilePageProps {
  params: { id: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-extrabold mb-4">{id}</h1>
      <p className="text-lg text-gray-400">Welcome to your profile!</p>
    </div>
  );
}
