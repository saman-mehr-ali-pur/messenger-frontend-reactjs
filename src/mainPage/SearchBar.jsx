import { useState } from "react";

const SearchBar = (props) =>{

    const [inputText,setInput] = useState("");
    const host = "http://localhost:8080";

  
    const handleInputChange = (e) =>{
        setInput(e.target.value)
        search(e.target.value)
    }

    const search = async (input) =>{
        let token=  await localStorage.getItem("jwtToken")


        let request2 = new Request(`${host}/user/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            // credentials: 'include'
            
            body: JSON.stringify({ username: input.trim() })
        });

        // If fetchUser is a custom function, make sure it's imported or defined.
        // Otherwise, use fetch for both requests.
        fetch(request2)
            .then((rs) => {
                if (rs.ok)
                    return rs.json();
                else
                    return null;
            })
            .then((data) => {
                props.updateResult(data);
            });

       
    }


    const handelClick = (e) =>{
        e.stopPropagation();
        props.setFoucsed(true)
    }

    return <>
        
        <div>
            <input
  id="inp"
  type="text"
  onClick={handelClick}
  onChange={handleInputChange}
  value={inputText}
  placeholder="search"
  onBlur={() => props.setFoucsed(false)}
  style={{
    width: '90%',
    padding: '10px',
    margin: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
  }}
/>
        </div>
    </>

}

export default SearchBar;