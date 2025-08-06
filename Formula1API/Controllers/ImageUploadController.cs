namespace Formula1API.Controllers;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{    
    private readonly IWebHostEnvironment environment;

    public ImageUploadController(IWebHostEnvironment _environment)
    {
        environment = _environment;
    }

    [HttpGet]
    public string Get()
    {
        return "Hello from Get() in ImageUploadController";
    }    


    [HttpPost]
    public IActionResult PostImage(IFormFile formFile)
    {
        try
        {
            if (formFile == null || formFile.Length == 0)
            {
                return BadRequest("Invalid file");
            }

            string webRootPath = environment.WebRootPath;
            string absolutePath = Path.Combine($"{webRootPath}/images/{formFile.FileName}");

            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                formFile.CopyTo(fileStream);
            }

            return Ok("Image uploaded successfully");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");

            return StatusCode(500, "Internal Server Error");
        }
    }
}