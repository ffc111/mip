const SettingsPage = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-white z-10 p-6">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <ul className="space-y-2">
        <li className="text-gray-700">Update Info</li>
        <li className="text-gray-700">Emergency Contacts</li>
        <li className="text-gray-700">Language Preferences</li>
      </ul>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Back
      </button>
    </div>
  );
};

export default SettingsPage;
