namespace Formula1API.Models;

using Formula1API.Interfaces;

public class Team : ITeam
{
    public int Id {get; set;}
    public string? Manufacturer {get; set;}
    public string? Driver1 {get; set;}
    public string? Driver2 {get; set;}
    public string? Image {get; set;}
}