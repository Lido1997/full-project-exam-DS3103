const TeamItem = ({id, manufacturer, driver1, driver2, image}) => {
    return (
        <article className="col-12 col-sm-6 col-md-4 col-lg-3 font_1">
            <div className="item_frame text-center h-100 item_bg">
                <h3 className="mt-2 text-dark"><small className="text-muted fs-6">ID: </small><strong>{id}</strong></h3>
                <h3 className="fs-4 text-dark">{manufacturer}</h3>
                <img className="img-fluid image_border" src={`http://localhost:5039/images/${image}`} alt="Image of formula 1 car" />
                <p className="mt-3 fs-5 text-dark"><strong>D1:</strong> {driver1}</p>
                <p className="mt-3 fs-5 text-dark"><strong>D2:</strong> {driver2}</p>
            </div>            
        </article>
    )
}

export default TeamItem;