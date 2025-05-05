const options = [
  { id: 1, name: 'Ambulance', icon: '🚑' },
  { id: 2, name: 'Nurse Escort', icon: '👩‍⚕️' },
  { id: 3, name: 'Wheelchair Vehicle', icon: '♿' },
];

const TransportOptions = ({ selected, setSelected }) => {
  return (
    <div className="flex space-x-4 mt-4 overflow-x-auto">
      {options.map((option) => (
        <button
          key={option.id}
          className={`p-4 min-w-[140px] rounded-xl shadow text-center border-2 ${
            selected === option.id ? 'border-blue-500' : 'border-transparent'
          }`}
          onClick={() => setSelected(option.id)}
        >
          <div className="text-3xl">{option.icon}</div>
          <div className="mt-2 font-semibold">{option.name}</div>
        </button>
      ))}
    </div>
  );
};

export default TransportOptions;
