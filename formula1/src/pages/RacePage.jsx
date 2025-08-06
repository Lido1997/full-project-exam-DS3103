import DeleteRace from "../components/race/DeleteRace";
import RaceList from "../components/race/RaceList";
import AddRace from "../components/race/AddRace";
import EditRace from "../components/race/EditRace";

const RacePage = () => {
    return (
      <>
        <div className="container mt-4 text-white pb-3">
          <h1 className="text-danger display-1 header_font text-center">Races</h1>

          <section>
            <div className="mt-5 sectionBox_color px-3 border_section">
              <RaceList />  
            </div>
          </section>
  
          <section className="row mt-4">
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <EditRace />
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <AddRace />
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <DeleteRace />
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  export default RacePage;


