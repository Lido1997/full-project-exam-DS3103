import DeleteTeam from "../components/team/DeleteTeam";
import TeamList from "../components/team/TeamList";
import AddTeam from "../components/team/AddTeam";
import EditTeam from "../components/team/EditTeam";

const TeamPage = () => {
    return (
      <>
        <div className="container mt-4 text-white pb-3">
          <h1 className="text-danger display-1 header_font text-center">Teams</h1>

          <section>
            <div className="mt-5 sectionBox_color px-3 border_section">
              <TeamList />  
            </div>
          </section>
  
          <section className="row mt-4">
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <EditTeam />
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <AddTeam />
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <DeleteTeam />
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  export default TeamPage;
