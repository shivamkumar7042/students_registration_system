// Select elements
const form = document.getElementById('student-form');
const tableBody = document.querySelector('#student-table tbody');

// Load existing students from local storage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Render students in table
function renderTable() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add student
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  // Input validation
  if (!/^[a-zA-Z\s]+$/.test(name)) return alert("Name must contain only letters.");
  if (!/^\d+$/.test(studentId)) return alert("Student ID must be numeric.");
  if (!/^\d{10}$/.test(contact)) return alert("Contact number must be 10 digits.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Enter a valid email address.");

  const student = { name, studentId, email, contact };
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
  renderTable();
  form.reset();
});

// Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
  }
}

// Edit student
function editStudent(index) {
  const s = students[index];
  document.getElementById('name').value = s.name;
  document.getElementById('studentId').value = s.studentId;
  document.getElementById('email').value = s.email;
  document.getElementById('contact').value = s.contact;
  deleteStudent(index); // remove old record so new edited one can replace it
}

// Initial table render when page loads
renderTable();
