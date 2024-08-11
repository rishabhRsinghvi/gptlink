document.getElementById('addEmail').addEventListener('click', () => {
    const email = prompt('Enter new email:');
    if (email) {
        fetch('/addEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Email added successfully!');
                loadEmails();
            } else {
                alert('Failed to add email.');
            }
        });
    }
});

document.getElementById('switchEmail').addEventListener('click', () => {
    fetch('/switchEmail', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Switched to ${data.email}`);
        } else {
            alert('Failed to switch email.');
        }
    });
});

function loadEmails() {
    fetch('/getEmails')
    .then(response => response.json())
    .then(data => {
        const emailList = document.getElementById('emailList');
        emailList.innerHTML = '';
        data.emails.forEach(email => {
            const div = document.createElement('div');
            div.textContent = email;
            emailList.appendChild(div);
        });
    });
}

window.onload = loadEmails;
