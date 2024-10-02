document.getElementById('dropdownButton').addEventListener('click', function (event) {
    var dropdownMenu = document.getElementById('dropdownMenu')
    if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
        dropdownMenu.style.display = 'block'
    } else {
        dropdownMenu.style.display = 'none'
    }
    event.stopPropagation()
})

document.addEventListener('click', function (event) {
    var dropdownMenu = document.getElementById('dropdownMenu')
    if (!dropdownMenu.contains(event.target) && dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none'
    }
})

var links = document.querySelectorAll('.dropdown-menu a')
links.forEach(function (link) {
    link.addEventListener('click', function () {
        var dropdownMenu = document.getElementById('dropdownMenu')
        dropdownMenu.style.display = 'none'
    })
})

document.getElementById('downloadBtn').addEventListener('click', function () {
    var link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1_-8EyPk-KiK1nX5r_yomUF7b7dIwEjKd'; // Direct download link
    link.download = 'Resume.pdf'; // Desired file name for the downloaded file
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Simulate a click on the link
    document.body.removeChild(link); // Remove the link from the document
});

document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault() // Prevent the default form submission

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mob: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    }

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if (response.ok) {
            alert('Message sent successfully!')
            document.getElementById('contactForm').reset()
        } else {
            alert('Failed to send message.')
        }
    } catch (error) {
        console.error('Error:', error)
        alert('Error sending message.')
    }
})
