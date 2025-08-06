import DeleteDriver from "../components/driver/DeleteDriver";
import DriverList from "../components/driver/DriverList";
import AddDriver from "../components/driver/AddDriver";
import EditDriver from "../components/driver/EditDriver";

const DriverPage = () => {
    return (
      <>
        <div className="container mt-4 text-white pb-3">
          <h1 className="text-danger display-1 header_font text-center">Drivers</h1>

          <section>
            <div className="mt-5 sectionBox_color px-3 border_section">
              <DriverList />  
            </div>
          </section>
          
          <section className="row mt-4">
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <EditDriver />
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <AddDriver />
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="sectionBox_color border_section w-100 px-3">
                <DeleteDriver />
              </div>
            </div>
          </section>
        </div>
      </>
    );
}

export default DriverPage;

