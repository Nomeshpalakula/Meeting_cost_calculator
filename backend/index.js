// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const pool = require('./db');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // POST - Create Meeting
// app.post('/api/meetings', async (req, res) => {
//   const { agenda, duration_minutes, participants } = req.body;

//   try {
//     const totalCost = participants.reduce((sum, p) => {
//       return sum + (parseFloat(p.hourly_rate) / 60) * duration_minutes;
//     }, 0);

//     const meetingRes = await pool.query(
//       'INSERT INTO meetings (agenda, duration_minutes, total_cost) VALUES ($1, $2, $3) RETURNING *',
//       [agenda, duration_minutes, totalCost]
//     );

//     const meetingId = meetingRes.rows[0].id;

//     for (const p of participants) {
//       await pool.query(
//         'INSERT INTO participants (meeting_id, name, hourly_rate) VALUES ($1, $2, $3)',
//         [meetingId, p.name, parseFloat(p.hourly_rate)]
//       );
//     }

//     res.json({ success: true, message: "Meeting saved successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET - Get All Meetings
// app.get('/api/meetings', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT m.*, 
//              COALESCE(json_agg(
//                json_build_object('name', p.name, 'hourly_rate', p.hourly_rate)
//              ) FILTER (WHERE p.id IS NOT NULL), '[]') as participants 
//       FROM meetings m 
//       LEFT JOIN participants p ON m.id = p.meeting_id 
//       GROUP BY m.id 
//       ORDER BY m.created_at DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Backend Server Running on http://localhost:${PORT}`);
// });



const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create New Meeting
app.post('/api/meetings', async (req, res) => {
  const { agenda, duration_minutes, participants } = req.body;

  try {
    const totalCost = participants.reduce((sum, p) => {
      return sum + (parseFloat(p.hourly_rate) / 60) * duration_minutes;
    }, 0);

    const meetingRes = await pool.query(
      'INSERT INTO meetings (agenda, duration_minutes, total_cost) VALUES ($1, $2, $3) RETURNING *',
      [agenda, duration_minutes, totalCost]
    );

    const meetingId = meetingRes.rows[0].id;

    for (const p of participants) {
      await pool.query(
        'INSERT INTO participants (meeting_id, name, hourly_rate) VALUES ($1, $2, $3)',
        [meetingId, p.name, parseFloat(p.hourly_rate)]
      );
    }

    res.json({ 
      success: true, 
      message: "Meeting saved successfully!" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get All Meetings
app.get('/api/meetings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.*, 
             COALESCE(json_agg(
               json_build_object('name', p.name, 'hourly_rate', p.hourly_rate)
             ) FILTER (WHERE p.id IS NOT NULL), '[]') as participants 
      FROM meetings m 
      LEFT JOIN participants p ON m.id = p.meeting_id 
      GROUP BY m.id 
      ORDER BY m.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend Server Running on http://localhost:${PORT}`);
});