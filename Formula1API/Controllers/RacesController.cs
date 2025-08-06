namespace Formula1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Formula1API.Models;
using Formula1API.Contexts;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class RacesController : ControllerBase
{
    private readonly Formula1Context context;

    // Initiate context (races)
    public RacesController(Formula1Context _context)
    {
        context = _context;
    }

    // Get all races
    // ENDPOINT http://localhost:5039/api/races
    [HttpGet]
    public async Task<ActionResult<List<Race>>> GetAllRaces()
    {
        try
        {
            List<Race> races = await context.Races.ToListAsync();

            if (races.Any())
            {
                return Ok(races);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "An error occurred while retrieving races.");
        }    
    }

    // Get race by id
    // ENDPOINT http://localhost:5039/api/races/1
    [HttpGet("{id}")]
    public async Task<ActionResult<Race>> GetRaceById(int id)
    {
        try
        {
            Race? race = await context.Races.FindAsync(id);
            if (race != null)
            {
                return Ok(race);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "An error occurred while retrieving race. (GetDriverById)");
        }
    }

    // Get race by grandPrix
    // ENDPOINT http://localhost:5039/api/races/GetRaceByGrandPrix/Australia
    [HttpGet]
    [Route("[action]/{grandPrix}")]
    public async Task<ActionResult<Race>> GetRaceByGrandPrix(string grandPrix)
    {
        try
        {
             Race? race = await context.Races.FirstOrDefaultAsync(r => r.GrandPrix == grandPrix);
            if (race != null)
            {
                return Ok(race);
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

    // Post race
    [HttpPost]
    public async Task<ActionResult<Race>> PostRace(Race newRace)
    {
        try
        {
            await context.Races.AddAsync(newRace);
            await context.SaveChangesAsync();

            if (newRace == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(newRace);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "An error occurred while adding race. (PostRace)");
        }
    }

    // PUT race
    [HttpPut]
    public async Task<ActionResult<Race>> PutRace(Race updatedRace)
    {
        try
        {
            context.Entry(updatedRace).State = EntityState.Modified;
            await context.SaveChangesAsync();

            context.Entry(updatedRace).Reload();

            return Ok(updatedRace);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500);
        }
    }

    // DELETE driver by id
    [HttpDelete("{id}")]
    public async Task<ActionResult<Race>> DeleteRace(int id)
    {
        try
        {
            Race? race = await context.Races.FindAsync(id);

            if (race != null)
            {
                context.Races.Remove(race);
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

            return StatusCode(500, "Error: Race was not deleted.");
        }
    }
}