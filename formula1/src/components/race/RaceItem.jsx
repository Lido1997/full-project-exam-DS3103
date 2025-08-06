const RaceItem = ({id, winnerName, winnerTime, grandPrix, numberOfLaps}) => {
    return (
        <article className="col-12 col-sm-6 col-md-4 col-lg-3 font_1">
            <div className="item_frame text-center h-100 item_bg">
                <h3 className="mt-2 text-dark"><small className="text-muted fs-6">ID: </small><strong>{id}</strong></h3>
                <h3 className="fs-2 text-dark"><strong>{grandPrix}</strong></h3>
                <p className="mt-3 fs-3 text-dark">{winnerName}</p>
                <p className="fs-5 text-dark"><small className="text-muted fs-6">hh : mm : ss : sss</small></p>
                <p className="fs-4 text-dark">{winnerTime}</p>
                <p className="fs-4 text-dark"><strong>Laps:</strong> {numberOfLaps}</p>
            </div>            
        </article>
    )
}

export default RaceItem;