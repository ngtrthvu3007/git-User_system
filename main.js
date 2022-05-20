
// regular expression (regex) form to validate email and phone number

function emailIsValid(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function phoneIsValid(phone){
    return  /^(0[3579][0-9]{8}|1[89]00[0-9]{4})$/.test(phone);
}






function saveUser(){
    let name = document.getElementById('name').value;
    let userName = document.getElementById('user__name').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
     
    // validate  Name
    if (_.isEmpty(name)) {
        name = '';
        document.getElementById('name__error').innerHTML = '*Please sign again!';
    }
    else if(name.trim().length <= 3){
        name = '';
        document.getElementById('name__error').innerHTML = '*Too short, sign again!';
    } 
    else if(name.trim().length > 50){
        name = '';
        document.getElementById('name__error').innerHTML = '*Too long, sign again!';
    } 
    else{
        document.getElementById('name__error').innerHTML = '';
    }

    // validate user name
    if (_.isEmpty(userName)) {
        userName = '';
        document.getElementById('user__name__error').innerHTML = '*Please sign again!';
    }
    else if(userName.trim().length <= 3){
        userName = '';
        document.getElementById('user__name__error').innerHTML = '*Too short, sign again!';
    } 
    else if(userName.trim().length > 50){
        userName = '';
        document.getElementById('user__name__error').innerHTML = '*Too long, sign again!';
    } 
    else{
        document.getElementById('user__name__error').innerHTML = '';
    }

    //validate password
  
    if (_.isEmpty(password)) {
        password = '';
        document.getElementById('password__error').innerHTML = '*Please sign again!';
    }
    else if(password.trim().length < 8){
        password = '';
        document.getElementById('password__error').innerHTML = '*Too short, sign again!';
    } 
    else if(password.trim().length > 30){
        password = '';
        document.getElementById('password__error').innerHTML = '*Too long, sign again!';
    } 
    else{
        document.getElementById('password__error').innerHTML = '';
    }

    
    // validate email
    if (_.isEmpty(email)) {
        email = '';
        document.getElementById('email__error').innerHTML = '*Please sign again!';
    }
    else if(!emailIsValid(email)){
        email = '';
        document.getElementById('email__error').innerHTML = '*Wrong fomat, sign again!';
    } 
    else{
        document.getElementById('email__error').innerHTML = '';
    }

    // validate phone 
    if(_.isEmpty(phone)){
        phone = '';
        document.getElementById('phone__error').innerHTML = '*Please sign again!';
    }
    else if(phone.trim().length > 10 || phone.trim().length < 10) {
        phone ='';
        document.getElementById('phone__error').innerHTML = '*Wrong, sign again!';
    }
    else if(!phoneIsValid(phone)){
        document.getElementById('phone__error').innerHTML = '*Wrong fomat, sign again!';
    }
    else{
        document.getElementById('phone__error').innerHTML = '';
    }

    if(name && userName && password && email && phone){
        console.log(name, userName, password, email, phone);
        let users = localStorage.getItem('users') ?  JSON.parse(localStorage.getItem('users')) : [];
        
        users.push({
            name: name,
            userName : userName,
            password : password,
            email : email,
            phone: phone,
        });
        
        
        localStorage.setItem('users', JSON.stringify(users));
        this.buildListUsers();

           
    }
}

function buildListUsers(){
    // lay ra storage neu rong tra arry trai lai tra ve kieu json file 
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    
    if(users.length === 0){
        document.getElementById('list__user').style.display = 'none';
        return false;

    }

    document.getElementById('list__user').style.display = 'block';


    let tableContent = `<tr>
        <td>Stt</td>
        <td>Name</td>
        <td>User Name</td>
        <td>Password</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Activities</td>
        </tr>`;

    users.forEach((users, index) => {
        let usersId = index;
        
        index++;
        
        
        tableContent += `<tr>
            <td>${index}</td>
            <td>${users.name}</td>
            <td>${users.userName}</td>
            <td>${users.password}</td>
            <td>${users.email}</td>
            <td>${users.phone}</td>
            <td>
                <a href = '#'>Edit</a> | <a href = '#' onclick = 'deleteUsers(${usersId})'>Delete</a>
            </td>
            </tr>`;
            
            document.getElementById('users__list').innerHTML = tableContent;
        });
        
}

function deleteUsers(id){
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    users.splice(id, 1);

    localStorage.setItem('users', JSON.stringify(users));
    alert('Do you want to delete this user?');
    buildListUsers();
}