const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2] || 'JUL02';
const value = [`%${cohortName}%`];

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohorts
  FROM assistance_requests 
    JOIN teachers ON assistance_requests.teacher_id = teachers.id
    JOIN students ON assistance_requests.student_id = students.id
    JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  ORDER BY teachers.name;
`;

pool.query(queryString, value)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohorts}: ${user.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));