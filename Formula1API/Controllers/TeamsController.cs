namespace Formula1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Formula1API.Models;
using Formula1API.Contexts;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly Formula1Context context;

    // Initiate context (teams)
    public TeamsController(Formula1Context _context)
    {
        context = _context;
    }

    // Get all teams
    // ENDPOINT  http://localhost:5039/api/teams
    [HttpGet]
    public async Task<ActionResult<List<Team>>> GetAllTeams()
    {
        try
        {
            List<Team> teams = await context.Teams.ToListAsync();

            if (teams != null && teams.Count > 0)
            {
                return Ok(teams);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "An error occurred while retrieving drivers. (GetAllTeams)");
        }    
    }

    // Get team by id
    // ENDPOINT  http://localhost:5039/api/teams/1
    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> GetTeamById(int id)
    {
        try
        {
            Team? teams = await context.Teams.FindAsync(id);
            if (teams != null)
            {
                return Ok(teams);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "An error occurred while retrieving drivers. (GetTeamById)");
        }
    }

    // Get team by manufacturer
    // ENDPOINT  http://localhost:5039/api/teams/GetTeamByManufacturer/Mercedes????
    [HttpGet]
    [Route("[action]/{manufacturer}")]
    public async Task<ActionResult<Team>> GetTeamByManufacturer(string manufacturer)
    {
        try
        {
            Team? team = await context.Teams.FirstOrDefaultAsync(t => t.Manufacturer == manufacturer);
            if(team != null)
            {
                return Ok(team);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500);
        }
    }

    // Post team
    [HttpPost]
    public async Task<ActionResult<Team>> PostTeam(Team newTeam)
    {
        try
        {
            await context.Teams.AddAsync(newTeam);
            await context.SaveChangesAsync();

            if (newTeam == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(newTeam);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "An error occurred while retrieving drivers. (PostTeam)");
        }
    }

    // PUT team
    [HttpPut]
    public async Task<ActionResult<Team>> PutTeam(Team updatedTeam)
    {
        try
        {
            context.Entry(updatedTeam).State = EntityState.Modified;
            await context.SaveChangesAsync();

            context.Entry(updatedTeam).Reload();

            return Ok(updatedTeam);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500);
        }
    }
           

    // DELETE team by id
    [HttpDelete("{id}")]
    public async Task<ActionResult<Team>> DeleteTeam(int id)
    {
        try
        {
            Team? team = await context.Teams.FindAsync(id);

            if (team != null)
            {
                context.Teams.Remove(team);
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

            return StatusCode(500, "Error: Team was not deleted.");
        }
    }
}