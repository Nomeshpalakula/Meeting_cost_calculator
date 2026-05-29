// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Clock, Users, Calendar } from 'lucide-react';

// const API_URL = 'http://localhost:5000/api';

// const History = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchMeetings = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_URL}/meetings`);
//       setMeetings(res.data);
//     } catch (err) {
//       console.error('Error fetching meetings:', err);
//       alert('Failed to load meeting history. Make sure backend is running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMeetings();
//   }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">
//       <div className="flex items-center justify-between mb-10">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900">Meeting History</h1>
//           <p className="text-gray-600 mt-2">All your saved meetings with cost breakdown</p>
//         </div>
//         <button
//           onClick={fetchMeetings}
//           className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-2 text-sm font-medium"
//         >
//           <Calendar className="w-4 h-4" />
//           Refresh
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center py-20">
//           <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading meetings...</p>
//         </div>
//       ) : meetings.length === 0 ? (
//         <div className="bg-white rounded-3xl shadow-xl p-20 text-center">
//           <div className="mx-auto w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
//             <Clock className="w-10 h-10 text-gray-400" />
//           </div>
//           <h3 className="text-2xl font-semibold text-gray-700">No meetings yet</h3>
//           <p className="text-gray-500 mt-3 max-w-md mx-auto">
//             Go to the Calculator page and save your first meeting to see it here.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {meetings.map((meeting) => (
//             <div
//               key={meeting.id}
//               className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
//             >
//               <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
//                 {/* Left Content */}
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
//                     {meeting.agenda}
//                   </h3>

//                   <div className="flex items-center gap-6 mt-5 text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-5 h-5" />
//                       <span>{meeting.duration_minutes} minutes</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Users className="w-5 h-5" />
//                       <span>
//                         {meeting.participants && meeting.participants.length} participants
//                       </span>
//                     </div>
//                     <div className="text-sm">
//                       {formatDate(meeting.created_at)}
//                     </div>
//                   </div>

//                   {/* Participants List */}
//                   {meeting.participants && meeting.participants.length > 0 && (
//                     <div className="mt-6">
//                       <p className="text-sm font-medium text-gray-500 mb-3">PARTICIPANTS</p>
//                       <div className="flex flex-wrap gap-3">
//                         {meeting.participants.map((p, idx) => (
//                           <div
//                             key={idx}
//                             className="bg-gray-100 px-4 py-2 rounded-2xl text-sm"
//                           >
//                             {p.name} — ${p.hourly_rate}/hr
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Cost Display */}
//                 <div className="text-right md:min-w-[180px]">
//                   <div className="text-sm text-gray-500 mb-1">TOTAL COST</div>
//                   <div className="text-5xl font-bold text-green-600">
//                     ${parseFloat(meeting.total_cost).toFixed(2)}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     Estimated cost
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;




import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const History = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/meetings`);
      setMeetings(res.data);
    } catch (err) {
      console.error(err);
      alert("Could not load history. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Meeting History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : meetings.length === 0 ? (
        <p>No meetings saved yet.</p>
      ) : (
        meetings.map(m => (
          <div key={m.id} className="bg-white p-6 rounded-2xl shadow mb-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">{m.agenda}</h3>
                <p className="text-gray-600">{m.duration_minutes} minutes</p>
              </div>
              <div className="text-3xl font-bold text-green-600">
                ${parseFloat(m.total_cost).toFixed(2)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;