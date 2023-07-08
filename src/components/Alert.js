import React from 'react'

const Alert = (Props) => {
  const capitilize = (word)=>{
    const lower =  word.toLowerCase();
    // making first letter capital and other remains small 
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  console.log(Props.alert.type);
  return (
    <div>
        {/* if props.alert is null then it will work */}
          <div className={`alert alert-${Props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitilize(Props.alert.type)}</strong> {Props.alert.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
    </div>
  )
}

export default Alert