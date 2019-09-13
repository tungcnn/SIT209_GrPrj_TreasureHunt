$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const API_URL = 'https://217464906-sit-209.now.sh';
$.get(`${API_URL}/homepage`)
.then(response => {
    response.forEach(device => {
        $('#devices tbody').append(`
            <tr>
                <td>${device.user}</td>
                <td>${device.name}</td>
            </tr>`
        );
    });
})
.catch(error => {
    console.error(`Error: ${error}`);
});

const userlist = JSON.parse(localStorage.getItem('userlist')) || [];

$('#add-device').on('click', () => {
    const name = $('#name').val();
    const user = $('#user').val();
    const sensorData = [];
    const body = {
        name,
        user,
        sensorData
    };
    $.post(`${API_URL}/devices`, body)
    .then(response => {
        location.href = '/';
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });
});
   
$('#register').on('click', function () {
    const username = $('#username').val();
    const password = $('#password').val();
    const confirmpassword = $('#confirmpassword').val();
    const users = JSON.parse(localStorage.getItem('userlist'));

    console.log(users)
    var exists = false;
    if (users !== []) {
        exists = users.find(user => user.username === username);
    }

    if (exists) {
        console.log(exists)
        $('#message').html('<p>Username already existed.</p>');
    }
    else {
        if (password == confirmpassword) {
            userlist.push({ username, password });
            localStorage.setItem('userlist', JSON.stringify(userlist));
            location.href = '/login';
        } else {
            $('#message').html('<p>Password does not match.</p>');
        }
    }

});
$('#login').on('click', function () {
    console.log(JSON.parse(localStorage.getItem('userlist')))
    const username = $('#username').val();
    const password = $('#password').val();
    const users = JSON.parse(localStorage.getItem('userlist'))
    const userFromStorage = users.find(user => {
        if (user.username === username) {
            return user;
        }
        else {
            return null;
        }
    });

    if (userFromStorage !== null){
        if (password == userFromStorage.password) {
            localStorage.setItem('isAuthenticated', 'true');
            location.href  = "/";
        } else {
            $('#message').html('<p>Wrong password.</p>');
        }
        
    } else {
        $('#message').html('<p>User not found in DB.</p>');
    }

});
const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
    }





