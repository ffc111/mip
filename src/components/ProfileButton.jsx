const ProfileButton = ({ onClick }) => {
  return (
    <button
      className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full shadow-md"
      onClick={onClick}
    >
      👤
    </button>
  );
};

export default ProfileButton;
