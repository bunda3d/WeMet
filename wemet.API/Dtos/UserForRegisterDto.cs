using System.ComponentModel.DataAnnotations;

namespace wemet.API.Dtos
{
  public class UserForRegisterDto
  {
    //verification of username, will return 400 bad request if AuthController.cs has [ApiController]attribute
    [Required]
    public string Username { get; set; }
    //verification of pwd, will return 400 bad request
    [Required]
    [StringLength(12, MinimumLength = 8, ErrorMessage = "You must specify password between 8 and 12 characters.")]
    public string Password { get; set; }
  }
}