namespace Formula1API.Models;

using Formula1API.Interfaces;

public class Race : IRace
{
    public int Id {get; set;}
    public string? WinnerName {get; set;}
    public string? WinnerTime {get; set;}
    public string? GrandPrix {get; set;}
    public int NumberOfLaps {get; set;}
}