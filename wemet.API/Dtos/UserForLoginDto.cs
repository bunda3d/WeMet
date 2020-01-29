
//data transfer object for established user's login
namespace wemet.API.Dtos
{
	public class UserForLoginDto
	{
		public string Username { get; set; }
		public string Password { get; set; }
	}
}