namespace Formula1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Formula1API.Models;
using Formula1API.Contexts;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    private readonly Formula1Context context;

    // Initiate context (drivers)
    public DriversController(Formula1Context _context)
    {
        context = _context;
    }

    // GET all drivers
    // ENDPOINT  http://localhost:5039/api/drivers
    [HttpGet]
    public async Task<ActionResult<List<Driver>>> GetAllDrivers()
{
    try
    {
        List<Driver> drivers = await context.Drivers.ToListAsync();

        if (drivers != null && drivers.Count > 0)
        {
            return Ok(drivers);
        }
        else
        {
            return NotFound();
        }
    }
    catch (Exception e)
    {
        Console.WriteLine($"Error: {e.Message}");

        return StatusCode(500, "An error occurred while retrieving drivers. (GetAllDrivers)");
    }    
}

    // GET driver by id
    // ENDPOINT  http://localhost:5039/api/drivers/1
    [HttpGet("{id}")]
    public async Task<ActionResult<Driver>> GetDriverById(int id)
    {
        try
        {
            Driver? driver = await context.Drivers.FindAsync(id);
            if (driver != null)
            {
                return Ok(driver);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "An error occurred while retrieving driver. (GetDriverById)");
        }
    }

    // GET driver by name
    // ENDPOINT http://localhost:5039/api/drivers/GetDriverByName/Max%20Verstappen
    [HttpGet]
    [Route("[action]/{name}")]
    public async Task<ActionResult<Driver>> GetDriverByName(string name)
    {
        try
        {
             Driver? driver = await context.Drivers.FirstOrDefaultAsync(d => d.Name == name);
            if (driver != null)
            {
                return Ok(driver);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "Internal Server Error");
        }
    }

    // POST driver
    [HttpPost]
    public async Task<ActionResult<Driver>> PostDriver(Driver newDriver)
    {
        try
        {
            await context.Drivers.AddAsync(newDriver);
            await context.SaveChangesAsync();

            if (newDriver.Id > 0)
            {
                return CreatedAtAction(nameof(GetDriverById), new { id = newDriver.Id }, newDriver);
            }
            else
            {
                return StatusCode(500, "Error: Driver was not added.");
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "An error occurred while adding driver. (PostDriver)");
        }
    }

    // PUT driver
    [HttpPut]
    public async Task<ActionResult<Driver>> PutDriver(Driver updatedDriver)
    {
        try
        {
            context.Entry(updatedDriver).State = EntityState.Modified;
            await context.SaveChangesAsync();

            context.Entry(updatedDriver).Reload(); 

            return Ok(updatedDriver);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "Internal Server Error");
        }
    }

    // DELETE driver
    [HttpDelete("{id}")]
    public async Task<ActionResult<Driver>> Delete(int id)
    {
        try
        {
            Driver? driver = await context.Drivers.FindAsync(id);

            if(driver != null)
            {
                context.Drivers.Remove(driver);
                await context.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");
            
            return StatusCode(500, "Error: Driver was not deleted.");
        }
    }
}