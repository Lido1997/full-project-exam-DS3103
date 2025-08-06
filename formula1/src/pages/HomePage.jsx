import Formula1Quiz from "../quiz/Formula1Quiz";

const HomePage = () => {
    return (
        <>
            <div className="container mt-4 text-white pb-3">
                <h1 className="text-danger display-1 header_font text-center">FORMULA1</h1>
            
                <section className="row mt-4 font_1">
                    <div className="col-lg-4 mb-4">
                        <div className="sectionBox_color border_section w-100 px-3 pt-2">
                            <h3 className="text-danger header_font text-center display-6">Drivers</h3>
                            <p className="text-center text-white">Extreme g-forces. Daring decisions made in the blink of an eye. Dramatically battling to be the best, Formula 1 drivers are more like fighter pilots than sportspeople.</p>
                            <img className="img-fluid rounded pb-3 pt-1" src="/src/images/drivers.jpg" alt="Picture of drivers. Photo."></img>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <div className="sectionBox_color border_section w-100 px-3 pt-2">
                            <h3 className="text-danger header_font text-center display-6">Teams</h3>
                            <p className="text-center text-white">Formula 1 is a team sport. It needs to be a team to change all 4 tyres on a car in under 2 seconds! F1 teams design and build their cars and get them ready to race.</p>
                            <img className="img-fluid rounded pb-3 pt-1" src="/src/images/formula1fast.jpg" alt="Picture of a formula 1 team"></img>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <div className="sectionBox_color border_section w-100 px-3">
                            <h3 className="text-danger header_font text-center display-6 pt-2">Races</h3>
                            <p className="text-center text-white">Some sports play stadiums. Our 'stadiums' span cities. With 23 races in 23 amazing locations across 5 continents, Formula 1 is truly an international sport.</p>
                            <img className="img-fluid rounded pb-3 pt-1" src="../src/images/races.jpg" alt="Picture of a formula race"></img>
                        </div>
                    </div>
                    </section>

                    <section>
                        <div className="mt-5 sectionBox_color p-4 text-center border_section font_1">
                            <h1 className="text-danger header_font display-8">Formula 1 - Quiz</h1>
                            <Formula1Quiz />  
                        </div>
                </section>
            </div>
        </>
    );
}

export default HomePage;