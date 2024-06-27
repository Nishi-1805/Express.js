const form = document.getElementById('appointmentForm');
const messageDiv = document.getElementById('message');
const appointmentsList = document.getElementById('appointmentsList');
const appointmentIdField = document.getElementById('appointmentId');

// Event listener for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);
    const requestBody = Object.fromEntries(formData);

    try {
        let response;
        if (requestBody.appointmentId) {
            response = await fetch(`/api/appointments/${requestBody.appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
        } else {
            response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
        }

        if (!response.ok) {
            throw new Error('Failed to create or update appointment');
        }

        const data = await response.json();
        messageDiv.innerHTML = `
            <p>Appointment ${requestBody.appointmentId ? 'Updated' : 'Created'} Successfully!</p>
            <p>Username: ${data.username}</p>
            <p>Phone Number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        `;
        form.reset();
        fetchAppointments(); // Fetch and display the updated list of appointments
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = `<p>Failed to ${requestBody.appointmentId ? 'update' : 'create'} appointment. Please try again.</p>`;
    }
});

// Function to fetch and display appointments
async function fetchAppointments() {
    try {
        const response = await fetch('/api/appointments');
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }
        const appointments = await response.json();
        appointmentsList.innerHTML = appointments.map(appointment => `
            <div>
                <p>Username: ${appointment.username}</p>
                <p>Phone Number: ${appointment.phoneNumber}</p>
                <p>Email: ${appointment.email}</p>
                 <div class="button-group">
                <button class="edit-button" onclick="editAppointment('${appointment.id}')">Edit</button>
                <button class="delete-button" onclick="deleteAppointment('${appointment.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        appointmentsList.innerHTML = '<p>Failed to fetch appointments. Please try again.</p>';
    }
}

// Function to edit an appointment
function editAppointment(id) {
    fetch(`/api/appointments/${id}`)
        .then(response => response.json())
        .then(data => {
            appointmentIdField.value = data.id;
            document.getElementById('username').value = data.username;
            document.getElementById('phoneNumber').value = data.phoneNumber;
            document.getElementById('email').value = data.email;
        })
        .catch(error => console.error('Error:', error));
}

// Function to delete an appointment
async function deleteAppointment(id) {
    try {
        const response = await fetch(`/api/appointments/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete appointment');
        }
        fetchAppointments(); // Refresh the list after deletion
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch and display appointments on page load
fetchAppointments();
