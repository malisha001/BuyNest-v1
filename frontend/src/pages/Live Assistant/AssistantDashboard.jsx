import { useState, useEffect } from 'react';
import { FaUser, FaClock, FaSearch, FaPowerOff } from 'react-icons/fa';

const sampleRequests = [
  { id: 1, name: 'John Doe', time: '2 min ago', type: 'Checkout Assistance' },
  { id: 2, name: 'Jane Smith', time: '5 min ago', type: 'Product Details' },
];

const sampleActiveSessions = [
  { id: 3, name: 'Chris Adams', time: '15 min', status: 'Active' },
];

const AssistantDashboard = () => {
  const [availability, setAvailability] = useState(false); // Track availability status
  const [sessionRequests, setSessionRequests] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);

  useEffect(() => {
    // Simulate fetching session requests and active sessions
    setSessionRequests(sampleRequests);
    setActiveSessions(sampleActiveSessions);
  }, []);

  const toggleAvailability = () => {
    setAvailability(!availability);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 lg:px-16">
      {/* Header with Toggle Switch */}
      <header className="flex justify-between items-center mb-8 bg-gradient-to-r from-gray-100 via-white to-gray-200 p-6 rounded-t-2xl shadow-xl relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md">Assistant Dashboard</h1>

        {/* Toggle Switch for Availability */}
        <div 
          onClick={toggleAvailability} 
          className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${availability ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform transform bg-white ${availability ? 'translate-x-8' : ''}`}
          >
            <FaPowerOff className={`text-sm m-1 ${availability ? 'text-green-500' : 'text-red-500'}`} />
          </div>
        </div>
      </header>

      {/* Main Content with Reduced Bottom Space */}
      <main className="p-6 rounded-2xl shadow-2xl mb-4" style={{ 
        background: availability ? 'linear-gradient(to bottom, #1a202c, #2d3748)' : 'linear-gradient(to bottom, #f8fafc, #edf2f7)',
        color: availability ? '#e2e8f0' : '#2d3748',
      }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session Requests */}
          <section className={`rounded-2xl p-6 shadow-2xl hover:shadow-2xl transition-shadow duration-300 ${availability ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-3xl font-bold ${availability ? 'text-white' : 'text-gray-800'}`}>Session Requests</h2>
              <FaSearch className={`cursor-pointer transition duration-200 ${availability ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`} />
            </div>
            {sessionRequests.length > 0 ? (
              <ul className="space-y-3">
                {sessionRequests.map((request) => (
                  <li
                    key={request.id}
                    className={`rounded-xl p-3 flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:translate-y-1 ${availability ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <div>
                      <p className={`text-lg font-semibold ${availability ? 'text-gray-100' : 'text-gray-800'}`}>{request.name}</p>
                      <p className={`text-sm ${availability ? 'text-gray-400' : 'text-gray-500'}`}>{request.type}</p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className={`mr-2 ${availability ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`${availability ? 'text-gray-400' : 'text-gray-600'}`}>{request.time}</span>
                    </div>
                    <button className={`ml-4 px-5 py-2 rounded-full ${availability ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} font-semibold shadow-lg transition-transform transform hover:scale-105`}>
                      Accept
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`${availability ? 'text-gray-400' : 'text-gray-500'}`}>No new requests at the moment.</p>
            )}
          </section>

          {/* Active Sessions */}
          <section className={`rounded-2xl p-6 shadow-2xl hover:shadow-2xl transition-shadow duration-300 ${availability ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-3xl font-bold ${availability ? 'text-white' : 'text-gray-800'}`}>Active Sessions</h2>
              <FaSearch className={`cursor-pointer transition duration-200 ${availability ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`} />
            </div>
            {activeSessions.length > 0 ? (
              <ul className="space-y-3">
                {activeSessions.map((session) => (
                  <li
                    key={session.id}
                    className={`rounded-xl p-3 flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:translate-y-1 ${availability ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <div>
                      <p className={`text-lg font-semibold ${availability ? 'text-gray-100' : 'text-gray-800'}`}>{session.name}</p>
                      <p className={`text-sm ${availability ? 'text-gray-400' : 'text-gray-500'}`}>Session Active: {session.time}</p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className={`mr-2 ${availability ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`${availability ? 'text-gray-400' : 'text-gray-600'}`}>{session.time}</span>
                    </div>
                    <button className={`ml-4 px-5 py-2 rounded-full ${availability ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'} font-semibold shadow-lg transition-transform transform hover:scale-105`}>
                      End Session
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`${availability ? 'text-gray-400' : 'text-gray-500'}`}>No active sessions currently.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AssistantDashboard;
