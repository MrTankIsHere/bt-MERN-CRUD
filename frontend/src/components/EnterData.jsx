import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EnterData = () => {

    // declarations
    const [userData, setUserData] = useState(null);
    const [allData, setAllData] = useState([]);
    const [mode, setMode] = useState("");
    const [editUser, setEditUser] = useState(null);

    // functions
    async function handleSubmit(e){

        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            id: formData.get("id"),
            name: formData.get("name")
        }

        await axios.post("http://localhost:5000/sendData", data)
        .then((res)=>{
            alert("Data sent.../");
            e.target.reset();
            console.log(res);
            axios.get("http://localhost:5000/printData")
                .then((res)=>{
                    setAllData(res.data.userData);
                    setMode("all");
                })
                .catch( (err) => console.error(err))
        })
        .catch((err)=>{
            console.log(err);
            alert("Error");
        })

    }



    async function handleSearch(e) {

        e.preventDefault();

        const formData = new FormData(e.target);
        const id = formData.get("search");

        if( id === ""){
            alert("You didn't type anything to search.")
        }
        else
        {
            await axios.get(`http://localhost:5000/findOneUser/${id}`)
            .then((res)=>{
                setUserData(res.data.userData);
                setMode("search");
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
                alert("User not found");
                setUserData(null);
            })
        }

    }



    async function fetchAllData(e) {
        
        e.preventDefault();

        await axios.get("http://localhost:5000/printData")
        .then((res)=>{
            setAllData(res.data.userData);
            setMode("all");
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
            alert("Error");
        })

    }



    async function deleteData(id){

        await axios.delete(`http://localhost:5000/deleteData/${id}`)
        .then((res)=>{
            alert("Deleted successfully.");
            setAllData(allData.filter((user)=>{ return user.id !== id }));
            console.log(res);
            setMode("all");
            setUserData(null);
        })
        .catch((err)=>{
            console.log(err);
            alert("Eroor in deleting.")
        })

    }



    async function updateData(user){

        setEditUser(user);

    }

    async function handleUpdate(e) {

        e.preventDefault();

        const formData = new FormData(e.target);

        await axios.patch(`http://localhost:5000/updateData/${editUser.id}`, {
            id: formData.get("id"),
            name: formData.get("name")
        })
        .then( () => {
            alert("Updated !!");
            setEditUser(null);
                axios.get("http://localhost:5000/printData")
                .then( (res) => {
                    setAllData(res.data.userData);
                    setMode("all");
                } )
                .catch((err) => {
                    console.log(err);
                    alert("Error updating.");
            })
        } )
        .catch( (err) => {
            console.log(err);
            alert("Error updating.... :(")
        } )

    }













    useEffect(()=>{
        
        axios.get("http://localhost:5000/printData")
        .then((res)=>{
            setAllData(res.data.userData);
            setMode("all");
        })
        .catch((err)=>{
            console.log(err);
        })

    }, [])


  return (
    <div>

        <form onSubmit={handleSubmit} >

            <input type="text" name="id" placeholder='Enter Id' required />     <br />
            <input type="text" name="name" placeholder='Enter Name' required />       <br />

            <button type='submit'> Submit </button>
        </form>

        <hr />


        <form onSubmit={handleSearch}>
            <input type="text" name='search' placeholder='search by id' /> 
            <button type='submit'>Search</button>
        </form>

        <button type='submit' onClick={fetchAllData}>All Data</button>

        <hr />

        {
            editUser && (
                <div>
                    <h4>Update User</h4>
                    <form onSubmit={handleUpdate}>
                        <input type="text" name="id" defaultValue={editUser.id} required />
                        <input type="text" name="name" defaultValue={editUser.name} required />
                        <button type='submit'>Update</button>
                        <button type='button' onClick={ () => setEditUser(null) }>Cancel</button>
                    </form>
                </div>
            )
        }

        <table border="1">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Delete Data</th>
                    <th>Update Data</th>
                </tr>
            </thead>

            <tbody>

                {/* Data not searched or retrieved */}
                {
                    mode === "" && (
                        <tr>
                            <td colSpan="4">No data found</td>
                        </tr>
                    )
                }

                {/* search a user data */}
                {
                    mode === "search" && userData && (
                        <tr key={userData._id}>
                            <td>{userData.id}</td>
                            <td>{userData.name}</td>
                            <td>
                                <button  onClick={()=>{deleteData(userData.id)}}>Delete</button>
                            </td>
                            <td>
                                <button onClick={()=>{updateData(userData)}}>Update</button>
                            </td>
                        </tr>
                    )
                }

                {/* get all user data */}
                {
                    mode === "all" && (
                        allData.map((user)=>{
                            return (
                            <tr key={user._id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <button onClick={()=>{deleteData(user.id)}}>Delete</button>
                                </td>
                                <td>
                                    <button onClick={()=>{updateData(user)}}>Update</button>
                                </td>
                            </tr>
                        )
                        })
                    )
                }
                

            </tbody>

        </table>
        
    </div>
  )
}

export default EnterData