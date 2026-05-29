// import { useState, useEffect } from 'react';
// import { Plus, Trash2, Save, Clock } from 'lucide-react';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// const Calculator = ({ onMeetingSaved }) => {
//   const [participants, setParticipants] = useState([
//     { name: '', hourly_rate: '' }
//   ]);
//   const [duration, setDuration] = useState(60);
//   const [agenda, setAgenda] = useState('');
//   const [totalCost, setTotalCost] = useState(0);
//   const [recommendation, setRecommendation] = useState('');

//   // Real-time cost calculation
//   useEffect(() => {
//     const cost = participants.reduce((sum, p) => {
//       const rate = parseFloat(p.hourly_rate) || 0;
//       return sum + (rate / 60) * duration;
//     }, 0);
//     setTotalCost(cost);
//   }, [participants, duration]);

//   const addParticipant = () => {
//     setParticipants([...participants, { name: '', hourly_rate: '' }]);
//   };

//   const removeParticipant = (index) => {
//     if (participants.length > 1) {
//       setParticipants(participants.filter((_, i) => i !== index));
//     }
//   };

//   const updateParticipant = (index, field, value) => {
//     const updated = [...participants];
//     updated[index][field] = value;
//     setParticipants(updated);
//   };

//   const getRecommendation = () => {
//     if (!agenda.trim()) {
//       setRecommendation("⚠️ Please enter a meeting agenda first.");
//       return;
//     }

//     if (totalCost > 500) {
//       setRecommendation("❌ This meeting is quite expensive. Make sure it has high business value and clear outcomes.");
//     } else if (totalCost > 200) {
//       setRecommendation("⚠️ Moderately expensive meeting. Ensure clear agenda and action items.");
//     } else {
//       setRecommendation("✅ This meeting looks reasonable and worth the team's time.");
//     }
//   };

//   const saveMeeting = async () => {
//     if (!agenda.trim()) {
//       alert("Please enter a meeting agenda");
//       return;
//     }
//     if (participants.some(p => !p.name.trim() || !p.hourly_rate)) {
//       alert("Please fill all participant details");
//       return;
//     }

//     try {
//       await axios.post(`${API_URL}/meetings`, {
//         agenda: agenda.trim(),
//         duration_minutes: duration,
//         participants: participants.map(p => ({
//           name: p.name.trim(),
//           hourly_rate: parseFloat(p.hourly_rate)
//         }))
//       });

//       alert("✅ Meeting saved successfully!");
      
//       // Reset form
//       setAgenda('');
//       setDuration(60);
//       setParticipants([{ name: '', hourly_rate: '' }]);
//       setRecommendation('');
      
//       if (onMeetingSaved) onMeetingSaved();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save meeting. Please check if backend is running.");
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       {/* Left Side - Input Form */}
//       <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
//         <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
//           <Clock className="w-8 h-8 text-blue-600" />
//           Meeting Details
//         </h2>

//         {/* Participants Section */}
//         <div className="mb-10">
//           <h3 className="text-xl font-medium mb-5">Participants</h3>
          
//           {participants.map((participant, index) => (
//             <div key={index} className="flex gap-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Participant Name"
//                 value={participant.name}
//                 onChange={(e) => updateParticipant(index, 'name', e.target.value)}
//                 className="flex-1 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="number"
//                 placeholder="Hourly Rate ($)"
//                 value={participant.hourly_rate}
//                 onChange={(e) => updateParticipant(index, 'hourly_rate', e.target.value)}
//                 className="w-48 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {participants.length > 1 && (
//                 <button
//                   onClick={() => removeParticipant(index)}
//                   className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition"
//                 >
//                   <Trash2 className="w-6 h-6" />
//                 </button>
//               )}
//             </div>
//           ))}

//           <button
//             onClick={addParticipant}
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-3"
//           >
//             <Plus className="w-5 h-5" /> Add Participant
//           </button>
//         </div>

//         {/* Duration */}
//         <div className="mb-10">
//           <label className="block text-xl font-medium mb-4">Meeting Duration (minutes)</label>
//           <div className="flex items-center gap-6 bg-gray-50 p-6 rounded-3xl">
//             <input
//               type="range"
//               min="15"
//               max="480"
//               step="15"
//               value={duration}
//               onChange={(e) => setDuration(Number(e.target.value))}
//               className="flex-1 accent-blue-600 cursor-pointer"
//             />
//             <div className="text-5xl font-bold text-blue-700 w-28 text-right">
//               {duration}
//             </div>
//           </div>
//         </div>

//         {/* Agenda */}
//         <div>
//           <label className="block text-xl font-medium mb-4">Meeting Agenda</label>
//           <textarea
//             value={agenda}
//             onChange={(e) => setAgenda(e.target.value)}
//             placeholder="What is this meeting about? (e.g., Project planning, Sprint review...)"
//             className="w-full h-36 p-5 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
//           />
//         </div>
//       </div>

//       {/* Right Side - Cost Summary */}
//       <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col">
//         <h2 className="text-3xl font-semibold mb-6">Cost Summary</h2>

