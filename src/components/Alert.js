import React from "react";

function Alert(props) {
 const capitalize=(word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
 }

    return (
        <>
        {console.log(props)}
        <div style={{height:'50px'}}> 
        {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
           <strong>{capitalize(props.alert.type)} : </strong>{capitalize(props.alert.msg)}
        </div>}
        </div>
        </>
    );
}

export default Alert