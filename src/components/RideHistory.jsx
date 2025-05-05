import React from "react";

const mockHistory = [
  { id: 1, date: "2025-04-01", from: "Hospital Santa Maria", to: "Rua das Flores 123" },
  { id: 2, date: "2025-04-04", from: "Casa", to: "Centro de Saúde Lisboa Norte" },
];

export default function RideHistory() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-3">🕓 Ride History</h2>
      <ul className="space-y-2">
        {mockHistory.map((ride) => (
          <li key={ride.id} className="p-3 bg-gray-100 rounded-xl">
            <p><strong>Date:</strong> {ride.date}</p>
            <p><strong>From:</strong> {ride.from}</p>
            <p><strong>To:</strong> {ride.to}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

