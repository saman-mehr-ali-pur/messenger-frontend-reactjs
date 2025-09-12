const ContextMenu = ({x, y,id,deleteAction,editAction,copy,setInput,messages,setIsEdit}) => {

    const itemStyle = {
        padding: '5px 0',
        cursor: 'pointer',
        borderRadius: '5px',
    };

    const hoverStyle = {
        backgroundColor: '#f0f0f0',
    };


    const clickEdit = (event) =>{
        console.log("left click edit: "+id.current)
        event.preventDefault();
        setInput(messages.find((item) => item.id==id.current).message)
        setIsEdit(true)    
        
    }


    const clickDelete = (event) =>{
        event.preventDefault()
        console.log("left click delete: "+id.current)

        if (deleteAction){
            deleteAction(id)
        }


    }

    return <>
        <div style={{
            borderRadius: '10px',
            top: y,
            left: x,
            display: "flex",
            flexDirection: 'column',
            position: "absolute",
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '10px',
            zIndex: 1000,
            width: '100px',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '1%',
            fontFamily: "Roboto",
        }}>
            <div
                style={itemStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                onClick={clickEdit}
            >
                edit
            </div>
            <div
                style={itemStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                onClick={clickDelete}
            >
                delete
            </div>
            <div
                style={itemStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = ''}
            >
                copy
            </div>
        </div>
    </>
}

export default ContextMenu;