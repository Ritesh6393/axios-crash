const form=document.querySelector('#form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const numInput=document.getElementById('number');


    const name = nameInput.value;
    const email = emailInput.value;
    const number=numInput.value;

    //let users=JSON.parse(localStorage.getItem('users')) || [];

    const newUser={
        name:name,
        email:email,
        number:number
    }
    // users.push(newUser);
    //localStorage.setItem(newUser.email,JSON.stringify(newUser));
    //showUserOnScreen(newUser);
    axios.post( "https://crudcrud.com/api/f0d75c2861d743e69f57d9bb7085e9b1/appointmentData",newUser )
    .then((response)=>{
        showUserOnScreen(response.data);
    })
    .catch((error)=>{
        document.body.innerHTML=document.body.innerHTML+'Something Went Wrong'
    })
});

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/f0d75c2861d743e69f57d9bb7085e9b1/appointmentData")
    .then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            showUserOnScreen(response.data[i]);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
})


function showUserOnScreen(newUser){
    const parentElem=document.getElementById('list-items');
    const childElem=document.createElement('li');
    const delButton=document.createElement('button');
    childElem.textContent=newUser._id+'-'+newUser.email+'-'+newUser.number;
    delButton.textContent='Delete';
    delButton.onclick=(_id)=>{
      axios
      .delete(`https://crudcrud.com/api/f0d75c2861d743e69f57d9bb7085e9b1/appointmentData/${newUser._id}`)
      .then((response) => {
        parentElem.removeChild(childElem);
      })
      .catch((error) => {
        console.error('Failed to delete item', error);
      });
    }

    childElem.appendChild(delButton);
    parentElem.appendChild(childElem);
    const editButton=document.createElement('button');
    editButton.textContent='Edit';
    childElem.appendChild(editButton);
    editButton.onclick=()=>{
        localStorage.removeItem(newUser.email);
        parentElem.removeChild(childElem);
        document.getElementById('name').value=newUser.name;
        document.getElementById('email').value=newUser.email;
        document.getElementById('number').value=newUser.number;
    }
    //parentElem.appendChild(delButton);
}


