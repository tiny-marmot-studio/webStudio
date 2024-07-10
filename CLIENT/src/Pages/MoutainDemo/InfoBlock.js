import "./DemoPage.css";

const InfoBlock = ({info}) =>{
    const {user,time,comment} = info;
    return(
        <div className = "info-block">
            <span className="info-line">User: &ensp;{user}</span>
            <span className="info-line">Created at: &ensp; {time}</span>
            <span className="info-line">Comment: <br/>{comment}</span>
        </div>
    );
}

export default InfoBlock;