//         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-10 text-center mb-8">
//           <p className="uppercase tracking-widest text-sm opacity-90">Total Estimated Cost</p>
//           <p className="text-7xl font-bold mt-4">${totalCost.toFixed(2)}</p>
//           <p className="text-sm mt-3 opacity-80">{duration} minutes meeting</p>
//         </div>

//         <button
//           onClick={getRecommendation}
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-5 rounded-2xl text-lg transition mb-6"
//         >
//           Is this meeting worth it?
//         </button>

//         {recommendation && (
//           <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl text-lg leading-relaxed mb-8">
//             {recommendation}
//           </div>
//         )}

//         <button
//           onClick={saveMeeting}
//           className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 transition text-lg"
//         >
//           <Save className="w-6 h-6" />
//           Save Meeting
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Calculator;





import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Clock } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Calculator = ({ onMeetingSaved }) => {
  const [participants, setParticipants] = useState([{ name: '', hourly_rate: '' }]);
  const [duration, setDuration] = useState(60);
  const [agenda, setAgenda] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [saving, setSaving] = useState(false);

  // Real-time Cost Calculation
  useEffect(() => {
    const cost = participants.reduce((sum, p) => {
      return sum + (parseFloat(p.hourly_rate) || 0) / 60 * duration;
    }, 0);
    setTotalCost(cost);
  }, [participants, duration]);

  const addParticipant = () => {
    setParticipants([...participants, { name: '', hourly_rate: '' }]);
  };

  const removeParticipant = (index) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const getRecommendation = () => {
    if (!agenda.trim()) {
      setRecommendation("Please enter a meeting agenda.");
      return;
    }
    if (totalCost > 500) {
      setRecommendation("❌ This meeting is expensive. Ensure high value.");
    } else if (totalCost > 200) {
      setRecommendation("⚠️ Moderately expensive. Define clear outcomes.");
    } else {
      setRecommendation("✅ This meeting looks reasonable.");
    }
  };

  const saveMeeting = async () => {
    if (!agenda.trim() || participants.some(p => !p.name.trim() || !p.hourly_rate)) {
      alert("Please fill all fields");
      return;
    }

    setSaving(true);
    try {
      await axios.post(`${API_URL}/meetings`, {
        agenda: agenda.trim(),
        duration_minutes: duration,
        participants: participants.map(p => ({
          name: p.name.trim(),
          hourly_rate: parseFloat(p.hourly_rate)
        }))
      });

      alert("✅ Meeting saved successfully!");
      setAgenda('');
      setDuration(60);
      setParticipants([{ name: '', hourly_rate: '' }]);
      setRecommendation('');
      onMeetingSaved?.();
    } catch (err) {
      console.error(err);
      alert("Failed to save meeting. Is backend running?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form */}
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
          <Clock className="w-8 h-8 text-blue-600" /> Meeting Details
        </h2>

        {participants.map((p, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Participant Name"
              value={p.name}
              onChange={(e) => updateParticipant(index, 'name', e.target.value)}
              className="flex-1 p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Hourly Rate ($)"
              value={p.hourly_rate}
              onChange={(e) => updateParticipant(index, 'hourly_rate', e.target.value)}
              className="w-52 p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500"
            />
            {participants.length > 1 && (
              <button onClick={() => removeParticipant(index)} className="text-red-500 p-4 hover:bg-red-50 rounded-2xl">
                <Trash2 className="w-6 h-6" />
              </button>
            )}
          </div>
        ))}

        <button onClick={addParticipant} className="text-blue-600 flex items-center gap-2 mt-4">
          <Plus className="w-5 h-5" /> Add Participant
        </button>

        <div className="mt-10">
          <label className="block text-xl font-medium mb-4">Duration (minutes)</label>
          <input
            type="range"
            min="15"
            max="480"
            step="15"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="text-center text-4xl font-bold text-blue-700 mt-4">{duration} min</div>
        </div>

        <div className="mt-10">
          <label className="block text-xl font-medium mb-4">Agenda</label>
          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            placeholder="What is this meeting about?"
            className="w-full h-32 p-5 border rounded-3xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col">
        <h2 className="text-3xl font-semibold mb-6">Cost Summary</h2>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-10 text-center mb-8">
          <p className="text-sm opacity-90">TOTAL COST</p>
          <p className="text-6xl font-bold mt-4">${totalCost.toFixed(2)}</p>
        </div>

        <button
          onClick={getRecommendation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl mb-4"
        >
          Is this meeting worth it?
        </button>

        {recommendation && (
          <div className="bg-gray-50 p-6 rounded-2xl mb-6 text-lg">
            {recommendation}
          </div>
        )}

        <button
          onClick={saveMeeting}
          disabled={saving}
          className="mt-auto bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-2"
        >
          <Save className="w-6 h-6" />
          {saving ? "Saving..." : "Save Meeting"}
        </button>
      </div>
    </div>
  );
};

export default Calculator;